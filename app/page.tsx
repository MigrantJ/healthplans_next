"use client";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import MainWindow from "@/components/MainWindow";
import AboutModal from "@/components/AboutModal";

export default function IndexPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minHeight="100vh">
      <AboutModal {...{ isOpen, onClose }} />
      <Flex
        padding="10px"
        borderBottom="2px solid black"
        backgroundColor="blue.500"
        alignItems="center"
      >
        <Heading size="lg" color="white">
          HealthPlansNext
        </Heading>
        <Spacer />
        <Button onClick={onOpen}>About</Button>
      </Flex>
      <MainWindow />
    </Box>
  );
}
