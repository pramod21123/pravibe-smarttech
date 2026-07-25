import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Film, Sparkles, CheckCircle2, MessageSquare, ArrowUpRight, TrendingUp, TrendingDown, Clock, Megaphone, MessageSquareText, Cpu, Palette, Share2, Globe, Layout, Zap, Star, Quote } from 'lucide-react';
import { ActivePage } from '../types';
import { SERVICES, BLOG_ARTICLES, getOptimizedImageUrl } from '../data';

function HeroImageBackground() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0B0E1A]">
      {/* Ambient Pulsing Glow Halo behind the robot face on the right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[85%] sm:w-[55%] h-[85%] bg-gradient-to-l from-brand-red/35 via-[#F2A64A]/25 to-transparent blur-[60px] sm:blur-[120px] rounded-full pointer-events-none animate-hero-glow-pulse" />

      {/* Continuously Animated Hero Banner Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Instant low-res blur-up placeholder image (~5KB) */}
        <img
          src="https://lh3.googleusercontent.com/d/16bJxnLg2EQA5OJmH9NvOHGgP8NUd3TVA=w200"
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover object-[78%_center] sm:object-[85%_center] md:object-[85%_center] filter blur-xl scale-110 transition-opacity duration-500 ${
            isLoaded ? 'opacity-0' : 'opacity-80'
          }`}
        />

        {/* High performance optimized WebP CDN hero image (=w1600) */}
        <img
          src="https://lh3.googleusercontent.com/d/16bJxnLg2EQA5OJmH9NvOHGgP8NUd3TVA=w1600"
          alt="Pravibe Smarttech Hero Banner"
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          // @ts-ignore
          fetchPriority="high"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover object-[78%_center] sm:object-[85%_center] md:object-[85%_center] animate-banner-continuous transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== 'https://drive.google.com/uc?export=view&id=16bJxnLg2EQA5OJmH9NvOHGgP8NUd3TVA') {
              target.src = 'https://drive.google.com/uc?export=view&id=16bJxnLg2EQA5OJmH9NvOHGgP8NUd3TVA';
            }
            setIsLoaded(true);
          }}
        />
      </div>

      {/* Dynamic Animated Shimmer Light Ray Sweep across banner */}
      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-amber-400/15 to-transparent pointer-events-none animate-banner-shimmer" />

      {/* Gradient overlays: Dark left side for text readability, clear right side to highlight the robot face */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E1A] via-[#0B0E1A]/85 sm:via-[#0B0E1A]/70 md:via-[#0B0E1A]/65 to-transparent/30 sm:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E1A] via-transparent to-[#0B0E1A]/40" />
    </div>
  );
}

function ProductionShowcaseSection({ setActivePage }: { setActivePage: (page: ActivePage) => void }) {
  const [activeTab, setActiveTab] = useState<'video' | 'news'>('video');
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const heroNewsSlides = [
    {
      tag: "AGENCY REPLACEMENT",
      title: "Replace 3 traditional retainers with 1 unified AI Studio.",
      desc: "Stop paying for disconnected video editors, ad media buyers, and CRM coders. Pravibe combines all three under one accountable roof."
    },
    {
      tag: "SPEED TO MARKET",
      title: "From brief to live Meta campaign in under 72 hours.",
      desc: "Our automated pipeline generates high-fidelity visual assets, scripts ad hooks, and deploys WhatsApp follow-up bots at unmatched speed."
    },
    {
      tag: "ROAS & ACCURACY",
      title: "Engineered specifically for Indian buyer conversion.",
      desc: "Local audience nuances, direct WhatsApp triggers, and conversion API tracking configured to maximize your real return on ad spend."
    }
  ];

  const handleNextSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroNewsSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + heroNewsSlides.length) % heroNewsSlides.length);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuteState = !isMuted;
      videoRef.current.muted = nextMuteState;
      videoRef.current.volume = nextMuteState ? 0 : 1;
      setIsMuted(nextMuteState);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    if (isPlaying) {
      video.play().catch(() => {});
    }
  }, [activeTab, isMuted, isPlaying]);

  return (
    <div className="w-full relative">
      <div className="relative glass-card p-6 sm:p-8 shadow-2xl overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-[#0F1322]/90 max-w-4xl mx-auto">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-red via-orange-500 to-amber-400" />

        {/* Tab Header Selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1 rounded-xl bg-black/50 border border-white/10">
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer min-h-[42px] ${
                activeTab === 'video'
                  ? 'bg-brand-red text-white shadow-lg shadow-brand-red/25'
                  : 'text-text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <Film className="h-4 w-4 shrink-0" />
              <span>Production Reel Showcase</span>
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer min-h-[42px] ${
                activeTab === 'news'
                  ? 'bg-brand-red text-white shadow-lg shadow-brand-red/25'
                  : 'text-text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="h-4 w-4 shrink-0" />
              <span>Studio Capability Briefs</span>
            </button>
          </div>

          {activeTab === 'video' ? (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-400 self-start sm:self-center">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              HIGH-FIDELITY REEL
            </span>
          ) : (
            <span className="text-xs font-mono text-text-muted self-start sm:self-center">
              Brief 0{currentHeroSlide + 1} of 03
            </span>
          )}
        </div>

        {/* TAB 1: PRODUCTION MEDIA SHOWCASE */}
        {activeTab === 'video' ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center animate-in fade-in duration-300">
            <div className="md:col-span-7 relative aspect-video rounded-xl overflow-hidden border-2 border-brand-red/60 bg-black/90 group shadow-[0_0_35px_rgba(230,57,70,0.35)] transition-all duration-500">
              {/* Highlight ambient glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/25 via-transparent to-amber-500/15 z-10 pointer-events-none group-hover:opacity-100 transition-opacity" />

              {/* Highlighted Image */}
              <img
                src="https://lh3.googleusercontent.com/d/1zX8sfR3MTkdIOd2PoL52CkmQWvQ8N6T7"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://drive.google.com/uc?export=view&id=1zX8sfR3MTkdIOd2PoL52CkmQWvQ8N6T7";
                }}
                referrerPolicy="no-referrer"
                alt="Pravibe Highlighted Showcase"
                className="w-full h-full object-cover object-center filter brightness-110 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Video Card Details */}
            <div className="md:col-span-5 space-y-4">
              <div>
                <h3 className="font-display font-bold text-xl text-white leading-snug">
                  High-Impact AI Video & Ad Production
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed mt-2">
                  Cinematic visual storytelling without expensive location scouts or physical crews. Built for high-conversion Meta & YouTube ad campaigns.
                </p>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/90">
                  ⚡ 72hr Delivery
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/90">
                  🎬 4K AI Render
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/90">
                  🎯 Meta Ad Optimized
                </span>
              </div>

              <div className="pt-3 border-t border-white/10">
                <button
                  onClick={() => {
                    setActivePage('service-ai-video');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-brand-red to-orange-500 hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  Explore Video Production Services
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* TAB 2: STUDIO BRIEFS SLIDES */
          <div className="animate-in fade-in duration-300 py-2">
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 rounded bg-brand-red/10 border border-brand-red/20 text-xs font-mono font-bold text-brand-red tracking-wider">
                {heroNewsSlides[currentHeroSlide].tag}
              </span>
            </div>

            <div className="min-h-[120px] flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-2xl text-white leading-snug mb-3">
                  {heroNewsSlides[currentHeroSlide].title}
                </h3>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                  {heroNewsSlides[currentHeroSlide].desc}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
              <button
                onClick={() => setActivePage('contact')}
                className="text-xs sm:text-sm font-bold text-white hover:text-brand-red flex items-center gap-2 transition-colors cursor-pointer"
              >
                Request custom project brief <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevSlide}
                  className="h-9 w-9 rounded-full border border-white/10 hover:border-white hover:bg-white/5 text-text-grey hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="h-9 w-9 rounded-full border border-white/10 hover:border-white hover:bg-white/5 text-text-grey hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ambient Background glow behind the card */}
      <div className="absolute -inset-4 bg-gradient-to-r from-brand-red/20 to-orange-500/20 rounded-3xl filter blur-2xl opacity-40 -z-10 pointer-events-none" />
    </div>
  );
}

function ClientCarouselSection() {
  const clients = [
    {
      name: "Zuari Farmhub",
      category: "AgriTech & Enterprise",
      tag: "AgriTech",
      accent: "from-emerald-500/30 via-teal-500/20 to-emerald-950/40",
      iconColor: "text-emerald-400",
      description: "Smart farming automation & digital supply chain workflows."
    },
    {
      name: "Zuari Infraworld",
      category: "Infrastructure & Real Estate",
      tag: "Infra & Living",
      accent: "from-blue-500/30 via-indigo-500/20 to-slate-950/40",
      iconColor: "text-blue-400",
      description: "High-end architectural renders & luxury real estate ad films."
    },
    {
      name: "Cheftalk Food & Hospitality",
      category: "Corporate Hospitality",
      tag: "Hospitality",
      accent: "from-amber-500/30 via-orange-500/20 to-amber-950/40",
      iconColor: "text-amber-400",
      description: "Multi-city corporate catering media & brand campaigns."
    },
    {
      name: "Cheftalk Nutrifood",
      category: "Food Tech & Nutrition",
      tag: "NutriTech",
      accent: "from-rose-500/30 via-red-500/20 to-rose-950/40",
      iconColor: "text-rose-400",
      description: "Direct-to-consumer nutrition brand assets & lead funnels."
    },
    {
      name: "Medilab",
      category: "Healthcare & Diagnostics",
      tag: "HealthTech",
      accent: "from-cyan-500/30 via-blue-500/20 to-cyan-950/40",
      iconColor: "text-cyan-400",
      description: "Medical diagnostic AI explanatory videos & patient media."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchStartX = useRef<number | null>(null);

  // Auto-play 3D coverflow interval
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % clients.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, clients.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % clients.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + clients.length) % clients.length);
  };

  // Mouse move handler for 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (hoveredCard !== index) setHoveredCard(index);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 20, y: -y * 20 });
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
    setTilt({ x: 0, y: 0 });
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="py-10 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#0B0E1A] border-b border-white/10 relative overflow-hidden" id="trusted-clients">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl h-[350px] bg-gradient-to-r from-brand-red/15 via-orange-500/10 to-indigo-500/15 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="px-3.5 py-1 rounded-full bg-brand-red/10 border border-brand-red/25 text-[11px] font-mono font-bold text-brand-red tracking-widest uppercase inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-red animate-ping" />
              TRUSTED BY INDUSTRY LEADERS
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
              Powering Growth for Market Leaders
            </h2>
            <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
              Pravibe delivers high-impact AI video production, corporate brand media, and automation solutions across key sectors.
            </p>
          </div>

          {/* Controls & Mode Indicator */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-text-muted hidden sm:inline-block bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              🎮 Interactive Showcase
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="h-11 w-11 rounded-xl bg-white/5 hover:bg-brand-red hover:text-white border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 group"
                aria-label="Previous client"
              >
                <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={handleNext}
                className="h-11 w-11 rounded-xl bg-white/5 hover:bg-brand-red hover:text-white border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 group"
                aria-label="Next client"
              >
                <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* 3D COVERFLOW STAGE */}
        <div
          className="relative w-full h-[340px] sm:h-[380px] flex items-center justify-center my-6 select-none"
          style={{ perspective: '1200px' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            handleMouseLeave();
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {clients.map((client, idx) => {
            // Calculate relative offset from active card
            let offset = idx - activeIndex;
            // Handle loop offset for 5 cards (-2 to +2)
            if (offset > 2) offset -= clients.length;
            if (offset < -2) offset += clients.length;

            const isActive = offset === 0;
            const isHovered = hoveredCard === idx;

            // 3D Matrix calculation
            const isSmallMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;
            const translateX = offset * (isSmallMobile ? 140 : 230);
            const translateZ = isActive ? (isHovered ? 120 : 80) : -120 * Math.abs(offset);
            const rotateY = isActive ? (isHovered ? tilt.x : 0) : offset < 0 ? 32 : -32;
            const rotateX = isActive && isHovered ? tilt.y : 0;
            const scale = isActive ? (isHovered ? 1.08 : 1.02) : 0.82 - Math.abs(offset) * 0.08;
            const opacity = Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.28;
            const zIndex = 30 - Math.abs(offset) * 10;

            return (
              <div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={handleMouseLeave}
                className={`absolute top-0 w-[270px] sm:w-[320px] md:w-[360px] h-[300px] sm:h-[340px] p-6 sm:p-7 rounded-2xl bg-[#0E1222]/95 border transition-all duration-500 ease-out cursor-pointer overflow-hidden flex flex-col justify-between shadow-2xl ${
                  isActive
                    ? 'border-brand-red/80 shadow-brand-red/20 shadow-2xl'
                    : 'border-white/10 hover:border-white/30'
                }`}
                style={{
                  transform: `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  filter: !isActive ? `blur(${Math.abs(offset) * 1.5}px)` : 'none'
                }}
              >
                {/* Dynamic 3D Lighting Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${client.accent} opacity-80 transition-opacity duration-500 pointer-events-none`} />
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-brand-red/20 rounded-full blur-2xl group-hover:bg-brand-red/40 transition-all duration-500 pointer-events-none" />

                {/* Glass sheen highlight line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                {/* Card Top Details */}
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-black/60 text-brand-red border border-brand-red/30 tracking-wider backdrop-blur-md shadow-sm">
                      {client.tag}
                    </span>
                    <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded-full border border-white/10 backdrop-blur-md">
                      <CheckCircle2 className={`h-3.5 w-3.5 ${client.iconColor}`} />
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">VERIFIED</span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white drop-shadow-md leading-tight pt-1">
                    {client.name}
                  </h3>
                  
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                    {client.description}
                  </p>
                </div>

                {/* Card Bottom Details */}
                <div className="pt-4 border-t border-white/10 relative z-10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">Sector</span>
                    <span className="text-xs font-semibold text-white/90 truncate block max-w-[180px]">
                      {client.category}
                    </span>
                  </div>

                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all ${
                    isActive ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30 scale-105' : 'bg-white/5 text-text-muted'
                  }`}>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3D Stage Dots / Navigation Indicators */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {clients.map((client, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeIndex === idx
                  ? 'w-8 h-2.5 bg-brand-red shadow-lg shadow-brand-red/40'
                  : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/50'
              }`}
              title={`Jump to ${client.name}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  key?: React.Key;
  num: string;
  label: string;
  tag: string;
  icon: React.ReactNode;
  desc: string;
  index: number;
  isStatsAnimated: boolean;
  reducedMotion: boolean;
}

function StatCard({ num, label, tag, icon, desc, index, isStatsAnimated, reducedMotion }: StatCardProps) {
  const [currentVal, setCurrentVal] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 16, y: -y * 16 });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative bg-[#0E1326]/90 border rounded-2xl p-7 flex flex-col justify-between shadow-2xl transition-all duration-300 ease-out cursor-pointer overflow-hidden backdrop-blur-xl group ${
        isHovered
          ? 'border-brand-red/80 shadow-brand-red/25 shadow-2xl'
          : 'border-white/10 hover:border-white/30'
      } ${
        isStatsAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
      }`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(14px) scale(1.02)`
          : `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)`,
        transitionDelay: reducedMotion ? '0ms' : `${index * 120}ms`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic 3D Sheen and Glow Highlights */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-red/70 to-transparent group-hover:via-amber-400 transition-all duration-500 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-44 h-44 bg-brand-red/15 rounded-full blur-2xl group-hover:scale-150 group-hover:bg-brand-red/25 transition-all duration-500 pointer-events-none" />

      {/* Card Header: Icon + Category Tag */}
      <div className="space-y-4 relative z-10" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex items-center justify-between">
          <div className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-md">
            {icon}
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-black/60 text-brand-red border border-brand-red/30 tracking-wider backdrop-blur-md">
            {tag}
          </span>
        </div>

        {/* 3D Value Header */}
        <div className="pt-2">
          <h3 className="text-5xl sm:text-6xl font-display font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-red bg-clip-text text-transparent group-hover:from-white group-hover:to-orange-400 transition-all duration-300 drop-shadow-sm">
            {isStatsAnimated ? `${currentVal}${suffix}` : `0${suffix}`}
          </h3>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white/90 pt-1">
            {label}
          </h4>
        </div>
      </div>

      {/* Card Description */}
      <p className="text-xs text-text-muted leading-relaxed mt-6 relative z-10 font-light border-t border-white/10 pt-4 group-hover:text-white/80 transition-colors" style={{ transform: 'translateZ(10px)' }}>
        {desc}
      </p>
    </div>
  );
}

interface ProcessStepCardProps {
  key?: React.Key;
  step: string;
  tag: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  accent: string;
  badgeBg: string;
  index: number;
  isAnimated: boolean;
  reducedMotion: boolean;
  isHovered: boolean;
  onHover: (idx: number | null) => void;
}

function ProcessStepCard({
  step,
  tag,
  title,
  desc,
  icon,
  accent,
  badgeBg,
  index,
  isAnimated,
  reducedMotion,
  isHovered,
  onHover,
}: ProcessStepCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (x - 0.5) * 14, y: (0.5 - y) * 14 });
    setMousePos({ x: Math.round(x * 100), y: Math.round(y * 100) });
  };

  const handleMouseLeave = () => {
    onHover(null);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={handleMouseLeave}
      className={`relative bg-[#0E1326]/90 border rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl transition-all duration-300 ease-out cursor-pointer overflow-hidden backdrop-blur-xl group/process ${
        isHovered
          ? 'border-brand-red/90 shadow-brand-red/30 shadow-2xl scale-[1.03] z-20 animate-card-glow-pulse'
          : 'border-white/10 hover:border-white/30 hover:shadow-xl'
      } ${
        isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transform: !reducedMotion && isHovered
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(12px)`
          : `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`,
        transitionDelay: reducedMotion ? '0ms' : `${index * 120}ms`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Radial Cursor Spotlight Follower */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${mousePos.x}% ${mousePos.y}%, rgba(229,57,53,0.22), rgba(242,166,74,0.1), transparent 70%)`
            : 'none',
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Top Animated Laser Edge */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accent} transition-all duration-500 pointer-events-none`}
      />

      {/* Dynamic Ambient Background Shimmer */}
      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none animate-card-shimmer" />

      {/* Card Header: Icon & Tag */}
      <div className="space-y-4 relative z-10" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex items-center justify-between">
          {/* Service Tag */}
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-black/60 text-brand-red border border-brand-red/30 tracking-wider backdrop-blur-md shadow-sm">
            {tag}
          </span>
        </div>

        {/* Title + Icon Header */}
        <div className="pt-2 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-brand-red group-hover/process:bg-brand-red group-hover/process:text-white transition-all duration-300 shadow-md shrink-0">
            {icon}
          </div>
          <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover/process:text-orange-400 transition-colors duration-300 leading-snug">
            {title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p
        className="text-xs sm:text-sm text-text-muted leading-relaxed mt-4 relative z-10 font-light border-t border-white/10 pt-4 group-hover/process:text-white/90 transition-colors"
        style={{ transform: 'translateZ(10px)' }}
      >
        {desc}
      </p>
    </div>
  );
}

function getServiceIcon(iconName: string) {
  switch (iconName) {
    case 'Film':
      return <Film className="h-6 w-6 text-rose-400 group-hover:scale-110 transition-transform duration-300" />;
    case 'Megaphone':
      return <Megaphone className="h-6 w-6 text-amber-400 group-hover:scale-110 transition-transform duration-300" />;
    case 'MessageSquareText':
      return <MessageSquareText className="h-6 w-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />;
    case 'Cpu':
      return <Cpu className="h-6 w-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />;
    case 'Palette':
      return <Palette className="h-6 w-6 text-purple-400 group-hover:scale-110 transition-transform duration-300" />;
    case 'Share2':
      return <Share2 className="h-6 w-6 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />;
    case 'Globe':
      return <Globe className="h-6 w-6 text-teal-400 group-hover:scale-110 transition-transform duration-300" />;
    default:
      return <Sparkles className="h-6 w-6 text-brand-red group-hover:scale-110 transition-transform duration-300" />;
  }
}

function getServiceTag(id: string) {
  switch (id) {
    case 'ai-video': return { label: 'CINEMATIC AI', bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30' };
    case 'meta-ads': return { label: 'ROAS & LEADS', bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
    case 'whatsapp-crm': return { label: 'INSTANT CRM', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
    case 'ai-agents': return { label: '24/7 TRIAGE', bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' };
    case 'brand-design': return { label: 'VISUAL SYSTEM', bg: 'bg-purple-500/10 text-purple-400 border-purple-500/30' };
    case 'social-media': return { label: 'ACTIVE FEED', bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' };
    case 'website-development': return { label: 'LANDING & MULTIPAGE', bg: 'bg-teal-500/10 text-teal-400 border-teal-500/30' };
    default: return { label: 'STUDIO STACK', bg: 'bg-brand-red/10 text-brand-red border-brand-red/30' };
  }
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

  const handleServiceClick = (slug: ActivePage) => {
    setActivePage(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* SECTION 1: ECLIPSE HERO */}
      <section className="relative eclipse-bg pt-8 sm:pt-12 md:pt-16 pb-10 sm:pb-16 md:pb-28 px-4 sm:px-6 md:px-8 border-b border-white/5 overflow-hidden" id="hero-section">
        {/* Background Banner Image from Google Drive showcasing the robot face */}
        <HeroImageBackground />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Left Content - Positioned towards top left with generous right padding */}
          <div className="max-w-xl lg:max-w-2xl pr-2 sm:pr-6 md:pr-8 space-y-6 sm:space-y-8 text-center md:text-left">
            <h1 className="font-display font-black leading-tight text-white tracking-tight hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
              Create in the AI Age, <span className="gradient-text-clip">Cinematically.</span>
            </h1>
            
            <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] bg-black/40 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/10">
              High-fidelity video production, Meta lead acquisition campaigns, and custom WhatsApp automation. Built from the ground up for speed, craft, and serious ROI. Operated from Jayanagar, Bengaluru.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-4 pt-2">
              <button
                onClick={() => {
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-xl bg-brand-red text-white text-sm font-bold hover:bg-brand-red-hover transition-all shadow-xl shadow-brand-red/25 text-center cursor-pointer"
                id="hero-cta-contact"
              >
                Request a custom pilot
              </button>
              <a
                href="#production-showcase"
                className="px-8 py-4 rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm text-white text-sm font-bold hover:border-white hover:bg-white/10 transition-all text-center"
                id="hero-cta-why"
              >
                Watch Production Reel ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.25: TRUSTED CLIENTS & ENTERPRISE PARTNERS */}
      <ClientCarouselSection />

      {/* SECTION 1.5: PRODUCTION REEL & STUDIO SHOWCASE (BELOW HERO BANNER) */}
      <section className="py-10 sm:py-16 md:py-20 px-4 bg-[#080B14] border-b border-white/10 relative overflow-hidden" id="production-showcase">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-xs font-mono font-bold text-brand-red tracking-wider uppercase inline-block">
              Featured Studio Showcase
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              High-Fidelity AI Video & Campaign Production
            </h2>
            <p className="text-text-grey text-sm sm:text-base">
              Explore our cinematic ad reel and studio capability briefs below.
            </p>
          </div>

          <ProductionShowcaseSection setActivePage={setActivePage} />
        </div>
      </section>

      {/* SECTION 2: STUDIO SPLIT & SERVICES GRID */}
      <section className="py-12 sm:py-16 md:py-24 px-4 bg-bg-black" id="studio-stack">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
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
            <div className="lg:col-span-4 flex flex-wrap gap-4 justify-center lg:justify-end">
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
            <div className="bg-gradient-to-r from-brand-red/10 to-orange-500/10 border border-brand-red/20 rounded-xl py-3.5 px-5 flex flex-row items-center justify-between text-xs font-mono font-medium tracking-wide text-white">
              <span className="truncate">🌟 STREAK: 100+ FILMS SHIPPED IN 2026</span>
              <span className="text-brand-red font-bold shrink-0 ml-2">ACTIVE &rarr;</span>
            </div>
            <div className="bg-gradient-to-r from-orange-500/10 to-brand-red/10 border border-orange-500/20 rounded-xl py-3.5 px-5 flex flex-row items-center justify-between text-xs font-mono font-medium tracking-wide text-white">
              <span className="truncate">⚡ TURNAROUND: COMPLETED WITHIN 48 HOURS</span>
              <span className="text-orange-500 font-bold shrink-0 ml-2">GUARANTEED &rarr;</span>
            </div>
          </div>

          {/* Services Grid with Enhanced Card Animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((srv, idx) => {
              const tag = getServiceTag(srv.id);
              const formattedIndex = String(idx + 1).padStart(2, '0');
              const totalCount = String(SERVICES.length).padStart(2, '0');

              return (
                <div
                  key={srv.id}
                  onClick={() => handleServiceClick(srv.slug)}
                  className="group relative bg-[#0D1222]/90 border border-white/10 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:border-brand-red/50 hover:shadow-2xl hover:shadow-brand-red/15 cursor-pointer overflow-hidden backdrop-blur-md"
                >
                  {/* Subtle top ambient glow strip */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-red/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Radial hover light overlay */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-red/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                  <div className="space-y-5 relative z-10">
                    {/* Top Header: Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-brand-red/40 group-hover:bg-brand-red/10 transition-all duration-300 shadow-inner">
                        {getServiceIcon(srv.icon)}
                      </div>
                      <span className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full border ${tag.bg} transition-colors`}>
                        {tag.label}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-xl text-white mb-2 tracking-tight group-hover:text-brand-red transition-colors duration-200">
                        {srv.title}
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed font-light">
                        {srv.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between relative z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceClick(srv.slug);
                      }}
                      className="text-xs font-bold text-white group-hover:text-brand-red flex items-center gap-1.5 transition-colors cursor-pointer"
                      id={`srv-grid-btn-${srv.id}`}
                    >
                      <span>View full guide</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-text-muted group-hover:text-brand-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </button>
                    <span className="text-[11px] font-mono text-text-muted/50 group-hover:text-brand-red/60 font-semibold transition-colors">
                      {formattedIndex}/{totalCount}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: GLOWING GRADIENT DIVIDER */}
      <div className="glowing-divider w-full" />

      {/* SECTION 4: PROCESS / PIPELINE SECTION */}
      <section ref={sectionRef} className="py-12 sm:py-16 md:py-24 px-4 bg-[#0B0E1A]">
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

          {/* Numbered Pipeline Grid with Continuous Laser Flow */}
          <div className="relative" style={{ perspective: '1200px' }}>
            {/* Desktop Horizontal Connecting Laser Pulse Line Segments */}
            {[0, 1, 2, 3].map((segIdx) => (
              <div
                key={segIdx}
                className="hidden lg:block absolute h-[3px] bg-white/10 -z-0 overflow-hidden transition-all duration-300 rounded-full"
                style={{
                  left: `${10 + segIdx * 20}%`,
                  width: '20%',
                  top: '52px',
                }}
              >
                {/* Continuous Flowing Laser Pulse */}
                <div
                  className="h-full bg-gradient-to-r from-brand-red via-amber-400 to-orange-500 w-full animate-laser-flow"
                  style={{
                    animationDuration: `${2.2 + segIdx * 0.4}s`,
                    opacity: hoveredCardIdx === segIdx || hoveredCardIdx === segIdx + 1 ? 1 : 0.6,
                  }}
                />
              </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 relative z-10">
              {[
                {
                  step: '01',
                  tag: 'ALIGNMENT',
                  title: 'Discovery Call',
                  desc: 'A focused 30-minute alignment session to define target audience, campaign hooks, and exact production requirements.',
                  icon: <MessageSquareText className="h-5 w-5" />,
                  accent: 'from-amber-500 via-rose-500 to-amber-500',
                  badgeBg: 'from-brand-red to-orange-500'
                },
                {
                  step: '02',
                  tag: 'CREATIVE BRIEF',
                  title: 'Script & Storyboard',
                  desc: 'Within 24 hours, we deliver a completed script and generative AI art storyboards illustrating the creative mood.',
                  icon: <Palette className="h-5 w-5" />,
                  accent: 'from-purple-500 via-rose-500 to-purple-500',
                  badgeBg: 'from-rose-500 to-purple-600'
                },
                {
                  step: '03',
                  tag: 'AI ENGINE',
                  title: 'AI Production',
                  desc: 'Our studio generates hyper-realistic video renders, localized voiceovers, and premium visual layout concepts.',
                  icon: <Cpu className="h-5 w-5" />,
                  accent: 'from-cyan-500 via-blue-500 to-cyan-500',
                  badgeBg: 'from-cyan-500 to-blue-600'
                },
                {
                  step: '04',
                  tag: 'POST-PRODUCTION',
                  title: 'Edit & Sound Design',
                  desc: 'Experienced human designers refine visual transitions, grade colors, and layer robust audio and SFX.',
                  icon: <Film className="h-5 w-5" />,
                  accent: 'from-emerald-500 via-teal-500 to-emerald-500',
                  badgeBg: 'from-emerald-500 to-teal-600'
                },
                {
                  step: '05',
                  tag: 'LIVE DEPLOY',
                  title: 'Launch & Distribute',
                  desc: 'We ship the completed campaign, deploy WhatsApp CRM qualifying logic, and set scaling rules on Meta.',
                  icon: <Zap className="h-5 w-5" />,
                  accent: 'from-orange-500 via-amber-500 to-orange-500',
                  badgeBg: 'from-orange-500 to-amber-500'
                }
              ].map((p, idx) => (
                <ProcessStepCard
                  key={p.step}
                  step={p.step}
                  tag={p.tag}
                  title={p.title}
                  desc={p.desc}
                  icon={p.icon}
                  accent={p.accent}
                  badgeBg={p.badgeBg}
                  index={idx}
                  isAnimated={isAnimated}
                  reducedMotion={reducedMotion}
                  isHovered={hoveredCardIdx === idx}
                  onHover={(i) => setHoveredCardIdx(i)}
                />
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
      <section className="relative overflow-hidden bg-gradient-to-r from-[#140C26] via-[#3E1B54] to-[#C85218] py-12 sm:py-16 md:py-24 px-4 sm:px-6">
        {/* Overlay structure for background depth */}
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-12">
          {/* Section Heading */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-mono font-bold text-amber-300 tracking-widest uppercase inline-flex items-center gap-2 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              VOICES OF TRUSTED PARTNERS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight drop-shadow-md">
              Relentless creative output.<br />
              <span className="bg-gradient-to-r from-amber-200 via-orange-300 to-rose-200 bg-clip-text text-transparent">
                Best-in-class turnaround.
              </span>
            </h2>
            <p className="text-white/80 text-xs sm:text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Hear directly from industry leaders, advisors, and brand founders who rely on Pravibe Smarttech for high-impact creative execution and speed.
            </p>
          </div>

          {/* Testimonial Cards Grid (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {[
              {
                name: 'Govinda Babu Poojari',
                role: 'Managing Director',
                company: 'Cheftalk Nutrifoods',
                tag: 'CONSUMER FOODS',
                badgeBg: 'from-brand-red to-orange-500',
                initials: 'GBP',
                quote:
                  'Pravibe delivered a complete campaign — product films, social content, and ad creative — at a speed and quality no traditional agency could match. Our brand visibility and retail interest surged immediately.',
                rating: 5,
              },
              {
                name: 'CA Nagaraj Poojari',
                role: 'Senior Financial & Strategic Advisor',
                company: 'Chartered Advisory',
                tag: 'FINANCIAL SERVICES',
                badgeBg: 'from-amber-500 to-orange-600',
                initials: 'NP',
                quote:
                  'Pravibe transformed our client engagement and corporate media presence. Their automated lead workflows and sleek visual assets gave us an unprecedented edge in clarity, speed, and market authority.',
                rating: 5,
              },
              {
                name: 'Santhosh',
                role: 'Founder & Managing Director',
                company: 'White Sleeves',
                tag: 'APPAREL & BRAND',
                badgeBg: 'from-cyan-500 to-blue-600',
                initials: 'WS',
                quote:
                  'Pravibe’s AI video ads and social media management completely redefined how White Sleeves connects with customers. The return on ad spend and qualified lead conversion was simply exceptional.',
                rating: 5,
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-black/45 backdrop-blur-xl border border-white/15 rounded-2xl p-7 sm:p-8 flex flex-col justify-between text-left shadow-2xl hover:border-white/40 hover:bg-black/60 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Subtle top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${t.badgeBg}`} />

                {/* Top Quote Icon & Category Tag */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Quote className="h-8 w-8 text-amber-400/60 group-hover:text-amber-300 group-hover:scale-110 transition-all duration-300" />
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/20 tracking-wider backdrop-blur-md">
                      {t.tag}
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote Body */}
                  <p className="text-white/95 text-xs sm:text-sm font-light leading-relaxed italic pt-1">
                    "{t.quote}"
                  </p>
                </div>

                {/* Bottom Author Section */}
                <div className="flex items-center gap-4 pt-6 mt-6 border-t border-white/15">
                  <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${t.badgeBg} flex items-center justify-center text-white font-mono font-bold text-sm shadow-lg shrink-0 group-hover:scale-105 transition-transform`}>
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                      {t.name}
                    </h4>
                    <p className="text-xs font-semibold text-amber-200/90 truncate">
                      {t.company}
                    </p>
                    <p className="text-[10px] text-white/60 truncate">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: 3D IMPACT SECTION (DARK METALLIC THEME) */}
      <section ref={statsSectionRef} className="py-12 sm:py-16 md:py-24 px-4 bg-[#0B0E1A] text-white border-t border-b border-white/10 relative overflow-hidden" id="stats-section">
        {/* Background ambient lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-5xl h-[350px] bg-gradient-to-r from-brand-red/15 via-orange-500/10 to-indigo-500/15 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-brand-red/10 border border-brand-red/25 text-[11px] font-mono font-bold text-brand-red tracking-widest uppercase inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-red animate-ping" />
              STUDIO IMPACT METRICS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-none">
              Performance without compromise.
            </h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed font-light">
              We hold ourselves strictly accountable to business outcomes. Here is the direct value we bring to our enterprise partners.
            </p>
          </div>

          {/* 3D Stat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: '1200px' }}>
            {[
              { num: '70%', label: 'Cost Reduction', tag: 'SAVINGS METRIC', icon: <TrendingDown className="h-5 w-5" />, desc: 'Slashed physical overhead and production delay versus traditional ad shoots.' },
              { num: '48h', label: 'Turnaround Delivery', tag: 'SPEED BENCHMARK', icon: <Clock className="h-5 w-5" />, desc: 'Initial storyboards and high-fidelity video draft ready for your review.' },
              { num: '100+', label: 'Films Delivered', tag: 'PRODUCTION ASSETS', icon: <Film className="h-5 w-5" />, desc: 'Active, high-converting social assets engineered for targeted audiences.' },
              { num: '92%', label: 'Auto-Engaged Leads', tag: 'CONVERSION CRM', icon: <Zap className="h-5 w-5" />, desc: 'Inbound prospects instantly qualified and chatted with on WhatsApp CRM.' }
            ].map((stat, idx) => (
              <StatCard
                key={stat.label}
                num={stat.num}
                label={stat.label}
                tag={stat.tag}
                icon={stat.icon}
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
            <p className="text-xs font-mono text-text-muted/60">
              *Averaged performance metrics collected across 2025-2026 Pravibe client campaigns.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: LATEST INSIGHTS TEASER */}
      <section className="py-12 sm:py-16 md:py-24 px-4 bg-bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-center md:text-left">
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
                    src={getOptimizedImageUrl(BLOG_ARTICLES[0].photoUrl, 1000)}
                    alt={BLOG_ARTICLES[0].title}
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
                      src={getOptimizedImageUrl(art.photoUrl, 400)}
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
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-[#0B0E1A] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="font-display font-black italic text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-relaxed">
            "The companies that harness AI today will write the <span className="gradient-text-clip">market rules of tomorrow.</span>"
          </p>
        </div>
        {/* Subtle radial center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-red/10 rounded-full filter blur-3xl pointer-events-none" />
      </section>

      {/* SECTION 10: TRIPLE CTA PANEL */}
      <section className="py-12 sm:py-16 md:py-24 px-4 bg-bg-black border-t border-white/5">
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
