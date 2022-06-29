import {Accordion, createStyles} from '@mantine/core'

import {NextPage} from 'next'
import Page from '../components/Page'
import React from 'react'

const elements = [
  {
    title: 'How can I start building, what version and settings do I need?',
    content:
      'To build on this project, you need to have a legitimate copy of Minecraft: Java Edition installed. Next, download and run the appropriate installer for your OS. Windows Installer (ZIP) macOS Installer (DMG) Linux Executable (TAR) Universal Installer (JAR) If you encounter any issues, hop onto the #support channel on our Discord!'
  },
  {
    title: 'How can we support the project financially?',
    content:
      'To build on this project, you need to have a legitimate copy of Minecraft: Java Edition installed. Next, download and run the appropriate installer for your OS. Windows Installer (ZIP) macOS Installer (DMG) Linux Executable (TAR) Universal Installer (JAR) If you encounter any issues, hop onto the #support channel on our Discord!'
  },
  {
    title: 'I am having crashes on startup, run out of RAM?',
    content:
      'To build on this project, you need to have a legitimate copy of Minecraft: Java Edition installed. Next, download and run the appropriate installer for your OS. Windows Installer (ZIP) macOS Installer (DMG) Linux Executable (TAR) Universal Installer (JAR) If you encounter any issues, hop onto the #support channel on our Discord!'
  },
  {
    title: 'Is there a Multiplayer server for this project?',
    content:
      'To build on this project, you need to have a legitimate copy of Minecraft: Java Edition installed. Next, download and run the appropriate installer for your OS. Windows Installer (ZIP) macOS Installer (DMG) Linux Executable (TAR) Universal Installer (JAR) If you encounter any issues, hop onto the #support channel on our Discord!'
  },
  {
    title: 'Roads don`t show up',
    content:
      'To build on this project, you need to have a legitimate copy of Minecraft: Java Edition installed. Next, download and run the appropriate installer for your OS. Windows Installer (ZIP) macOS Installer (DMG) Linux Executable (TAR) Universal Installer (JAR) If you encounter any issues, hop onto the #support channel on our Discord!'
  },
  {
    title: 'How do I teleport to a specific place?',
    content:
      'To build on this project, you need to have a legitimate copy of Minecraft: Java Edition installed. Next, download and run the appropriate installer for your OS. Windows Installer (ZIP) macOS Installer (DMG) Linux Executable (TAR) Universal Installer (JAR) If you encounter any issues, hop onto the #support channel on our Discord!'
  },
  {
    title: 'Install Java for mismatching architectures',
    content:
      'To build on this project, you need to have a legitimate copy of Minecraft: Java Edition installed. Next, download and run the appropriate installer for your OS. Windows Installer (ZIP) macOS Installer (DMG) Linux Executable (TAR) Universal Installer (JAR) If you encounter any issues, hop onto the #support channel on our Discord!'
  },
  {
    title: 'Why am I spawning on a mushroom island?',
    content:
      'To build on this project, you need to have a legitimate copy of Minecraft: Java Edition installed. Next, download and run the appropriate installer for your OS. Windows Installer (ZIP) macOS Installer (DMG) Linux Executable (TAR) Universal Installer (JAR) If you encounter any issues, hop onto the #support channel on our Discord!'
  }
]
const useStyles = createStyles((theme, _params, getRef) => {
  const control = getRef('control')

  return {
    control: {
      ref: control
    },

    item: {
      border: 'none'
    },

    itemOpened: {
      [`& .${control}`]: {}
    }
  }
})

const Faq: NextPage = () => {
  const {classes} = useStyles()
  return (
    <Page
      head={{
        title: 'Frequently asked questions',
        image: '/images/placeholder.png',
        large: true
      }}
      user={{
        name: 'Nudelsuppe_42_#3571',
        avatar: 'https://cdn.discordapp.com/avatars/635411595253776385/66a67aa69149c976f3b962d72ca17146.png'
      }}
    >
      <Accordion
        iconPosition="right"
        iconSize={48}
        offsetIcon
        multiple
        classNames={{
          item: classes.item,
          itemOpened: classes.itemOpened,
          control: classes.control
        }}
      >
        {elements.map((element, idx) => (
          <Accordion.Item label={<h2>{element.title}</h2>} key={idx}>
            {element.content}
          </Accordion.Item>
        ))}
      </Accordion>
    </Page>
  )
}

export default Faq
