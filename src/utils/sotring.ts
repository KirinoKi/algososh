import { SHORT_DELAY_IN_MS } from "../constants/delays";
import { ElementStates } from "../types/element-states";
import { SortType, TItem, TItemArray } from "../types/utils";
import { delay, swap } from "./utils";

export const selectionSort = async (
  arr: Array<TItemArray<TItem>>,
  sortType: SortType,
  func: Function
) => {
  for (let i = 0; i < arr.length; i++) {
    let pivotIndex = i;
    arr[pivotIndex].state = ElementStates.Changing;

    for (let j = i; j < arr.length; j++) {
      arr[j].state = ElementStates.Changing;
      func([...arr]);

      await delay(SHORT_DELAY_IN_MS);

      if (
        (sortType === SortType.Asc ? arr[pivotIndex].item : arr[j].item) >
        (sortType === SortType.Asc ? arr[j].item : arr[pivotIndex].item)
      ) {
        pivotIndex = j;
        arr[j].state = ElementStates.Changing;
        arr[pivotIndex].state =
          i === pivotIndex ? ElementStates.Changing : ElementStates.Default;
      }
      if (j !== pivotIndex) {
        arr[j].state = ElementStates.Default;
      }
      func([...arr]);
    }
    swap(arr, i, pivotIndex);
    arr[pivotIndex].state = ElementStates.Default;
    arr[i].state = ElementStates.Modified;
    func([...arr]);
  }
};

export const bubbleSort = async (
  arr: Array<TItemArray<TItem>>,
  sortType: SortType,
  func: Function
) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].state = ElementStates.Changing;
      if (arr[j + 1]) arr[j + 1].state = ElementStates.Changing;
      func([...arr]);

      await delay(SHORT_DELAY_IN_MS);

      if (
        (sortType === SortType.Asc ? arr[j].item : arr[j + 1].item) >
        (sortType === SortType.Asc ? arr[j + 1].item : arr[j].item)
      ) {
        swap(arr, j, j + 1);
      }
      arr[j].state = ElementStates.Default;
      if (arr[j + 1]) arr[j + 1].state = ElementStates.Default;
      func([...arr]);
    }
    arr[arr.length - i - 1].state = ElementStates.Modified;
    func([...arr]);
  }
};