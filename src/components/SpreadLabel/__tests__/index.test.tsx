import SpreadLabel from "../index";
import { render, screen } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import useStore, { OrderTuple } from "../../../store";

const bids: OrderTuple[] = [[100, 10, 5]];
const asks: OrderTuple[] = [[102, 10, 2]];

describe("GIVEN a `SpreadLabel`", () => {
  describe("WHEN `setShowConnectionWarning` is true", () => {
    beforeEach(() => {
      const { result } = renderHook(() => useStore());
      act(() =>
        result.current.setInitialSnapshot({
          bids,
          asks,
          numLevels: 1,
          productId: "test-product",
        })
      );
    });
    test("THEN the Spread value is displayed", () => {
      render(<SpreadLabel />);
      expect(screen.queryByText("Spread: 2.00")).toBeInTheDocument();
    });

    test("THEN the Spread percentage is displayed", () => {
      render(<SpreadLabel />);

      expect(screen.queryByText("(1.96%)")).toBeInTheDocument();
    });
  });
});
