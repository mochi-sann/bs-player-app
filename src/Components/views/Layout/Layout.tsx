import { NavBar } from "../NavBar";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
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
          <Outlet />
        </OverlayScrollbarsComponent>
      </div>
    </div>
  );
};
