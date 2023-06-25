import { Grid } from "@chakra-ui/react";

import DataViewer from "./DataViewer";
import { useCreditEstimate, usePlanQueryStatus } from "@/lib/store";
import MedicaidModal from "./MedicaidModal";
import Sidebar from "./filters/Sidebar";
import PlanSpinner from "./planlist/PlanSpinner";

export default function MainWindow() {
  const creditEstimate = useCreditEstimate().data;
  const { isInitialLoading } = usePlanQueryStatus();

  return (
    <Grid
      gridTemplateColumns={{ base: "1fr", lg: "300px 1fr" }}
      backgroundColor="blue.700"
    >
      <Sidebar />

      {creditEstimate.is_medicaid_chip && <MedicaidModal />}

      {isInitialLoading ? <PlanSpinner /> : <DataViewer />}
    </Grid>
  );
}
