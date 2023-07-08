"use client";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  useDisclosure,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import MainWindow from "@/components/MainWindow";
import AboutModal from "@/components/AboutModal";

export default function IndexPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue("brand_light.500", "brand_dark.500");

  return (
    <Box minHeight="100vh">
      <AboutModal {...{ isOpen, onClose }} />
      <Flex
        padding="10px"
        borderBottom="2px solid black"
        backgroundColor={bg}
        alignItems="center"
      >
        <Heading size="lg" color="white">
          HealthPlansNext
        </Heading>
        <Spacer />
        <Button onClick={toggleColorMode}>Color</Button>
        <Button onClick={onOpen}>About</Button>
      </Flex>
      <MainWindow />
    </Box>
  );
}
