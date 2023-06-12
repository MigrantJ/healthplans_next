import React from "react";
import currencyFormatter from "@/lib/currencyFormatter";
import constants from "../../styles/constants";
import { Box, Text } from "@chakra-ui/react";

interface IProps {
  premium: number;
  premiumWidth: number;
}

export default React.memo(function PremiumBar({
  premium,
  premiumWidth,
}: IProps) {
  return (
    <Box
      gridColumn={{ base: "1/4", sm: "1/3", md: "auto" }}
      padding={{ base: "0 5px", md: "10px 5px" }}
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
