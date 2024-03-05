import { useI18nContext } from "../i18n/i18n-react";

export const TitileNavBar = () => {
  const { LL, setLocale } = useI18nContext();

  return (
    <div>
      <p>{LL.HI({ name: "こんにちは" })}</p>
      <label>{LL.SELECTED_LOCALE()}</label>
      <button onClick={() => setLocale("ja")}>{LL.main.changeLang()}bbb</button>
      <button onClick={() => setLocale("en")}>{LL.main.changeLang()}aaa</button>
      import {ChangeEventHandler} from "react";
    </div>
  );
};
