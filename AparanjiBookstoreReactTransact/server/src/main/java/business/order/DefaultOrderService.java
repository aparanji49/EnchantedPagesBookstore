package business.order;

import api.ApiException;
import business.BookstoreDbException;
import business.JdbcUtils;
import business.book.Book;
import business.book.BookDao;
import business.book.BookForm;
import business.cart.ShoppingCart;
import business.cart.ShoppingCartItem;
import business.customer.Customer;
import business.customer.CustomerDao;
import business.customer.CustomerForm;

import java.sql.Connection;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DateTimeException;
import java.time.YearMonth;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class DefaultOrderService implements OrderService {

	private BookDao bookDao;
	private OrderDao orderDao;
	private LineItemDao lineItemDao;
	private CustomerDao customerDao;

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}

	public void setOrderDao(OrderDao orderDao){
		this.orderDao = orderDao;
	}

	public void setLineItemDao(LineItemDao lineItemDao) {
		this.lineItemDao = lineItemDao;
	}

	public void setCustomerDao(CustomerDao customerDao) {
		this.customerDao = customerDao;
	}

	@Override
	public OrderDetails getOrderDetails(long orderId) {
		Order order = orderDao.findByOrderId(orderId);
		Customer customer = customerDao.findByCustomerId(order.customerId());
		List<LineItem> lineItems = lineItemDao.findByOrderId(orderId);
		List<Book> books = lineItems
				.stream()
				.map(lineItem -> bookDao.findByBookId(lineItem.bookId()))
				.toList();
		return new OrderDetails(order, customer, lineItems, books);
	}

	@Override
    public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);


		try (Connection connection = JdbcUtils.getConnection()) {
			Date ccExpDate = getCardExpirationDate(
					customerForm.getCcExpiryMonth(),
					customerForm.getCcExpiryYear());
			return performPlaceOrderTransaction(
					customerForm.getName(),
					customerForm.getAddress(),
					customerForm.getPhone(),
					customerForm.getEmail(),
					customerForm.getCcNumber(),
					ccExpDate, cart, connection);
		} catch (SQLException e) {
			throw new BookstoreDbException("Error during close connection for customer order", e);
		} catch (ParseException e) {
            throw new RuntimeException(e);
        }
//		return -1;
	}


	private void validateCustomer(CustomerForm customerForm) {

    	String name = customerForm.getName();
		String address = customerForm.getAddress();
		String phone = customerForm.getPhone();

		String email = customerForm.getEmail();
		String ccNumber = customerForm.getCcNumber();


// name validation
		if(name==null){
			throw new ApiException.ValidationFailure("name","Missing name field");
		}

		if (name.length()<4 ||name.length() > 45) {
			throw new ApiException.ValidationFailure("name","Invalid name field");
		}

		// address validation
		if(address == null){
			throw new ApiException.ValidationFailure("address","Missing address field");
		}

		if (address.length()<4||address.length() > 45) {
			throw new ApiException.ValidationFailure("address","Invalid address field");
		}
// phone validation
		if (phone == null ) {
			throw new ApiException.ValidationFailure("phone","Missing phone field");
		}
		String phoneDigits = phone.replaceAll("\\D","");

		if(phoneDigits.length()!=10){
			throw new ApiException.ValidationFailure("phone","Invalid phone field");
		}

		// email validation

		if(email == null){
			throw new ApiException.ValidationFailure("email","Missing email field");
		}

		if (email.charAt(email.length()-1) == '.' || !email.contains("@") || email.contains(" ")) {
			throw new ApiException.ValidationFailure("email","Invalid email field");
		}
// ccNumber validation
		if(ccNumber == null){
			throw new ApiException.ValidationFailure("ccNumber","Missing ccNumber field");
		}
		String ccNumberWithoutSpaces = ccNumber.replaceAll("/[ -]/g", "");

		if (ccNumberWithoutSpaces.length() < 14 || ccNumberWithoutSpaces.length() > 16) {
			throw new ApiException.ValidationFailure("ccNumber","Invalid ccNumber field");
		}
// expiry date validation
		if(customerForm.getCcExpiryMonth() == null || customerForm.getCcExpiryYear()== null){
			throw new ApiException.ValidationFailure("Missing expiry date");
		}
		if (expiryDateIsInvalid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
			throw new ApiException.ValidationFailure("Invalid expiry date");
		}
	}

	private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {
		try {
			int expiryMonth = Integer.parseInt(ccExpiryMonth);
			int expiryYear = Integer.parseInt(ccExpiryYear);

			YearMonth currentYearMonth = YearMonth.now();
			YearMonth expiryYearMonth = YearMonth.of(expiryYear, expiryMonth);

			return expiryYearMonth.isBefore(currentYearMonth);

//			return false;
		}catch(Exception e){
			return true;
		}

	}

	private void validateCart(ShoppingCart cart) {


		if (cart.getItems().size() <= 0) {
			throw new ApiException.ValidationFailure("Cart is empty.");
		}


		cart.getItems().forEach(item-> {
			if (item.getQuantity() < 1 || item.getQuantity() > 99) {
				throw new ApiException.ValidationFailure("Invalid quantity");
			}
			Book databaseBook = bookDao.findByBookId(item.getBookId());


			if(item.getBookForm().getPrice() != databaseBook.price()){
				throw new ApiException.ValidationFailure("Invalid book price");
			}

			if(item.getBookForm().getCategoryId() != databaseBook.categoryId()){
				throw new ApiException.ValidationFailure("Invalid book category");
			}
//			BookForm bookForm = new BookForm(databaseBook.bookId(), databaseBook.price(), 0, databaseBook.categoryId());
//			item.setBookForm(bookForm);
		});
	}

	private Date getCardExpirationDate(String monthString, String yearString) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("MM-yyyy");
		String monthYearString = monthString +"-"+yearString;
	return sdf.parse(monthYearString);

	}

	private long performPlaceOrderTransaction(
			String name, String address, String phone,
			String email, String ccNumber, Date date,
			ShoppingCart cart, Connection connection) {
		try {
			connection.setAutoCommit(false);
			long customerId = customerDao.create(
					connection, name, address, phone, email,
					ccNumber, date);
			long customerOrderId = orderDao.create(
					connection,
					cart.getComputedSubtotal() + cart.getSurcharge(),
					generateConfirmationNumber(), customerId);
			for (ShoppingCartItem item : cart.getItems()) {
				lineItemDao.create(connection, item.getBookId(), customerOrderId,
						 item.getQuantity());
			}
			connection.commit();
			return customerOrderId;
		} catch (Exception e) {
			try {
				connection.rollback();
			} catch (SQLException e1) {
				throw new BookstoreDbException("Failed to roll back transaction", e1);
			}
			return 0;
		}
	}

	private int generateConfirmationNumber() {
		return ThreadLocalRandom.current().nextInt(999999999);
	}
}
