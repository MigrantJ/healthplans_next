import { Flex, Spinner, Text, Card } from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

import * as GetPlans from "@/types/GetPlans";
import IFilter from "@/types/Filter";

interface IProps {
  results: UseInfiniteQueryResult<GetPlans.Response, Error>;
  filter: IFilter;
  inViewRef: (node?: Element) => void;
}

export default function DataViewerInfinite({
  results,
  filter,
  inViewRef,
}: IProps) {
  // todo: improve error handling
  if (results.isError) {
    return <Text>{results.error.message}</Text>;
  }

  if (!results.data) {
    return <></>;
  }

  return (
    <>
      {results.isLoading && <Spinner size="xl" position={"absolute"} />}
      <Flex direction="column">
        {results.data?.pages.map((group, i) => {
          return group.plans.map((plan) => {
            return (
              <Card key={plan.id}>
                <Text as="b">{plan.issuer.name}</Text>
                <Text>{plan.name}</Text>
              </Card>
            );
          });
        })}

        <Text ref={inViewRef}>
          {results.hasNextPage ? "LOADING..." : "NO MORE PAGES!"}
        </Text>
      </Flex>
    </>
  );
}
