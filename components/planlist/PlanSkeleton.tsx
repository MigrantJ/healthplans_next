import { Skeleton, SkeletonText, Box, Icon } from "@chakra-ui/react";
import React from "react";
import { RiBookmarkLine } from "react-icons/ri";

const skeletons = [...Array<null>(5)].map((_, i) => (
  <React.Fragment key={i}>
    <Box gridColumn={{ base: "1/2", md: "auto" }} height="48px">
      <Icon
        as={RiBookmarkLine}
        boxSize={7}
        marginTop="10px"
        marginLeft="5px"
        fill="lightgray"
      />
    </Box>
    <Box gridColumn={{ base: "2/3", sm: "2/4", md: "auto" }} padding="5px">
      <SkeletonText noOfLines={2} skeletonHeight={"15px"} />
    </Box>
    <Box
      gridColumn={{ base: "1/3", sm: "1/3", md: "auto" }}
      padding="10px 5px"
      height={{ base: "54px", md: "50px" }}
    >
      <Skeleton height={"25px"} />
    </Box>
    <Box
      gridColumn={{ base: "1/3", sm: "3/4", md: "auto" }}
      padding="10px 5px"
      height={{ base: "64px", md: "50px" }}
    >
      <Skeleton height={"12px"} marginBottom="1px" />
      <Skeleton height={"12px"} marginTop="1px" />
    </Box>
  </React.Fragment>
));
export default React.memo(function PlanSkeleton() {
  return <>{skeletons}</>;
});
