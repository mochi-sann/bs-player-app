import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/Components/ui/select";
import { useI18nContext } from "@/i18n/i18n-react";
import type { Locales } from "@/i18n/i18n-types";
import { locales } from "@/i18n/i18n-util";
import { loadLocaleAsync } from "@/i18n/i18n-util.async";
import { SelectTrigger } from "@radix-ui/react-select";
import { invoke } from "@tauri-apps/api";
import { Link } from "react-router-dom";

// const languageSets = [
//   { value: "en", name: "英語" },
//   { value: "ja", name: "日本語" },
// ];

const themeSets = [
  { value: "dark", name: "Dark" },
  { value: "light", name: "Light" },
  { value: "class", name: "OS Setting" },
];

export const Setting = () => {
  const { locale, LL, setLocale } = useI18nContext();
  const languageSets = locale;

  const [languageSelected, setLanguageSelected] = useState("en");
  const [themeSelected, setThemeSelected] = useState("dark");

  useEffect(() => {
    invoke("get_settings").then((res) => {
      setLanguageSelected(res.language);
      setThemeSelected(res.theme);
    });
  }, []);

  const onLanguageChanged = async (lang: string) => {
    await invoke("set_language", { newLanguage: lang });
    onLocaleSelected(lang as Locales);
  };

  const onThemeChanged = async () => {
    await invoke("set_theme", { newTheme: themeSelected });
  };
  const onLocaleSelected = async (value: Locales) => {
    const locale = value;
    localStorage.setItem("lang", locale);
    await loadLocaleAsync(locale);
    setLocale(locale);
  };

  return (
    <div className="container max-w-lg">
      <Link to="/" className="text-white">
        back to /
      </Link>{" "}
      <p>設定ページ</p>
      <div className="flex flex-col">
        <ul className="m-3 divide-y-2">
          <li className="flex justify-between py-3">
            <div className="flex flex-col">
              <p className="font-semibold">{LL.langs.langage()}</p>
              <label className="text-gray-400">
                {LL.langs.CHOOSE_LOCALE()}
              </label>
            </div>
            <Select onValueChange={(value) => onLanguageChanged(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={LL.langs.CHOOSE_LOCALE()} />
              </SelectTrigger>
              <SelectContent>
                {locales.map((theme) => (
                  <SelectItem key={theme} value={theme}>
                    {theme}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </li>
          <li className="flex justify-between py-3">
            <div className="flex flex-col">
              <p className="font-semibold">Theme</p>
              <p className="text-gray-400">Theme settings</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
