import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Divider, Flex, Heading } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

import { getPlansPage } from "@/lib/getPlans";
import ILocation from "@/types/Location";
import IPerson from "@/types/Person";
import IFilter from "@/types/Filter";
import * as GetPlans from "@/types/GetPlans";
import LocationWidget from "./LocationWidget";
import IncomeWidget from "./IncomeWidget";
import PeopleWidget from "./PeopleWidget";
import FilterWidget from "./FilterWidget";
import DataViewerInfinite from "./DataViewerInfinite";

export default function MainWindow() {
  const [location, setLocation] = useState<ILocation>();
  const [income, setIncome] = useState(0);
  const [people, setPeople] = useState<IPerson[]>([]);
  const [filter, setFilter] = useState<IFilter>();

  const { ref, inView } = useInView();

  const results = useInfiniteQuery<GetPlans.Response, Error>({
    queryKey: ["query", { location, income, people }],
    queryFn: getPlansPage,
    enabled: !!location,
    keepPreviousData: true,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  const { hasNextPage, fetchNextPage } = results;

  useEffect(() => {
    console.log("useEffect");
    if (hasNextPage && inView) {
      void fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  const facetGroups = results.data?.pages[0].facet_groups || [];
  const ranges = results.data?.pages[0].ranges;

  return (
    <>
      <Flex>
        <Flex direction="column" paddingX={3} minW={300}>
          <Heading size="md">Setup</Heading>
          <Divider />
          <Heading size="sm">Location</Heading>
          <LocationWidget {...{ location, setLocation }} />
          <Divider />
          <Heading size="sm">Household</Heading>
          <IncomeWidget {...{ income, setIncome }} />
          <PeopleWidget {...{ people, setPeople }} />
          <Divider />
          {results.data && (
            <>
              <Heading size="sm">Filters</Heading>
              <FilterWidget {...{ filter, setFilter, facetGroups, ranges }} />
            </>
          )}
        </Flex>
        <Flex direction="column">
          <DataViewerInfinite {...{ results, filter }} inViewRef={ref} />
        </Flex>
      </Flex>
    </>
  );
}
