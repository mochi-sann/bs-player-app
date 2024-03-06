import { useEffect, useState } from "react";
import TypesafeI18n from "@/i18n/i18n-react";
import { detectLocale } from "@/i18n/i18n-util";
import { loadLocaleAsync } from "@/i18n/i18n-util.async";
import { localStorageDetector } from "typesafe-i18n/detectors";

const detectedLocale = detectLocale(localStorageDetector);
export const I18nProvider = (props: { children: React.ReactNode }) => {
  const [wasLoaded, setWasLoaded] = useState(false);

  useEffect(() => {
    loadLocaleAsync(detectedLocale).then(() => setWasLoaded(true));
  }, []);

  if (!wasLoaded) return null;
  return <TypesafeI18n locale={detectedLocale}>{props.children}</TypesafeI18n>;
};
