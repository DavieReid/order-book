import ToggleFeedButton, { XBTUSD, ETHUSD } from "../index";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import useStore from "../../../store";

describe("GIVEN a `ToggleFeedButton`", () => {
  describe(`WHEN the button is clicked multiple times`, () => {
    test(`THEN the product is switched between ${XBTUSD} & ${ETHUSD}`, () => {
      render(<ToggleFeedButton />);

      const { result } = renderHook(() => useStore());
      const button = screen.getByRole("button");
      act(() => userEvent.click(button));
      expect(result.current.productId).toEqual(ETHUSD);

      act(() => userEvent.click(button));
      expect(result.current.productId).toEqual(XBTUSD);

      act(() => userEvent.click(button));
      expect(result.current.productId).toEqual(ETHUSD);
    });
  });
});
