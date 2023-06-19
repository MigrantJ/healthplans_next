import React from "react";
import { Box, Grid, Icon } from "@chakra-ui/react";
import { RiCloseFill } from "react-icons/ri";
import { Carousel } from "chakra-ui-carousel";
import EllipsisText from "../EllipsisText";
import IHealthPlan from "@/types/HealthPlan";
import ConditionalWrapper from "../ConditionalWrapper";

interface IProps {
  plans: IHealthPlan[];
  savePlan: (plan: IHealthPlan) => void;
}

export default function NameHeaders({ plans, savePlan }: IProps) {
  const multiplePlans = plans.length > 1;

  return (
    <Box position="sticky" top={0} backgroundColor="white" zIndex={1}>
      <ConditionalWrapper
        condition={multiplePlans}
        wrap={(children) => <Carousel gap={1}>{children}</Carousel>}
      >
        {plans.map((plan, i) => (
          <Grid
            key={i}
            gridTemplateColumns="1fr 30px"
            width="100%"
            minWidth={0}
            border="1px solid gray"
            paddingX="4px"
          >
            <EllipsisText>{plan.issuer.name}</EllipsisText>
            {multiplePlans && (
              <Icon
                as={RiCloseFill}
                boxSize={6}
                cursor="pointer"
                onClick={() => savePlan(plan)}
              />
            )}
            <EllipsisText gridColumn="1/3" fontWeight="bold">
              {plan.name}
            </EllipsisText>
          </Grid>
        ))}
      </ConditionalWrapper>
    </Box>
  );
}
