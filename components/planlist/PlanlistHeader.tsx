import {
  Heading,
  Text,
  Flex,
  Spacer,
  HTMLChakraProps,
  ThemingProps,
  useStyleConfig,
} from "@chakra-ui/react";
import { Axis, Orient } from "d3-axis-for-react";

interface IContainerProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"PlanlistColumnHeader"> {}

const PlanlistColumnHeader = function ({ variant, ...rest }: IContainerProps) {
  const styles = useStyleConfig("PlanlistColumnHeader", { variant });
  return <Flex __css={styles} {...rest} />;
};

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
        gridColumn={{ base: "1/3", sm: "1/4", md: "1/5" }}
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
      <PlanlistColumnHeader />
      <PlanlistColumnHeader>
        <Text as="b">Issuer</Text>
        <Text>Plan Name</Text>
      </PlanlistColumnHeader>
      <PlanlistColumnHeader>
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
      </PlanlistColumnHeader>
      <PlanlistColumnHeader>
        <Text as="b">Deductible / Max Out Of Pocket</Text>
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
      </PlanlistColumnHeader>
    </>
  );
}
