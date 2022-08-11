import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Burger,
  Button,
  Container,
  Divider,
  Group,
  Header as MantineHeader,
  Menu,
  Paper,
  Text,
  Transition,
  UnstyledButton,
  createStyles,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import {
  BrandDiscord,
  BrandInstagram,
  BrandTiktok,
  BrandTwitch,
  BrandTwitter,
  BrandYoutube,
  ChevronDown,
  FileSearch,
  FileUpload,
  Logout,
  MoonStars,
  Sun,
  World
} from 'tabler-icons-react'
import React, {CSSProperties, useState} from 'react'

import {useBooleanToggle} from '@mantine/hooks'
import {useRouter} from 'next/router'

const useStyles = createStyles(theme => ({
  root: {
    zIndex: 1
  },

  dropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',
    boxShadow: theme.shadows.md,

    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '100%',
    height: '100%'
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none'
    },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 600,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md
    }
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7]
    }
  },

  userMenu: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none'
    }
  },
  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    marginLeft: theme.spacing.xs,
    transition: 'background-color 100ms ease',
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1]
    },
    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
      margin: 0,
      width: '100%'
    }
  }
}))

interface HeaderProps {
  links: {
    link: string
    label: string
  }[]
  user?: {
    name: string
    avatar: string
  }
}

const Header = ({links, user}: HeaderProps) => {
  const [opened, toggleOpened] = useBooleanToggle(false)
  const [userMenuOpened, setUserMenuOpened] = useState(false)
  const {colorScheme, toggleColorScheme} = useMantineColorScheme()
  const {classes, cx} = useStyles()
  const router = useRouter()

  const items = links.map(link => (
    <a
      key={link.label}
      className={cx(classes.link, {
        [classes.linkActive]: router.pathname.includes(link.link)
      })}
      onClick={() => {
        router.push(link.link)
        toggleOpened(false)
      }}
    >
      {link.label}
    </a>
  ))
  return (
    <MantineHeader height={60} className={classes.root} fixed>
      <Container className={classes.header} size={'xl'}>
        <Group spacing={5} className={classes.links}>
          <img src="/logo.gif" alt="Mantine" height="40" onClick={() => router.push('/')} style={{cursor: 'pointer'}} />
          {items}
        </Group>
        <Group spacing={5} className={classes.links}>
          {user ? (
            <Menu
              placement="end"
              transition="pop-top-right"
              className={classes.userMenu}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              control={
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened
                  })}
                >
                  <Group spacing={7}>
                    <Avatar src={user.avatar} alt={user.name} radius="xl" size={20} />
                    <Text weight={500} size="sm" sx={{lineHeight: 1}} mr={3}>
                      {user.name}
                    </Text>
                    <ChevronDown size={12} />
                  </Group>
                </UnstyledButton>
              }
            >
              <Menu.Item icon={<FileUpload size={14} />}>Upload world</Menu.Item>
              <Divider />
              <Menu.Label>Quick actions</Menu.Label>
              <Menu.Item
                icon={colorScheme === 'dark' ? <MoonStars size={14} /> : <Sun size={14} />}
                onClick={() => toggleColorScheme()}
              >
                Toggle {colorScheme === 'dark' ? 'light' : 'dark'} theme{' '}
              </Menu.Item>
              <Divider />
              <Menu.Label>Staff</Menu.Label>
              <Menu.Item icon={<FileSearch size={14} />}>Review claims</Menu.Item>
              <Divider />
              <Menu.Item icon={<Logout size={14} />} onClick={() => router.push('/logout')}>
                Sign out
              </Menu.Item>
            </Menu>
          ) : (
            <>
              <Button ml="md" onClick={() => router.push('/getstrted')}>
                Get Started
              </Button>
              <Button ml="md" onClick={() => router.push('/login')} variant="outline">
                Sign In
              </Button>
            </>
          )}
        </Group>

        <Group spacing={5} className={classes.burger}>
          <img src="/logo.gif" alt="Mantine" height="40" onClick={() => router.push('/')} style={{cursor: 'pointer'}} />
          <Burger opened={opened} onClick={() => toggleOpened()} size="sm" />
        </Group>

        <Transition transition="scale-y" duration={200} mounted={opened}>
          {(styles: CSSProperties) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
              {user ? (
                <>
                  <Divider />
                  <UnstyledButton
                    className={cx(classes.user, {
                      [classes.userActive]: userMenuOpened
                    })}
                    onClick={() => router.push('/profile')}
                  >
                    <Group spacing={7}>
                      <Avatar src={user.avatar} alt={user.name} radius="xl" size={25} />
                      <Text weight={500} size="sm" sx={{lineHeight: 1}} mr={3}>
                        {user.name}
                      </Text>
                    </Group>
                  </UnstyledButton>
                </>
              ) : (
                <>
                  <Divider />
                  <UnstyledButton
                    className={cx(classes.user, {
                      [classes.userActive]: userMenuOpened
                    })}
                  >
                    <Group spacing={7}>
                      <Button onClick={() => router.push('/getstarted')}>Get Started</Button>
                      <Button ml="md" onClick={() => router.push('/login')} variant="outline">
                        Sign In
                      </Button>
                    </Group>
                  </UnstyledButton>
                </>
              )}
            </Paper>
          )}
        </Transition>
      </Container>
    </MantineHeader>
  )
}

interface LogoHeaderProps {
  head: string
  logo: string
  name: string
  socials?: {name: string; url: string}[]
  builders?: string[]
  showStatus?: boolean
  userStatus: string
  applyHref?: string
}

export const LogoHeader = (props: LogoHeaderProps) => {
  const theme = useMantineTheme()
  return (
    <>
      <Box
        style={{
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          background: `url("${props.head}") center center / cover`,
          width: '100%',
          height: '40vh'
        }}
      ></Box>
      <Group
        position="center"
        style={{
          width: '100%',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#fff',
          borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]}`
        }}
      >
        <Group
          position="apart"
          py="md"
          style={{
            width: '80%',
            position: 'relative'
          }}
        >
          <Group>
            <Avatar
              src={props.logo}
              size={128}
              mr="xl"
              style={{
                marginTop: -60,
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#fff',
                borderRadius: '50%',
                padding: 16
              }}
            ></Avatar>
            <h1 style={{lineHeight: 1, margin: 0}}>{props.name}</h1>
          </Group>
          <Group>
            {props.socials?.map((social: {name: string; url: string}) => {
              let icon = null
              switch (social.name) {
                case 'website': {
                  icon = <World />
                  break
                }
                case 'youtube': {
                  icon = <BrandYoutube />
                  break
                }
                case 'twitter': {
                  icon = <BrandTwitter />
                  break
                }
                case 'discord': {
                  icon = <BrandDiscord />
                  break
                }
                case 'twitch': {
                  icon = <BrandTwitch />
                  break
                }
                case 'instagram': {
                  icon = <BrandInstagram />
                  break
                }
                case 'tiktok': {
                  icon = <BrandTiktok />
                  break
                }
                default:
                  icon = <World />
              }
              return (
                <ActionIcon component="a" href={social.url} target="_blank" key={social.name}>
                  {icon}
                </ActionIcon>
              )
            })}
            {props.builders?.includes('Nudelsuppe_42_#3571') || props.showStatus ? (
              <Badge color="green" size="lg">
                {props.userStatus}
              </Badge>
            ) : (
              <Button component="a" href={props.applyHref}>
                Apply
              </Button>
            )}
          </Group>
        </Group>
      </Group>
    </>
  )
}

export default Header
