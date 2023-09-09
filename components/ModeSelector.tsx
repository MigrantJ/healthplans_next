import { Button } from "@chakra-ui/react";
import { RiFilter3Line, RiListCheck, RiBookmarkFill } from "react-icons/ri";
import { useNumSavedPlans } from "@/lib/planStore";
import { DisplayMode } from "@/types/DisplayMode";
import HelpPopover from "./HelpPopover";

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
          <HelpPopover variant="mobile" placement="top-end" offset={[0, 8]}>
            <Button
              variant="modeselect"
              display={{ lg: "none" }}
              rightIcon={<RiFilter3Line />}
              left="10px"
              onClick={() => setDisplayMode("Filters")}
            >
              Filters
            </Button>
          </HelpPopover>

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
