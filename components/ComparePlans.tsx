import React, { useState } from "react";
import NextLink from "next/link";
import {
  Grid,
  GridItem,
  Box,
  Text,
  Heading,
  Link,
  Icon,
  Flex,
} from "@chakra-ui/react";
import {
  Provider,
  Carousel,
  LeftButton,
  RightButton,
} from "chakra-ui-carousel";
import {
  RiCloseFill,
  RiCheckFill,
  RiFileTextLine,
  RiListUnordered,
  RiStethoscopeLine,
  RiMedicineBottleLine,
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

  //todo: revisit this
  if (!plans.length) {
    return <Text>No plans to compare!</Text>;
  }

  let headerTemplate = "80px ";
  let contentTemplate = "";

  headerTemplate += "40px ";
  contentTemplate += "40px ";

  if (expands.costs) {
    headerTemplate += "repeat(3, 40px 50px) ";
    contentTemplate += "repeat(3, 40px 50px) ";
  }

  headerTemplate += "40px ";
  contentTemplate += "40px ";

  if (expands.info) {
    headerTemplate += "repeat(3, 40px 50px) ";
    contentTemplate += "repeat(3, 40px 50px) ";
  }

  headerTemplate += "40px ";
  contentTemplate += "40px ";

  if (expands.star_ratings) {
    headerTemplate += "repeat(4, 40px 50px) ";
    contentTemplate += "repeat(4, 40px 50px) ";
  }

  headerTemplate += "40px ";
  contentTemplate += "40px ";

  if (expands.documents) {
    headerTemplate += "150px ";
    contentTemplate += "150px ";
  }

  headerTemplate += "40px ";
  contentTemplate += "40px ";

  if (expands.mgmt_programs) {
    headerTemplate += "repeat(9, 40px 20px)";
    contentTemplate += "repeat(9, 40px 20px)";
  }

  return (
    <Provider>
      <Grid id="compareplans-root">
        <LeftButton position="fixed" left={0} top="50%" width="50px" />
        <Grid
          gridColumn="2/3"
          gridRow="1/2"
          gridTemplateRows={headerTemplate}
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
                    <Icon as={RiCloseFill} onClick={() => savePlan(plan)} />
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
                  gridTemplateRows={contentTemplate}
                  justifyItems="center"
                  alignItems="center"
                  borderInline="1px solid lightgray"
                  width="100%"
                  overflowY="hidden"
                >
                  <GridItem
                    width="100%"
                    height="100%"
                    onClick={() =>
                      setExpands({ ...expands, costs: !expands.costs })
                    }
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
                    onClick={() =>
                      setExpands({ ...expands, info: !expands.info })
                    }
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
                    <Text>{plan.quality_rating.global_rating}</Text>
                    <GridItem />
                    <Text>
                      {plan.quality_rating.enrollee_experience_rating}
                    </Text>
                    <GridItem />
                    <Text>
                      {plan.quality_rating.clinical_quality_management_rating}
                    </Text>
                    <GridItem />
                    <Text>{plan.quality_rating.plan_efficiency_rating}</Text>
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
                            <Text display="inline-block">
                              Summary of Benefits
                            </Text>
                          </Flex>
                        </Link>
                      )}
                      {plan.network_url && (
                        <Link as={NextLink} href={plan.network_url} isExternal>
                          <Flex alignItems="center">
                            <span>
                              <Icon as={RiStethoscopeLine} boxSize={7} />
                            </span>
                            <Text display="inline-block">
                              Find In-Network Doctors
                            </Text>
                          </Flex>
                        </Link>
                      )}
                      {plan.formulary_url && (
                        <Link
                          as={NextLink}
                          href={plan.formulary_url}
                          isExternal
                        >
                          <Flex alignItems="center">
                            <span>
                              <Icon
                                as={RiMedicineBottleLine}
                                boxSize={7}
                                display="inline-block"
                              />
                            </span>
                            <Text display="inline-block">
                              Find covered medications
                            </Text>
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
                      {plan.disease_mgmt_programs.includes("Asthma") && (
                        <RiCheckFill />
                      )}
                    </Box>
                    <GridItem />
                    <Box>
                      {plan.disease_mgmt_programs.includes("Heart Disease") && (
                        <RiCheckFill />
                      )}
                    </Box>
                    <GridItem />
                    <Box>
                      {plan.disease_mgmt_programs.includes("Depression") && (
                        <RiCheckFill />
                      )}
                    </Box>
                    <GridItem />
                    <Box>
                      {plan.disease_mgmt_programs.includes("Diabetes") && (
                        <RiCheckFill />
                      )}
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
                      {plan.disease_mgmt_programs.includes(
                        "Pain Management"
                      ) && <RiCheckFill />}
                    </Box>
                    <GridItem />
                    <Box>
                      {plan.disease_mgmt_programs.includes("Pregnancy") && (
                        <RiCheckFill />
                      )}
                    </Box>
                    <GridItem />
                    <Box>
                      {plan.disease_mgmt_programs.includes(
                        "Weight Loss Programs"
                      ) && <RiCheckFill />}
                    </Box>
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
