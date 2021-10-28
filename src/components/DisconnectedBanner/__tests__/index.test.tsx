import DisconnectedBanner from "../index";
import { render, screen } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import useStore from "../../../store";

describe("GIVEN a `DisconnectedBanner`", () => {
  describe("WHEN `setShowConnectionWarning` is false", () => {
    test("THEN the Banner is *NOT* displayed", () => {
      render(<DisconnectedBanner />);

      expect(
        screen.queryByText("The order book is currently")
      ).not.toBeInTheDocument();
    });
  });

  describe("WHEN `setShowConnectionWarning` is true", () => {
    beforeEach(() => {
      const { result } = renderHook(() => useStore());
      act(() => result.current.setShowConnectionWarning(true));
    });
    test("THEN the Banner is  displayed", () => {
      render(<DisconnectedBanner />);

      expect(
        screen.queryByText("The order book is currently")
      ).toBeInTheDocument();
    });
  });
});
