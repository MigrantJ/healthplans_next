import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Divider, Flex, Heading, Grid } from "@chakra-ui/react";

import { getPlans } from "@/lib/getPlans";
import ILocation from "@/types/Location";
import IPerson from "@/types/Person";
import IFilter from "@/types/Filter";
import * as GetPlans from "@/types/GetPlans";
import { DisplayMode } from "@/types/DisplayMode";
import LocationWidget from "./LocationWidget";
import IncomeWidget from "./IncomeWidget";
import PeopleWidget from "./PeopleWidget";
import FilterWidget from "./FilterWidget";
import DataViewer from "./DataViewer";
import { ModeSelectorDesktop, ModeSelectorMobile } from "./ModeSelectorMobile";

interface IProps {
  hideSidebar: boolean;
  isMobile: boolean;
}

export default function MainWindow({ hideSidebar, isMobile }: IProps) {
  const [location, setLocation] = useState<ILocation>();
  const [income, setIncome] = useState(0);
  const [people, setPeople] = useState<IPerson[]>([]);
  const [filter, setFilter] = useState<IFilter>();
  const [displayMode, setDisplayMode] = useState<DisplayMode>(
    hideSidebar ? "Planlist" : "Filters"
  );

  const results = useInfiniteQuery<GetPlans.Response, Error>({
    queryKey: ["query", { location, income, people }],
    queryFn: getPlans,
    enabled: !!location,
    keepPreviousData: true,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const facetGroups = results.data?.pages[0].facet_groups || [];
  const ranges = results.data?.pages[0].ranges;

  return (
    <Grid id="mainwindow">
      {isMobile && results.data && (
        <ModeSelectorMobile {...{ displayMode, setDisplayMode }} />
      )}

      <Flex
        id="sidebar"
        direction="column"
        display={
          !hideSidebar || (hideSidebar && displayMode === "Filters")
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
        <IncomeWidget {...{ income, setIncome }} />
        <PeopleWidget {...{ people, setPeople }} />
        <Divider />
        {facetGroups && ranges && (
          <>
            <Heading size="sm">Filters</Heading>
            <FilterWidget {...{ filter, setFilter, facetGroups, ranges }} />
          </>
        )}
      </Flex>
      <Grid
        id="planlist"
        display={
          !hideSidebar || (hideSidebar && displayMode === "Planlist")
            ? "grid"
            : "none"
        }
      >
        <DataViewer {...{ results, filter }} />
      </Grid>

      {!isMobile && results.data && (
        <ModeSelectorDesktop
          {...{ hideSidebar, displayMode, setDisplayMode }}
        />
      )}
    </Grid>
  );
}
