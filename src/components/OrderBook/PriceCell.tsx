import { FC } from "react";

type Side = "bid" | "ask";

interface PriceCellProps {
  value: string;
  side: Side;
}

const PriceCell: FC<PriceCellProps> = ({
  value,
  side = "bid",
}: {
  value: string;
  side: Side;
}) => {
  const color = `var(--color-${side})`;
  return <div style={{ color }}>{value}</div>;
};
export default PriceCell;
