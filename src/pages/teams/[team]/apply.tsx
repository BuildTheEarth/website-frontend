import {Button, Container, Stepper, TextInput, useMantineTheme} from '@mantine/core'

import {LogoHeader} from '../../../components/Header'
import {NextPage} from 'next'
import Page from '../../../components/Page'
import React from 'react'
import {useForm} from '@mantine/form'
import {useMediaQuery} from '@mantine/hooks'
import {useRouter} from 'next/router'

const element = {
  head: 'https://cdn.discordapp.com/attachments/692849007038562434/964097226341244988/4final2k_1.png',
  name: 'Build The Earth Germany',
  logo: 'https://bte-germany.de/logo.gif',
  short: 'BTE Germany (first element)',
  locations: ['Germany'],
  builders: ['Nachwahl', 'Nudlsuppe_42_#3571'],
  about: 'We are building Germany 1:1 in Minecraft!',
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
  ],
  apply: {
    enabled: true,
    inputs: [
      {id: 'img_mc', name: 'A link to a picture of buildings you have built in Minecraft', placeholder: 'https://...'},
      {id: 'img_rl', name: 'Add a link to the picture of the building in real life', placeholder: 'https://...'},
      {id: 'bt', name: 'Have you been accepted for a solo build or another build team?', placeholder: 'Yes/No'},
      {id: 'mc', name: 'What is your Minecraft username?', placeholder: 'Your Minecraft name'}
    ]
  }
}
const user = {
  name: 'Nudelsuppe_42_#3571',
  avatar: 'https://cdn.discordapp.com/avatars/635411595253776385/66a67aa69149c976f3b962d72ca17146.png'
}

const Team: NextPage = () => {
  const matches = useMediaQuery('(min-width: 900px)')
  const router = useRouter()
  const team = router.query.team
  const theme = useMantineTheme()
  const form = useForm({
    initialValues: element.apply.inputs.map((input: {id: string; name: string; placeholder: string}) => ({
      [input.id]: ''
    }))
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    // eslint-disable-next-line no-console
    console.log(e)
  }
  if (element.builders.includes('Nudelsuppe_42_#3571') && team) {
    router.push(`/teams/${team}`)
  }
  return (
    <Page user={user} fullWidth>
      <LogoHeader {...element} />
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
        <p>{element.about}</p>
        {!element.apply.enabled ? (
          <Button>Join Build Team</Button>
        ) : (
          <div>
            <Stepper active={user?.name ? (element.userStatus === 'Builder' ? 2 : 1) : 0}>
              <Stepper.Step label="Register" description="Create an account">
                {/* TODO: Register Component or sth here */}
              </Stepper.Step>
              <Stepper.Step
                label="Apply"
                description={
                  element.userStatus === 'Builder'
                    ? `Application for ${element.name} accepted`
                    : `Apply for ${element.name}`
                }
              >
                <p>
                  To build in this team you have to apply. Please fill out the form below and the Build team will get
                  back to you shortly.
                </p>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                  {element.apply.inputs.map((input: {id: any; name: string; placeholder: string}, i: number) => (
                    <TextInput
                      id={input.id}
                      key={i}
                      label={input.name}
                      placeholder={input.placeholder}
                      {...form.getInputProps(input.id)}
                    ></TextInput>
                  ))}
                  <Button type="submit" mt="md">
                    Apply
                  </Button>
                </form>
              </Stepper.Step>
              <Stepper.Step label="Build" description="Build the Earth!">
                {/* TODO: Tell them that they got accepted*/}
              </Stepper.Step>
            </Stepper>
          </div>
        )}
      </Container>
    </Page>
  )
}

export default Team
