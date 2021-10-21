import useStore, { useProductId } from "../../store";

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
  return <button onClick={handleClick}>Toggle Feed</button>;
};

export default ToggleFeedButton;
