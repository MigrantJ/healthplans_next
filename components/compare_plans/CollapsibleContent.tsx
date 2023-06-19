import { Box, GridItem } from "@chakra-ui/react";
import React from "react";

interface IProps {
  expanded: boolean;
  expandFunc: () => void;
  children: React.ReactNode;
}

export default function CollapsibleContent({
  expanded,
  expandFunc,
  children,
}: IProps) {
  return (
    <>
      <GridItem width="100%" height="100%" onClick={expandFunc}></GridItem>
      <Box display={expanded ? "contents" : "none"}>
        {React.Children.map(children, (c, i) => {
          return (
            <React.Fragment key={i}>
              <GridItem />
              {c}
            </React.Fragment>
          );
        })}
      </Box>
    </>
  );
}
