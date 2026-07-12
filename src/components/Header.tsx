import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo.png";
import { useI18n } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: t("nav.home"), href: "#hero" },
    { label: t("nav.about"), href: "#sobre" },
    { label: t("nav.services"), href: "#servicos" },
    { label: t("nav.portfolio"), href: "#portfolio" },
    { label: t("nav.contact"), href: "#contato" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    // On initial load, if a hash is present, scroll to it then strip it from the URL
    if (window.location.hash && window.location.hash.length > 1) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
      }
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Global handler: intercept any in-page hash link so the URL stays clean.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const target = (e.target as HTMLElement | null)?.closest?.("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#") || href.length < 2) return;
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const handleAnchorClick = (_e: React.MouseEvent<HTMLAnchorElement>, _href: string) => {
    // handled by the global listener above; kept for existing call sites
  };


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-border/40 backdrop-blur-2xl py-3"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">

        <a href="#hero" onClick={(e) => handleAnchorClick(e, "#hero")} className="flex items-center group">
          <img
            src={logoAsset}
            alt="Logo"
            className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleAnchorClick(e, item.href)}
              className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gradient-primary after:transition-all hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
          <LanguageSwitcher />
          <a
            href="#contato"
            onClick={(e) => handleAnchorClick(e, "#contato")}
            className="bg-gradient-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold shadow-glow hover:shadow-[0_0_30px_-5px_hsl(271_65%_60%/0.7)] hover:-translate-y-0.5 transition-all duration-300"
          >
            {t("nav.quote")}
          </a>
        </nav>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-1">
          <LanguageSwitcher />
          <button
            className="text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-2 mx-4 rounded-xl overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    setMobileOpen(false);
                    handleAnchorClick(e, item.href);
                  }}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contato"
                onClick={(e) => {
                  setMobileOpen(false);
                  handleAnchorClick(e, "#contato");
                }}
                className="bg-gradient-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold text-center"
              >
                {t("nav.quote")}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
