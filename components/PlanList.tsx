import { useQuery } from "@tanstack/react-query";

import Plan from "./Plan";
import getPlans, { GetPlansResponse } from "@/lib/getPlans";

interface IProps {
  zipCode: string;
  state: string;
  countyCode: string;
}

export default function PlanList({ zipCode, state, countyCode }: IProps) {
  const results = useQuery<GetPlansResponse>(
    ["location", { zipCode, state, countyCode }],
    getPlans
  );

  if (!zipCode || !state || !countyCode) {
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
