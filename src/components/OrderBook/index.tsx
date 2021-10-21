import AskTable from "../AskTable";
import BidTable from "../BidTable";
import "./OrderBook.css";

const OrderBook = () => (
  <section className="order-book-root">
    <BidTable />
    <AskTable />
  </section>
);

export default OrderBook;
