import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Globe } from "lucide-react";

export function Footer() {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[var(--navy-deep)] text-[oklch(0.97_0.008_90)]">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[var(--gold)]/15 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[oklch(0.4_0.15_265)]/30 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid gap-12 md:grid-cols-12"
        >
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[oklch(0.6_0.12_75)] font-display text-lg font-bold text-[var(--navy-deep)]">
                IC
              </span>
              <span className={`text-lg font-medium ${isBn ? "font-bn" : ""}`}>{t("brand")}</span>
            </div>
            <p className={`mt-5 max-w-sm text-balance text-base text-white/60 ${isBn ? "font-bn" : ""}`}>
              {t("footer.tagline")}
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">Contact</div>
            <ul className="space-y-3 text-sm">
              <li><a href="tel:+8801720614871" className="group inline-flex items-center gap-2 text-white/80 hover:text-[var(--gold)]"><Phone className="size-4" />+880 1720 614871</a></li>
              <li><a href="https://wa.me/8801720614871" className="group inline-flex items-center gap-2 text-white/80 hover:text-[var(--gold)]"><MessageCircle className="size-4" />WhatsApp</a></li>
              <li><a href="https://www.issmartcity.com" className="group inline-flex items-center gap-2 text-white/80 hover:text-[var(--gold)]"><Globe className="size-4" />issmartcity.com</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">Explore</div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {["home", "projects", "gallery", "videos", "smart", "isma", "about", "contact"].map((k) => (
                <li key={k}>
                  <a href={`/#${k}`} className={`text-white/70 hover:text-[var(--gold)] ${isBn ? "font-bn" : ""}`}>
                    {t(`nav.${k}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Islamic City Builders. {t("footer.rights")}</span>
          <span className="tracking-[0.2em]">Built by Ibrahim</span>
        </div>
      </div>
    </footer>
  );
}
