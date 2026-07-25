import React from 'react';
import { ActivePage, Service } from '../types';
import { SERVICES } from '../data';
import { ArrowLeft, CheckCircle, ChevronRight, Sparkles, Building2, Leaf, HeartHandshake } from 'lucide-react';

interface ServiceDetailViewProps {
  serviceSlug: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

export default function ServiceDetailView({ serviceSlug, setActivePage }: ServiceDetailViewProps) {
  const service = SERVICES.find((s) => s.slug === serviceSlug);

  if (!service) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold">Service Not Found</h2>
        <button
          onClick={() => setActivePage('services')}
          className="text-brand-red font-bold"
        >
          Back to all services
        </button>
      </div>
    );
  }

  // Get specific stats/proof for each service
  const getServiceStats = (slug: ActivePage) => {
    switch (slug) {
      case 'service-ai-video':
        return [
          { num: '70%', label: 'Budget Reductions', desc: 'Average cost reduction across standard walkthrough and promo shoots.' },
          { num: '48 Hrs', label: 'First-Cut Turnaround', desc: 'High-fidelity cinematic video delivered for review in under two days.' }
        ];
      case 'service-meta-ads':
        return [
          { num: '2.8x', label: 'ROAS Increase', desc: 'Average return on ad spend improvement achieved within 30 days.' },
          { num: '34%', label: 'CPL Cost Drop', desc: 'Sustained reduction in Cost-Per-Lead metrics using our rapid creative testing.' }
        ];
      case 'service-whatsapp-crm':
        return [
          { num: '92%', label: 'Conversation Rate', desc: 'Proportion of incoming clicks successfully qualified by automated sequences.' },
          { num: '60 Sec', label: 'Response Target', desc: 'Instant reply and qualification sequence triggered for every new inquiry.' }
        ];
      case 'service-ai-agents':
        return [
          { num: '24/7', label: 'Automated Availability', desc: 'Instant response times with zero latency, even during off-office hours.' },
          { num: '80%', label: 'Inquiry Triage', desc: 'Preliminary questions fully answered and sorted automatically without staff.' }
        ];
      case 'service-brand-design':
        return [
          { num: '100%', label: 'Unique Brand Guide', desc: 'Flawless visual guidelines spanning packaging, social layout, and logos.' },
          { num: '2x', label: 'Screen Visibility', desc: 'Vibrant, optimized graphics crafted specifically for mobile screen stopping power.' }
        ];
      case 'service-social-media':
        return [
          { num: '100%', label: 'Active Pipeline', desc: 'Never miss a post with full-service automated, curated social scheduling.' },
          { num: '2.5x', label: 'Engagement Increase', desc: 'Average boost in audience likes, comments, and shares over 60 days.' }
        ];
      case 'service-website-development':
        return [
          { num: '<1 Sec', label: 'Load Speed', desc: 'Ultra-fast landing page and multipage website performance for high retention.' },
          { num: '+45%', label: 'Lead Conversion', desc: 'Higher visitor-to-lead conversion rate via optimized UI and integrated CRM.' }
        ];
      default:
        return [
          { num: '100%', label: 'High Fidelity', desc: 'Premium creative delivery with zero administrative friction.' }
        ];
    }
  };

  const stats = getServiceStats(serviceSlug);

  return (
    <div className="w-full">
      {/* 1. Breadcrumbs & Intro Header */}
      <section className="bg-[#050505] border-b border-white/5 py-8 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-mono text-text-muted">
          <button
            onClick={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors cursor-pointer"
            id="detail-breadcrumb-home"
          >
            Home
          </button>
          <ChevronRight className="h-3 w-3" />
          <button
            onClick={() => {
              setActivePage('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors cursor-pointer"
            id="detail-breadcrumb-services"
          >
            Services
          </button>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white font-semibold">{service.title}</span>
        </div>
      </section>

      {/* 2. Hero Section */}
      <section className="relative eclipse-bg pt-16 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-red uppercase block">
            Specialist Pipeline
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
            {service.title.split(' ')[0]}{' '}
            <span className="gradient-text-clip">
              {service.title.split(' ').slice(1).join(' ')}
            </span>
          </h1>
          <p className="text-text-grey text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-light">
            {service.longDesc}
          </p>
        </div>
      </section>

      {/* 3. Processes & Who It Is For Grid */}
      <section className="py-20 px-4 bg-bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Panel: Bullet Process steps */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
              Our Implementation Pipeline
            </h2>
            <div className="space-y-4">
              {service.process.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-4 bg-card-bg/40 border border-border-grey p-5 rounded-xl hover:border-brand-red/30 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center font-mono font-bold text-sm shrink-0">
                    0{index + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      {step.split(' ')[0]} {step.split(' ').slice(1).join(' ')}
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Rigorous quality checks and prompt deliveries ensure this stage meets your target conversion KPIs.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Who it is for and Features */}
          <div className="lg:col-span-5 space-y-8">
            {/* Target Audience Box */}
            <div className="bg-card-bg border border-brand-red/20 rounded-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-red to-orange-500" />
              <h3 className="font-display font-bold text-lg text-white mb-3">
                Who It's For
              </h3>
              <p className="text-sm text-text-grey leading-relaxed">
                {service.whoItIsFor}
              </p>
            </div>

            {/* Core Features list */}
            <div className="bg-card-bg/20 border border-border-grey rounded-xl p-8 space-y-6">
              <h3 className="font-display font-bold text-lg text-white">
                Core Deliverables
              </h3>
              <ul className="space-y-3 text-sm text-text-grey">
                {service.features.map((feat) => (
                  <li key={feat} className="flex gap-2.5 items-start">
                    <CheckCircle className="h-4.5 w-4.5 text-brand-red shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SPECIALIZED CONTENT FOR AI AGENTS BLOCK */}
      {serviceSlug === 'service-ai-agents' && (
        <section className="py-20 px-4 bg-[#0A0A0D] border-t border-b border-white/5">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono text-brand-red font-semibold uppercase tracking-wider">
                Industry-Specific Workflows
              </span>
              <h2 className="font-display font-black text-3xl text-white tracking-tight">
                How this helps different businesses
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Real Estate Accordion style Box */}
              <div className="bg-card-bg border border-border-grey p-6 rounded-xl space-y-4">
                <div className="h-10 w-10 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">
                  Real Estate Developers
                </h3>
                <p className="text-xs text-text-grey leading-relaxed">
                  Our custom AI agents qualify buyers automatically on home location, budget preferences, and purchase timeline, then directly schedule physical site visits and follow up automatically on WhatsApp.
                </p>
              </div>

              {/* Agriculture Accordion style Box */}
              <div className="bg-card-bg border border-border-grey p-6 rounded-xl space-y-4">
                <div className="h-10 w-10 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red">
                  <Leaf className="h-5 w-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">
                  Agriculture & FMCG
                </h3>
                <p className="text-xs text-text-grey leading-relaxed">
                  Instantly resolve inquiries on product technical sheets, route distributors to regional sales heads, collect local-language feedback, and periodically re-engage dormant fertilizer or snack buyers.
                </p>
              </div>

              {/* B2C Services Accordion style Box */}
              <div className="bg-card-bg border border-border-grey p-6 rounded-xl space-y-4">
                <div className="h-10 w-10 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">
                  General B2C Services
                </h3>
                <p className="text-xs text-text-grey leading-relaxed">
                  Handles preliminary tier-one price questions, booking availability checks, and service quotes around the clock, routing only warm and qualified prospects to your active sales staff.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. White Stats Results Band (LITTLE WHITE MIXTURE) */}
      <section className="py-16 px-4 bg-white text-gray-900">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-around items-center gap-12 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-2 max-w-sm">
              <h3 className="text-5xl sm:text-6xl font-display font-black tracking-tight text-brand-red">
                {stat.num}
              </h3>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                {stat.label}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA Button Pair */}
      <section className="py-20 px-4 bg-bg-black border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
            Deploy this creative system to your campaign pipeline.
          </h2>
          <p className="text-sm text-text-muted leading-relaxed max-w-xl mx-auto">
            Book an alignment audit to review your current collateral, identify bottleneck points, and see sample custom AI videos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setActivePage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-lg bg-brand-red text-white text-xs font-bold hover:bg-brand-red-hover transition-colors shadow-md shadow-brand-red/15 cursor-pointer"
              id="detail-cta-demo"
            >
              Get a free demo
            </button>
            <button
              onClick={() => {
                setActivePage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-lg border border-white/20 text-white text-xs font-bold hover:border-white hover:bg-white/5 transition-all cursor-pointer"
              id="detail-cta-talk"
            >
              Talk to us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
