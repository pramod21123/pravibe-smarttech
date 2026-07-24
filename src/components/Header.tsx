import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ChevronDown, Sparkles, MessageSquare, Mail, MapPin } from 'lucide-react';
import { ActivePage } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

export default function Header({ activePage, setActivePage }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesAccordionOpen, setIsServicesAccordionOpen] = useState(false);
  const [isMegaMenuVisible, setIsMegaMenuVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
    setIsServicesAccordionOpen(false);
    setIsMegaMenuVisible(false);
  };

  const servicesList = [
    { name: 'AI Video & Films', slug: 'service-ai-video' as ActivePage },
    { name: 'Meta Ads & Leads', slug: 'service-meta-ads' as ActivePage },
    { name: 'WhatsApp CRM', slug: 'service-whatsapp-crm' as ActivePage },
    { name: 'AI Agents & Automation', slug: 'service-ai-agents' as ActivePage },
    { name: 'Brand & Promo Design', slug: 'service-brand-design' as ActivePage },
    { name: 'Social Media Management', slug: 'service-social-media' as ActivePage },
  ];

  return (
    <header className="w-full z-40 transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-black/80 border-b border-white/5 py-2.5 px-4 text-xs font-medium tracking-wide text-text-muted transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-1.5 justify-center">
            <MapPin className="h-3.5 w-3.5 text-brand-red" />
            <span>Jayanagar 4th Block, Bengaluru</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 justify-center">
            <a
              href="mailto:pramodsshetty021@gmail.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              id="top-bar-email"
            >
              <Mail className="h-3.5 w-3.5 text-brand-red" />
              <span>pramodsshetty021@gmail.com</span>
            </a>
            <a
              href="https://wa.me/918970382380"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-brand-red hover:text-brand-red-hover font-bold transition-colors"
              id="top-bar-whatsapp"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'sticky top-0 bg-[#0B0E1A]/95 backdrop-blur-md border-b border-border-grey shadow-lg py-4'
            : 'relative bg-transparent py-6'
        }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 group cursor-pointer focus-ring-custom rounded-md"
            id="nav-logo"
          >
            <div className="relative flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-brand-red to-orange-500 text-white shadow-md shadow-brand-red/20 group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="text-left whitespace-nowrap flex items-baseline gap-1.5 overflow-hidden">
              <motion.span 
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="font-display font-bold text-2xl tracking-tight text-white group-hover:text-brand-red transition-colors duration-300"
              >
                Pravibe
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                className="text-xs font-mono font-bold tracking-wider text-brand-red uppercase relative"
              >
                Smarttech
                <motion.span
                  className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-gradient-to-r from-brand-red to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
                />
              </motion.span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 font-sans font-medium text-sm text-text-grey">
            <button
              onClick={() => navigateTo('home')}
              className={`hover:text-white pb-1 border-b-2 transition-all ${
                activePage === 'home' ? 'text-white border-brand-red' : 'border-transparent'
              }`}
              id="nav-home"
            >
              Home
            </button>

            {/* Mega Menu Wrapper */}
            <div
              className="relative py-1"
              onMouseEnter={() => setIsMegaMenuVisible(true)}
              onMouseLeave={() => setIsMegaMenuVisible(false)}
            >
              <button
                onClick={() => navigateTo('services')}
                className={`flex items-center gap-1 hover:text-white pb-1 border-b-2 transition-all ${
                  activePage === 'services' || activePage.startsWith('service-')
                    ? 'text-white border-brand-red'
                    : 'border-transparent'
                }`}
                id="nav-services-trigger"
              >
                Services
                <ChevronDown className="h-4 w-4 text-text-muted" />
              </button>

              {/* Mega Menu Dropdown */}
              {isMegaMenuVisible && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[720px] z-50 text-gray-900 transition-all duration-250 animate-in fade-in slide-in-from-top-2"
                  id="nav-services-megamenu"
                >
                  <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                    <div className="grid grid-cols-12">
                      {/* Left Panel */}
                      <div className="col-span-4 bg-gray-50 p-6 flex flex-col justify-between border-r border-gray-100">
                        <div>
                          <h4 className="font-display font-bold text-base text-gray-900 mb-2">
                            Creative Studio Stack
                          </h4>
                          <p className="text-xs text-gray-500 leading-relaxed mb-4">
                            We combine advanced AI models with rigorous human design, copywriting, and strategy.
                          </p>
                        </div>
                        <button
                          onClick={() => navigateTo('services')}
                          className="text-xs font-bold text-brand-red hover:text-brand-red-hover flex items-center gap-1"
                          id="megamenu-see-all"
                        >
                          See all services &rarr;
                        </button>
                      </div>

                      {/* Right Service Grid */}
                      <div className="col-span-8 p-6">
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                          {servicesList.map((srv) => (
                            <button
                              key={srv.slug}
                              onClick={() => navigateTo(srv.slug)}
                              className="text-left group/item cursor-pointer focus:outline-none"
                              id={`megamenu-link-${srv.slug}`}
                            >
                              <span className="block text-sm font-semibold text-gray-900 group-hover/item:text-brand-red transition-colors">
                                {srv.name}
                              </span>
                              <span className="block text-[11px] text-gray-400 mt-0.5 leading-snug">
                                View full guide &rarr;
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Strip */}
                    <button
                      onClick={() => navigateTo('about')}
                      className="w-full text-left bg-gradient-to-r from-brand-red to-orange-500 px-6 py-2.5 text-xs font-semibold text-white flex justify-between items-center hover:opacity-95 transition-opacity"
                      id="megamenu-strip"
                    >
                      <span>Creative built for the AI era — Learn more</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('blog')}
              className={`hover:text-white pb-1 border-b-2 transition-all ${
                activePage === 'blog' || activePage.startsWith('blog-') ? 'text-white border-brand-red' : 'border-transparent'
              }`}
              id="nav-blog"
            >
              Blog
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`hover:text-white pb-1 border-b-2 transition-all ${
                activePage === 'about' ? 'text-white border-brand-red' : 'border-transparent'
              }`}
              id="nav-about"
            >
              About
            </button>
          </div>

          {/* Desktop Right CTA buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => navigateTo('contact')}
              className="px-5 py-2.5 rounded-lg bg-brand-red text-white text-xs font-bold hover:bg-brand-red-hover transition-colors shadow-md shadow-brand-red/10 cursor-pointer"
              id="header-cta-demo"
            >
              Get a free demo
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="px-5 py-2.5 rounded-lg border border-white/20 text-white text-xs font-bold hover:border-white hover:bg-white/5 transition-all cursor-pointer"
              id="header-cta-contact"
            >
              Contact us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-text-grey hover:text-white focus:outline-none"
            aria-label="Toggle mobile menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Slide-down Menu */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden w-full bg-[#0B0E1A] border-t border-border-grey px-4 py-6 flex flex-col gap-5 text-base font-medium text-text-grey animate-in fade-in slide-in-from-top-4"
            id="mobile-menu-container"
          >
            <button
              onClick={() => navigateTo('home')}
              className={`text-left py-2 hover:text-white ${
                activePage === 'home' ? 'text-brand-red font-bold' : ''
              }`}
              id="mobile-nav-home"
            >
              Home
            </button>

            {/* Mobile Services Accordion */}
            <div className="flex flex-col">
              <button
                onClick={() => setIsServicesAccordionOpen(!isServicesAccordionOpen)}
                className="flex items-center justify-between py-2 text-left hover:text-white"
                id="mobile-nav-services-trigger"
              >
                <span>Services</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isServicesAccordionOpen ? 'rotate-180 text-brand-red' : 'text-text-muted'
                  }`}
                />
              </button>
              {isServicesAccordionOpen && (
                <div className="pl-4 flex flex-col gap-3 border-l border-brand-red/30 py-2 mt-1">
                  <button
                    onClick={() => navigateTo('services')}
                    className="text-left text-sm py-1.5 font-bold text-brand-red"
                    id="mobile-nav-services-all"
                  >
                    Services Overview &rarr;
                  </button>
                  {servicesList.map((srv) => (
                    <button
                      key={srv.slug}
                      onClick={() => navigateTo(srv.slug)}
                      className="text-left text-sm py-1.5 hover:text-white"
                      id={`mobile-nav-link-${srv.slug}`}
                    >
                      {srv.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('blog')}
              className={`text-left py-2 hover:text-white ${
                activePage === 'blog' || activePage.startsWith('blog-') ? 'text-brand-red font-bold' : ''
              }`}
              id="mobile-nav-blog"
            >
              Blog
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`text-left py-2 hover:text-white ${
                activePage === 'about' ? 'text-brand-red font-bold' : ''
              }`}
              id="mobile-nav-about"
            >
              About
            </button>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
              <button
                onClick={() => navigateTo('contact')}
                className="w-full py-3 rounded-lg bg-brand-red text-white text-center font-bold hover:bg-brand-red-hover transition-colors shadow-md shadow-brand-red/10"
                id="mobile-cta-demo"
              >
                Get a free demo
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="w-full py-3 rounded-lg border border-white/20 text-white text-center font-bold hover:border-white hover:bg-white/5 transition-all"
                id="mobile-cta-contact"
              >
                Contact us
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
