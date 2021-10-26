import { useMemo } from "react";
import clsx from "clsx";
import { OrderTuple, useBids, useHighestTotalInBook } from "../../store";
import { asUSD } from "../../utils/prices";
import PriceCell from "../OrderBook/PriceCell";
import Table from "../Table";

import styles from "./BidTable.module.css";

interface OrderBookRowData extends Record<string, unknown> {
  rowIndex: number;
  price: string;
  size: number;
  total: number;
  depthLevel: string;
}

function mapOrdersToRowData(
  orders: OrderTuple[],
  highTotal: number
): OrderBookRowData[] {
  return orders.map((order, index) => ({
    rowIndex: index,
    price: asUSD.format(order[0]),
    size: order[1],
    total: order[2] || 0,
    depthLevel:
      highTotal > 0 && order[2]
        ? ((order[2] / highTotal) * 100).toFixed(2)
        : "0%",
  }));
}

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
  const high = useHighestTotalInBook();
  const data = useMemo(() => mapOrdersToRowData(bids, high), [bids, high]);

  return (
    <Table<OrderBookRowData>
      columns={columns}
      data={data}
      rowClassName={clsx(styles.depthLevel)}
    />
  );
};

export default BidTable;
