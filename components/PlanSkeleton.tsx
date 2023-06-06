import { Skeleton, SkeletonText, Box, Icon } from "@chakra-ui/react";
import React from "react";
import { RiBookmarkLine } from "react-icons/ri";

export default function PlanSkeleton() {
  const skeletons = [...Array<null>(5)].map((_, i) => (
    <React.Fragment key={i}>
      <Box className="plan-bookmark-skel">
        <Icon
          as={RiBookmarkLine}
          boxSize={7}
          marginTop="10px"
          fill="lightgray"
        />
      </Box>
      <Box className="plan-name-skel">
        <SkeletonText noOfLines={2} skeletonHeight={"15px"} />
      </Box>
      <Box className="plan-premium-skel">
        <Skeleton height={"25px"} />
      </Box>
      <Box className="plan-deductible-skel">
        <Skeleton height={"12px"} />
        <Skeleton height={"12px"} />
      </Box>
    </React.Fragment>
  ));

  return <>{skeletons}</>;
}
