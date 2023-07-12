import React from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Spacer,
  Text,
  HTMLChakraProps,
  ThemingProps,
  useStyleConfig,
} from "@chakra-ui/react";
import InfoIcon from "../InfoIcon";
import ConditionalWrapper from "../ConditionalWrapper";

interface IContainerProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"FilterGroupContainer"> {}

const FilterGroupContainer = function ({ variant, ...rest }: IContainerProps) {
  const styles = useStyleConfig("FilterGroupContainer", { variant });
  return <Flex __css={styles} {...rest} />;
};

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
    <FilterGroupContainer>
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
            <Text fontWeight={500}>{headingText}</Text>
          )}

          <Spacer />
          <InfoIcon text={infoText} />
        </Flex>
        {children}
      </ConditionalWrapper>
    </FilterGroupContainer>
  );
}
