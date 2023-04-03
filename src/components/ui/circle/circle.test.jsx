import React from "react";
import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";

import { Circle } from "./circle";

describe("Check props component Circle", () => {
  it("Circle props without text", () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle props with text", () => {
    const circle = renderer.create(<Circle letter="letter" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle props with head", () => {
    const circle = renderer.create(<Circle head={"head"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle props with react component in head", () => {
    const circle = renderer
      .create(<Circle head={<Circle letter="letter" />} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle props with tail", () => {
    const circle = renderer.create(<Circle tail={"tail"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle props with react component in tail", () => {
    const circle = renderer
      .create(<Circle tail={<Circle letter="letter" />} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle props with index", () => {
    const circle = renderer.create(<Circle index={"index"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle props with isSmail", () => {
    const circle = renderer.create(<Circle isSmall />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle props in state Default", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle props in state Changing", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle props in state Modified", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
});
