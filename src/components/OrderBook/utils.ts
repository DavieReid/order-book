import Big from "big.js";
import numeral from "numeral";
import { OrderTuple } from "../../store";
import { asUSD } from "../../utils/prices";

export function getDepthLevel(levelTotal: number, highTotal: number) {
  const depth = new Big(levelTotal).div(highTotal).times(100);
  return depth.toFixed(2);
}

export interface OrderBookRowData extends Record<string, unknown> {
  rowIndex: number;
  price: string;
  size: string;
  total: number;
}

export function mapOrdersToRowData(orders: OrderTuple[]): OrderBookRowData[] {
  return orders.map((order, index) => ({
    rowIndex: index,
    price: asUSD.format(order[0]),
    size: numeral(order[1]).format("0,0"),
    total: order[2] || 0,
  }));
}
