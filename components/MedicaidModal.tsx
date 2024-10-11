import React, { useEffect } from "react";
import NextLink from "next/link";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spacer,
  Text,
  Link,
  useDisclosure,
} from "@chakra-ui/react";

export default function MedicaidModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (!isOpen) onOpen();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text>
            At this income level, you may be eligible for Medicaid or the
            Children&apos;s Health Insurance Program (CHIP).
          </Text>
          <br />
          <Text>
            You can still view full-price healthcare plans here, but you may
            qualify for lower-priced plans if you apply for Medicaid or CHIP.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Back</Button>
          <Spacer />
          <Link
            as={NextLink}
            href="https://www.healthcare.gov/medicaid-chip/#howtoapply"
            isExternal
          >
            <Button>Learn More</Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
