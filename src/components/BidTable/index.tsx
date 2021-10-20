import { useBids } from "../../store";

const BidTable = () => {
  const bids = useBids();

  console.log(bids);

  return <div> Hello</div>;
};

export default BidTable;
