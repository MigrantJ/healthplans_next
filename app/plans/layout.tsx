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
import AboutModal from "@/components/AboutModal";

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode, colorMode } = useColorMode();
  const bgColor = useColorModeValue("main.400", "main.700");

  return (
    <Box minHeight="100vh">
      <AboutModal {...{ isOpen, onClose }} />
      <Flex
        padding="10px"
        borderBottom="2px solid black"
        backgroundColor={bgColor}
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
      {children}
    </Box>
  );
}
