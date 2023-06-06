import React, { useState } from "react";
import { Grid, GridItem, Box, Text, Heading, Icon } from "@chakra-ui/react";
import {
  Provider,
  Carousel,
  LeftButton,
  RightButton,
} from "chakra-ui-carousel";
import { RiCloseFill } from "react-icons/ri";
import { BsChevronExpand, BsChevronContract } from "react-icons/bs";

import IHealthPlan from "@/types/HealthPlan";
import ComparePlanDetails from "./compare_plans/ComparePlanDetails";
import { Estimate } from "@/types/GetCreditEstimate";

export interface Expands {
  costs: boolean;
  info: boolean;
  star_ratings: boolean;
  copays: boolean;
  documents: boolean;
  mgmt_programs: boolean;
}

interface IProps {
  plans: IHealthPlan[];
  savePlan: (plan: IHealthPlan) => void;
  creditEstimates: Estimate[];
}

export default function ComparePlans({
  plans,
  savePlan,
  creditEstimates,
}: IProps) {
  const [expands, setExpands] = useState<Expands>({
    costs: true,
    info: true,
    star_ratings: true,
    copays: true,
    documents: true,
    mgmt_programs: true,
  });

  const multiplePlans = plans.length > 1;
  const taxCredit = creditEstimates?.[0].aptc || 0;

  //todo: revisit this
  if (!plans.length) {
    return <Text>No plans to compare!</Text>;
  }

  let rowTemplate = "40px ";
  if (expands.costs) {
    rowTemplate += "repeat(3, 20px 40px) ";
  }

  rowTemplate += "40px ";
  if (expands.info) {
    rowTemplate += "repeat(3, 20px 40px) ";
  }

  rowTemplate += "40px ";
  if (expands.star_ratings) {
    rowTemplate += "repeat(4, 20px 40px) ";
  }

  rowTemplate += "40px ";
  if (expands.copays) {
    rowTemplate += "repeat(4, 20px 110px) ";
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
          gridTemplateColumns="1fr 30px"
          width="100%"
          minWidth={0}
          border="1px solid gray"
        >
          <Text className="ellipsis">{plan.issuer.name}</Text>
          {multiplePlans && (
            <Icon
              as={RiCloseFill}
              boxSize={6}
              className="pointer"
              onClick={() => savePlan(plan)}
            />
          )}
          <Text className="ellipsis bold" gridColumn="1/3">
            {plan.name}
          </Text>
        </Grid>
      );
    });
  };

  return (
    <Provider>
      <Grid
        id={multiplePlans ? "compareplans-root" : "compareplans-root-single"}
      >
        {multiplePlans && (
          <LeftButton position="fixed" left={0} top="50%" width="50px" />
        )}

        <Grid
          gridColumn="2/3"
          gridRow="1/2"
          gridTemplateRows={"50px " + rowTemplate + " 50px"}
          paddingTop="8px"
          alignItems="center"
        >
          <GridItem />
          <GridItem backgroundColor="silver" height="100%">
            <Heading size="md">
              <Icon
                as={expands.costs ? BsChevronContract : BsChevronExpand}
                boxSize={5}
              />
              Costs
            </Heading>
          </GridItem>
          <Box display={expands.costs ? "contents" : "none"}>
            <GridItem backgroundColor="lightgray">
              <Heading size="sm">Estimated Monthly Premium</Heading>
            </GridItem>
            <GridItem />
            <GridItem backgroundColor="lightgray">
              <Heading size="sm">Deductible</Heading>
            </GridItem>
            <GridItem />
            <GridItem backgroundColor="lightgray">
              <Heading size="sm">Out-of-Pocket Maximum</Heading>
            </GridItem>
            <GridItem />
          </Box>

          <GridItem backgroundColor="silver" height="100%">
            <Heading size="md">
              <Icon
                as={expands.info ? BsChevronContract : BsChevronExpand}
                boxSize={5}
              />
              Information
            </Heading>
          </GridItem>
          <Box display={expands.info ? "contents" : "none"}>
            <Heading size="sm">Plan ID</Heading>
            <GridItem />
            <Heading size="sm">Plan Type</Heading>
            <GridItem />
            <Heading size="sm">Metal Level</Heading>
            <GridItem />
          </Box>

          <GridItem backgroundColor="silver" height="100%">
            <Heading size="md">
              <Icon
                as={expands.star_ratings ? BsChevronContract : BsChevronExpand}
                boxSize={5}
              />
              Star Ratings
            </Heading>
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

          <GridItem backgroundColor="silver" height="100%">
            <Heading size="md">
              <Icon
                as={expands.copays ? BsChevronContract : BsChevronExpand}
                boxSize={5}
              />
              Copays / Coinsurance
            </Heading>
          </GridItem>
          <Box display={expands.copays ? "contents" : "none"}>
            <Heading size="sm">Primary Care Visit</Heading>
            <GridItem />
            <Heading size="sm">Specialist Visit</Heading>
            <GridItem />
            <Heading size="sm">Emergency Room Services</Heading>
            <GridItem />
            <Heading size="sm">Generic Drugs</Heading>
            <GridItem />
          </Box>

          <GridItem backgroundColor="silver" height="100%">
            <Heading size="md">
              <Icon
                as={expands.documents ? BsChevronContract : BsChevronExpand}
                boxSize={5}
              />
              Documents
            </Heading>
          </GridItem>
          <Box display={expands.documents ? "contents" : "none"}>
            <GridItem />
          </Box>

          <GridItem backgroundColor="silver" height="100%">
            <Heading size="md">
              <Icon
                as={expands.mgmt_programs ? BsChevronContract : BsChevronExpand}
                boxSize={5}
              />
              Management Programs
            </Heading>
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
          <Box position="sticky" top={0} backgroundColor="white" zIndex={1}>
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
                  {...{ plan, rowTemplate, expands, setExpands, taxCredit }}
                />
              ))}
            </Carousel>
          ) : (
            <ComparePlanDetails
              plan={plans[0]}
              {...{ rowTemplate, expands, setExpands, taxCredit }}
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
