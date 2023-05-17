import { Flex, Spinner, Text } from "@chakra-ui/react";
import { UseQueryResult } from "@tanstack/react-query";

import PlanGraph from "./PlanGraph";
import InvalidStateMessage from "./InvalidStateMessage";
import IPerson from "@/types/Person";
import * as GetPlans from "@/types/GetPlans";

interface IProps {
  results: UseQueryResult<GetPlans.Response, Error>;
  income: number;
  people: IPerson[];
}

export default function DataViewer({ results, income, people }: IProps) {
  if (results.isLoading) {
    return <Spinner size="xl" />;
  }

  // todo: improve error handling
  if (results.isError) {
    return <Text>{results.error.message}</Text>;
  }

  const resultsData = results.data;
  if (resultsData.plans.length) {
    return (
      <Flex direction="column" gap={1}>
        <PlanGraph plans={resultsData.plans} />
        {!(income && people.length) && (
          <Text fontWeight="bold">
            Warning: premiums and deductibles may not be accurate until you have
            entered your income and household info
          </Text>
        )}
      </Flex>
    );
  } else if (resultsData.alt_data?.type === "InvalidState") {
    return <InvalidStateMessage {...resultsData.alt_data} />;
  }
}
