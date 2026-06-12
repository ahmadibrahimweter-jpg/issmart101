import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#";

type Props = {
  text: string;
  className?: string;
  /** ms between each letter starting to resolve */
  stagger?: number;
  /** ms each letter scrambles before locking */
  duration?: number;
  /** play once when in view */
  playOnView?: boolean;
};

export function ScrambleText({
  text,
  className,
  stagger = 55,
  duration = 700,
  playOnView = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(() =>
    text
      .split("")
      .map((c) => (c === " " || c === "\n" ? c : ""))
      .join("")
  );
  const [started, setStarted] = useState(!playOnView);

  useEffect(() => {
    if (!playOnView || started) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setStarted(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [playOnView, started]);

  useEffect(() => {
    if (!started) return;
    const chars = text.split("");
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const out: string[] = [];
      let allDone = true;
      for (let i = 0; i < chars.length; i++) {
        const final = chars[i];
        if (final === " " || final === "\n") {
          out.push(final);
          continue;
        }
        const startAt = i * stagger;
        const local = elapsed - startAt;
        if (local <= 0) {
          out.push("");
          allDone = false;
        } else if (local >= duration) {
          out.push(final);
        } else {
          allDone = false;
          out.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
        }
      }
      setDisplay(out.join(""));
      if (!allDone) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, text, stagger, duration]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display.split("\n").map((line, i, arr) => (
        <span key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </span>
      ))}
    </span>
  );
}
