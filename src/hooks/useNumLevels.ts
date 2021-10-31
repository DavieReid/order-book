import useResizeObserver from "@react-hook/resize-observer";
import useStore from "../store";
import shallow from "zustand/shallow";

export const useNumLevels = (targetElemRef: any) => {
  const { setNumLevels } = useStore(
    (state) => ({
      setNumLevels: state.setNumLevels,
    }),
    shallow
  );

  useResizeObserver(targetElemRef, (entry: ResizeObserverEntry) => {
    const width = entry.contentRect.width;
    setNumLevels(width <= 600 ? 9 : 25);
  });
};
