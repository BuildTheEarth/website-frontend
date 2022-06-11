import { Anchor, Button, Card, Grid, Text, ThemeIcon } from "@mantine/core";
import Head from "next/head";
import Image from "next/image";
import { NextPage } from "next";
import Page from "../components/Page";
import {
  BrandDiscord,
  BrandFacebook,
  BrandInstagram,
  BrandSnapchat,
  BrandTiktok,
  BrandTwitch,
  BrandTwitter,
  BrandYoutube,
  ExternalLink,
} from "tabler-icons-react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <Page
      head={{
        title: "Contact",
        image: "/images/placeholder.png",
        large: true,
      }}
      user={{
        name: "Nudelsuppe_42_#3571",
        avatar:
          "https://cdn.discordapp.com/avatars/635411595253776385/66a67aa69149c976f3b962d72ca17146.png",
      }}
    >
      <Grid columns={2}>
        <Grid.Col lg={1} sm={2}>
          <h2>Contact</h2>
          <Text>
            To come in contact with the leadership of the Build The Earth
            project, you can send an email, or reach out through Discord.
          </Text>
          <h2>Social Media</h2>
          <div style={{ marginBottom: 20 }}>
            <a href={"https://www.facebook.com/BuildTheEarth"}>
              <ThemeIcon
                variant="outline"
                radius="xl"
                size="xl"
                style={{ marginRight: 10 }}
                sx={(theme) => ({
                  backgroundColor: theme.colors.gray[0],
                  "&:hover": {
                    backgroundColor: theme.colors.gray[1],
                  },
                })}
              >
                <BrandFacebook />
              </ThemeIcon>
            </a>
            <a href={"https://www.instagram.com/buildtheearth_"}>
              <ThemeIcon
                variant="outline"
                radius="xl"
                size="xl"
                style={{ marginRight: 10 }}
                sx={(theme) => ({
                  backgroundColor: theme.colors.gray[0],
                  "&:hover": {
                    backgroundColor: theme.colors.gray[1],
                  },
                })}
              >
                <BrandInstagram />
              </ThemeIcon>
            </a>
            <a href={"https://www.tiktok.com/@buildtheearth"}>
              <ThemeIcon
                variant="outline"
                radius="xl"
                size="xl"
                style={{ marginRight: 10 }}
                sx={(theme) => ({
                  backgroundColor: theme.colors.gray[0],
                  "&:hover": {
                    backgroundColor: theme.colors.gray[1],
                  },
                })}
              >
                <BrandTiktok />
              </ThemeIcon>
            </a>
            <a href={"https://buildtheearth.net/discord"}>
              <ThemeIcon
                variant="outline"
                radius="xl"
                size="xl"
                style={{ marginRight: 10 }}
                sx={(theme) => ({
                  backgroundColor: theme.colors.gray[0],
                  "&:hover": {
                    backgroundColor: theme.colors.gray[1],
                  },
                })}
              >
                <BrandDiscord />
              </ThemeIcon>
            </a>
            <a href={"https://www.snapchat.com/add/buildtheearth"}>
              <ThemeIcon
                variant="outline"
                radius="xl"
                size="xl"
                style={{ marginRight: 10 }}
                sx={(theme) => ({
                  backgroundColor: theme.colors.gray[0],
                  "&:hover": {
                    backgroundColor: theme.colors.gray[1],
                  },
                })}
              >
                <BrandSnapchat />
              </ThemeIcon>
            </a>
            <a href={"https://www.youtube.com/c/BuildTheEarth"}>
              <ThemeIcon
                variant="outline"
                radius="xl"
                size="xl"
                style={{ marginRight: 10 }}
                sx={(theme) => ({
                  backgroundColor: theme.colors.gray[0],
                  "&:hover": {
                    backgroundColor: theme.colors.gray[1],
                  },
                })}
              >
                <BrandYoutube />
              </ThemeIcon>
            </a>
            <a href={"https://twitter.com/buildtheearth_"}>
              <ThemeIcon
                variant="outline"
                radius="xl"
                size="xl"
                style={{ marginRight: 10 }}
                sx={(theme) => ({
                  backgroundColor: theme.colors.gray[0],
                  "&:hover": {
                    backgroundColor: theme.colors.gray[1],
                  },
                })}
              >
                <BrandTwitter />
              </ThemeIcon>
            </a>
            <a href={"https://www.twitch.tv/buildtheearth"}>
              <ThemeIcon
                variant="outline"
                radius="xl"
                size="xl"
                style={{ marginRight: 10 }}
                sx={(theme) => ({
                  backgroundColor: theme.colors.gray[0],
                  "&:hover": {
                    backgroundColor: theme.colors.gray[1],
                  },
                })}
              >
                <BrandTwitch />
              </ThemeIcon>
            </a>
          </div>
          <div>
            <div style={{ marginBottom: 10 }}>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<ExternalLink />}
                onClick={() => router.push("/privacy")}
              >
                Privacy Policy
              </Button>
            </div>
            <div>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<ExternalLink />}
                onClick={() => router.push("/ban")}
              >
                Ban Appeals
              </Button>
            </div>
          </div>
        </Grid.Col>
        <Grid.Col lg={1} sm={2}>
          <h2>Inquiries</h2>
          <Card style={{ marginBottom: 10 }} shadow={"sm"}>
            <Card.Section style={{ margin: 10 }}>
              <h2>Outreach</h2>
              <Text>Xocaj</Text>
              <Text>
                Email:{" "}
                <a
                  href={"mailto: xocaj@buildtheearth.net"}
                  style={{ color: "#5D85E3" }}
                >
                  xocaj@buildtheearth.net
                </a>
              </Text>
              <Text>
                Discord:{" "}
                <a
                  href={"https://discordapp.com/users/379431523360964608"}
                  style={{ color: "#5D85E3" }}
                >
                  Xocaj#0306
                </a>
              </Text>
            </Card.Section>
          </Card>
          <Card style={{ marginBottom: 10 }} shadow={"sm"}>
            <Card.Section style={{ margin: 10 }}>
              <h2>Business</h2>
              <Text>Suchet</Text>
              <Text>
                Email:{" "}
                <a
                  href={"mailto: suchet@buildtheearth.net"}
                  style={{ color: "#5D85E3" }}
                >
                  suchet@buildtheearth.net
                </a>
              </Text>
              <Text>
                Discord:{" "}
                <a
                  href={"https://discordapp.com/users/172308595046744064"}
                  style={{ color: "#5D85E3" }}
                >
                  Xocaj#0306
                </a>
              </Text>
            </Card.Section>
          </Card>
          <Card style={{ marginBottom: 10 }} shadow={"sm"}>
            <Card.Section style={{ margin: 10 }}>
              <h2>Community</h2>
              <Text>Louis</Text>
              <Text>
                Email:{" "}
                <a
                  href={"mailto: gutterguy@buildtheearth.net"}
                  style={{ color: "#5D85E3" }}
                >
                  gutterguy@buildtheearth.net
                </a>
              </Text>
              <Text>
                Discord:{" "}
                <a
                  href={"https://discordapp.com/users/260534191274328076"}
                  style={{ color: "#5D85E3" }}
                >
                  Xocaj#0306
                </a>
              </Text>
            </Card.Section>
          </Card>
          <Card style={{ marginBottom: 10 }} shadow={"sm"}>
            <Card.Section style={{ margin: 10 }}>
              <h2>Website</h2>
              <Text>Joe Mama</Text>
              <Text>
                Email:{" "}
                <a
                  href={"mailto: joemama@buildtheearth.net"}
                  style={{ color: "#5D85E3" }}
                >
                  joemamam@buildtheearth.net
                </a>
              </Text>
              <Text>
                Discord:{" "}
                <a
                  href={"https://discordapp.com/users/379431523360964608"}
                  style={{ color: "#5D85E3" }}
                >
                  Joemama#0000
                </a>
              </Text>
            </Card.Section>
          </Card>
        </Grid.Col>
      </Grid>
      <Image src={"/logo.gif"} height={"256px"} width={"256px"} alt={""} />
    </Page>
  );
};

export default Home;
