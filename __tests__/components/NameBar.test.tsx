import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NameBar from "@/components/planlist/NameBar";

describe("NameBar", () => {
  test("displays the health plan name and issuer", () => {
    const testProps = {
      planName: "testName",
      issuerName: "testIssuer",
    };

    const barRender = render(<NameBar {...testProps} />);
    const planNameDisplay = screen.getByText(testProps.planName);
    expect(planNameDisplay).toBeDefined();

    const planIssuerDisplay = screen.getByText(testProps.issuerName);
    expect(planIssuerDisplay).toBeDefined();

    barRender.unmount();
  });
});
