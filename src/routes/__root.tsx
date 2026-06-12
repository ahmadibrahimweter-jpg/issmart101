import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import "../lib/i18n";
import { ThemeProvider } from "../components/site/ThemeProvider";
import { SmoothScroll } from "../components/site/SmoothScroll";
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";
import { ContactDialog } from "../components/site/ContactDialog";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[oklch(0.7_0.13_75)] px-6 py-2.5 text-sm font-semibold text-[var(--navy-deep)] shadow-gold"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try refreshing.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-foreground/15 px-5 py-2 text-sm">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0a1024" },
      { title: "Islamic City Builders — Where Faith Meets the Future" },
      { name: "description", content: "Bangladesh's first modern Islamic smart city. Ethical, secure, serene living engineered with world-class precision." },
      { name: "author", content: "Islamic City Builders" },
      { property: "og:site_name", content: "Islamic City Builders" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Islamic City Builders — Where Faith Meets the Future" },
      { name: "twitter:title", content: "Islamic City Builders — Where Faith Meets the Future" },
      { property: "og:description", content: "Bangladesh's first modern Islamic smart city. Ethical, secure, serene living engineered with world-class precision." },
      { name: "twitter:description", content: "Bangladesh's first modern Islamic smart city. Ethical, secure, serene living engineered with world-class precision." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ba99cb7c-f2a7-41c9-af3a-a81f59ce9947/id-preview-53fe5f2b--d26f3e49-6e94-4b53-9cad-3157142c2d2d.lovable.app-1781163713164.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ba99cb7c-f2a7-41c9-af3a-a81f59ce9947/id-preview-53fe5f2b--d26f3e49-6e94-4b53-9cad-3157142c2d2d.lovable.app-1781163713164.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SmoothScroll />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ContactDialog />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
