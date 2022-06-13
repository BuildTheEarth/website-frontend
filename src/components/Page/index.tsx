import {Center, Container, Paper, Text, Title, useMantineTheme} from '@mantine/core'
import React from 'react'
import Footer from './Footer'
import Header from './Header'

interface PageProps {
  children: React.ReactNode
  fullWidth?: boolean
  user?: {
    name: string
    avatar: string
  }
  disabled?: {
    header?: boolean
    footer?: boolean
  }
  head?: {
    title: string
    subtitle?: string
    image: string
    filter?: string
    large?: boolean
  }
}

const Page = (props: any) => {
  const theme = useMantineTheme()
  return (
    <div
      style={{
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        width: 'calc(100vw - (100vw - 100%))',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {!props.disabled?.header && (
        <Header
          links={[
            {link: 'faq', label: 'FAQ'},
            {link: 'map', label: 'Map'},
            {link: 'teams', label: 'Build Teams'},
            {link: 'contact', label: 'Contact'}
          ]}
          user={props.user}
        />
      )}

      {props.head && (
        <div
          style={{
            width: '100%',
            height: '20vh',
            position: 'relative'
          }}
        >
          <div
            style={{
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
              background: `url(${props.head?.image})`,
              filter: props.head?.filter || 'brightness(0.8)',
              width: '100%',
              height: '100%'
            }}
          ></div>
          <Center
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          >
            <Title style={{color: '#ffffff'}} align="center" order={1}>
              {props.head?.title}
              {props.head?.subtitle && (
                <>
                  <Text style={{fontWeight: 'normal'}}>{props.head?.subtitle}</Text>
                </>
              )}
            </Title>
          </Center>
        </div>
      )}

      {props.fullWidth ? (
        props.children
      ) : (
        <Container
          size="xl"
          style={{
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#ffffff',
            boxShadow: theme.shadows.lg,
            marginTop: theme.spacing.xl * 2,
            marginBottom: theme.spacing.xl * 2,
            padding: `${theme.spacing.xl}px ${theme.spacing.xl * 3}px`,
            flex: 1,
            width: '100%'
          }}
        >
          {props.children}
        </Container>
      )}

      {!props.disabled?.footer && (
        <Footer
          links={[
            {link: 'faq', label: 'FAQ'},
            {link: 'contact', label: 'Contact'},
            {link: 'about', label: 'About us'}
          ]}
        />
      )}
    </div>
  )
}
export default Page
