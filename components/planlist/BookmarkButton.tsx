import { memo } from "react";
import IHealthPlan from "@/types/HealthPlan";
import { Box, Icon } from "@chakra-ui/react";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { useIsPlanSaved, useSavedPlansActions } from "@/lib/store";

interface IProps {
  plan: IHealthPlan;
}

export default memo(function BookmarkButton({ plan }: IProps) {
  const saved = useIsPlanSaved(plan.id);
  const { toggleSavedPlan } = useSavedPlansActions();
  return (
    <Box
      gridColumn={{ base: "1/2" }}
      padding={{ base: "0 5px" }}
      backgroundColor="gray.100"
      sx={{
        ".group:nth-child(odd) &": {
          backgroundColor: "gray.300",
        },
        ".group:hover &": {
          backgroundColor: "blue.100",
        },
      }}
      onClick={(e) => {
        e.stopPropagation();
        toggleSavedPlan(plan.id);
      }}
    >
      <Icon
        as={saved ? RiBookmarkFill : RiBookmarkLine}
        boxSize={7}
        marginTop="10px"
      />
    </Box>
  );
});
