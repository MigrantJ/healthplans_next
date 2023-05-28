import { Box, GridItem, Text } from "@chakra-ui/react";
import { Axis, Orient } from "d3-axis-for-react";

interface IProps {
  premiumExtent: [number, number];
  xScalePremium: d3.ScaleLinear<number, number, never>;
  deductibleExtent: [number, number];
  xScaleDeductible: d3.ScaleLinear<number, number, never>;
}

export default function PlanlistHeader({
  premiumExtent,
  xScalePremium,
  deductibleExtent,
  xScaleDeductible,
}: IProps) {
  return (
    <>
      <GridItem colSpan={3} margin={"0 auto"}>
        Estimates Only
      </GridItem>
      <Box className="column-header">
        <Text as="b">Issuer</Text>
        <Text>Plan Name</Text>
      </Box>
      <Box className="column-header">
        <Text as="b">Premium</Text>
        <svg height={20} width={xScalePremium(premiumExtent[1]) + 20}>
          <g transform="translate(2, 18)">
            <Axis
              orient={Orient.top}
              scale={xScalePremium}
              tickValues={[
                0,
                premiumExtent[1] * 0.33,
                premiumExtent[1] * 0.66,
                premiumExtent[1],
              ]}
              tickFormat={(d) => {
                return Math.ceil(d / 10) * 10;
              }}
              tickSizeOuter={0}
            />
          </g>
        </svg>
      </Box>
      <Box className="column-header">
        <Text as="b">Deductible</Text>
        <svg height={20} width={xScaleDeductible(deductibleExtent[1]) + 20}>
          <g transform="translate(2, 18)">
            <Axis
              orient={Orient.top}
              scale={xScaleDeductible}
              tickValues={[
                0,
                deductibleExtent[1] * 0.2,
                deductibleExtent[1] * 0.4,
                deductibleExtent[1] * 0.6,
                deductibleExtent[1] * 0.8,
                deductibleExtent[1],
              ]}
              tickFormat={(d) => {
                return Math.ceil(d / 100) * 100;
              }}
              tickSizeOuter={0}
            />
          </g>
        </svg>
      </Box>
    </>
  );
}
