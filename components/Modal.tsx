import { useState, useEffect } from "react";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  ModalFooter,
  Flex,
  Input,
  Spacer,
  Box,
} from "@chakra-ui/react";

interface Place {
  zipcode: string;
  countyfips: string;
  state: string;
}

export default function PModal() {
  const [zipCode, setZipCode] = useState("");
  const [countyCode, setCountyCode] = useState("");
  const [state, setState] = useState("");
  useEffect(() => {
    if (!isOpen) onOpen();
  }, []);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Let's Get Started!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Enter your zip code, or press the Use GPS button to find your zip
              code automatically.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Flex>
              <Input
                id="zipcode"
                value={zipCode}
                placeholder="Zip Code"
                onChange={(e) => setZipCode(e.target.value)}
              />
              <Button
                onClick={(e) => {
                  getPosByGPS();
                  onClose();
                }}
              >
                Enter
              </Button>
              <Button
                onClick={(e) => {
                  getPosByGPS();
                  onClose();
                }}
              >
                Use GPS
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
