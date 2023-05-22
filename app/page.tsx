"use client";
import { Box, Flex, Heading } from "@chakra-ui/react";

import MainWindow from "@/components/MainWindow";

export default function IndexPage() {
  return (
    <Box minHeight={"100vh"}>
      <Flex padding="10px">
        <Heading size="lg">HealthCare.gov Next</Heading>
      </Flex>
      <MainWindow />
    </Box>
  );
}
