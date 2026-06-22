import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BlueprintBackground } from "@/components/BlueprintBackground";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { applyDocumentDirection } from "@/i18n/config";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ahmadreza Saeedi | Architectural Software Developer" },
      { name: "description", content: "Architectural software developer building AI products, digital experiences and scalable web applications. Based in Istanbul, Türkiye." },
      { property: "og:title", content: "Ahmadreza Saeedi | Architectural Software Developer" },
      { property: "og:description", content: "Architectural software developer building AI products, digital experiences and scalable web applications." },
    ],
  }),
  component: Index,
});

const PORTRAIT = "/portfolio/assets/myself2.jpg";
const ArtGallery = "/portfolio/assets/ArtGallery.png";
const milowra = "/portfolio/assets/milowra.png";
const FOREX = "/portfolio/assets/forex.jpg";
const SERVER = "https://lh3.googleusercontent.com/aida-public/AB6AXuA6Q522E9Bvv5PgZGFEJJfvraFu7yWRTM3uNC0qzvs5xgZy-FOwDMfTBpMXjNiBy2Lk0BYgEXrwyWOfqHq2xc31oOknDFxTuiM2MIJPO2MGqFI7ukgF4hWtchsgyDsDy-xdjpUZjhVhrdNuwkr9PNnKBY70Y0xGehuyL27DHegZwd8tYeeMuVzNgc7Pnd-WJCX59ylx7YBFujMjK48aX4Z6hwBlvqUkTtD25WkOFoMGvvUXeEymKIge7BFcVysTtKSqnsWuRgx8ZKE";
function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", project: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: "New Inquiry from Portfolio",
          from_name: formData.name,
          email: formData.email,
          message: formData.project,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", project: "" });
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <footer id="contact" className="relative z-10 w-full py-[120px] px-5 md:px-16 border-t border-[#c4c7c7] reveal-up bg-[#F7F6F3]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-label-sm text-[#5e5e5e] uppercase tracking-widest mb-4 border-l-2 border-black pl-4">
                {t('contact.tag')}
              </div>
              <h2 className="font-display text-headline-lg mb-6">{t('footer.title')}</h2>
              <p className="text-[#5e5e5e] text-body-lg mb-12 max-w-md">{t('footer.desc')}</p>
              <div className="text-black font-display text-headline-md mb-12">saeediahmadreza01@gmail.com</div>
            </div>
            
            <div className="pt-8 border-t border-[#c4c7c7]/40 max-w-md">
              <p className="text-[#5e5e5e] text-body-md mb-4">{t('contact.fastlane_desc')}</p>
              <a 
                href="https://wa.me/+905454244064" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-3 text-black font-bold uppercase text-label-sm tracking-widest hover:opacity-70 transition-opacity"
              >
                <span className="material-symbols-outlined text-xl">chat</span>
                {t('contact.whatsapp')}
              </a>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <form className="flex flex-col gap-10" onSubmit={handleFormSubmit}>
              <div className="flex flex-col gap-3">
                <label htmlFor="name" className="text-label-sm uppercase tracking-widest text-[#5e5e5e]">
                  {t('contact.nameLabel')}
                </label>
                <input 
                  id="name" 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-[#c4c7c7] py-2 focus:outline-none focus:border-black transition-colors text-body-lg text-black" 
                  required 
                  disabled={formStatus === "submitting"}
                />
              </div>
              
              <div className="flex flex-col gap-3">
                <label htmlFor="email" className="text-label-sm uppercase tracking-widest text-[#5e5e5e]">
                  {t('contact.emailLabel')}
                </label>
                <input 
                  id="email" 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-[#c4c7c7] py-2 focus:outline-none focus:border-black transition-colors text-body-lg text-black" 
                  required 
                  disabled={formStatus === "submitting"}
                />
              </div>
              
              <div className="flex flex-col gap-3">
                <label htmlFor="project" className="text-label-sm uppercase tracking-widest text-[#5e5e5e]">
                  {t('contact.projectLabel')}
                </label>
                <textarea 
                  id="project" 
                  rows={4} 
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full bg-transparent border-b border-[#c4c7c7] py-2 focus:outline-none focus:border-black transition-colors text-body-lg text-black resize-none" 
                  placeholder={t('contact.projectPlaceholder')}
                  required
                  disabled={formStatus === "submitting"}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={formStatus === "submitting" || formStatus === "success"}
                className={`px-8 py-5 text-label-sm uppercase tracking-widest w-fit mt-4 transition-colors flex items-center gap-4 ${
                  formStatus === "success" 
                    ? "bg-green-600 text-white" 
                    : formStatus === "error"
                    ? "bg-red-600 text-white"
                    : "bg-black text-white hover:bg-neutral-800"
                }`}
              >
                {formStatus === "submitting" && t('contact.statusSubmitting')}
                {formStatus === "success" && t('contact.statusSuccess')}
                {formStatus === "error" && t('contact.statusError')}
                {formStatus === "idle" && t('contact.submitBtn')}
                
                {formStatus === "idle" && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
                {formStatus === "success" && <span className="material-symbols-outlined text-sm">check</span>}
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto mt-32 pt-10 border-t border-[#c4c7c7]/40 flex flex-col md:flex-row justify-between items-center gap-8 text-[#5e5e5e]">
          <div className="flex gap-8 order-2 md:order-1 flex-col md:flex-row items-center">
            <p className="text-label-sm uppercase">{t('footer.copyright')}</p>
            <p className="text-label-sm uppercase hidden md:block">{t('footer.built')}</p>
          </div>
          <div className="flex gap-8 order-1 md:order-2">
            <a className="nav-link text-label-sm uppercase text-[#444748] hover:text-black transition-colors" href="https://www.linkedin.com/in/ahmad-reza-saeedi-bab882338/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bht8msDmaSKK7AL%2BhofemXA%3D%3D" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="nav-link text-label-sm uppercase text-[#444748] hover:text-black transition-colors" href="https://github.com/Ahmdrz-dev" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="nav-link text-label-sm uppercase text-[#444748] hover:text-black transition-colors" href="https://wa.me/+905454244064" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </footer>
  );
}
function Index() {
  const dotRef = useRef<HTMLDivElement>(null);
  const lineDotRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  

  const { t, i18n } = useTranslation();
  const currentLang = i18n.resolvedLanguage ?? i18n.language ?? "en";
  const isRTL = currentLang === "fa";

  useEffect(() => {
    applyDocumentDirection(currentLang);
  }, [currentLang]);

  useEffect(() => {
    const triggerTimer = setTimeout(() => setIsLoaded(true), 1900);
    const unmountTimer = setTimeout(() => setLoading(false), 2900);
    return () => {
      clearTimeout(triggerTimer);
      clearTimeout(unmountTimer);
    };
  }, []);


  useEffect(() => {
  if (loading) return; // Don't attach until preloader is done
  
  const reveals = document.querySelectorAll(".reveal-up");
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("active");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach((el) => io.observe(el));

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      setScrolled(y > 30);
      if (dotRef.current) dotRef.current.style.transform = `rotate(${(y / 10) % 360}deg)`;
      if (lineDotRef.current) lineDotRef.current.style.transform = `translate(-50%, ${Math.min(y / 400, 1) * 100}px)`;
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
}, [loading]);

  return (
    <div className="font-body text-body-md relative" dir={isRTL ? "rtl" : "ltr"}>
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col pointer-events-none">
          <div className={`h-1/2 w-full absolute top-0 left-0 bg-[#FAF6EE] transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] origin-top z-40 ${isLoaded ? "-translate-y-full" : "translate-y-0"}`} />
          <div className={`h-1/2 w-full absolute bottom-0 left-0 bg-[#FAF6EE] transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] origin-bottom z-40 ${isLoaded ? "translate-y-full" : "translate-y-0"}`} />
          <div className={`relative z-50 m-auto flex flex-col items-center transition-opacity duration-300 ease-out ${isLoaded ? "opacity-0" : "opacity-100"}`}>
            <h1 className="preloader-name">AHMADREZA SAEEDI</h1>
            <div className="preloader-bar-track w-screen left-0 right-0">
              <div className="preloader-bar" />
            </div>
            <div className="preloader-role">{t('role')}</div>
          </div>
        </div>
      )}

      <BlueprintBackground />

      <header className={`fixed top-0 w-full z-40 bg-[#F7F6F3] transition-all duration-500 ${scrolled ? "border-b border-[#c4c7c7] shadow-[0_1px_0_rgba(0,0,0,0.02)]" : "border-b border-transparent"}`}>
        <nav className="flex justify-between items-center px-5 md:px-16 py-6 max-w-[1280px] mx-auto">
          <div className="font-display text-headline-md font-medium text-black">Ahmadreza Saeedi</div>
          <div className="hidden md:flex items-center gap-10">
            <a className="nav-link active-nav text-black font-bold pb-1 text-label-sm uppercase" href="#work">{t('nav.work')}</a>
            <a className="nav-link text-[#5e5e5e] hover:text-black text-label-sm uppercase" href="#about">{t('nav.about')}</a>
            <a className="nav-link text-[#5e5e5e] hover:text-black text-label-sm uppercase" href="#contact">{t('nav.contact')}</a>
            <LanguageSwitcher className="ml-4" />
          </div>
          <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher />
          <span 
           className="material-symbols-outlined cursor-pointer" 
           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
           >
          {mobileMenuOpen ? "close" : "menu"}
           </span>
       </div>
        </nav>
         {mobileMenuOpen && (
          <div className="md:hidden bg-[#F7F6F3] border-t border-[#c4c7c7] px-5 py-6 flex flex-col gap-6">
            <a className="text-label-sm uppercase tracking-widest text-black" href="#work" onClick={() => setMobileMenuOpen(false)}>{t('nav.work')}</a>
            <a className="text-label-sm uppercase tracking-widest text-[#5e5e5e]" href="#about" onClick={() => setMobileMenuOpen(false)}>{t('nav.about')}</a>
            <a className="text-label-sm uppercase tracking-widest text-[#5e5e5e]" href="#contact" onClick={() => setMobileMenuOpen(false)}>{t('nav.contact')}</a>
            <LanguageSwitcher />
          </div>
        )}
      </header>

      <main className="pt-32 relative z-10">
        <section className="relative min-h-[80vh] px-5 md:px-16 max-w-[1280px] mx-auto flex flex-col justify-center overflow-hidden mb-[120px]">
          <div className="grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-8 reveal-up">
              <h1 className="font-display text-display-lg mb-8 max-w-4xl">{t('hero.title')}</h1>
              <p className="text-body-lg text-[#5e5e5e] max-w-2xl mb-12">{t('hero.subtitle')}</p>
              <a href="#work" className="btn-primary inline-flex items-center gap-4 bg-black text-white px-8 py-4 text-label-sm uppercase tracking-widest">
                {t('hero.cta')}
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
              <div className="mt-20 flex flex-col items-start gap-4">
                <span className="text-label-sm uppercase tracking-[0.2em] text-[#5e5e5e]">{t('hero.scroll')}</span>
                <div className="relative w-px h-[100px] bg-[#c4c7c7]/50 overflow-hidden">
                  <div ref={lineDotRef} className="absolute left-1/2 -translate-x-1/2 w-[7px] h-[7px] bg-black rounded-full top-0" />
                </div>
              </div>
            </div>
            <div className="hidden md:flex col-span-4 justify-center items-center relative reveal-up">
              <div className="relative w-72 h-72 flex items-center justify-center">
                <svg viewBox="-100 -100 200 200" className="absolute inset-0 w-full h-full" aria-hidden="true">
                  <g fill="none" stroke="#1b1c1a" strokeWidth="0.6" opacity="0.55">
                    <polygon points="-60,-20 0,-50 60,-20 0,10" fill="#1b1c1a" fillOpacity="0.04" />
                    <polygon points="-60,-20 0,10 0,70 -60,40" fill="#1b1c1a" fillOpacity="0.06" />
                    <polygon points="60,-20 0,10 0,70 60,40" fill="#1b1c1a" fillOpacity="0.03" />
                    <line x1="0" y1="10" x2="0" y2="70" />
                    <line x1="-60" y1="-20" x2="-60" y2="40" strokeDasharray="2 3" />
                    <line x1="60" y1="-20" x2="60" y2="40" strokeDasharray="2 3" />
                    <line x1="-90" y1="0" x2="-70" y2="0" />
                    <line x1="70" y1="0" x2="90" y2="0" />
                    <line x1="0" y1="-90" x2="0" y2="-70" />
                  </g>
                </svg>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[40%] w-28 h-28">
                  <div className="absolute inset-0 border border-[#1b1c1a]/60 rounded-full" />
                  <div className="absolute inset-3 border border-[#1b1c1a]/30 rounded-full" />
                  <div ref={dotRef} className="absolute inset-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="px-5 md:px-16 max-w-[1280px] mx-auto mb-[120px] pt-24 reveal-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
            <div className="space-y-8">
              <div className="text-label-sm text-[#5e5e5e] uppercase tracking-widest border-l-2 border-black pl-4">{t('about.tag')}</div>
              <h2 className="font-display text-headline-lg">{t('about.title')}</h2>
              <div className="space-y-6 text-[#5e5e5e] text-body-lg">
                <p>{t('about.p1')}</p>
                <p>{t('about.p2')}</p>
                <p>{t('about.p3')}</p>
              </div>
            </div>
            <div className="relative aspect-[0.67] overflow-hidden border border-[#c4c7c7]">
              <img alt="Editorial portrait of Ahmadreza Saeedi" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" src={PORTRAIT} />
            </div>
          </div>
        </section>

        <section id="work" className="px-5 md:px-16 max-w-[1280px] mx-auto mb-[120px] pt-24">
          <div className="flex justify-between items-end mb-16 md:mb-24 reveal-up">
            <div>
              <div className="text-label-sm text-[#5e5e5e] uppercase tracking-widest mb-4">{t('work.tag')}</div>
              <h2 className="font-display text-headline-lg">{t('work.title')}</h2>
            </div>
        
          </div>

          <div className="flex flex-col gap-32 md:gap-48">
            <CaseStudy
              slug="ArtGallery"
              img={ArtGallery}
              title={t('work.Lumora.title')}
              desc={t('work.Lumora.desc')}
              tags={["Python", "Django", "PostgreSQL"]}
              year={t('work.ongoing')}
              details={t('work.details')}
            />
            <CaseStudy
              slug="milowra"
              img={milowra}
              title={t('work.milowra.title')}
              desc={t('work.milowra.desc')}
              tags={["React", "DRF API", "PostgreSQL"]}
              year="2026"
              url="https://milowra.com"
              visitWebsiteText={t('work.visit_website')}
              details={t('work.details')}
              reverse={true}
            />
            <CaseStudy
              slug="forex"
              img={FOREX}
              title={t('work.forex.title')}
              desc={t('work.forex.desc')}
              tags={["Python", "Pandas", "Django"]}
              year="2025"
              reverse={false} 
              details={t('work.details')}
            />
            <CaseStudy
              slug="server" 
              img={SERVER}
              title={t('work.server.title')}
              desc={t('work.server.desc')}
              year={t('work.ongoing')}
              details={t('work.details')}
              reverse={true}
            />
          </div>
        </section>

        <section id="philosophy" className="bg-[#111111] text-[#FAF9F6] py-[120px] px-5 md:px-16 reveal-up">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-16 md:mb-24">
              <div className="md:col-span-6">
                <h2 className="font-display text-display-lg italic tracking-tight leading-none whitespace-pre-line">
                  {t('philosophy.title')}
                </h2>
              </div>
              <div className="md:col-span-6 md:pt-4">
                <div className="w-12 h-px bg-[#FAF9F6] mb-8" />
                <p className="text-body-lg opacity-80 max-w-xl">{t('philosophy.body')}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[ "grid_view", "smartphone", "language", "psychology" ].map((icon, i) => (
                <Discipline key={icon} icon={icon} title={t(`philosophy.disc.${i}.title`)} desc={t(`philosophy.disc.${i}.desc`)} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 md:px-16 max-w-[1280px] mx-auto py-[120px] reveal-up">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <h3 className="font-display text-headline-lg mb-4">{t('skills.title')}</h3>
              <p className="text-[#5e5e5e] text-body-md">{t('skills.desc')}</p>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-12">
              <SkillCol title={t('skills.backend')} items={["Python", "Django", "FastAPI", "Rest Framework"]} />
              <SkillCol title={t('skills.frontend')} items={["React", "JavaScript", "Tailwind CSS", "HTML / CSS"]} />
              <SkillCol title={t('skills.tools')} items={["Git / GitHub", "Docker", "PostgreSQL", "Redis"]} />
            </div>
          </div>
        </section>
      </main>

     <div className="md:col-span-6 md:col-start-7">
  <ContactForm />
</div>
    </div>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

interface CaseStudyProps {
  slug: string;
  img: string;
  title: string;
  desc: string;
  year: string;
  tags?: string[];
  overlay?: string;
  reverse?: boolean;
  url?: string;
  visitWebsiteText?: string; 
  details?: string;
}

function CaseStudy({ slug, img, title, desc, tags, year, overlay, reverse, url, visitWebsiteText,details }: CaseStudyProps) {
  return (
    <div className={`flex flex-col gap-8 md:gap-16 lg:gap-24 items-center reveal-up ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`}>
      
      <div className="w-full md:w-3/5">
        {/* Wrap the image in a Link component */}
        <Link 
          to="/case-study/$slug" 
          params={{ slug }} 
          className="relative aspect-[4/3] w-full bg-[#efeeeb] overflow-hidden border border-[#c4c7c7] block group"
        >
          <img 
            className="absolute inset-0 w-full h-full object-cover object-left transition-transform duration-500 group-hover:scale-105" 
            src={img} 
            alt={title} 
          />
          {overlay && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <span className="text-white font-display text-headline-lg bg-black/20 px-8 py-4 backdrop-blur-sm">
                {overlay}
              </span>
            </div>
          )}
        </Link>
      </div>

      <div className="w-full md:w-2/5 flex flex-col justify-center items-start">
        {/* Wrap the title in a Link component */}
        <Link to="/case-study/$slug" params={{ slug }} className="inline-block group">
          <h3 className="font-display text-headline-lg mb-4 group-hover:underline underline-offset-4">{title}</h3>
        </Link>
        <p className="text-[#5e5e5e] text-body-lg mb-8 max-w-2xl">{desc}</p>
        
        {tags && (
          <div className="flex flex-wrap gap-4 mb-8">
            {tags.map((t) => (
              <span key={t} className="text-label-sm border border-[#c4c7c7] px-4 py-2 uppercase">
                {t}
              </span>
            ))}
          </div>
        )}
      
        <span className="text-body-md text-[#5e5e5e] mb-6">{year}</span>
        
        {/* Add the new "Read case study" link alongside your external website link */}
        <div className="flex flex-wrap gap-6 items-center mt-4">
          <Link
            to="/case-study/$slug"
            params={{ slug }}
            className="inline-flex items-center gap-3 text-label-sm uppercase tracking-widest text-black border-b border-black pb-1 hover:gap-5 transition-all"
          >
            {details}
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>

          {url && visitWebsiteText && (
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-4 text-label-sm uppercase tracking-widest bg-black text-white hover:bg-neutral-800 transition-colors flex items-center gap-3 w-fit"
            >
              {visitWebsiteText}
              <span className="material-symbols-outlined text-sm">arrow_outward</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Discipline({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 flex flex-col gap-6 hover:bg-white/10 transition-colors duration-300">
      <span className="material-symbols-outlined text-3xl">{icon}</span>
      <div>
        <h4 className="font-display text-headline-md mb-3">{title}</h4>
        <p className="text-body-md opacity-60">{desc}</p>
      </div>
    </div>
  );
}

function SkillCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h5 className="text-label-sm uppercase tracking-widest mb-6 pb-2 border-b border-[#c4c7c7]">{title}</h5>
      <ul className="space-y-2 text-body-md">
        {items.map((it) => (
          <li key={it} className="skill-item flex justify-between items-center py-2 border-b border-[#c4c7c7]/40">
            {it}
            <span className="material-symbols-outlined text-sm opacity-30">check_circle</span>
          </li>
        ))}
      </ul>
    </div>
  );
}