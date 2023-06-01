import { Button, Flex, Spacer } from "@chakra-ui/react";
import { DisplayMode } from "@/types/DisplayMode";

interface IProps {
  hideSidebar?: boolean;
  displayMode: DisplayMode;
  setDisplayMode: (d: DisplayMode) => void;
}

export function ModeSelectorMobile({ displayMode, setDisplayMode }: IProps) {
  return (
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
  );
}

export function ModeSelectorDesktop({
  hideSidebar,
  displayMode,
  setDisplayMode,
}: IProps) {
  return (
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
  );
}
