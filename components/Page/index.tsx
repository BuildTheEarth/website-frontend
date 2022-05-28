import Header from "./Header";

interface PageProps {
    children: React.ReactNode
}

const Page = (props: any) => {
    return <div>
        <Header links={[{ link: "teams", label: "Build Teams"}]} />
        {props.children}
    </div>;
}
export default Page;