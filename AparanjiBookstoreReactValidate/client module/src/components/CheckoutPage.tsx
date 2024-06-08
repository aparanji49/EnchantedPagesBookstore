

import  "../assets/css/checkout.css"



//import { isCreditCard, isMobilePhone, isvalidEmail } from '../utils';
// import {BookItem, CustomerForm, months, OrderDetails, ShoppingCartItem, years} from "../types";
import {BookItem, months, ShoppingCartItem, years} from "../types";
import {CartStore} from "../contexts/CartContext";
import {ChangeEvent, FormEvent, useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {CartTypes} from "../reducers/CartReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import {asDollarsAndCents, isCreditCard, isMobilePhone, isvalidEmail} from "../utils";





function CheckoutPage()
{
    let last_category = JSON.parse(localStorage.getItem("lastCategory") || 'Best Sellers');

    const getBookImageUrl = function (book: BookItem): string {
        let filename = book.title.toLowerCase();
        filename = filename.replace(/ /g, "-");
        filename = filename.replace(/'/g, "");
        filename = filename + ".jpg";
            return require('../assets/images/books/' + filename);

    };

    /*
     * This will be used by the month and year expiration of a credit card
     *  NOTE: For example yearFrom(0) == <current_year>
    */
    function yearFrom(index: number) {
        return new Date().getFullYear() + index;
    }

    const {cart, dispatch} = useContext(CartStore);
    const navigate = useNavigate();
    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    const cartTotalPrice = asDollarsAndCents(totalBookCart(cart)+5); // TO DO code that calculates the total price of your cart

    // const cartQuantity = 0 ; // TO DO the code that calculates the total number of items in your cart

    // let phoneRegex = new  RegExp(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/);
// let emailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
// let creditCardRegex = new RegExp(/^(?:\d[ -]*?){13,16}$/);
    const [nameError, setNameError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [ccardError, setCcardError] = useState("");

    // TO DO error states for the rest of the input elements

    const [formData, setFormData] = useState({name: "",address:"", phone:"",email: "",ccNumber: "", ccExpiryMonth:0,ccExpiryYear:0});

    const [checkoutStatus, setCheckoutStatus] = useState("");

    const addBookToCart = (bItem:BookItem) => {
        dispatch({type: CartTypes.ADD, item: bItem, id: bItem.bookId}) ;
    };

    const removeBookFromCart = (bItem:BookItem) => {
        dispatch({type: CartTypes.REMOVE, item: bItem, id: bItem.bookId}) ;
    };
    function isValidForm()
    {
        //TO DO code that returns true is the customer form is valid, false otherwise
        let isValid = true;

        // Validate Name
        if (formData.name.length < 4) {
            setNameError("Name must be at least 4 characters long!");
            isValid = false;
        } else if (formData.name.length > 45) {
            setNameError("Name must be less than 45 characters!");
            isValid = false;
        } else {
            setNameError("");
        }

        // Validate Address
        if (formData.address.length < 4) {
            setAddressError("Address must be at least 4 characters long!");
            isValid = false;
        } else if (formData.address.length > 45) {
            setAddressError("Address must be less than 45 characters!");
            isValid = false;
        } else {
            setAddressError("");
        }

        // Validate Phone
        if (!isMobilePhone(formData.phone)) {
            setPhoneError("Invalid phone number. Please enter a valid number.");
            isValid = false;
        } else {
            setPhoneError("");
        }

        // Validate Email
        if (!isvalidEmail(formData.email)) {
            setEmailError("Invalid email address. Please enter a valid email.");
            isValid = false;
        } else {
            setEmailError("");
        }

        // Validate Credit Card Number
        if (!isCreditCard(formData.ccNumber)) {
            setCcardError("Invalid card number. Please enter a valid credit card number.");
            isValid = false;
        } else {
            setCcardError("");
        }


        return isValid;
        // return true;
    }

    // TO DO placeOrder function comes here. Needed for project 9 (not 8)

    function handleInputChange(event:ChangeEvent<HTMLInputElement|HTMLSelectElement>) {

        const { name, value } = event.target;

        switch (name) {
            case 'name':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if(value.length < 4){
                    setNameError("Name must be at least 4 characters long!");
                }else if(value.length > 45) {
                    setNameError("Name must be less than 45 characters!");
                }
                else {
                    setNameError("");
                }
                break;
            case 'address':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if(value.length < 4){
                    setAddressError("Address must be at least 4 characters long!");
                }else if(value.length > 45) {
                    setAddressError("Address must be less than 45 characters!");
                }
                else {
                    setAddressError("");
                }
                break;
            case 'phone':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if(!isMobilePhone(value)){
                    setPhoneError("Phone number is not valid");
                }else{
                    setPhoneError("");
                }
                break;
            case 'email':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if(!isvalidEmail(value)){
                    setEmailError("Email is not valid!");
                }else{
                    setEmailError("");
                }
                break;
            case 'ccNumber':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if(!isCreditCard(value)){
                    setCcardError("Card number is not valid!");
                }else{
                    setCcardError("");
                }
                break;
            case 'ccExpiryMonth':
                setFormData((prevFormData) => ({...prevFormData, [name]:parseInt(value,10)}));
                break;
            case 'ccExpiryYear':
                setFormData((prevFormData) => ({...prevFormData, [name]: parseInt(value,10)}));
                break;
            default:
                break;
        }
    }

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
    // TO DO submitOrder function comes here. See the project Spec

    function submitOrder(event:FormEvent) {
        const form = document.getElementsByClassName('checkout-form');
        if (form) {
            event.preventDefault();
            console.log("Submit order");
            const isFormCorrect = isValidForm();
            if (!isFormCorrect) {
                setCheckoutStatus("ERROR");     //Note that checkoutStatus is a state of the CheckoutPage
            } else {
                setCheckoutStatus("PENDING");
                setTimeout(() => {
                    setCheckoutStatus("OK");
                    setTimeout(() => {
                        navigate('/confirmation'); // please read about the useNavigate() hook of the react router
                    }, 1000);
                }, 1000);
            }
        }
    }
    return (
        <section className="checkout-whole-section">
            {cart.length>0 ? (
                <div className="checkout-whole">
            <div className="checkout-cart-div">
                {/*This displays the information about the items in the cart*/}
                <ul className="checkout-cart-info">
                    {
                        cart?.map((item, i) => (
                            <div className="checkout-item-with-sep">
                                <div className="checkout-cart-book-item">
                                    <div className="checkout-cart-book-image" key={i}>
                                        <img src={getBookImageUrl(item.item)} alt="title"
                                             className="checkout-cart-info-img"
                                             width="90%"
                                             height="90%"
                                        />
                                    </div>
                                    <div className="checkout-cart-book-info">
                                        <div className="checkout-cart-book-title">{item.item.title}</div>

                                        <div className="checkout-cart-book-subtotal">
                                            {asDollarsAndCents(subTotalBookCart(item))}
                                        </div>
                                        <div className="checkout-cart-book-quantity">
                                            <button className="checkout-icon-button inc-button"
                                                    onClick={() => addBookToCart(item.item)}>
                                                <i className="fas fa-plus-circle"><FontAwesomeIcon icon={faPlusCircle}/></i>
                                            </button>
                                            <span className="checkout-quantity">{item.quantity}</span>&nbsp;
                                            <button className="checkout-icon-button dec-button"
                                                    onClick={() => removeBookFromCart(item.item)}
                                            >
                                                <i className="fas fa-minus-circle"><FontAwesomeIcon
                                                    icon={faMinusCircle}/></i>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div className="line-sep"></div>
                            </div>

                        ))}

                </ul>
            </div>
            <div className="checkout-page-body">
                <p className="checkout-body-heading">Please fill out the details below</p>
                <div>
                    <form
                        className="checkout-form"
                        // onSubmit ={(event)=>submitOrder(event)}
                        method="post"
                    >
                        <div className="input-pairs">
                            <label htmlFor="fname" className="labels">Name</label>
                            <input className="inputs"
                                   type="text"
                                   size={25}
                                   name="name"
                                   id="fname"
                                   value={formData.name}
                                   onChange={handleInputChange}
                            />
                        </div>
                        <> {nameError && <div className="error"> {nameError}</div>}</>
                        <div className="input-pairs">
                            <label htmlFor="phonenum" className="labels">Phone number</label>
                            <input className="inputs"
                                   type="text"
                                   size={25}
                                   name="phone"
                                   id="phonenum"
                                   value={formData.phone}
                                   onChange={handleInputChange}
                            />
                        </div>
                        <> {phoneError && <div className="error"> {phoneError}</div>}</>
                        <div className="input-pairs">
                            <label htmlFor="addr" className="labels">Address</label>
                            <input className="inputs"
                                   type="text"
                                   size={25}
                                   name="address"
                                   id="addr"
                                   value={formData.address}
                                   onChange={handleInputChange}
                            />
                        </div>
                        <> {addressError && <div className="error"> {addressError}</div>}</>
                        <div className="input-pairs">
                            <label htmlFor="email" className="labels">Email</label>
                            <input className="inputs"
                                   type="text"
                                   size={25}
                                   name="email"
                                   id="email"
                                   value={formData.email}
                                   onChange={handleInputChange}
                            />
                        </div>
                        <> {emailError && <div className="error"> {emailError}</div>}</>
                        <div className="input-pairs">
                            <label htmlFor="ccard" className="labels">Card</label>
                            <input className="inputs"
                                   type="text"
                                   size={25}
                                   name="ccNumber"
                                   id="ccard"
                                   value={formData.ccNumber}
                                   onChange={handleInputChange}
                            />
                        </div>
                        <> {ccardError && <div className="error"> {ccardError}</div>}</>
                        {/*  TO DO add the form elements for phone, address, email, and Credit card*/}
                        {/* Together with the error display*/}

                        <div className="input-pairs">
                            <label htmlFor="ccExpiryMonth" className="labels">Exp Date</label>
                            <select className="inputs" name="ccExpiryMonth" value={formData.ccExpiryMonth}
                                    onChange={handleInputChange}>
                                {months.map((month, i) => (
                                    <option key={i} value={i + 1}>
                                        {month}
                                    </option>
                                ))}
                            </select>

                            {/*TO DO the select input for the expiration year. Read the spec */}
                            {/* about this*/}
                            <label htmlFor="ccExpiryYear" className="labels">Exp Year</label>
                            <select className="inputs" name="ccExpiryYear" value={formData.ccExpiryYear}
                                    onChange={handleInputChange}>
                                {years.map((year, i) => (
                                    <option key={i} value={i + 1}>
                                        {yearFrom(year)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </form>
                </div>

                {/* TO DO the checkout box with the total cost, tax */}
                {/* and the Complete Purchase button comes here*/}


                <div>
                    {/*The following code displays different string based on the */}
                    {/*value of the checkoutStatus*/}
                    {/*Note the ternary operator*/}
                    {
                        checkoutStatus !== '' ?
                            <>
                                <section className="checkoutStatusBox">
                                    {(checkoutStatus === 'ERROR') ?
                                        <div className="error">
                                            Error: Please fix the problems above and try again.
                                        </div> : (checkoutStatus === 'PENDING' ?
                                            <div className="p-status">
                                                Processing...
                                            </div> : (checkoutStatus === 'OK' ?
                                                <div className="ok-status">
                                                    Order placed...
                                                </div> :
                                                <div className="error">
                                                    An unexpected error occurred, please try again.
                                                </div>))}
                                </section>
                            </>
                            : <></>}
                </div>
                <div className="line-sep"></div>
                <div className="checkout-summary">
                    <div className="checkout-summary-text">
                        <div className="total-count-text total">SubTotal ({cartQuantity} {cartQuantity === 1 ? (
                            <span>&nbsp;Book</span> ): (<span>&nbsp;Books</span>)}):
                        </div>
                        <div className="total">Surcharge/Tax:</div>
                        <div className="total-text total">Total:</div>
                    </div>
                    <div className="checkout-amount">
                        <div className="amount">{asDollarsAndCents(totalBookCart(cart))}</div>
                        <div className="amount">$5.00</div>
                        <div className="total-amount amount">{cartTotalPrice}</div>
                    </div>


                </div>
                <div className="checkout-page-buttons">
                    <button className="button checkout-button" onClick={submitOrder}>Place Order</button>
                    <Link className="button continue-to-shopping" to="/cart">Go Back</Link>
                </div>
            </div> </div>
                ):(
                <div className="checkout-cart-empty"><div>Your Cart is Empty. Please add books to the cart to checkout.</div>
                    <Link to={`/categories/${last_category}`} className="button continue-to-shopping">Continue Shopping</Link></div>
                )}
        </section>
    )
}

export default CheckoutPage;