import React, { useCallback, useState } from "react";
import { Text, Box } from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

import * as GetPlans from "@/types/GetPlans";
import IFilter from "@/types/Filter";
import IHealthPlan from "@/types/HealthPlan";
import InvalidStateMessage from "./InvalidStateMessage";
import { DisplayMode } from "@/types/DisplayMode";
import Planlist from "./planlist/Planlist";
import ComparePlans from "./compare_plans/ComparePlans";
import ModeSelector from "./ModeSelector";
import { Estimate } from "@/types/GetCreditEstimate";

interface IProps {
  displayMode: DisplayMode;
  setDisplayMode: (d: DisplayMode) => void;
  results: UseInfiniteQueryResult<GetPlans.Response, Error>;
  filter: IFilter;
  creditEstimates: Estimate[];
}

export default function DataViewer({
  displayMode,
  setDisplayMode,
  results,
  filter,
  creditEstimates,
}: IProps) {
  const [savedPlans, setSavedPlans] = useState<Map<string, IHealthPlan>>(
    new Map()
  );

  const savePlan = useCallback(
    (plan: IHealthPlan) => {
      const clonedMap = new Map(savedPlans);
      if (clonedMap.has(plan.id)) {
        clonedMap.delete(plan.id);
      } else {
        clonedMap.set(plan.id, plan);
      }
      setSavedPlans(clonedMap);
    },
    [savedPlans]
  );

  // todo: improve error handling
  if (results.isError) {
    return <Text>{results.error.message}</Text>;
  }

  if (!results.data) {
    return <></>;
  }

  const altResponse = results.data?.pages?.[0].alt_data;
  if (altResponse) {
    if (altResponse.type === "InvalidState") {
      return (
        <Box gridColumn="1 / 5">
          <InvalidStateMessage {...altResponse} />
        </Box>
      );
    }
  }

  const numSavedPlans = savedPlans.size;

  return (
    <>
      <Planlist
        {...{
          displayMode,
          results,
          filter,
          savePlan,
          savedPlans,
          creditEstimates,
        }}
      />
      {displayMode === "ComparePlans" && (
        <ComparePlans
          plans={Array.from(savedPlans.values())}
          {...{ savePlan, creditEstimates }}
        />
      )}

      {results.data && (
        <ModeSelector {...{ displayMode, setDisplayMode, numSavedPlans }} />
      )}
    </>
  );
}
