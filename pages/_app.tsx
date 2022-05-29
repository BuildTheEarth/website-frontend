import "../styles/globals.css";

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";

const theme: MantineThemeOverride = {
  fontFamily: "Segoe UI, sans-serif",
  lineHeight: 1.5,
  fontSizes: { xs: 12, sm: 14, md: 24, lg: 37, xl: 64 },
};

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const router = useRouter();

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  // TODO: Font
  return (
    <>
      <Head>
        <title>Build The Earth</title>
      </Head>
      <SWRConfig
        value={{
          refreshInterval: 0,
          fetcher: (resource: any, init: any) =>
            fetch(resource, init).then((res) => res.json()),
          shouldRetryOnError: false,
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }}
      >
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider theme={{colorScheme,...theme}} withGlobalStyles withNormalizeCSS>
            <Component {...pageProps} />
          </MantineProvider>
        </ColorSchemeProvider>
      </SWRConfig>
    </>
  );
}

export default MyApp;
