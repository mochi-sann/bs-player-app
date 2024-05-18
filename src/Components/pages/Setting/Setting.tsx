import { Button } from "@/Components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useI18nContext } from "@/i18n/i18n-react";
import type { Locales } from "@/i18n/i18n-types";
import { locales } from "@/i18n/i18n-util";
import { loadLocaleAsync } from "@/i18n/i18n-util.async";
import { Link } from "react-router-dom";

export const Setting = () => {
  const { LL, setLocale } = useI18nContext();

  const onLanguageChanged = async (lang: string) => {
    await onLocaleSelected(lang as Locales);
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
        <Button variant={"outline"} className="my-2">
          {LL.main.backMainPage()}
        </Button>
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
            <Select
              defaultValue={localStorage.getItem("lang") || ""}
              onValueChange={(value) => onLanguageChanged(value)}
            >
              <SelectTrigger className="w-[180px]   ">
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
        </ul>
      </div>
    </div>
  );
};
