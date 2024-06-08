import {createContext, Dispatch, ReactNode, useReducer} from "react";
import {initialOrderState, OrderDetails} from "../types";
import {AppActions, OrderDetailsReducer} from "../reducers/orderDetailsReducer";

export const OrderDetailsStore = createContext<{
    orderDetails: OrderDetails;
    dispatcher: Dispatch<any>;
}>({
    orderDetails: initialOrderState,
    dispatcher: () => null as any,
});

OrderDetailsStore.displayName = "OrderDetailsContext";

export function OrderDetailsContext({children}: {children: ReactNode}) {
const [orderDetails, dispatcher] = useReducer(OrderDetailsReducer as (state: OrderDetails, action: AppActions) => OrderDetails, initialOrderState, (initialState) => {
    try{
        const storedCart = JSON.parse(localStorage.getItem('orders') || '[]');
        return storedCart as OrderDetails || initialState;

    }catch(e){
        console.log("error while parsing the cart",e);
        return initialState;
    }
},
);
return (<OrderDetailsStore.Provider value={{orderDetails, dispatcher}}>{children}</OrderDetailsStore.Provider>);
}
export default OrderDetailsContext;