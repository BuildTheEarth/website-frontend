import '../styles/globals.css'

// eslint-disable-next-line import/named
import {ColorScheme, ColorSchemeProvider, MantineProvider} from '@mantine/core'
import {useHotkeys, useLocalStorage} from '@mantine/hooks'
import {SessionProvider, useSession} from 'next-auth/react'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import React from 'react'
import {SWRConfig} from 'swr'
const { data: token, status } = useSession();

function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
    const { data: token, status } = useSession()
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
    <SessionProvider session={session}>
      <Head>
        <title>Build The Earth</title>
        { //<link href="https://api.mapbox.com/mapbox-gl-js/v0.54.1/mapbox-gl.css" rel="stylesheet" />
        }
      </Head>
      <SWRConfig
        value={{
          refreshInterval: 0,
          fetcher: (resource: string, init: any) => fetch(resource, init).then(res => res.json()),
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
    </SessionProvider>
  )
}

export default MyApp
