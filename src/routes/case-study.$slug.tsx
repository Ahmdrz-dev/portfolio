import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // <-- Added import
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import {
  CASE_STUDIES,
  type CaseStudy,
  type CaseStudySlug,
  getAdjacent,
} from "../lib/case-studies";

export const Route = createFileRoute("/case-study/$slug")({
  head: ({ params }) => {
    // Note: SEO meta tags are harder to translate dynamically on the server/build step,
    // so leaving them basic here is standard practice unless using a full SSR framework.
    const study = CASE_STUDIES[params.slug as CaseStudySlug];
    const title = study
      ? `${study.title} | Ahmadreza Saeedi`
      : "Case Study | Ahmadreza Saeedi";
    return {
      meta: [
        { title },
        { property: "og:title", content: title },
        ...(study?.image ? [{ property: "og:image", content: study.image }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const study = CASE_STUDIES[params.slug as CaseStudySlug];
    if (!study) throw notFound();
    return { study };
  },
  component: CaseStudyPage,
  notFoundComponent: () => {
    // Can't easily use hooks in a standalone route option, so we keep this basic or create a separate component
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F6F3] px-5">
        <div className="text-center">
          <h1 className="font-display text-display-lg mb-6">Case study not found</h1>
          <Link to="/" className="text-label-sm uppercase tracking-widest underline">Back to portfolio</Link>
        </div>
      </div>
    );
  },
});

function CaseStudyPage() {
  const { study } = Route.useLoaderData();
  const { prev, next } = getAdjacent(study.slug);
  const { t } = useTranslation(); // <-- Initialize translation hook

  useEffect(() => {
    window.scrollTo(0, 0);
    const reveals = document.querySelectorAll(".reveal-up");
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("active");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [study.slug]);

  return (
    <div className="font-body text-body-md bg-[#F7F6F3] text-[#1b1c1a] min-h-screen">
      {/* Top bar */}
      {/* Top bar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#F7F6F3]/95 backdrop-blur border-b border-[#c4c7c7]/60">
        <nav className="flex justify-between items-center px-5 md:px-16 py-6 max-w-[1280px] mx-auto">
          <Link to="/" className="font-display text-headline-md font-medium text-black">
            Ahmadreza Saeedi
          </Link>
          
          {/* New Flex Container for Switcher & Back Button */}
          <div className="flex items-center gap-6 md:gap-10">
            <LanguageSwitcher />
            
            <Link
              to="/"
              className="nav-link text-label-sm uppercase tracking-widest text-[#5e5e5e] hover:text-black inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              <span className="hidden sm:inline-block">{t("caseStudy.backToPortfolio")}</span>
            </Link>
          </div>
          
        </nav>
      </header>
      <main className="pt-32">
        <HeroSection study={study} />
        <OverviewSection study={study} />
        {study.flagship && <ShowcaseVideo study={study} />}
        <FeaturesSection study={study} />
        <TechSection study={study} />
        <ChallengesSection study={study} />
        <ResultsSection study={study} />
        <CaseStudyNav prev={prev} next={next} />
      </main>

      <footer className="border-t border-[#c4c7c7] px-5 md:px-16 py-12">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between gap-4 text-label-sm uppercase tracking-widest text-[#5e5e5e]">
          <span>{t("footer.copyright")}</span>
          <Link to="/" className="hover:text-black">{t("caseStudy.returnToPortfolio")}</Link>
        </div>
      </footer>
    </div>
  );
}

function HeroSection({ study }: { study: CaseStudy }) {
  const { t } = useTranslation();
  return (
    <section className="px-5 md:px-16 max-w-[1280px] mx-auto pb-20 md:pb-28 reveal-up">
      <div className="grid grid-cols-12 gap-6 items-end mb-12 md:mb-20">
        <div className="col-span-12 md:col-span-8">
          <div className="text-label-sm uppercase tracking-[0.2em] text-[#5e5e5e] mb-6 border-l-2 border-black pl-4">
            {t(study.type)}
          </div>
          <h1 className="font-display text-display-lg mb-8">{t(study.title)}</h1>
          <p className="text-body-lg text-[#5e5e5e] max-w-2xl">{t(study.tagline)}</p>
        </div>
        <div className="col-span-12 md:col-span-4 md:text-right">
          <Meta label={t("caseStudy.year")} value={study.year} />
          {/* Note: Role might need careful translation depending on format */}
          <Meta label={t("caseStudy.role")} value={t(study.role).split(" — ")[0]} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mb-12">
        <div className="col-span-12 md:col-span-4">
          <div className="text-label-sm uppercase tracking-widest text-[#5e5e5e] mb-4">{t("caseStudy.techStack")}</div>
          <div className="flex flex-wrap gap-3">
            {study.stack.map((s) => (
              <span
                key={s}
                className="text-label-sm border border-[#c4c7c7] px-4 py-2 uppercase tracking-widest"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 md:pl-10">
          <p className="text-body-lg text-[#1b1c1a]">{t(study.summary)}</p>
        </div>
      </div>

      <div className="aspect-[16/9] w-full overflow-hidden border border-[#c4c7c7] bg-[#efeeeb] reveal-up">
        <img src={study.image} alt={t(study.title)} className="w-full h-full object-cover" />
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-6 md:mb-4">
      <div className="text-label-sm uppercase tracking-widest text-[#5e5e5e]">{label}</div>
      <div className="font-display text-headline-md mt-1">{value}</div>
    </div>
  );
}

function ShowcaseVideo({ study }: { study: CaseStudy }) {
  const [loaded, setLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // <-- ADDED: State to track play status
  const { t } = useTranslation();

  return (
    <section className="px-5 md:px-16 max-w-[1280px] mx-auto pb-28 reveal-up">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-label-sm uppercase tracking-widest text-[#5e5e5e] mb-3">{t("caseStudy.showcase")}</div>
          <h2 className="font-display text-headline-lg">{t("caseStudy.productInMotion")}</h2>
        </div>
        <span className="hidden md:block text-body-md italic text-[#5e5e5e]">{t("caseStudy.cinematicPreview")}</span>
      </div>

      <div className="relative aspect-[16/9] w-full border border-[#c4c7c7] bg-[#111111] overflow-hidden group">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#111111] z-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-white/20 border-t-white animate-spin" />
              <div className="text-label-sm uppercase tracking-[0.3em] text-white/60">{t("caseStudy.loadingPreview")}</div>
            </div>
          </div>
        )}

        {/* If videoSrc exists, render the interactive player */}
        {study.videoSrc ? (
          <>
            {/* The Video Element */}
            <video
              className="w-full h-full object-cover"
              src={study.videoSrc}
              poster={study.videoPoster ?? study.image} // Always show poster first
              muted // Best practice to keep muted for looping background styles, but you can remove if it has audio
              loop
              playsInline
              onLoadedData={() => setLoaded(true)}
              // <-- ADDED: Ref to control playback
              ref={(el) => {
                if (el) {
                  if (isPlaying) {
                    el.play();
                  } else {
                    el.pause();
                  }
                }
              }}
            />
            
            {/* The Play/Pause Overlay Overlay */}
            <div 
              className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-colors duration-300 ${isPlaying ? 'bg-transparent' : 'bg-black/40 hover:bg-black/50'}`}
              onClick={() => setIsPlaying(!isPlaying)}
            >
               {/* Play Button Icon (Only visible when paused) */}
               {!isPlaying && (
                 <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-white text-4xl">play_arrow</span>
                 </div>
               )}
            </div>
          </>
        ) : (
          // Placeholder using poster + subtle motion overlay (No videoSrc provided)
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${study.videoPoster ?? study.image})` }}
            onLoad={() => setLoaded(true)}
          >
            <img
              src={study.videoPoster ?? study.image}
              alt=""
              className="hidden"
              onLoad={() => setLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-end p-6 md:p-10">
              <div className="text-white">
                <div className="text-label-sm uppercase tracking-[0.3em] opacity-80 mb-2">{t("caseStudy.comingSoon")}</div>
                <div className="font-display text-headline-lg max-w-xl">
                  {t("caseStudy.walkthroughPlaceholder")}
                </div>
              </div>
            </div>
            <div className="absolute top-6 right-6 flex items-center gap-2 text-white/80 text-label-sm uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" /> {t("caseStudy.preview")}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function OverviewSection({ study }: { study: CaseStudy }) {
  const { t } = useTranslation();
  return (
    <section className="px-5 md:px-16 max-w-[1280px] mx-auto py-24 border-t border-[#c4c7c7] reveal-up">
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 md:col-span-4">
          <div className="text-label-sm uppercase tracking-widest text-[#5e5e5e] mb-4">{t("caseStudy.overview")}</div>
          <h2 className="font-display text-headline-lg">{t("caseStudy.overviewTitle")}</h2>
        </div>
        <div className="col-span-12 md:col-span-8 space-y-8 text-body-lg text-[#1b1c1a]">
          <p>{t(study.overview)}</p>
          <div>
            <div className="text-label-sm uppercase tracking-widest text-[#5e5e5e] mb-3">{t("caseStudy.theProblem")}</div>
            <p className="text-[#5e5e5e]">{t(study.problem)}</p>
          </div>
          <div>
            <div className="text-label-sm uppercase tracking-widest text-[#5e5e5e] mb-3">{t("caseStudy.myRole")}</div>
            <p className="text-[#5e5e5e]">{t(study.role)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection({ study }: { study: CaseStudy }) {
  const { t } = useTranslation();
  return (
    <section className="px-5 md:px-16 max-w-[1280px] mx-auto py-24 border-t border-[#c4c7c7] reveal-up">
      <div className="mb-16">
        <div className="text-label-sm uppercase tracking-widest text-[#5e5e5e] mb-4">{t("caseStudy.keyFeatures")}</div>
        <h2 className="font-display text-headline-lg max-w-2xl">
          {t("caseStudy.featuresTitle")}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#c4c7c7] border border-[#c4c7c7]">
        {study.features.map((f) => (
          <div
            key={f.title}
            className="bg-[#F7F6F3] p-8 flex flex-col gap-5 hover:bg-white transition-colors duration-300"
          >
            <span className="material-symbols-outlined text-3xl">{f.icon}</span>
            <div>
              <h3 className="font-display text-headline-md mb-3">{t(f.title)}</h3>
              <p className="text-body-md text-[#5e5e5e]">{t(f.desc)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TechSection({ study }: { study: CaseStudy }) {
  const { t } = useTranslation();
  return (
    <section className="bg-[#111111] text-[#FAF9F6] px-5 md:px-16 py-24 reveal-up">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 md:col-span-6">
            <div className="text-label-sm uppercase tracking-widest opacity-60 mb-4">{t("caseStudy.techHighlights")}</div>
            <h2 className="font-display text-display-lg italic leading-none whitespace-pre-line">
              {t("caseStudy.techTitle")}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:pt-6">
            <div className="w-12 h-px bg-[#FAF9F6] mb-8" />
            <p className="text-body-lg opacity-80">
              {/* Note: I've updated this to use translation with interpolation */}
              {t("caseStudy.techDesc", { title: t(study.title) })}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {study.highlights.map((h, i) => (
            <div
              key={h.title}
              className="border border-white/15 bg-white/5 p-6 flex flex-col gap-3 hover:bg-white/10 transition-colors duration-300"
            >
              <span className="text-label-sm opacity-50">0{i + 1}</span>
              <h3 className="font-display text-headline-md">{t(h.title)}</h3>
              <p className="text-body-md opacity-70">{t(h.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChallengesSection({ study }: { study: CaseStudy }) {
  const { t } = useTranslation();
  return (
    <section className="px-5 md:px-16 max-w-[1280px] mx-auto py-24 reveal-up">
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 md:col-span-4">
          <div className="text-label-sm uppercase tracking-widest text-[#5e5e5e] mb-4">{t("caseStudy.devChallenges")}</div>
          <h2 className="font-display text-headline-lg">{t("caseStudy.challengesTitle")}</h2>
        </div>
        <div className="col-span-12 md:col-span-8 space-y-px bg-[#c4c7c7] border border-[#c4c7c7]">
          {study.challenges.map((c, i) => (
            <div key={c.title} className="bg-[#F7F6F3] p-8 grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-1 text-label-sm text-[#5e5e5e]">
                0{i + 1}
              </div>
              <div className="col-span-12 md:col-span-11">
                <h3 className="font-display text-headline-md mb-3">{t(c.title)}</h3>
                <p className="text-body-md text-[#5e5e5e]">
                  <span className="uppercase tracking-widest text-label-sm text-[#1b1c1a] mr-2">{t("caseStudy.solution")} —</span>
                  {t(c.solution)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResultsSection({ study }: { study: CaseStudy }) {
  const { t } = useTranslation();
  return (
    <section className="px-5 md:px-16 max-w-[1280px] mx-auto py-24 border-t border-[#c4c7c7] reveal-up">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-6">
          <div className="text-label-sm uppercase tracking-widest text-[#5e5e5e] mb-4">{t("caseStudy.results")}</div>
          <h2 className="font-display text-headline-lg mb-6">{t("caseStudy.outcome")}</h2>
          <p className="text-body-lg text-[#1b1c1a]">{t(study.outcome)}</p>
        </div>
        <div className="col-span-12 md:col-span-6 md:pl-10 border-l border-[#c4c7c7]/60">
          <div className="text-label-sm uppercase tracking-widest text-[#5e5e5e] mb-4">{t("caseStudy.lessonsLearned")}</div>
          <p className="text-body-lg text-[#5e5e5e]">{t(study.lessons)}</p>
        </div>
      </div>
    </section>
  );
}

function CaseStudyNav({
  prev,
  next,
}: {
  prev: CaseStudy | null;
  next: CaseStudy | null;
}) {
  const { t } = useTranslation();
  return (
    <section className="border-t border-[#c4c7c7]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {prev ? (
          <Link
            to="/case-study/$slug"
            params={{ slug: prev.slug }}
            className="group px-5 md:px-16 py-16 border-b md:border-b-0 md:border-r border-[#c4c7c7] hover:bg-white transition-colors"
          >
            <div className="text-label-sm uppercase tracking-widest text-[#5e5e5e] mb-3 inline-flex items-center gap-2">
              <span className="material-symbols-outlined text-base">arrow_back</span> {t("caseStudy.prevProject")}
            </div>
            <div className="font-display text-headline-lg group-hover:translate-x-[-4px] transition-transform">
              {t(prev.title)}
            </div>
            <div className="text-body-md text-[#5e5e5e] mt-2">{t(prev.tagline)}</div>
          </Link>
        ) : (
          <div className="hidden md:block border-r border-[#c4c7c7]" />
        )}
        {next ? (
          <Link
            to="/case-study/$slug"
            params={{ slug: next.slug }}
            className="group px-5 md:px-16 py-16 md:text-right hover:bg-white transition-colors"
          >
            <div className="text-label-sm uppercase tracking-widest text-[#5e5e5e] mb-3 inline-flex items-center gap-2 md:flex-row-reverse">
              <span className="material-symbols-outlined text-base">arrow_forward</span> {t("caseStudy.nextProject")}
            </div>
            <div className="font-display text-headline-lg group-hover:translate-x-[4px] transition-transform">
              {t(next.title)}
            </div>
            <div className="text-body-md text-[#5e5e5e] mt-2">{t(next.tagline)}</div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </section>
  );
}