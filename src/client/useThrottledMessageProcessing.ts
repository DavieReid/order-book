import { useCallback, useEffect, useRef } from "react";
import useStore from "../store";
import type { OrderTuple } from "../store";

type MessageEvent = {
  feed: string;
  product_id: string;
  bids: OrderTuple[];
  asks: OrderTuple[];
  numLevels: number;
};

export default function useThrottledMessageProcessing(interval = 1000) {
  const processDelta = useStore((state) => state.processDelta);

  const askDeltasRef = useRef<OrderTuple[]>([]);
  const bidDeltasRef = useRef<OrderTuple[]>([]);

  const queueMessage = useCallback((message: MessageEvent) => {
    const { bids, asks } = message;

    if (bids?.length > 0) {
      bidDeltasRef.current = bidDeltasRef.current.concat(bids);
    }

    if (asks?.length > 0) {
      askDeltasRef.current = askDeltasRef.current.concat(asks);
    }
  }, []);

  useEffect(() => {
    const flush = () => {
      processDelta({
        deltaBids: bidDeltasRef.current,
        deltaAsks: askDeltasRef.current,
      });
      askDeltasRef.current = [];
      bidDeltasRef.current = [];
    };
    let timer = setInterval(flush, interval);
    return () => {
      clearInterval(timer);
    };
  }, [interval, processDelta]);

  return { queueMessage };
}
