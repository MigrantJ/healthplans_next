"use client";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  Icon,
  useDisclosure,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import MainWindow from "@/components/MainWindow";
import AboutModal from "@/components/AboutModal";

export default function IndexPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode, colorMode } = useColorMode();
  const colorPrefix = useColorModeValue("bg_light", "bg_dark");

  return (
    <Box minHeight="100vh">
      <AboutModal {...{ isOpen, onClose }} />
      <Flex
        padding="10px"
        borderBottom="2px solid black"
        backgroundColor={colorPrefix + ".500"}
        alignItems="center"
        gap="10px"
      >
        <Heading size="lg" color="white">
          HealthPlansNext
        </Heading>
        <Spacer />
        <Button onClick={toggleColorMode}>
          <Icon
            as={colorMode === "light" ? RiSunLine : RiMoonLine}
            boxSize={5}
            focusable={true}
          />
        </Button>
        <Button onClick={onOpen}>About</Button>
      </Flex>
      <MainWindow />
    </Box>
  );
}
