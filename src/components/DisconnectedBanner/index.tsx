import clsx from "clsx";

import { useShowConnectionWarning } from "../../store";
import styles from "./DisconnectedBanner.module.css";

interface SpreadLabelProps {
  className?: string;
}

const DisconnectedBanner = ({ className }: SpreadLabelProps) => {
  const show = useShowConnectionWarning();

  return show ? (
    <div className={clsx(styles.root, className)}>
      <span>The order book is currently</span>
      <strong>&nbsp;disconnected.</strong>
      <button className={styles.button}>Reconnect Now</button>
    </div>
  ) : null;
};

export default DisconnectedBanner;
