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
import "../styles/global.css";

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
    <Box id="root">
      <AboutModal {...{ isOpen, onClose }} />
      <Flex id="header">
        <Heading size="lg">HealthPlansNext</Heading>
        <Spacer />
        <Button onClick={onOpen}>About</Button>
      </Flex>
      {!mounted ? <Spinner /> : <MainWindow {...{ hideSidebar }} />}
    </Box>
  );
}
