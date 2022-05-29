import Header from "./Header";

interface PageProps {
  children: React.ReactNode;
  user?: {
    name: string;
    avatar: string;
  };
}

const Page = (props: any) => {
  return (
    <div>
      <Header
        links={[
          { link: "faq", label: "FAQ" },
          { link: "map", label: "Map" },
          { link: "teams", label: "Build Teams" },
          { link: "contact", label: "Contact"},
        ]}
        user={props.user}
      />
      {props.children}
    </div>
  );
};
export default Page;
