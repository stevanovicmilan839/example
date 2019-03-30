import * as React from "react";
import { create } from "react-test-renderer";
import RelativeDate from "..";

const date = 1553904714478;

it("renders correctly", () => {
  const dom = create(<RelativeDate date={date} />).toJSON();
  expect(dom).toMatchSnapshot();
});

it("renders correctly on touch", () => {
  const dom = create(<RelativeDate date={date} />);
  dom.root.instance.toggleRelativeDate();
  expect(dom).toMatchSnapshot();
});

it("updates state touch", () => {
  const dom = create(<RelativeDate date={date} />);
  expect(dom.root.instance.state.showRelativeDate).toBe(true);
  dom.root.instance.toggleRelativeDate();
  expect(dom.root.instance.state.showRelativeDate).toBe(false);
  dom.root.instance.toggleRelativeDate();
  expect(dom.root.instance.state.showRelativeDate).toBe(true);
});

it("kills timer on unmount", () => {
  const dom = create(<RelativeDate date={date} />);
  const timer = dom.root.instance.timer;
  expect(timer._onTimeout).not.toBeNull();
  dom.unmount();
  expect(timer._onTimeout).toBeNull();
});
