import { memo } from "react";
import IHealthPlan from "@/types/HealthPlan";
import { Box, Icon } from "@chakra-ui/react";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";

interface IProps {
  plan: IHealthPlan;
  saved: boolean;
  savePlan: (plan: IHealthPlan) => void;
}

export default memo(function BookmarkButton({ plan, saved, savePlan }: IProps) {
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
      onClick={(_) => savePlan(plan)}
    >
      <Icon
        as={saved ? RiBookmarkFill : RiBookmarkLine}
        boxSize={7}
        marginTop="10px"
      />
    </Box>
  );
});
