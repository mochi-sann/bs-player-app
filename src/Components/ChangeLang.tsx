import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const ChangeLang: React.FC = () => {
  const [t, i18n] = useTranslation();
  const [lang, setLang] = useState("ja");

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <button onClick={() => setLang(lang === "en" ? "ja" : "en")}>
      {" "}
      <span>{t("changeLang")}</span>
    </button>
  );
};
