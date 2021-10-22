import { useCallback, useEffect, useRef, useState } from "react";
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

const getCommandMessage = (isSubscription: boolean, productId: string) =>
  JSON.stringify({
    event: isSubscription ? "subscribe" : "unsubscribe",
    feed: "book_ui_1",
    product_ids: [productId],
  });

export default function useDataFeed(product: string) {
  const setInitialSnapshot = useStore((state) => state.setInitialSnapshot);
  const webSocketRef = useRef<WebSocket>();
  const { queueMessage } = useThrottledMessageProcessing();
  const [activeProduct, setActiveProduct] = useState<string>();

  const handleOpen = useCallback(() => {
    const subscriptionMessage = getCommandMessage(true, product);

    if (webSocketRef.current?.OPEN) {
      webSocketRef.current?.send(subscriptionMessage);
      setActiveProduct(product);
    }
  }, [product]);

  useEffect(() => {
    webSocketRef.current = new WebSocket(ENDPOINT);
    webSocketRef.current.onopen = () => handleOpen();

    webSocketRef.current.onclose = () => console.log("ws closed");

    webSocketRef.current.onmessage = (msg) => {
      const message: MessageEvent = JSON.parse(msg.data);

      //treat the initial message upon subscription as a special case
      if (message?.feed?.toLowerCase().includes("snapshot")) {
        setInitialSnapshot({
          bids: message.bids,
          asks: message.asks,
          numLevels: message.numLevels,
          productId: message.product_id,
        });
      } else {
        // these are deltas...queue them up as there are loads!
        queueMessage(message);
      }
    };

    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, [handleOpen, setInitialSnapshot, queueMessage]);

  useEffect(
    function unSubscribeFromFeed() {
      if (activeProduct && webSocketRef.current?.OPEN) {
        const unSubscribeMessage = JSON.stringify({
          event: "subscribe",
          feed: "book_ui_1",
          product_ids: [activeProduct],
        });

        webSocketRef.current?.send(unSubscribeMessage);
      }
    },
    [activeProduct]
  );
}
