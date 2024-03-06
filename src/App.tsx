import { useEffect, useState } from "react";
import "./App.css";
import { MusicPlayer } from "./Components/MusicPlayer";
import { Layout } from "./Components/views/Layout";
import { NavBar } from "./Components/views/NavBar";
import { TitileNavBar } from "./Components/views/TitileNavBar";
import TypesafeI18n from "./i18n/i18n-react";
import { detectLocale } from "./i18n/i18n-util";
import { loadLocaleAsync } from "./i18n/i18n-util.async";
import { localStorageDetector } from "typesafe-i18n/detectors";

const detectedLocale = detectLocale(localStorageDetector);

function App() {
  const [wasLoaded, setWasLoaded] = useState(false);

  useEffect(() => {
    loadLocaleAsync(detectedLocale).then(() => setWasLoaded(true));
  }, []);

  if (!wasLoaded) return null;

  return (
    <TypesafeI18n locale={detectedLocale}>
      <Layout>
        <div className="container">
          <MusicPlayer />
        </div>
      </Layout>
    </TypesafeI18n>
  );
}

export default App;
