import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home'
import CategoryBookList from './components/CategoryBookList';
import {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom"
import axios from "axios";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";


function App() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get('/AparanjiBookstoreReactSession/api/categories')
            .then((result) => setCategories(result.data ))
            .catch(console.error);
    }, []);

  return (
      <Router basename={"AparanjiBookstoreReactSession"}>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/categories" element={<CategoryBookList />} >
                <Route path=":id" element={<CategoryBookList />} /> </Route>
          <Route path="*" element={<div>Page Not Found</div>} />

        </Routes>
        <AppFooter />
      </Router>
  );
}

export default App;

