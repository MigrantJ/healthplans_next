import React, { useState } from "react";
import { Grid, GridItem, Box, Text, Heading, Icon } from "@chakra-ui/react";
import {
  Provider,
  Carousel,
  LeftButton,
  RightButton,
} from "chakra-ui-carousel";
import { RiCloseFill } from "react-icons/ri";

import IHealthPlan from "@/types/HealthPlan";
import ComparePlanDetails from "./compare_plans/ComparePlanDetails";

interface Expands {
  costs: boolean;
  info: boolean;
  star_ratings: boolean;
  documents: boolean;
  mgmt_programs: boolean;
}

interface IProps {
  plans: IHealthPlan[];
  savePlan: (plan: IHealthPlan) => void;
}

export default function ComparePlans({ plans, savePlan }: IProps) {
  const [expands, setExpands] = useState<Expands>({
    costs: true,
    info: true,
    star_ratings: true,
    documents: true,
    mgmt_programs: true,
  });

  const multiplePlans = plans.length > 1;

  //todo: revisit this
  if (!plans.length) {
    return <Text>No plans to compare!</Text>;
  }

  let rowTemplate = "40px ";
  if (expands.costs) {
    rowTemplate += "repeat(3, 40px 50px) ";
  }

  rowTemplate += "40px ";
  if (expands.info) {
    rowTemplate += "repeat(3, 40px 50px) ";
  }

  rowTemplate += "40px ";
  if (expands.star_ratings) {
    rowTemplate += "repeat(4, 40px 50px) ";
  }

  rowTemplate += "40px ";
  if (expands.documents) {
    rowTemplate += "150px ";
  }

  rowTemplate += "40px ";
  if (expands.mgmt_programs) {
    rowTemplate += "repeat(9, 40px 20px)";
  }

  const planNameHeaders = (plans: IHealthPlan[]) => {
    return plans.map((plan) => {
      return (
        <Grid
          key={plan.id}
          justifyItems="center"
          alignItems="center"
          width="100%"
        >
          <Box>{plan.issuer.name}</Box>
          <Box>{plan.name}</Box>
          {multiplePlans && (
            <Icon as={RiCloseFill} onClick={() => savePlan(plan)} />
          )}
        </Grid>
      );
    });
  };

  return (
    <Provider>
      <Grid id="compareplans-root">
        {multiplePlans && (
          <LeftButton position="fixed" left={0} top="50%" width="50px" />
        )}

        <Grid
          gridColumn="2/3"
          gridRow="1/2"
          gridTemplateRows={"80px " + rowTemplate + " 50px"}
          paddingTop="4px"
          alignItems="center"
        >
          <GridItem />
          <GridItem backgroundColor="lightgray" height="100%">
            <Heading size="md">Costs</Heading>
          </GridItem>
          <Box display={expands.costs ? "contents" : "none"}>
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
          <Box display={expands.info ? "contents" : "none"}>
            <Heading size="sm">Plan ID</Heading>
            <GridItem />
            <Heading size="sm">Plan Type</Heading>
            <GridItem />
            <Heading size="sm">Metal Level</Heading>
            <GridItem />
          </Box>

          <GridItem backgroundColor="lightgray" height="100%">
            <Heading size="md">Star Ratings</Heading>
          </GridItem>
          <Box display={expands.star_ratings ? "contents" : "none"}>
            <Heading size="sm">Overall Rating</Heading>
            <GridItem />
            <Heading size="sm">Member Experience</Heading>
            <GridItem />
            <Heading size="sm">Medical Care</Heading>
            <GridItem />
            <Heading size="sm">Plan Administration</Heading>
            <GridItem />
          </Box>

          <GridItem backgroundColor="lightgray" height="100%">
            <Heading size="md">Documents</Heading>
          </GridItem>
          <Box display={expands.documents ? "contents" : "none"}>
            <GridItem />
          </Box>

          <GridItem backgroundColor="lightgray" height="100%">
            <Heading size="md">Management Programs</Heading>
          </GridItem>
          <Box display={expands.mgmt_programs ? "contents" : "none"}>
            <Heading size="sm">Asthma</Heading>
            <GridItem />
            <Heading size="sm">Heart Disease</Heading>
            <GridItem />
            <Heading size="sm">Depression</Heading>
            <GridItem />
            <Heading size="sm">Diabetes</Heading>
            <GridItem />
            <Heading size="sm">
              High Blood Pressure and High Cholesterol
            </Heading>
            <GridItem />
            <Heading size="sm">Low Back Pain</Heading>
            <GridItem />
            <Heading size="sm">Pain Management</Heading>
            <GridItem />
            <Heading size="sm">Pregnancy</Heading>
            <GridItem />
            <Heading size="sm">Weight Loss Programs</Heading>
            <GridItem />
          </Box>
          {/* space at the bottom */}
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
            {multiplePlans ? (
              <Carousel gap={1}>{planNameHeaders(plans)}</Carousel>
            ) : (
              planNameHeaders(plans)
            )}
          </Box>
          {multiplePlans ? (
            <Carousel gap={1}>
              {plans.map((plan, i) => (
                <ComparePlanDetails
                  key={i}
                  {...{ plan, rowTemplate, expands, setExpands }}
                />
              ))}
            </Carousel>
          ) : (
            <ComparePlanDetails
              plan={plans[0]}
              {...{ rowTemplate, expands, setExpands }}
            />
          )}
        </Box>
        {multiplePlans && (
          <RightButton position="fixed" right={0} top="50%" width="50px" />
        )}
      </Grid>
    </Provider>
  );
}
