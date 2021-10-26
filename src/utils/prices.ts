import Big from "big.js";

export const asUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function getDepthLevel(levelTotal: number, highTotal: number) {
  const depth = new Big(levelTotal).div(highTotal).times(100);
  return depth.toFixed(2);
}
