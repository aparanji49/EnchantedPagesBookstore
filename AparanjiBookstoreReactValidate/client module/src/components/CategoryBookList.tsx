import   '../types';
import '../assets/css/CategoryBookList.css';
import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import  "../types";
import {BookItem, CategoryItem} from "../types";
import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Category} from "../contexts/CategoryContext";

function CategoryBookList() {
    const [books, setBooks] = useState([]);
    const {id} =  useParams();
    // Save the category name to local storage
    useEffect(() => {

    }, [id]);
     // const categories = useContext<CategoryItem[]>(Category);
    // console.log(id);
    useEffect(() => {
        localStorage.setItem('lastCategory', JSON.stringify(id));
        axios.get(`/AparanjiBookstoreReactValidate/api/categories/name/${id}/books/`)
            .then((result) => setBooks(result.data ))
            .catch(console.error);
    }, [id]);


  return (
      <div className="categories-page">
          <section className="vertical-categories-menu">
              <CategoryNav />
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
