import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowLeft, ArrowRight, MapPin, Calendar, Building2, Home as HomeIcon,
  Shield, Trees, Cpu, Dumbbell, BookOpen, Users, Car, Wifi, Sun, Droplet,
  School, Hospital, Store, Sparkles, Bed, Bath, Maximize, Check, Play,
  ChevronRight, Phone,
} from "lucide-react";
import { PROJECTS, projectList, type Amenity } from "@/lib/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<Amenity["icon"], React.ComponentType<{ className?: string }>> = {
  shield: Shield, trees: Trees, cpu: Cpu, dumbbell: Dumbbell, book: BookOpen,
  home: HomeIcon, users: Users, mosque: BookOpen, car: Car, wifi: Wifi,
  sun: Sun, droplet: Droplet, school: School, hospital: Hospital, store: Store,
};

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = PROJECTS[params.slug];
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return { meta: [{ title: "Project — Islamic City Builders" }] };
    return {
      meta: [
        { title: `${p.name} — Islamic City Builders` },
        { name: "description", content: p.tagline },
        { property: "og:title", content: p.name },
        { property: "og:description", content: p.tagline },
        { property: "og:image", content: p.cover },
      ],
    };
  },
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="font-display text-5xl">Project not found</h1>
        <Link to="/" className="mt-6 inline-block text-[var(--gold)] underline">Back home</Link>
      </div>
    </div>
  ),
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  return (
    <div className="bg-background text-foreground">
      <Hero project={project} />
      <QuickStats project={project} />
      <Overview project={project} />
      <Gallery project={project} />
      <VideoSection project={project} />
      <Amenities project={project} />
      <Floorplans project={project} />
      <Timeline project={project} />
      <LocationMap project={project} />
      <Specs project={project} />
      <RelatedProjects currentSlug={project.slug} />
      <CTASection project={project} />
    </div>
  );
}

/* ============== HERO ============== */
function Hero({ project }: { project: typeof projectList[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[var(--navy-deep)] text-white">
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        <img src={project.cover} alt={project.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)] via-[var(--navy-deep)]/50 to-[var(--navy-deep)]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-deep)]/70 via-transparent to-transparent" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}
        >
          <Link to="/" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-white/70 transition hover:text-[var(--gold)]">
            <ArrowLeft className="size-4" /> Back to all projects
          </Link>
        </motion.div>

        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-[var(--gold)] backdrop-blur-md"
          >
            <Sparkles className="size-3" /> {project.code} · {project.status}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
            className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight"
          >
            {project.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
            className="mt-6 max-w-2xl text-lg text-white/75 sm:text-xl"
          >
            {project.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[var(--gold)] to-[oklch(0.7_0.13_75)] px-7 py-3.5 text-sm font-semibold text-[var(--navy-deep)] shadow-[0_20px_60px_-15px_oklch(0.82_0.14_82/0.7)] transition hover:scale-[1.02]"
            >
              Book a Site Visit
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#video"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
            >
              <Play className="size-4 text-[var(--gold)]" /> Watch Walkthrough
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1, ease: EASE }}
            className="mt-12 flex items-center gap-2 text-sm text-white/70"
          >
            <MapPin className="size-4 text-[var(--gold)]" /> {project.location}
          </motion.div>
        </div>

        <div className="hidden text-xs uppercase tracking-[0.25em] text-white/40 md:block">Scroll to explore ↓</div>
      </motion.div>
    </section>
  );
}

/* ============== QUICK STATS ============== */
function QuickStats({ project }: { project: typeof projectList[number] }) {
  const stats = [
    { icon: Building2, label: "Buildings", value: project.totalBuildings },
    { icon: HomeIcon, label: "Total Units", value: project.totalUnits },
    { icon: MapPin, label: "Land Area", value: project.area },
    { icon: Calendar, label: "Handover", value: project.handover },
  ];
  return (
    <section className="border-y border-foreground/10 bg-[var(--navy-deep)] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            className="flex flex-col items-center justify-center gap-2 px-6 py-10"
          >
            <s.icon className="size-5 text-[var(--gold)]" />
            <div className="font-display text-2xl sm:text-3xl">{s.value}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============== OVERVIEW ============== */
function Overview({ project }: { project: typeof projectList[number] }) {
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="lg:col-span-5"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">Overview</div>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">
            A city designed around faith and family.
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="lg:col-span-7"
        >
          <p className="text-lg leading-relaxed text-foreground/75">{project.overview}</p>
          <ul className="mt-10 space-y-4">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 border-b border-foreground/10 pb-4">
                <Check className="mt-0.5 size-5 shrink-0 text-[var(--gold)]" />
                <span className="text-base text-foreground/80">{h}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

/* ============== GALLERY ============== */
function Gallery({ project }: { project: typeof projectList[number] }) {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-[var(--navy-deep)] py-28 text-white sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">Gallery</div>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">Inside {project.code}</h2>
          </div>
          <div className="text-sm text-white/50">{active + 1} / {project.gallery.length}</div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-12">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: EASE }}
            className="relative aspect-[16/10] overflow-hidden rounded-3xl md:col-span-9"
          >
            <img src={project.gallery[active]} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>
          <div className="grid grid-cols-3 gap-3 md:col-span-3 md:grid-cols-1">
            {project.gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative aspect-[4/3] overflow-hidden rounded-xl transition ${
                  i === active ? "ring-2 ring-[var(--gold)]" : "opacity-60 hover:opacity-100"
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== VIDEO ============== */
function VideoSection({ project }: { project: typeof projectList[number] }) {
  return (
    <section id="video" className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">Cinematic Walkthrough</div>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">A two-minute look inside</h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE }}
          className="relative mx-auto mt-14 overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-black shadow-2xl"
        >
          <div className="relative aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${project.videoId}?rel=0&modestbranding=1&playsinline=1`}
              title={project.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============== AMENITIES ============== */
function Amenities({ project }: { project: typeof projectList[number] }) {
  return (
    <section className="bg-[var(--navy-deep)] py-28 text-white sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">Amenities</div>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">
            Every detail, thoughtfully placed.
          </h2>
          <p className="mt-4 max-w-2xl text-white/65">
            From the mihrab of the central mosque to the rooftop gardens, every amenity is engineered around the rhythms of an Islamic life.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.amenities.map((a, i) => {
            const Icon = ICONS[a.icon] ?? Sparkles;
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 6) * 0.06, ease: EASE }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[var(--gold)]/40 hover:bg-white/[0.05]"
              >
                <div className="absolute -right-12 -top-12 size-32 rounded-full bg-[var(--gold)]/10 blur-2xl transition group-hover:bg-[var(--gold)]/20" />
                <Icon className="relative size-7 text-[var(--gold)]" />
                <h3 className="relative mt-4 font-display text-xl">{a.title}</h3>
                <p className="relative mt-2 text-sm text-white/65">{a.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============== FLOORPLANS ============== */
function Floorplans({ project }: { project: typeof projectList[number] }) {
  const [idx, setIdx] = useState(0);
  const fp = project.floorplans[idx];
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">Residences</div>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">Choose your home</h2>
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {project.floorplans.map((f, i) => (
            <button
              key={f.type}
              onClick={() => setIdx(i)}
              className={`rounded-full border px-5 py-2 text-sm transition ${
                i === idx
                  ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]"
                  : "border-foreground/15 text-foreground/70 hover:border-foreground/40"
              }`}
            >
              {f.type}
            </button>
          ))}
        </div>

        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}
          className="mt-10 grid gap-10 rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 md:grid-cols-12 md:p-12"
        >
          <div className="md:col-span-7">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <Maximize className="size-5 text-[var(--gold)]" />
                <div className="mt-2 font-display text-2xl">{fp.size}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-foreground/50">Area</div>
              </div>
              <div>
                <Bed className="size-5 text-[var(--gold)]" />
                <div className="mt-2 font-display text-2xl">{fp.beds}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-foreground/50">Bedrooms</div>
              </div>
              <div>
                <Bath className="size-5 text-[var(--gold)]" />
                <div className="mt-2 font-display text-2xl">{fp.baths}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-foreground/50">Baths</div>
              </div>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {fp.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2 text-sm text-foreground/75">
                  <Check className="mt-0.5 size-4 shrink-0 text-[var(--gold)]" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-[var(--gold)]/30 bg-gradient-to-br from-[var(--gold)]/10 to-transparent p-6 md:col-span-5">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-foreground/60">Starting at</div>
              <div className="mt-2 font-display text-4xl text-[var(--gold)]">{fp.price}</div>
              <p className="mt-3 text-sm text-foreground/65">
                Early-booking pricing. Includes smart-home package and parking allocation.
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex items-center justify-between gap-2 rounded-full bg-[var(--navy-deep)] px-6 py-3 text-sm font-semibold text-white transition hover:gap-3"
            >
              Reserve this unit <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============== TIMELINE ============== */
function Timeline({ project }: { project: typeof projectList[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section ref={ref} className="bg-[var(--navy-deep)] py-28 text-white sm:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">Construction Timeline</div>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">From land to handover</h2>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 h-full w-px bg-white/15 md:left-1/2" />
          <motion.div
            initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}} transition={{ duration: 2, ease: EASE }}
            style={{ transformOrigin: "top" }}
            className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[var(--gold)] via-[var(--gold)]/40 to-transparent md:left-1/2"
          />

          {project.milestones.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
              className={`relative mb-12 grid grid-cols-[2rem_1fr] gap-4 md:grid-cols-2 md:gap-12 ${
                i % 2 === 0 ? "md:[&>div:first-child]:order-2 md:[&>div:first-child]:text-left md:[&>div:last-child]:text-right" : ""
              }`}
            >
              <span
                className={`absolute left-4 top-2 -translate-x-1/2 rounded-full border-2 md:left-1/2 ${
                  m.done ? "border-[var(--gold)] bg-[var(--gold)]" : "border-[var(--gold)]/60 bg-[var(--navy-deep)]"
                } size-4`}
              />
              <div className="pl-6 md:pl-0">
                <div className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">{m.date}</div>
                <h3 className="mt-1 font-display text-2xl">{m.title}</h3>
                <p className="mt-2 text-sm text-white/65">{m.body}</p>
              </div>
              <div />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== LOCATION MAP ============== */
function LocationMap({ project }: { project: typeof projectList[number] }) {
  const { lat, lng, zoom = 14 } = project.coords;
  const delta = 0.04;
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">Location</div>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">Find us here</h2>
            <p className="mt-4 text-foreground/70">{project.location}</p>
            <div className="mt-8 space-y-4">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.mapQuery)}`}
                target="_blank" rel="noreferrer"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4 transition hover:border-[var(--gold)]/40"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="size-5 text-[var(--gold)]" />
                  <span className="text-sm font-medium">Open in Google Maps</span>
                </div>
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4 transition hover:border-[var(--gold)]/40"
              >
                <div className="flex items-center gap-3">
                  <Phone className="size-5 text-[var(--gold)]" />
                  <span className="text-sm font-medium">Schedule a site visit</span>
                </div>
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="overflow-hidden rounded-3xl border border-foreground/10 shadow-xl lg:col-span-8"
          >
            <div className="relative aspect-[16/10] w-full bg-foreground/5">
              <iframe
                title={`Map of ${project.name}`}
                src={src}
                loading="lazy"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============== SPECS ============== */
function Specs({ project }: { project: typeof projectList[number] }) {
  return (
    <section className="bg-foreground/[0.02] py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">Specifications</div>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">The numbers</h2>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
          {project.specs.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="bg-background p-6"
            >
              <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">{s.label}</div>
              <div className="mt-2 font-display text-2xl">{s.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== RELATED ============== */
function RelatedProjects({ currentSlug }: { currentSlug: string }) {
  const others = projectList.filter((p) => p.slug !== currentSlug);
  if (!others.length) return null;
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">More Projects</div>
        <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">Explore the portfolio</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {others.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group relative block overflow-hidden rounded-3xl border border-foreground/10"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.cover} alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-[1500ms] ease-luxury group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)] via-[var(--navy-deep)]/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">{p.code} · {p.status}</div>
                <h3 className="mt-2 font-display text-2xl">{p.name}</h3>
                <div className="mt-3 inline-flex items-center gap-2 text-sm text-white/80 transition group-hover:gap-3 group-hover:text-[var(--gold)]">
                  View details <ArrowRight className="size-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== CTA ============== */
function CTASection({ project }: { project: typeof projectList[number] }) {
  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--navy-deep)] py-28 text-white sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 30%, oklch(0.82 0.14 82 / 0.4), transparent 60%), radial-gradient(50% 40% at 80% 70%, oklch(0.55 0.18 265 / 0.4), transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">Limited Early Booking</div>
        <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02]">
          Reserve at {project.startingPrice}
        </h2>
        <p className="mt-6 text-lg text-white/70">
          Speak with our investment relations team. Site visits, payment plans, and unit selection — all in one consultation.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[var(--gold)] to-[oklch(0.7_0.13_75)] px-8 py-4 text-sm font-semibold text-[var(--navy-deep)] shadow-[0_20px_60px_-15px_oklch(0.82_0.14_82/0.7)] transition hover:scale-[1.02]"
          >
            Book a Free Consultation
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
