import   '../types';
import '../assets/css/CategoryBookList.css';
import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import  "../types";
import {bookList,BookItem} from "../types";

function CategoryBookList() {
  return (
      <div className="categories-page">
          <section className="vertical-categories-menu">
              <CategoryNav/>
          </section>
          <section className="book-boxes">
              {bookList.map((book: BookItem) => (
                  <CategoryBookListItem bookId={book.bookId} isPublic={book.isPublic} price={book.price}
                                        title={book.title} author={book.author}/>))}
          </section>
      </div>
  )
}

export default CategoryBookList;
