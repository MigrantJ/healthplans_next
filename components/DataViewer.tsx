import { useQuery } from "@tanstack/react-query";
import { Flex, Spinner, Text } from "@chakra-ui/react";

import PlanList from "./PlanList";
import PlanGraph from "./PlanGraph";
import getPlans from "@/lib/getPlans";
import ILocation from "@/types/Location";
import IHousehold from "@/types/Household";
import GetPlansResponse from "@/types/GetPlansResponse";

interface IProps {
  location: ILocation;
  income: number;
  household: IHousehold;
}

export default function DataViewer({ location, income, household }: IProps) {
  const results = useQuery<GetPlansResponse>(
    ["query", { location, income, household }],
    getPlans
  );

  if (!location) {
    return <></>;
  }

  if (results.isLoading) {
    return <Spinner size="xl" />;
  }

  const resultsData = results.data;
  return resultsData.plans.length ? (
    <Flex direction="column" gap={1}>
      <Flex width="1000">
        <PlanGraph plans={resultsData.plans} />
      </Flex>
      <PlanList plans={resultsData.plans} />
    </Flex>
  ) : (
    <Text>Sorry, there are no plans available for your household!</Text>
  );
}
