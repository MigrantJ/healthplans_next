import React, { useState } from "react";
import NextLink from "next/link";
import { Grid, GridItem, Box, Text, Heading, Link } from "@chakra-ui/react";
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
      <Grid id="compareplans-root">
        <LeftButton position="fixed" left={0} top="50%" width="50px" />
        <Grid
          gridColumn="2/3"
          gridRow="1/2"
          gridTemplateRows="80px 40px repeat(3, 40px 50px) 40px repeat(3, 40px 50px) 40px repeat(3, 40px 50px)"
          paddingTop="4px"
          alignItems="center"
        >
          <GridItem />
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
            <Heading size="md">Information</Heading>
          </GridItem>
          <Heading size="sm">Plan ID</Heading>
          <GridItem />
          <Heading size="sm">Plan Type</Heading>
          <GridItem />
          <Heading size="sm">Metal Level</Heading>
          <GridItem />

          <GridItem backgroundColor="lightgray" height="100%">
            <Heading size="md">Documents</Heading>
          </GridItem>
          <GridItem />
        </Grid>
        <Box gridColumn="2/3" gridRow="1/2">
          <Box
            height="80px"
            position="sticky"
            top={0}
            backgroundColor="white"
            zIndex={1}
          >
            <Carousel gap={1}>
              {plans.map((plan, i) => {
                return (
                  <Grid
                    key={plan.id}
                    justifyItems="center"
                    alignItems="center"
                    width="100%"
                  >
                    <Box>{plan.issuer.name}</Box>
                    <Box>{plan.name}</Box>
                  </Grid>
                );
              })}
            </Carousel>
          </Box>
          <Carousel gap={1}>
            {plans.map((plan, i) => {
              return (
                <Grid
                  key={plan.id}
                  gridTemplateRows="40px repeat(3, 40px 50px) 40px repeat(3, 40px 50px) 40px 100px"
                  justifyItems="center"
                  alignItems="center"
                  borderInline="1px solid lightgray"
                  width="100%"
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
                  <Text>{plan.id}</Text>
                  <GridItem />
                  <Text>{plan.type}</Text>
                  <GridItem />
                  <Text>{plan.metal_level}</Text>

                  <GridItem />
                  <Box>
                    {plan.brochure_url && (
                      <Link as={NextLink} href={plan.brochure_url} isExternal>
                        <Text>Plan Brochure</Text>
                      </Link>
                    )}
                    {plan.benefits_url && (
                      <Link as={NextLink} href={plan.benefits_url} isExternal>
                        <Text>Summary of Benefits</Text>
                      </Link>
                    )}
                    {plan.network_url && (
                      <Link as={NextLink} href={plan.network_url} isExternal>
                        <Text>Find In-Network Doctors</Text>
                      </Link>
                    )}
                    {plan.formulary_url && (
                      <Link as={NextLink} href={plan.formulary_url} isExternal>
                        <Text>Find Covered Medications</Text>
                      </Link>
                    )}
                  </Box>
                </Grid>
              );
            })}
          </Carousel>
        </Box>

        <RightButton position="fixed" right={0} top="50%" width="50px" />
      </Grid>
    </Provider>
  );
}
