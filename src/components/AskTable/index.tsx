import { useMemo } from "react";
import clsx from "clsx";
import { OrderTuple, useAsks, useHighestTotalInBook } from "../../store";
import { asUSD } from "../../utils/prices";
import PriceCell from "../OrderBook/PriceCell";
import Table from "../Table";

import styles from "./AskTable.module.css";

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
        : "0",
  }));
}

const columns = [
  {
    Header: "Price",
    accessor: "price",
    Cell: ({ value }: { value: string }) => (
      <PriceCell side="ask" value={value} />
    ),
  },
  {
    Header: "Size",
    accessor: "size",
  },
  {
    Header: "Total",
    accessor: "total",
  },
];

const AskTable = () => {
  const asks = useAsks();
  const high = useHighestTotalInBook();
  const data = useMemo(() => mapOrdersToRowData(asks, high), [asks, high]);

  //console.log(data);

  return (
    <Table<OrderBookRowData>
      columns={columns}
      data={data}
      rowClassName={clsx(styles.depthLevel)}
    />
  );
};

export default AskTable;
