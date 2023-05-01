import { useQuery } from "@tanstack/react-query";

import Plan from "./Plan";
import getPlans, { GetPlansResponse } from "@/lib/getPlans";
import ILocation from "@/types/Location";

export default function PlanList({ zipCode, state, countyfips }: ILocation) {
  const results = useQuery<GetPlansResponse>(
    ["location", { zipCode, state, countyCode: countyfips }],
    getPlans
  );

  if (!zipCode || !state || !countyfips) {
    return <></>;
  }

  if (results.isLoading) {
    return <>Loading...</>;
  }

  const resultsData = results.data;
  return (
    <>
      {resultsData.plans.map((plan) => (
        <Plan plan={plan} key={plan.name} />
      ))}
    </>
  );
}
