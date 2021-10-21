import { useMemo } from "react";
import { OrderTuple, useBids } from "../../store";
import Table from "../Table";

interface OrderBookRowData extends Record<string, unknown> {
  rowIndex: number;
  price: number;
  size: number;
  total: number;
}

function mapOrdersToRowData(orders: OrderTuple[]): OrderBookRowData[] {
  return orders.map((order, index) => ({
    rowIndex: index,
    price: order[0],
    size: order[1],
    total: order[2] || 0,
  }));
}

const BidTable = () => {
  const bids = useBids();

  const data = useMemo(() => mapOrdersToRowData(bids), [bids]);

  return <Table<OrderBookRowData> data={data} />;
};

export default BidTable;
