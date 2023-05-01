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

export default function PModal({ getPosByGPS, getPosByZipCode }) {
  const [zipCode, setZipCode] = useState("");
  useEffect(() => {
    if (!isOpen) onOpen();
  }, []);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
                  getPosByZipCode(zipCode);
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