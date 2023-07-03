import { memo } from "react";
import { Box, Icon, useToast } from "@chakra-ui/react";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import constants from "../../styles/constants";
import { useIsPlanSaved, useToggleSavedPlan } from "@/lib/planStore";

interface IProps {
  planId: string;
}

export default memo(function BookmarkButton({ planId }: IProps) {
  const saved = useIsPlanSaved(planId);
  const toggleSavedPlan = useToggleSavedPlan();
  const toast = useToast();

  const clickHandler = () => {
    const wasSuccess = toggleSavedPlan(planId);
    if (!wasSuccess) {
      toast({
        description: `You can compare a maximum of ${constants.MAX_SAVED_PLANS} plans`,
        status: "error",
        duration: constants.TOAST_DURATION,
        isClosable: true,
      });
    }
  };

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
        clickHandler();
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
