import { lazy } from "react";
import "./App.css";
import { I18nProvider } from "./Components/Provider/I18n";
import { Layout } from "./Components/views/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const MainPage = lazy(() => import("./routes/MainPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
]);

function App() {
  return (
    <I18nProvider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </I18nProvider>
  );
}

export default App;
