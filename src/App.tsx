import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { useAtom } from "jotai";
import { MusicFileListAtom } from "./lib/jotai/jotai";
import { MusicPlayer } from "./Components/MusicPlayer";
import { detectLocale } from "./i18n/i18n-util";
import {
  localStorageDetector,
  navigatorDetector,
} from "typesafe-i18n/detectors";
import { useEffect, useState } from "react";
import TypesafeI18n, { useI18nContext } from "./i18n/i18n-react";
import { loadLocaleAsync } from "./i18n/i18n-util.async";
import { TitileNavBar } from "./Components/TitileNavBar";
import { Child } from "@tauri-apps/api/shell";
const detectedLocale = detectLocale(localStorageDetector);

function App() {
  const [musickFileList, setMusickFileList] = useAtom(MusicFileListAtom);

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
