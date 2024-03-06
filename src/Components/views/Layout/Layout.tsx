import { NavBar } from "../NavBar";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = (props: LayoutProps) => {
  return (
    <div>
      <NavBar />
      <div className="h-[calc(100vh-3rem)] overflow-auto">{props.children}</div>
    </div>
  );
};
