import { useEffect } from "react";
import {
  Text,
  Skeleton,
  SkeletonText,
  Grid,
  Box,
  GridItem,
} from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import * as d3 from "d3";

import * as GetPlans from "@/types/GetPlans";
import IFilter from "@/types/Filter";
import IHealthPlan from "@/types/HealthPlan";
import filterPlans from "@/lib/filterPlans";
import PlanlistHeader from "./PlanlistHeader";

interface IProps {
  results: UseInfiniteQueryResult<GetPlans.Response, Error>;
  filter: IFilter;
}

export default function DataViewer({ results, filter }: IProps) {
  const { ref, inView } = useInView();

  const { hasNextPage, fetchNextPage, isFetching } = results;

  useEffect(() => {
    if (inView) {
      void fetchNextPage();
    }
  }, [inView, fetchNextPage]);

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
  const premiumExtent = d3.extent(plans, (p) => p.premium);
  const xScalePremium = d3
    .scaleLinear()
    .domain([0, premiumExtent[1]])
    .range([0, PREMIUM_BAR_W]);
  const deductibleExtent = d3.extent(plans, (p) => p.moops[0].amount);
  const xScaleDeductible = d3
    .scaleLinear()
    .domain([0, deductibleExtent[1]])
    .range([0, DEDUCTIBLE_BAR_W]);

  const filteredPlans: IHealthPlan[] = filterPlans(results.data.pages, filter);
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
    <Grid id="planlist">
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
              minW={0}
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
              minW={0}
              backgroundColor={bgcolor}
              paddingX={`${COL_PADDING}px`}
              paddingY={"10px"}
            >
              <svg height={20} width={premiumWidth}>
                <rect width={premiumWidth} height={20} fill="green" />
              </svg>
            </Box>
            <Box
              key={`${plan.id}_deductible`}
              backgroundColor={bgcolor}
              paddingX={`${COL_PADDING}px`}
              paddingY={"10px"}
            >
              <svg height={20} width={Math.max(deductibleWidth, moopWidth)}>
                <rect width={deductibleWidth} height={10} fill="cyan" />
                <rect y={10} width={moopWidth} height={10} fill="blue" />
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
