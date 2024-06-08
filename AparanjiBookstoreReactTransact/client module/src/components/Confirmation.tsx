import {Link} from "react-router-dom";
import '../assets/css/confirmation.css'
import ConfirmationTable from './ConfirmationTable'
import {useContext} from "react";
import {OrderDetailsStore} from "../contexts/OrderDetailsContext";
import {asDollarsAndCents} from "../utils";
function Confirmation(){
    let last_category = JSON.parse(localStorage.getItem("lastCategory") || 'Best Sellers');

    const { orderDetails, dispatcher} = useContext(OrderDetailsStore);
    const lastfourdigits = orderDetails?.customer?.ccNumber.toString().slice(-4);

    const reformatTimestamp = (timestamp: string | number) => {
        const date = new Date(timestamp);
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear().toString().slice(2);
        return `${month}/${year}`;
    };
    const clearOrders = () => {
        dispatcher({ type: 'CLEAR'});
    };

    const orderDate =  () => {
        let date = new Date(orderDetails?.order?.dateCreated);
        return ( date.toLocaleString());
    };
    const ccExpDate =  (): Date =>{
        return new Date(orderDetails?.customer?.ccExpDate);
    };
     return(
        <div className="cart-div">
            <h2 className="cart-heading">Confirmation</h2>
            <div className="confirmation-body">
                <div>Your order is confirmed.</div>
                {/*confirmation number, the date-time stamp for the transaction*/}
                <ul className="conf-number">
                    <li className="conf-number-text"><b>Confirmation #: </b> {orderDetails?.order.confirmationNumber}</li>
                    <li className="conf-date"><b>Placed on:</b> {orderDate()}</li>
                </ul>

                <ConfirmationTable/>
                {/*surcharge/tax and total*/}

                {/* customer information including name, email, address, last four digits of the credit-card, and expiration date*/}
                <div>Details provided at checkout:</div>
                <ul className="cust-details">
                    <li className="cust-details-text"><b>Name:</b> <span>{orderDetails?.customer?.name}</span></li>
                    <li className="cust-details-text"><b>Address:</b> {orderDetails?.customer?.address}</li>
                    <li className="cust-details-text"><b>Email:</b> {orderDetails?.customer?.email}</li>
                    <li className="cust-details-text"><b>Phone:</b>{orderDetails?.customer?.phone}</li>
                    <li className="cust-details-text"><b>Credit Card:</b> **** ****
                        **** {lastfourdigits} ({reformatTimestamp(orderDetails.customer.ccExpDate)})</li>
                </ul>

                <div id="customerInfo"></div>

                <Link to={`/categories/${last_category}`} className="button continue-to-shopping">Continue
                    Shopping</Link></div>
        </div>
     )
}

export default Confirmation;