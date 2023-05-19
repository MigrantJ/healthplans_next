import { Flex, Spinner, Text, Card } from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

import * as GetPlans from "@/types/GetPlans";
import IFilter from "@/types/Filter";
import IHealthPlan from "@/types/HealthPlan";

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

  const plans: IHealthPlan[] = results.data.pages.reduce((acc, page) => {
    acc = acc.concat(
      page.plans.filter((plan) => {
        // premium
        if (
          filter?.premium_range &&
          (filter.premium_range.min > plan.premium ||
            plan.premium > filter.premium_range.max)
        )
          return false;

        // deductible
        if (
          filter?.deductible_range &&
          (filter.deductible_range.min > plan.deductibles[0].amount ||
            plan.deductibles[0].amount > filter.deductible_range.max)
        )
          return false;

        if (
          filter?.issuers?.length &&
          !filter.issuers.includes(plan.issuer.name)
        )
          return false;
        return true;
      })
    );
    return acc;
  }, [] as IHealthPlan[]);

  return (
    <>
      {results.isLoading && <Spinner size="xl" position={"absolute"} />}
      <Flex direction="column">
        {plans.map((plan) => {
          return (
            <Card key={plan.id} minH={100}>
              <Text as="b">{plan.issuer.name}</Text>
              <Text>{plan.name}</Text>
            </Card>
          );
        })}

        <Text ref={inViewRef}>
          {results.hasNextPage ? "LOADING..." : "NO MORE PAGES!"}
        </Text>
      </Flex>
    </>
  );
}
