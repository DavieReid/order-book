import useStore, { useProductId } from "../../store";
import styles from "./ToggleFeedButton.module.css";

const XBTUSD = "PI_XBTUSD";
const ETHUSD = "PI_ETHUSD";

const ToggleFeedButton = () => {
  const selectedProductId = useProductId();
  const setProductId = useStore((state) => state.setProductId);

  const handleClick = () => {
    if (selectedProductId === XBTUSD) {
      setProductId(ETHUSD);
    } else {
      setProductId(XBTUSD);
    }
  };
  return (
    <div className={styles.root}>
      <button className={styles.toggle} onClick={handleClick}>
        Toggle Feed
      </button>
    </div>
  );
};

export default ToggleFeedButton;
