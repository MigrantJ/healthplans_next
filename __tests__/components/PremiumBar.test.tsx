import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import currencyFormatter from "@/lib/currencyFormatter";
import PremiumBar from "@/components/planlist/PremiumBar";

describe("PremiumBar", () => {
  test("displays the premium amount properly formatted into currency", () => {
    const testProps = {
      premium: 1,
      premiumWidth: 100,
    };

    const barRender = render(<PremiumBar {...testProps} />);
    const premiumText = screen.getByText(
      currencyFormatter.format(testProps.premium)
    );
    expect(premiumText).toBeDefined();

    barRender.unmount();
  });
});
