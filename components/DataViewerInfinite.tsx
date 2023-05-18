import { Flex, Spinner, Text } from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

import PlanGraph from "./PlanGraph";
import InvalidStateMessage from "./InvalidStateMessage";
import IPerson from "@/types/Person";
import * as GetPlans from "@/types/GetPlans";

interface IProps {
  results: UseInfiniteQueryResult<GetPlans.Response, Error>;
  income: number;
  people: IPerson[];
}

export default function DataViewerInfinite({
  results,
  income,
  people,
}: IProps) {
  // if (results.isLoading) {
  //   return <Spinner size="xl" />;
  // }

  // todo: improve error handling
  if (results.isError) {
    return <Text>{results.error.message}</Text>;
  }

  return (
    <>
      {results.isPreviousData && <Spinner size="xl" position={"absolute"} />}
      <Flex direction="column">
        {results.data?.pages.map((group, i) => {
          return group.plans.map((plan) => {
            return <Text key={plan.id}>{plan.name}</Text>;
          });
        })}
      </Flex>
    </>
  );
}
