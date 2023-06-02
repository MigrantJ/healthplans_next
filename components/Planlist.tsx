import React, { useState, useEffect } from "react";
import { Text, Box, GridItem, Icon } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import * as d3 from "d3";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";

import * as GetPlans from "@/types/GetPlans";
import IFilter from "@/types/Filter";
import IHealthPlan from "@/types/HealthPlan";
import filterPlans from "@/lib/filterPlans";
import PlanlistHeader from "./PlanlistHeader";
import PlanSkeleton from "./PlanSkeleton";
import PlanModal from "./PlanModal";

interface IProps {
  results: UseInfiniteQueryResult<GetPlans.Response, Error>;
  filter: IFilter;
  savePlan: (plan: IHealthPlan) => void;
  savedPlans: Map<string, IHealthPlan>;
}

export default function Planlist({
  results,
  filter,
  savePlan,
  savedPlans,
}: IProps) {
  const [modalPlan, setModalPlan] = useState<IHealthPlan>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { ref, inView } = useInView();
  const { hasNextPage, fetchNextPage, isFetching } = results;

  useEffect(() => {
    if (inView) {
      void fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const PREMIUM_BAR_W = 135;
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

  const openPlanModal = (index: number) => {
    setModalPlan(filteredPlans[index]);
    onOpen();
  };

  return (
    <>
      <PlanModal {...{ isOpen, onClose, modalPlan }} />
      <PlanlistHeader
        {...{
          premiumExtent,
          xScalePremium,
          deductibleExtent,
          xScaleDeductible,
        }}
      />
      {filteredPlans.map((plan, i) => {
        const premiumWidth = xScalePremium(plan.premium);
        const deductibleWidth = xScaleDeductible(plan.deductibles[0].amount);
        const moopWidth = xScaleDeductible(plan.moops[0].amount);
        return (
          <Box key={plan.id} className="plan-row">
            <Box
              className="plan-cell plan-bookmark-container"
              onClick={(_) => savePlan(plan)}
            >
              <Icon
                as={savedPlans.has(plan.id) ? RiBookmarkFill : RiBookmarkLine}
                boxSize={7}
                marginTop="10px"
              />
            </Box>
            <Box
              className="plan-cell plan-name-container"
              onClick={(_) => openPlanModal(i)}
            >
              <Text className="ellipsis">{plan.issuer.name}</Text>
              <Text className="ellipsis bold">{plan.name}</Text>
            </Box>
            <Box
              className="plan-cell plan-premium-container"
              onClick={(_) => openPlanModal(i)}
            >
              <Text className="premium-bar-label">Premium</Text>
              <svg height={30} width={premiumWidth} overflow={"visible"}>
                <rect width={PREMIUM_BAR_W} height={30} fill="darkgreen" />
                <rect width={premiumWidth} height={30} fill="green" />
                <text x={5} y={20} fill="white">
                  ${plan.premium}
                </text>
              </svg>
            </Box>
            <Box
              className="plan-cell plan-deductible-container"
              onClick={(_) => openPlanModal(i)}
            >
              <Text className="deductible-bar-label">
                Deductible / Max Out-Of-Pocket
              </Text>
              <svg
                height={30}
                width={Math.max(deductibleWidth, moopWidth)}
                overflow={"visible"}
              >
                <rect width={DEDUCTIBLE_BAR_W} height={15} fill="darkcyan" />
                <rect width={deductibleWidth} height={15} fill="cyan" />
                <text x={5} y={12}>
                  ${plan.deductibles[0].amount}
                </text>
                <rect
                  y={17}
                  width={DEDUCTIBLE_BAR_W}
                  height={15}
                  fill="darkcyan"
                />
                <rect y={17} width={moopWidth} height={15} fill="cyan" />
                <text x={5} y={29}>
                  ${plan.moops[0].amount}
                </text>
              </svg>
            </Box>
          </Box>
        );
      })}

      {hasNextPage && (
        <>
          {/* invisible element for tracking when user scrolls to bottom */}
          <GridItem ref={ref} id="scroll-ref" display={isFetching && "none"} />
          <PlanSkeleton />
        </>
      )}
    </>
  );
}