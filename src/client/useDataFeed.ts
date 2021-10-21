import { useCallback, useEffect, useRef } from "react";
import useStore from "../store";
import type { OrderTuple } from "../store";
import useThrottledMessageProcessing from "./useThrottledMessageProcessing";

const ENDPOINT = "wss://www.cryptofacilities.com/ws/v1";

type MessageEvent = {
  feed: string;
  product_id: string;
  bids: OrderTuple[];
  asks: OrderTuple[];
  numLevels: number;
};

export default function useDataFeed(product: string = "PI_XBTUSD") {
  const setInitialSnapshot = useStore((state) => state.setInitialSnapshot);
  const webSocketRef = useRef<WebSocket>();
  const { queueMessage } = useThrottledMessageProcessing();

  const handleOpen = useCallback(() => {
    const subscriptionMessage = JSON.stringify({
      event: "subscribe",
      feed: "book_ui_1",
      product_ids: [product],
    });

    if (webSocketRef.current?.OPEN) {
      webSocketRef.current?.send(subscriptionMessage);
    }
  }, [product]);

  useEffect(() => {
    webSocketRef.current = new WebSocket(ENDPOINT);
    webSocketRef.current.onopen = () => handleOpen();

    webSocketRef.current.onclose = () => console.log("ws closed");

    webSocketRef.current.onmessage = (msg) => {
      const message: MessageEvent = JSON.parse(msg.data);

      if (message?.feed?.toLowerCase().includes("snapshot")) {
        setInitialSnapshot({
          bids: message.bids,
          asks: message.asks,
          numLevels: message.numLevels,
          productId: message.product_id,
        });
      } else {
        queueMessage(message);
      }
    };

    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, [handleOpen, setInitialSnapshot, queueMessage]);
}
