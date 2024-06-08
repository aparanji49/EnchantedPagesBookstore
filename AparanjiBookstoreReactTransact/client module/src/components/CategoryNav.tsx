import '../assets/css/CategoryNav.css'
import '../assets/css/global.css'
import {Link, useParams} from "react-router-dom";
import {CategoryItem} from "../types";
import {Category} from "../contexts/CategoryContext";
import { useContext} from "react";

function CategoryNav() {
    // const navigate = useNavigate();
    const categories = useContext<CategoryItem[]>(Category);
    // const [selectedCategory, setSelectedCategory] = useState(`#563975`);
    // const handleCategoryClick = (categoryName) => {
    //     setSelectedCategory(categoryName);
    // };

    // const [backgroundColor, setBackgroundColor] = useState("#563975");
const selectStyle = {
backgroundColor: "#0089bf"
};
    // useEffect(() => {
    //     setBackgroundColor("#0089bf");
    // }, [backgroundColor]);

    const {id} = useParams();
    console.log(id);
    // const [selectedCategory, setSelectedCategory] = useState<string>("");
    // const handleCategoryClick = (categoryName: string) => {
    //     setSelectedCategory(categoryName);
    // }

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
            {categories.map((category, i) => (
                category.name === id? <li className="selectedCat book-category-menu-item button" style={selectStyle} key ={i}> <Link  to ={`/categories/${category.name}`}>{category.name}</Link> </li> :
                    <li className="book-category-menu-item button" key={i}><Link
                        to={`/categories/${category.name}`}>{category.name}</Link></li>

                // <li key={category.name} className={`book-category-menu-item button` } >
                //     <Link className="book-category-link" to={`/categories/${category.name}`} >{category.name}</Link>
                // </li>

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

