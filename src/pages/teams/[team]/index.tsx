import {Center, Container, Grid, Group, useMantineTheme} from '@mantine/core'
import {ChevronRight, Server} from 'tabler-icons-react'

import {LogoHeader} from '../../../components/Header'
import {NextPage} from 'next'
import Page from '../../../components/Page'
import React from 'react'
import {useMediaQuery} from '@mantine/hooks'
import {useRouter} from 'next/router'

const element = {
  head: 'https://cdn.discordapp.com/attachments/692849007038562434/964097226341244988/4final2k_1.png',
  name: 'Build The Earth Germany',
  logo: 'https://bte-germany.de/logo.gif',
  short: 'BTE Germany (first element)',
  locations: ['Germany'],
  builders: ['Nachwahl', 'udelsuppe_42_#3571'],
  minecraft: 'bte-germany.de',
  id: 'de',
  userStatus: 'Builder',
  socials: [
    {name: 'website', url: 'https://bte-germany.de'},
    {name: 'youtube', url: 'https://www.youtube.com/c/BuildTheEarthGermany'},
    {name: 'instagram', url: 'https://www.instagram.com/buildtheearthgermany/'},
    {name: 'discord', url: 'https://discord.gg/uFK2th7'},
    {name: 'twitch', url: ' https://www.twitch.tv/bte_germany'},
    {name: 'tiktok', url: 'https://www.tiktok.com/@btegermany'}
  ],
  images: [
    'https://cdn.discordapp.com/attachments/692849007038562434/969997709798953051/unknown.png',
    'https://cdn.discordapp.com/attachments/692849007038562434/964097226341244988/4final2k_1.png',
    'https://cdn.discordapp.com/attachments/692849007038562434/951765328688459776/2022-03-11_09.54.53.png',
    'https://buildtheearth.net/uploads/942a4bbd309c6765cb965ce841d60abd10c067d7.png',
    'https://cdn.discordapp.com/attachments/692849007038562434/951198479869427722/2022-03-09_20.09.21.png',
    'https://cdn.discordapp.com/attachments/692849007038562434/964097226341244988/4final2k_1.png',
    'https://cdn.discordapp.com/attachments/692849007038562434/951198479869427722/2022-03-09_20.09.21.png',
    'https://buildtheearth.net/uploads/942a4bbd309c6765cb965ce841d60abd10c067d7.png',
    'https://cdn.discordapp.com/attachments/692849007038562434/969997709798953051/unknown.png',
    'https://cdn.discordapp.com/attachments/692849007038562434/951198479869427722/2022-03-09_20.09.21.png',
    'https://buildtheearth.net/uploads/942a4bbd309c6765cb965ce841d60abd10c067d7.png',
    'https://buildtheearth.net/uploads/942a4bbd309c6765cb965ce841d60abd10c067d7.png'
  ]
}

const Team: NextPage = () => {
  const matches = useMediaQuery('(min-width: 900px)')
  const router = useRouter()
  const team = router.query.team
  const theme = useMantineTheme()
  return (
    <Page
      user={{
        name: 'Nudelsuppe_42_#3571',
        avatar: 'https://cdn.discordapp.com/avatars/635411595253776385/66a67aa69149c976f3b962d72ca17146.png'
      }}
      fullWidth
    >
      <LogoHeader {...element} applyHref={`${team}/apply`} />
      <Container
        size="xl"
        style={{
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#ffffff',
          boxShadow: theme.shadows.lg,
          marginBottom: theme.spacing.xl * 2,
          padding: !matches ? `${theme.spacing.xs * 3}px` : `${theme.spacing.xl * 3}px`,
          paddingBottom: !matches ? `${theme.spacing.xs * 1.5}px` : `${theme.spacing.xl * 1.5}px`,
          paddingTop: !matches ? `${theme.spacing.xs * 1}px` : `${theme.spacing.xl * 1}px`,
          flex: 1,
          width: '100%',
          position: 'relative'
        }}
      >
        <h4>About</h4>
        <p>We are building Germany 1:1 in Minecraft!</p>
        <Center inline>
          <Server size={20} />
          <p style={{paddingLeft: 5}}> Server IP: {element.minecraft}</p>
        </Center>{' '}
        <Group position="apart">
          <h4>Images</h4>
          {element.images.length > 9 && (
            <Center inline style={{cursor: 'pointer'}} onClick={() => router.push(`${team}/images`)}>
              <a>See more</a>
              <ChevronRight size={20} />
            </Center>
          )}
        </Group>
        <Grid>
          {element.images.slice(0, 9).map((image: string, i: number) => {
            return (
              <Grid.Col
                key={i}
                sm={4}
                style={{
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                  background: `url("${image}") center center / cover`,
                  height: theme.spacing.xl * 9
                }}
              ></Grid.Col>
            )
          })}
        </Grid>
      </Container>
    </Page>
  )
}

export default Team