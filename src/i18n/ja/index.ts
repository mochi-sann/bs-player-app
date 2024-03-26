import { BaseTranslation, Translations } from "../i18n-types";

const ja: Translations = {
  main: {
    changeLang: "言語を変更",
    langName: "日本語",
    "Select Beat Saber Maps Folder": "Beat Saber のマップフォルダを選択",
  },
  appName: "BS プレイヤーアプリ",
  HI: "こんにちは! {name}!" as `${string}{name}${string}`,
  play_music: "音楽を再生",
  loading: "読み込み中...",
  langs: {
    SELECTED_LOCALE: "日本語",
    CHOOSE_LOCALE: "言語を選ぶ",
    langage: "言語",
  },
} satisfies BaseTranslation;

export default ja;
