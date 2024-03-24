import   '../types';
import '../assets/css/CategoryBookList.css';
import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import  "../types";
import {BookItem, CatProp} from "../types";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

function CategoryBookList(props:CatProp) {
    const [books, setBooks] = useState([]);
    const {id} =  useParams();
    // console.log(id);
    useEffect(() => {
        axios.get(`/AparanjiBookstoreReactFetch/api/categories/name/${id}/books/`)
            .then((result) => setBooks(result.data ))
            .catch(console.error);
    }, [id]);
  return (
      <div className="categories-page">
          <section className="vertical-categories-menu">
              <CategoryNav catList = {props.catList}/>
          </section>
          <section className="book-boxes">
              {books.map((book:BookItem) => (
                  <CategoryBookListItem bookId={book.bookId} isPublic={book.isPublic} price={book.price}
                                        title={book.title} author={book.author}/>))}
          </section>
      </div>
  )
}

export default CategoryBookList;
