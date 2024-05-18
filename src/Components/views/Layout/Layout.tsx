import { Suspense } from "react";
import { Loading } from "../Loading";
import { NavBar } from "../NavBar";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <NavBar />
      <div className="">
        <OverlayScrollbarsComponent
          className="h-[calc(100vh-3rem-98px)] w-full overflow-auto"
          options={{
            scrollbars: { autoHide: "never", theme: " os-theme-light" },
          }}
        >
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </OverlayScrollbarsComponent>
      </div>
    </div>
  );
};
