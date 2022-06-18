import {ActionIcon, Button, Card, Grid, MediaQuery, SimpleGrid, Text, ThemeIcon, useMantineTheme} from '@mantine/core'
import {
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

import Image from 'next/image'
import {NextPage} from 'next'
import Page from '../components'
import React from 'react'
import {useRouter} from 'next/router'

const contacts = [
  {
    name: 'Suchet M.',
    position: 'CMO / Business Inq. Intl. / Media',
    mail: 'suchet@buildtheearth.net',
    discord: 'Suchet#7082',
    discordId: '172308595046744064'
  },
  {
    name: 'Bernard M.',
    position: 'Chief Revenue Officer / Business Inquiries',
    mail: 'boaz@buildtheearth.net',
    discord: 'Knish#8000',
    discordId: '310185776748953600'
  },
  {
    name: 'Chang Y.',
    position: 'Claims',
    mail: 'c.yu@buildtheearth.net',
    discord: 'saltypotato#3476',
    discordId: '223918685750951939'
  },
  {
    name: 'MrSmarty',
    position: 'Community',
    mail: 'mrsmarty@buildtheearth.net',
    discord: 'MrSmarty#1732',
    discordId: '671594544089006091'
  }
]

const Home: NextPage = () => {
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
      <Grid columns={2}>
        <Grid.Col lg={1} sm={2} style={{position: 'relative'}}>
          <h2>Contact</h2>
          <Text>
            To come in contact with the leadership of the Build The Earth project, you can send an email, or reach out
            through Discord.
          </Text>
          <h2>Social Media</h2>
          <div style={{marginBottom: theme.spacing.xl * 2,display: "flex", gap: "15px"}}>
            
            <ThemeIcon
              variant="outline"
              radius="xl"
              size="xl"
              onClick={() => window.open('https://www.facebook.com/BuildTheEarth/', '_blank')}
              sx={theme => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                cursor: 'pointer'
              })}
            >
              <BrandFacebook />
            </ThemeIcon>
           
            
            <ThemeIcon
              variant="outline"
              radius="xl"
              size="xl"
              onClick={() => window.open('https://www.instagram.com/buildtheearth_', '_blank')}
              sx={theme => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                cursor: 'pointer'
              })}
            >
              <BrandInstagram />
            </ThemeIcon>
           
            
            <ThemeIcon
              variant="outline"
              radius="xl"
              size="xl"
              onClick={() => window.open('https://www.tiktok.com/@buildtheearth', '_blank')}
              sx={theme => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                cursor: 'pointer'
              })}
            >
                <BrandTiktok />
              </ThemeIcon>
           
            
            <ThemeIcon
              variant="outline"
              radius="xl"
              size="xl"
              onClick={() => window.open('https://buildtheearth.net/discord', '_blank')}
              sx={theme => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                cursor: 'pointer'
              })}
            >
                <BrandDiscord />
              </ThemeIcon>
           
            
            <ThemeIcon
              variant="outline"
              radius="xl"
              size="xl"
              onClick={() => window.open('https://www.snapchat.com/add/buildtheearth', '_blank')}
              sx={theme => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                cursor: 'pointer'
              })}
            >
                <BrandSnapchat />
              </ThemeIcon>
           
            
            <ThemeIcon
              variant="outline"
              radius="xl"
              size="xl"
              onClick={() => window.open('https://www.youtube.com/c/BuildTheEarth', '_blank')}
              sx={theme => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                cursor: 'pointer'
              })}
            >
                <BrandYoutube />
              </ThemeIcon>
           
            
            <ThemeIcon
              variant="outline"
              radius="xl"
              size="xl"
              onClick={() => window.open('https://twitter.com/buildtheearth_', '_blank')}
              sx={theme => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                cursor: 'pointer'
              })}
            >
                <BrandTwitter />
              </ThemeIcon>
           
            
            <ThemeIcon
              variant="outline"
              radius="xl"
              size="xl"
              onClick={() => window.open('https://www.twitch.tv/buildtheearth', '_blank')}
              sx={theme => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                cursor: 'pointer'
              })}
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
          <MediaQuery smallerThan={768} styles={{display: 'none'}}>
            <div style={{position: 'absolute', bottom: theme.spacing.md}}>
              <Image src={'/logo.gif'} height={'128px'} width={'128px'} alt={''} />
            </div>
          </MediaQuery>
        </Grid.Col>
        <Grid.Col lg={1} sm={2}>
          <h2>Inquiries</h2>
          {contacts.map((contact, idx) => (
            <Card key={idx} style={{marginBottom: theme.spacing.xs}} shadow={'sm'}>
              <Card.Section style={{margin: theme.spacing.xs}}>
                <h2>{contact.position}</h2>
                <Text>{contact.name}</Text>
                <Text>
                  Email:{' '}
                  <a href={`mailto:${contact.mail}`} style={{color: theme.colors.blue[7]}}>
                    {contact.mail}
                  </a>
                </Text>
                <Text>
                  Discord:{' '}
                  <a href={`https://discordapp.com/users/${contact.discordId}`} style={{color: theme.colors.blue[7]}}>
                    {contact.discord}
                  </a>
                </Text>
              </Card.Section>
            </Card>
          ))}
          <MediaQuery largerThan={768} styles={{display: 'none'}}>
            <div style={{marginTop: theme.spacing.md}}>
              <Image src={'/logo.gif'} height={'128px'} width={'128px'} alt={''} />
            </div>
          </MediaQuery>
        </Grid.Col>
      </Grid>
    </Page>
  )
}

export default Home
