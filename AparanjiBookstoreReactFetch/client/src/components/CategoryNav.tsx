import '../assets/css/CategoryNav.css'
import '../assets/css/global.css'
import {Link, useNavigate} from "react-router-dom";
import {CatProp} from "../types";

function CategoryNav(categoryList:CatProp) {
    const navigate = useNavigate();
  return (

      // <nav className="category-nav">
      //   <ul className="category-buttons">
      //
      //     {categoryList.map((category) => (
      //
      //         <li className="button unselected-category-button">
      //           {category.name}
      //         </li>
      //
      //
      //
      //
      //         ))}
      //
      //   </ul>
      // </nav>

        <ul className="book-categories-vertical-menu">
            {categoryList.catList.map((category) => (


                <li className="book-category-menu-item button">
                    <Link to={`/categories/${category.name}`} onClick={() => navigate(`/categories:${category.name}`)}>{category.name}</Link>
                </li>

            ))}
          {/*<li className="book-category-menu-item button"><a href="category.html">Best Sellers</a></li>*/}
          {/*<li className="book-category-menu-item button"><a href="category.html">New Releases</a></li>*/}
          {/*<li className="book-category-menu-item button"><a href="category.html">Art</a></li>*/}
          {/*<li className="book-category-menu-item button"><a href="category.html">CookBooks</a></li>*/}
          {/*<li className="book-category-menu-item button"><a href="category.html">Horror</a></li>*/}
          {/*<li className="book-category-menu-item button"><a href="category.html">Romance</a></li>*/}
          {/*<li className="book-category-menu-item button"><a href="category.html">Thriller</a></li>*/}
          {/*<li className="book-category-menu-item button"><a href="category.html">Travel</a></li>*/}
        </ul>
  )
}

export default CategoryNav;

