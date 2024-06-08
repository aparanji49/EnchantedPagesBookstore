import {CategoryItem} from "../types";
import React, {ReactNode, useEffect, useState} from "react";
import axios from "axios";

export const Category = React.createContext([] as CategoryItem[]);
Category.displayName = 'CategoryContext';

interface CategoryContextProps {
    children: ReactNode; // ReactNode type allows any valid JSX content
}
const CategoryContext: React.FC<CategoryContextProps> = ( {children} ) => {
    // cut/paste the categories code here from the App component
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    useEffect(() => {
        axios.get('/AparanjiBookstoreReactValidate/api/categories')
            .then((result) => setCategories(result.data ))
            .catch(console.error);
    }, []);

    return (
        <Category.Provider value ={categories}>{children}</Category.Provider>
    );
}
export default CategoryContext;
