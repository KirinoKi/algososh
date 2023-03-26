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
  const newArray: Array<TItemArray<TItem>> = JSON.parse(JSON.stringify(chars));
  const middle = newArray.length / 2;

  while (start < middle) {
    newArray[start].state = ElementStates.Changing;
    newArray[end].state = ElementStates.Changing;
    setCharsArray([...newArray]);

    await delay(DELAY_IN_MS);

    newArray[start].state = ElementStates.Modified;
    newArray[end].state = ElementStates.Modified;
    swap(newArray, start, end);
    setCharsArray([...newArray]);

    await delay(DELAY_IN_MS);

    start++;
    end--;
  }
  return newArray;
};
