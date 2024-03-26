import { useEffect, useState } from "react";
import "./App.css";
import { Layout } from "./Components/views/Layout";
import { Loading } from "./Components/views/Loading";
import TypesafeI18n from "./i18n/i18n-react";
import { detectLocale } from "./i18n/i18n-util";
import { loadLocaleAsync } from "./i18n/i18n-util.async";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import { localStorageDetector } from "typesafe-i18n/detectors";

const detectedLocale = detectLocale(localStorageDetector);

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
  const [wasLoaded, setWasLoaded] = useState(false);

  useEffect(() => {
    loadLocaleAsync(detectedLocale).then(() => setWasLoaded(true));
  }, []);

  if (!wasLoaded) return null;

  return (
    <TypesafeI18n locale={detectedLocale}>
      <RouterProvider router={routers} fallbackElement={<Loading />} />
    </TypesafeI18n>
  );
}

export default App;
