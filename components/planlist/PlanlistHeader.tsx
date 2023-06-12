import { Heading, Text, Flex, Spacer } from "@chakra-ui/react";
import { Axis, Orient } from "d3-axis-for-react";
import ColumnHeader from "./ColumnHeader";

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
      <Flex
        gridColumn={{ base: "1/4", md: "1/5" }}
        flexDir={{ base: "column", md: "row" }}
        width="100%"
        paddingX="10px"
        paddingBottom="10px"
        borderBottom="1px solid lightgray"
      >
        <Heading size="md">Plans</Heading>
        <Spacer />
        <Text fontSize="small">
          Note: Estimates Only. Premiums include tax credit if applicable.
        </Text>
      </Flex>
      <ColumnHeader />
      <ColumnHeader>
        <Text as="b">Issuer</Text>
        <Text>Plan Name</Text>
      </ColumnHeader>
      <ColumnHeader>
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
      </ColumnHeader>
      <ColumnHeader>
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
      </ColumnHeader>
    </>
  );
}
