import { ElementStates } from "./element-states";

export type TItem = string | number;

export type TItemArray<T> = {
  item: T;
  state: ElementStates;
};

export enum SortType {
  Asc = "Asc",
  Desc = "Desc",
}

export enum SortMethod {
  Choise = "Choise",
  Bubble = "Bubble",
}
