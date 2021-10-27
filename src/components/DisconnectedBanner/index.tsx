import clsx from "clsx";
import shallow from "zustand/shallow";
import useStore from "../../store";

import styles from "./DisconnectedBanner.module.css";

interface SpreadLabelProps {
  className?: string;
}

const DisconnectedBanner = ({ className }: SpreadLabelProps) => {
  const { setShowConnectionWarning, show } = useStore(
    (state) => ({
      setInitialSnapshot: state.setInitialSnapshot,
      setShowConnectionWarning: state.setShowConnectionWarning,
      show: state.showConnectionWarning,
    }),
    shallow
  );

  const handleReconnect = () => {
    setShowConnectionWarning(false);
  };

  return show ? (
    <div className={clsx(styles.root, className)}>
      <span>The order book is currently</span>
      <strong>&nbsp;disconnected.</strong>
      <button className={styles.button} onClick={handleReconnect}>
        Reconnect Now
      </button>
    </div>
  ) : null;
};

export default DisconnectedBanner;
