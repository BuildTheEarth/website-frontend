/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { Anchor, Container, Group, Menu, createStyles } from "@mantine/core";

import React from "react";

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    backgroundColor:theme.colorScheme==="dark"?theme.colors.dark[7]:theme.colors.white,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

interface FooterSimpleProps {
  links: { link: string; label: string }[];
  style?: React.CSSProperties;
}

export default function Footer({ links,style }: FooterSimpleProps) {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Anchor<"a">
      color="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer} style={style}>
      <Container className={classes.inner} size={"xl"}>
        <img src="/logo.gif" height="40" alt="Logo" />
        <Group className={classes.links}>
          {items}
          <Menu
          position="top"
          placement="end"
            control={
              <Anchor<"a">
                color="dimmed"
                onClick={(event) => event.preventDefault()}
                size="sm"
              >
                Language
              </Anchor>
            }
          >
              <Menu.Item icon={<img src="https://countryflagsapi.com/png/gb" height={"15"} />}>English</Menu.Item>
              <Menu.Item icon={<img src="https://countryflagsapi.com/png/de" height={"15"} />}>German</Menu.Item>
          </Menu>
        </Group>
      </Container>
    </div>
  );
}
