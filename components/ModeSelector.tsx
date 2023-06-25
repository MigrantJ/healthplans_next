import { Button } from "@chakra-ui/react";
import { RiFilter3Line, RiListCheck, RiBookmarkFill } from "react-icons/ri";
import { useDisplayMode, useHouseholdActions } from "@/lib/householdStore";
import { useNumSavedPlans } from "@/lib/planStore";

export default function ModeSelector() {
  const displayMode = useDisplayMode();
  const numSavedPlans = useNumSavedPlans();
  const { setDisplayMode } = useHouseholdActions();
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
