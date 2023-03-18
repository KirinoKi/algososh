import { DELAY_IN_MS } from "../constants/delays";
import { ElementStates } from "../types/element-states";
import { TItem, TItemArray } from "../types/utils";
import { delay, swap } from "./utils";

export const reverseCharsArray = async (
  chars: Array<TItemArray<TItem>>,
  setCharsArray: Function,
  start: number = 0,
  end: number = chars.length - 1
) => {
  const middle = chars.length / 2;

  while (start < middle) {
    chars[start].state = ElementStates.Changing;
    chars[end].state = ElementStates.Changing;
    setCharsArray([...chars]);

    await delay(DELAY_IN_MS);

    chars[start].state = ElementStates.Modified;
    chars[end].state = ElementStates.Modified;
    swap(chars, start, end);
    setCharsArray([...chars]);

    await delay(DELAY_IN_MS);

    start++;
    end--;
  }
};