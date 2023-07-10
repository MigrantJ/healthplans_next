import { useState } from "react";
import { Grid, useColorModeValue } from "@chakra-ui/react";

import MedicaidModal from "./MedicaidModal";
import Sidebar from "./filters/Sidebar";
import Planlist from "./planlist/Planlist";
import ComparePlans from "./compare_plans/ComparePlans";
import ModeSelector from "./ModeSelector";
import { useCreditEstimate } from "@/lib/creditEstimateStore";
import { useSavedPlans } from "@/lib/planStore";
import { DisplayMode } from "@/types/DisplayMode";
import React from "react";

export default function MainWindow() {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("Planlist");
  const creditEstimate = useCreditEstimate().data;
  const plans = useSavedPlans();
  const colorPrefix = useColorModeValue("bg_light", "bg_dark");

  return (
    <Grid
      gridTemplateColumns={{ base: "1fr", lg: "300px 1fr" }}
      backgroundColor={colorPrefix + ".700"}
    >
      <Sidebar {...{ displayMode }} />

      {creditEstimate.is_medicaid_chip && <MedicaidModal />}

      <>
        <Planlist {...{ displayMode }} />
        {displayMode === "ComparePlans" && <ComparePlans {...{ plans }} />}

        <ModeSelector {...{ displayMode, setDisplayMode }} />
      </>
    </Grid>
  );
}
