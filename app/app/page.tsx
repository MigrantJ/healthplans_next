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
  Icon,
} from "@chakra-ui/react";
import LocationWidget from "@/components/filters/LocationWidget";
import { useLocation } from "@/lib/householdStore";
import { usePlans } from "@/lib/planStore";
import { RiMapPinLine } from "react-icons/ri";
import InvalidStateMessage from "@/components/InvalidStateMessage";

export default function IndexPage() {
  const location = useLocation();
  const { colorMode } = useColorMode();
  const { data, isFetched } = usePlans();

  const alt_data = data?.pages[0].alt_data;

  return (
    <Flex
      flexDir="column"
      maxWidth="600px"
      margin="0 auto"
      backgroundColor={colorMode === "light" ? "white" : "black"}
      boxShadow="6px 0 4px -4px black, -6px 0 4px -4px black"
      alignItems="center"
      padding="20px"
      minHeight="100vh"
    >
      <Heading size="xl">Find the Right Plan for You</Heading>
      <Text marginX="20px" marginY="10px">
        Through the Health Insurance Marketplace, you may qualify for
        affordable, dependable healthcare plans. These plans include
        prescription medications, medical appointments, urgent care, hospital
        stays, and additional benefits.
      </Text>
      <Text marginX="20px" marginY="10px" fontWeight="bold">
        Use this site to discover what plans you qualify for and see if
        you&apos;re eligible for tax credits or cost reductions.
      </Text>
      <Flex
        bgColor={colorMode === "light" ? "main.100" : "main.800"}
        padding="10px"
        borderRadius="10px"
        marginY="5px"
        border="1px solid"
        borderColor={colorMode === "light" ? "main.300" : "main.600"}
        gap="10px"
        direction="column"
      >
        <Heading size="md" textAlign="left">
          Start Here
        </Heading>
        <Text>
          Enter your zip code, or press the <Icon as={RiMapPinLine} />
          Geolocation button to find your zip code automatically.
        </Text>
        <Flex width="100%">
          <LocationWidget
            zipcode={location.data?.zipcode || ""}
            isFetching={location.isFetching}
          />
          <Spacer />
          <Link as={NextLink} href="/app/plans">
            <Button
              variant="sidebar"
              isDisabled={!isFetched || !!alt_data}
              size="lg"
            >
              See Plans
            </Button>
          </Link>
        </Flex>
      </Flex>
      {alt_data && alt_data.type === "InvalidState" && (
        <InvalidStateMessage {...alt_data} />
      )}
    </Flex>
  );
}
