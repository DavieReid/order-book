import Big from "big.js";
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
  productId: string;
  showConnectionWarning: boolean;
  // setters
  setShowConnectionWarning: (showConnectionWarning: boolean) => void;
  setProductId: (productId: string) => void;
  setInitialSnapshot: (source: InitialSnapshotSource) => void;
  processDelta: (source: Delta) => void;
}

const useStore = create<GlobalAppState>((set, get) => ({
  bids: [],
  asks: [],
  numLevels: 25,
  productId: "PI_XBTUSD",
  showConnectionWarning: false,
  setProductId: (productId) => set({ productId, bids: [], asks: [] }),
  setShowConnectionWarning: (showConnectionWarning) =>
    set({ showConnectionWarning }),
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

export const useShowConnectionWarning = () =>
  useStore((state) => state.showConnectionWarning);

export const useBids = () => useStore((state) => state.bids || []);

export const useAsks = () => useStore((state) => state.asks || []);

export const useProductId = () => useStore((state) => state.productId);

export const useSpread = () =>
  useStore((state) => {
    const topBid: number =
      state.bids && state.bids.length >= 1 ? state.bids[0][0] : 0;
    const topAsk: number =
      state.asks && state.asks.length >= 1 ? state.asks[0][0] : 0;

    const spread = new Big(topAsk).minus(topBid);

    return {
      difference: spread.toFixed(2),
      percentageDifference:
        topAsk > 0 ? spread.div(topAsk).times(100).toFixed(2) : 0,
    };
  });

export const useHighestTotalInBook = () =>
  useStore((state) => {
    const maxTotalBid: number | undefined =
      state.bids && state.bids.length > 1
        ? state.bids[state.bids.length - 1][2]
        : 0;
    const maxTotalAsk: number | undefined =
      state.asks && state.asks.length > 1
        ? state.asks[state.asks.length - 1][2]
        : 0;

    if (maxTotalBid === undefined || maxTotalAsk === undefined) {
      return 0;
    }
    return maxTotalBid > maxTotalAsk ? maxTotalBid : maxTotalAsk;
  });

export default useStore;
