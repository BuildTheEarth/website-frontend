import { Anchor, Button } from "@mantine/core";

import Head from "next/head";
import Image from "next/image";
import { NextPage } from "next";
import Page from "../components/Page";

const Home: NextPage = () => {
  return (
    <Page
      head={{
        title: "Example Head",
        subtitle: "Example Subtitle",
        image: "/images/placeholder.png",
        large: true,
      }}
      user={{
        name: "Nudelsuppe_42_#3571",
        avatar:
          "https://cdn.discordapp.com/avatars/635411595253776385/66a67aa69149c976f3b962d72ca17146.png",
      }}
    >
      <h1>Example Heading 1</h1>
      <h2>Example Heading 2</h2>
      <h3>Example Heading 3</h3>
      <h4>Example Heading 4</h4>
      <h5>Example Heading 5</h5>
      <h6>Example Heading 6</h6>
      <p>Example Paragraph</p>
      <Anchor>Example Anchor</Anchor>
    </Page>
  );
};

export default Home;
