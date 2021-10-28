import { OrderTuple } from "./index";

const priceComparator = (a: OrderTuple, b: OrderTuple) => {
  const aPrice = a[0];
  const bPrice = b[0];

  if (aPrice < bPrice) {
    return -1;
  }
  if (aPrice > bPrice) {
    return 1;
  }
  return 0;
};

export function calculateTotals(orders: OrderTuple[]) {
  let runningTotal = 0;

  for (let i = 0; i <= orders.length - 1; i++) {
    let order = orders[i];
    runningTotal += order[1];
    order[2] = runningTotal;
  }

  return orders;
}

export function handleDelta(
  currentOrders: OrderTuple[],
  deltas: OrderTuple[],
  numLevels: number
) {
  let deltaSize: number;
  let deltaPrice: number;

  const nextOrders = [...currentOrders];

  deltas.forEach((delta) => {
    deltaPrice = delta[0];
    deltaSize = delta[1];

    const orderIndex = nextOrders.findIndex((order) => order[0] === deltaPrice);

    if (orderIndex >= 0) {
      // updating an existing order
      if (deltaSize === 0) {
        //remove from order book
        nextOrders.splice(orderIndex, 1);
      } else {
        //update price and size
        nextOrders[orderIndex][0] = delta[0];
        nextOrders[orderIndex][1] = delta[1];
      }
    } else {
      //brand new order - sanity check on it's size
      if (deltaSize > 0) {
        nextOrders.push(delta);
      }
    }
  });

  // because new orders are pushed in at the end
  // we need to sort by price to ensure correct total calculations
  return calculateTotals(nextOrders.sort(priceComparator).slice(0, numLevels));
}
