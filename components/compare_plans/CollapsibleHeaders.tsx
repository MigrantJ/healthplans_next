import { Box, Flex, Heading, Icon, GridItem } from "@chakra-ui/react";
import React from "react";
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
  return (
    <>
      <Flex backgroundColor="silver" height="100%" alignItems="center">
        <Icon as={expanded ? BsChevronContract : BsChevronExpand} boxSize={5} />
        <Heading size="md">{mainHeader}</Heading>
      </Flex>
      <Box display={expanded ? "contents" : "none"}>
        {subHeaders.length ? (
          subHeaders.map((s, i) => {
            return (
              <React.Fragment key={i}>
                <GridItem backgroundColor="lightgray">
                  <Heading size="sm">{s}</Heading>
                </GridItem>
                <GridItem />
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
