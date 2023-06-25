import React, { useState } from "react";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import {
  Provider,
  Carousel,
  LeftButton,
  RightButton,
} from "chakra-ui-carousel";

import ComparePlanDetails from "./ComparePlanDetails";
import CollapsibleHeaders from "./CollapsibleHeaders";
import NameHeaders from "./NameHeaders";
import ConditionalWrapper from "../ConditionalWrapper";
import { useCreditEstimate, useSavedPlans } from "@/lib/store";

export interface Expands {
  costs: boolean;
  info: boolean;
  star_ratings: boolean;
  copays: boolean;
  documents: boolean;
  mgmt_programs: boolean;
}

export default function ComparePlans() {
  const [expands, setExpands] = useState<Expands>({
    costs: true,
    info: true,
    star_ratings: true,
    copays: true,
    documents: true,
    mgmt_programs: true,
  });
  const creditEstimate = useCreditEstimate().data;
  const plans = useSavedPlans();
  const taxCredit = creditEstimate.aptc;

  const multiplePlans = plans.length > 1;

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

  const nameRowHeight = multiplePlans ? "58px " : "50px ";

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
          backgroundColor="white"
          gridColumn="2/3"
          gridRow="1/2"
          gridTemplateRows={nameRowHeight + rowTemplate + " 50px"}
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
          <NameHeaders {...{ plans }} />
          <ConditionalWrapper
            condition={multiplePlans}
            wrap={(children) => <Carousel gap={1}>{children}</Carousel>}
          >
            {plans.map((plan) => (
              <ComparePlanDetails
                key={plan.id}
                {...{ plan, rowTemplate, expands, setExpands, taxCredit }}
              />
            ))}
          </ConditionalWrapper>
        </Box>
        {multiplePlans && (
          <RightButton position="fixed" right={0} top="50%" width="50px" />
        )}
      </Grid>
    </Provider>
  );
}
