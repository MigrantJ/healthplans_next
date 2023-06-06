import { useState } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { Divider, Flex, Heading, Grid } from "@chakra-ui/react";

import { getPlans } from "@/lib/getPlans";
import ILocation from "@/types/Location";
import IPerson from "@/types/Person";
import IFilter from "@/types/Filter";
import * as GetPlans from "@/types/GetPlans";
import * as GCE from "@/types/GetCreditEstimate";
import { DisplayMode } from "@/types/DisplayMode";
import LocationWidget from "./LocationWidget";
import IncomeWidget from "./IncomeWidget";
import PeopleWidget from "./PeopleWidget";
import FilterWidget from "./FilterWidget";
import DataViewer from "./DataViewer";
import { getCreditEstimate } from "@/lib/getCreditEstimate";

interface IProps {
  hideSidebar: boolean;
}

export default function MainWindow({ hideSidebar }: IProps) {
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
  });

  const results = useInfiniteQuery<GetPlans.Response, Error>({
    queryKey: ["plans", { location, income, people }],
    queryFn: getPlans,
    enabled: !!location,
    keepPreviousData: true,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const creditEstimates = creditResults.data?.estimates;

  const facetGroups = results.data?.pages?.[0].facet_groups;
  const ranges = results.data?.pages?.[0].ranges;

  return (
    <Grid id="mainwindow">
      <Flex
        id="sidebar"
        direction="column"
        display={
          (!hideSidebar && displayMode !== "ComparePlans") ||
          (hideSidebar && displayMode === "Filters")
            ? "flex"
            : "none"
        }
      >
        <Heading size="md">Setup</Heading>
        <Divider />
        <Heading size="sm">Location</Heading>
        <LocationWidget {...{ location, setLocation }} />
        <Divider />
        <Heading size="sm">Household</Heading>
        <IncomeWidget {...{ income, setIncome, creditEstimates }} />
        <PeopleWidget {...{ people, setPeople }} />
        <Divider />
        {facetGroups && ranges && (
          <>
            <Heading size="sm">Filters</Heading>
            <FilterWidget
              {...{ filter, setFilter, facetGroups, ranges, creditEstimates }}
            />
          </>
        )}
      </Flex>

      <DataViewer
        {...{
          hideSidebar,
          displayMode,
          setDisplayMode,
          results,
          filter,
          creditEstimates,
        }}
      />
    </Grid>
  );
}
