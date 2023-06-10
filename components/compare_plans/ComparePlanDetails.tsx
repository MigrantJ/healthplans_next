import { Grid, Box, Text } from "@chakra-ui/react";
import {
  RiCheckFill,
  RiFileTextLine,
  RiListUnordered,
  RiMedicineBottleLine,
  RiStethoscopeLine,
} from "react-icons/ri";

import IHealthPlan, { Benefit } from "@/types/HealthPlan";
import { Expands } from "./ComparePlans";
import StarRating from "./StarRating";
import React from "react";
import CollapsibleContent from "./CollapsibleContent";
import PlanDocLink from "./PlanDocLink";
import CopayDetails from "./CopayDetails";

interface IProps {
  plan: IHealthPlan;
  rowTemplate: string;
  expands: Expands;
  setExpands: (e: Expands) => void;
  taxCredit: number;
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ComparePlanDetails({
  plan,
  rowTemplate,
  expands,
  setExpands,
  taxCredit,
}: IProps) {
  const copayMap: { [k: string]: Benefit } =
    plan.benefits.reduce((acc, curr) => {
      acc[curr.name] = curr;
      return acc;
    }, {}) || {};

  const premium = formatter.format(Math.max(plan.premium - taxCredit, 1));
  const deductible = formatter.format(plan.deductibles[0].amount);
  const moop = formatter.format(plan.moops[0].amount);

  return (
    <Grid
      id="compareplans-datagrid"
      key={plan.id}
      gridTemplateRows={rowTemplate}
      justifyItems="center"
      alignItems="center"
      borderInline="1px solid lightgray"
      width="100%"
      overflowY="hidden"
      marginTop="-4px"
    >
      <CollapsibleContent
        expanded={expands.costs}
        expandFunc={() => setExpands({ ...expands, costs: !expands.costs })}
      >
        <Text>{premium}</Text>
        <Text>{deductible}</Text>
        <Text>{moop}</Text>
      </CollapsibleContent>

      <CollapsibleContent
        expanded={expands.info}
        expandFunc={() => setExpands({ ...expands, info: !expands.info })}
      >
        <Text>{plan.id}</Text>
        <Text>{plan.type}</Text>
        <Text>{plan.metal_level}</Text>
      </CollapsibleContent>

      <CollapsibleContent
        expanded={expands.star_ratings}
        expandFunc={() =>
          setExpands({ ...expands, star_ratings: !expands.star_ratings })
        }
      >
        <StarRating
          numStars={plan.quality_rating.global_rating}
          reasonForZero={plan.quality_rating.global_not_rated_reason}
        />
        <StarRating
          numStars={plan.quality_rating.enrollee_experience_rating}
          reasonForZero={
            plan.quality_rating.enrollee_experience_not_rated_reason
          }
        />
        <StarRating
          numStars={plan.quality_rating.clinical_quality_management_rating}
          reasonForZero={
            plan.quality_rating.clinical_quality_management_not_rated_reason
          }
        />
        <StarRating
          numStars={plan.quality_rating.plan_efficiency_rating}
          reasonForZero={plan.quality_rating.plan_efficiency_not_rated_reason}
        />
      </CollapsibleContent>

      <CollapsibleContent
        expanded={expands.copays}
        expandFunc={() => setExpands({ ...expands, copays: !expands.copays })}
      >
        <CopayDetails
          benefit={copayMap["Primary Care Visit to Treat an Injury or Illness"]}
        />
        <CopayDetails benefit={copayMap["Specialist Visit"]} />
        <CopayDetails benefit={copayMap["Emergency Room Services"]} />
        <CopayDetails benefit={copayMap["Generic Drugs"]} />
      </CollapsibleContent>

      <CollapsibleContent
        expanded={expands.documents}
        expandFunc={() =>
          setExpands({ ...expands, documents: !expands.documents })
        }
      >
        <Box>
          {plan.brochure_url && (
            <PlanDocLink
              text="Plan Brochure"
              icon={RiFileTextLine}
              url={plan.brochure_url}
            />
          )}
          {plan.benefits_url && (
            <PlanDocLink
              text="Summary of Benefits"
              icon={RiListUnordered}
              url={plan.benefits_url}
            />
          )}
          {plan.network_url && (
            <PlanDocLink
              text="Find In-Network Doctors"
              icon={RiStethoscopeLine}
              url={plan.network_url}
            />
          )}
          {plan.formulary_url && (
            <PlanDocLink
              text="Find Covered Medications"
              icon={RiMedicineBottleLine}
              url={plan.formulary_url}
            />
          )}
        </Box>
      </CollapsibleContent>

      <CollapsibleContent
        expanded={expands.mgmt_programs}
        expandFunc={() =>
          setExpands({ ...expands, mgmt_programs: !expands.mgmt_programs })
        }
      >
        <Box>
          {plan.disease_mgmt_programs.includes("Asthma") && <RiCheckFill />}
        </Box>
        <Box>
          {plan.disease_mgmt_programs.includes("Heart Disease") && (
            <RiCheckFill />
          )}
        </Box>
        <Box>
          {plan.disease_mgmt_programs.includes("Depression") && <RiCheckFill />}
        </Box>
        <Box>
          {plan.disease_mgmt_programs.includes("Diabetes") && <RiCheckFill />}
        </Box>
        <Box>
          {plan.disease_mgmt_programs.includes(
            "High Blood Pressure and High Cholesterol"
          ) && <RiCheckFill />}
        </Box>
        <Box>
          {plan.disease_mgmt_programs.includes("Low Back Pain") && (
            <RiCheckFill />
          )}
        </Box>
        <Box>
          {plan.disease_mgmt_programs.includes("Pain Management") && (
            <RiCheckFill />
          )}
        </Box>
        <Box>
          {plan.disease_mgmt_programs.includes("Pregnancy") && <RiCheckFill />}
        </Box>
        <Box>
          {plan.disease_mgmt_programs.includes("Weight Loss Programs") && (
            <RiCheckFill />
          )}
        </Box>
      </CollapsibleContent>
    </Grid>
  );
}
