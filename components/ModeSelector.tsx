import {
  Button,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Text,
} from "@chakra-ui/react";
import { RiFilter3Line, RiListCheck, RiBookmarkFill } from "react-icons/ri";
import { useNumSavedPlans } from "@/lib/planStore";
import { DisplayMode } from "@/types/DisplayMode";

interface IProps {
  displayMode: DisplayMode;
  setDisplayMode: (d: DisplayMode) => void;
}

export default function ModeSelector({ displayMode, setDisplayMode }: IProps) {
  const numSavedPlans = useNumSavedPlans();
  return (
    <>
      {displayMode === "Filters" && (
        <Button
          variant="modeselect"
          leftIcon={<RiListCheck />}
          right="10px"
          onClick={() => setDisplayMode("Planlist")}
        >
          Show Plans
        </Button>
      )}

      {displayMode === "Planlist" && (
        <>
          <Popover
            variant="mobile"
            placement="top-end"
            defaultIsOpen
            offset={[0, 8]}
            closeOnBlur={false}
            arrowSize={12}
          >
            <PopoverTrigger>
              <Button
                variant="modeselect"
                display={{ lg: "none" }}
                rightIcon={<RiFilter3Line />}
                left="10px"
                onClick={() => setDisplayMode("Filters")}
              >
                Filters
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <Text>
                    For more accurate premium estimates, you can enter your
                    household members and expected income for the year you want
                    coverage.
                  </Text>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>

          <Button
            variant="modeselect"
            leftIcon={<RiBookmarkFill />}
            isDisabled={numSavedPlans === 0}
            right="10px"
            onClick={() => setDisplayMode("ComparePlans")}
          >
            Compare ({numSavedPlans})
          </Button>
        </>
      )}

      {displayMode === "ComparePlans" && (
        <Button
          variant="modeselect"
          rightIcon={<RiListCheck />}
          left="10px"
          onClick={() => setDisplayMode("Planlist")}
        >
          Show Plans
        </Button>
      )}
    </>
  );
}
