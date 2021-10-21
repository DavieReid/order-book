import create from "zustand";

export type OrderTuple = [price: number, size: number, total?: number];

type InitialSnapshotSource = {
  bids: OrderTuple[];
  asks: OrderTuple[];
  numLevels: number;
  productId: string;
};

interface GlobalAppState {
  bids?: OrderTuple[];
  asks?: OrderTuple[];
  numLevels?: number;
  productId?: string;
  // setters
  setInitialSnapshot: (source: InitialSnapshotSource) => void;
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

const useStore = create<GlobalAppState>((set) => ({
  bids: [],
  asks: [],
  setInitialSnapshot: ({ bids, asks, numLevels, productId }) =>
    set({
      bids: calculateTotalsAtLevel(bids),
      asks: calculateTotalsAtLevel(asks),
      numLevels,
      productId,
    }),
}));

export const useBids = () => useStore((state) => state.bids || []);

export const useAsks = () => useStore((state) => state.asks || []);

export default useStore;
