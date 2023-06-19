import React from "react";
import { Box } from "@chakra-ui/react";
import EllipsisText from "../EllipsisText";

interface IProps {
  planName: string;
  issuerName: string;
}

export default React.memo(function NameBar({ planName, issuerName }: IProps) {
  return (
    <Box
      gridColumn={{ base: "2/3", sm: "2/4", md: "auto" }}
      padding={{ base: "0 5px" }}
      backgroundColor="gray.100"
      sx={{
        ".group:nth-child(odd) &": {
          backgroundColor: "gray.300",
        },
        ".group:hover &": {
          backgroundColor: "blue.100",
          textDecor: "underline",
        },
      }}
    >
      <EllipsisText fontWeight="bold">{issuerName}</EllipsisText>
      <EllipsisText>{planName}</EllipsisText>
    </Box>
  );
});
