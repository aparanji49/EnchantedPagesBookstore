import React, {createContext, Dispatch, ReactNode, useReducer} from "react";
import { cartReducer, AppActions } from "../reducers/CartReducer";
import { ShoppingCartItem } from "../types";
const initialCartState:ShoppingCartItem[] =  []
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
    const [cart, dispatch] = useReducer( cartReducer as (state: ShoppingCartItem[],action: AppActions) => ShoppingCartItem[],initialCartState);
    return (
        <CartStore.Provider value={{ cart, dispatch }}>
            {children}
        </CartStore.Provider>
    );
}

export default CartContext;