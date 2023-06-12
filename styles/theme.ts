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
  global: {
    body: {
      backgroundColor: "blue.700",
    },
  },
};

const components = {
  Button: {
    baseStyle: {},
    variants: {
      modeselect: {
        boxShadow: "0px 0px 2px 2px black",
        backgroundColor: "blue.500",
        color: "white",
        zIndex: 2,
        position: "fixed",
        bottom: "10px",
        _hover: {
          backgroundColor: "blue.300",
          _disabled: {
            backgroundColor: "gray.400",
          },
        },
        _disabled: {
          color: "gray.600",
          backgroundColor: "gray.400",
          opacity: 1,
          boxShadow: "0px 0px 2px 2px black",
        },
      },
    },
  },
  Divider: {
    baseStyle: { borderColor: "blue.600" },
  },
};

export const theme = extendTheme({ colors, breakpoints, styles, components });
