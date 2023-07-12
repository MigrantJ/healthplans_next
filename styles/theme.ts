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
  main: {
    50: "#e3f3ff",
    100: "#bedaf4",
    200: "#98c0e7",
    300: "#71a6da",
    400: "#4b8dce",
    500: "#3173b4",
    600: "#235a8d",
    700: "#164066",
    800: "#072640",
    900: "#000e1b",
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
  rows_dark_hover: theme.colors.blue[700],
};

const styles = {
  global: ({ colorMode }) => ({
    "&::-webkit-scrollbar": {
      width: "12px",
      backgroundColor: colorMode === "light" ? "main.50" : "main.900",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "4px",
      backgroundColor: colorMode === "light" ? "main.200" : "main.700",
    },
  }),
};

const components = {
  Input: inputConfig.defineMultiStyleConfig({
    baseStyle: ({ colorMode }) =>
      inputConfig.definePartsStyle({
        field: {
          paddingBottom: "2px",
          backgroundColor: colorMode === "light" ? "main.50" : "main.900",
          border: "1px solid",
          borderColor: colorMode === "light" ? "main.500" : "main.500",
          _focus: {
            backgroundColor: colorMode === "light" ? "main.50" : "main.800",
            border: "2px solid",
            borderColor: colorMode === "light" ? "main.300" : "main.400",
          },
        },
      }),
  }),
  Tag: tagConfig.defineMultiStyleConfig({
    baseStyle: ({ colorMode }) =>
      tagConfig.definePartsStyle({
        container: {
          backgroundColor: colorMode === "light" ? "main.300" : "main.500",
          border: "1px solid",
          borderColor: "main.500",
        },
        label: { color: "white" },
        closeButton: { color: "white" },
      }),
  }),
  Button: defineStyleConfig({
    variants: {
      sidebar: ({ colorMode }) => ({
        backgroundColor: "main.500",
        border: "1px solid blue.500",
        color: "white",
        _hover: {
          backgroundColor: colorMode === "light" ? "main.300" : "main.400",
          _disabled: {
            backgroundColor: "gray.400",
          },
        },
      }),
      modeselect: ({ colorMode }) => ({
        boxShadow: "0px 0px 2px 2px black",
        backgroundColor: colorMode === "light" ? "main.500" : "main.600",
        color: "white",
        zIndex: 2,
        position: "fixed",
        bottom: "10px",
        _hover: {
          backgroundColor: colorMode === "light" ? "main.400" : "main.500",
          _disabled: {
            backgroundColor: colorMode === "light" ? "gray.400" : "gray.700",
          },
        },
        _disabled: {
          color: colorMode === "light" ? "gray.600" : "gray.500",
          backgroundColor: colorMode === "light" ? "gray.400" : "gray.700",
          opacity: 1,
          boxShadow: "0px 0px 2px 2px black",
        },
      }),
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
  SidebarContainer: defineStyleConfig({
    baseStyle: ({ colorMode }) => ({
      flexDir: "column",
      paddingX: "5px",
      paddingTop: "4px",
      position: { base: "static", lg: "sticky" },
      top: 0,
      flexShrink: 1,
      alignSelf: "flex-start",
      overflowY: "auto",
      minHeight: "100vh",
      maxHeight: { lg: "100vh" },
      maxWidth: "800px",
      minWidth: { base: "100%", sm: "400px", lg: "100%" },
      margin: { base: "0 auto", lg: 0 },
      boxShadow: "6px 0 4px -4px black, -6px 0 4px -4px black",
      backgroundColor: colorMode === "light" ? "white" : "main.800",
      zIndex: 1,
    }),
  }),
  FilterGroupContainer: defineStyleConfig({
    baseStyle: ({ colorMode }) => ({
      backgroundColor: colorMode === "light" ? "main.100" : "main.700",
      padding: "10px",
      borderRadius: "10px",
      marginY: "5px",
      border: "1px solid",
      borderColor: colorMode === "light" ? "main.300" : "main.600",
    }),
  }),
  PlanlistColumnHeader: defineStyleConfig({
    baseStyle: ({ colorMode }) => ({
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
      backgroundColor:
        colorMode === "light" ? "rows_light.100" : "rows_dark.100",
      borderBottom: "2px solid darkgray",
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
