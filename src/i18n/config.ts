import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import fa from "./locales/fa.json";
import tr from "./locales/tr.json";

export const SUPPORTED_LANGUAGES = ["en", "tr", "fa"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const RTL_LANGUAGES: SupportedLanguage[] = ["fa"];

export function applyDocumentDirection(lng: string) {
  if (typeof document === "undefined") return;
  const isRtl = RTL_LANGUAGES.includes(lng as SupportedLanguage);
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
  document.documentElement.lang = lng;
}

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      tr: { translation: tr },
      fa: { translation: fa },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    returnObjects: true,
    react: { useSuspense: false },
  });

  i18n.on("languageChanged", applyDocumentDirection);
  applyDocumentDirection(i18n.language);
}

export default i18n;