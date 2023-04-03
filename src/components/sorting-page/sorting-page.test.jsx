import { ElementStates } from "../../types/element-states";
import { SortType } from "../../types/utils";
import { bubbleSort, selectionSort } from "../../utils/sotring";

const emptyArr = [];
const inArrOneItem = [{ item: 1, state: ElementStates.Default }];
const outArrOneItem = [{ item: 1, state: ElementStates.Modified }];
const inArray = [
  { item: 1, state: ElementStates.Default },
  { item: 7, state: ElementStates.Default },
  { item: 4, state: ElementStates.Default },
  { item: 0, state: ElementStates.Default },
];
const outArrayAsc = [
  { item: 0, state: ElementStates.Modified },
  { item: 1, state: ElementStates.Modified },
  { item: 4, state: ElementStates.Modified },
  { item: 7, state: ElementStates.Modified },
];
const outArrayDesc = [
  { item: 7, state: ElementStates.Modified },
  { item: 4, state: ElementStates.Modified },
  { item: 1, state: ElementStates.Modified },
  { item: 0, state: ElementStates.Modified },
];

describe("Sorting-page test bubble and selection sort", () => {
  it("bubble sort with empty array", async () => {
    expect(await bubbleSort(emptyArr, SortType.Asc, () => {})).toEqual(
      emptyArr
    );
  });

  it("selection sort with empty array", async () => {
    expect(await selectionSort(emptyArr, SortType.Asc, () => {})).toEqual(
      emptyArr
    );
  });

  it("bubble sort asc with array of one element", async () => {
    expect(await bubbleSort(inArrOneItem, SortType.Asc, () => {})).toEqual(
      outArrOneItem
    );
  });

  it("selection sort asc with array of one element", async () => {
    expect(await selectionSort(inArrOneItem, SortType.Asc, () => {})).toEqual(
      outArrOneItem
    );
  });

  it("bubble sort desc with array of one element", async () => {
    expect(await bubbleSort(inArrOneItem, SortType.Desc, () => {})).toEqual(
      outArrOneItem
    );
  });

  it("selection sort desc with array of one element", async () => {
    expect(await selectionSort(inArrOneItem, SortType.Desc, () => {})).toEqual(
      outArrOneItem
    );
  });

  it("bubble sort asc with array of multiple elements", async () => {
    expect(await bubbleSort(inArray, SortType.Asc, () => {})).toEqual(
      outArrayAsc
    );
  });

  it("selection sort asc with array of multiple elements", async () => {
    expect(await selectionSort(inArray, SortType.Asc, () => {})).toEqual(
      outArrayAsc
    );
  }, 6000);

  it("bubble sort desc with array of multiple elements", async () => {
    expect(await bubbleSort(inArray, SortType.Desc, () => {})).toEqual(
      outArrayDesc
    );
  });

  it("selection sort desc with array of multiple elements", async () => {
    expect(await selectionSort(inArray, SortType.Desc, () => {})).toEqual(
      outArrayDesc
    );
  }, 6000);
});
