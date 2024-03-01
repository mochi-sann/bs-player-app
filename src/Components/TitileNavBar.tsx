import { ChangeEventHandler } from "react";
import { useI18nContext } from "../i18n/i18n-react";
import { Locales } from "../i18n/i18n-types";
import { locales } from "../i18n/i18n-util";
import { loadLocaleAsync } from "../i18n/i18n-util.async";
import { Button, Title } from "@mantine/core";

export const TitileNavBar = () => {
  const { LL, setLocale, locale } = useI18nContext();
  const onLocaleSelected: ChangeEventHandler<HTMLSelectElement> = async ({
    target,
  }) => {
    const locale = target.value as Locales;
    localStorage.setItem("lang", locale);
    await loadLocaleAsync(locale);
    setLocale(locale);
  };

  return (
    <div>
      <Title>{LL.HI({ name: "こんにちは" })}</Title>
      <label>
        {LL.SELECTED_LOCALE()}
        <select value={locale || ""} onChange={onLocaleSelected}>
          <option value="" disabled>
            {LL.CHOOSE_LOCALE()}
          </option>
          {locales.map((locale) => (
            <option key={locale} value={locale}>
              {locale}
            </option>
          ))}
        </select>
      </label>

      <Button onClick={() => setLocale("ja")}>{LL.main.changeLang()}bbb</Button>
      <Button onClick={() => setLocale("en")}>{LL.main.changeLang()}aaa</Button>
    </div>
  );
};
