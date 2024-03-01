import { useEffect, useState } from "react";
import "./App.css";
import { MusicPlayer } from "./Components/MusicPlayer";
import { TitileNavBar } from "./Components/TitileNavBar";
import TypesafeI18n from "./i18n/i18n-react";
import { detectLocale } from "./i18n/i18n-util";
import { loadLocaleAsync } from "./i18n/i18n-util.async";
import { MusicFileListAtom } from "./lib/jotai/jotai";
import { useAtom } from "jotai";
import { localStorageDetector } from "typesafe-i18n/detectors";

const detectedLocale = detectLocale(localStorageDetector);

function App() {
  const [musickFileList] = useAtom(MusicFileListAtom);

  const [wasLoaded, setWasLoaded] = useState(false);

  useEffect(() => {
    loadLocaleAsync(detectedLocale).then(() => setWasLoaded(true));
  }, []);

  if (!wasLoaded) return null;

  return (
    <TypesafeI18n locale={detectedLocale}>
      <div className="container">
        <TitileNavBar />
        {/* <pre>{JSON.stringify({  musickFileList }, null, 2)}</pre> */}
        <div>{musickFileList.length > 0 && <MusicPlayer />}</div>
      </div>
    </TypesafeI18n>
  );
}

export default App;
