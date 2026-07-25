import React from 'react';
import { SERVICES } from '../data';
import { ActivePage } from '../types';
import { ArrowUpRight, ShieldCheck, Zap, Sparkles, Film, Megaphone, MessageSquareText, Cpu, Palette, Share2, Globe } from 'lucide-react';

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

interface ServicesViewProps {
  setActivePage: (page: ActivePage) => void;
}

export default function ServicesView({ setActivePage }: ServicesViewProps) {
  const handleServiceClick = (slug: ActivePage) => {
    setActivePage(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* SECTION 1: SERVICES HERO */}
      <section className="relative eclipse-bg pt-12 sm:pt-20 pb-12 sm:pb-24 px-4 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="text-xs font-mono font-semibold tracking-widest text-brand-red uppercase block">
            Our Studio Capabilities
          </span>
          <h1 className="font-display font-black leading-tight text-white tracking-tight text-4xl sm:text-5xl md:text-6xl">
            Everything your brand needs, <span className="gradient-text-clip">under one roof.</span>
          </h1>
          <p className="text-text-grey text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            We bypass traditional bottleneck agency processes to ship cinematic videos, target and run high-intent lead campaigns, and automate customer qualifying funnels from Jayanagar, Bengaluru.
          </p>
        </div>
      </section>

      {/* SECTION 2: WHITE BREATHING SECTION (LITTLE WHITE MIXTURE RULE) */}
      <section className="py-12 sm:py-20 px-4 bg-[#F7F4EE] text-[#1A1710]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4 text-center md:text-left">
            <span className="text-xs font-mono font-bold tracking-widest text-[#F2A64A] uppercase block">
              The Pravibe Model
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#1A1710] tracking-tight leading-none">
              High execution. Zero fluff.
            </h2>
            <p className="text-[#1A1710]/70 text-sm sm:text-base leading-relaxed">
              We do not pitch flashy slide decks, charge retainer setup fees, or schedule empty alignment meetings. We focus entirely on shipping high-fidelity assets that actively move your target audience.
            </p>
          </div>
          <div className="md:col-span-5 bg-white/80 border border-black/5 rounded-xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#1A1710]">Pixel-Perfect Speed</h4>
                <p className="text-xs text-[#1A1710]/70">First-cut video mockups delivered in 48 hours.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#1A1710]">Durable Integration</h4>
                <p className="text-xs text-[#1A1710]/70">WhatsApp CRM configurations built directly into campaigns.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FULL SERVICES GRID (DARK) */}
      <section className="py-12 sm:py-24 px-4 bg-bg-black">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display font-black text-3xl text-white tracking-tight">
              Explore Our Specialist Pipelines
            </h2>
            <p className="text-text-muted text-sm mt-2">
              Click any pipeline below to access the comprehensive implementation guide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((srv, idx) => {
              const tag = getServiceTag(srv.id);
              const formattedIndex = String(idx + 1).padStart(2, '0');
              const totalCount = String(SERVICES.length).padStart(2, '0');

              return (
                <div
                  key={srv.id}
                  onClick={() => handleServiceClick(srv.slug)}
                  className="group relative bg-[#0D1222]/90 border border-white/10 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:border-brand-red/50 hover:shadow-2xl hover:shadow-brand-red/15 cursor-pointer overflow-hidden backdrop-blur-md"
                >
                  {/* Subtle top glowing line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-red/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Ambient light blur */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-red/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                  <div className="space-y-6 relative z-10">
                    {/* Header: Icon + Tag */}
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-brand-red/40 group-hover:bg-brand-red/10 transition-all duration-300 shadow-inner">
                        {getServiceIcon(srv.icon)}
                      </div>
                      <span className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full border ${tag.bg} transition-colors`}>
                        {tag.label}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-display font-bold text-xl text-white group-hover:text-brand-red transition-colors duration-200">
                        {srv.title}
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed font-light">
                        {srv.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between relative z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceClick(srv.slug);
                      }}
                      className="text-xs font-bold text-white group-hover:text-brand-red flex items-center gap-1.5 transition-colors cursor-pointer"
                      id={`services-index-btn-${srv.id}`}
                    >
                      <span>View full guide</span>
                      <ArrowUpRight className="h-4 w-4 text-text-muted group-hover:text-brand-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
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

      {/* SECTION 4: CLOSING CTA */}
      <section className="py-12 sm:py-20 px-4 bg-gradient-to-br from-[#0A0A0D] to-[#020202] text-center border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
            Ready to integrate a high-velocity creative system?
          </h2>
          <p className="text-text-grey text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Let's design a custom production, ad-buying, and automated qualification workflow tailored to your exact business metrics.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                setActivePage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-lg bg-brand-red text-white text-xs font-bold hover:bg-brand-red-hover transition-all cursor-pointer"
              id="services-cta-demo"
            >
              Get a free demo video
            </button>
            <button
              onClick={() => {
                setActivePage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-lg border border-white/20 text-white text-xs font-bold hover:border-white hover:bg-white/5 transition-all cursor-pointer"
              id="services-cta-talk"
            >
              Talk to Pramod Shetty
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
