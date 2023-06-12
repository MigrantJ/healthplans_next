import { Skeleton, SkeletonText, Box, Icon } from "@chakra-ui/react";
import React from "react";
import { RiBookmarkLine } from "react-icons/ri";

export default React.memo(function PlanSkeleton() {
  const skeletons = [...Array<null>(5)].map((_, i) => (
    <React.Fragment key={i}>
      <Box gridColumn={{ base: "1/2", md: "auto" }}>
        <Icon
          as={RiBookmarkLine}
          boxSize={7}
          marginTop="15px"
          marginLeft="10px"
          fill="lightgray"
        />
      </Box>
      <Box gridColumn={{ base: "2/3", sm: "2/4", md: "auto" }} padding="10px">
        <SkeletonText noOfLines={2} skeletonHeight={"15px"} />
      </Box>
      <Box
        gridColumn={{ base: "1/3", sm: "1/2", md: "auto" }}
        padding="10px 5px"
      >
        <Skeleton height={"25px"} />
      </Box>
      <Box
        gridColumn={{ base: "1/3", sm: "3/4", md: "auto" }}
        padding="10px 5px"
      >
        <Skeleton height={"12px"} />
        <Skeleton height={"12px"} />
      </Box>
    </React.Fragment>
  ));

  return <>{skeletons}</>;
});
