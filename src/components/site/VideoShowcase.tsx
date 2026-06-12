import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Play, Sparkles } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Word-by-word masked reveal */
function RevealWords({
  text,
  className = "",
  delay = 0,
  inView,
}: {
  text: string;
  className?: string;
  delay?: number;
  inView: boolean;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.08 }}
            className="inline-block will-change-transform"
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function VideoShowcase() {
  const { i18n } = useTranslation();
  const isBn = i18n.language === "bn";
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(contentRef, { once: true, margin: "-12%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth springs — luxurious feel
  const spring = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.5 });

  // Independent parallax tracks — bigger ranges, GPU only
  const bgY = useTransform(spring, [0, 1], ["-30%", "30%"]);
  const bgRotate = useTransform(spring, [0, 1], [-12, 12]);
  const bgScale = useTransform(spring, [0, 0.5, 1], [1.1, 1.25, 1.1]);
  const gradShift = useTransform(spring, [0, 1], ["0%", "100%"]);
  const orbY = useTransform(spring, [0, 1], ["25%", "-65%"]);
  const orb2Y = useTransform(spring, [0, 1], ["-30%", "40%"]);
  const frameY = useTransform(spring, [0, 1], ["14%", "-14%"]);
  const frameScale = useTransform(spring, [0, 0.5, 1], [0.86, 1, 1.06]);
  const captionY = useTransform(spring, [0, 1], ["80%", "-80%"]);
  const progress = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);
  const gridY = useTransform(spring, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={sectionRef}
      aria-label="Cinematic showcase film"
      className="relative isolate overflow-hidden bg-[var(--navy-deep)] py-32 text-white sm:py-44"
    >
      {/* Animated gradient — moves independently, rotates, sweeps */}
      <motion.div
        aria-hidden
        style={{ y: bgY, rotate: bgRotate, scale: bgScale, backgroundPosition: gradShift }}
        className="pointer-events-none absolute inset-x-[-15%] inset-y-[-30%] -z-10 will-change-transform"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 25% 25%, oklch(0.82 0.14 82 / 0.35), transparent 60%), radial-gradient(55% 45% at 80% 70%, oklch(0.55 0.18 265 / 0.45), transparent 65%), conic-gradient(from 90deg at 50% 50%, oklch(0.09 0.035 265), oklch(0.14 0.06 265), oklch(0.09 0.035 265))",
          }}
        />
      </motion.div>

      {/* Subtle moving grid */}
      <motion.div
        aria-hidden
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] will-change-transform"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* Two orbs on opposing tracks */}
      <motion.div
        aria-hidden
        style={{ y: orbY }}
        className="pointer-events-none absolute right-[-15%] top-1/4 -z-10 h-[60vw] w-[60vw] max-h-[800px] max-w-[800px] rounded-full bg-[var(--gold)]/15 blur-[160px] will-change-transform"
      />
      <motion.div
        aria-hidden
        style={{ y: orb2Y }}
        className="pointer-events-none absolute left-[-20%] bottom-0 -z-10 h-[55vw] w-[55vw] max-h-[700px] max-w-[700px] rounded-full bg-[oklch(0.55_0.18_265)]/20 blur-[180px] will-change-transform"
      />

      <div ref={contentRef} className="relative mx-auto max-w-7xl px-6">
        {/* Eyebrow */}
        <div className="flex items-center justify-center overflow-hidden">
          <motion.span
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
            className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-white/80 backdrop-blur-md will-change-transform ${
              isBn ? "font-bn tracking-normal text-xs" : ""
            }`}
          >
            <Sparkles className="size-3 text-[var(--gold)]" />
            Cinematic Film
          </motion.span>
        </div>

        {/* Title — word-by-word mask reveal */}
        <h2
          className={`mx-auto mt-7 max-w-4xl text-center font-display text-[clamp(2.25rem,5.5vw,5rem)] leading-[1.02] tracking-tight ${
            isBn ? "font-bn leading-[1.2]" : ""
          }`}
        >
          <RevealWords
            text="Step inside the"
            inView={inView}
            delay={0.15}
            className="text-gradient-light"
          />
          <RevealWords
            text="vision"
            inView={inView}
            delay={0.55}
            className="italic text-gradient-gold"
          />
        </h2>

        {/* Subtitle */}
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
            animate={inView ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.1, ease: EASE, delay: 0.85 }}
            className={`mx-auto mt-6 max-w-2xl text-center text-base text-white/65 sm:text-lg ${
              isBn ? "font-bn" : ""
            }`}
          >
            A two-minute walkthrough of Bangladesh's first modern Islamic smart city —
            architecture, community, and serenity at golden hour.
          </motion.p>
        </div>

        {/* Video frame — parallax, scale + 3D tilt entrance + rotating conic border */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.92, rotateX: 8 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
          transition={{ duration: 1.4, ease: EASE, delay: 1 }}
          style={{ y: frameY, scale: frameScale, perspective: 1200 }}
          className="relative mx-auto mt-16 w-full max-w-6xl will-change-transform"
        >
          {/* Halo */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10 -z-10 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,oklch(0.82_0.14_82/0.35),transparent_70%)] blur-3xl"
          />

          {/* Rotating conic border */}
          <div className="relative rounded-[1.85rem] p-[1.5px]">
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 18, ease: "linear", repeat: Infinity }}
              className="absolute inset-0 rounded-[1.85rem] will-change-transform"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, oklch(0.82 0.14 82 / 0.85) 60deg, transparent 120deg, transparent 240deg, oklch(0.82 0.14 82 / 0.6) 300deg, transparent 360deg)",
              }}
            />
            <div className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/60 shadow-[0_60px_180px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm">
              <div className="relative aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/TVypbh3u6lQ?rel=0&modestbranding=1&playsinline=1"
                  title="Islamic City Builders — Cinematic Showcase"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              {/* Sweep shine on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-[1400ms] ease-luxury group-hover:translate-x-full"
              />
              {/* Corner ticks */}
              <span className="pointer-events-none absolute left-4 top-4 size-7 border-l-2 border-t-2 border-[var(--gold)]/80" />
              <span className="pointer-events-none absolute right-4 top-4 size-7 border-r-2 border-t-2 border-[var(--gold)]/80" />
              <span className="pointer-events-none absolute bottom-4 left-4 size-7 border-b-2 border-l-2 border-[var(--gold)]/80" />
              <span className="pointer-events-none absolute bottom-4 right-4 size-7 border-b-2 border-r-2 border-[var(--gold)]/80" />
            </div>
          </div>

          {/* Caption + scroll progress */}
          <motion.div
            style={{ y: captionY }}
            className="mt-8 flex flex-wrap items-center justify-between gap-4 px-2 text-xs uppercase tracking-[0.25em] text-white/50 font-sans font-bold will-change-transform"
          >
            <span className="inline-flex items-center gap-2">
              <Play className="size-3 text-[var(--gold)]" />
              4K · DETAILED VIDEO
            </span>
            <div className="relative h-px flex-1 max-w-[40%] overflow-hidden rounded-full bg-white/10">
              <motion.div
                style={{ width: progress }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--gold)] to-[oklch(0.7_0.13_75)]"
              />
            </div>
            <span>02:14 · Official Film</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
