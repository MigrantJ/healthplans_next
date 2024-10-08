import React, { useState, useEffect, useCallback } from "react";
import { Text, Box, GridItem } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { scaleLinear } from "d3";

import IHealthPlan from "@/types/HealthPlan";
import { DisplayMode } from "@/types/DisplayMode";
import PlanlistHeader from "./PlanlistHeader";
import PlanSkeleton from "./PlanSkeleton";
import PlanModal from "./PlanModal";
import PlanListContainer from "./PlanListContainer";
import constants from "../../styles/constants";
import PremiumBar from "./PremiumBar";
import DeductibleBar from "./DeductibleBar";
import NameBar from "./NameBar";
import BookmarkButton from "./BookmarkButton";
import PlanSpinner from "./PlanSpinner";
import { usePlans, usePlanRanges } from "@/lib/planStore";
import { useCreditEstimate } from "@/lib/creditEstimateStore";
import { useFilter } from "@/lib/householdStore";
import filterPlans from "@/lib/filterPlans";
import AccessErrorMessage from "../AccessErrorMessage";
import InvalidStateModal from "../InvalidStateModal";

interface IProps {
  displayMode: DisplayMode;
}

export default function Planlist({ displayMode }: IProps) {
  const [modalPlan, setModalPlan] = useState<IHealthPlan>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isLoading, hasNextPage, isFetching } =
    usePlans();
  const creditEstimate = useCreditEstimate().data;
  const filter = useFilter();
  const ranges = usePlanRanges();

  useEffect(() => {
    if (inView) {
      void fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const openPlanModal = useCallback(
    (plan: IHealthPlan) => {
      setModalPlan(plan);
      onOpen();
    },
    [onOpen]
  );

  if (!data) return <></>;

  if (isLoading) return <PlanSpinner />;

  const alt_data = data.pages[0].alt_data;
  if (alt_data) {
    if (alt_data.type === "AuthorizationError") {
      return <AccessErrorMessage />
    }
    else if (alt_data.type === "InvalidState") {
      // todo: popup doesn't come back if you close it and put in an invalid state again
      return <InvalidStateModal {...alt_data} />
    }
  }

  const plans =
    data?.pages.reduce((acc, page) => {
      return acc.concat(page.plans);
    }, [] as IHealthPlan[]) || [];
  const filteredPlans = filterPlans(plans, filter, creditEstimate.aptc);

  const premiumExtent: [number, number] = [
    Math.max(ranges.premiums.min - creditEstimate.aptc, 0),
    Math.max(ranges.premiums.max - creditEstimate.aptc, 1),
  ];
  const xScalePremium = scaleLinear()
    .domain([0, premiumExtent[1]])
    .range([0, constants.PREMIUM_BAR_W]);
  const deductibleExtent: [number, number] = [
    ranges.deductibles.min,
    ranges.deductibles.max,
  ];

  const xScaleDeductible = scaleLinear()
    .domain([0, deductibleExtent[1] + (deductibleExtent[1] * constants.MOOP_BAR_OVERFLOW_PERCENT)])
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
            <BookmarkButton planId={plan.id} />

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
