import {Avatar, Badge, Grid, Group, Pagination, Text, TextInput, createStyles, useMantineTheme} from '@mantine/core'
import {Pin, Users} from 'tabler-icons-react'
import React, {useState} from 'react'

import {NextPage} from 'next'
import Page from '../../components/Page'
import {useRouter} from 'next/router'

const elements = [
  {
    logo: 'https://bte-germany.de/logo.gif',
    name: 'Build The Earth Germany',
    short: 'BTE Germany (first element)',
    locations: ['Germany'],
    builders: ['Nudelsuppe_42_#3571', 'Nachwahl'],
    id: 'de'
  },
  {
    logo: 'https://buildtheearth.net/uploads/9f37ed8ed2904c48f97077bd7442b3a4a2051931.png',
    name: 'Build The Earth Canada',
    short: 'BTE Canada',
    locations: ['Germany'],
    builders: [],
    id: 'ca'
  },
  {
    logo: 'https://buildtheearth.net/uploads/5f89364f1e49f7184ee8ccd1b093394e7940d56f.png',
    name: 'Build The Earth Italy',
    short: 'BTE Italy',
    locations: ['Italy'],
    builders: [],
    id: 'it'
  },
  {
    logo: 'https://buildtheearth.net/uploads/5d164a47b2d14f2b7ff2d18a58881f6d1337b4c1.png?size=2',
    name: 'Build The Earth Iberia',
    short: 'BTE Iberia',
    locations: ['Spain', 'Portugal'],
    builders: [],
    id: 'ib'
  },
  {
    logo: 'https://alps-bte.com/api/assets/logo/0.webp',
    name: 'Build The Earth Alps',
    short: 'Alps BTE',
    locations: ['Switzerland', 'Austria', 'Liechtenstein'],
    builders: ['Nachwahl'],
    id: 'alps'
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
    logo: 'https://buildtheearth.net/uploads/9f37ed8ed2904c48f97077bd7442b3a4a2051931.png',
    name: 'Build The Earth Canada',
    short: 'BTE Canada',
    locations: ['Germany'],
    builders: [],
    id: 'ca'
  },
  {
    logo: 'https://buildtheearth.net/uploads/5f89364f1e49f7184ee8ccd1b093394e7940d56f.png',
    name: 'Build The Earth Italy',
    short: 'BTE Italy',
    locations: ['Italy'],
    builders: [],
    id: 'it'
  },
  {
    logo: 'https://buildtheearth.net/uploads/5d164a47b2d14f2b7ff2d18a58881f6d1337b4c1.png?size=2',
    name: 'Build The Earth Iberia',
    short: 'BTE Iberia',
    locations: ['Spain', 'Portugal'],
    builders: [],
    id: 'ib'
  },
  {
    logo: 'https://alps-bte.com/api/assets/logo/0.webp',
    name: 'Build The Earth Alps',
    short: 'Alps BTE',
    locations: ['Switzerland', 'Austria', 'Liechtenstein'],
    builders: ['Nachwahl'],
    id: 'alps'
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
    logo: 'https://buildtheearth.net/uploads/9f37ed8ed2904c48f97077bd7442b3a4a2051931.png',
    name: 'Build The Earth Canada',
    short: 'BTE Canada',
    locations: ['Germany'],
    builders: [],
    id: 'ca'
  },
  {
    logo: 'https://buildtheearth.net/uploads/5f89364f1e49f7184ee8ccd1b093394e7940d56f.png',
    name: 'Build The Earth Italy',
    short: 'BTE Italy',
    locations: ['Italy'],
    builders: [],
    id: 'it'
  },
  {
    logo: 'https://buildtheearth.net/uploads/5d164a47b2d14f2b7ff2d18a58881f6d1337b4c1.png?size=2',
    name: 'Build The Earth Iberia',
    short: 'BTE Iberia',
    locations: ['Spain', 'Portugal'],
    builders: [],
    id: 'ib'
  },
  {
    logo: 'https://alps-bte.com/api/assets/logo/0.webp',
    name: 'Build The Earth Alps',
    short: 'Alps BTE',
    locations: ['Switzerland', 'Austria', 'Liechtenstein'],
    builders: ['Nachwahl'],
    id: 'alps'
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
    logo: 'https://buildtheearth.net/uploads/9f37ed8ed2904c48f97077bd7442b3a4a2051931.png',
    name: 'Build The Earth Canada',
    short: 'BTE Canada',
    locations: ['Germany'],
    builders: [],
    id: 'ca'
  },
  {
    logo: 'https://buildtheearth.net/uploads/5f89364f1e49f7184ee8ccd1b093394e7940d56f.png',
    name: 'Build The Earth Italy',
    short: 'BTE Italy',
    locations: ['Italy'],
    builders: [],
    id: 'it'
  },
  {
    logo: 'https://buildtheearth.net/uploads/5d164a47b2d14f2b7ff2d18a58881f6d1337b4c1.png?size=2',
    name: 'Build The Earth Iberia',
    short: 'BTE Iberia',
    locations: ['Spain', 'Portugal'],
    builders: [],
    id: 'ib'
  },
  {
    logo: 'https://alps-bte.com/api/assets/logo/0.webp',
    name: 'Build The Earth Alps',
    short: 'Alps BTE',
    locations: ['Switzerland', 'Austria', 'Liechtenstein'],
    builders: ['Nachwahl'],
    id: 'alps'
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
    logo: 'https://buildtheearth.net/uploads/9f37ed8ed2904c48f97077bd7442b3a4a2051931.png',
    name: 'Build The Earth Canada',
    short: 'BTE Canada',
    locations: ['Germany'],
    builders: [],
    id: 'ca'
  },
  {
    logo: 'https://buildtheearth.net/uploads/5f89364f1e49f7184ee8ccd1b093394e7940d56f.png',
    name: 'Build The Earth Italy',
    short: 'BTE Italy',
    locations: ['Italy'],
    builders: [],
    id: 'it'
  },
  {
    logo: 'https://buildtheearth.net/uploads/5d164a47b2d14f2b7ff2d18a58881f6d1337b4c1.png?size=2',
    name: 'Build The Earth Iberia',
    short: 'BTE Iberia',
    locations: ['Spain', 'Portugal'],
    builders: [],
    id: 'ib'
  },
  {
    logo: 'https://alps-bte.com/api/assets/logo/0.webp',
    name: 'Build The Earth Alps',
    short: 'Alps BTE',
    locations: ['Switzerland', 'Austria', 'Liechtenstein'],
    builders: ['Nachwahl'],
    id: 'alps'
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
    logo: 'https://buildtheearth.net/uploads/9f37ed8ed2904c48f97077bd7442b3a4a2051931.png',
    name: 'Build The Earth Canada',
    short: 'BTE Canada',
    locations: ['Germany'],
    builders: [],
    id: 'ca'
  },
  {
    logo: 'https://buildtheearth.net/uploads/5f89364f1e49f7184ee8ccd1b093394e7940d56f.png',
    name: 'Build The Earth Italy',
    short: 'BTE Italy',
    locations: ['Italy'],
    builders: [],
    id: 'it'
  },
  {
    logo: 'https://buildtheearth.net/uploads/5d164a47b2d14f2b7ff2d18a58881f6d1337b4c1.png?size=2',
    name: 'Build The Earth Iberia',
    short: 'BTE Iberia',
    locations: ['Spain', 'Portugal'],
    builders: [],
    id: 'ib'
  },
  {
    logo: 'https://alps-bte.com/api/assets/logo/0.webp',
    name: 'Build The Earth Alps',
    short: 'Alps BTE',
    locations: ['Switzerland', 'Austria', 'Liechtenstein'],
    builders: ['Nachwahl'],
    id: 'alps'
  },
  {
    logo: 'https://bte-germany.de/logo.gif',
    name: 'Build The Earth Germany',
    short: 'BTE Germany (last element)',
    locations: ['Germany'],
    builders: ['Nudelsuppe_42_#3571', 'Nachwahl'],
    id: 'de'
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
  const [activePage, setPage] = useState(1)
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
        {elements
          .filter(
            element =>
              element.name.toLowerCase().includes(search?.toLowerCase() || '') ||
              element.short.toLowerCase().includes(search?.toLowerCase() || '') ||
              element.locations.filter(location => location.toLowerCase().includes(search?.toLowerCase() || ''))
                .length > 0
          )
          .slice(activePage * 14 - 14, activePage * 14)
          .map((element, i) => (
            <Grid.Col key={i} sm={6}>
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
                  <Group position="apart">
                    <Text size="lg" weight={500} className={classes.name}>
                      {element.short}
                    </Text>

                    {element.builders.includes('Nudelsuppe_42_#3571') ? <Badge color="green">Builder</Badge> : null}
                  </Group>

                  <Group noWrap spacing={10} mt={3}>
                    <Pin size={16} className={classes.icon} />
                    <Text size="xs" color="dimmed">
                      {element.locations.join(', ')}
                    </Text>
                  </Group>

                  <Group noWrap spacing={10} mt={5}>
                    <Users size={16} className={classes.icon} />
                    <Text size="xs" color="dimmed">
                      {element.builders.length}{' '}
                    </Text>
                  </Group>
                </div>
              </Group>
            </Grid.Col>
          ))}
      </Grid>
      <Group position="center" pt="md">
        <Pagination
          total={elements.length > 14 ? Math.floor(elements.length / 14 + 1) : 0}
          radius="xs"
          page={activePage}
          onChange={setPage}
          siblings={1}
        />
      </Group>
    </Page>
  )
}

export default Faq
