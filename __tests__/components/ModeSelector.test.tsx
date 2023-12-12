import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ModeSelector from "@/components/ModeSelector";

describe("ModeSelector", () => {
  test("in Filters mode, has the Show Plans button", () => {
    const displayMode = "Filters";
    const setDisplayMode = () => {};

    const modeSelRender = render(
      <ModeSelector {...{ displayMode, setDisplayMode }} />
    );
    const showPlansButton = screen.getByRole("button", { name: "Show Plans" });
    expect(showPlansButton).toBeDefined();

    modeSelRender.unmount();
  });

  test("in Planlist mode, has the Compare button", () => {
    const displayMode = "Planlist";
    const setDisplayMode = () => {};

    const modeSelRender = render(
      <ModeSelector {...{ displayMode, setDisplayMode }} />
    );
    const compareButton = screen.getByRole("button", { name: "Compare (0)" });
    expect(compareButton).toBeDefined();

    modeSelRender.unmount();
  });

  test("in ComparePlans mode, has the Show Plans button", () => {
    const displayMode = "ComparePlans";
    const setDisplayMode = () => {};

    const modeSelRender = render(
      <ModeSelector {...{ displayMode, setDisplayMode }} />
    );
    const showPlansButton = screen.getByRole("button", { name: "Show Plans" });
    expect(showPlansButton).toBeDefined();

    modeSelRender.unmount();
  });
});
