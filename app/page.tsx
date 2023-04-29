"use client";
import { useState } from "react";
import { Box, Flex, Button, Heading, Input } from "@chakra-ui/react";

import PlanList from "@/components/PlanList";

interface Place {
  zipcode: string;
  countyfips: string;
  state: string;
}

export default function IndexPage() {
  const [zipCode, setZipCode] = useState("");
  const [countyCode, setCountyCode] = useState("");
  const [state, setState] = useState("");

  const getPlaceByLatLong = async (lat: number, long: number) => {
    const res = await fetch(`/api/location?lat=${lat}&long=${long}`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const place = (await res.json()) as Place;
    setZipCode(place.zipcode);
    setCountyCode(place.countyfips);
    setState(place.state);
  };

  const getPosByGPS = function () {
    const successCallback: PositionCallback = (position) => {
      void getPlaceByLatLong(
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

  return (
    <Box>
      <Flex h="100vh" gap={1} paddingTop="5px">
        <Flex
          direction="column"
          bg="blue.500"
          paddingY="10px"
          paddingX="5px"
          w="250px"
          align="center"
        >
          <Heading>Setup</Heading>
          <Button
            onClick={(e) => {
              e.preventDefault();
              getPosByGPS();
            }}
          >
            Use GPS
          </Button>
          <Input
            id="zipcode"
            value={zipCode}
            placeholder="Zip Code"
            onChange={(e) => setZipCode(e.target.value)}
          />
        </Flex>
        <Flex direction="column" gap={1} w="100%">
          <Flex bg="red.500" h="50px">
            <Heading>Filters</Heading>
          </Flex>
          <Flex bg="green.500" h="100%">
            <Heading>Data Window</Heading>
            <PlanList zipCode={zipCode} state={state} countyCode={countyCode} />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
