import '../styles/globals.css'

// eslint-disable-next-line import/named
import {ColorScheme, ColorSchemeProvider, MantineProvider} from '@mantine/core'
import {useHotkeys, useLocalStorage} from '@mantine/hooks'
import React from 'react'

import type {AppProps} from 'next/app'
import Head from 'next/head'
import {SWRConfig} from 'swr'

function MyApp({Component, pageProps}: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true
  })
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  // TODO: Font
  return (
    <>
      <Head>
        <title>Build The Earth</title>
      </Head>
      <SWRConfig
        value={{
          refreshInterval: 0,
          fetcher: (resource: any, init: any) => fetch(resource, init).then(res => res.json()),
          shouldRetryOnError: false,
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false
        }}
      >
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
            <Component {...pageProps} />
          </MantineProvider>
        </ColorSchemeProvider>
      </SWRConfig>
    </>
  )
}

export default MyApp
