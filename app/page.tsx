"use client";
import { Box, Flex, Heading } from "@chakra-ui/react";

import MainWindow from "@/components/MainWindowInfinite";

export default function IndexPage() {
  return (
    <Box>
      <Flex h="100vh" direction="column">
        <Flex padding="10px">
          <Heading size="lg">HealthCare.gov Next</Heading>
        </Flex>
        <MainWindow />
      </Flex>
    </Box>
  );
}
