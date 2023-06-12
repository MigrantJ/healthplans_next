import { useState } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  Heading,
  Grid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Divider,
} from "@chakra-ui/react";

import { getPlans } from "@/lib/getPlans";
import ILocation from "@/types/Location";
import IPerson from "@/types/Person";
import IFilter from "@/types/Filter";
import * as GetPlans from "@/types/GetPlans";
import * as GCE from "@/types/GetCreditEstimate";
import { DisplayMode } from "@/types/DisplayMode";
import LocationWidget from "./filters/LocationWidget";
import IncomeWidget from "./filters/IncomeWidget";
import PeopleWidget from "./filters/PeopleWidget";
import FilterWidget from "./filters/FilterWidget";
import DataViewer from "./DataViewer";
import { getCreditEstimate } from "@/lib/getCreditEstimate";
import MedicaidModal from "./MedicaidModal";
import Sidebar from "./filters/Sidebar";
import FilterGroup from "./filters/FilterGroup";

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
    <Grid
      gridTemplateColumns={{ base: "1fr", lg: "300px 1fr" }}
      backgroundColor="blue.700"
    >
      <Sidebar
        display={{
          base: displayMode !== "Filters" && location && "none",
          lg: "flex",
        }}
      >
        <Accordion allowMultiple defaultIndex={[0, 1]}>
          <AccordionItem border={0}>
            <AccordionButton>
              <Heading size="md" flex={1} textAlign="left">
                Household
              </Heading>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel paddingTop={0} paddingBottom="4px">
              <FilterGroup
                headingText="Location"
                infoText="This is used to determine which health plans are available for you to purchase."
              >
                <LocationWidget {...{ location, setLocation }} />
              </FilterGroup>
              <FilterGroup
                headingText="Income"
                infoText="For more accurate premium estimates, enter the total expected income of your entire household for the year you want coverage."
              >
                <IncomeWidget {...{ income, setIncome, creditEstimates }} />
              </FilterGroup>
              <FilterGroup
                headingText="People"
                infoText="Add only individuals in your household that need health coverage."
              >
                <PeopleWidget {...{ people, setPeople }} />
              </FilterGroup>
            </AccordionPanel>
          </AccordionItem>

          <Divider />

          {facetGroups && ranges && (
            <AccordionItem border={0}>
              <AccordionButton>
                <Heading size="md" flex={1} textAlign="left">
                  Filters
                </Heading>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel paddingTop={0} paddingBottom="4px">
                <FilterWidget
                  {...{
                    filter,
                    setFilter,
                    facetGroups,
                    ranges,
                    creditEstimates,
                  }}
                />
              </AccordionPanel>
            </AccordionItem>
          )}
        </Accordion>
      </Sidebar>

      {creditEstimates?.some((e) => e.is_medicaid_chip) && <MedicaidModal />}

      <DataViewer
        {...{
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
