import CartTable from "./CartTable";
import "../assets/css/Cart.css"
function Cart(){

    return (
            <div className="cart-div">
                <h2 className="cart-heading">Your Shopping Cart</h2>
            <CartTable></CartTable>
            </div>
    )
}

export default Cart;