    import {useContext} from "react";
    import {OrderDetailsStore} from "../contexts/OrderDetailsContext";
    import {asDollarsAndCents} from "../utils";
    import {BookItem, OrderDetails, ShoppingCartItem} from "../types";

    function ConfirmationTable() {
        const {orderDetails} = useContext(OrderDetailsStore);

        const calcSubtotal = (book: BookItem) => {
            let subtotal=0;
            orderDetails.lineItems?.map((litem) => {
                    if(litem.bookId == book.bookId){
                        subtotal+=litem.quantity*book.price;
                    }
                }

            );
            return subtotal;
        }

        const getquantity = (book: BookItem) =>{
            let quantity = 0;
            orderDetails.lineItems?.forEach((litem) => {
                if (litem.bookId === book.bookId) {
                    quantity = litem.quantity;
                }
            });
            return quantity;
        }


        // const totalPrice=0;
        // function subTotalBookCart(item: ShoppingCartItem) {
        //     return item.quantity*item.item.price;
        // }
        // function totalBookCart(orderDetails: OrderDetails){
        //     let totalCount=0;
        //     orderDetails.map((item: OrderDetails) => (
        //         orderDetails.map((bookItem: BookItem))(
        //
        //         )
        //     ));
        //     return totalCount;
        // }
        // orderDetails.books?.map((book: BookItem, bookIndex: number) => {
            // const lineItem = orderDetails.lineItems.find(item => item.bookId === book.bookId);

 return (

            <table className="confirmation_table">
                {/*  the cart information (book name, quantity, price),*/}


                {

                    orderDetails.books?.map((book, i) => (

                        <tr className="confirmation_tr" key={i}>
                            <td className="confirmation_td">
                                <b>Book:</b> {book.title}
                            </td>
                            <td className="confirmation_td">({asDollarsAndCents((book.price))} x {getquantity(book)}) </td>
                            <td className="confirmation_td"> {asDollarsAndCents(calcSubtotal(book))}</td>
                        </tr>
                        // totalPrice+=asDollarsAndCents((book.price));
                    ))}
                <tr>
                    <td><b>Surcharge:</b></td>
                    <td></td>
                    <td>{asDollarsAndCents(5)}</td>
                </tr>
                <tr>
                    <td><b>Total:</b></td>
                    <td></td>
                    <td><b>{asDollarsAndCents(orderDetails.order.amount)}</b></td>
                </tr>


            </table>
        )
            ;
    }

    export default ConfirmationTable;
