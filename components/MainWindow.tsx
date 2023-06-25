import { Grid } from "@chakra-ui/react";

import MedicaidModal from "./MedicaidModal";
import Sidebar from "./filters/Sidebar";
import PlanSpinner from "./planlist/PlanSpinner";
import Planlist from "./planlist/Planlist";
import ComparePlans from "./compare_plans/ComparePlans";
import ModeSelector from "./ModeSelector";
import { useDisplayMode } from "@/lib/householdStore";
import { useCreditEstimate } from "@/lib/creditEstimateStore";
import { usePlanQueryStatus } from "@/lib/planStore";

export default function MainWindow() {
  const creditEstimate = useCreditEstimate().data;
  const { isInitialLoading } = usePlanQueryStatus();
  const displayMode = useDisplayMode();

  return (
    <Grid
      gridTemplateColumns={{ base: "1fr", lg: "300px 1fr" }}
      backgroundColor="blue.700"
    >
      <Sidebar />

      {creditEstimate.is_medicaid_chip && <MedicaidModal />}

      {isInitialLoading ? (
        <PlanSpinner />
      ) : (
        <>
          <Planlist />
          {displayMode === "ComparePlans" && <ComparePlans />}

          <ModeSelector />
        </>
      )}
    </Grid>
  );
}
