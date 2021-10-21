import { useMemo } from "react";
import { OrderTuple, useAsks } from "../../store";
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
    price: asUSD.format(order[0]),
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
