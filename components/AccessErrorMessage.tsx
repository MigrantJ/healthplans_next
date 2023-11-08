import { Heading, Text } from "@chakra-ui/react";

import ErrorMessageContainer from "./ErrorMessageContainer";

export default function AccessErrorMessage() {
  return (
    <ErrorMessageContainer>
      <Heading>Sorry!</Heading>
      <Text paddingY="20px">
        There is currently an issue with accessing the Health Insurance Marketplace, please try again later!
      </Text>
    </ErrorMessageContainer>
  );
}
