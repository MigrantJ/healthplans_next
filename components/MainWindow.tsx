import { useState } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { Grid, Spinner } from "@chakra-ui/react";

import { getPlans } from "@/lib/getPlans";
import ILocation from "@/types/Location";
import IPerson from "@/types/Person";
import IFilter from "@/types/Filter";
import * as GetPlans from "@/types/GetPlans";
import * as GCE from "@/types/GetCreditEstimate";
import { DisplayMode } from "@/types/DisplayMode";
import DataViewer from "./DataViewer";
import { getCreditEstimate } from "@/lib/getCreditEstimate";
import MedicaidModal from "./MedicaidModal";
import Sidebar from "./filters/Sidebar";

export default function MainWindow() {
  const [location, setLocation] = useState<ILocation>();
  const [income, setIncome] = useState(0);
  const [people, setPeople] = useState<IPerson[]>([]);
  const [filter, setFilter] = useState<IFilter>();
  const [displayMode, setDisplayMode] = useState<DisplayMode>("Planlist");

  const creditResults = useQuery<GCE.Response, Error>({
    queryKey: ["creditEstimate", { location, income, people }],
    queryFn: getCreditEstimate,
    enabled: !!location && income > 0,
    keepPreviousData: true,
    retry: 10,
  });

  const results = useInfiniteQuery<GetPlans.Response, Error>({
    queryKey: ["plans", { location, income, people }],
    queryFn: getPlans,
    enabled: !!location,
    keepPreviousData: true,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    retry: 10,
  });

  const creditEstimates = creditResults.data?.estimates;

  const facetGroups = results.data?.pages?.[0].facet_groups;
  const ranges = results.data?.pages?.[0].ranges;

  return (
    <Grid
      gridTemplateColumns={{ base: "1fr", lg: "300px 1fr" }}
      backgroundColor="blue.700"
    >
      <Sidebar
        {...{
          displayMode,
          location,
          setLocation,
          income,
          setIncome,
          people,
          setPeople,
          filter,
          setFilter,
          facetGroups,
          ranges,
          creditEstimates,
        }}
      />

      {creditEstimates?.some((e) => e.is_medicaid_chip) && <MedicaidModal />}

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
            creditEstimates,
          }}
        />
      )}
    </Grid>
  );
}
