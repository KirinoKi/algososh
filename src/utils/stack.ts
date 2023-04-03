import { TItemArray } from "../types/utils";

export type TStackElement = TItemArray<string | null>;

interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  clearStack: () => Array<T>;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    return this.container[this.getSize() - 1] || null;
  };

  getSize = () => this.container.length;

  clearStack = () => (this.container = []);
}
