import {Link} from "react-router-dom";

function Checkout(){
    return(
        <div>
            <h3>CheckOut</h3>
            <Link className="button checkout-button" to="/">Place Order</Link>
            <Link className="button continue-to-shopping" to="/cart">Go Back</Link>
        </div>
    )
}
export default Checkout;