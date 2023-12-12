import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import currencyFormatter from "@/lib/currencyFormatter";
import DeductibleBar from "@/components/planlist/DeductibleBar";

describe("DeductibleBar", () => {
  test("displays the deductible and max out of pocket properly formatted into currency", () => {
    const testProps = {
      deductible: 10,
      deductibleWidth: 100,
      moop: 20,
      moopWidth: 200,
    };

    const barRender = render(<DeductibleBar {...testProps} />);

    const deductibleText = screen.getByText(
      currencyFormatter.format(testProps.deductible)
    );
    expect(deductibleText).toBeDefined();
    const moopText = screen.getByText(currencyFormatter.format(testProps.moop));
    expect(moopText).toBeDefined();

    barRender.unmount();
  });
});
