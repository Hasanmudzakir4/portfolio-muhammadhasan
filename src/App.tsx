import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Database,
  Download,
  Globe,
  Mail,
  MapPin,
  Menu,
  Palette,
  Smartphone,
  X,
} from 'lucide-react';
import {
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  ProjectItem,
  SERVICES,
  SKILLS,
  ServiceItem,
} from './data/portfolioData';
import {
  AsteriskStar,
  BlueDoubleUnderline,
  BlueHorizontalSpring,
  CloudSquiggle,
  CoffeeMugDoodle,
  CoralCurlySpring,
  CurvedLoopArrowLeft,
  FooterLoopArrow,
  FourPointStar,
  GraduationCapDoodle,
  GreenHighlighterSwoosh,
  GreenSmileySticker,
  LavenderBrushQuote,
  PlusSparkle,
  SunburstYellow,
  ThreeBurstTicks,
  WavyUnderlineRed,
} from './components/Doodles';
import { ProjectMockup } from './components/ProjectMockups';
import {
  CVModal,
  CaseStudyModal,
  ContactModal,
  ServiceDetailModal,
} from './components/Modals';
import { Language, TRANSLATIONS } from './i18n/translations';

type SectionId = 'beranda' | 'tentang' | 'karya' | 'keahlian' | 'kontak';

interface NavConfigItem {
  id: SectionId;
  href: string;
}

const NAV_CONFIG: NavConfigItem[] = [
  { id: 'beranda', href: '#beranda' },
  { id: 'tentang', href: '#tentang' },
  { id: 'karya', href: '#karya' },
  { id: 'keahlian', href: '#keahlian' },
  { id: 'kontak', href: '#kontak' },
];

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<SectionId>('beranda');
  const isClickScrollingRef = React.useRef(false);
  const scrollTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState<string>('Full-Stack Project');
  const [cvOpen, setCvOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [portraitError, setPortraitError] = useState(false);

  // Dynamic portfolio data fetched from SQLite backend
  const [portfolioData, setPortfolioData] = useState<{
    profile: any;
    services: any[];
    projects: any[];
    experience: any[];
    education: any[];
    skills: any[];
  }>({
    profile: PROFILE,
    services: SERVICES,
    projects: PROJECTS,
    experience: EXPERIENCE,
    education: EDUCATION,
    skills: SKILLS.map((s, idx) => ({ id: `skill-${idx}`, name: s })),
  });

  const t = TRANSLATIONS[lang];
  const isId = lang === 'id';

  // Fetch from SQLite database on mount
  const fetchPortfolioData = async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const json = await res.json();
        setPortfolioData(json);
      }
    } catch (err) {
      console.warn('Could not fetch from SQLite, falling back to bundled data', err);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  // Update active section on scroll via IntersectionObserver
  useEffect(() => {
    const sectionIds: SectionId[] = ['beranda', 'tentang', 'karya', 'keahlian', 'kontak'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const intersectingMap = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrollingRef.current) return;

        entries.forEach((entry) => {
          intersectingMap.set(entry.target.id, entry.isIntersecting);
        });

        // Top edge case: Hero / Beranda area
        if (window.scrollY < 120) {
          setActiveSection('beranda');
          return;
        }

        // Bottom edge case: reached end of page
        const isBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 30;
        if (isBottom) {
          setActiveSection('kontak');
          return;
        }

        // Visible sections currently intersecting rootMargin
        const visibleIds = sectionIds.filter((id) => intersectingMap.get(id));

        if (visibleIds.length > 0) {
          setActiveSection((curr) => {
            // If currently active section is still intersecting, maintain it (no jitter)
            if (visibleIds.includes(curr)) {
              return curr;
            }

            // Otherwise, pick section closest to the focal line (~42% from top of viewport)
            const focalY = window.innerHeight * 0.42;
            let closestId = visibleIds[0];
            let minDistance = Infinity;

            for (const id of visibleIds) {
              const el = document.getElementById(id);
              if (el) {
                const rect = el.getBoundingClientRect();
                const dist = Math.abs(rect.top - focalY);
                if (dist < minDistance) {
                  minDistance = dist;
                  closestId = id;
                }
              }
            }
            return closestId;
          });
        }
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));

    const handleScroll = () => {
      if (isClickScrollingRef.current) return;

      // Bottom edge case
      const isBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 30;
      if (isBottom) {
        setActiveSection('kontak');
        return;
      }

      // Top edge case: Hero / Beranda
      if (window.scrollY < 120) {
        setActiveSection('beranda');
        return;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleNavClick = (sectionId: SectionId, href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection(sectionId);
    setMobileMenuOpen(false);

    isClickScrollingRef.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    if (sectionId === 'beranda') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      const target = document.querySelector(href);
      if (target) {
        const navHeight = 72;
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: Math.max(0, elementPosition - navHeight),
          behavior: 'smooth',
        });
      }
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 800);
  };

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard?.writeText(value);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const openInquiry = (subject: string) => {
    setSelectedProject(null);
    setSelectedService(null);
    setContactSubject(subject);
    setContactOpen(true);
  };

  const currentProfile = portfolioData.profile || PROFILE;
  const currentServices: ServiceItem[] = portfolioData.services?.length ? portfolioData.services : SERVICES;
  const currentProjects: ProjectItem[] = portfolioData.projects?.length ? portfolioData.projects : PROJECTS;
  const currentExperience = portfolioData.experience?.length ? portfolioData.experience : EXPERIENCE;
  const currentEducation = portfolioData.education?.length ? portfolioData.education : EDUCATION;
  const currentSkillsList: string[] = portfolioData.skills?.length
    ? portfolioData.skills.map((s: any) => s.name)
    : SKILLS;

  const baseProjects = showAllProjects ? currentProjects : currentProjects.slice(0, 4);
  const displayedProjects = selectedSkill
    ? currentProjects.filter((p) => p.stack && p.stack.includes(selectedSkill))
    : baseProjects;

  const renderServiceIcon = (type: ServiceItem['iconType']) => {
    switch (type) {
      case 'code':
        return (
          <div className="w-7 h-7 rounded-full border-[1.7px] border-[var(--accent-primary)] flex items-center justify-center text-[11px] font-extrabold tracking-tighter text-[var(--accent-primary)]">
            &lt;/&gt;
          </div>
        );
      case 'mobile':
        return <Smartphone className="w-6 h-6 text-[var(--accent-primary)] stroke-[1.8]" />;
      case 'backend':
        return <Database className="w-6 h-6 text-[var(--accent-primary)] stroke-[1.8]" />;
      case 'design':
        return <Palette className="w-6 h-6 text-[var(--accent-primary)] stroke-[1.8]" />;
      default:
        return <Smartphone className="w-6 h-6 text-[var(--accent-primary)] stroke-[1.8]" />;
    }
  };

  const getNavLabel = (id: SectionId): string => {
    switch (id) {
      case 'beranda':
        return t.nav.home;
      case 'tentang':
        return t.nav.about;
      case 'karya':
        return t.nav.work;
      case 'keahlian':
        return t.nav.skills;
      case 'kontak':
        return t.nav.contact;
    }
  };

  // Localized texts
  const badgeRoleText = isId
    ? currentProfile.badgeRole_id || currentProfile.badgeRole_en || 'Pengembang Full-Stack'
    : currentProfile.badgeRole_en || 'Full-Stack Developer';

  const heroTagline = isId
    ? currentProfile.heroTagline_id || currentProfile.heroTagline_en || PROFILE.heroTagline
    : currentProfile.heroTagline_en || PROFILE.heroTagline;

  const aboutBioText = isId
    ? currentProfile.aboutBio_id || currentProfile.aboutBio_en || PROFILE.aboutBio
    : currentProfile.aboutBio_en || PROFILE.aboutBio;

  const pronounsText = isId
    ? currentProfile.pronouns_id || 'Dia (L)'
    : currentProfile.pronouns_en || 'He/Him';

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-x-hidden pt-20">
      {/* Subtle Copy Toast */}
      {copiedField && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 bg-[var(--bg-card-elevated)] border border-[var(--border-primary)] text-[var(--text-primary)] text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2"
        >
          <Check className="w-3.5 h-3.5 text-[var(--accent-emerald)]" />
          <span>{t.toast.copied.replace('{field}', copiedField)}</span>
        </div>
      )}

      {/* ================= FIXED HEADER / NAVBAR ================= */}
      <header
        className="fixed top-0 inset-x-0 z-40 bg-[#0B0F14]/92 backdrop-blur-md border-b border-[var(--border-primary)] transition-all duration-200"
      >
        <div className="max-w-[1060px] mx-auto px-5 sm:px-8 h-18 flex items-center justify-between gap-5 sm:gap-7">
          {/* Brand Logo */}
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('beranda');
              isClickScrollingRef.current = true;
              if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
              window.scrollTo({ top: 0, behavior: 'smooth' });
              scrollTimeoutRef.current = setTimeout(() => {
                isClickScrollingRef.current = false;
              }, 800);
            }}
            className="font-display font-bold text-[21px] sm:text-[23px] tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0 inline-flex items-center gap-2 group"
          >
            <span>{currentProfile.name || PROFILE.name}</span>
            <span
              className="w-2 h-2 rounded-full bg-[var(--accent-secondary)] inline-block translate-y-[1px] group-hover:scale-125 transition-transform"
              aria-hidden="true"
            />
          </a>

          {/* Desktop Nav Links */}
          <nav
            className="hidden md:flex items-center gap-7 lg:gap-8 text-[14px] font-semibold text-[var(--text-secondary)]"
            aria-label="Primary"
          >
            {NAV_CONFIG.map((item) => {
              const isActive = activeSection === item.id;
              const label = getNavLabel(item.id);

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.id, item.href, e)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive ? 'text-[var(--accent-primary)] font-bold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span>{label}</span>

                  {/* Active Indicator Doodle under the active nav item (as in reference image) */}
                  {isActive && (
                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 transition-all pointer-events-none">
                      <WavyUnderlineRed className="w-11 h-2" />
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Controls: Language Switcher with Inline SVG Flag Icons */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Language Switch Toggle with rounded flags */}
            <div className="flex items-center bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-full p-1 shadow-sm gap-0.5">
              {/* United Kingdom Flag (EN) */}
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-label="English"
                title="English"
                className={`flex items-center justify-center w-7 h-7 rounded-full transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/30 shadow-sm'
                    : 'opacity-70 hover:opacity-100 hover:bg-[var(--border-primary)]'
                }`}
              >
                <svg
                  viewBox="0 0 60 60"
                  className="w-5 h-5 rounded-full overflow-hidden shrink-0 shadow-inner"
                  aria-hidden="true"
                >
                  <clipPath id="uk-flag-circle">
                    <circle cx="30" cy="30" r="30" />
                  </clipPath>
                  <g clipPath="url(#uk-flag-circle)">
                    {/* Blue field */}
                    <rect width="60" height="60" fill="#012169" />
                    {/* White diagonals */}
                    <path d="M0 0 L60 60 M60 0 L0 60" stroke="#FFFFFF" strokeWidth="10" />
                    {/* Red diagonals */}
                    <path d="M0 0 L25 25 M35 35 L60 60" stroke="#C8102E" strokeWidth="3.4" />
                    <path d="M60 0 L35 25 M25 35 L0 60" stroke="#C8102E" strokeWidth="3.4" />
                    {/* White cross */}
                    <path d="M30 0 V60 M0 30 H60" stroke="#FFFFFF" strokeWidth="16" />
                    {/* Red cross */}
                    <path d="M30 0 V60 M0 30 H60" stroke="#C8102E" strokeWidth="9.6" />
                  </g>
                </svg>
              </button>

              {/* Indonesia Flag (ID) */}
              <button
                type="button"
                onClick={() => setLang('id')}
                aria-label="Bahasa Indonesia"
                title="Bahasa Indonesia"
                className={`flex items-center justify-center w-7 h-7 rounded-full transition-all cursor-pointer ${
                  lang === 'id'
                    ? 'bg-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/30 shadow-sm'
                    : 'opacity-70 hover:opacity-100 hover:bg-[var(--border-primary)]'
                }`}
              >
                <svg
                  viewBox="0 0 60 60"
                  className="w-5 h-5 rounded-full overflow-hidden shrink-0 border border-black/10 shadow-inner"
                  aria-hidden="true"
                >
                  <clipPath id="id-flag-circle">
                    <circle cx="30" cy="30" r="30" />
                  </clipPath>
                  <g clipPath="url(#id-flag-circle)">
                    {/* Top Red */}
                    <rect width="60" height="30" fill="#E70011" />
                    {/* Bottom White */}
                    <rect y="30" width="60" height="30" fill="#FFFFFF" />
                  </g>
                </svg>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden w-9 h-9 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-primary)] cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden max-w-[1060px] mx-auto px-5 pb-4 pt-1">
            <nav className="bg-[var(--bg-card)] rounded-2xl p-4 shadow-xl border border-[var(--border-primary)] flex flex-wrap items-center justify-around gap-2.5">
              {NAV_CONFIG.map((item) => {
                const isActive = activeSection === item.id;
                const label = getNavLabel(item.id);

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(item.id, item.href, e)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
                      isActive ? 'text-[var(--accent-primary)] bg-[var(--accent-primary-subtle)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {label}
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-[1060px] mx-auto px-5 sm:px-8">
        {/* ================= HERO SECTION ================= */}
        <section
          id="beranda"
          className="scroll-mt-24 relative pt-6 sm:pt-9 pb-14 sm:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center"
        >
          <span id="home" className="sr-only" aria-hidden="true" />
          {/* Outer top-right emerald asterisk star */}
          <div className="hidden sm:block absolute -top-2 -right-2 lg:-right-4 pointer-events-none">
            <AsteriskStar color="#10B981" className="w-14 h-14" />
          </div>

          {/* Left Column: Giant "Port / folio" + Tagline + CTAs */}
          <div className="lg:col-span-6 relative z-10 pt-1 sm:pt-2">
            {/* Decorative stars above Port headline */}
            <div className="flex items-center gap-2 mb-2 pl-2 select-none" aria-hidden="true">
              <FourPointStar color="#3B82F6" size={26} className="animate-pulse" />
              <FourPointStar color="#F59E0B" size={16} />
            </div>

            {/* Giant Playful Editorial Display Lockup */}
            <div className="relative select-none pt-0 pb-2 max-w-[470px]">
              {/* Small 4-point blue sparkle top-right of Port */}
              <FourPointStar
                color="#3B82F6"
                size={21}
                className="absolute top-1 right-6 sm:right-10 pointer-events-none"
              />

              {/* Line 1: Port with subtle masculine glow */}
              <div className="portfolio-headline-glow font-display font-extrabold text-[var(--accent-primary)] text-[82px] sm:text-[112px] lg:text-[126px] leading-[0.86] tracking-[-0.025em] -rotate-[5deg] origin-bottom-left pl-1">
                Port
              </div>

              {/* Tilted Amber Role Capsule */}
              <div className="relative z-20 flex justify-end pr-0 sm:pr-2 -mt-2 sm:-mt-3 -mb-3 sm:-mb-4">
                <span className="inline-block bg-[var(--accent-secondary)] text-[#0B0F14] text-[12px] sm:text-[13.5px] font-bold px-4 py-1 rounded-full rotate-[3deg] shadow-[0_4px_16px_var(--accent-secondary-glow)] whitespace-nowrap">
                  {badgeRoleText}
                </span>
              </div>

              {/* Small emerald + on the left of folio */}
              <PlusSparkle
                color="#10B981"
                size={19}
                className="hidden sm:block absolute left-0 top-[56%] -translate-x-4 pointer-events-none"
              />

              {/* Line 2: folio */}
              <div className="portfolio-headline-glow font-display font-extrabold text-[var(--accent-primary)] text-[82px] sm:text-[112px] lg:text-[126px] leading-[0.88] tracking-[-0.025em] -rotate-[3.5deg] pl-8 sm:pl-14 inline-block">
                folio
              </div>

              {/* Hand-drawn curved loop arrow at bottom-left of folio */}
              <div className="mt-1 -ml-1 sm:-ml-3 inline-block pointer-events-none">
                <CurvedLoopArrowLeft className="w-11 h-13 sm:w-12 sm:h-14" />
              </div>

              {/* Amber 8-ray sunburst at bottom-right of folio */}
              <div className="absolute -bottom-5 right-0 sm:-right-4 pointer-events-none">
                <SunburstYellow className="w-16 h-16 sm:w-20 sm:h-20" />
              </div>
            </div>

            {/* Lead Subtitle */}
            <p className="mt-2 sm:mt-3 text-[17px] sm:text-[19px] font-semibold text-[var(--text-secondary)] leading-[1.45] max-w-[420px] text-balance">
              {heroTagline}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-6 sm:gap-7">
              <button
                type="button"
                onClick={() => openInquiry('New Product Collaboration')}
                className="bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white text-[13.5px] font-semibold px-5 py-3.5 rounded-xl inline-flex items-center gap-2.5 shadow-[0_4px_18px_var(--accent-primary-glow)] transition-transform duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{t.hero.letsWork}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </button>

              <button
                type="button"
                onClick={() => setCvOpen(true)}
                className="group inline-flex flex-col items-start pt-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span className="inline-flex items-center gap-2 text-[13.5px] font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                  <span>{t.hero.downloadCv}</span>
                  <Download className="w-4 h-4 stroke-[2.1]" />
                </span>
                <BlueDoubleUnderline className="w-28 h-3 mt-0.5 group-hover:scale-x-105 transition-transform origin-left" />
              </button>
            </div>
          </div>

          {/* Right Column: Portrait Collage & Floating Contact Card */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end pt-4 sm:pt-6">
            <div className="relative w-full max-w-[430px] pb-16 sm:pb-20">
              {/* Radiating Ticks above right shoulder */}
              <div className="absolute -top-6 right-12 sm:right-16 z-20 pointer-events-none">
                <ThreeBurstTicks color="#64748B" className="w-13 h-10" />
              </div>

              {/* Thin Blue Elliptical Orbit Ring behind Card */}
              <svg
                viewBox="0 0 420 360"
                fill="none"
                className="absolute -inset-4 w-[108%] h-[92%] pointer-events-none z-0"
                aria-hidden="true"
              >
                <ellipse
                  cx="215"
                  cy="172"
                  rx="192"
                  ry="138"
                  transform="rotate(22 215 172)"
                  stroke="#3B82F6"
                  strokeOpacity="0.4"
                  strokeWidth="1.3"
                />
              </svg>

              {/* Emerald Smiley Sticker */}
              <div className="absolute top-3 left-3 sm:left-5 z-30 -rotate-[8deg] drop-shadow-sm">
                <GreenSmileySticker className="w-12 h-12 sm:w-13 sm:h-13" />
              </div>

              {/* Tilted Slate Gradient Backdrop */}
              <div
                className="relative mx-auto w-[86%] sm:w-[348px] h-[330px] sm:h-[358px] bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-[50px] rotate-[4deg] shadow-[0_16px_36px_rgba(0,0,0,0.5)] border border-[#1F2937] z-10"
                aria-hidden="true"
              />

              {/* Studio Portrait Cutout */}
              <div className="absolute inset-x-0 -top-4 sm:-top-5 z-20 flex justify-center pointer-events-none">
                {!portraitError ? (
                  <img
                    src="/assets/portfolio/shoaib_portrait.png"
                    alt={`${currentProfile.name || PROFILE.name}, Full-Stack Developer`}
                    referrerPolicy="no-referrer"
                    onError={() => setPortraitError(true)}
                    className="w-[335px] sm:w-[376px] h-auto object-contain select-none drop-shadow-[0_10px_22px_rgba(0,0,0,0.5)]"
                  />
                ) : (
                  <div className="w-[320px] h-[340px] flex items-center justify-center font-display font-bold text-6xl text-[var(--accent-primary)]">
                    SH
                  </div>
                )}
              </div>

              {/* Overlapping Dark Contact Card */}
              <div className="relative z-30 -mt-20 sm:-mt-24 ml-1 sm:ml-3 w-[90%] sm:w-[318px] bg-[var(--bg-card)] rounded-[22px] px-5 sm:px-6 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.5)] border border-[var(--border-primary)] -rotate-[1.2deg]">
                <div className="flex items-baseline justify-between gap-3 mb-3.5">
                  <h2 className="relative inline-block font-extrabold text-[18px] sm:text-[19.5px] tracking-tight text-[var(--text-primary)]">
                    <span>{currentProfile.name || PROFILE.name}</span>
                    {/* Thin amber underline replacing yellow highlighter */}
                    <span
                      className="block h-[2px] w-full bg-[var(--accent-secondary)] rounded-full mt-0.5"
                      aria-hidden="true"
                    />
                  </h2>
                  <span className="text-[11.5px] font-bold text-[var(--accent-primary)] whitespace-nowrap">
                    {pronounsText}
                  </span>
                </div>

                <ul className="space-y-2.5 text-[12.5px] font-medium text-[var(--text-secondary)]">
                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 flex items-center justify-center shrink-0 text-[var(--text-muted)]">
                      <MapPin className="w-4 h-4 fill-[var(--text-secondary)] text-[var(--bg-card)]" />
                    </span>
                    <span>{currentProfile.location || PROFILE.location}</span>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleCopy(currentProfile.email || PROFILE.email, 'email')}
                      className="w-full flex items-center gap-3 text-left hover:text-[var(--accent-primary)] transition-colors cursor-pointer"
                      title="Click to copy email"
                    >
                      <span className="w-5 h-5 flex items-center justify-center shrink-0 text-[var(--text-muted)]">
                        <Mail className="w-4 h-4 stroke-[1.8]" />
                      </span>
                      <span className="truncate">{currentProfile.email || PROFILE.email}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleCopy(`https://${currentProfile.website || PROFILE.website}`, 'website URL')}
                      className="w-full flex items-center gap-3 text-left hover:text-[var(--accent-primary)] transition-colors cursor-pointer"
                      title="Click to copy website"
                    >
                      <span className="w-5 h-5 flex items-center justify-center shrink-0 text-[var(--text-muted)]">
                        <Globe className="w-4 h-4 stroke-[1.8]" />
                      </span>
                      <span>{currentProfile.website || PROFILE.website}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleCopy(`https://${currentProfile.linkedin || PROFILE.linkedin}`, 'LinkedIn URL')}
                      className="w-full flex items-center gap-3 text-left hover:text-[var(--accent-primary)] transition-colors cursor-pointer"
                      title="Click to copy LinkedIn profile"
                    >
                      <span className="w-5 h-5 flex items-center justify-center shrink-0">
                        <span className="w-4 h-4 rounded-[4px] border-[1.6px] border-[var(--text-secondary)] flex items-center justify-center text-[9px] font-extrabold leading-none text-[var(--text-secondary)]">
                          in
                        </span>
                      </span>
                      <span className="truncate">{currentProfile.linkedin || PROFILE.linkedin}</span>
                    </button>
                  </li>
                </ul>
              </div>

              {/* Amber Curly Spring Doodle at bottom-right */}
              <div className="hidden sm:block absolute bottom-2 -right-3 z-20 pointer-events-none">
                <CoralCurlySpring color="#F59E0B" className="w-12 h-24" />
              </div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT ME SECTION ================= */}
        <section
          id="tentang"
          className="scroll-mt-24 py-8 sm:py-11 grid grid-cols-1 lg:grid-cols-12 items-center gap-7 lg:gap-6 relative"
        >
          <span id="about" className="sr-only" aria-hidden="true" />
          {/* Left Heading: About me! */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <h2 className="font-display font-extrabold text-[var(--accent-primary)] text-[36px] sm:text-[42px] leading-[1.02]">
              <span className="block">{t.about.titlePrefix}</span>
              <span className="inline-flex items-center gap-2.5">
                <span>{t.about.titleSuffix}</span>
                <WavyUnderlineRed className="w-12 h-2.5 translate-y-0.5" />
              </span>
            </h2>
            <BlueDoubleUnderline className="w-20 h-3 mt-1" />
          </div>

          {/* Center Bio Paragraph */}
          <div className="lg:col-span-5">
            <p className="text-[14.5px] sm:text-[15px] font-medium text-[var(--text-secondary)] leading-[1.7] max-w-[440px]">
              {aboutBioText}
            </p>
          </div>

          {/* Right Lavender Brush Quote */}
          <div className="lg:col-span-4 flex items-center justify-start lg:justify-end gap-3">
            <FourPointStar color="#10B981" size={28} className="shrink-0" />
            <LavenderBrushQuote />
          </div>
        </section>

        {/* ================= WHAT I DO SECTION ================= */}
        <section className="py-9 sm:py-12 relative">
          <div className="flex items-center gap-3 mb-7">
            <h2 className="font-display font-extrabold text-[var(--accent-primary)] text-[32px] sm:text-[38px] leading-tight">
              {t.services.heading}
            </h2>
            <CloudSquiggle className="w-10 h-6 translate-y-1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {currentServices.map((service, idx) => {
              const serviceTitle = isId && (service as any).title_id ? (service as any).title_id : service.title;
              const serviceDesc = isId && (service as any).description_id ? (service as any).description_id : service.description;

              return (
                <button
                  key={service.id || `service-${idx}`}
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="group text-left bg-[var(--bg-card)] rounded-[22px] p-5 sm:p-6 shadow-[0_8px_26px_rgba(0,0,0,0.25)] border border-[var(--border-primary)] hover:border-[var(--accent-primary)]/50 hover:bg-[var(--bg-card-muted)] hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(0,0,0,0.35)] transition-all duration-200 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div
                      className="w-12 h-12 rounded-[16px] flex items-center justify-center mb-5 border border-white/5"
                      style={{ backgroundColor: service.iconBg }}
                    >
                      {renderServiceIcon(service.iconType)}
                    </div>
                    <h3 className="font-bold text-[16px] text-[var(--text-primary)] mb-2">{serviceTitle}</h3>
                    <p className="text-[12.5px] text-[var(--text-secondary)] leading-[1.58]">{serviceDesc}</p>
                  </div>

                  <div className="mt-5 flex justify-end">
                    <span className="inline-flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-1 transition-all duration-150">
                      <ArrowRight className="w-4 h-4 stroke-[2]" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Horizontal Blue Curly Squiggle under right side of cards */}
          <div className="flex justify-end pr-8 sm:pr-32 mt-3 pointer-events-none">
            <BlueHorizontalSpring className="w-28 h-7" />
          </div>
        </section>

        {/* ================= SELECTED WORK SECTION ================= */}
        <section id="karya" className="scroll-mt-24 py-8 sm:py-11 relative">
          <span id="work" className="sr-only" aria-hidden="true" />
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8">
            <div>
              <h2 className="font-display font-extrabold text-[var(--accent-primary)] text-[33px] sm:text-[39px] leading-none">
                {t.work.heading}
              </h2>
              <GreenHighlighterSwoosh className="w-56 sm:w-64 h-3.5 mt-1.5" />
            </div>

            <div className="flex items-center gap-3 self-start sm:self-end">
              <p className="text-[12.5px] sm:text-[13px] font-medium text-[var(--text-secondary)] leading-[1.48] max-w-[220px]">
                {t.work.subheading}
              </p>
              <CoffeeMugDoodle className="w-12 h-14 shrink-0 -mt-2" />
            </div>
          </div>

          {/* Optional Active Skill Filter Bar */}
          {selectedSkill && (
            <div className="mb-5 flex items-center justify-between bg-[var(--bg-card)] rounded-xl px-4 py-2.5 border border-[var(--accent-primary)]/30 text-xs font-semibold text-[var(--text-primary)]">
              <span>
                {t.work.filterActive} <span className="text-[var(--accent-primary)] font-bold">{selectedSkill}</span> (
                {displayedProjects.length})
              </span>
              <button
                type="button"
                onClick={() => setSelectedSkill(null)}
                className="text-[var(--accent-primary)] hover:underline cursor-pointer"
              >
                {t.work.resetFilter}
              </button>
            </div>
          )}

          {/* Margin Doodles around Project Cards */}
          <div className="relative">
            {/* Top-left subtle burst lines */}
            <div className="hidden xl:block absolute -left-11 -top-5 pointer-events-none -rotate-45">
              <ThreeBurstTicks color="#475569" className="w-10 h-8" />
            </div>

            {/* Bottom-left tiny amber + */}
            <div className="hidden lg:block absolute -left-8 bottom-16 pointer-events-none">
              <PlusSparkle color="#F59E0B" size={16} />
            </div>

            {/* Far-right emerald curly spring */}
            <div className="hidden xl:block absolute -right-12 top-14 pointer-events-none">
              <CoralCurlySpring color="#10B981" className="w-10 h-20" />
            </div>

            {/* Bottom-right amber 4-point sparkle */}
            <div className="hidden lg:block absolute -right-9 bottom-12 pointer-events-none">
              <FourPointStar color="#F59E0B" size={20} />
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {displayedProjects.map((project, idx) => {
                const category = isId && (project as any).category_id ? (project as any).category_id : project.category;
                const description = isId && (project as any).description_id ? (project as any).description_id : project.description;

                return (
                  <article
                    key={project.id || `project-${project.title}-${idx}`}
                    onClick={() => setSelectedProject(project)}
                    className="group bg-[var(--bg-card)] rounded-[20px] overflow-hidden shadow-[0_8px_26px_rgba(0,0,0,0.25)] border border-[var(--border-primary)] hover:border-[var(--accent-primary)]/50 hover:bg-[var(--bg-card-muted)] hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(0,0,0,0.35)] transition-all duration-200 flex flex-col cursor-pointer"
                  >
                    {/* Device Mockup Header */}
                    <div
                      className="h-[150px] w-full overflow-hidden border-b border-[var(--border-primary)]"
                      style={{ backgroundColor: project.headerBg }}
                    >
                      <ProjectMockup type={project.mockupType} />
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-[15px] text-[var(--text-primary)]">{project.title}</h3>
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block"
                            style={{ backgroundColor: project.dotColor }}
                            aria-hidden="true"
                          />
                        </div>
                        <div
                          className="text-[12px] font-semibold mt-0.5"
                          style={{ color: project.categoryColor }}
                        >
                          {category}
                        </div>
                        <p className="text-[12.5px] text-[var(--text-secondary)] leading-[1.52] mt-2.5 mb-4">
                          {description}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[var(--accent-primary)] group-hover:gap-2.5 transition-all whitespace-nowrap cursor-pointer"
                      >
                        <span>{t.work.viewCaseStudy}</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.3]" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* See All Projects Button + Amber Burst Lines */}
          <div className="mt-9 flex items-center justify-center">
            <div className="relative inline-flex items-center">
              <button
                type="button"
                onClick={() => {
                  setSelectedSkill(null);
                  setShowAllProjects((prev) => !prev);
                }}
                className="bg-[var(--bg-card)] hover:bg-[var(--bg-card-muted)] text-[var(--text-primary)] border border-[var(--border-primary)] hover:border-[var(--accent-primary)]/60 text-[12.5px] font-semibold px-5 py-2.5 rounded-xl inline-flex items-center gap-2 shadow-sm transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
              >
                <span>{showAllProjects ? t.work.showFeatured : t.work.seeAll}</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2]" />
              </button>

              {/* Amber 3-ray burst beside button */}
              <svg
                viewBox="0 0 24 26"
                fill="none"
                className="w-6 h-6 ml-2.5 pointer-events-none"
                aria-hidden="true"
              >
                <path
                  d="M3 7L14 3M4 13H16M3 19L14 23"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* ================= EXPERIENCE · EDUCATION · SKILLS ================= */}
        <section id="keahlian" className="scroll-mt-24 pt-8 pb-16 sm:pb-20 relative">
          <span id="skills" className="sr-only" aria-hidden="true" />
          {/* Steel blue outline 4-point star above Experience/Education gap */}
          <div className="hidden lg:block absolute top-3 left-[29%] pointer-events-none">
            <FourPointStar color="#3B82F6" size={22} outline />
          </div>

          {/* Amber curly spring at bottom-left of Experience */}
          <div className="hidden lg:block absolute -left-8 bottom-8 pointer-events-none -rotate-12">
            <CoralCurlySpring color="#F59E0B" className="w-11 h-22" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
            {/* Column 1: Experience Blob */}
            <div className="lg:col-span-4 blob-experience bg-[var(--blob-exp-bg)] border border-[var(--blob-exp-border)] px-7 sm:px-8 py-8 relative rounded-[28px]">
              <h2 className="font-display font-bold text-[24px] text-[var(--accent-primary)] mb-6">
                {t.experience.heading}
              </h2>

              <div className="relative pl-5 space-y-6 before:content-[''] before:absolute before:left-[5px] before:top-2 before:bottom-4 before:w-[1.5px] before:bg-[var(--accent-primary)]/35">
                {currentExperience.map((item: any, idx: number) => {
                  const period = isId && item.period_id ? item.period_id : item.period_en;
                  const role = isId && item.role_id ? item.role_id : item.role_en;

                  return (
                    <div key={item.id || `exp-${idx}-${item.period_en || item.organization}`} className="relative">
                      <span
                        className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-[var(--accent-primary)] ring-4 ring-[var(--blob-exp-bg)]"
                        aria-hidden="true"
                      />
                      <div className="font-bold text-[12.5px] text-[var(--text-primary)] tabular-nums">
                        {period}
                      </div>
                      <div className="text-[12.5px] font-semibold text-[var(--text-primary)] mt-0.5">
                        {role}
                      </div>
                      <div className="text-[12px] text-[var(--text-secondary)]">{item.organization}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Education Blob */}
            <div className="lg:col-span-4 relative blob-education bg-[var(--blob-edu-bg)] border border-[var(--blob-edu-border)] px-7 sm:px-8 py-8 pb-12 rounded-[28px]">
              <h2 className="font-display font-bold text-[24px] text-[var(--accent-primary)] mb-6">
                {t.education.heading}
              </h2>

              <div className="relative pl-5 space-y-6 before:content-[''] before:absolute before:left-[5px] before:top-2 before:bottom-4 before:w-[1.5px] before:bg-[var(--accent-secondary)]/40">
                {currentEducation.map((item: any, idx: number) => {
                  const role = isId && item.role_id ? item.role_id : item.role_en;

                  return (
                    <div key={item.id || `edu-${idx}-${item.period || item.organization}`} className="relative">
                      <span
                        className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-[var(--accent-secondary)] ring-4 ring-[var(--blob-edu-bg)]"
                        aria-hidden="true"
                      />
                      <div className="font-bold text-[12.5px] text-[var(--text-primary)] tabular-nums">
                        {item.period}
                      </div>
                      <div className="text-[12.5px] font-semibold text-[var(--text-primary)] mt-0.5">
                        {role}
                      </div>
                      <div className="text-[12px] text-[var(--text-secondary)]">{item.organization}</div>
                    </div>
                  );
                })}
              </div>

              {/* Hand-drawn Graduation Cap at bottom-right */}
              <div className="absolute -bottom-3 right-5 pointer-events-none">
                <GraduationCapDoodle className="w-16 h-12" />
              </div>
            </div>

            {/* Column 3: Skills Blob */}
            <div className="lg:col-span-4 relative blob-skills bg-[var(--blob-skills-bg)] border border-[var(--blob-skills-border)] px-7 sm:px-8 py-8 rounded-[28px]">
              {/* Steel blue 8-ray Asterisk Star at top-right */}
              <div className="absolute -top-5 right-3 pointer-events-none">
                <AsteriskStar color="#3B82F6" className="w-13 h-13" />
              </div>

              <h2 className="font-display font-bold text-[24px] text-[var(--accent-primary)] mb-6">
                {t.skills.heading}
              </h2>

              <div className="flex flex-wrap gap-2.5">
                {currentSkillsList.map((skill, idx) => {
                  const active = selectedSkill === skill;
                  return (
                    <button
                      key={`skill-${skill}-${idx}`}
                      type="button"
                      onClick={() => {
                        const next = active ? null : skill;
                        setSelectedSkill(next);
                        if (next) {
                          document.querySelector('#karya')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                      }}
                      className={`px-3.5 py-2 rounded-lg text-[12px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                        active
                          ? 'bg-[var(--accent-primary)] text-white shadow-sm ring-2 ring-blue-400/40'
                          : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-primary)] shadow-[0_2px_6px_rgba(0,0,0,0.15)] hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)]'
                      }`}
                      title={`${t.skills.filterTooltip}: ${skill}`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= BOTTOM CTA WAVE BANNER / FOOTER ================= */}
      <footer id="kontak" className="relative mt-2 pt-8 pb-8 overflow-hidden scroll-mt-20">
        <span id="contact" className="sr-only" aria-hidden="true" />
        {/* Masculine Dark Steel Wave Shape */}
        <svg
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          <path
            d="M70 34C270 10 530 14 785 48C1015 79 1245 56 1440 26V240H95C62 195 44 92 70 34Z"
            fill="var(--footer-wave-bg)"
          />
        </svg>

        <div className="relative z-10 max-w-[1060px] mx-auto px-5 sm:px-8 pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left CTA Headline */}
          <div className="max-w-xl">
            <h2 className="font-display font-bold text-[24px] sm:text-[29px] leading-[1.24] text-[var(--accent-primary)]">
              {t.footer.prompt}
            </h2>
            <p className="font-display font-bold text-[24px] sm:text-[29px] leading-[1.26] mt-0.5">
              <span className="text-[var(--accent-primary)]">{t.footer.letsBuild} </span>
              <span className="relative inline-block text-[var(--text-primary)]">
                {t.footer.something}
                <BlueDoubleUnderline className="w-full h-3 -mt-1" />
              </span>{' '}
              <span className="text-[var(--text-primary)]">{t.footer.amazingTogether}</span>
            </p>
          </div>

          {/* Center Amber Star & Loop Arrow */}
          <div className="hidden lg:flex items-center gap-3 -mt-2 pointer-events-none">
            <AsteriskStar color="#F59E0B" className="w-11 h-11 -mt-5" />
            <FooterLoopArrow className="w-16 h-12 translate-y-2" />
          </div>

          {/* Right Action & Social Links */}
          <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
            <button
              type="button"
              onClick={() => openInquiry('New Project Inquiry')}
              className="bg-[var(--accent-primary)] hover:bg-[#2563EB] text-white text-[13.5px] font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2.5 shadow-[0_8px_20px_rgba(59,130,246,0.28)] transition-transform duration-150 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
            >
              <span>{t.footer.getInTouch}</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
            </button>

            <div className="flex items-center gap-2.5">
              <span className="text-[12px] font-bold text-[var(--text-secondary)] mr-1 whitespace-nowrap">
                {t.footer.letsConnect}
              </span>

              {/* LinkedIn */}
              <button
                type="button"
                onClick={() => handleCopy(`https://${currentProfile.linkedin || PROFILE.linkedin}`, 'LinkedIn link')}
                className="w-7 h-7 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)] hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] hover:text-white flex items-center justify-center text-[11px] font-extrabold transition-colors cursor-pointer"
                aria-label="Copy LinkedIn profile link"
              >
                in
              </button>

              {/* GitHub */}
              <button
                type="button"
                onClick={() => handleCopy(`https://${currentProfile.github || PROFILE.github}`, 'GitHub link')}
                className="w-7 h-7 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)] hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Copy GitHub profile link"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.35 1.12 2.92.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
                </svg>
              </button>

              {/* Twitter / X */}
              <button
                type="button"
                onClick={() => handleCopy(`https://${currentProfile.twitter || PROFILE.twitter}`, 'X / Twitter link')}
                className="w-7 h-7 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)] hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Copy Twitter profile link"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M22 5.92c-.74.33-1.53.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27 8.2 8.2 0 0 1-2.6.99 4.1 4.1 0 0 0-7 3.74A11.65 11.65 0 0 1 3.39 4.7a4.1 4.1 0 0 0 1.27 5.48c-.67-.02-1.3-.2-1.86-.51v.05c0 1.99 1.41 3.65 3.29 4.02-.6.16-1.24.2-1.85.07a4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.38a11.6 11.6 0 0 0 6.29 1.84c7.55 0 11.68-6.25 11.68-11.67 0-.18 0-.36-.01-.53A8.35 8.35 0 0 0 22 5.92Z" />
                </svg>
              </button>

              {/* Instagram */}
              <button
                type="button"
                onClick={() => handleCopy(`https://${currentProfile.instagram || PROFILE.instagram}`, 'Instagram link')}
                className="w-7 h-7 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)] hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Copy Instagram profile link"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" className="w-3.5 h-3.5" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= INTERACTIVE MODALS ================= */}
      <CaseStudyModal
        project={selectedProject}
        lang={lang}
        onClose={() => setSelectedProject(null)}
        onInquire={(projectName) => openInquiry(`Project like ${projectName}`)}
      />

      <ServiceDetailModal
        service={selectedService}
        lang={lang}
        onClose={() => setSelectedService(null)}
        onStartProject={(serviceTitle) => openInquiry(serviceTitle)}
      />

      <ContactModal
        isOpen={contactOpen}
        initialSubject={contactSubject}
        profileEmail={currentProfile.email || PROFILE.email}
        lang={lang}
        onClose={() => setContactOpen(false)}
      />

      <CVModal
        isOpen={cvOpen}
        profile={currentProfile}
        experience={currentExperience}
        education={currentEducation}
        skills={currentSkillsList}
        lang={lang}
        onClose={() => setCvOpen(false)}
      />
    </div>
  );
}
