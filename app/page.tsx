"use client";
import { useState } from "react";
import { Box, Flex, Button, Heading, Input, Text } from "@chakra-ui/react";

import Modal from "@/components/Modal";
import ILocation from "@/types/Location";
import DataViewer from "@/components/DataViewer";

export default function IndexPage() {
  const [location, setLocation] = useState<ILocation>({
    zipCode: "",
    countyfips: "",
    state: "",
  });
  const [zipCode, setZipCode] = useState("");

  const getLocationByLatLong = async (lat: number, long: number) => {
    const res = await fetch(`/api/location?lat=${lat}&long=${long}`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const location = (await res.json()) as ILocation;
    setZipCode(location.zipCode);
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
      <Modal getPosByGPS={getPosByGPS} getPosByZipCode={getPosByZipCode} />
      <Flex h="100vh" direction="column">
        <Flex bg="orange.500">
          <Heading>Top Header</Heading>
        </Flex>
        <Flex h="100vh">
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
            <Button
              onClick={(e) => {
                void getPosByZipCode(zipCode);
              }}
            >
              Enter
            </Button>
            <Text>collapsible?</Text>
          </Flex>
          <Flex direction="column" w="100%">
            <Flex bg="red.500" h="50px">
              <Heading>Filters</Heading>
            </Flex>
            <DataViewer
              zipCode={location.zipCode}
              state={location.state}
              countyfips={location.countyfips}
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
