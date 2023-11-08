import React from "react";
import { Box, Grid, Icon, useColorModeValue } from "@chakra-ui/react";
import { RiCloseFill } from "react-icons/ri";
import { Carousel } from "chakra-ui-carousel";
import EllipsisText from "../EllipsisText";
import IHealthPlan from "@/types/HealthPlan";
import ConditionalWrapper from "../ConditionalWrapper";
import { useToggleSavedPlan } from "@/lib/planStore";

interface IProps {
  plans: IHealthPlan[];
}

export default function NameHeaders({ plans }: IProps) {
  const toggleSavedPlan = useToggleSavedPlan();
  const colorPrefix = useColorModeValue("rows_light", "rows_dark");
  const multiplePlans = plans.length > 1;

  return (
    <Box
      position="sticky"
      top={0}
      backgroundColor={colorPrefix + ".50"}
      zIndex={1}
    >
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
            <Icon
              as={RiCloseFill}
              boxSize={6}
              cursor="pointer"
              onClick={() => toggleSavedPlan(plan.id)}
            />
            <EllipsisText gridColumn="1/3" fontWeight="bold">
              {plan.name}
            </EllipsisText>
          </Grid>
        ))}
      </ConditionalWrapper>
    </Box>
  );
}
