import React, { useCallback } from "react";
import { useToast } from "@chakra-ui/react";

import IHealthPlan from "@/types/HealthPlan";
import Planlist from "./planlist/Planlist";
import ComparePlans from "./compare_plans/ComparePlans";
import ModeSelector from "./ModeSelector";
import constants from "../styles/constants";
import { useDisplayMode } from "@/lib/store";

export default function DataViewer() {
  const displayMode = useDisplayMode();
  const toast = useToast();

  // const savePlan = useCallback(
  //   (plan: IHealthPlan) => {
  //     const clonedMap = new Map(savedPlans);
  //     if (clonedMap.has(plan.id)) {
  //       clonedMap.delete(plan.id);
  //     } else {
  //       if (savedPlans.size === constants.MAX_SAVED_PLANS) {
  //         toast({
  //           description: `You can compare a maximum of ${constants.MAX_SAVED_PLANS} plans`,
  //           status: "error",
  //           duration: constants.TOAST_DURATION,
  //           isClosable: true,
  //         });
  //         return;
  //       }
  //       clonedMap.set(plan.id, plan);
  //     }
  //     setSavedPlans(clonedMap);
  //   },
  //   [savedPlans, toast]
  // );

  return (
    <>
      <Planlist />
      {displayMode === "ComparePlans" && <ComparePlans />}

      <ModeSelector />
    </>
  );
}
