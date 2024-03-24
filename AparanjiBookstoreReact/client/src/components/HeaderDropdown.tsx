import '../assets/css/global.css'
import '../assets/css/HeaderDropdown.css';
import {categoryList} from '../types';
import { Link } from 'react-router-dom';


function HeaderDropdown() {
  return (

//       <div className="header-dropdown">
//         <button className="button categories-button">Categories</button>
//         <ul>
//          {categoryList.map((item) =>    <li>
//              <Link to ="/categories">
//                  {item.name}</Link></li>)}
//
//         </ul>
//
// </div>
    <section className="menu-item">
        <Link to="/categories" className="button categories-button">CATEGORIES <img
            src={require('../assets/images/categories/Polygon for categories.png')} alt="dropdown"/></Link>
        <ul className="book-categories-list-menu">

                {categoryList.map((category) => (
                    <li className="book-category-menu-item button">  <Link to="/categories">{category.name}</Link>  </li>))}

        {/*    <li class="book-category-menu-item button"><a href="category.html">New Releases</a></li>*/}
        {/*    <li class="book-category-menu-item button"><a href="category.html">Art</a></li>*/}
        {/*    <li class="book-category-menu-item button"><a href="category.html">CookBooks</a></li>*/}
        {/*    <li class="book-category-menu-item button"><a href="category.html">Horror</a></li>*/}
        {/*    <li class="book-category-menu-item button"><a href="category.html">Romance</a></li>*/}
        {/*    <li class="book-category-menu-item button"><a href="category.html">Thriller</a></li>*/}
        {/*    <li class="book-category-menu-item button"><a href="category.html">Travel</a></li>*/}
        </ul>
    </section>

)
}
export default HeaderDropdown

