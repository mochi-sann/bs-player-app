import { lazy } from "react";
import "./App.css";
import { I18nProvider } from "./Components/Provider/I18n";
import { RequireMapPath } from "./Components/features/RequireMapPath";
import { Layout } from "./Components/views/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const MainPage = lazy(() => import("./routes/MainPage"));
const SetUpPage = lazy(() => import("./routes/SetUpPage"));

function App() {
  return (
    <I18nProvider>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <RequireMapPath>
                  <MainPage />
                </RequireMapPath>
              }
            />
            <Route path="/setup" element={<SetUpPage />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </I18nProvider>
  );
}

export default App;
