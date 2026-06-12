import { createFileRoute } from "@tanstack/react-router";
import { Hero, Stats, Why, Projects, Vision, Isma, CtaContact } from "@/components/site/Sections";
import { VideoShowcase } from "@/components/site/VideoShowcase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Islamic City Builders — Where Faith Meets the Future" },
      { name: "description", content: "Bangladesh's first modern Islamic smart city. Cinematic luxury living, planned communities, smart amenities, and Islamic values — engineered with world-class precision." },
      { property: "og:title", content: "Islamic City Builders — Where Faith Meets the Future" },
      { property: "og:description", content: "Bangladesh's first modern Islamic smart city. Ethical, secure, serene urban living." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <VideoShowcase />
      <Stats />
      <Why />
      <Projects />
      <Vision />
      <Isma />
      <CtaContact />
    </>
  );
}
