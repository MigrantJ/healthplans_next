import React from "react";
import currencyFormatter from "@/lib/currencyFormatter";
import constants from "../../styles/constants";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import {
  deductibleBarLightColors,
  deductibleBarDarkColors,
} from "@/styles/theme";

interface IProps {
  deductible: number;
  deductibleWidth: number;
  moop: number;
  moopWidth: number;
}

export default React.memo(function DeductibleBar({
  deductible,
  deductibleWidth,
  moop,
  moopWidth,
}: IProps) {
  const colorPrefix = useColorModeValue("rows_light", "rows_dark");
  const barColors = useColorModeValue(
    deductibleBarLightColors,
    deductibleBarDarkColors
  );

  return (
    <Box
      gridColumn={{ base: "1/3", sm: "3/4", md: "auto" }}
      padding={{
        base: "0px 5px 10px 5px",
        md: "10px 5px",
      }}
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
      <Text display={{ base: "block", md: "none" }}>
        Deductible / Max Out-Of-Pocket
      </Text>
      <svg height={30} width={constants.DEDUCTIBLE_BAR_W} overflow={"visible"}>
        <rect
          width={constants.DEDUCTIBLE_BAR_W}
          height={15}
          fill={barColors.bg}
        />
        <rect width={deductibleWidth} height={15} fill={barColors.fill} />
        <text x={5} y={12} fill="white">
          {currencyFormatter.format(deductible)}
        </text>
        <rect
          y={17}
          width={constants.DEDUCTIBLE_BAR_W}
          height={15}
          fill={barColors.bg}
        />
        <rect y={17} width={moopWidth} height={15} fill={barColors.fill} />
        <text x={5} y={29} fill="white">
          {currencyFormatter.format(moop)}
        </text>
      </svg>
    </Box>
  );
});
