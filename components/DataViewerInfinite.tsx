import { useEffect } from "react";
import { Flex, Spinner, Text, Card, SkeletonText } from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import * as GetPlans from "@/types/GetPlans";
import IFilter from "@/types/Filter";
import IHealthPlan from "@/types/HealthPlan";

interface IProps {
  results: UseInfiniteQueryResult<GetPlans.Response, Error>;
  filter: IFilter;
}

export default function DataViewerInfinite({ results, filter }: IProps) {
  const { ref, inView } = useInView();

  const { hasNextPage, fetchNextPage, isFetching } = results;

  useEffect(() => {
    if (!isFetching && hasNextPage && inView) {
      void fetchNextPage();
    }
  }, [inView]);

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

        // plan types
        if (filter?.types?.length && !filter.types.includes(plan.type))
          return false;

        // metal level
        if (
          filter?.metal_levels?.length &&
          !filter.metal_levels.includes(plan.metal_level)
        )
          return false;

        // medical management programs
        if (
          filter?.disease_mgmt_programs?.length &&
          !filter.disease_mgmt_programs.every((v) =>
            plan.disease_mgmt_programs.includes(v)
          )
        )
          return false;

        // issuers
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
      <Flex direction="column" minW={500}>
        {plans.map((plan) => {
          return (
            <Card key={plan.id} minH={100}>
              <Text as="b">{plan.issuer.name}</Text>
              <Text>{plan.name}</Text>
              <Text>{plan.premium}</Text>
              <Text>{plan.deductibles[0].amount}</Text>
            </Card>
          );
        })}

        {hasNextPage && (
          <Flex direction="column">
            {/* invisible element for tracking when user scrolls to bottom */}
            <Flex
              ref={ref}
              position="absolute"
              display={isFetching && "none"}
            />
            <SkeletonText noOfLines={4} />
            <SkeletonText noOfLines={4} />
            <SkeletonText noOfLines={4} />
            <SkeletonText noOfLines={4} />
            <SkeletonText noOfLines={4} />
            <SkeletonText noOfLines={4} />
            <SkeletonText noOfLines={4} />
            <SkeletonText noOfLines={4} />
          </Flex>
        )}
      </Flex>
    </>
  );
}
