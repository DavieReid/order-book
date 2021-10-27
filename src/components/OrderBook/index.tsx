import useDataFeed from "../../client/useDataFeed";
import { useProductId } from "../../store";
import AskTable from "../AskTable";
import BidTable from "../BidTable";
import ToggleFeedButton from "../ToggleFeedButton";
import SpreadLabel from "../SpreadLabel";
import DisconnectedBanner from "../DisconnectedBanner";
import styles from "./OrderBook.module.css";

const OrderBook = () => {
  const selectedProductId = useProductId();
  useDataFeed(selectedProductId);

  return (
    <section className={styles.root}>
      <DisconnectedBanner />
      <h2 className={styles.title}>Order Book</h2>
      <SpreadLabel className={styles.spreadTop} />
      <section className={styles.tableSection}>
        <BidTable />
        <SpreadLabel className={styles.spreadMiddle} />
        <AskTable />
      </section>
      <ToggleFeedButton />
    </section>
  );
};

export default OrderBook;
