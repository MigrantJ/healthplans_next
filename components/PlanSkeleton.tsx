import { Skeleton, SkeletonText, Box } from "@chakra-ui/react";
import React from "react";

export default function DataViewer() {
  const skeletons = [...Array<null>(5)].map((_, i) => (
    <React.Fragment key={i}>
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
