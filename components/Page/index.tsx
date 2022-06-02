import { Center, Container, Paper, useMantineTheme } from "@mantine/core";

import Footer from "./Footer";
import Header from "./Header";

interface PageProps {
  children: React.ReactNode;
  user?: {
    name: string;
    avatar: string;
  };
  disabled?: {
    header?: boolean;
    footer?: boolean;
  };
  fullWidth?: boolean;
}

const Page = (props: any) => {
  const theme = useMantineTheme();
  return (
    <div
      style={{
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      {!props.disabled?.header && (
        <Header
          links={[
            { link: "faq", label: "FAQ" },
            { link: "map", label: "Map" },
            { link: "teams", label: "Build Teams" },
            { link: "contact", label: "Contact" },
          ]}
          user={props.user}
        />
      )}
      {props.fullWidth ? (
        props.children
      ) : (
        <Container
          size="lg"
          style={{
            // @ts-ignore
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.white,
            boxShadow: theme.shadows.lg,
            marginTop: theme.spacing.xl * 2,
            marginBottom: theme.spacing.xl * 2,
          }}
        >
          {props.children}
        </Container>
      )}
      {!props.disabled?.footer && (
        <Footer
          links={[
            { link: "faq", label: "FAQ" },
            { link: "contact", label: "Contact" },
            { link: "about", label: "About us" },
          ]}
          style={{ position: "absolute", bottom: 0,width:"100vw" }}
        />
      )}
    </div>
  );
};
export default Page;
