import React from "react";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import InfoIcon from "../InfoIcon";

interface IProps {
  headingText: string;
  infoText: string;
  children: React.ReactNode;
}

export default function FilterGroup({
  headingText,
  infoText,
  children,
}: IProps) {
  return (
    <Box
      backgroundColor="blue.100"
      padding="10px"
      borderRadius="10px"
      marginY="5px"
      border="1px solid"
      borderColor="blue.300"
    >
      <Flex>
        <Heading size="sm">{headingText}</Heading>
        <Spacer />
        <InfoIcon text={infoText} />
      </Flex>
      {children}
    </Box>
  );
}
