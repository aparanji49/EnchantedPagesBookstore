import "../assets/css/CartTable.css"
import {BookItem, ShoppingCartItem} from "../types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinusCircle} from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
import {CartTypes} from "../reducers/CartReducer";
import {Link} from "react-router-dom";
import {asDollarsAndCents} from "../utils";
// import { useNavigate } from 'react-router-dom';


// const bookImageFileName =  (book:BookItem) => {
//     let name = book.title.toLowerCase();
//     name = name.replace(/ /g, "-");
//     name = name.replace(/'/g, "");
//     return `${name}.jpg`;
// };

const bookImageFileName = (book: BookItem) => {
        let name = book.title.toLowerCase();
        name = name.replace(/ /g, "-");
        name = name.replace(/'/g, "");
        return `${name}.jpg`;
};


function CartTable() {
    const {cart} = useContext(CartStore);

    const {dispatch} = useContext(CartStore);
console.log(cart)
    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    // const navigate = useNavigate();

    // const handleContinueShopping = () => {
    //     // Get the previous URL from the browser's history
    //     const previousUrl = document.referrer;
    //
    //     // Extract the category name from the URL
    //     const categoryName = previousUrl.substring(previousUrl.lastIndexOf('/') + 1);
    //
    //     // Navigate to the previous category
    //     navigate(`/categories/${categoryName}`);
    // };
    // const {dispatch} =useContext(CartStore);
    const addBookToCart = (bItem:BookItem) => {
        dispatch({type: CartTypes.ADD, item: bItem, id: bItem.bookId}) ;
    };

    const removeBookFromCart = (bItem:BookItem) => {
        dispatch({type: CartTypes.REMOVE, item: bItem, id: bItem.bookId}) ;
    };

    function subTotalBookCart(item: ShoppingCartItem) {
        return item.quantity*item.item.price;
    }

    function totalBookCart(cart: ShoppingCartItem[]){
        let totalCount=0;
        cart.map((item: ShoppingCartItem) => (
            totalCount+=subTotalBookCart(item)
        ));
        return totalCount;
    }

    function getBookTitle(book: BookItem) {
        return book.title
    }

    function getBookPrice(book: BookItem) {
        return asDollarsAndCents(book.price)

    }

    function clearCart() {
        dispatch({type: CartTypes.CLEAR}) ;
    }

    let last_category = JSON.parse(localStorage.getItem("lastCategory") || 'Best Sellers');
    return (
<div className="cart-whole">

            {cart.length>0 ? (
                <div className="cart-table">
            <ul className="cart2">
                <li className="table-heading">
                    <div className="heading-book">Book</div>
                    <div className="heading-price">Price</div>
                    <div className="heading-quantity">Quantity</div>
                    <div className="heading-subtotal">Amount</div>
                </li>

                {/* TODO : You need to iterate through the cart and display book image, */}
                {/*        Book Title, unit price/quantity and total price for each item in the cart*/}
                {/*        Note that the following simply display hardcoded data*/}


                {cart.map((cItem) => (

                    // <p>{item.id}</p>
                    // <p> {item.quantity}</p>
            // <p>  {item.book}</p>

                    <li key={cItem.id}>
                        <div className="cart-book-image">
                            {/*{item.book && item.book.title && (*/}
                            <img className="cart2"
                                 src={require('../assets/images/books/' + bookImageFileName(cItem.item))}
                                 alt={bookImageFileName(cItem.item)}/>
                            {/*)}*/}
                        </div>
                        <div className="cart-book-title">{getBookTitle(cItem.item)}</div>
                        <div className="cart-book-price">{getBookPrice(cItem.item)}</div>
                        <div className="cart-book-quantity">
                            <button
                                className="icon-button inc-button" onClick={() => addBookToCart(cItem.item)}
                            >
                                <i className="fas fa-plus-circle"><FontAwesomeIcon icon={faPlusCircle}/></i>
                            </button>
                            <span className="quantity">{cItem.quantity}</span>&nbsp;
                            <button
                                className="icon-button dec-button" onClick={() => removeBookFromCart(cItem.item)}
                            >
                                <i className="fas fa-minus-circle"> <FontAwesomeIcon icon={faMinusCircle}/></i>
                            </button>
                        </div>
                        <div className="cart-book-subtotal">{asDollarsAndCents(subTotalBookCart(cItem))}</div>
                        <div className="line-sep"></div>
                    </li>
                ))}
                <li className="total-count">
                    <div className="total-count-text">Total ( {cartQuantity===1 ? (<span>Book</span>) : (<span>Books</span>)} : {cartQuantity})</div>
                    <div className="sum-total">{asDollarsAndCents(totalBookCart(cart))}</div>
                </li>
            </ul>
            <div className="buttons-links">
                <Link to={`/categories/${last_category}`} className="button continue-to-shopping">Continue Shopping</Link>
                <Link to="/checkout" className="button checkout-button">Checkout</Link>
            </div>
                <div className="clear-link">
                    <button className="button continue-to-shopping clear-cart-button" onClick={()=>clearCart()}>Clear Cart</button>
                </div></div>
                ):(
                <div className="cart-empty"><div>Your Cart is Empty.</div><Link to={`/categories/${last_category}`} className="button continue-to-shopping">Continue Shopping</Link></div>
                )}
</div>
    )
}

export default CartTable;

