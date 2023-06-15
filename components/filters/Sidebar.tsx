import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Divider,
  Flex,
  Heading,
  chakra,
} from "@chakra-ui/react";
import FilterGroup from "./FilterGroup";
import LocationWidget from "./LocationWidget";
import IncomeWidget from "./IncomeWidget";
import PeopleWidget from "./PeopleWidget";
import FilterWidget from "./FilterWidget";
import ILocation from "@/types/Location";
import IPerson from "@/types/Person";
import IFilter from "@/types/Filter";
import { FacetGroup } from "@/types/MarketplaceSearch";
import { Estimate } from "@/types/GetCreditEstimate";
import { DisplayMode } from "@/types/DisplayMode";

const SidebarContainer = chakra(Flex, {
  baseStyle: {
    flexDir: "column",
    paddingX: "5px",
    paddingTop: "4px",
    position: { base: "static", lg: "sticky" },
    top: 0,
    flexShrink: 1,
    alignSelf: "flex-start",
    overflowY: "auto",
    minHeight: "100vh",
    maxHeight: { lg: "100vh" },
    maxWidth: "800px",
    minWidth: { base: "100%", sm: "400px", lg: "100%" },
    margin: { base: "0 auto", lg: 0 },
    boxShadow: "6px 0 4px -4px black, -6px 0 4px -4px black",
    backgroundColor: "white",
    zIndex: 1,
  },
});

interface IProps {
  displayMode: DisplayMode;
  location: ILocation;
  setLocation: (l: ILocation) => void;
  income: number;
  setIncome: (i: number) => void;
  people: IPerson[];
  setPeople: (p: IPerson[]) => void;
  filter: IFilter;
  setFilter: (p: IFilter) => void;
  facetGroups: FacetGroup[];
  ranges: {
    premiums: { min: number; max: number };
    deductibles: { min: number; max: number };
  };
  creditEstimates: Estimate[];
}

export default function Sidebar({
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
}: IProps) {
  return (
    <SidebarContainer
      display={{
        base: displayMode !== "Filters" && location && "none",
        lg: displayMode === "ComparePlans" ? "none" : "flex",
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
              <Flex height="160px" />
            </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
    </SidebarContainer>
  );
}
