import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ActivePage } from '../types';
import { Phone, Mail, MapPin, CheckCircle2, MessageSquare, HelpCircle, ChevronDown, Sparkles, Send, ExternalLink } from 'lucide-react';

interface CustomDropdownProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

function CustomDropdown({
  id,
  name,
  value,
  onChange,
  options
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    const currentIndex = options.findIndex(opt => opt.value === value);
    setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
  };

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(0);
      } else {
        setFocusedIndex((prev) => (prev + 1) % options.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(options.length - 1);
      } else {
        setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isOpen) {
        if (focusedIndex >= 0 && focusedIndex < options.length) {
          handleSelect(options[focusedIndex].value);
        }
      } else {
        setIsOpen(true);
      }
    }
  };

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div ref={containerRef} className="relative w-full" id={`${id}-wrapper`}>
      <input type="hidden" name={name} value={value} id={id} />

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={`${id}-label`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white text-left focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red transition-all cursor-pointer flex justify-between items-center h-[42px]"
      >
        <span>{selectedOption.label}</span>
        <ChevronDown className={`h-4 w-4 text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-red' : ''}`} />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          tabIndex={-1}
          className="absolute z-50 w-full mt-2 rounded-lg bg-[#12162A] border border-[#262B45] py-1 shadow-2xl max-h-60 overflow-y-auto"
        >
          {options.map((opt, idx) => {
            const isSelected = opt.value === value;
            const isFocused = idx === focusedIndex;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.value)}
                onMouseEnter={() => setFocusedIndex(idx)}
                className={`px-4 py-2.5 text-xs transition-colors cursor-pointer select-none ${
                  isSelected 
                    ? 'bg-brand-red text-[#1A1710] font-bold' 
                    : isFocused 
                    ? 'bg-brand-red/10 text-brand-red font-medium' 
                    : 'text-white/90 hover:bg-white/5'
                }`}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

interface ContactViewProps {
  setActivePage: (page: ActivePage) => void;
}

export default function ContactView({ setActivePage }: ContactViewProps) {
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'AI Video & Films',
    message: ''
  });

  const [lastSubmittedData, setLastSubmittedData] = useState<typeof formData | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ Accordion states
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqItems = [
    {
      q: 'How fast can you turn around a video?',
      a: 'We deliver initial high-fidelity video concepts and scripts within 24 hours of brief agreement. First-cut cinematic renderings and full grading are delivered within 48 hours, guaranteed.'
    },
    {
      q: 'Do you work outside Bengaluru?',
      a: 'Absolutely. While our physical studio is located in Jayanagar, Bengaluru, we work with builders, brand developers, and tech companies across India and globally via remote screen-shares and instant messaging.'
    },
    {
      q: 'What is the minimum project size?',
      a: 'We do not enforce rigid minimum lock-ins. We prefer to launch with a highly focused single-campaign pilot or short-form series so you can measure our turnaround speed and conversion metrics firsthand.'
    },
    {
      q: 'Will you integrate the CRM with our current sales sheets?',
      a: 'Yes. Our WhatsApp CRM and AI agent qualifying funnels are built to integrate directly with standard sales CRM systems, HubSpot, Salesforce, or simply clean auto-populating Google Sheets.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim()) newErrors.message = 'Please provide a short description of your project.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSending(true);
      const submitted = { ...formData };
      setLastSubmittedData(submitted);

      const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzizZgMOKEfUB_1Q9rdn4DKiqN6zs8nNqSUErf25KjEZ5-1bVtR6tmaCnW_QuLM5_84vw/exec';

      try {
        await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({
            name: submitted.name,
            email: submitted.email,
            phone: submitted.phone,
            message: submitted.message,
          }),
        });
      } catch (err) {
        console.warn('Apps Script submission error:', err);
      }

      setIsSending(false);
      setIsSubmitted(true);

      // Reset form fields
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: 'AI Video & Films',
        message: ''
      });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* SECTION 1: CONTACT HERO */}
      <section className="relative eclipse-bg pt-12 sm:pt-20 pb-12 sm:pb-24 px-4 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="text-xs font-mono font-semibold tracking-widest text-brand-red uppercase block">
            Partner With Us
          </span>
          <h1 className="font-display font-black leading-tight text-white tracking-tight text-4xl sm:text-5xl md:text-6xl">
            Let's build your <span className="gradient-text-clip">next campaign.</span>
          </h1>
          <p className="text-text-grey text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Ready to integrate high-velocity video rendering and automated qualifying flows into your business? Submit your brief below and our studio lead will coordinate.
          </p>
        </div>
      </section>

      {/* SECTION 2: TWO-COLUMN FORM WORKSPACE (DARK) */}
      <section className="py-12 sm:py-24 px-4 bg-bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <span className="text-xs font-mono text-brand-red font-bold uppercase tracking-wider block">
                Direct Channels
              </span>
              <h2 className="font-display font-black text-3xl text-white tracking-tight">
                Get in touch immediately.
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                Skip the administrative layers. Call our studio direct line or schedule a brief walking consult at our Jayanagar location.
              </p>
            </div>

            <div className="bg-card-bg border border-border-grey rounded-2xl p-8 space-y-6 shadow-xl relative">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-red to-orange-500" />
              
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-red shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Call / WhatsApp Line
                  </h4>
                  <a
                    href="tel:+918970382380"
                    className="text-base font-bold text-white hover:text-brand-red transition-colors block mt-1"
                    id="contact-phone"
                  >
                    +91 89703 82380
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t border-white/5 pt-6">
                <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-red shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Studio Email Direct
                  </h4>
                  <a
                    href="mailto:pramodsshetty021@gmail.com"
                    className="text-base font-bold text-white hover:text-brand-red transition-colors block mt-1 break-all"
                    id="contact-email"
                  >
                    pramodsshetty021@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t border-white/5 pt-6">
                <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-red shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Bengaluru Studio Location
                  </h4>
                  <p className="text-sm font-semibold text-white mt-1 leading-relaxed">
                    Jayanagar 4th Block, Bengaluru, Karnataka, India
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <a
              href="https://wa.me/918970382380"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 rounded-xl bg-gradient-to-r from-brand-red to-orange-500 hover:opacity-95 text-white text-center font-bold text-sm shadow-lg shadow-brand-red/10 transition-all cursor-pointer"
              id="contact-whatsapp-direct"
            >
              Start WhatsApp Chat &rarr;
            </a>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-card-bg/50 border border-border-grey rounded-2xl p-8 sm:p-10 shadow-2xl relative">
              {isSubmitted ? (
                <div className="text-center py-6 space-y-8 animate-in fade-in" id="contact-success-panel">
                  <div className="h-20 w-20 bg-emerald-500/15 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/20">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                  <div className="space-y-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400 tracking-widest uppercase inline-block">
                      MESSAGE SENT SUCCESSFULLY
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                      Message Submitted Successfully!
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto leading-relaxed">
                      Thank you! Your inquiry has been submitted successfully and our team will get back to you shortly.
                    </p>
                  </div>

                  {/* Brief Preview Card */}
                  {lastSubmittedData && (
                    <div className="bg-[#12162A]/80 border border-[#262B45] rounded-xl p-5 text-left space-y-3 font-sans shadow-lg backdrop-blur-md">
                      <div className="flex justify-between items-center pb-2 border-b border-white/10">
                        <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                          Dispatched Message Summary
                        </span>
                        <span className="text-[10px] font-mono text-text-muted">{lastSubmittedData.service}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-[11px]">
                        <div>
                          <span className="text-text-muted block font-mono">CLIENT NAME</span>
                          <span className="text-white font-bold">{lastSubmittedData.name}</span>
                        </div>
                        {lastSubmittedData.company && (
                          <div>
                            <span className="text-text-muted block font-mono">COMPANY</span>
                            <span className="text-white font-semibold">{lastSubmittedData.company}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-text-muted block font-mono">SENDER EMAIL</span>
                          <span className="text-white break-all">{lastSubmittedData.email}</span>
                        </div>
                        {lastSubmittedData.phone && (
                          <div>
                            <span className="text-text-muted block font-mono">WHATSAPP / PHONE</span>
                            <span className="text-white">{lastSubmittedData.phone}</span>
                          </div>
                        )}
                      </div>
                      <div className="pt-2 border-t border-white/10">
                        <span className="text-text-muted block text-[10px] font-mono">MESSAGE BODY</span>
                        <p className="text-[11px] text-white/90 italic leading-relaxed mt-1 line-clamp-3">
                          "{lastSubmittedData.message}"
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-mono text-text-muted hover:text-brand-red transition-colors underline decoration-dotted underline-offset-4 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" id="campaign-brief-form">
                  <h3 className="font-display font-bold text-xl text-white mb-2">
                    Describe your project parameters
                  </h3>

                  {/* Name field */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="form-name" className="text-[11px] font-mono font-semibold text-text-muted uppercase tracking-wider">
                      Your Full Name <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="form-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-text-muted/50 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                      placeholder="e.g. Pramod Shetty"
                    />
                    {errors.name && (
                      <p className="text-[10px] text-brand-red font-medium">{errors.name}</p>
                    )}
                  </div>

                  {/* Email & Phone grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                    <div className="space-y-1.5">
                      <label htmlFor="form-email" className="text-[11px] font-mono font-semibold text-text-muted uppercase tracking-wider">
                        Business Email Address <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="email"
                        id="form-email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-text-muted/50 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                        placeholder="e.g. name@company.com"
                      />
                      {errors.email && (
                        <p className="text-[10px] text-brand-red font-medium">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label htmlFor="form-phone" className="text-[11px] font-mono font-semibold text-text-muted uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="form-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-text-muted/50 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                        placeholder="e.g. +91 98765 43210"
                      />
                    </div>
                  </div>

                  {/* Company & Service interested in */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                    <div className="space-y-1.5">
                      <label htmlFor="form-company" className="text-[11px] font-mono font-semibold text-text-muted uppercase tracking-wider">
                        Company / Business Name
                      </label>
                      <input
                        type="text"
                        id="form-company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-text-muted/50 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                        placeholder="e.g. Zuari Infraworld"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label htmlFor="form-service" className="text-[11px] font-mono font-semibold text-text-muted uppercase tracking-wider" id="form-service-label">
                        Service Interested In
                      </label>
                      <CustomDropdown
                        id="form-service"
                        name="service"
                        value={formData.service}
                        onChange={(val) => {
                          setFormData((prev) => ({ ...prev, service: val }));
                        }}
                        options={[
                          { value: 'AI Video & Films', label: 'AI Video & Films' },
                          { value: 'Meta Ads & Leads', label: 'Meta Ads & Leads' },
                          { value: 'WhatsApp CRM', label: 'WhatsApp CRM Integration' },
                          { value: 'AI Agents', label: 'AI Intelligent Agents' },
                          { value: 'Brand & Promo Design', label: 'Brand & Promo Design' },
                          { value: 'Social Media Management', label: 'Social Media Management' },
                          { value: 'Not sure yet', label: 'Not sure yet / Multiple' }
                        ]}
                      />
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="form-message" className="text-[11px] font-mono font-semibold text-text-muted uppercase tracking-wider">
                      Brief Project Description <span className="text-brand-red">*</span>
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-text-muted/50 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red transition-all resize-none"
                      placeholder="e.g. We are launching a new plot development in North Bengaluru and need 3 cinematic AI walkthrough videos and automated WhatsApp sequences."
                    />
                    {errors.message && (
                      <p className="text-[10px] text-brand-red font-medium">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-4 rounded-lg bg-brand-red text-white text-xs font-bold hover:bg-brand-red-hover transition-all shadow-lg shadow-brand-red/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-wait"
                    id="form-submit-btn"
                  >
                    {isSending ? (
                      <>
                        <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Sending message to pramodsshetty021@gmail.com...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: FAQ ACCORDION (LITTLE WHITE MIXTURE / WHITE BACKGROUND) */}
      <section className="py-12 sm:py-24 px-4 bg-[#F7F4EE] text-[#1A1710]">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold text-[#F2A64A] uppercase tracking-widest block">
              Clarifications
            </span>
            <h2 className="font-display font-black text-3xl text-[#1A1710] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto text-left">
            {faqItems.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-black/5 rounded-xl overflow-hidden bg-white/80"
                  id={`faq-item-${idx}`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-white/40 transition-colors focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                    id={`faq-trigger-${idx}`}
                  >
                    <span className="font-display font-bold text-sm text-[#1A1710] flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-brand-red shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform ${
                        isOpen ? 'rotate-180 text-brand-red' : ''
                      }`}
                    />
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#1A1710]/70 leading-relaxed border-t border-black/5 animate-in fade-in slide-in-from-top-1" id={`faq-answer-${idx}`}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
