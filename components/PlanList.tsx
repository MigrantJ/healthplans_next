import { useQuery } from "@tanstack/react-query";

import Plan from "./Plan";
import getPlans from "@/lib/getPlans";

export default function PlanList({ zipCode, state, countyCode }) {
  if (!zipCode || !state || !countyCode) {
    return <></>;
  }

  const results = useQuery(["location", zipCode, state, countyCode], getPlans);
  if (results.isLoading) {
    return <>Loading...</>;
  }

  const plans = results.data;
  debugger;
  return (
    <>
      {plans?.map((plan) => (
        <Plan plan={plan} key={plan.name} />
      ))}
    </>
  );
}
