import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Play, CheckCircle2, MessageSquare, ArrowUpRight, TrendingUp } from 'lucide-react';
import { ActivePage } from '../types';
import { SERVICES, BLOG_ARTICLES } from '../data';

interface StatCardProps {
  key?: React.Key;
  num: string;
  label: string;
  desc: string;
  index: number;
  isStatsAnimated: boolean;
  reducedMotion: boolean;
}

function StatCard({ num, label, desc, index, isStatsAnimated, reducedMotion }: StatCardProps) {
  const [currentVal, setCurrentVal] = useState(0);

  const match = num.match(/^(\d+)(.*)$/);
  const targetVal = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    if (!isStatsAnimated) return;
    if (reducedMotion) {
      setCurrentVal(targetVal);
      return;
    }

    const staggerDelay = setTimeout(() => {
      const duration = 900;
      const startTimestamp = performance.now();

      const step = (timestamp: number) => {
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuad = (t: number) => t * (2 - t);
        const easedProgress = easeOutQuad(progress);
        
        setCurrentVal(Math.round(easedProgress * targetVal));

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    }, index * 120);

    return () => clearTimeout(staggerDelay);
  }, [isStatsAnimated, targetVal, index, reducedMotion]);

  return (
    <div 
      className={`bg-white border border-[#F2A64A]/15 rounded-2xl p-8 flex flex-col justify-between shadow-sm transition-all duration-500 ease-out cursor-default transform ${
        isStatsAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
      } hover:-translate-y-1 hover:border-[#F2A64A]/40 hover:shadow-md`}
      style={{
        transitionDelay: reducedMotion ? '0ms' : `${index * 120}ms`,
      }}
    >
      <div className="space-y-2 relative z-10">
        <h3 className="text-5xl sm:text-6xl font-display font-black tracking-tighter bg-gradient-to-r from-brand-red to-orange-500 bg-clip-text text-transparent">
          {isStatsAnimated ? `${currentVal}${suffix}` : `0${suffix}`}
        </h3>
        <h4 className="text-sm font-bold uppercase tracking-wider text-[#1A1710]/90">
          {label}
        </h4>
      </div>
      <p className="text-xs text-[#1A1710]/75 leading-relaxed mt-6 relative z-10">
        {desc}
      </p>
    </div>
  );
}

interface HomeViewProps {
  setActivePage: (page: ActivePage) => void;
}

export default function HomeView({ setActivePage }: HomeViewProps) {
  // Carousel state for hero cards
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // How We Work section states
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [turnaroundHours, setTurnaroundHours] = useState(0);

  // Stats section states
  const statsSectionRef = useRef<HTMLElement | null>(null);
  const [isStatsAnimated, setIsStatsAnimated] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    if (reducedMotion) {
      setIsAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimated(true);
          observer.unobserve(currentSection);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(currentSection);

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [reducedMotion]);

  useEffect(() => {
    const currentStatsSection = statsSectionRef.current;
    if (!currentStatsSection) return;

    if (reducedMotion) {
      setIsStatsAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsAnimated(true);
          observer.unobserve(currentStatsSection);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(currentStatsSection);

    return () => {
      if (currentStatsSection) {
        observer.unobserve(currentStatsSection);
      }
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!isAnimated) return;
    if (reducedMotion) {
      setTurnaroundHours(48);
      return;
    }

    const startDelay = setTimeout(() => {
      const duration = 800;
      const startTimestamp = performance.now();

      const step = (timestamp: number) => {
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuad = (t: number) => t * (2 - t);
        const easedProgress = easeOutQuad(progress);
        
        const currentVal = Math.round(easedProgress * 48);
        setTurnaroundHours(currentVal);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    }, 750);

    return () => clearTimeout(startDelay);
  }, [isAnimated, reducedMotion]);

  const heroNewsSlides = [
    {
      tag: 'PRODUCTION',
      title: 'High-Fidelity AI Video Campaigns',
      desc: 'Bypassing physical shoots with ultra-real cinematic AI films that connect with high-intent buyers.',
    },
    {
      tag: 'AUTOMATION',
      title: 'WhatsApp CRM Built Into Campaigns',
      desc: 'Every click to chat is processed under 60 seconds with our custom lead qualifying flows.',
    },
    {
      tag: 'TRENDS 2026',
      title: "What's Next in AI Video Production",
      desc: 'High-fidelity generative physics engines are changing visual narratives. Read our full analysis.',
    }
  ];

  const handleNextSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroNewsSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + heroNewsSlides.length) % heroNewsSlides.length);
  };

  const handleServiceClick = (slug: ActivePage) => {
    setActivePage(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* SECTION 1: ECLIPSE HERO */}
      <section className="relative eclipse-bg pt-20 pb-24 md:pt-28 md:pb-32 px-4 border-b border-white/5" id="hero-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium tracking-wider text-brand-red">
              <span className="flex h-2 w-2 rounded-full bg-brand-red animate-ping" />
              AI-FIRST CREATIVE STUDIO &middot; BENGALURU
            </div>
            
            <h1 className="font-display font-black leading-tight text-white tracking-tight hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Create in the AI Age, <span className="gradient-text-clip">Cinematically.</span>
            </h1>
            
            <p className="text-text-grey text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-light">
              High-fidelity video production, Meta lead acquisition campaigns, and custom WhatsApp automation. Built from the ground up for speed, craft, and serious ROI. Operated from Jayanagar, Bengaluru.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-lg bg-brand-red text-white text-sm font-bold hover:bg-brand-red-hover transition-colors shadow-lg shadow-brand-red/20 text-center cursor-pointer"
                id="hero-cta-contact"
              >
                Request a custom pilot
              </button>
              <a
                href="#studio-stack"
                className="px-8 py-4 rounded-lg border border-white/20 text-white text-sm font-bold hover:border-white hover:bg-white/5 transition-all text-center"
                id="hero-cta-why"
              >
                Why Pravibe
              </a>
            </div>
          </div>

          {/* Hero Right Content: 3 News-Style Cards Carousel */}
          <div className="lg:col-span-5 relative">
            <div className="relative glass-card p-8 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-red to-orange-500" />
              
              <div className="flex justify-between items-center mb-6">
                <span className="px-2.5 py-1 rounded bg-brand-red/10 border border-brand-red/20 text-[10px] font-mono font-bold text-brand-red tracking-wider">
                  {heroNewsSlides[currentHeroSlide].tag}
                </span>
                <span className="text-xs font-mono text-text-muted">
                  0{currentHeroSlide + 1} &mdash; 03
                </span>
              </div>

              {/* Slide content wrapper to trigger transition */}
              <div className="min-h-[140px] flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-xl text-white leading-snug mb-3">
                    {heroNewsSlides[currentHeroSlide].title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {heroNewsSlides[currentHeroSlide].desc}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5">
                <button
                  onClick={() => setActivePage('contact')}
                  className="text-xs font-bold text-white hover:text-brand-red flex items-center gap-1.5 transition-colors cursor-pointer"
                  id="hero-carousel-action"
                >
                  Request full details <ArrowRight className="h-3.5 w-3.5" />
                </button>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevSlide}
                    className="h-8 w-8 rounded-full border border-white/10 hover:border-white hover:bg-white/5 text-text-grey hover:text-white flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Previous Slide"
                    id="hero-carousel-prev"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="h-8 w-8 rounded-full border border-white/10 hover:border-white hover:bg-white/5 text-text-grey hover:text-white flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Next Slide"
                    id="hero-carousel-next"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Ambient Background blur behind the carousel */}
            <div className="absolute -inset-4 bg-brand-red/10 rounded-3xl filter blur-xl opacity-30 -z-10 pointer-events-none" />
          </div>

        </div>
      </section>

      {/* SECTION 2: STUDIO SPLIT & SERVICES GRID */}
      <section className="py-24 px-4 bg-bg-black" id="studio-stack">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono font-semibold tracking-widest text-brand-red uppercase block">
                The Pravibe Studio Stack
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-none">
                Fast to launch. <span className="gradient-text-clip">Built for the AI era.</span>
              </h2>
              <p className="text-text-grey text-base sm:text-lg max-w-3xl leading-relaxed">
                Traditional agencies are slow, heavy, and operate with bloated overhead. Pravibe matches the best of AI models with pixel-perfect design, targeted copywriting, and automated workflows to launch campaigns in days, not months.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-wrap gap-4 lg:justify-end">
              <button
                onClick={() => {
                  setActivePage('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:border-white hover:bg-white/10 text-xs font-bold transition-all cursor-pointer"
                id="stack-cta-services"
              >
                Discover the studio
              </button>
              <button
                onClick={() => {
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-lg bg-brand-red text-white text-xs font-bold hover:bg-brand-red-hover transition-colors shadow-md shadow-brand-red/10 cursor-pointer"
                id="stack-cta-sample"
              >
                Request a free demo
              </button>
            </div>
          </div>

          {/* Two Ribbon Banners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-brand-red/10 to-orange-500/10 border border-brand-red/20 rounded-xl py-4 px-6 flex items-center justify-between text-xs font-mono font-medium tracking-wide text-white">
              <span>🌟 STREAK: 100+ FILMS SHIPPED IN 2026</span>
              <span className="text-brand-red font-bold">ACTIVE &rarr;</span>
            </div>
            <div className="bg-gradient-to-r from-orange-500/10 to-brand-red/10 border border-orange-500/20 rounded-xl py-4 px-6 flex items-center justify-between text-xs font-mono font-medium tracking-wide text-white">
              <span>⚡ TURNAROUND: COMPLETED WITHIN 48 HOURS</span>
              <span className="text-orange-500 font-bold">GUARANTEED &rarr;</span>
            </div>
          </div>

          {/* 2x3 Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="group glass-card p-8 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Icon Header */}
                  <div className="h-12 w-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-brand-red/10 group-hover:border-brand-red/30 transition-all text-brand-red">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-white mb-2 tracking-tight group-hover:text-brand-red transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {srv.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => handleServiceClick(srv.slug)}
                    className="text-xs font-bold text-white group-hover:text-brand-red flex items-center gap-1.5 transition-colors cursor-pointer"
                    id={`srv-grid-btn-${srv.id}`}
                  >
                    View full guide &rarr;
                  </button>
                  <span className="text-[10px] font-mono text-text-muted/40 group-hover:text-brand-red/40 transition-colors">
                    01/06
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: GLOWING GRADIENT DIVIDER */}
      <div className="glowing-divider w-full" />

      {/* SECTION 4: PROCESS / PIPELINE SECTION */}
      <section ref={sectionRef} className="py-24 px-4 bg-[#0B0E1A]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-semibold tracking-widest text-brand-red uppercase block">
              How we work
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              From brief to launch, <span className="gradient-text-clip">step by step.</span>
            </h2>
            <p className="text-text-grey text-base sm:text-lg">
              We operate with high agency, low friction, and zero hand-holding. Here is the exact production timeline we run for every single campaign.
            </p>
          </div>

          {/* Numbered Pipeline Grid */}
          <div className="relative">
            {/* Desktop Horizontal Connecting Line Segments */}
            {[0, 1, 2, 3].map((segIdx) => (
              <div
                key={segIdx}
                className="hidden lg:block absolute h-[2px] bg-white/5 -z-0 overflow-hidden transition-all duration-300"
                style={{
                  left: `${10 + segIdx * 20}%`,
                  width: '20%',
                  top: '44px',
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-brand-red to-orange-500 transition-all ease-out origin-left"
                  style={{
                    transform: isAnimated ? 'scaleX(1)' : 'scaleX(0)',
                    transitionDuration: reducedMotion ? '0ms' : '300ms',
                    transitionDelay: reducedMotion ? '0ms' : `${segIdx * 150 + 75}ms`,
                    opacity: hoveredCardIdx === segIdx || hoveredCardIdx === segIdx + 1 ? 0.6 : 0.2,
                  }}
                />
              </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
              {[
                { step: '01', title: 'Discovery Call', desc: 'A focused 30-minute alignment session to define target audience, campaign hooks, and exact production requirements.' },
                { step: '02', title: 'Script & Storyboard', desc: 'Within 24 hours, we deliver a completed script and generative AI art storyboards illustrating the creative mood.' },
                { step: '03', title: 'AI Production', desc: 'Our studio generates hyper-realistic video renders, localized voiceovers, and premium visual layout concepts.' },
                { step: '04', title: 'Edit & Sound Design', desc: 'Experienced human designers refine visual transitions, grade colors, and layer robust audio and SFX.' },
                { step: '05', title: 'Launch & Distribute', desc: 'We ship the completed campaign, deploy WhatsApp CRM qualifying logic, and set scaling rules on Meta.' }
              ].map((p, idx) => (
                <div 
                  key={p.step} 
                  onMouseEnter={() => setHoveredCardIdx(idx)}
                  onMouseLeave={() => setHoveredCardIdx(null)}
                  className={`group/step space-y-4 bg-card-bg/20 border border-border-grey/50 p-6 rounded-xl relative transition-all duration-500 ease-out cursor-default ${
                    isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  } ${reducedMotion ? '' : 'hover:-translate-y-1 hover:border-brand-red/30 hover:bg-card-bg/40'}`}
                  style={{
                    transitionDelay: reducedMotion ? '0ms' : `${idx * 150}ms`
                  }}
                >
                  <div 
                    className={`h-14 w-14 rounded-full bg-gradient-to-br from-brand-red to-orange-500 flex items-center justify-center text-white font-mono font-bold text-lg shadow-lg shadow-brand-red/10 group-hover/step:scale-105 group-hover/step:brightness-125 group-hover/step:shadow-brand-red/30 transition-all duration-300 ${
                      isAnimated && !reducedMotion ? 'circle-pulse-once' : ''
                    }`}
                    style={{
                      animationDelay: reducedMotion ? '0ms' : `${idx * 150}ms`,
                    }}
                  >
                    {p.step}
                  </div>
                  <h3 className="font-display font-bold text-lg text-white pt-2 group-hover/step:text-brand-red transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed group-hover/step:text-text-grey transition-colors duration-300">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div 
            className={`text-center pt-4 transition-all duration-700 ease-out ${
              isAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{
              transitionDelay: reducedMotion ? '0ms' : '750ms',
            }}
          >
            <p className="inline-block text-sm md:text-base text-text-grey bg-white/5 border border-white/10 py-3 px-6 rounded-lg font-medium">
              Typical brief-to-first-cut turnaround:{' '}
              <span className="font-bold gradient-text-clip min-w-[70px] inline-block text-center">
                {turnaroundHours} hours
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: FULL-BLEED GRADIENT TESTIMONIAL BAND */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#1A1030] via-[#5A2E6E] to-[#FFB347] py-24 px-4 text-center">
        {/* Overlay structure for background depth */}
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-10">
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
            Relentless creative output.<br />Best-in-class turnaround.
          </h2>

          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 sm:p-12 text-left space-y-6 max-w-3xl mx-auto shadow-2xl">
            <p className="text-white text-base sm:text-lg md:text-xl font-medium leading-relaxed italic">
              "Pravibe delivered a complete campaign — product films, social content and ad creative — at a speed and quality no traditional agency could match."
            </p>
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <div className="h-12 w-12 rounded-full bg-brand-red flex items-center justify-center text-white font-bold text-lg font-display shadow">
                GP
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Govinda Poojari</h4>
                <p className="text-xs text-white/70">Cheftalk Nutrifoods</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: LIGHT STATS SECTION (WHITE BACKGROUND) */}
      <section ref={statsSectionRef} className="py-24 px-4 bg-[#F7F4EE] text-[#1A1710]" id="stats-section">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#F2A64A] uppercase block">
              Impact
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#1A1710] tracking-tight leading-none">
              Performance without compromise.
            </h2>
            <p className="text-[#1A1710]/75 text-base sm:text-lg leading-relaxed font-normal">
              We hold ourselves strictly accountable to the spreadsheet. Here is the direct value we bring to our clients on every single partnership.
            </p>
          </div>

          {/* 2x2 Stat Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '70%', label: 'Cost Reduction', desc: 'Slashed physical overhead and production delay versus traditional ad shoots.' },
              { num: '48h', label: 'Turnaround Delivery', desc: 'Initial storyboards and high-fidelity video draft ready for your review.' },
              { num: '100+', label: 'Films Delivered', desc: 'Active, high-converting social assets engineered for targeted audiences.' },
              { num: '92%', label: 'Auto-Engaged Leads', desc: 'Inbound prospects instantly qualified and chatted with on WhatsApp CRM.' }
            ].map((stat, idx) => (
              <StatCard
                key={stat.label}
                num={stat.num}
                label={stat.label}
                desc={stat.desc}
                index={idx}
                isStatsAnimated={isStatsAnimated}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

          <div 
            className={`text-center transition-all duration-700 ease-out ${
              isStatsAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
            style={{
              transitionDelay: reducedMotion ? '0ms' : '1400ms',
            }}
          >
            <p className="text-xs font-mono text-[#1A1710]/50">
              *Averaged statistics collected across our 2025-2026 client campaigns.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: LATEST INSIGHTS TEASER */}
      <section className="py-24 px-4 bg-bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-4">
              <span className="text-xs font-mono font-semibold tracking-widest text-brand-red uppercase block">
                Deep Research
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
                Latest insights
              </h2>
            </div>
            <button
              onClick={() => {
                setActivePage('blog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-brand-red hover:text-brand-red-hover flex items-center gap-1 cursor-pointer"
              id="home-blog-teaser-more"
            >
              See all articles &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Featured Article - Left (Col Span 7) */}
            <div 
              onClick={() => {
                setActivePage(`blog-${BLOG_ARTICLES[0].id}` as ActivePage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="lg:col-span-7 bg-card-bg/40 border border-border-grey rounded-2xl overflow-hidden hover:border-brand-red/30 transition-all flex flex-col justify-between group cursor-pointer"
              id="featured-blog-card"
            >
              <div>
                <div className="aspect-video w-full relative overflow-hidden bg-white/5">
                  <img
                    src={BLOG_ARTICLES[0].photoUrl}
                    alt={BLOG_ARTICLES[0].id === 'prompt-to-film' ? "Illustration of a person and an AI robot shaking hands through a computer screen, representing human and AI collaboration." : BLOG_ARTICLES[0].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 bg-brand-red text-white text-[10px] font-mono font-bold px-2 py-1 rounded">
                    FEATURED
                  </span>
                </div>
                <div className="p-8 space-y-4">
                  <span className="text-[11px] font-mono text-brand-red font-semibold tracking-wider">
                    {BLOG_ARTICLES[0].category}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white group-hover:text-brand-red transition-colors leading-snug">
                    {BLOG_ARTICLES[0].title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {BLOG_ARTICLES[0].excerpt}
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0 border-t border-white/5 mt-4 flex justify-between items-center text-xs text-text-muted">
                <span>{BLOG_ARTICLES[0].date} &middot; {BLOG_ARTICLES[0].readTime}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePage(`blog-${BLOG_ARTICLES[0].id}` as ActivePage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="font-bold text-white group-hover:text-brand-red transition-colors cursor-pointer"
                  id="featured-blog-link"
                >
                  Read Article &rarr;
                </button>
              </div>
            </div>

            {/* Sub-articles list - Right (Col Span 5) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {BLOG_ARTICLES.slice(1, 4).map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    setActivePage(`blog-${art.id}` as ActivePage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group bg-card-bg/20 border border-border-grey/50 hover:border-brand-red/30 rounded-xl p-6 flex gap-4 cursor-pointer hover:bg-card-bg/40 transition-all"
                  id={`sub-article-${art.id}`}
                >
                  <div className="h-20 w-20 rounded-lg overflow-hidden shrink-0 bg-white/5">
                    <img
                      src={art.photoUrl}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="text-[9px] font-mono font-bold text-brand-red uppercase tracking-wider">
                      {art.category}
                    </span>
                    <h4 className="font-display font-bold text-sm text-white group-hover:text-brand-red transition-colors leading-snug">
                      {art.title}
                    </h4>
                    <p className="text-[11px] text-text-muted">
                      {art.date} &middot; {art.readTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: MOTIVATIONAL LINE STRIP */}
      <section className="py-20 px-4 bg-[#0B0E1A] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="font-display font-black italic text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-relaxed">
            "The companies that harness AI today will write the <span className="gradient-text-clip">market rules of tomorrow.</span>"
          </p>
        </div>
        {/* Subtle radial center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-red/10 rounded-full filter blur-3xl pointer-events-none" />
      </section>

      {/* SECTION 10: TRIPLE CTA PANEL */}
      <section className="py-24 px-4 bg-bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Build your content strategy', action: 'Plan a consult', desc: 'Audit your existing ad creative, identify leakage in your conversion funnel, and layout a high-velocity production plan.' },
            { title: 'Get a free demo video', action: 'Request sample render', desc: 'Provide us with your project details or product concept, and we will render a custom AI-first cinematic storyboard draft.' },
            { title: 'See the studio in action', action: 'Explore our studio', desc: 'Schedule a screen-share session to see our live AI generation, color grading, editing, and sound design workflow.' }
          ].map((cta, idx) => (
            <div key={cta.title} className="glass-card p-8 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <h3 className="font-display font-bold text-xl text-white tracking-tight">
                  {cta.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {cta.desc}
                </p>
              </div>
              <button
                onClick={() => {
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3.5 rounded-lg bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-brand-red/5 cursor-pointer"
                id={`triple-cta-${idx}`}
              >
                {cta.action} &rarr;
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
