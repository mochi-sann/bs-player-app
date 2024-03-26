import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/Components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { invoke } from "@tauri-apps/api";
import { Link } from "react-router-dom";

const languageSets = [
  { value: "en", name: "Engilish" },
  { value: "ja", name: "日本語" },
];

const themeSets = [
  { value: "dark", name: "Dark" },
  { value: "light", name: "Light" },
  { value: "class", name: "OS Setting" },
];

export const Setting = () => {
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
  };

  const onThemeChanged = async () => {
    await invoke("set_theme", { newTheme: themeSelected });
  };

  return (
    <div className="container max-w-md">
      <Link to="/" className="text-white">
        back to /
      </Link>{" "}
      <p>設定ページ</p>
      <div className="flex flex-col">
        <ul className="m-3 divide-y-2">
          <li className="flex justify-between py-3">
            <div className="flex flex-col">
              <p className="font-semibold">Language</p>
              <p className="text-gray-400">Language settings</p>
            </div>
            <Select onValueChange={(value) => onLanguageChanged(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={languageSets[0].name} />
              </SelectTrigger>
              <SelectContent>
                {languageSets.map((theme) => (
                  <SelectItem key={theme.value} value={theme.value}>
                    {theme.name}
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
