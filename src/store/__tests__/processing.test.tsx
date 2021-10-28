import { OrderTuple } from "../index";
import { calculateTotalsAtLevel, handleDelta } from "../processing";

const sampleOrders: OrderTuple[] = [
  [61009.5, 1],
  [61009, 2],
  [61005.5, 3],
  [61001.5, 4],
  [61000.5, 5],
];

describe("GIVEN the processing module", () => {
  describe("WHEN totals are calculated for the order book", () => {
    let expectedResult: OrderTuple[] = [
      [61009.5, 1, 1],
      [61009, 2, 3],
      [61005.5, 3, 6],
      [61001.5, 4, 10],
      [61000.5, 5, 15],
    ];
    test("Then the total is calculated correctly for each level", () => {
      expect(calculateTotalsAtLevel(sampleOrders, 0)).toEqual(expectedResult);
    });
  });

  describe("WHEN deltas have no size", () => {
    let currentOrders: OrderTuple[] = [
      [61009.5, 1, 1],
      [62009, 2, 3],
      [63005.5, 3, 6],
      [64001.5, 4, 10],
      [65000.5, 5, 15],
    ];
    const expectedResult: OrderTuple[] = [
      [61009.5, 1, 1],
      [63005.5, 3, 4],
      [65000.5, 5, 9],
    ];
    let deltas: OrderTuple[] = [
      [62009, 0],
      [64001.5, 0],
    ];

    test("Then they are removed from the order book", () => {
      expect(handleDelta(currentOrders, deltas, 5)).toEqual(expectedResult);
    });
  });

  describe("WHEN deltas have an updated size", () => {
    let currentOrders: OrderTuple[] = [
      [61009.5, 1, 1],
      [62009, 2, 3],
      [63005.5, 3, 6],
      [64001.5, 4, 10],
      [65000.5, 5, 15],
    ];
    const expectedResult: OrderTuple[] = [
      [61009.5, 1, 1],
      [62009, 7, 8],
      [63005.5, 3, 11],
      [64001.5, 8, 19],
      [65000.5, 5, 24],
    ];
    let deltas: OrderTuple[] = [
      [62009, 7],
      [64001.5, 8],
    ];

    test("Then the orders are updated", () => {
      expect(handleDelta(currentOrders, deltas, 5)).toEqual(expectedResult);
    });
  });
});
