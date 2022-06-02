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
  }
}

const Page = (props: any) => {
  return (
    <div>
      {!props.disabled?.header && <Header
        links={[
          { link: "faq", label: "FAQ" },
          { link: "map", label: "Map" },
          { link: "teams", label: "Build Teams" },
          { link: "contact", label: "Contact" },
        ]}
        user={props.user}
      />}
      
      {props.children}
      {!props.disabled?.footer &&<Footer
        links={[
          { link: "faq", label: "FAQ" },
          { link: "contact", label: "Contact" },
          { link: "about", label: "About us" },
        ]}
      />}
    </div>
  );
};
export default Page;
