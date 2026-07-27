import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Twitter, Youtube, Linkedin, Instagram, ArrowUpRight, MapPin, Mail, MessageSquare, Calendar, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ActivePage } from '../types';
import { getPagePath } from '../utils/routes';

interface FooterProps {
  setActivePage?: (page: ActivePage) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const navigate = useNavigate();
  const navigateTo = (page: ActivePage) => {
    if (setActivePage) {
      setActivePage(page);
    } else {
      navigate(getPagePath(page));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const servicesListLeft = [
    { name: 'AI Video & Films', page: 'service-ai-video' as ActivePage, id: 'footer-srv-video' },
    { name: 'Meta Ads & Leads', page: 'service-meta-ads' as ActivePage, id: 'footer-srv-ads' },
    { name: 'WhatsApp CRM', page: 'service-whatsapp-crm' as ActivePage, id: 'footer-srv-whatsapp' },
    { name: 'AI Intelligent Agents', page: 'service-ai-agents' as ActivePage, id: 'footer-srv-agents' },
  ];

  const servicesListRight = [
    { name: 'Brand & Promo Design', page: 'service-brand-design' as ActivePage, id: 'footer-srv-brand' },
    { name: 'Social Media Management', page: 'service-social-media' as ActivePage, id: 'footer-srv-social' },
    { name: 'Website Development', page: 'service-website-development' as ActivePage, id: 'footer-srv-website' },
    { name: 'All Services & Overview', page: 'services' as ActivePage, id: 'footer-srv-all', highlight: true },
  ];

  return (
    <footer className="relative bg-[#090C15] border-t border-white/10 pt-16 pb-12 overflow-hidden footer-light-ray" aria-label="Site Footer">
      <div className="footer-rays" />
      <div className="max-w-6xl mx-auto px-4 relative z-10 space-y-12">

        {/* TOP BRAND STATEMENT */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-brand-red font-mono">
            <Sparkles className="w-3.5 h-3.5 text-brand-red" />
            <span>PRAVIBE SMARTTECH STUDIO</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
            Cinematic AI & Performance Marketing
          </h3>
          <p className="text-sm text-text-muted">
            Building next-generation digital campaigns, AI automated workflows, and brand growth engines from Bengaluru, India.
          </p>
        </div>

        {/* SERVICES GLASS CONTAINER */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col items-center mb-8 text-center space-y-1">
            <span className="text-[11px] font-mono font-bold tracking-widest text-brand-red uppercase">
              Capabilities
            </span>
            <h4 className="font-display font-bold text-white text-xl tracking-tight">
              Our Core Services
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 relative">
            {/* Middle Vertical Divider Line for md+ */}
            <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent -translate-x-1/2" />

            {/* Left Services Column */}
            <div className="space-y-3">
              {servicesListLeft.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.page)}
                  id={item.id}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/15 transition-all group cursor-pointer text-left"
                >
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-brand-red group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>

            {/* Right Services Column */}
            <div className="space-y-3">
              {servicesListRight.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.page)}
                  id={item.id}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all group cursor-pointer text-left ${
                    item.highlight 
                      ? 'bg-brand-red/10 border-brand-red/30 hover:bg-brand-red/20 text-brand-red' 
                      : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/5 hover:border-white/15'
                  }`}
                >
                  <span className={`text-sm font-medium ${item.highlight ? 'text-brand-red font-bold' : 'text-slate-300 group-hover:text-white'} transition-colors`}>
                    {item.name}
                  </span>
                  <ChevronRight className={`w-4 h-4 ${item.highlight ? 'text-brand-red' : 'text-text-muted group-hover:text-brand-red'} group-hover:translate-x-0.5 transition-all`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SUPPORT & CONNECT BAR */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div className="space-y-1">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono font-bold text-brand-red uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>Bengaluru Studio HQ</span>
              </div>
              <p className="text-sm text-white font-medium">
                Jayanagar 4th Block, Bengaluru, Karnataka, India
              </p>
            </div>

            {/* Action Chips */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/918970382380"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-support-whatsapp"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-medium transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Line</span>
              </a>

              <a
                href="mailto:pramodsshetty021@gmail.com"
                id="footer-support-email"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 text-xs font-medium transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-brand-red" />
                <span>Email Us</span>
              </a>

              <button
                onClick={() => navigateTo('contact')}
                id="footer-support-schedule"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-red to-orange-500 text-white font-bold text-xs shadow-lg shadow-brand-red/20 hover:opacity-95 transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule AI Audit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM BRAND FOOTER BAR */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg overflow-hidden bg-brand-red/10 border border-brand-red/20 text-white shadow">
              <img 
                src="/logo.png" 
                alt="Pravibe Smarttech Logo" 
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://lh3.googleusercontent.com/d/1Zw4eqVXji9HoJNQ7e0pt_gye_vdtU5Ns";
                }}
              />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-lg text-white">
                Pravibe
              </span>
              <span className="text-[10px] font-mono font-bold tracking-wider text-brand-red uppercase">
                Smarttech
              </span>
            </div>
          </div>

          {/* Copyright & Legal */}
          <div className="text-xs text-text-muted space-y-1">
            <p>
              &copy; 2026 Pravibe Smarttech. All rights reserved.
            </p>
            <div className="flex justify-center md:justify-start gap-3 text-[11px] text-text-muted/60">
              <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
              <span>&middot;</span>
              <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button>
              <span>&middot;</span>
              <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors cursor-pointer">Sitemap</button>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 w-8 rounded-lg bg-white/5 hover:bg-brand-red border border-white/10 flex items-center justify-center text-text-muted hover:text-white transition-all"
              aria-label="Follow us on X"
              id="footer-social-twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 w-8 rounded-lg bg-white/5 hover:bg-brand-red border border-white/10 flex items-center justify-center text-text-muted hover:text-white transition-all"
              aria-label="Follow us on YouTube"
              id="footer-social-youtube"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 w-8 rounded-lg bg-white/5 hover:bg-brand-red border border-white/10 flex items-center justify-center text-text-muted hover:text-white transition-all"
              aria-label="Follow us on LinkedIn"
              id="footer-social-linkedin"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 w-8 rounded-lg bg-white/5 hover:bg-brand-red border border-white/10 flex items-center justify-center text-text-muted hover:text-white transition-all"
              aria-label="Follow us on Instagram"
              id="footer-social-instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
