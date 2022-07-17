import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  Group,
  Pagination,
  Text,
  TextInput,
  createStyles,
  useMantineTheme
} from '@mantine/core'
import {Pin, Users, X} from 'tabler-icons-react'
import React, {useState} from 'react'

import Image from 'next/image'
import {NextPage} from 'next'
import Page from '../../../components/Page'
import {useRouter} from 'next/router'

const element = {
  head: 'https://cdn.discordapp.com/attachments/692849007038562434/964097226341244988/4final2k_1.png',
  name: 'Build The Earth Germany',
  logo: 'https://bte-germany.de/logo.gif',
  short: 'BTE Germany (first element)',
  locations: ['Germany'],
  builders: ['Nudelsuppe_42_#3571', 'Nachwahl'],
  id: 'de'
}

const Team: NextPage = () => {
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
      <Box
        style={{
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          background: `url("${element.head}") center center / cover`,
          width: '100%',
          height: '40vh'
        }}
      ></Box>
      <Group
        position="center"
        py="md"
        style={{
          width: '100%',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#fff'
        }}
      >
        <Avatar src={element.logo} size={128} mr="xl"></Avatar>
        <h1>{element.name}</h1>
      </Group>
      {!element.builders.includes('Nudelsuppe_42_#3571') && <Button>Apply</Button>}
    </Page>
  )
}

export default Team
