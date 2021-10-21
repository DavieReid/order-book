import { useMemo } from "react";
import { OrderTuple, useAsks } from "../../store";
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

const AskTable = () => {
  const asks = useAsks();
  const data = useMemo(() => mapOrdersToRowData(asks), [asks]);
  return <Table<OrderBookRowData> data={data} />;
};

export default AskTable;
