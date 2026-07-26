import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ActivePage } from '../types';
import { getActivePageFromPath, getPagePath } from '../utils/routes';

interface HeaderProps {
  activePage?: ActivePage;
  setActivePage?: (page: ActivePage) => void;
}

export default function Header({ activePage: propActivePage, setActivePage }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const activePage = propActivePage || getActivePageFromPath(location.pathname);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesAccordionOpen, setIsServicesAccordionOpen] = useState(false);
  const [isMegaMenuVisible, setIsMegaMenuVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: ActivePage) => {
    if (setActivePage) {
      setActivePage(page);
    } else {
      navigate(getPagePath(page));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    { name: 'Website Development', slug: 'service-website-development' as ActivePage },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-[#0B0E1A]/85 backdrop-blur-xl border-b border-white/10 shadow-xl">
      {/* Main Navigation */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled ? 'py-3.5' : 'py-4 sm:py-5'
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
            className="lg:hidden p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-text-grey hover:text-white focus:outline-none rounded-lg border border-white/10 bg-white/5"
            aria-label="Toggle mobile menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Slide-down Menu */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden w-full bg-[#0B0E1A]/98 backdrop-blur-xl border-t border-border-grey px-5 py-6 flex flex-col gap-4 text-base font-medium text-text-grey animate-in fade-in slide-in-from-top-4 shadow-2xl"
            id="mobile-menu-container"
          >
            <button
              onClick={() => navigateTo('home')}
              className={`text-left min-h-[44px] flex items-center px-3 rounded-lg hover:bg-white/5 hover:text-white transition-colors ${
                activePage === 'home' ? 'text-brand-red font-bold bg-white/5' : ''
              }`}
              id="mobile-nav-home"
            >
              Home
            </button>

            {/* Mobile Services Accordion */}
            <div className="flex flex-col">
              <button
                onClick={() => setIsServicesAccordionOpen(!isServicesAccordionOpen)}
                className="flex items-center justify-between min-h-[44px] px-3 rounded-lg text-left hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
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
                <div className="pl-4 flex flex-col gap-1 border-l border-brand-red/30 py-2 mt-1">
                  <button
                    onClick={() => navigateTo('services')}
                    className="text-left text-sm min-h-[40px] flex items-center px-3 rounded-md font-bold text-brand-red hover:bg-white/5"
                    id="mobile-nav-services-all"
                  >
                    Services Overview &rarr;
                  </button>
                  {servicesList.map((srv) => (
                    <button
                      key={srv.slug}
                      onClick={() => navigateTo(srv.slug)}
                      className="text-left text-sm min-h-[40px] flex items-center px-3 rounded-md hover:bg-white/5 hover:text-white transition-colors"
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
              className={`text-left min-h-[44px] flex items-center px-3 rounded-lg hover:bg-white/5 hover:text-white transition-colors ${
                activePage === 'blog' || activePage.startsWith('blog-') ? 'text-brand-red font-bold bg-white/5' : ''
              }`}
              id="mobile-nav-blog"
            >
              Blog
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`text-left min-h-[44px] flex items-center px-3 rounded-lg hover:bg-white/5 hover:text-white transition-colors ${
                activePage === 'about' ? 'text-brand-red font-bold bg-white/5' : ''
              }`}
              id="mobile-nav-about"
            >
              About
            </button>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => navigateTo('contact')}
                className="w-full min-h-[48px] py-3.5 rounded-xl bg-brand-red text-white text-center font-bold hover:bg-brand-red-hover transition-colors shadow-lg shadow-brand-red/15 cursor-pointer"
                id="mobile-cta-demo"
              >
                Get a free demo
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="w-full min-h-[48px] py-3.5 rounded-xl border border-white/20 text-white text-center font-bold hover:border-white hover:bg-white/5 transition-all cursor-pointer"
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
