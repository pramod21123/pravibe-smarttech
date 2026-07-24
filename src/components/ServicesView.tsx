import React from 'react';
import { SERVICES } from '../data';
import { ActivePage } from '../types';
import { ArrowUpRight, ShieldCheck, Zap, Sparkles, CheckSquare } from 'lucide-react';

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
      <section className="relative eclipse-bg pt-20 pb-24 px-4 border-b border-white/5">
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
      <section className="py-20 px-4 bg-[#F7F4EE] text-[#1A1710]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
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
      <section className="py-24 px-4 bg-bg-black">
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
            {SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="group bg-card-bg/60 border border-border-grey rounded-xl p-8 hover:border-brand-red/40 hover:bg-card-bg/95 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="h-12 w-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-brand-red/10 group-hover:border-brand-red/30 transition-all text-brand-red">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-brand-red transition-colors">
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
                    id={`services-index-btn-${srv.id}`}
                  >
                    View full guide &rarr;
                  </button>
                  <ArrowUpRight className="h-4 w-4 text-text-muted/40 group-hover:text-brand-red transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CLOSING CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#0A0A0D] to-[#020202] text-center border-t border-white/5">
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
