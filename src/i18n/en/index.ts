import type { BaseTranslation, Translations } from "../i18n-types.js";

const en: Translations = {
  main: {
    changeLang: "chenge language",
    langName: "english",
    "Select Beat Saber Maps Folder": "Select Beat Saber Maps Folder",
  },
  appName: "BS player app",
  SELECTED_LOCALE: "English",
  CHOOSE_LOCALE: "Choose a language",
  HI: "Hi {name}!" as `${string}{name}${string}`, // Update the type of HI property
  play_music: "Play Music",
  loading: "Loading...",
} satisfies BaseTranslation;

export default en;
