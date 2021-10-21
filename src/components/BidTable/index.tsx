import { useMemo } from "react";
import { OrderTuple, useBids } from "../../store";
import { asUSD } from "../../utils/prices";
import Table from "../Table";

interface OrderBookRowData extends Record<string, unknown> {
  rowIndex: number;
  price: string;
  size: number;
  total: number;
}

function mapOrdersToRowData(orders: OrderTuple[]): OrderBookRowData[] {
  return orders.map((order, index) => ({
    rowIndex: index,
    total: order[2] || 0,
    size: order[1],
    price: asUSD.format(order[0]),
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
  },
];

const BidTable = () => {
  const bids = useBids();

  const data = useMemo(() => mapOrdersToRowData(bids), [bids]);

  return <Table<OrderBookRowData> columns={columns} data={data} />;
};

export default BidTable;
