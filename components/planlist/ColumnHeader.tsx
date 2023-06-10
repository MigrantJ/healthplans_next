import { Box, chakra } from "@chakra-ui/react";

const ColumnHeader = chakra(Box, {
  baseStyle: {
    display: {
      base: "none",
      md: "block",
    },
    position: {
      base: "initial",
      md: "sticky",
    },
    paddingX: "3px",
    top: 0,
    backgroundColor: "white",
  },
});

export default ColumnHeader;
