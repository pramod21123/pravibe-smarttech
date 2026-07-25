import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ActivePage } from '../types';
import { Star, ShieldAlert, Award, Smile, ArrowRight } from 'lucide-react';
import { getOptimizedImageUrl } from '../data';

interface AboutViewProps {
  setActivePage: (page: ActivePage) => void;
}

interface AgencyCardProps {
  key?: any;
  icon: any;
  title: string;
  desc: string;
  index: number;
}

function AgencyCard({ icon: IconComp, title, desc, index }: AgencyCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Calculate normalized coordinates (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Max tilt angle (degrees)
  const maxTilt = 10;
  const rotateX = isHovered ? -coords.y * maxTilt : 0;
  const rotateY = isHovered ? coords.x * maxTilt : 0;

  return (
    <motion.div 
      style={{ perspective: '1000px' }} 
      className="w-full h-full"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative h-full bg-card-bg/60 backdrop-blur-md border border-white/10 p-8 rounded-2xl text-left space-y-5 shadow-xl hover:border-brand-red/40 hover:bg-white/[0.08] transition-all duration-300 cursor-pointer overflow-hidden group select-none flex flex-col justify-between"
      >
        {/* Dynamic gloss/light flare overlay following mouse coords */}
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 200px at ${(coords.x + 0.5) * 100}% ${(coords.y + 0.5) * 100}%, rgba(220, 38, 38, 0.2) 0%, transparent 100%)`,
            }}
          />
        )}

        {/* Outer 3D back-glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="space-y-4" style={{ transformStyle: 'preserve-3d' }}>
          {/* Depth Layer 1: Icon Frame (highest elevation) */}
          <div 
            style={{ 
              transform: isHovered ? 'translateZ(25px)' : 'translateZ(0px)',
              transition: 'transform 0.2s ease-out'
            }}
            className="h-12 w-12 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red group-hover:bg-gradient-to-br group-hover:from-brand-red group-hover:to-orange-500 group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-brand-red/25 transition-all duration-300"
          >
            <IconComp className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
          </div>

          {/* Depth Layer 2: Title (mid elevation) */}
          <h3 
            style={{ 
              transform: isHovered ? 'translateZ(15px)' : 'translateZ(0px)',
              transition: 'transform 0.2s ease-out'
            }}
            className="font-display font-bold text-xl text-white group-hover:text-brand-red transition-colors duration-300"
          >
            {title}
          </h3>

          {/* Depth Layer 3: Description (base elevation) */}
          <p 
            style={{ 
              transform: isHovered ? 'translateZ(8px)' : 'translateZ(0px)',
              transition: 'transform 0.2s ease-out'
            }}
            className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal"
          >
            {desc}
          </p>
        </div>

        {/* Premium bottom linear accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-red to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out" />
      </motion.div>
    </motion.div>
  );
}

export default function AboutView({ setActivePage }: AboutViewProps) {
  return (
    <div className="w-full">
      {/* SECTION 1: ABOUT HERO */}
      <section className="relative eclipse-bg pt-12 sm:pt-20 pb-12 sm:pb-24 px-4 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="text-xs font-mono font-semibold tracking-widest text-brand-red uppercase block">
            The Studio Story
          </span>
          <h1 className="font-display font-black leading-tight text-white tracking-tight text-4xl sm:text-5xl md:text-6xl">
            Built by people who'd rather <span className="gradient-text-clip">ship than pitch.</span>
          </h1>
          <p className="text-text-grey text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Pravibe Smarttech was founded in Jayanagar, Bengaluru, to eliminate the administrative bloat of traditional marketing agencies. We run a lean, high-velocity creative system built for the AI age.
          </p>
        </div>
      </section>

      {/* SECTION 2: FOUNDER SEGMENT */}
      <section className="py-12 sm:py-24 px-4 bg-[#0A0A0D] text-left">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Circular Photo Placeholder Frame (240px) */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative group">
              {/* Decorative outer glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-red to-orange-500 rounded-full filter blur opacity-40 group-hover:opacity-75 transition-opacity" />
              
              {/* Circular Avatar container */}
              <div className="relative h-[240px] w-[240px] rounded-full bg-card-bg border-4 border-[#0A0A0D] flex items-center justify-center overflow-hidden shadow-2xl">
                <img
                  src={getOptimizedImageUrl('https://lh3.googleusercontent.com/d/1oWQtnHolU8lV5whWO6r-EyUZm9y8pbU3', 500)}
                  alt="Pramod Shetty - Founder of Pravibe Smarttech"
                  className="h-full w-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Founder Bio Paragraphs */}
          <div className="md:col-span-8 space-y-6 text-left">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-mono text-brand-red font-bold uppercase tracking-wider block">Leadership</span>
              <h2 className="font-display font-black text-3xl text-white tracking-tight">
                Pramod Shetty
              </h2>
              <p className="text-xs font-semibold text-text-muted">
                Founder, Pravibe Smarttech
              </p>
            </div>

            <p className="text-sm text-text-grey leading-relaxed">
              Pramod started Pravibe Smarttech after years of witnessing the sluggish pace and administrative disconnect of traditional marketing models. He realized that modern builders and brand owners don't want meetings; they want high-impact, campaign-ready creative assets that engage serious buyers.
            </p>

            <p className="text-sm text-text-grey leading-relaxed">
              Adopting a highly hands-on approach, Pramod leads the core generative rendering and workflow automations inside the studio. He keeps the studio strictly focused on speed + craft, ensuring every film draft and ad set meets rigorous conversion targets before going live.
            </p>

            <p className="text-sm text-white italic font-medium leading-relaxed bg-white/5 border-l-2 border-brand-red p-4 rounded-r-lg">
              "We have eliminated everything that stands between a brief and a highly polished, high-performing campaign launch. Our clients work directly with builders, not account administrators."
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 3: STUDIO BACKGROUND STORY */}
      <section className="py-12 sm:py-24 px-4 bg-bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start text-center md:text-left">
          <div className="space-y-4">
            <h2 className="font-display font-bold text-2xl text-white tracking-tight">
              Why Pravibe exists.
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              Traditional agencies are caught in a legacy trap. They hire excessive account managers, schedule multi-week review loops, and bill huge monthly retainers before launching a single campaign asset. When AI tools arrived, most agencies treated them as a threat or a lazy shortcut.
            </p>
            <p className="text-sm text-text-muted leading-relaxed">
              We saw an opportunity to build something better. We merged advanced generative pipelines with disciplined design craft, professional copy, and direct-response strategy. The result is a studio that delivers draft mockups in 48 hours and structures campaigns around true ROAS.
            </p>
          </div>

          <div className="space-y-4 bg-card-bg/40 border border-border-grey rounded-2xl p-8 relative">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-red to-orange-500" />
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Our Location
            </h3>
            <p className="text-xs text-text-grey leading-relaxed">
              We operate directly out of <strong>Jayanagar 4th Block, Bengaluru, India</strong>. This allows us to work closely with local builders, agri-tech startups, and FMCG brands, maintaining deep connections with India's primary tech and distribution hubs.
            </p>
            <div className="h-28 w-full bg-white/5 border border-white/10 rounded-lg flex flex-col items-center justify-center text-center p-4">
              <span className="text-xs font-mono text-brand-red font-bold uppercase tracking-wider">STUDIO WORKSPACE</span>
              <span className="text-[10px] text-text-muted mt-1">Jayanagar 4th Block, Bengaluru, KA, India</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CORE PILLARS (HOW WE STAY HIGH AGENCY) */}
      <section className="py-12 sm:py-24 px-4 bg-bg-black border-t border-white/5 relative overflow-hidden">
        {/* Ambient background glow matching home page */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-red/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-brand-red uppercase tracking-widest block">
              Core Pillars
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-tight">
              How we stay high agency
            </h2>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Star, title: 'No Empty Meetings', desc: 'We align over crisp 5-minute video updates or direct document threads. We do not block your calendars with alignment slides.' },
              { icon: Award, title: 'Extreme Velocity', desc: 'First drafts are shipped within 48 hours of brief agreement. We test creative hooks while standard agencies are still brainstorming.' },
              { icon: Smile, title: 'Complete Transparency', desc: 'We charge zero hidden administration fees. You pay for creative output and actual conversion setup metrics.' }
            ].map((v, index) => (
              <AgencyCard
                key={v.title}
                icon={v.icon}
                title={v.title}
                desc={v.desc}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA BAND */}
      <section className="py-12 sm:py-20 px-4 bg-bg-black border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
            Work directly with Pramod Shetty.
          </h2>
          <p className="text-sm text-text-muted leading-relaxed max-w-xl mx-auto">
            Book a direct creative audit session. We will evaluate your existing social grids, packaging vectors, and lead flows in real time.
          </p>
          <a
            href="https://wa.me/918970382380?text=Hi%20Pravibe,%20I'd%20like%20to%20audit%20my%20campaigns%20today!"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-lg bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold transition-all shadow-md shadow-brand-red/15 cursor-pointer inline-flex items-center gap-2 hover:scale-105 active:scale-95"
            id="about-cta-trigger"
          >
            Audit your campaigns today <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
}
