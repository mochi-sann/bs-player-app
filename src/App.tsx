import { Suspense, lazy } from "react";
import "./App.css";
import { I18nProvider } from "./Components/Provider/I18n";
import { RequireMapPath } from "./Components/features/RequireMapPath";
import { Layout } from "./Components/views/Layout";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const MainPage = lazy(() => import("./routes/MainPage"));
const SetUpPage = lazy(() => import("./routes/SetUpPage"));
const SettingPage = lazy(() => import("./routes/SettingPage"));

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

function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Suspense fallback={<>...</>}>
                  <RequireMapPath>
                    <MainPage />
                  </RequireMapPath>
                </Suspense>
              }
            />
            <Route
              path="setup"
              element={
                <Suspense fallback={<>...</>}>
                  <SetUpPage />
                </Suspense>
              }
            />
            <Route
              path="settings"
              element={
                <Suspense fallback={<>...</>}>
                  <SettingPage />
                </Suspense>
              }
            />

            <Route
              path="*"
              element={
                <Suspense>
                  <NoMatch />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}

export default App;
