"use client";
import NextLink from "next/link";
import {
  Flex,
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

export default function IndexPage() {
  const location = useLocation();
  const { colorMode } = useColorMode();

  return (
    <Flex
      flexDir="column"
      maxWidth="800px"
      margin="0 auto"
      backgroundColor={colorMode === "light" ? "white" : "black"}
    >
      <Flex
        backgroundColor={colorMode === "light" ? "main.100" : "main.700"}
        padding="10px"
        borderRadius="10px"
        marginY="5px"
        border="1px solid"
        borderColor={colorMode === "light" ? "main.300" : "main.600"}
      >
        <Heading size="sm">Location</Heading>
        <Text>
          Enter your zip code, or press the GPS button to find your zip code
          automatically.
        </Text>
        <LocationWidget
          zipcode={location.data?.zipcode || ""}
          isFetching={location.isFetching}
        />
      </Flex>
      <Heading size="md" flex={1} textAlign="left">
        Optional
      </Heading>
      <Flex
        backgroundColor={colorMode === "light" ? "main.100" : "main.700"}
        padding="10px"
        borderRadius="10px"
        marginY="5px"
        border="1px solid"
        borderColor={colorMode === "light" ? "main.300" : "main.600"}
      >
        <Heading size="sm">Income</Heading>
        <IncomeWidget />
      </Flex>
      <Flex
        backgroundColor={colorMode === "light" ? "main.100" : "main.700"}
        padding="10px"
        borderRadius="10px"
        marginY="5px"
        border="1px solid"
        borderColor={colorMode === "light" ? "main.300" : "main.600"}
      >
        <Heading size="sm">People</Heading>
        <PeopleWidget />
      </Flex>
      <Link as={NextLink} href="/app/plans">
        <Button
          variant="sidebar"
          isDisabled={!location.data?.zipcode}
          right="10px"
        >
          See Plans
        </Button>
      </Link>
    </Flex>
  );
}
