import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/i18n/config";

const LABELS: Record<SupportedLanguage, string> = {
  en: "EN",
  tr: "TR",
  fa: "FA",
};

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage ?? i18n.language ?? "en") as SupportedLanguage;

  return (
    <div className={`flex items-center gap-2 text-label-sm uppercase ${className}`}>
      {SUPPORTED_LANGUAGES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => void i18n.changeLanguage(l)}
          aria-pressed={current === l}
          className={`px-2 py-0.5 rounded-sm transition-colors ${
            current === l
              ? "text-[#7e867c] bg-[#dde5d9]"
              : "text-[#5e5e5e] hover:text-black"
          }`}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}