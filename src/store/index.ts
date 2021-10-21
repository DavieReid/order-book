import create from "zustand";

export type OrderTuple = [price: number, size: number, total?: number];

type InitialSnapshotSource = {
  bids: OrderTuple[];
  asks: OrderTuple[];
  numLevels: number;
  productId: string;
};

type Delta = {
  deltaBids: OrderTuple[];
  deltaAsks: OrderTuple[];
};

interface GlobalAppState {
  bids?: OrderTuple[];
  asks?: OrderTuple[];
  numLevels?: number;
  productId?: string;
  // setters
  setInitialSnapshot: (source: InitialSnapshotSource) => void;
  processDelta: (source: Delta) => void;
}

function calculateTotalsAtLevel(orders: OrderTuple[], startLevel = 0) {
  let runningTotal = 0;

  for (let i = startLevel; i <= orders.length - 1; i++) {
    let order = orders[i];
    runningTotal += order[1];
    order[2] = runningTotal;
  }

  return orders;
}

//[64965, 0]
// 1: (2) [64965.5, 2900]

function handleDelta(currentOrders: OrderTuple[], deltas: OrderTuple[]) {
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
        console.log("removing", delta);
        nextOrders.splice(orderIndex, 1);
      } else {
        //update price
        nextOrders[orderIndex][1] = delta[1];
      }
    } else {
      //brand new order
      if (deltaSize > 0) {
        nextOrders.push(delta);
      }
    }
  });

  console.log(currentOrders.length);
  return calculateTotalsAtLevel(nextOrders);
}

const useStore = create<GlobalAppState>((set, get) => ({
  bids: [],
  asks: [],
  numLevels: 10,
  setInitialSnapshot: ({ bids, asks, numLevels, productId }) =>
    set({
      bids: calculateTotalsAtLevel(bids),
      asks: calculateTotalsAtLevel(asks),
      numLevels,
      productId,
    }),
  processDelta: ({ deltaBids, deltaAsks }) =>
    set({
      bids: handleDelta(get().bids || [], deltaBids || []),
      asks: handleDelta(get().asks || [], deltaAsks || []),
    }),
}));

export const useBids = () => useStore((state) => state.bids || []);

export const useAsks = () => useStore((state) => state.asks || []);

export default useStore;
