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
          "https://cdn.discordapp.com/attachments/692259936012468235/980222046623641620/unknown.png",
      }}
    ></Page>
  );
};

export default Home;
