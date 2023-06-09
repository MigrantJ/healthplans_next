import React, { useState } from "react";
import {
  Grid,
  GridItem,
  Box,
  Text,
  Heading,
  Icon,
  Flex,
} from "@chakra-ui/react";
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
import CollapsibleHeaders from "./compare_plans/CollapsibleHeaders";

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
          width="100%"
        >
          <GridItem />
          <CollapsibleHeaders
            expanded={expands.costs}
            mainHeader={"Costs"}
            subHeaders={[
              "Estimated Monthly Premium",
              "Deductible",
              "Out-of-Pocket Maximum",
            ]}
          />
          <CollapsibleHeaders
            expanded={expands.info}
            mainHeader={"Information"}
            subHeaders={["Plan ID", "Plan Type", "Metal Level"]}
          />
          <CollapsibleHeaders
            expanded={expands.star_ratings}
            mainHeader={"Star Ratings"}
            subHeaders={[
              "Overall Rating",
              "Member Experience",
              "Medical Care",
              "Plan Administration",
            ]}
          />
          <CollapsibleHeaders
            expanded={expands.copays}
            mainHeader={"Copays / Coinsurance"}
            subHeaders={[
              "Primary Care Visit",
              "Specialist Visit",
              "Emergency Room Services",
              "Generic Drugs",
            ]}
          />
          <CollapsibleHeaders
            expanded={expands.documents}
            mainHeader={"Documents"}
            subHeaders={[]}
          />
          <CollapsibleHeaders
            expanded={expands.mgmt_programs}
            mainHeader={"Management Programs"}
            subHeaders={[
              "Asthma",
              "Heart Disease",
              "Depression",
              "Diabetes",
              "High Blood Pressure and High Cholesterol",
              "Low Back Pain",
              "Pain Management",
              "Pregnancy",
              "Weight Loss Programs",
            ]}
          />
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
