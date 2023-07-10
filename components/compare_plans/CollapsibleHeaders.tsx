import React from "react";
import {
  Box,
  Flex,
  Heading,
  Icon,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsChevronExpand, BsChevronContract } from "react-icons/bs";

interface IProps {
  expanded: boolean;
  mainHeader: string;
  subHeaders: string[];
}

export default function CollapsibleHeaders({
  expanded,
  mainHeader,
  subHeaders,
}: IProps) {
  const colorPrefix = useColorModeValue("rows_light", "rows_dark");

  return (
    <>
      <Flex backgroundColor={colorPrefix + ".300"} height="100%" padding="5px">
        <Icon
          as={expanded ? BsChevronContract : BsChevronExpand}
          boxSize={5}
          margin="3px"
        />
        <Heading size="md">{mainHeader}</Heading>
      </Flex>
      <Box display={expanded ? "contents" : "none"}>
        {subHeaders.length ? (
          subHeaders.map((s, i) => {
            return (
              <React.Fragment key={i}>
                <GridItem
                  backgroundColor={colorPrefix + ".200"}
                  padding="5px 10px"
                >
                  <Heading size="sm">{s}</Heading>
                </GridItem>
                <GridItem backgroundColor={colorPrefix + ".50"} />
              </React.Fragment>
            );
          })
        ) : (
          <>
            <GridItem />
            <GridItem />
          </>
        )}
      </Box>
    </>
  );
}
