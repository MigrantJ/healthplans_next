import React, { useState, useEffect, useCallback } from "react";
import { Text, Box, GridItem } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { scaleLinear } from "d3";

import * as GetPlans from "@/types/GetPlans";
import IFilter from "@/types/Filter";
import IHealthPlan from "@/types/HealthPlan";
import filterPlans from "@/lib/filterPlans";
import PlanlistHeader from "./PlanlistHeader";
import PlanSkeleton from "./PlanSkeleton";
import PlanModal from "./PlanModal";
import PlanListContainer from "./PlanListContainer";
import constants from "../../styles/constants";
import PremiumBar from "./PremiumBar";
import DeductibleBar from "./DeductibleBar";
import NameBar from "./NameBar";
import { DisplayMode } from "@/types/DisplayMode";
import BookmarkButton from "./BookmarkButton";
import { useCreditEstimate } from "@/lib/store";

interface IProps {
  displayMode: DisplayMode;
  results: UseInfiniteQueryResult<GetPlans.Response, Error>;
  filter: IFilter;
  savePlan: (plan: IHealthPlan) => void;
  savedPlans: Map<string, IHealthPlan>;
}

export default function Planlist({
  displayMode,
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
  const creditEstimate = useCreditEstimate().data;

  const plans: IHealthPlan[] = results.data.pages.reduce((acc, page) => {
    return acc.concat(page.plans);
  }, [] as IHealthPlan[]);
  const filteredPlans: IHealthPlan[] = filterPlans(
    plans,
    filter,
    creditEstimate.aptc
  );

  const openPlanModal = useCallback(
    (plan: IHealthPlan) => {
      setModalPlan(plan);
      onOpen();
    },
    [onOpen]
  );

  const planPages = results.data?.pages;
  if (!planPages) {
    return <></>;
  }

  const premiumExtent: [number, number] = [
    Math.max(
      results.data.pages[0].ranges.premiums.min - creditEstimate.aptc,
      0
    ),
    Math.max(
      results.data.pages[0].ranges.premiums.max - creditEstimate.aptc,
      1
    ),
  ];
  const xScalePremium = scaleLinear()
    .domain([0, premiumExtent[1]])
    .range([0, constants.PREMIUM_BAR_W]);
  const deductibleExtent: [number, number] = [
    results.data.pages[0].ranges.deductibles.min,
    results.data.pages[0].ranges.deductibles.max,
  ];
  const xScaleDeductible = scaleLinear()
    .domain([0, deductibleExtent[1]])
    .range([0, constants.DEDUCTIBLE_BAR_W]);

  if (!hasNextPage && !filteredPlans.length) {
    return (
      <GridItem gridColumn="1/5">
        <Text>No plans match your filters!</Text>
      </GridItem>
    );
  }

  return (
    <PlanListContainer display={displayMode === "Planlist" ? "grid" : "none"}>
      <PlanModal {...{ isOpen, onClose, modalPlan, creditEstimate }} />
      <PlanlistHeader
        {...{
          premiumExtent,
          xScalePremium,
          deductibleExtent,
          xScaleDeductible,
        }}
      />
      {filteredPlans.map((plan) => {
        const discountPremium = Math.max(plan.premium - creditEstimate.aptc, 1);
        const premiumWidth = xScalePremium(discountPremium);
        const deductible = plan.deductibles[0].amount;
        const deductibleWidth = xScaleDeductible(deductible);
        const moop = plan.moops[0].amount;
        const moopWidth = xScaleDeductible(moop);
        return (
          <Box
            key={plan.id}
            className="group"
            display="contents"
            cursor="pointer"
            onClick={() => openPlanModal(plan)}
          >
            <BookmarkButton
              saved={savedPlans.has(plan.id)}
              {...{ plan, savePlan }}
            />

            <NameBar planName={plan.name} issuerName={plan.issuer.name} />

            <PremiumBar premium={discountPremium} premiumWidth={premiumWidth} />

            <DeductibleBar
              {...{ deductible, deductibleWidth, moop, moopWidth }}
            />
          </Box>
        );
      })}

      {hasNextPage && (
        <>
          {/* invisible element for tracking when user scrolls to bottom */}
          <GridItem ref={ref} display={isFetching && "none"} gridColumn="1/5" />
          <PlanSkeleton />
        </>
      )}
    </PlanListContainer>
  );
}
