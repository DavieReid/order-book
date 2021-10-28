import { useMemo } from "react";
import { useBids } from "../../store";
import PriceCell from "../OrderBook/PriceCell";
import Table from "../Table";

import styles from "./BidTable.module.css";
import { mapOrdersToRowData, OrderBookRowData } from "../OrderBook/utils";

const columns = [
  {
    Header: "Total",
    accessor: "total",
  },
  {
    Header: "Size",
    accessor: "size",
  },
  {
    Header: "Price",
    accessor: "price",
    Cell: ({ value }: { value: string }) => (
      <PriceCell side="bid" value={value} />
    ),
  },
];

const BidTable = () => {
  const bids = useBids();
  const data = useMemo(() => mapOrdersToRowData(bids), [bids]);

  return (
    <Table<OrderBookRowData>
      columns={columns}
      data={data}
      headerClassName={styles.header}
      rowClassName={styles.depthLevel}
    />
  );
};

export default BidTable;
