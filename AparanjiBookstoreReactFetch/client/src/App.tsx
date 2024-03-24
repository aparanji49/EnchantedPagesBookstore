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


function App() {
    const [categories, setCategories] = useState([]);
// axios.defaults.baseURL='/AparanjiBookstoreReactFetch/api/';
    useEffect(() => {
        axios.get('/AparanjiBookstoreReactFetch/api/categories')
            .then((result) => setCategories(result.data ))
            .catch(console.error);
    }, []);

  return (
      <Router basename={"AparanjiBookstoreReactFetch"}>
        <AppHeader catList={categories} />
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/categories" element={<CategoryBookList catList ={categories} />} >
                <Route path=":id" element={<CategoryBookList catList= {categories}  />} /> </Route>
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
        <AppFooter />
      </Router>
  );
}

export default App;

