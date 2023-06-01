import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Divider, Flex, Spacer, Heading, Grid, Button } from "@chakra-ui/react";

import { getPlans } from "@/lib/getPlans";
import ILocation from "@/types/Location";
import IPerson from "@/types/Person";
import IFilter from "@/types/Filter";
import * as GetPlans from "@/types/GetPlans";
import LocationWidget from "./LocationWidget";
import IncomeWidget from "./IncomeWidget";
import PeopleWidget from "./PeopleWidget";
import FilterWidget from "./FilterWidget";
import DataViewer from "./DataViewer";

interface IProps {
  hideSidebar: boolean;
  isMobile: boolean;
}

type DisplayMode = "Filters" | "Planlist" | "ComparePlans";

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
        <Flex id="mobile-result-toggle">
          {displayMode !== "Filters" && (
            <Button
              size="md"
              onClick={() => {
                displayMode === "Planlist"
                  ? setDisplayMode("Filters")
                  : setDisplayMode("Planlist");
              }}
            >
              {displayMode === "Planlist" ? "See Filters" : "See Plans"}
            </Button>
          )}
          <Spacer />
          {displayMode !== "ComparePlans" && (
            <Button
              size="md"
              onClick={() => {
                displayMode === "Planlist"
                  ? setDisplayMode("ComparePlans")
                  : setDisplayMode("Planlist");
              }}
            >
              {displayMode === "Planlist" ? "Compare Plans" : "See Plans"}
            </Button>
          )}
        </Flex>
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
      {!isMobile && (
        <>
          {(displayMode === "ComparePlans" ||
            (hideSidebar && displayMode !== "Filters")) && (
            <Button
              size="lg"
              left="10px"
              position="fixed"
              bottom="10px"
              onClick={() => {
                displayMode === "Planlist"
                  ? setDisplayMode("Filters")
                  : setDisplayMode("Planlist");
              }}
            >
              {displayMode === "Planlist" ? "Show Filters" : "Show Plans"}
            </Button>
          )}

          {displayMode !== "ComparePlans" && (
            <Button
              size="lg"
              right="10px"
              position="fixed"
              bottom="10px"
              onClick={() => {
                hideSidebar && displayMode === "Filters"
                  ? setDisplayMode("Planlist")
                  : setDisplayMode("ComparePlans");
              }}
            >
              {hideSidebar && displayMode === "Filters"
                ? "Show Plans"
                : "Compare Plans"}
            </Button>
          )}
        </>
      )}
    </Grid>
  );
}
