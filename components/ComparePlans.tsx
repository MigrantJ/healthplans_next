import { Grid, GridItem, Box, Text, Heading } from "@chakra-ui/react";
import {
  Provider,
  Carousel,
  LeftButton,
  RightButton,
} from "chakra-ui-carousel";

import IHealthPlan from "@/types/HealthPlan";

interface IProps {
  plans: IHealthPlan[];
}

export default function ComparePlans({ plans }: IProps) {
  return (
    <Provider>
      <Grid gridTemplateColumns="50px 500px 50px" margin="0 auto">
        <LeftButton />
        <Grid
          gridColumn="2/3"
          gridRow="1/2"
          gridTemplateRows="repeat(4, 40px 50px)"
        >
          <GridItem padding="5px" backgroundColor="lightgray">
            <Heading size="md">TestComparePlans</Heading>
          </GridItem>
          <GridItem />
          <Heading size="md">Estimated Monthly Premium</Heading>
          <GridItem />
          <Heading size="md">Deductible</Heading>
          <GridItem />
          <Heading size="md">Out-of-Pocket Maximum</Heading>
          <GridItem />
        </Grid>
        <Box gridColumn="2/3" gridRow="1/2">
          <Carousel gap={50}>
            {plans.map((plan, i) => {
              return (
                <Grid
                  key={plan.id}
                  gridTemplateRows="repeat(4, 40px 50px)"
                  justifyItems="center"
                  alignItems="center"
                  borderInline="1px solid lightgray"
                  minWidth="225px"
                  paddingInline="10px"
                >
                  <GridItem />
                  <Text>{plan.name}</Text>
                  <GridItem />
                  <Text>{plan.premium}</Text>
                  <GridItem />
                  <Text>{plan.deductibles[0].amount}</Text>
                  <GridItem />
                  <Text>{plan.moops[0].amount}</Text>
                </Grid>
              );
            })}
          </Carousel>
        </Box>

        <RightButton />
      </Grid>
    </Provider>
  );
}
