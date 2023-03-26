import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "./button";

describe("Check props component button", () => {
  it("Button props with text", () => {
    const btn = renderer.create(<Button text={"Test"} />).toJSON();
    expect(btn).toMatchSnapshot();
  });

  it("Button props without text", () => {
    const btn = renderer.create(<Button />).toJSON();
    expect(btn).toMatchSnapshot();
  });

  it("Button is disabled", () => {
    const btn = renderer.create(<Button disabled />).toJSON();
    expect(btn).toMatchSnapshot();
  });

  it("Button is loading", () => {
    const btn = renderer.create(<Button isLoader />).toJSON();
    expect(btn).toMatchSnapshot();
  });

  it("Button onClick", () => {
    window.alert = jest.fn();

    render(<Button onClick={alert("Click")} text={"Test text"} />);

    const btn = screen.getByText("Test text");
    fireEvent.click(btn);

    expect(window.alert).toHaveBeenCalledWith("Click");
  });

  it("Button onClick second test", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} text={"Test text"} />);

    userEvent.click(screen.getByText("Test text"));
    expect(onClick).toHaveBeenCalled();
  });
});
