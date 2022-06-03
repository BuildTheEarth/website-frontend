import Head from "next/head";
import Image from "next/image";
import { NextPage } from "next";
import Page from "../components/Page";

const Home: NextPage = () => {
  return (
    <Page
      user={{
        name: "Nudelsuppe_42_#3571",
        avatar:
          "https://cdn.discordapp.com/avatars/635411595253776385/66a67aa69149c976f3b962d72ca17146.webp",
      }}
      head={{
        title: "Example Head",
        subtitle: "Example Subtitle",
        image: "/images/placeholder.png",
        large: true,
      }}
    >
      <p>Example Content</p>
    </Page>
  );
};

export default Home;
