import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import type { Lang } from "@/lib/translations";

const langs: { code: Lang; label: string; short: string; flag: string }[] = [
  { code: "pt", label: "Português", short: "PT", flag: "🇧🇷" },
  { code: "en", label: "English", short: "EN", flag: "🇺🇸" },
  { code: "es", label: "Español", short: "ES", flag: "🇪🇸" },
];

export const LanguageSwitcher = ({ mobile = false }: { mobile?: boolean }) => {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = langs.find((l) => l.code === lang) ?? langs[0];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-2 rounded-full border border-border/40 bg-background/40 backdrop-blur px-3 py-1.5 text-xs font-heading font-semibold tracking-wider text-foreground/80 hover:text-foreground hover:border-primary/50 transition-all"
        aria-label="Change language"
      >
        <Globe
          size={14}
          className="text-primary transition-transform duration-500 group-hover:rotate-[360deg]"
        />
        <span className="text-base leading-none">{active.flag}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className={`absolute mt-2 min-w-[160px] glass rounded-xl overflow-hidden border border-border/40 shadow-glow z-50 ${
              mobile ? "left-0" : "right-0"
            }`}
          >
            {langs.map((l) => {
              const isActive = lang === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={`flex items-center justify-between gap-3 w-full px-3 py-2.5 text-left text-xs font-heading font-semibold tracking-wide transition-colors ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base leading-none">{l.flag}</span>
                    <span>{l.label}</span>
                  </span>
                  {isActive && <Check size={12} className="text-primary" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
