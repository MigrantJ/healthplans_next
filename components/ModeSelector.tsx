import { Button } from "@chakra-ui/react";
import { RiFilter3Line, RiListCheck, RiBookmarkFill } from "react-icons/ri";
import { DisplayMode } from "@/types/DisplayMode";

interface IProps {
  hideSidebar?: boolean;
  displayMode: DisplayMode;
  setDisplayMode: (d: DisplayMode) => void;
  numSavedPlans: number;
}

export function ModeSelector({
  hideSidebar,
  displayMode,
  setDisplayMode,
  numSavedPlans,
}: IProps) {
  return (
    <>
      {displayMode === "Filters" && (
        <Button
          size="md"
          leftIcon={<RiListCheck />}
          right="10px"
          position="fixed"
          bottom="10px"
          onClick={() => setDisplayMode("Planlist")}
        >
          Show Plans
        </Button>
      )}

      {displayMode === "Planlist" && (
        <>
          {hideSidebar && (
            <Button
              size="md"
              rightIcon={<RiFilter3Line />}
              left="10px"
              position="fixed"
              bottom="10px"
              onClick={() => setDisplayMode("Filters")}
            >
              Filters
            </Button>
          )}

          <Button
            size="md"
            leftIcon={<RiBookmarkFill />}
            isDisabled={numSavedPlans === 0}
            right="10px"
            position="fixed"
            bottom="10px"
            onClick={() => setDisplayMode("ComparePlans")}
          >
            Compare ({numSavedPlans})
          </Button>
        </>
      )}

      {displayMode === "ComparePlans" && (
        <Button
          size="md"
          rightIcon={<RiListCheck />}
          left="10px"
          position="fixed"
          bottom="10px"
          onClick={() => setDisplayMode("Planlist")}
        >
          Show Plans
        </Button>
      )}
    </>
  );
}
