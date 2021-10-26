import clsx from "clsx";

import { useSpread } from "../../store";
import styles from "./SpreadLabel.module.css";

interface SpreadLabelProps {
  className?: string;
}

const SpreadLabel = ({ className }: SpreadLabelProps) => {
  const spread = useSpread();

  return (
    <h3 className={clsx(styles.root, className)}>
      <span className={styles.difference}>Spread: {spread.difference}</span>
      <span>({spread.percentageDifference}%)</span>
    </h3>
  );
};

export default SpreadLabel;
