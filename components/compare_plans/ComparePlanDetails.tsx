import NextLink from "next/link";
import { Grid, GridItem, Box, Text, Link, Icon, Flex } from "@chakra-ui/react";
import {
  RiCheckFill,
  RiFileTextLine,
  RiListUnordered,
  RiMedicineBottleLine,
  RiStarFill,
  RiStarLine,
  RiStethoscopeLine,
} from "react-icons/ri";

import IHealthPlan from "@/types/HealthPlan";

interface Expands {
  costs: boolean;
  info: boolean;
  star_ratings: boolean;
  documents: boolean;
  mgmt_programs: boolean;
}

interface IProps {
  plan: IHealthPlan;
  rowTemplate: string;
  expands: Expands;
  setExpands: (e: Expands) => void;
}

export default function ComparePlanDetails({
  plan,
  rowTemplate,
  expands,
  setExpands,
}: IProps) {
  const createStarRating = (rating: number) => {
    return [...Array<null>(5)].map((_, i) =>
      i + 1 <= rating ? (
        <Icon as={RiStarFill} key={i} />
      ) : (
        <Icon as={RiStarLine} key={i} />
      )
    );
  };

  return (
    <Grid
      key={plan.id}
      gridTemplateRows={rowTemplate}
      justifyItems="center"
      alignItems="center"
      borderInline="1px solid lightgray"
      width="100%"
      overflowY="hidden"
    >
      <GridItem
        width="100%"
        height="100%"
        onClick={() => setExpands({ ...expands, costs: !expands.costs })}
      ></GridItem>
      <Box display={expands.costs ? "contents" : "none"}>
        <GridItem />
        <Text>{plan.premium}</Text>
        <GridItem />
        <Text>{plan.deductibles[0].amount}</Text>
        <GridItem />
        <Text>{plan.moops[0].amount}</Text>
      </Box>

      <GridItem
        width="100%"
        height="100%"
        onClick={() => setExpands({ ...expands, info: !expands.info })}
      />
      <Box display={expands.info ? "contents" : "none"}>
        <GridItem />
        <Text>{plan.id}</Text>
        <GridItem />
        <Text>{plan.type}</Text>
        <GridItem />
        <Text>{plan.metal_level}</Text>
      </Box>

      <GridItem
        width="100%"
        height="100%"
        onClick={() =>
          setExpands({
            ...expands,
            star_ratings: !expands.star_ratings,
          })
        }
      />
      <Box display={expands.star_ratings ? "contents" : "none"}>
        <GridItem />
        <GridItem>
          {createStarRating(plan.quality_rating.global_rating)}
        </GridItem>
        <GridItem />
        <GridItem>
          {createStarRating(plan.quality_rating.enrollee_experience_rating)}
        </GridItem>
        <GridItem />
        <GridItem>
          {createStarRating(
            plan.quality_rating.clinical_quality_management_rating
          )}
        </GridItem>
        <GridItem />
        <GridItem>
          {createStarRating(plan.quality_rating.plan_efficiency_rating)}
        </GridItem>
      </Box>

      <GridItem
        width="100%"
        height="100%"
        onClick={() =>
          setExpands({
            ...expands,
            documents: !expands.documents,
          })
        }
      />
      <Box display={expands.documents ? "contents" : "none"}>
        <Box>
          {plan.brochure_url && (
            <Link as={NextLink} href={plan.brochure_url} isExternal>
              <Flex alignItems="center">
                <span>
                  <Icon as={RiFileTextLine} boxSize={7} />
                </span>
                <Text display="inline-block">Plan Brochure</Text>
              </Flex>
            </Link>
          )}
          {plan.benefits_url && (
            <Link as={NextLink} href={plan.benefits_url} isExternal>
              <Flex alignItems="center">
                <span>
                  <Icon as={RiListUnordered} boxSize={7} />
                </span>
                <Text display="inline-block">Summary of Benefits</Text>
              </Flex>
            </Link>
          )}
          {plan.network_url && (
            <Link as={NextLink} href={plan.network_url} isExternal>
              <Flex alignItems="center">
                <span>
                  <Icon as={RiStethoscopeLine} boxSize={7} />
                </span>
                <Text display="inline-block">Find In-Network Doctors</Text>
              </Flex>
            </Link>
          )}
          {plan.formulary_url && (
            <Link as={NextLink} href={plan.formulary_url} isExternal>
              <Flex alignItems="center">
                <span>
                  <Icon
                    as={RiMedicineBottleLine}
                    boxSize={7}
                    display="inline-block"
                  />
                </span>
                <Text display="inline-block">Find covered medications</Text>
              </Flex>
            </Link>
          )}
        </Box>
      </Box>

      <GridItem
        width="100%"
        height="100%"
        onClick={() =>
          setExpands({
            ...expands,
            mgmt_programs: !expands.mgmt_programs,
          })
        }
      />
      <Box display={expands.mgmt_programs ? "contents" : "none"}>
        <GridItem />
        <Box>
          {plan.disease_mgmt_programs.includes("Asthma") && <RiCheckFill />}
        </Box>
        <GridItem />
        <Box>
          {plan.disease_mgmt_programs.includes("Heart Disease") && (
            <RiCheckFill />
          )}
        </Box>
        <GridItem />
        <Box>
          {plan.disease_mgmt_programs.includes("Depression") && <RiCheckFill />}
        </Box>
        <GridItem />
        <Box>
          {plan.disease_mgmt_programs.includes("Diabetes") && <RiCheckFill />}
        </Box>
        <GridItem />
        <Box>
          {plan.disease_mgmt_programs.includes(
            "High Blood Pressure and High Cholesterol"
          ) && <RiCheckFill />}
        </Box>
        <GridItem />
        <Box>
          {plan.disease_mgmt_programs.includes("Low Back Pain") && (
            <RiCheckFill />
          )}
        </Box>
        <GridItem />
        <Box>
          {plan.disease_mgmt_programs.includes("Pain Management") && (
            <RiCheckFill />
          )}
        </Box>
        <GridItem />
        <Box>
          {plan.disease_mgmt_programs.includes("Pregnancy") && <RiCheckFill />}
        </Box>
        <GridItem />
        <Box>
          {plan.disease_mgmt_programs.includes("Weight Loss Programs") && (
            <RiCheckFill />
          )}
        </Box>
      </Box>
    </Grid>
  );
}
