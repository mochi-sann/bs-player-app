import { NavBar } from "../NavBar";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = (props: LayoutProps) => {
  return (
    <div className="rounded">
      <NavBar />
      {props.children}
    </div>
  );
};
