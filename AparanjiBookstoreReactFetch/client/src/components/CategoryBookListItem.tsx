import '../assets/css/CategoryBookListItem.css';
import '../types'
import "../types";
import {BookItem} from "../types";


const bookImageFileName =  (book:BookItem) => {
    let name = book.title.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/'/g, "");
    return `${name}.jpg`;
};

function CategoryBookListItem(bItem:BookItem) {
return (

    <li className="book-box">
        <img src={require('../assets/images/books/' + bookImageFileName(bItem))}
             alt="book.title" height={200}
        />
        <div className="book-title">{bItem.title}</div>
        {(bItem.bookId%2===0)?(<div className="read-now-button">Read Now</div>):(<div></div>)}


        <div className="book-author">{bItem.author}</div>
        <div className="book-price">${(bItem.price / 100).toFixed(2)}</div>
        <button className="buy-now-button button">Add To Cart</button>
    </li>

)
}

export default CategoryBookListItem;
