import React from "react";
import currencyFormatter from "@/lib/currencyFormatter";
import constants from "../../styles/constants";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

interface IProps {
  premium: number;
  premiumWidth: number;
}

export default React.memo(function PremiumBar({
  premium,
  premiumWidth,
}: IProps) {
  const colorPrefix = useColorModeValue("rows_light", "rows_dark");

  return (
    <Box
      gridColumn={{ base: "1/3", sm: "1/3", md: "auto" }}
      padding={{ base: "0 5px", md: "10px 5px" }}
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
      <Text display={{ base: "block", md: "none" }}>Premium</Text>
      <svg height={30} width={constants.PREMIUM_BAR_W} overflow={"visible"}>
        <rect width={constants.PREMIUM_BAR_W} height={30} fill="#22543D" />
        <rect width={premiumWidth} height={30} fill="#2F855A" />
        <text x={5} y={20} fill="white">
          {currencyFormatter.format(premium)}
        </text>
      </svg>
    </Box>
  );
});
