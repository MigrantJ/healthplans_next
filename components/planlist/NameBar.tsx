import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import EllipsisText from "../EllipsisText";

interface IProps {
  planName: string;
  issuerName: string;
}

export default React.memo(function NameBar({ planName, issuerName }: IProps) {
  const colorPrefix = useColorModeValue("rows_light", "rows_dark");

  return (
    <Box
      gridColumn={{ base: "2/3", sm: "2/4", md: "auto" }}
      padding={{ base: "0 5px" }}
      backgroundColor={colorPrefix + ".100"}
      sx={{
        ".group:nth-child(odd) &": {
          backgroundColor: colorPrefix + ".300",
        },
        ".group:hover &": {
          backgroundColor: colorPrefix + "_hover",
          textDecor: "underline",
        },
      }}
    >
      <EllipsisText fontWeight="bold">{issuerName}</EllipsisText>
      <EllipsisText>{planName}</EllipsisText>
    </Box>
  );
});
