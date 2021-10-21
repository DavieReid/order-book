import useDataFeed from "../../client/useDataFeed";
import { useProductId } from "../../store";
import AskTable from "../AskTable";
import BidTable from "../BidTable";
import ToggleFeedButton from "../ToggleFeedButton";
import "./OrderBook.css";

const OrderBook = () => {
  const selectedProductId = useProductId();
  useDataFeed(selectedProductId);
  return (
    <section className="order-book-root">
      <h2>Order Book</h2>
      <section className="order-book-tables">
        <BidTable />
        <AskTable />
      </section>
      <ToggleFeedButton />
    </section>
  );
};

export default OrderBook;
