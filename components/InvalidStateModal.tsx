import React, { useEffect } from "react";
import NextLink from "next/link";
import {
  Heading,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

interface IProps {
  state: string;
  exchange_name: string;
  exchange_url: string;
}

export default function InvalidStateModal({
  exchange_name,
  exchange_url,
}: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (!isOpen) onOpen();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Heading textAlign={"center"}>Sorry!</Heading>
          <Text paddingY="20px">
            It looks like your state does not use the federally-run healthcare
            exchange, so we can&apos;t automatically show healthcare plans for you.
            To visit your state&apos;s exchange, click the link below:
          </Text>
        </ModalBody>
        <ModalFooter alignSelf={"center"}>
          <Button as={NextLink} href={exchange_url}>
            <Heading size="md">{exchange_name}</Heading>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
