"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Spinner,
  useMediaQuery,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import MainWindow from "@/components/MainWindow";
import AboutModal from "@/components/AboutModal";

export default function IndexPage() {
  const [mounted, setMounted] = useState(false);
  const [hideSidebar] = useMediaQuery("(max-width: 1060px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  // useMediaQuery relies on client-side libraries, so rendering must wait until hydration
  useEffect(() => {
    setMounted(true);
  }, []);

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
      {!mounted ? <Spinner /> : <MainWindow {...{ hideSidebar }} />}
    </Box>
  );
}
