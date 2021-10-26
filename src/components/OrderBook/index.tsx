import useDataFeed from "../../client/useDataFeed";
import { useProductId } from "../../store";
import AskTable from "../AskTable";
import BidTable from "../BidTable";
import ToggleFeedButton from "../ToggleFeedButton";
import SpreadLabel from "../SpreadLabel";
import styles from "./OrderBook.module.css";

const OrderBook = () => {
  const selectedProductId = useProductId();
  useDataFeed(selectedProductId);

  return (
    <section className={styles.root}>
      <h2 className={styles.title}>Order Book</h2>
      <SpreadLabel />
      <section className={styles.tableSection}>
        <BidTable />
        <AskTable />
      </section>
      <ToggleFeedButton />
    </section>
  );
};

export default OrderBook;
