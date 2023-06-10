import { Grid, chakra } from "@chakra-ui/react";

const PlanListContainer = chakra(Grid, {
  baseStyle: {
    gridTemplateColumns: {
      base: "40px 250px",
      sm: "40px 110px 250px",
      md: "40px minmax(300px, 800px) 150px 250px",
    },
    margin: "0 auto",
    flexShrink: 4,
    minHeight: "100vh",
    alignContent: "start",
  },
});

export default PlanListContainer;
