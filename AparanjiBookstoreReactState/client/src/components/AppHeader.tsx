import '../assets/css/global.css'
import '../assets/css/AppHeader.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import HeaderDropdown from "./HeaderDropdown";
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
// import {CategoryItem} from "../types";
// import {Category} from "../contexts/CategoryContext";
// import {useContext} from "react";

function AppHeader(){
    const {cart} = useContext(CartStore);

    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
 //   const categories = useContext<CategoryItem[]>(Category);
    return(

  // <header className="container">
  //   <section className="bookstore-logo">
  //     <Link to="/">
  //       <img
  //         src={require('../assets/images/site/bookstore-logo.png')}
  //         alt="Another Bookstore Logo"
  //         width="150px"
  //         height="auto"
  //       />
  //     </Link>
  //   </section>
  //   <section className="title-and-search-bar">
  //     <h1>
  //       <Link to="/" className="text-logo"> Another Bookstore </Link>
  //     </h1>
  //     <form action="">
  //       <input type="text" className="search-bar" /><br />
  //       <input type="submit" className="button search-button" value="Search" />
  //     </form>
  //   </section>
  //   <section className="header-dropdown-and-cart">
  //     <button className="button">cart (0)</button>
  //     <button className="button">login</button>
  //     <HeaderDropdown />
  //   </section>
  // </header>
    <header className="container">
        <section className="bookstore-logo-and-text">
            <Link to="/">
                <img
                    src={require('../assets/images/site/Logo-enchanted-pages.png')}
                    alt="Enchanted Pages Logo"
                />
            </Link>
        </section>
        <section className="menu-items">
            <HeaderDropdown />
            <form action="/categories">
                <div className="search-bar-with-icon">
                    <div className="search-bar">
                        <input type="text" className="search-input" placeholder="Search books, genres, ..."/>
                    </div>
                    <div className="search-icon">
                        <Link to="CategoryBookList"><FontAwesomeIcon icon={faMagnifyingGlass} /></Link>
                    </div>

                </div>
            </form>
            <section className="cart-section">
                <Link id="cart-icon" to="/"><img className="cart" src={require('../assets/images/site/Cart.png')} alt="cart"/></Link>
                <div className="cart-count">{cartQuantity}</div>
            </section>
            <section>
                <Link className="button login-button" to="/">Login</Link>
            </section>
        </section>
    </header>

)
}

export default AppHeader;

