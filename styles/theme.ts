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
  bg_light: {
    500: theme.colors.blue[500],
    700: theme.colors.blue[700],
  },
  bg_dark: {
    500: theme.colors.blue[800],
    700: theme.colors.blue[900],
  },
  rows_light: {
    50: theme.colors.gray[50],
    100: theme.colors.gray[100],
    200: theme.colors.gray[200],
    300: theme.colors.gray[300],
    400: theme.colors.gray[400],
    500: theme.colors.gray[500],
    600: theme.colors.gray[600],
    700: theme.colors.gray[700],
    800: theme.colors.gray[800],
    900: theme.colors.gray[900],
  },
  rows_light_hover: theme.colors.blue[100],
  rows_dark: {
    50: theme.colors.black,
    100: theme.colors.gray[900],
    200: theme.colors.gray[800],
    300: theme.colors.gray[700],
    400: theme.colors.gray[600],
    500: theme.colors.gray[500],
    600: theme.colors.gray[400],
    700: theme.colors.gray[300],
    800: theme.colors.gray[200],
    900: theme.colors.gray[100],
  },
  rows_dark_hover: theme.colors.blue[600],
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
  PlanListContainer: defineStyleConfig({
    baseStyle: ({ colorMode }) => ({
      gridTemplateColumns: {
        base: "40px 250px",
        sm: "40px 110px 250px",
        md: "40px minmax(300px, 800px) 150px 250px",
      },
      margin: "0 auto",
      flexShrink: 4,
      minHeight: "100vh",
      alignContent: "start",
      paddingTop: "10px",
      backgroundColor: colorMode === "light" ? "white" : "black",
      boxShadow: "6px 0 4px -4px black, -6px 0 4px -4px black",
    }),
  }),
  ErrorMessageContainer: defineStyleConfig({
    baseStyle: ({ colorMode }) => ({
      display: "flex",
      flexDirection: "column",
      backgroundColor: colorMode === "light" ? "white" : "black",
      alignItems: "center",
      padding: "10px",
      margin: "0 auto",
      width: "75%",
      minHeight: "100vh",
    }),
  }),
};

export const newTheme = extendTheme({
  config,
  breakpoints,
  colors,
  styles,
  components,
});
