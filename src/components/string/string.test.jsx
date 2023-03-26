import { ElementStates } from "../../types/element-states";
import { reverseCharsArray } from "../../utils/string";

describe("Reverse string", () => {
  it("with an even number of characters", async () => {
    const inArray = [
      { item: "1", state: ElementStates.Default },
      { item: "7", state: ElementStates.Default },
      { item: "4", state: ElementStates.Default },
      { item: "0", state: ElementStates.Default },
    ];
    const outArray = [
      { item: "0", state: ElementStates.Modified },
      { item: "4", state: ElementStates.Modified },
      { item: "7", state: ElementStates.Modified },
      { item: "1", state: ElementStates.Modified },
    ];
    expect(await reverseCharsArray(inArray, () => {})).toEqual(outArray);
  });

  it("with an odd number of characters", async () => {
    const inArray = [
      { item: "1", state: ElementStates.Default },
      { item: "7", state: ElementStates.Default },
      { item: "4", state: ElementStates.Default },
    ];
    const outArray = [
      { item: "4", state: ElementStates.Modified },
      { item: "7", state: ElementStates.Modified },
      { item: "1", state: ElementStates.Modified },
    ];
    expect(await reverseCharsArray(inArray, () => {})).toEqual(outArray);
  });

  it("with one character", async () => {
    const inArray = [{ item: "1", state: ElementStates.Default }];
    const outArray = [{ item: "1", state: ElementStates.Modified }];
    expect(await reverseCharsArray(inArray, () => {})).toEqual(outArray);
  });

  it("empty line", async () => {
    const array = [];
    expect(await reverseCharsArray(array, () => {})).toEqual(array);
  });
});
