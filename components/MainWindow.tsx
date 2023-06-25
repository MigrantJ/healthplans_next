import { Grid, Spinner } from "@chakra-ui/react";

import DataViewer from "./DataViewer";
import { useCreditEstimate, usePlans } from "@/lib/store";
import MedicaidModal from "./MedicaidModal";
import Sidebar from "./filters/Sidebar";

export default function MainWindow() {
  const creditEstimate = useCreditEstimate().data;
  const results = usePlans((data) => data);

  return (
    <Grid
      gridTemplateColumns={{ base: "1fr", lg: "300px 1fr" }}
      backgroundColor="blue.700"
    >
      <Sidebar />

      {creditEstimate.is_medicaid_chip && <MedicaidModal />}

      {results.isInitialLoading ? (
        <Spinner
          thickness="4px"
          color="white"
          emptyColor="gray.500"
          height={50}
          width={50}
          alignSelf="center"
          justifySelf="center"
        />
      ) : (
        <DataViewer
          {...{
            results,
          }}
        />
      )}
    </Grid>
  );
}
