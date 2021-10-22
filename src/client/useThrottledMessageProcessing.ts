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

export default function useThrottledMessageProcessing(interval = 500) {
  const processDelta = useStore((state) => state.processDelta);
  const dataRef = useRef(new Set<MessageEvent>());

  const queueMessage = useCallback((message: MessageEvent) => {
    dataRef.current.add(message);
  }, []);

  useEffect(() => {
    const flush = () => {
      const data = dataRef.current;
      data.forEach((message) => {
        processDelta({ deltaBids: message.bids, deltaAsks: message.asks });
      });
      data.clear();
    };
    let timer = setInterval(flush, interval);
    return () => {
      clearInterval(timer);
    };
  }, [interval, processDelta]);

  return { queueMessage };
}
