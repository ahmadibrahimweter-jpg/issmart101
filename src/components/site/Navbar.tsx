import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Moon, Sun, Menu, X, Languages } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, toggle } = useTheme();
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/#projects", label: t("nav.projects") },
    { to: "/#vision", label: t("nav.about") },
    { to: "/#isma", label: t("nav.isma") },
    { to: "/#contact", label: t("nav.contact") },
  ];

  const currentLanguage = i18n.resolvedLanguage ?? i18n.language ?? "en";
  const languageCode = currentLanguage.split("-")[0] || "en";
  const switchLang = () => i18n.changeLanguage(languageCode === "en" ? "bn" : "en");
  const isBn = languageCode === "bn";

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >

        <nav
          className={`flex w-full max-w-7xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-700 ease-luxury ${
            scrolled ? "glass-dark shadow-luxury" : "bg-transparent border-transparent shadow-none"
          }`}
        >
          {/* Brand */}
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[oklch(0.6_0.12_75)] shadow-gold">
              <span className="font-display text-base font-bold text-[var(--navy-deep)]">IC</span>
            </span>
            <span className={`hidden text-sm font-medium tracking-wide sm:block ${isBn ? "font-bn" : ""}`}>
              {t("brand")}
            </span>
          </Link>

          {/* Desktop links */}
          <ul className={`hidden items-center gap-1 md:flex ${isBn ? "font-bn" : ""}`}>
            {links.map((l) => (
              <li key={l.to}>
                <a
                  href={l.to}
                  className="group relative rounded-full px-4 py-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  <span className="relative z-10">{l.label}</span>
                  <span className="absolute inset-0 scale-75 rounded-full bg-foreground/5 opacity-0 transition-all duration-500 ease-luxury group-hover:scale-100 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={switchLang}
              aria-label="Switch language"
              className="flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              <Languages className="size-4" />
              <span className="tracking-widest">{languageCode.toUpperCase()}</span>
            </button>
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <a
              href="/#contact"
              className="ml-1 hidden rounded-full bg-gradient-to-br from-[var(--gold)] to-[oklch(0.7_0.13_75)] px-5 py-2 text-xs font-semibold text-[var(--navy-deep)] shadow-gold transition-transform duration-500 ease-luxury hover:-translate-y-0.5 sm:inline-block"
            >
              {t("hero.ctaPrimary")}
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-9 w-9 place-items-center rounded-full text-foreground/80 md:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </header>


      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[var(--navy-deep)]/80 backdrop-blur-xl md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="ml-auto flex h-full w-[85%] max-w-sm flex-col gap-2 bg-[var(--navy-deep)] p-8 text-[oklch(0.97_0.008_90)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-lg">{t("brand")}</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu">
                  <X className="size-5" />
                </button>
              </div>
              {links.map((l, i) => (
                <motion.a
                  key={l.to}
                  href={l.to}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                  onClick={() => setOpen(false)}
                  className={`border-b border-white/10 py-4 font-display text-3xl ${isBn ? "font-bn" : ""}`}
                >
                  {l.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
