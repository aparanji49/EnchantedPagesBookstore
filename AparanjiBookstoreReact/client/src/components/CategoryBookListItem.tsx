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

function CategoryBookListItem(props:BookItem) {
return (

    <li className="book-box">
        <img src={require('../assets/images/books/' + bookImageFileName(props))}
             alt="book.title" height={200}
        />
        <div className="book-title">{props.title}</div>
        {props.title === "Lighthouse Horrors"?(<div className="read-now-button">Read Now</div>):(<div></div>)}


        <div className="book-author">{props.author}</div>
        <div className="book-price">${(props.price / 100).toFixed(2)}</div>
        <button className="buy-now-button button">Add To Cart</button>
    </li>

)
}

export default CategoryBookListItem;
