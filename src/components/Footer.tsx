import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Twitter, Youtube, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import { ActivePage } from '../types';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const navigateTo = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0B0E1A] border-t border-border-grey pt-16 pb-12 overflow-hidden footer-light-ray" aria-label="Site Footer">
      <div className="footer-rays" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Column 1: Company */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold text-white text-sm tracking-wide uppercase">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-text-muted">
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                  id="footer-about"
                >
                  About Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('blog')}
                  className="hover:text-white transition-colors cursor-pointer"
                  id="footer-blog"
                >
                  Latest Insights
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors cursor-pointer group flex items-center gap-1"
                  id="footer-careers"
                >
                  Careers <span className="text-[10px] bg-brand-red/10 text-brand-red px-1.5 py-0.5 rounded font-bold group-hover:bg-brand-red group-hover:text-white transition-all">We're hiring</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold text-white text-sm tracking-wide uppercase">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-text-muted">
              <li>
                <button
                  onClick={() => navigateTo('service-ai-video')}
                  className="hover:text-white transition-colors text-left"
                  id="footer-srv-video"
                >
                  AI Video & Films
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('service-meta-ads')}
                  className="hover:text-white transition-colors text-left"
                  id="footer-srv-ads"
                >
                  Meta Ads & Leads
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('service-whatsapp-crm')}
                  className="hover:text-white transition-colors text-left"
                  id="footer-srv-whatsapp"
                >
                  WhatsApp CRM
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('service-ai-agents')}
                  className="hover:text-white transition-colors text-left"
                  id="footer-srv-agents"
                >
                  AI Intelligent Agents
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('service-brand-design')}
                  className="hover:text-white transition-colors text-left"
                  id="footer-srv-brand"
                >
                  Brand & Promo Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('service-social-media')}
                  className="hover:text-white transition-colors text-left"
                  id="footer-srv-social"
                >
                  Social Media Management
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Industries */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold text-white text-sm tracking-wide uppercase">
              Industries
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-text-muted">
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors text-left"
                  id="footer-ind-agriculture"
                >
                  Precision Agriculture
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors text-left"
                  id="footer-ind-fmcg"
                >
                  Consumer Foods & FMCG
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors text-left"
                  id="footer-ind-services"
                >
                  B2C Service Sectors
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold text-white text-sm tracking-wide uppercase">
              Support & Connect
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-text-muted">
              <li>
                <a
                  href="https://wa.me/918970382380"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  id="footer-support-whatsapp"
                >
                  WhatsApp Studio Line
                </a>
              </li>
              <li>
                <a
                  href="mailto:pramodsshetty021@gmail.com"
                  className="hover:text-white transition-colors text-left break-all"
                  id="footer-support-email"
                >
                  pramodsshetty021@gmail.com
                </a>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1 group"
                  id="footer-support-schedule"
                >
                  Schedule an AI Audit <ArrowUpRight className="h-3 w-3 text-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li className="text-[11px] text-text-muted/60 mt-1">
                Jayanagar 4th Block,<br />Bengaluru, Karnataka
              </li>
            </ul>
          </div>

          {/* Column 5: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold text-white text-sm tracking-wide uppercase">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-text-muted">
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                  id="footer-ql-services"
                >
                  All Services Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-brand-red font-bold"
                  id="footer-ql-demo"
                >
                  Request a Free Demo
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-brand-red to-orange-500 text-white shadow">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div className="text-left whitespace-nowrap flex items-baseline gap-1.5 overflow-hidden">
              <motion.span 
                initial={{ opacity: 0, y: 3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="font-display font-bold text-lg text-white hover:text-brand-red transition-colors duration-300"
              >
                Pravibe
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: -5 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                className="text-[10px] font-mono font-bold tracking-wider text-brand-red uppercase relative"
              >
                Smarttech
                <motion.span
                  className="absolute -bottom-0.5 left-0 right-0 h-[1px] bg-gradient-to-r from-brand-red to-orange-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
                />
              </motion.span>
            </div>
          </div>

          <div className="text-xs text-text-muted text-center md:text-left">
            <p className="mb-1">
              Copyright &copy; 2026 Pravibe Smarttech. Jayanagar 4th Block, Bengaluru. All rights reserved.
            </p>
            <div className="flex justify-center md:justify-start gap-3 mt-1.5 text-[11px] text-text-muted/60">
              <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">Privacy Policy</button>
              <span>&middot;</span>
              <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">Terms of Use</button>
              <span>&middot;</span>
              <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">Sitemap</button>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-brand-red transition-all"
              aria-label="Follow us on X"
              id="footer-social-twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-brand-red transition-all"
              aria-label="Follow us on YouTube"
              id="footer-social-youtube"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-brand-red transition-all"
              aria-label="Follow us on LinkedIn"
              id="footer-social-linkedin"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-brand-red transition-all"
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
