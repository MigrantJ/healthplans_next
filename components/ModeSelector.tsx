import { Button } from "@chakra-ui/react";
import { RiFilter3Line, RiListCheck, RiBookmarkFill } from "react-icons/ri";
import { DisplayMode } from "@/types/DisplayMode";

interface IProps {
  displayMode: DisplayMode;
  setDisplayMode: (d: DisplayMode) => void;
  numSavedPlans: number;
}

export default function ModeSelector({
  displayMode,
  setDisplayMode,
  numSavedPlans,
}: IProps) {
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
          <Button
            variant="modeselect"
            display={{ lg: "none" }}
            rightIcon={<RiFilter3Line />}
            left="10px"
            onClick={() => setDisplayMode("Filters")}
          >
            Filters
          </Button>

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
