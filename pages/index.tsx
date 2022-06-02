import Head from "next/head";
import Image from "next/image";
import { NextPage } from "next";
import Page from "../components/Page";

const Home: NextPage = () => {
  return (
    <Page
      user={{
        name: "Leander#2813",
        avatar:
          "https://cdn.discordapp.com/avatars/211584062177935361/a_301cacc2c3d88e3d50d9d6c328eac36f.gif",
      }}
    ></Page>
  );
};

export default Home;
