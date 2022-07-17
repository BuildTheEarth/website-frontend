/* eslint-disable no-undef */

import {
  At,
  BrandDiscord,
  BrandFacebook,
  BrandInstagram,
  BrandSnapchat,
  BrandTiktok,
  BrandTwitch,
  BrandTwitter,
  BrandYoutube,
  ExternalLink
} from 'tabler-icons-react'
import {Avatar, Button, Grid, Group, Text, ThemeIcon, useMantineTheme} from '@mantine/core'

import {NextPage} from 'next'
import Page from '../components/Page'
import React from 'react'
import {useRouter} from 'next/router'

const contacts = [
  {
    name: 'Suchet M.',
    avatar: 'https://cdn.discordapp.com/avatars/172308595046744064/5c22f8f891158e3221a1488b47f9e817.png',
    position: 'CMO / Business Inq. Intl. / Media',
    mail: 'suchet@buildtheearth.net',
    discord: 'Suchet#7082',
    discordId: '172308595046744064'
  },
  {
    name: 'Bernard M.',
    avatar: 'https://cdn.discordapp.com/avatars/310185776748953600/46d18c50e2ff900750749ff18005588f.png',
    position: 'Chief Revenue Officer / Business Inquiries',
    mail: 'boaz@buildtheearth.net',
    discord: 'Knish#8000',
    discordId: '310185776748953600'
  },
  {
    name: 'Chang Y.',
    avatar: 'https://cdn.discordapp.com/avatars/223918685750951939/2adfcf049cd63f27a950138fed2decf6.png',
    position: 'Claims',
    mail: 'c.yu@buildtheearth.net',
    discord: 'saltypotato#3476',
    discordId: '223918685750951939'
  },
  {
    name: 'MrSmarty',
    avatar: 'https://cdn.discordapp.com/avatars/671594544089006091/90cb31c7b674f56d1ec8e411ea9dd645.png',
    position: 'Community',
    mail: 'mrsmarty@buildtheearth.net',
    discord: 'MrSmarty#1732',
    discordId: '671594544089006091'
  }
]

const Contact: NextPage = () => {
  const router = useRouter()
  const theme = useMantineTheme()
  return (
    <Page
      head={{
        title: 'Contact',
        image: '/images/placeholder.png',
        large: true
      }}
      user={{
        name: 'Nudelsuppe_42_#3571',
        avatar: 'https://cdn.discordapp.com/avatars/635411595253776385/66a67aa69149c976f3b962d72ca17146.png'
      }}
    >
      <h2>Contact</h2>
      <Text>
        To come in contact with the leadership of the Build The Earth project, you can send an email, or reach out
        through Discord.
      </Text>
      <h2>Social Media</h2>
      <div style={{marginBottom: theme.spacing.xl * 2, display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
        <ThemeIcon
          variant="outline"
          radius="xl"
          size="xl"
          onClick={() => window.open('https://www.facebook.com/BuildTheEarth/', '_blank')}
          sx={{
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
            cursor: 'pointer'
          }}
        >
          <BrandFacebook />
        </ThemeIcon>

        <ThemeIcon
          variant="outline"
          radius="xl"
          size="xl"
          onClick={() => window.open('https://www.instagram.com/buildtheearth_', '_blank')}
          sx={{
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
            cursor: 'pointer'
          }}
        >
          <BrandInstagram />
        </ThemeIcon>

        <ThemeIcon
          variant="outline"
          radius="xl"
          size="xl"
          onClick={() => window.open('https://www.tiktok.com/@buildtheearth', '_blank')}
          sx={{
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
            cursor: 'pointer'
          }}
        >
          <BrandTiktok />
        </ThemeIcon>

        <ThemeIcon
          variant="outline"
          radius="xl"
          size="xl"
          onClick={() => window.open('https://buildtheearth.net/discord', '_blank')}
          sx={{
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
            cursor: 'pointer'
          }}
        >
          <BrandDiscord />
        </ThemeIcon>

        <ThemeIcon
          variant="outline"
          radius="xl"
          size="xl"
          onClick={() => window.open('https://www.snapchat.com/add/buildtheearth', '_blank')}
          sx={{
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
            cursor: 'pointer'
          }}
        >
          <BrandSnapchat />
        </ThemeIcon>

        <ThemeIcon
          variant="outline"
          radius="xl"
          size="xl"
          onClick={() => window.open('https://www.youtube.com/c/BuildTheEarth', '_blank')}
          sx={{
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
            cursor: 'pointer'
          }}
        >
          <BrandYoutube />
        </ThemeIcon>

        <ThemeIcon
          variant="outline"
          radius="xl"
          size="xl"
          onClick={() => window.open('https://twitter.com/buildtheearth_', '_blank')}
          sx={{
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
            cursor: 'pointer'
          }}
        >
          <BrandTwitter />
        </ThemeIcon>

        <ThemeIcon
          variant="outline"
          radius="xl"
          size="xl"
          onClick={() => window.open('https://www.twitch.tv/buildtheearth', '_blank')}
          sx={{
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
            cursor: 'pointer'
          }}
        >
          <BrandTwitch />
        </ThemeIcon>
      </div>
      <div>
        <div style={{marginBottom: theme.spacing.xs}}>
          <Button variant="outline" leftIcon={<ExternalLink />} onClick={() => router.push('/privacy')}>
            Privacy Policy
          </Button>
        </div>
        <div>
          <Button variant="outline" leftIcon={<ExternalLink />} onClick={() => router.push('/ban')}>
            Ban Appeals
          </Button>
        </div>
      </div>
      <Grid mt="md">
        {contacts.map(contact => (
          <Grid.Col key={contact.name} sm={6}>
            <Group noWrap>
              <Avatar src={contact.avatar} size={94} />
              <div>
                <Text size="xs" sx={{textTransform: 'uppercase'}} weight={700} color="dimmed">
                  {contact.position}
                </Text>
                <Text size="lg" weight={500}>
                  {contact.name}
                </Text>

                <Group noWrap spacing={10} mt={3}>
                  <BrandDiscord size={16} />
                  <Text size="xs" color="dimmed">
                    {contact.discord}
                  </Text>
                </Group>

                <Group noWrap spacing={10} mt={5}>
                  <At size={16} />
                  <Text size="xs" color="dimmed" onClick={() => window.open(`mailto:${contact.mail}`, '_blank')}>
                    {contact.mail}
                  </Text>
                </Group>
              </div>
            </Group>
          </Grid.Col>
        ))}
      </Grid>
    </Page>
  )
}

export default Contact
