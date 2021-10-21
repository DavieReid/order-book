import create from "zustand";
import { calculateTotalsAtLevel, handleDelta } from "./processing";

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
  numLevels: number;
  productId?: string;
  // setters
  setInitialSnapshot: (source: InitialSnapshotSource) => void;
  processDelta: (source: Delta) => void;
}

const useStore = create<GlobalAppState>((set, get) => ({
  bids: [],
  asks: [],
  numLevels: 25,
  setInitialSnapshot: ({ bids, asks, numLevels, productId }) =>
    set({
      bids: calculateTotalsAtLevel(bids),
      asks: calculateTotalsAtLevel(asks),
      numLevels,
      productId,
    }),
  processDelta: ({ deltaBids, deltaAsks }) =>
    set({
      bids: handleDelta(get().bids || [], deltaBids || [], get().numLevels),
      asks: handleDelta(get().asks || [], deltaAsks || [], get().numLevels),
    }),
}));

export const useBids = () => useStore((state) => state.bids || []);

export const useAsks = () => useStore((state) => state.asks || []);

export default useStore;
