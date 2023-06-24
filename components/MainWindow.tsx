import { useState } from "react";
import { Grid, Spinner } from "@chakra-ui/react";

import IPerson from "@/types/Person";
import IFilter from "@/types/Filter";
import { DisplayMode } from "@/types/DisplayMode";
import DataViewer from "./DataViewer";
import { useCreditEstimate, usePlans } from "@/lib/store";
import MedicaidModal from "./MedicaidModal";
import Sidebar from "./filters/Sidebar";

export default function MainWindow() {
  const [people, setPeople] = useState<IPerson[]>([]);
  const [filter, setFilter] = useState<IFilter>();
  const [displayMode, setDisplayMode] = useState<DisplayMode>("Planlist");

  const creditEstimate = useCreditEstimate().data;
  const results = usePlans((data) => data);

  return (
    <Grid
      gridTemplateColumns={{ base: "1fr", lg: "300px 1fr" }}
      backgroundColor="blue.700"
    >
      <Sidebar
        {...{
          displayMode,
          people,
          setPeople,
          filter,
          setFilter,
        }}
      />

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
            displayMode,
            setDisplayMode,
            results,
            filter,
          }}
        />
      )}
    </Grid>
  );
}
