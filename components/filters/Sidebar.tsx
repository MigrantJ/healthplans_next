import { Flex, chakra } from "@chakra-ui/react";

const Sidebar = chakra(Flex, {
  baseStyle: {
    flexDir: "column",
    paddingX: "10px",
    position: { base: "initial", lg: "sticky" },
    top: 0,
    flexShrink: 1,
    alignSelf: "flex-start",
    overflowY: { base: "visible", lg: "auto" },
    minHeight: "800px",
    maxHeight: { base: 0, lg: "100vh" },
    maxWidth: "800px",
    minWidth: { base: "100%", sm: "400px", lg: "100%" },
    margin: { base: "0 auto", lg: 0 },
  },
});

export default Sidebar;
