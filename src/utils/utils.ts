import { TItem, TItemArray } from "../types/utils";

export const delay = (milliseconds: number) =>
  new Promise((res) => setTimeout(res, milliseconds));

export const swap = (
  array: Array<TItemArray<TItem>>,
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
};

const getRandomNumber = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max + 1);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomArr = (
  min: number = 0,
  max: number = 100,
  sizeArray: number = getRandomNumber(3, 17)
): Array<number> => {
  const array: Array<number> = [];

  for (let i = 0; i < sizeArray; i++) {
    array.push(getRandomNumber(min, max));
  }
  return array;
};
