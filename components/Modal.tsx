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
} from "@chakra-ui/react";
import ILocation from "@/types/Location";

interface IProps {
  getPosByGPS: (setLocation: (location: ILocation) => void) => void;
  getPosByZipCode: (
    zipcode: string,
    setLocation: (location: ILocation) => void
  ) => Promise<void>;
  setLocation: (location: ILocation) => void;
}

export default function PModal({
  getPosByGPS,
  getPosByZipCode,
  setLocation,
}: IProps) {
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
          <ModalHeader>Let&apos;s Get Started!</ModalHeader>
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
                  void getPosByZipCode(zipCode, setLocation);
                  onClose();
                }}
              >
                Enter
              </Button>
              <Button
                onClick={(e) => {
                  getPosByGPS(setLocation);
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
