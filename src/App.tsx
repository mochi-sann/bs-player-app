import "./App.css";
import { I18nProvider } from "./Components/Provider/I18n";
import { Layout } from "./Components/views/Layout";
import { Loading } from "./Components/views/Loading";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: () => import("./routes/MainPage"),
      },
      {
        path: "setup",
        // Single route in lazy file
        lazy: () => import("./routes/SetUpPage"),
      },
      {
        path: "settings",
        // Single route in lazy file
        lazy: () => import("./routes/SettingPage"),
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
]);
function App() {
  return (
    <I18nProvider>
      <RouterProvider router={routers} fallbackElement={<Loading />} />
    </I18nProvider>
  );
}

export default App;
