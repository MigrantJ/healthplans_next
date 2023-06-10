import React, { useState } from "react";
import { Grid, GridItem, Box, Icon } from "@chakra-ui/react";
import {
  Provider,
  Carousel,
  LeftButton,
  RightButton,
} from "chakra-ui-carousel";
import { RiCloseFill } from "react-icons/ri";

import IHealthPlan from "@/types/HealthPlan";
import ComparePlanDetails from "./ComparePlanDetails";
import { Estimate } from "@/types/GetCreditEstimate";
import CollapsibleHeaders from "./CollapsibleHeaders";
import EllipsisText from "../EllipsisText";

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
    rowTemplate += "repeat(4, 20px 150px) ";
  }

  rowTemplate += "40px ";
  if (expands.documents) {
    rowTemplate += "1px 150px ";
  }

  rowTemplate += "40px ";
  if (expands.mgmt_programs) {
    rowTemplate += "repeat(9, 20px 30px)";
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
      );
    });
  };

  return (
    <Provider>
      <Grid
        gridColumn="1/3"
        margin={multiplePlans && "0 auto"}
        gridTemplateColumns={
          multiplePlans
            ? {
                base: "50px 250px 50px",
                sm: "50px 300px 50px",
                md: "50px 650px 50px",
                lg: "50px 900px 50px",
              }
            : "50px 1fr 50px"
        }
      >
        {multiplePlans && (
          <LeftButton position="fixed" left={0} top="50%" width="50px" />
        )}

        <Grid
          id="compareplans-headers"
          gridColumn="2/3"
          gridRow="1/2"
          gridTemplateRows={"58px " + rowTemplate + " 50px"}
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
        <Box id="compareplans-data" gridColumn="2/3" gridRow="1/2">
          <Box
            id="namecontainer"
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
