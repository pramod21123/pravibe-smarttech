import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import ServiceDetailView from './components/ServiceDetailView';
import BlogDetailView from './components/BlogDetailView';
import BlogView from './components/BlogView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import { ActivePage } from './types';

export default function App() {
  // Simple state-based routing (without hash routing)
  const [activePage, setActivePage] = useState<ActivePage>(() => {
    const saved = sessionStorage.getItem('activePage');
    return (saved as ActivePage) || 'home';
  });

  // Clear hash on mount if present, to keep URLs clean and migrate legacy links
  useEffect(() => {
    if (window.location.hash) {
      const oldHash = window.location.hash.replace('#/', '');
      const validRoutes: ActivePage[] = [
        'home', 'services', 'service-ai-video', 'service-meta-ads', 
        'service-whatsapp-crm', 'service-ai-agents', 'service-brand-design', 
        'service-social-media', 'service-website-development', 'blog', 'about', 'contact',
        'blog-prompt-to-film', 'blog-ai-walkthroughs-prelaunch',
        'blog-crop-nutrition-video', 'blog-meta-click-to-whatsapp',
        'blog-shelf-appeal-feed', 'blog-cost-traditional-vs-ai',
        'blog-drone-vs-ai-flythroughs', 'blog-real-estate-launch-film-length'
      ];
      if (validRoutes.includes(oldHash as ActivePage)) {
        setActivePage(oldHash as ActivePage);
        sessionStorage.setItem('activePage', oldHash);
      }
      // Remove hash from address bar
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  const handlePageChange = (page: ActivePage) => {
    setActivePage(page);
    sessionStorage.setItem('activePage', page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SEO: Update HTML Meta Title and Description on View changes
  useEffect(() => {
    let title = 'Pravibe Smarttech | AI-First Creative Studio Bengaluru';
    let description = 'High-fidelity video production, Meta lead ads, and WhatsApp CRM automations for real estate, FMCG, and agribusinesses in Jayanagar, Bengaluru.';

    switch (activePage) {
      case 'home':
        title = 'Pravibe Smarttech | AI-First Creative Studio Jayanagar';
        description = 'High-fidelity video production, Meta lead ads, and WhatsApp CRM automations for real estate, FMCG, and agribusinesses in Jayanagar, Bengaluru.';
        break;
      case 'services':
        title = 'Specialist Capabilities & Pipelines | Pravibe Smarttech';
        description = 'Explore our full production and lead acquisition services under one roof: AI Video, Meta Ads, WhatsApp CRM, and Custom Intelligent Agents.';
        break;
      case 'service-ai-video':
        title = 'AI Video & Films Pipeline | Pravibe Smarttech';
        description = 'High-end cinematic AI video production that slashes traditional shoot budgets by 70%. Storyboarding, localized voiceovers, and premium rendering.';
        break;
      case 'service-meta-ads':
        title = 'Meta Ads & Lead Generation | Pravibe Smarttech';
        description = 'Facebook & Instagram conversion campaigns engineered for serious ROAS and predictable buyer pipelines.';
        break;
      case 'service-whatsapp-crm':
        title = 'WhatsApp CRM Integration | Pravibe Smarttech';
        description = 'Convert lead clicks into qualified buyer conversations in under 60 seconds with our automated chat sequences.';
        break;
      case 'service-ai-agents':
        title = 'AI Intelligent Agents & Automation | Pravibe Smarttech';
        description = 'Custom AI agents trained on your business knowledge to resolve front-line inquiries and book appointments 24/7.';
        break;
      case 'service-brand-design':
        title = 'Brand & Promo Design Studio | Pravibe Smarttech';
        description = 'Scroll-stopping digital brand identities, packaging concepts, and collateral optimized specifically for mobile screens.';
        break;
      case 'service-social-media':
        title = 'Social Media Management | Pravibe Smarttech';
        description = 'Full-service content scheduling, video script-writing, and audience engagement to turn social into a compounding asset.';
        break;
      case 'service-website-development':
        title = 'Website Development | Pravibe Smarttech';
        description = 'High-converting landing page layouts and custom multipage website experiences built for sub-second speed and lead capture.';
        break;
      case 'blog-prompt-to-film':
        title = 'Prompt-to-Film Pipeline | Pravibe Insights';
        description = 'How one line of text becomes a cinematic launch campaign. Read our deep research on prompt structures and video continuity.';
        break;
      case 'blog-crop-nutrition-video':
        title = 'Selling Crop Nutrition on Video | Pravibe Insights';
        description = 'A guide on how 3D molecular micro-simulations and localized voiceovers convert risk-averse modern farmers.';
        break;
      case 'blog-meta-click-to-whatsapp':
        title = 'Direct Click-to-WhatsApp Conversions | Pravibe Insights';
        description = 'How bypassing landing pages and using automated qualifying flows drives massive sales under 60 seconds.';
        break;
      case 'blog':
        title = 'Pravibe Insights & Deep Research';
        description = 'Read our findings on prompt-to-film pipelines, real estate launch film retention, agricultural video conversions, and instant lead reply automations.';
        break;
      case 'about':
        title = 'About Our Founder & Studio | Pravibe Smarttech';
        description = "Built by people who'd rather ship than pitch. Discover Pramod Shetty's story, values, and our Jayanagar studio structure.";
        break;
      case 'contact':
        title = 'Get a Free Demo Video | Contact Pravibe Smarttech';
        description = 'Book an campaign audit with Pramod Shetty. Submit your project parameters to receive a custom AI cinematic storyboard draft.';
        break;
    }

    document.title = title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Inject JSON-LD structured schema dynamically for home & blog pages
    const oldSchema = document.getElementById('jsonld-schema');
    if (oldSchema) oldSchema.remove();

    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('id', 'jsonld-schema');

    if (activePage === 'home') {
      script.innerHTML = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        'name': 'Pravibe Smarttech',
        'description': description,
        'image': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80',
        'telephone': '+91-8970382380',
        'email': 'pramodsshetty021@gmail.com',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Jayanagar 4th Block',
          'addressLocality': 'Bengaluru',
          'addressRegion': 'Karnataka',
          'postalCode': '560041',
          'addressCountry': 'IN'
        },
        'founder': {
          '@type': 'Person',
          'name': 'Pramod Shetty'
        },
        'areaServed': ['Bengaluru', 'Karnataka', 'India'],
        'knowsAbout': ['AI Video', 'Meta Lead Ads', 'WhatsApp Automation', 'AI Chat Agents', 'Brand Design']
      });
      document.head.appendChild(script);
    } else if (activePage === 'blog') {
      script.innerHTML = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        'name': 'Pravibe Insights & Deep Research',
        'description': description,
        'publisher': {
          '@type': 'Organization',
          'name': 'Pravibe Smarttech',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80'
          }
        }
      });
      document.head.appendChild(script);
    }
  }, [activePage]);

  // View router selection mapper
  const renderActiveView = () => {
    if (activePage.startsWith('service-')) {
      return (
        <ServiceDetailView
          serviceSlug={activePage}
          setActivePage={handlePageChange}
        />
      );
    }

    if (activePage.startsWith('blog-')) {
      return (
        <BlogDetailView
          articleSlug={activePage}
          setActivePage={handlePageChange}
        />
      );
    }

    switch (activePage) {
      case 'home':
        return <HomeView setActivePage={handlePageChange} />;
      case 'services':
        return <ServicesView setActivePage={handlePageChange} />;
      case 'blog':
        return <BlogView setActivePage={handlePageChange} />;
      case 'about':
        return <AboutView setActivePage={handlePageChange} />;
      case 'contact':
        return <ContactView setActivePage={handlePageChange} />;
      default:
        return <HomeView setActivePage={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0E1A] text-white overflow-x-hidden antialiased">
      {/* Universal header layout */}
      <Header activePage={activePage} setActivePage={handlePageChange} />

      {/* Main interactive SPA stage */}
      <main className="flex-grow w-full relative">
        <div className="w-full">
          {renderActiveView()}
        </div>
      </main>

      {/* Universal footer layout */}
      <Footer setActivePage={handlePageChange} />

      {/* Persistent floating WhatsApp connection */}
      <WhatsAppButton />
    </div>
  );
}
