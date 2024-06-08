package business.order;

import api.ApiException;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.customer.CustomerForm;

import java.time.DateTimeException;
import java.time.YearMonth;
import java.util.Date;

public class DefaultOrderService implements OrderService {

	private BookDao bookDao;

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}

	@Override
	public OrderDetails getOrderDetails(long orderId) {
		// NOTE: THIS METHOD PROVIDED NEXT PROJECT
		return null;
	}

	@Override
    public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);

		// NOTE: MORE CODE PROVIDED NEXT PROJECT

		return -1;
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
		// TODO: Validation checks for address, phone, email, ccNumber
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

			// TODO: return true when the provided month/year is before the current month/yeaR
			// HINT: Use Integer.parseInt and the YearMonth class
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
			// TODO: complete the required validations
			if(item.getBookForm().getPrice() != databaseBook.price()){
				throw new ApiException.ValidationFailure("Invalid book price");
			}

			if(item.getBookForm().getCategoryId() != databaseBook.categoryId()){
				throw new ApiException.ValidationFailure("Invalid book category");
			}
		});
	}

}
