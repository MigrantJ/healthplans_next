import { useEffect } from "react";
import {
  Text,
  Skeleton,
  SkeletonText,
  Grid,
  Box,
  GridItem,
  Flex,
  Button,
} from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "react-responsive";
import * as d3 from "d3";

import * as GetPlans from "@/types/GetPlans";
import IFilter from "@/types/Filter";
import IHealthPlan from "@/types/HealthPlan";
import filterPlans from "@/lib/filterPlans";
import PlanlistHeader from "./PlanlistHeader";

interface IProps {
  results: UseInfiniteQueryResult<GetPlans.Response, Error>;
  filter: IFilter;
  showResults: boolean;
}

export default function DataViewer({ results, filter, showResults }: IProps) {
  const { ref, inView } = useInView();

  const { hasNextPage, fetchNextPage, isFetching } = results;

  useEffect(() => {
    if (inView) {
      void fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // todo: improve error handling
  if (results.isError) {
    return <Text>{results.error.message}</Text>;
  }

  if (!results.data) {
    return <></>;
  }

  const COL_PADDING = 3;
  const PREMIUM_BAR_W = 125;
  const DEDUCTIBLE_BAR_W = 225;

  const plans: IHealthPlan[] = results.data.pages.reduce((acc, page) => {
    return acc.concat(page.plans);
  }, [] as IHealthPlan[]);
  const premiumExtent: [number, number] = [
    results.data.pages[0].ranges.premiums.min,
    results.data.pages[0].ranges.premiums.max,
  ];
  const xScalePremium = d3
    .scaleLinear()
    .domain([0, premiumExtent[1]])
    .range([0, PREMIUM_BAR_W]);
  const deductibleExtent: [number, number] = [
    results.data.pages[0].ranges.deductibles.min,
    results.data.pages[0].ranges.deductibles.max,
  ];
  const xScaleDeductible = d3
    .scaleLinear()
    .domain([0, deductibleExtent[1]])
    .range([0, DEDUCTIBLE_BAR_W]);

  const filteredPlans: IHealthPlan[] = filterPlans(plans, filter);
  const skeletons = [...Array<null>(5)].map((_, i) => (
    <>
      <Box key={`skel0_${i}`} paddingX={`${COL_PADDING}px`} paddingY={2}>
        <SkeletonText noOfLines={2} />
      </Box>
      <Box key={`skel1_${i}`} paddingX={`${COL_PADDING}px`} paddingY={2}>
        <Skeleton height={"20px"} />
      </Box>
      <Box key={`skel2_${i}`} paddingX={`${COL_PADDING}px`} paddingY={2}>
        <Skeleton height={"10px"} />
        <Skeleton height={"10px"} />
      </Box>
    </>
  ));

  return (
    <Grid id="planlist" display={isMobile && !showResults ? "none" : "grid"}>
      <PlanlistHeader
        {...{
          premiumExtent,
          xScalePremium,
          deductibleExtent,
          xScaleDeductible,
        }}
      />
      {filteredPlans.map((plan, i) => {
        const bgcolor = i % 2 ? "#E0E0E0" : "#C0C0C0";
        const premiumWidth = xScalePremium(plan.premium);
        const deductibleWidth = xScaleDeductible(plan.deductibles[0].amount);
        const moopWidth = xScaleDeductible(plan.moops[0].amount);
        return (
          <>
            {/* min width is necessary for the ellipsis overflow to work */}
            <Box
              key={`${plan.id}_name`}
              className="plan-name-container"
              backgroundColor={bgcolor}
              paddingX={`${COL_PADDING}px`}
            >
              <Text as="b" className="ellipsis">
                {plan.issuer.name}
              </Text>
              <Text className="ellipsis">{plan.name}</Text>
            </Box>
            <Box
              key={`${plan.id}_premium`}
              className="plan-premium-container"
              minW={0}
              backgroundColor={bgcolor}
              paddingX={`${COL_PADDING}px`}
              paddingY={"10px"}
            >
              <svg height={30} width={premiumWidth}>
                <rect width={premiumWidth} height={30} fill="green" />
                <text x={5} y={20} fill="white">
                  {plan.premium}
                </text>
              </svg>
            </Box>
            <Box
              key={`${plan.id}_deductible`}
              className="plan-deductible-container"
              backgroundColor={bgcolor}
              paddingX={`${COL_PADDING}px`}
              paddingY={"10px"}
            >
              <svg height={30} width={Math.max(deductibleWidth, moopWidth)}>
                <rect width={deductibleWidth} height={15} fill="cyan" />
                <text x={5} y={13} fontSize={"16px"}>
                  {plan.deductibles[0].amount}
                </text>
                <rect y={15} width={moopWidth} height={15} fill="teal" />
                <text x={5} y={27}>
                  {plan.moops[0].amount}
                </text>
              </svg>
            </Box>
          </>
        );
      })}

      {hasNextPage && (
        <>
          {/* invisible element for tracking when user scrolls to bottom */}
          <GridItem ref={ref} display={isFetching && "none"} colSpan={3} />
          {skeletons}
        </>
      )}
    </Grid>
  );
}
