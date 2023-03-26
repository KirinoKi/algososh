import { SHORT_DELAY_IN_MS } from "../constants/delays";
import { ElementStates } from "../types/element-states";
import { SortType, TItem, TItemArray } from "../types/utils";
import { delay, swap } from "./utils";

export const selectionSort = async (
  arr: Array<TItemArray<TItem>>,
  sortType: SortType,
  func: Function
) => {
  const newArray: Array<TItemArray<TItem>> = JSON.parse(JSON.stringify(arr));
  for (let i = 0; i < newArray.length; i++) {
    let pivotIndex = i;
    newArray[pivotIndex].state = ElementStates.Changing;

    for (let j = i; j < newArray.length; j++) {
      newArray[j].state = ElementStates.Changing;
      func([...newArray]);

      await delay(SHORT_DELAY_IN_MS);

      if (
        (sortType === SortType.Asc ? newArray[pivotIndex].item : newArray[j].item) >
        (sortType === SortType.Asc ? newArray[j].item : newArray[pivotIndex].item)
      ) {
        pivotIndex = j;
        newArray[j].state = ElementStates.Changing;
        newArray[pivotIndex].state =
          i === pivotIndex ? ElementStates.Changing : ElementStates.Default;
      }
      if (j !== pivotIndex) {
        newArray[j].state = ElementStates.Default;
      }
      func([...newArray]);
    }
    swap(newArray, i, pivotIndex);
    newArray[pivotIndex].state = ElementStates.Default;
    newArray[i].state = ElementStates.Modified;
    func([...newArray]);
  }
  return newArray;
};

export const bubbleSort = async (
  arr: Array<TItemArray<TItem>>,
  sortType: SortType,
  func: Function
) => {
  const newArray: Array<TItemArray<TItem>> = JSON.parse(JSON.stringify(arr));
  for (let i = 0; i < newArray.length; i++) {
    for (let j = 0; j < newArray.length - i - 1; j++) {
      newArray[j].state = ElementStates.Changing;
      if (newArray[j + 1]) newArray[j + 1].state = ElementStates.Changing;
      func([...newArray]);

      await delay(SHORT_DELAY_IN_MS);

      if (
        (sortType === SortType.Asc ? newArray[j].item : newArray[j + 1].item) >
        (sortType === SortType.Asc ? newArray[j + 1].item : newArray[j].item)
      ) {
        swap(newArray, j, j + 1);
      }
      newArray[j].state = ElementStates.Default;
      if (newArray[j + 1]) newArray[j + 1].state = ElementStates.Default;
      func([...newArray]);
    }
    newArray[newArray.length - i - 1].state = ElementStates.Modified;
    func([...newArray]);
  }
  return newArray;
};
