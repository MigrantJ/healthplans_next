import { Spinner, chakra } from "@chakra-ui/react";

const PlanSpinner = chakra(Spinner, {
  baseStyle: {
    thickness: "4px",
    color: "white",
    emptyColor: "gray.500",
    height: 50,
    width: 50,
    alignSelf: "center",
    justifySelf: "center",
  },
});

export default PlanSpinner;
