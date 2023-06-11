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
      _disabled: {
        opacity: 1,
      },
    },
  },
};

export const theme = extendTheme({ colors, breakpoints, styles, components });
