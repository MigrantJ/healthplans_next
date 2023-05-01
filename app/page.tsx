"use client";
import { useState } from "react";
import { Box, Flex, Button, Heading, Input, Text } from "@chakra-ui/react";

import PlanList from "@/components/PlanList";
import Modal from "@/components/Modal";

interface Place {
  zipcode: string;
  countyfips: string;
  state: string;
}

export default function IndexPage() {
  const [place, setPlace] = useState<Place>({
    zipcode: "",
    countyfips: "",
    state: "",
  });

  const getPlaceByLatLong = async (lat: number, long: number) => {
    const res = await fetch(`/api/location?lat=${lat}&long=${long}`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const place = (await res.json()) as Place;
    setPlace(place);
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
      <Modal />
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
              value={place.zipcode}
              placeholder="Zip Code"
              onChange={(e) =>
                setPlace({
                  countyfips: place.countyfips,
                  state: place.state,
                  zipcode: e.target.value,
                })
              }
            />
            <Text>collapsible?</Text>
          </Flex>
          <Flex direction="column" w="100%">
            <Flex bg="red.500" h="50px">
              <Heading>Filters</Heading>
            </Flex>
            <Flex bg="green.500" h="100%">
              <Heading>Data Window</Heading>
              <PlanList
                zipCode={place.zipcode}
                state={place.state}
                countyCode={place.countyfips}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
