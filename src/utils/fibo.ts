import { SHORT_DELAY_IN_MS } from "../constants/delays";
import { delay } from "./utils";

export const fibo = async (num: number, func: Function) => {
  const array: number[] = [];

  for (let i = 1; i <= num; i++) {
    array.push(calcFibo(i));
    func([...array]);
    await delay(SHORT_DELAY_IN_MS);
  }
};

// Из лекции
const calcFibo = (n: number, memo: Record<number, number> = {}): number => {
  if (n in memo) {
    return memo[n];
  }
  if (n <= 2) {
    return 1;
  }
  memo[n] = calcFibo(n - 1, memo) + calcFibo(n - 2, memo);
  return memo[n];
};
