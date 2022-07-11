import {Grid, useMantineTheme} from '@mantine/core'
import React, {useState} from 'react'

import {NextPage} from 'next'
import Page from '../components/Page'

const GetStarted: NextPage = () => {
  const theme = useMantineTheme()
  const [focused, setFocused] = useState(0)
  return (
    <Page
      head={{
        title: 'How would you like to participate?',
        image: '/images/placeholder.png',
        large: true
      }}
      user={{
        name: 'Nudelsuppe_42_#3571',
        avatar: 'https://cdn.discordapp.com/avatars/635411595253776385/66a67aa69149c976f3b962d72ca17146.png'
      }}
    >
      <p>
        You can choose between either building on the Official BTE Server or on a regional Build Team&apos;s server, but
        remember,
        <br /> you can always join the other whenever you want!
        <i> something about buildteams beeing on the main network?</i>
      </p>
      <Grid mt="lg" style={{minHeight: '60vh'}}>
        <Grid.Col
          span={focused > 0 ? (focused === 1 ? 8 : 4) : 6}
          onClick={() => setFocused(1)}
          style={{
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            background: `url("/images/getstarted/network.png") center center / cover`,
            transition: 'all 0.2s ease-out'
          }}
        ></Grid.Col>
        <Grid.Col
          span={focused > 0 ? (focused === 2 ? 8 : 4) : 6}
          onClick={() => setFocused(2)}
          style={{
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            background: `url("/images/getstarted/buildteams.png") center center / cover`,
            transition: 'all 0.2s ease-out'
          }}
        ></Grid.Col>
      </Grid>
    </Page>
  )
}

export default GetStarted
