import { useEffect } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Divider,
  Flex,
  Heading,
  HTMLChakraProps,
  ThemingProps,
  useStyleConfig,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Box,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import FilterGroup from "./FilterGroup";
import LocationWidget from "./LocationWidget";
import IncomeWidget from "./IncomeWidget";
import PeopleWidget from "./PeopleWidget";
import FilterWidget from "./FilterWidget";
import { useLocation } from "@/lib/householdStore";
import { DisplayMode } from "@/types/DisplayMode";

interface IContainerProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"SidebarContainer"> {}

const SidebarContainer = function ({ variant, ...rest }: IContainerProps) {
  const styles = useStyleConfig("SidebarContainer", { variant });
  return <Flex __css={styles} {...rest} />;
};

interface IProps {
  displayMode: DisplayMode;
}

export default function Sidebar({ displayMode }: IProps) {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const closedHouseholdNote = JSON.parse(
      localStorage.getItem("closedHouseholdNote")
    ) as boolean;
    if (!closedHouseholdNote) {
      setTimeout(onOpen, 4000);
    }
  }, []);

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
              <LocationWidget
                zipcode={location.data?.zipcode || ""}
                isFetching={location.isFetching}
              />
            </FilterGroup>
            <FilterGroup
              headingText="Income"
              infoText="For more accurate premium estimates, enter the total expected income of your entire household for the year you want coverage."
            >
              <IncomeWidget />
            </FilterGroup>
            <Popover
              placement="right"
              offset={[0, 32]}
              closeOnBlur={false}
              arrowSize={12}
              isOpen={isOpen}
              onClose={() => {
                localStorage.setItem("closedHouseholdNote", "true");
                onClose();
              }}
            >
              <PopoverTrigger>
                <Box></Box>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Text>
                      For more accurate premium estimates, you can enter your
                      household members and expected income for the year you
                      want coverage.
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
            <FilterGroup
              isFormLabel={false}
              headingText="People"
              infoText="Add only individuals in your household that need health coverage."
            >
              <PeopleWidget />
            </FilterGroup>
          </AccordionPanel>
        </AccordionItem>

        <Divider />

        {location.data?.zipcode && (
          <AccordionItem border={0}>
            <AccordionButton>
              <Heading size="md" flex={1} textAlign="left">
                Filters
              </Heading>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel paddingTop={0} paddingBottom="4px">
              <FilterWidget />
              <Flex height="160px" />
            </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
    </SidebarContainer>
  );
}
