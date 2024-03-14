import type { Locales, Formatters } from "./i18n-types.js";
import type { FormattersInitializer } from "typesafe-i18n";

export const initFormatters: FormattersInitializer<Locales, Formatters> = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _locale: Locales,
) => {
  const formatters: Formatters = {
    // add your formatter functions here
  };

  return formatters;
};
