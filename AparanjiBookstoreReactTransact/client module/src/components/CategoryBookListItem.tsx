import '../assets/css/CategoryBookListItem.css';
import '../types'
import "../types";
import {BookItem} from "../types";
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
import {CartTypes} from "../reducers/CartReducer";


const bookImageFileName =  (book:BookItem) => {
    let name = book.title.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/'/g, "");
    return `${name}.jpg`;
};

function CategoryBookListItem(bItem:BookItem) {
    const {dispatch} =useContext(CartStore);

    const addBookToCart = () => {
      dispatch({type: CartTypes.ADD, item: bItem, id: bItem.bookId}) ;
    };

    const removeBookFromCart = () => {
        dispatch({type: CartTypes.REMOVE, item: bItem, id: bItem.bookId}) ;
    };
return (

    <li className="book-box">
        <img src={require('../assets/images/books/' + bookImageFileName(bItem))}
             alt={bItem.title} height={200}
        />
        <div className="book-title">{bItem.title}</div>
        {(bItem.bookId % 2 === 0) ? (<div className="read-now-button">Read Now</div>) : (<div></div>)}


        <div className="book-author">{bItem.author}</div>
        <div className="book-price">${(bItem.price).toFixed(2)}</div>
        <button className="buy-now-button button"  onClick={addBookToCart}>Add To Cart</button>
        <button className="remove-button button"  onClick={removeBookFromCart}>Remove</button>
    </li>

)
}

export default CategoryBookListItem;
