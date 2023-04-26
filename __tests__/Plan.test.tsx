import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Plan from "../components/Plan";
import { IHealthPlan } from "@/types/HealthPlan";

test("displays the health plan name", async () => {
  const planProp: IHealthPlan = {
    name: "test",
  };
  const planRender = render(<Plan plan={planProp} />);

  const planNameDisplay = await planRender.findByTestId("plan-name-display");
  expect(planNameDisplay.innerText).toContain(planProp.name);
  planRender.unmount();
  expect(true).toBeTruthy();
});
