"use client";
import NextLink from "next/link";
import {
  Flex,
  Spacer,
  Link,
  useColorMode,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import LocationWidget from "@/components/filters/LocationWidget";
import { useLocation } from "@/lib/householdStore";
import IncomeWidget from "@/components/filters/IncomeWidget";
import PeopleWidget from "@/components/filters/PeopleWidget";
import InfoIcon from "@/components/InfoIcon";

export default function IndexPage() {
  const location = useLocation();
  const { colorMode } = useColorMode();

  return (
    <Flex
      flexDir="column"
      maxWidth="800px"
      margin="0 auto"
      backgroundColor={colorMode === "light" ? "white" : "black"}
      alignItems="center"
    >
      <Heading size="xl">Find the Right Plan for You</Heading>
      <Flex gap="10px">
        <Flex
          backgroundColor={colorMode === "light" ? "main.100" : "main.700"}
          padding="10px"
          borderRadius="10px"
          marginY="5px"
          border="1px solid"
          borderColor={colorMode === "light" ? "main.300" : "main.600"}
          direction="column"
          flex={1}
        >
          <Heading size="md" textAlign="left">
            Start Here
          </Heading>
          <Text>
            Enter your zip code, or press the GPS button to find your zip code
            automatically.
          </Text>
          <Spacer />
          <Flex
            backgroundColor={colorMode === "light" ? "main.100" : "main.700"}
            padding="10px"
            borderRadius="10px"
            marginY="5px"
            border="1px solid"
            borderColor={colorMode === "light" ? "main.300" : "main.600"}
            direction="column"
          >
            <Flex>
              <Heading size="sm">Location</Heading>
              <Spacer />
              <InfoIcon text="This is used to determine which health plans are available for you to purchase." />
            </Flex>
            <LocationWidget
              zipcode={location.data?.zipcode || ""}
              isFetching={location.isFetching}
            />
          </Flex>
        </Flex>
        <Flex
          backgroundColor={colorMode === "light" ? "main.100" : "main.700"}
          padding="10px"
          borderRadius="10px"
          marginY="5px"
          border="1px solid"
          borderColor={colorMode === "light" ? "main.300" : "main.600"}
          direction="column"
          flex={1}
        >
          <Heading size="md" flex={1} textAlign="left">
            Optional
          </Heading>
          <Text>
            Details about your household members and income will help us show
            more accurate plan information, but it&apos;s not required to show
            you available plans.
          </Text>
          <Flex
            backgroundColor={colorMode === "light" ? "main.100" : "main.700"}
            padding="10px"
            borderRadius="10px"
            marginY="5px"
            border="1px solid"
            borderColor={colorMode === "light" ? "main.300" : "main.600"}
            direction="column"
          >
            <Flex>
              <Heading size="sm">Income</Heading>
              <Spacer />
              <InfoIcon text="For more accurate premium estimates, enter the total expected income of your entire household for the year you want coverage." />
            </Flex>
            <IncomeWidget />
          </Flex>
          <Flex
            backgroundColor={colorMode === "light" ? "main.100" : "main.700"}
            padding="10px"
            borderRadius="10px"
            marginY="5px"
            border="1px solid"
            borderColor={colorMode === "light" ? "main.300" : "main.600"}
            direction="column"
          >
            <Flex>
              <Heading size="sm">People</Heading>
              <Spacer />
              <InfoIcon text="For more accurate premium estimates, enter the total expected income of your entire household for the year you want coverage." />
            </Flex>
            <PeopleWidget />
          </Flex>
        </Flex>
      </Flex>

      <Link as={NextLink} href="/app/plans">
        <Button
          variant="sidebar"
          isDisabled={!location.data?.zipcode}
          size="lg"
        >
          See Plans
        </Button>
      </Link>
    </Flex>
  );
}
