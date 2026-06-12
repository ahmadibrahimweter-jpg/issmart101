import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, animate } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight, ArrowDown, Sparkles, Shield, Trees, Cpu, Dumbbell,
  BookOpen, Home, Users, MapPin, ChevronRight,
} from "lucide-react";
import heroImg from "@/assets/hero-city.jpg";
import { ScrambleText } from "@/components/site/ScrambleText";
import piscImg from "@/assets/project-pisc.jpg";
import mriscImg from "@/assets/project-mrisc.jpg";
import patternImg from "@/assets/pattern-geo.png";

/* ---------- shared reveal ---------- */
function Reveal({ children, delay = 0, y = 40 }: { children: ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* =================================================================
   HERO
================================================================= */
export function Hero() {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[720px] w-full overflow-hidden bg-[var(--navy-deep)] text-white">
      {/* Parallax image */}
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        <img
          src={heroImg}
          alt="Islamic Smart City aerial render at golden hour"
          width={1920}
          height={1280}
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </motion.div>
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy-deep)]/30 via-[var(--navy-deep)]/40 to-[var(--navy-deep)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,oklch(0.09_0.035_265)_85%)]" />
      {/* Floating gold orb */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/3 -z-0 h-[40vw] w-[40vw] -translate-x-1/2 rounded-full bg-[var(--gold)]/15 blur-[120px] animate-float-slow"
      />
      {/* Pattern */}
      <img
        src={patternImg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-20 h-[60vh] w-[60vh] opacity-[0.08] animate-float-slow"
      />

      <motion.div style={{ y: yText, opacity }} className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-28 sm:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className={`mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-white/80 backdrop-blur-md ${isBn ? "font-bn tracking-normal text-xs" : ""}`}
        >
          <Sparkles className="size-3 text-[var(--gold)]" />
          {t("hero.eyebrow")}
        </motion.div>

        <h1 className={`max-w-5xl font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tight ${isBn ? "font-bn leading-[1.15]" : ""}`}>
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="block text-gradient-light"
          >
            {t("hero.title1")}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="block italic text-gradient-gold"
          >
            {t("hero.title2")}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75 }}
          className={`mt-8 max-w-xl text-base text-white/70 sm:text-lg ${isBn ? "font-bn" : ""}`}
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#contact"
            className={`group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[var(--gold)] to-[oklch(0.7_0.13_75)] px-7 py-3.5 text-sm font-semibold text-[var(--navy-deep)] shadow-gold transition-transform duration-500 ease-luxury hover:-translate-y-0.5 ${isBn ? "font-bn" : ""}`}
          >
            {t("hero.ctaPrimary")}
            <ArrowRight className="size-4 transition-transform duration-500 ease-luxury group-hover:translate-x-1" />
          </a>
          <a
            href="#projects"
            className={`group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-500 ease-luxury hover:border-white/40 hover:bg-white/10 ${isBn ? "font-bn" : ""}`}
          >
            {t("hero.ctaSecondary")}
            <ChevronRight className="size-4 transition-transform duration-500 ease-luxury group-hover:translate-x-1" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/50"
      >
        <span className={isBn ? "font-bn tracking-normal" : ""}>{t("hero.scroll")}</span>
        <ArrowDown className="size-4 animate-scroll-pulse" />
      </motion.div>
    </section>
  );
}

/* =================================================================
   STATS — counters strip
================================================================= */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString()),
    });
    return controls.stop;
  }, [inView, to, mv]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.85, filter: "blur(12px)" }}
      animate={inView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="font-display text-5xl text-gradient-gold sm:text-7xl tabular-nums will-change-transform"
    >
      {display}
      {suffix}
    </motion.span>
  );
}

export function Stats() {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";
  const items = [
    { n: 2, s: "+", label: t("stats.projects") },
    { n: 2360, s: "+", label: t("stats.flats") },
    { n: 40, s: "+", label: t("stats.features") },
    { n: 10, s: "", label: t("stats.partners") },
  ];
  return (
    <section className="relative border-y border-foreground/5 bg-background py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-12 px-6 md:grid-cols-4">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-2"
          >
            <Counter to={it.n} suffix={it.s} />
            <span className={`text-xs uppercase tracking-[0.2em] text-muted-foreground ${isBn ? "font-bn tracking-normal" : ""}`}>
              {it.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* =================================================================
   WHY — feature grid
================================================================= */
const ICONS = [Home, Cpu, Shield, Sparkles, Dumbbell, BookOpen, Trees, Users];

export function Why() {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";
  const items = t("why.items", { returnObjects: true }) as Array<{ t: string; d: string }>;

  return (
    <section id="vision" className="relative overflow-hidden bg-background py-32">
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[var(--gold)]/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className={`mb-3 text-xs uppercase tracking-[0.25em] text-[var(--gold)] ${isBn ? "font-bn tracking-normal" : ""}`}>
            {t("why.eyebrow")}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className={`max-w-4xl whitespace-pre-line font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight ${isBn ? "font-bn leading-[1.25]" : ""}`}>
            {t("why.title")}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className={`mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg ${isBn ? "font-bn" : ""}`}>
            {t("why.body")}
          </p>
        </Reveal>

        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={it.t} delay={i * 0.05} y={20}>
                <div className="group relative h-full overflow-hidden bg-background p-8 transition-all duration-700 ease-luxury hover:bg-foreground/[0.02]">
                  <Icon className="size-7 text-[var(--gold)] transition-transform duration-700 ease-luxury group-hover:-translate-y-1 group-hover:scale-110" strokeWidth={1.5} />
                  <h3 className={`mt-6 font-display text-xl leading-tight ${isBn ? "font-bn" : ""}`}>{it.t}</h3>
                  <p className={`mt-2 text-sm text-muted-foreground ${isBn ? "font-bn" : ""}`}>{it.d}</p>
                  <span className="absolute inset-x-8 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent transition-transform duration-700 ease-luxury group-hover:scale-x-100" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   PROJECTS — cinematic cards
================================================================= */
type ProjKey = "pisc" | "mrisc";
const PROJECT_IMAGES: Record<ProjKey, string> = { pisc: piscImg, mrisc: mriscImg };

export function Projects() {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";
  const keys: ProjKey[] = ["pisc", "mrisc"];

  return (
    <section id="projects" className="relative bg-[var(--navy-deep)] py-32 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className={`mb-3 text-xs uppercase tracking-[0.25em] text-[var(--gold)] ${isBn ? "font-bn tracking-normal" : ""}`}>
            {t("projects.eyebrow")}
          </div>
        </Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal delay={0.1}>
            <h2 className={`max-w-3xl font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] ${isBn ? "font-bn leading-[1.2]" : ""}`}>
              {t("projects.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={`max-w-md text-base text-white/60 ${isBn ? "font-bn" : ""}`}>
              {t("projects.body")}
            </p>
          </Reveal>
        </div>

        <div className="mt-20 space-y-10">
          {keys.map((k, idx) => {
            const item = t(`projects.items.${k}`, { returnObjects: true }) as { tag: string; name: string; location: string; specs: string[] };
            return <ProjectCard key={k} k={k} item={item} reverse={idx % 2 === 1} viewLabel={t("projects.view")} isBn={isBn} />;
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  k, item, reverse, viewLabel, isBn,
}: {
  k: ProjKey;
  item: { tag: string; name: string; location: string; specs: string[] };
  reverse: boolean;
  viewLabel: string;
  isBn: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <Reveal>
      <div ref={ref} className={`group grid items-center gap-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-3 backdrop-blur-sm md:grid-cols-12 ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl md:col-span-7">
          <motion.img
            src={PROJECT_IMAGES[k]}
            alt={item.name}
            width={1536}
            height={1024}
            loading="lazy"
            style={{ y }}
            className="absolute inset-0 h-[120%] w-full object-cover transition-transform duration-[1500ms] ease-luxury group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--navy-deep)]/60 via-transparent to-transparent" />
          <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
            {item.tag}
          </span>
        </div>

        <div className="p-6 md:col-span-5 md:p-8">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <MapPin className="size-4 text-[var(--gold)]" />
            <span className={isBn ? "font-bn" : ""}>{item.location}</span>
          </div>
          <h3 className={`mt-3 font-display text-3xl leading-tight sm:text-4xl ${isBn ? "font-bn leading-[1.2]" : ""}`}>
            {item.name}
          </h3>
          <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {item.specs.slice(0, 8).map((s) => (
              <li key={s} className={`flex items-start gap-2 text-sm text-white/70 ${isBn ? "font-bn" : ""}`}>
                <span className="mt-1.5 inline-block size-1 shrink-0 rounded-full bg-[var(--gold)]" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/projects/$slug"
            params={{ slug: k }}
            className={`mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--gold)] transition-all duration-500 ease-luxury hover:gap-3 ${isBn ? "font-bn" : ""}`}
          >
            {viewLabel}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

/* =================================================================
   VISION — split with sticky image
================================================================= */
export function Vision() {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";
  const points = t("vision.points", { returnObjects: true }) as string[];

  return (
    <section className="relative bg-background py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <div className={`mb-3 text-xs uppercase tracking-[0.25em] text-[var(--gold)] ${isBn ? "font-bn tracking-normal" : ""}`}>
                {t("vision.eyebrow")}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className={`font-sans font-bold uppercase text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.1] tracking-[-0.01em] ${isBn ? "font-bn leading-[1.25]" : ""}`}>
                {isBn ? (
                  t("vision.title")
                ) : (
                  <ScrambleText
                    text={t("vision.title")}
                    stagger={45}
                    duration={650}
                  />
                )}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className={`mt-6 text-base text-muted-foreground ${isBn ? "font-bn" : ""}`}>{t("vision.body")}</p>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-7">
          <ul className="space-y-3">
            {points.map((p, i) => (
              <Reveal key={p} delay={i * 0.06} y={20}>
                <li className="group flex items-center gap-6 border-b border-foreground/10 py-6">
                  <span className="font-display text-2xl text-[var(--gold)] tabular-nums">
                    0{i + 1}
                  </span>
                  <span className={`flex-1 font-display text-2xl leading-tight transition-transform duration-500 ease-luxury group-hover:translate-x-2 sm:text-3xl ${isBn ? "font-bn leading-[1.3]" : ""}`}>
                    {p}
                  </span>
                  <ArrowRight className="size-5 text-foreground/30 transition-all duration-500 ease-luxury group-hover:translate-x-1 group-hover:text-[var(--gold)]" />
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   ISMA — marquee + grid
================================================================= */
export function Isma() {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";
  const brands = t("isma.brands", { returnObjects: true }) as string[];

  return (
    <section id="isma" className="relative overflow-hidden bg-[var(--navy-deep)] py-32 text-white">
      <img src={patternImg} alt="" aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 h-[60vh] w-[60vh] opacity-[0.06]" />

      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className={`mb-3 text-xs uppercase tracking-[0.25em] text-[var(--gold)] ${isBn ? "font-bn tracking-normal" : ""}`}>
            {t("isma.eyebrow")}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className={`max-w-4xl font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] ${isBn ? "font-bn leading-[1.2]" : ""}`}>
            {t("isma.title")}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className={`mt-6 max-w-2xl text-base text-white/60 sm:text-lg ${isBn ? "font-bn" : ""}`}>
            {t("isma.body")}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-3 md:grid-cols-5">
          {brands.map((b, i) => (
            <Reveal key={b} delay={i * 0.04} y={20}>
              <div className="group relative flex h-32 items-center justify-center bg-[var(--navy-deep)] p-5 text-center transition-colors duration-500 hover:bg-white/[0.03]">
                <span className="absolute left-3 top-3 font-mono text-[10px] text-white/30">
                  0{i + 1}
                </span>
                <span className={`font-display text-lg text-white/90 transition-colors duration-500 group-hover:text-[var(--gold)] ${isBn ? "font-bn" : ""}`}>
                  {b}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   CTA + CONTACT
================================================================= */
export function CtaContact() {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";

  return (
    <section id="contact" className="relative overflow-hidden bg-background py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0">
        <div className="mx-auto h-[400px] max-w-5xl bg-[radial-gradient(ellipse_at_center,oklch(0.82_0.14_82/0.18),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <div className={`mb-4 inline-block rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[var(--gold)] ${isBn ? "font-bn tracking-normal" : ""}`}>
            {t("cta.eyebrow")}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className={`font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1] tracking-tight ${isBn ? "font-bn leading-[1.2]" : ""}`}>
            <span className="text-gradient-gold italic">{t("cta.title")}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className={`mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg ${isBn ? "font-bn" : ""}`}>
            {t("cta.body")}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/8801720614871?text=Free%20consultation"
              className={`group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[var(--gold)] to-[oklch(0.7_0.13_75)] px-8 py-4 text-sm font-semibold text-[var(--navy-deep)] shadow-gold transition-transform duration-500 ease-luxury hover:-translate-y-0.5 ${isBn ? "font-bn" : ""}`}
            >
              {t("cta.primary")}
              <ArrowRight className="size-4 transition-transform duration-500 ease-luxury group-hover:translate-x-1" />
            </a>
            <a
              href="https://wa.me/8801720614871?text=Brochure%20request"
              className={`inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.03] px-8 py-4 text-sm font-medium transition-all duration-500 ease-luxury hover:border-foreground/30 hover:bg-foreground/[0.06] ${isBn ? "font-bn" : ""}`}
            >
              {t("cta.secondary")}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mx-auto mt-16 grid max-w-2xl gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/10 sm:grid-cols-3">
            {[
              { l: "Phone", v: "+880 1720 614871", h: "tel:+8801720614871" },
              { l: "WhatsApp", v: "01720614871", h: "https://wa.me/8801720614871" },
              { l: "Website", v: "issmartcity.com", h: "https://www.issmartcity.com" },
            ].map((c) => (
              <a
                key={c.l}
                href={c.h}
                className="group bg-background p-6 text-left transition-colors duration-500 hover:bg-foreground/[0.02]"
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{c.l}</div>
                <div className="mt-2 font-display text-lg transition-colors duration-500 group-hover:text-[var(--gold)]">{c.v}</div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
