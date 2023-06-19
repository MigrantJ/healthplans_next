import React from "react";
import currencyFormatter from "@/lib/currencyFormatter";
import constants from "../../styles/constants";
import { Box, Text } from "@chakra-ui/react";

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
  return (
    <Box
      gridColumn={{ base: "1/3", sm: "3/4", md: "auto" }}
      padding={{
        base: "0px 5px 10px 5px",
        md: "10px 5px",
      }}
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
      <Text display={{ base: "block", md: "none" }}>
        Deductible / Max Out-Of-Pocket
      </Text>
      <svg height={30} width={constants.DEDUCTIBLE_BAR_W} overflow={"visible"}>
        <rect width={constants.DEDUCTIBLE_BAR_W} height={15} fill="#38B2AC" />
        <rect width={deductibleWidth} height={15} fill="#81E6D9" />
        <text x={5} y={12}>
          {currencyFormatter.format(deductible)}
        </text>
        <rect
          y={17}
          width={constants.DEDUCTIBLE_BAR_W}
          height={15}
          fill="#38B2AC"
        />
        <rect y={17} width={moopWidth} height={15} fill="#81E6D9" />
        <text x={5} y={29}>
          {currencyFormatter.format(moop)}
        </text>
      </svg>
    </Box>
  );
});
