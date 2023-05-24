"use client";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import "../styles/global.css";

import MainWindow from "@/components/MainWindow";

export default function IndexPage() {
  return (
    <Box id="root">
      <Flex id="header">
        <Heading size="lg">HealthCare.gov Next</Heading>
        <Spacer />
        <Heading size="md">About</Heading>
      </Flex>
      <MainWindow />
    </Box>
  );
}
