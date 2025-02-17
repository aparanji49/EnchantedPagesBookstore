import {Link} from "react-router-dom";
import '../assets/css/confirmation.css'

function Confirmation(){
    let last_category = JSON.parse(localStorage.getItem("lastCategory") || 'Best Sellers');
    return(
        <div className="cart-div">
            <h2 className="cart-heading">Confirmation</h2>
            <div className="confirmation-body">
            <div>Thank you for your order!</div>
            <Link to={`/categories/${last_category}`} className="button continue-to-shopping">Continue Shopping</Link></div>
        </div>
    )
}

export default Confirmation;