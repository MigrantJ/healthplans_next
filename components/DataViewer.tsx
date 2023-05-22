import { useEffect } from "react";
import {
  Flex,
  Text,
  Skeleton,
  SkeletonText,
  Grid,
  Box,
  GridItem,
} from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import * as GetPlans from "@/types/GetPlans";
import IFilter from "@/types/Filter";
import IHealthPlan from "@/types/HealthPlan";
import filterPlans from "@/lib/filterPlans";

interface IProps {
  results: UseInfiniteQueryResult<GetPlans.Response, Error>;
  filter: IFilter;
}

export default function DataViewer({ results, filter }: IProps) {
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

  const filteredPlans: IHealthPlan[] = filterPlans(results.data.pages, filter);

  return (
    <Grid
      templateColumns={"auto 150px 250px"}
      margin={"0 auto"}
      maxWidth={1000}
      overflow={"auto"}
    >
      <GridItem colSpan={3} margin={"0 auto"}>
        Estimates Only
      </GridItem>
      <Box paddingX={5}>
        <Text>Issuer</Text>
        <Text>Plan Name</Text>
      </Box>
      <Box paddingX={5}>
        Premium
        <svg height={20}>
          <rect width={100} height={20} fill="green" />
        </svg>
      </Box>
      <Box paddingX={5}>
        <Text>Deductible</Text>
        <Text>Max Out-of-Pocket</Text>
      </Box>
      {filteredPlans.map((plan, i) => {
        const bgcolor = i % 2 ? "#E0E0E0" : "#C0C0C0";
        return (
          <>
            {/* min width is necessary for the ellipsis overflow to work */}
            <Box minW={0} backgroundColor={bgcolor} paddingX={5}>
              <Text as="b">{plan.issuer.name}</Text>
              <Text
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
              >
                {plan.name}
              </Text>
            </Box>
            <Box backgroundColor={bgcolor} paddingX={5}>
              <svg height={20}>
                <rect width={100} height={20} fill="green" />
              </svg>
            </Box>
            <Box backgroundColor={bgcolor} paddingX={5}>
              <svg height={20}>
                <rect width={200} height={10} fill="cyan" />
                <rect y={10} width={200} height={10} fill="blue" />
              </svg>
            </Box>
          </>
        );
      })}

      {hasNextPage && (
        <>
          {/* invisible element for tracking when user scrolls to bottom */}
          <Flex ref={ref} display={isFetching && "none"} />
          <Box paddingX={5} paddingY={2}>
            <SkeletonText noOfLines={2} />
          </Box>
          <Box paddingX={5} paddingY={2}>
            <Skeleton height={"20px"} />
          </Box>
          <Box paddingX={5} paddingY={2}>
            <Skeleton height={"10px"} />
            <Skeleton height={"10px"} />
          </Box>
        </>
      )}
    </Grid>
  );
}
