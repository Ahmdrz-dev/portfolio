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

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F6F3] px-4 font-display">
      <div className="max-w-md text-center">
        <div className="text-label-sm text-[#5e5e5e] uppercase tracking-widest mb-4 border-l-2 border-black pl-4 w-fit mx-auto">Error 404</div>
        <h1 className="text-7xl font-bold text-black mb-4">404</h1>
        <h2 className="text-headline-md font-semibold text-black mb-4">Page Not Found</h2>
        <p className="text-body-lg text-[#5e5e5e] mb-8">
          The structural path you are looking for doesn't exist or has been relocated.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-black px-8 py-4 text-label-sm uppercase tracking-widest text-white transition-colors hover:bg-neutral-800"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Return to Architecture
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  
  useEffect(() => {
    // Keeping the original error reporter function call intact
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F6F3] px-4 font-display">
      <div className="max-w-md text-center">
        <div className="text-label-sm text-red-600 uppercase tracking-widest mb-4 border-l-2 border-red-600 pl-4 w-fit mx-auto">System Fault</div>
        <h1 className="text-headline-md font-semibold text-black mb-4">
          Runtime Exception
        </h1>
        <p className="text-body-lg text-[#5e5e5e] mb-8">
          A structural error occurred in the application layer. The issue has been logged.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center gap-2 bg-black px-6 py-4 text-label-sm uppercase tracking-widest text-white transition-colors hover:bg-neutral-800"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            Reinitialize
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 border border-black bg-transparent px-6 py-4 text-label-sm uppercase tracking-widest text-black transition-colors hover:bg-black/5"
          >
            Go Home
          </a>
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
      
      // Updated SEO Metadata for Portfolio
      { title: "Ahmadreza Saeedi | Software Developer" },
      { name: "description", content: "Building AI Products, Digital Experiences & Scalable Web Applications. Integrating design thinking with robust software engineering." },
      { name: "author", content: "Ahmadreza Saeedi" },
      { name: "keywords", content: "Software Developer, Full Stack, React, Django, AI Integration, Web Architecture, Istanbul" },
      
      // Open Graph / Social Media
      { property: "og:title", content: "Ahmadreza Saeedi - Architectural Software Engineering" },
      { property: "og:description", content: "Designing and building modern software products with a focus on usability, performance, and long-term value." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Ahmadreza Saeedi Portfolio" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Hanken+Grotesk:wght@100..900&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
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
    <>
      <HeadContent />
      {children}
      <Scripts />
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}