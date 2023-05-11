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
  const results = useQuery<GetPlansResponse, Error>({
    queryKey: ["query", { location, income, household }],
    queryFn: getPlans,
    enabled: !!location,
  });

  if (results.isLoading) {
    return <Spinner size="xl" />;
  }

  if (results.isError) {
    return <Text>{results.error.message}</Text>;
  }

  const resultsData = results.data;
  return resultsData.plans.length ? (
    <Flex direction="column" gap={1}>
      <PlanGraph plans={resultsData.plans} />
      {!(income && household.people.length) && (
        <Text fontWeight="bold">
          Warning: premiums and deductibles may not be accurate until you've
          entered your income and household info
        </Text>
      )}
      <PlanList plans={resultsData.plans} />
    </Flex>
  ) : (
    <Text>Sorry, there are no plans available for your household!</Text>
  );
}
