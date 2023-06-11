import { extendTheme } from "@chakra-ui/react";

// uses min-width
const breakpoints = {
  sm: "400px",
  md: "768px",
  lg: "1060px",
};

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const styles = {
  global: {},
};

const components = {
  Button: {
    baseStyle: {
      boxShadow: "0px 0px 2px 2px black",
      _disabled: {
        color: "gray.600",
        backgroundColor: "gray.400",
        opacity: 1,
        boxShadow: "0px 0px 2px 2px black",
      },
    },
  },
};

export const theme = extendTheme({ colors, breakpoints, styles, components });
