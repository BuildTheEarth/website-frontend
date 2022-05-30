/* eslint-disable @next/next/no-img-element */

import {
  Avatar,
  Button,
  Center,
  Container,
  Divider,
  Group,
  Header as MantineHeader,
  Menu,
  MenuItem,
  Text,
  UnstyledButton,
  createStyles,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { ListSearch, MoonStars, Sun, Upload } from "tabler-icons-react";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  inner: {
    height: 75,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    fontSize: theme.fontSizes.md,
    textTransform: "uppercase",
    "&:hover": {
      textDecoration: "underline",
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
    },
  },
}));

interface HeaderProps {
  links: {
    link: string;
    label: string;
  }[];
  user?: {
    name: string;
    avatar: string;
  };
}

const Header = ({ links, user }: HeaderProps) => {
  const { classes } = useStyles();
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const items = links.map((link) => {
    return (
      <a key={link.label} href={link.link} className={classes.link}>
        {link.label}
      </a>
    );
  });
  return (
    <MantineHeader height={75} mb={120}>
      <Container className={classes.inner} size={"xl"}>
        <Image
          src="/logo.gif"
          width={50}
          height={50}
          alt="logo"
          onClick={() => router.push("/")}
          style={{ cursor: "pointer" }}
        />
        <Group spacing={40}>{items}</Group>
        {user ? (
          <Menu
            gutter={10}
            control={
              <UnstyledButton>
                <Group spacing={7}>
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    radius="xl"
                    size={45}
                  />
                  <Text sx={{ marginLeft: 10 }} mr={3}>
                    {user.name}
                  </Text>
                </Group>
              </UnstyledButton>
            }
            trigger="hover"
            withArrow
          >
            <Menu.Item icon={<Upload size={14} />}>Upload World</Menu.Item>
            <Menu.Item
              icon={
                colorScheme == "dark" ? (
                  <Sun size={14} />
                ) : (
                  <MoonStars size={14} />
                )
              }
              onClick={() => toggleColorScheme()}
            >
              {colorScheme == "dark" ? "Light Theme" : "Dark Theme"}
            </Menu.Item>
            <Divider />
            <Menu.Label>Staff</Menu.Label>
            <Menu.Item icon={<ListSearch size={14} />}>Review</Menu.Item>
          </Menu>
        ) : (
          <Button
            radius="xl"
            rightIcon={
              <img src="/images/discord.svg" height="20" alt="Discord Logo" />
            }
            onClick={() => router.push("/login")}
          >
            Log in using Discord
          </Button>
        )}
      </Container>
    </MantineHeader>
  );
};
export default Header;
