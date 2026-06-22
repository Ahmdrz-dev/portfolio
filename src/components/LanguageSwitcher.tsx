import { useState } from "react";
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
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop: flat buttons */}
      <div className={`hidden md:flex items-center gap-2 text-label-sm uppercase ${className}`}>
        {SUPPORTED_LANGUAGES.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => void i18n.changeLanguage(l)}
            aria-pressed={current === l}
            className={`px-2 py-0.5 rounded-sm transition-colors ${
              current === l ? "text-[#7e867c] bg-[#dde5d9]" : "text-[#5e5e5e] hover:text-black"
            }`}
          >
            {LABELS[l]}
          </button>
        ))}
      </div>

      {/* Mobile: dropdown */}
      <div className={`relative md:hidden ${className}`}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 text-label-sm uppercase text-black px-2 py-1 rounded-sm bg-[#dde5d9] text-[#7e867c]"
        >
          {LABELS[current]}
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </button>
        {open && (
          <div className="absolute right-0 top-full mt-1 bg-[#F7F6F3] border border-[#c4c7c7] rounded-sm shadow-md z-50 flex flex-col min-w-[60px]">
            {SUPPORTED_LANGUAGES.filter(l => l !== current).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => { void i18n.changeLanguage(l); setOpen(false); }}
                className="px-4 py-2 text-label-sm uppercase text-[#5e5e5e] hover:text-black hover:bg-[#eee] transition-colors text-left"
              >
                {LABELS[l]}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}