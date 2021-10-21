import AskTable from "../AskTable";
import BidTable from "../BidTable";
import "./OrderBook.css";

const OrderBook = () => (
  <section className="order-book-root">
    <h2>Order Book</h2>
    <section className="order-book-tables">
      <BidTable />
      <AskTable />
    </section>
  </section>
);

export default OrderBook;
