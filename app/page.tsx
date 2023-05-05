"use client";
import { useState } from "react";
import { Box, Flex, Heading, Divider } from "@chakra-ui/react";

import Modal from "@/components/Modal";
import ILocation from "@/types/Location";
import IHousehold from "@/types/Household";
import DataViewer from "@/components/DataViewer";
import LocationWidget from "@/components/LocationWidget";
import HouseholdWidget from "@/components/HouseholdWidget";
import IncomeWidget from "@/components/IncomeWidget";

export default function IndexPage() {
  const [location, setLocation] = useState<ILocation>();
  const [zipCode, setZipCode] = useState("");
  const [income, setIncome] = useState(0);
  const [household, setHousehold] = useState<IHousehold>({
    people: [],
    has_married_couple: false,
  });

  const getLocationByLatLong = async (lat: number, long: number) => {
    const res = await fetch(`/api/location?lat=${lat}&long=${long}`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const location = (await res.json()) as ILocation;
    setZipCode(location.zipcode);
    setLocation(location);
  };

  const getPosByGPS = function () {
    const successCallback: PositionCallback = (position) => {
      void getLocationByLatLong(
        position.coords.latitude,
        position.coords.longitude
      );
    };

    const errorCallback: PositionErrorCallback = (error) => {
      // todo: better error handling
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  const getPosByZipCode = async (zipCode: string) => {
    setZipCode(zipCode);
    const res = await fetch(`/api/location?zipCode=${zipCode}`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const location = (await res.json()) as ILocation;
    setLocation(location);
  };

  return (
    <Box>
      <Modal {...{ getPosByGPS, getPosByZipCode }} />
      <Flex h="100vh" direction="column">
        <Flex padding="10px">
          <Heading size="lg">HealthCare.gov Next</Heading>
        </Flex>
        <Flex h="100vh">
          <Flex
            direction="column"
            paddingY={10}
            paddingX={5}
            w={250}
            align="center"
          >
            <Heading size="md">Setup</Heading>
            <Divider />
            <Heading size="sm">Location</Heading>
            <LocationWidget
              {...{ zipCode, setZipCode, getPosByGPS, getPosByZipCode }}
            />
            <Divider />
            <Heading size="sm">Household</Heading>
            <IncomeWidget {...{ income, setIncome }} />
            <HouseholdWidget {...{ household, setHousehold }} />
          </Flex>
          <Flex direction="column" w="100%">
            <Flex h="50px">
              <Heading>Filters</Heading>
            </Flex>
            {location && <DataViewer {...{ location, income, household }} />}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
