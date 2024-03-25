import { NavBar } from "../NavBar";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = (props: LayoutProps) => {
  return (
    <div>
      <NavBar />
      <div className="">
        <OverlayScrollbarsComponent
          className="h-[calc(100vh-3rem)] w-full overflow-auto"
          options={{
            scrollbars: { autoHide: "never", theme: " os-theme-light" },
          }}
        >
          {props.children}
        </OverlayScrollbarsComponent>
      </div>
    </div>
  );
};
