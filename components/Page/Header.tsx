import {
  Burger,
  Button,
  Center,
  Container,
  Group,
  Header as MantineHeader,
  Menu,
  createStyles,
} from "@mantine/core";

import Image from "next/image";
import React from "react";
import { useBooleanToggle } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  inner: {},

  links: {
    textTransform: "uppercase",
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

interface HeaderProps {
  links: {
    link: string;
    label: string;
    links?: { link: string; label: string }[];
  }[];
  user?: {
    name: string;
    avatar: string;
  };
}

const Header = ({ links, user }: HeaderProps) => {
  const { classes } = useStyles();
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          delay={0}
          transitionDuration={0}
          placement="end"
          gutter={1}
          control={
            <a href={link.link} className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
              </Center>
            </a>
          }
        >
          {menuItems}
        </Menu>
      );
    }

    return (
      <a key={link.label} href={link.link} className={classes.link}>
        {link.label}
      </a>
    );
  });
  return (
    <MantineHeader height={90} mb={120}>
      <Center style={{ width: "100%", height: "100%" }}>
        <Image src="/logo.gif" width={51} height={51} alt="Logo" />
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <Group>
          {user? (
            <Group spacing={5}>
              <Group spacing={5}>
                <Image
                  src={user.avatar}
                  width={51}
                  height={51}
                  alt="User Avatar"
                />
              </Group>
            </Group>
          ):<Button radius={"xl"}>
              Log in</Button>}
        </Group>
      </Center>
    </MantineHeader>
  );
};
export default Header;
