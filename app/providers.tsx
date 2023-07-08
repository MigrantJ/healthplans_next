"use client";
import { StrictMode } from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { newTheme } from "../styles/theme";

// todo: revisit these option settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
const initialColorMode = newTheme.config.initialColorMode;

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      <CacheProvider>
        <ChakraProvider theme={newTheme}>
          <QueryClientProvider client={queryClient}>
            <ColorModeScript {...initialColorMode} />
            {children}
          </QueryClientProvider>
        </ChakraProvider>
      </CacheProvider>
    </StrictMode>
  );
}
