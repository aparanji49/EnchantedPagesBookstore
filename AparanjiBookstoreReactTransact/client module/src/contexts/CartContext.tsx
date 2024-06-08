import React, {createContext, Dispatch, ReactNode, useEffect, useReducer} from "react";
import { cartReducer, AppActions } from "../reducers/CartReducer";
import { ShoppingCartItem } from "../types";
const initialCartState:ShoppingCartItem[] =  [];
const storageKey = 'cart';
// Define the context type

// Create the context
export const CartStore = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: initialCartState,
    dispatch: () => null
});

// Define the props type for CartContext component
interface CartContextProps {
    children: ReactNode;
}

CartStore.displayName = 'CartContext';
// CartContext component
export function CartContext({ children }: CartContextProps) {
    const [cart, dispatch] = useReducer( cartReducer as (state: ShoppingCartItem[],action: AppActions) => ShoppingCartItem[],initialCartState, (initialState) =>{
        try{
            const storedCart = JSON.parse(localStorage.getItem(storageKey) || `[]`);
            return storedCart as ShoppingCartItem[] || initialState;
        }catch (error){
            console.log('error parsing the cart', error);
            return initialState;
        }
    });
    useEffect(() => {
        // Update localStorage whenever cart changes
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
    return (
        <CartStore.Provider value={{ cart, dispatch }}>
            {children}
        </CartStore.Provider>
    );
}

export default CartContext;