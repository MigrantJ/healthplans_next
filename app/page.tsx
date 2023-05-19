"use client";
import { Box, Flex, Heading } from "@chakra-ui/react";

import MainWindow from "@/components/MainWindow";

export default function IndexPage() {
  return (
    <Flex direction="column">
      <Flex padding="10px">
        <Heading size="lg">HealthCare.gov Next</Heading>
      </Flex>
      <MainWindow />
    </Flex>
  );
}
