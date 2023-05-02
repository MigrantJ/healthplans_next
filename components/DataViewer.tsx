import { useQuery } from "@tanstack/react-query";
import { Flex } from "@chakra-ui/react";

import PlanList from "./PlanList";
import PlanGraph from "./PlanGraph";
import getPlans, { GetPlansResponse } from "@/lib/getPlans";
import ILocation from "@/types/Location";

export default function DataViewer({ zipCode, state, countyfips }: ILocation) {
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
    <Flex bg="green.500" direction="row" gap={1}>
      <Flex width="400">
        <PlanGraph plans={resultsData.plans} />
      </Flex>
      <PlanList plans={resultsData.plans} />
    </Flex>
  );
}