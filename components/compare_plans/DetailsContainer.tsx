import { Grid, chakra } from "@chakra-ui/react";

const DetailsContainer = chakra(Grid, {
  baseStyle: {
    justifyItems: "center",
    alignItems: "center",
    borderInline: "1px solid",
    borderColor: "gray.300",
    width: "100%",
    overflowY: "hidden",
    marginTop: "-4px",
  },
});

export default DetailsContainer;
