import React from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Spacer,
  Text,
} from "@chakra-ui/react";
import InfoIcon from "../InfoIcon";
import ConditionalWrapper from "../ConditionalWrapper";

interface IProps {
  isFormLabel?: boolean;
  headingText: string;
  infoText: string;
  children: JSX.Element;
}

export default function FilterGroup({
  isFormLabel = true,
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
      <ConditionalWrapper
        condition={isFormLabel}
        wrap={(outerChildren) => (
          <FormControl id={headingText}>{outerChildren}</FormControl>
        )}
      >
        <Flex>
          {isFormLabel ? (
            <FormLabel>{headingText}</FormLabel>
          ) : (
            <Text fontSize="16px" fontWeight={500}>
              {headingText}
            </Text>
          )}

          <Spacer />
          <InfoIcon text={infoText} />
        </Flex>
        {children}
      </ConditionalWrapper>
    </Box>
  );
}
