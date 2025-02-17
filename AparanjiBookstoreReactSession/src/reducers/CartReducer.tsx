import {ShoppingCartItem, BookItem} from "../types";


export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR: 'CLEAR'
};

export type AppActions = {
    id:number;
    type: 'ADD' | 'REMOVE'  | 'CLEAR';
    item: BookItem;
}

export const initialCartState: ShoppingCartItem[] = [];

const findBook = (carts: ShoppingCartItem[], id: number) =>
    carts.find((item) => item.id === id);

export const cartReducer = (state: ShoppingCartItem[], action: AppActions) => {
    // console.log(action.item.bookId);
    switch (action.type) {
        case CartTypes.ADD:
            if (findBook(state, action.item.bookId)) {
                return state.map((item) =>
                    item.id === action.item.bookId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [
                ...state,
                { id: action.item.bookId, item: action.item, quantity: 1 },
            ];
        case CartTypes.REMOVE:
            if (findBook(state, action.item.bookId)) {
                return state
                    .map((item) =>
                        item.id === action.item.bookId
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                    .filter((item) => item.quantity > 0);
            }
            return state; // Return the current state if the book is not found
        case CartTypes.CLEAR:
            return [];
        default:
            console.log("error");
            return state; // Return the current state for unknown actions
    }
};
