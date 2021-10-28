import Big from "big.js";
import numeral from "numeral";
import { OrderTuple } from "../../store";

export function getDepthLevel(levelTotal: number, highTotal: number) {
  const depth = new Big(levelTotal).div(highTotal).times(100);
  return depth.toFixed(0, Big.roundHalfUp);
}

export interface OrderBookRowData extends Record<string, unknown> {
  rowIndex: number;
  price: string;
  size: string;
  totalRaw: number;
  total: string;
}

export function mapOrdersToRowData(orders: OrderTuple[]): OrderBookRowData[] {
  return orders.map((order, index) => ({
    rowIndex: index,
    price: numeral(order[0]).format("0,0.00"),
    size: numeral(order[1]).format("0,0"),
    totalRaw: order[2] || 0,
    total: numeral(order[2] || 0).format("0,0"),
  }));
}
