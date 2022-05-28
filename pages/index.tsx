import Head from "next/head";
import Image from "next/image";
import { NextPage } from "next";
import Page from "../components/Page";

const Home: NextPage = () => {
  return (
    <Page
      user={{
        name: "John Doe",
        avatar:
          "https://cdn.discordapp.com/attachments/784434067365036062/980119789567623208/bte_heart_eyes_224.png",
      }}
    ></Page>
  );
};

export default Home;
