import {Avatar, Grid, Group, Text, TextInput, createStyles, useMantineTheme} from '@mantine/core'
import {Pin, Users} from 'tabler-icons-react'
import React, {useState} from 'react'

import {NextPage} from 'next'
import Page from '../../components/Page'
import {useRouter} from 'next/router'

const elements = [
  {
    logo: 'https://bte-germany.de/logo.gif',
    name: 'Build The Earth Germany',
    short: 'BTE Germany',
    locations: ['Germany'],
    builders: ['Nudelsuppe_42_#3571', 'Nachwahl'],
    id: 'de'
  },
  {
    logo: 'https://bte-germany.de/logo.gif',
    name: 'Build The Earth Germany',
    short: 'BTE Germany',
    locations: ['Germany'],
    builders: ['Nudelsuppe_42_#3571', 'Nachwahl'],
    id: 'de'
  },
  {
    logo: 'https://bte-germany.de/logo.gif',
    name: 'Build The Earth Germany',
    short: 'BTE Germany',
    locations: ['Germany'],
    builders: ['Nudelsuppe_42_#3571', 'Nachwahl'],
    id: 'de'
  },
  {
    logo: 'https://bte-germany.de/logo.gif',
    name: 'Build The Earth Germany',
    short: 'BTE Germany',
    locations: ['Germany'],
    builders: ['Nudelsuppe_42_#3571', 'Nachwahl'],
    id: 'de'
  },
  {
    logo: 'https://alps-bte.com/api/assets/logo/0.webp',
    name: 'Build The Earth Alps',
    short: 'Alps BTE',
    locations: ['Switzerland', 'Austria', 'Liechtenstein'],
    builders: ['Nachwahl'],
    id: 'alps'
  }
]

const useStyles = createStyles(theme => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5]
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  }
}))

const Faq: NextPage = () => {
  const router = useRouter()
  const theme = useMantineTheme()
  const {classes} = useStyles()
  const [search, setSearch] = useState<string | undefined>(undefined)
  return (
    <Page
      head={{
        title: 'Build Teams',
        image: '/images/placeholder.png',
        large: true
      }}
      user={{
        name: 'Nudelsuppe_42_#3571',
        avatar: 'https://cdn.discordapp.com/avatars/635411595253776385/66a67aa69149c976f3b962d72ca17146.png'
      }}
    >
      <p>
        Build teams are the easiest way to join Build The Earth. These groups work together on a multiplayer server to
        build cities, regions and sometimes even entire countries. All you need to do is click &apos;Apply to join&apos;
        and within no time you can start helping out!
        <br />
        <br /> To participate in a build team, you need to have purchased Minecraft Java Edition or Minecraft Bedrock
        Edition, depending on the team. In most cases, you will also be required to have the Build The Earth Modpack
        installed.
      </p>
      <TextInput
        placeholder="Search..."
        radius="xs"
        required
        value={search}
        onChange={event => setSearch(event.currentTarget.value)}
      />
      <Grid gutter="xl" style={{marginTop: theme.spacing.xl}}>
        {elements.map(element => {
          if (search !== undefined && search !== '') {
            if (!element.locations.includes(search)) return null
          }
          return (
            <Grid.Col key={element.name} sm={6}>
              <Group
                noWrap
                style={{
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                  borderRadius: theme.radius.xs
                }}
                p="md"
                onClick={() => router.push(`/teams/${element.id}`)}
              >
                <Avatar src={element.logo} size={94} radius="md" />
                <div>
                  <Text size="lg" weight={500} className={classes.name}>
                    {element.short}
                  </Text>

                  <Group noWrap spacing={10} mt={3}>
                    <Pin size={16} className={classes.icon} />
                    <Text size="xs" color="dimmed">
                      {element.locations.join(', ')}
                    </Text>
                  </Group>

                  <Group noWrap spacing={10} mt={5}>
                    <Users size={16} className={classes.icon} />
                    <Text size="xs" color="dimmed">
                      {element.builders.length}
                    </Text>
                  </Group>
                </div>
              </Group>
            </Grid.Col>
          )
        })}
      </Grid>
    </Page>
  )
}

export default Faq
