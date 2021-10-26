import { useSpread } from "../../store";

const SpreadLabel = () => {
  const spread = useSpread();

  return (
    <h3 style={{ color: "white" }}>
      Spread: {spread.difference}({spread.percentageDifference}%)
    </h3>
  );
};

export default SpreadLabel;
