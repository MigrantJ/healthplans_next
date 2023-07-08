import {
  theme,
  extendTheme,
  createMultiStyleConfigHelpers,
  ThemeConfig,
  defineStyleConfig,
} from "@chakra-ui/react";
import { inputAnatomy, tagAnatomy } from "@chakra-ui/anatomy";

const inputConfig = createMultiStyleConfigHelpers(inputAnatomy.keys);
const tagConfig = createMultiStyleConfigHelpers(tagAnatomy.keys);

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

// uses min-width
const breakpoints = {
  sm: "400px",
  md: "768px",
  lg: "1060px",
};

const colors = {
  brand_light: {
    50: theme.colors.blue[500],
    100: theme.colors.blue[500],
    200: theme.colors.blue[500],
    300: theme.colors.blue[500],
    400: theme.colors.blue[500],
    500: theme.colors.blue[500],
    600: theme.colors.blue[500],
    700: theme.colors.blue[500],
    800: theme.colors.blue[500],
    900: theme.colors.blue[500],
  },
  brand_dark: {
    500: theme.colors.red[500],
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
  Input: inputConfig.defineMultiStyleConfig({
    baseStyle: inputConfig.definePartsStyle({
      field: {
        paddingBottom: "2px",
        backgroundColor: "blue.50",
        border: "1px solid",
        borderColor: "blue.500",
        _focus: {
          backgroundColor: "white",
          border: "2px solid",
          borderColor: "blue.300",
        },
      },
    }),
  }),
  Tag: tagConfig.defineMultiStyleConfig({
    baseStyle: tagConfig.definePartsStyle({
      container: {
        backgroundColor: "blue.300",
        border: "1px solid",
        borderColor: "blue.500",
      },
      label: { color: "white" },
      closeButton: { color: "white" },
    }),
  }),
  Button: defineStyleConfig({
    variants: {
      sidebar: ({ colorMode }) => ({
        backgroundColor: colorMode === "light" ? "blue.500" : "red.500",
        border: "1px solid blue.500",
        color: "white",
        _hover: {
          backgroundColor: "blue.300",
          _disabled: {
            backgroundColor: "gray.400",
          },
        },
      }),
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
  }),
  Divider: {
    baseStyle: { borderColor: "blue.600" },
  },
  FormLabel: {
    baseStyle: { margin: 0 },
  },
};

export const newTheme = extendTheme({
  config,
  breakpoints,
  colors,
  styles,
  components,
});
