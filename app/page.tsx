"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Spinner,
  useMediaQuery,
} from "@chakra-ui/react";
import "../styles/global.css";

import MainWindow from "@/components/MainWindow";

export default function IndexPage() {
  const [mounted, setMounted] = useState(false);
  const [hideSidebar] = useMediaQuery("(max-width: 1060px)");
  // useMediaQuery relies on client-side libraries, so rendering must wait until hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box id="root">
      <Flex id="header">
        <Heading size="lg">HealthPlansNext</Heading>
        <Spacer />
        <Heading size="md">About</Heading>
      </Flex>
      {!mounted ? <Spinner /> : <MainWindow {...{ hideSidebar }} />}
    </Box>
  );
}
