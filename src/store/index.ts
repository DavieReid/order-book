import { useCallback } from "react";
import create from "zustand";

export type OrderTuple = [number, number];

type InitialSnapshotSource = {
  bids: OrderTuple[];
  asks: OrderTuple[];
};

interface GlobalAppState {
  bids?: OrderTuple[];
  asks?: OrderTuple[];
  // setters
  setInitialSnapshot: (source: InitialSnapshotSource) => void;
}

const useStore = create<GlobalAppState>((set) => ({
  bids: [],
  asks: [],
  setInitialSnapshot: ({ bids, asks }) => set({ bids, asks }),
}));

export const useBids = () => useStore(useCallback((state) => state.bids, []));

export const useAsks = () => useStore(useCallback((state) => state.asks, []));

export default useStore;
