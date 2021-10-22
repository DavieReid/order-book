import { FC } from "react";

type Side = "bid" | "ask";

interface PriceCellProps {
  value: string;
  side: Side;
}

const PriceCell: FC<PriceCellProps> = ({ value, side = "bid" }) => {
  const color = `var(--color-${side})`;
  return <div style={{ display: "flex", minWidth: 18, color }}>{value}</div>;
};
export default PriceCell;
