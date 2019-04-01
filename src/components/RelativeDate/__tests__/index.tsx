import * as React from "react";
import { create, ReactTestRenderer } from "react-test-renderer";
import RelativeDate from "..";

describe("RelativeDate component", () => {
  const date = Date.now();
  let dom: ReactTestRenderer;

  beforeEach(() => {
    dom = create(<RelativeDate date={date} />);
  });

  it("renders correctly", () => {
    expect(dom).toMatchSnapshot();
  });

  it("renders correctly on touch", () => {
    const staticDom = create(<RelativeDate date={1553904714478} />);
    staticDom.root.instance.toggleRelativeDate();
    expect(staticDom).toMatchSnapshot();
  });

  it("updates state touch", () => {
    expect(dom.root.instance.state.showRelativeDate).toBe(true);
    dom.root.instance.toggleRelativeDate();
    expect(dom.root.instance.state.showRelativeDate).toBe(false);
    dom.root.instance.toggleRelativeDate();
    expect(dom.root.instance.state.showRelativeDate).toBe(true);
  });

  it("kills timer on unmount", () => {
    const timer = dom.root.instance.timer;
    expect(timer._onTimeout).not.toBeNull();
    dom.unmount();
    expect(timer._onTimeout).toBeNull();
  });
});
