import { useState } from "react";
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
  const [expand, setExpand] = useState(true);

  return (
    <Provider>
      <Grid gridTemplateColumns="50px 500px 50px" margin="0 auto">
        <LeftButton />
        <Grid
          gridColumn="2/3"
          gridRow="1/2"
          gridTemplateRows="40px repeat(3, 40px 50px) 40px repeat(3, 40px 50px)"
          paddingTop="4px"
          alignItems="center"
        >
          <GridItem backgroundColor="lightgray" height="100%">
            <Heading size="md">Costs</Heading>
          </GridItem>
          <Box display={expand ? "contents" : "none"}>
            <Heading size="sm">Estimated Monthly Premium</Heading>
            <GridItem />
            <Heading size="sm">Deductible</Heading>
            <GridItem />
            <Heading size="sm">Out-of-Pocket Maximum</Heading>
            <GridItem />
          </Box>

          <GridItem backgroundColor="lightgray" height="100%">
            <Heading size="md">Misc</Heading>
          </GridItem>
          <Heading size="sm">Metal Level</Heading>
          <GridItem />
          <Heading size="sm">Plan Type</Heading>
          <GridItem />
          <Heading size="sm">Plan ID</Heading>
          <GridItem />
        </Grid>
        <Box gridColumn="2/3" gridRow="1/2">
          <Carousel gap={0}>
            {plans.map((plan, i) => {
              return (
                <Grid
                  key={plan.id}
                  gridTemplateRows="40px repeat(3, 40px 50px) 40px repeat(3, 40px 50px)"
                  justifyItems="center"
                  alignItems="center"
                  borderInline="1px solid lightgray"
                  minWidth="225px"
                >
                  <GridItem
                    width="100%"
                    height="100%"
                    onClick={() => setExpand(!expand)}
                  ></GridItem>
                  <Box display={expand ? "contents" : "none"}>
                    <GridItem />
                    <Text>{plan.premium}</Text>
                    <GridItem />
                    <Text>{plan.deductibles[0].amount}</Text>
                    <GridItem />
                    <Text>{plan.moops[0].amount}</Text>
                  </Box>
                  <GridItem />
                  <GridItem />
                  <Text>{plan.metal_level}</Text>
                  <GridItem />
                  <Text>{plan.type}</Text>
                  <GridItem />
                  <Text>{plan.id}</Text>
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
