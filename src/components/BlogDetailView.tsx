import React from 'react';
import { ActivePage, BlogArticle } from '../types';
import { BLOG_ARTICLES } from '../data';
import { Calendar, Clock, ArrowLeft, ChevronRight, User, ArrowUpRight } from 'lucide-react';

interface BlogDetailViewProps {
  articleSlug: string; // e.g. "blog-prompt-to-film"
  setActivePage: (page: ActivePage) => void;
}

export default function BlogDetailView({ articleSlug, setActivePage }: BlogDetailViewProps) {
  // Extract the original article ID by removing the "blog-" prefix
  const articleId = articleSlug.replace('blog-', '');
  const article = BLOG_ARTICLES.find((art) => art.id === articleId);

  if (!article) {
    return (
      <div className="w-full py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold">Article not found</h2>
        <button
          onClick={() => setActivePage('blog')}
          className="text-brand-red underline text-sm"
        >
          Return to blog
        </button>
      </div>
    );
  }

  // Related articles: same category first (excluding current), up to 3
  const relatedArticles = BLOG_ARTICLES.filter((art) => art.id !== article.id)
    .sort((a, b) => {
      if (a.category === article.category && b.category !== article.category) return -1;
      if (b.category === article.category && a.category !== article.category) return 1;
      return 0;
    })
    .slice(0, 3);

  // Render content based on the article ID
  const renderArticleContent = () => {
    switch (article.id) {
      case 'prompt-to-film':
        return (
          <div className="space-y-8 text-text-grey text-sm sm:text-base leading-relaxed">
            <p className="font-medium text-white text-base sm:text-lg">
              The marketing landscape is accelerating at a rate that traditional filming workflows simply cannot survive. Where a high-tier product campaign once demanded weeks of pre-production, specialized locations, casting directors, and multi-million rupee budgets, generative video pipelines now allow creative directors to move from a single line of conceptual text to a final cinematic cut in under 48 hours.
            </p>

            <h2 className="font-display font-bold text-xl sm:text-2xl text-white pt-4">
              1. The Death of the Multi-Million Dollar Shoot
            </h2>
            <p>
              Traditional brand film shoots are notoriously fragile operations. A sudden shift in weather, an actor falling ill, or a simple transport delay can turn a strictly scheduled multi-day production into an expensive logistical nightmare. For modern enterprises launching digital-first campaigns, this slow and volatile setup has become a critical bottleneck.
            </p>
            <p>
              By bypassing physical sets and camera rigs entirely, AI-first creative production shifts the focus back to pure storytelling and strategic impact. We no longer ask what locations we can afford to book; we ask what visual world will drive the absolute highest engagement and customer conversion.
            </p>

            <h2 className="font-display font-bold text-xl sm:text-2xl text-white pt-4">
              2. Inside the Prompt-to-Film Engine: Our 2026 Pipeline
            </h2>
            <p>
              Creating cinematic video from prompt strings is not about tapping a "generate" button and hoping for the best. To build commercial-grade assets, our Jayanagar studio relies on a rigorous multi-tier pipeline that combines generative base frames with precise physics controls and high-fidelity upscaling.
            </p>
            <p>
              We start by using advanced text-to-image systems to lock in high-concept keyframes. These master images establish the lighting, color science, and camera angle. Once approved, the master frame is passed through our temporal motion controllers, where we coordinate cinematic camera pans, dolly moves, and realistic fluid physics. Each generation is carefully guided to avoid common AI artifacts, ensuring a solid, believable world in every shot.
            </p>

            <h2 className="font-display font-bold text-xl sm:text-2xl text-white pt-4">
              3. The Concrete Scenario: Launching "Zephyr Electric's" Luxury EV Campaign
            </h2>
            <p>
              Consider our recent project for Zephyr Electric, a premium EV brand preparing for a rapid national launch. They needed five localized campaign films, each situated in highly dramatic, high-contrast environments—ranging from the rain-soaked streets of nocturnal Tokyo to the windswept salt flats of Utah—and they needed them finalized in three days to align with their PR announcement.
            </p>
            <p>
              Instead of flying a production crew across continents, we drafted five highly specific visual prompts that matched Zephyr's precise brand book. Within 12 hours, we generated stunning 4K sequences depicting the vehicle carving through neon-reflecting puddles and kicking up highly realistic dust trails under a crimson sunset. The total cost was less than 5% of a traditional multi-location shoot, and the campaign launched on time to record-breaking click-through rates.
            </p>

            <h2 className="font-display font-bold text-xl sm:text-2xl text-white pt-4">
              4. Solving the Continuity Problem with Custom Adapters
            </h2>
            <p>
              The most common criticism of AI-generated content is the lack of structural consistency. A product shape might warp between shots, or a character’s face might subtly shift. To eliminate this issue, our studio designs and trains custom structural adapters (LoRA modules) for every client’s physical product.
            </p>
            <p>
              By training these lightweight neural models on multiple high-resolution photos of the product, we lock its geometric identity into our generative pipeline. Whether the car is driving under the midday sun or parked in a moody underground garage, the vehicle remains 100% physically accurate across every single shot.
            </p>

            <h2 className="font-display font-bold text-xl sm:text-2xl text-white pt-4">
              5. Human Craftsmanship as the Final Polish
            </h2>
            <p>
              An automated pipeline is only as good as the human hands directing it. Raw generative video clips look promising, but they are flat, silent, and lack emotional structure. The magic happens in our post-production suite, where our professional editing, cinematic color grading, and multilayered Foley sound design come together.
            </p>
            <p>
              We build custom soundscapes—such as the subtle whir of an electric motor, the crackle of distant thunder, or the swell of a custom-scored musical track—and sync them frame-by-frame with the generative visual flow. It is this intense attention to human design that elevates our AI-first films to the standard of high-end commercial television.
            </p>
          </div>
        );

      case 'crop-nutrition-video':
        return (
          <div className="space-y-8 text-text-grey text-sm sm:text-base leading-relaxed">
            <p className="font-medium text-white text-base sm:text-lg">
              Modern agribusinesses operate under a profound trust deficit. Farmers are inherently practical, risk-averse, and highly skeptical of standard promotional talk. They require tangible, visual proof of efficacy before they will commit their hard-earned capital to a new liquid fertilizer or biological crop enhancer.
            </p>

            <h2 className="font-display font-bold text-xl sm:text-2xl text-white pt-4">
              1. Overcoming the Trust Deficit in Agribusiness
            </h2>
            <p>
              Standard marketing approaches often fail in rural and semi-urban agricultural markets. A billboard with generic crop icons or a basic commercial showing a green field does not answer the farmer's core concern: "Will this specific chemical actually save my yield when the monsoon fails?"
            </p>
            <p>
              To bridge this gap, agribusinesses must move away from generic marketing and toward highly technical, visually authoritative product films that explain the scientific mechanisms of action in simple, persuasive terms.
            </p>

            <h2 className="font-display font-bold text-xl sm:text-2xl text-white pt-4">
              2. Visualizing the Molecular: Nutrient Micro-Simulations
            </h2>
            <p>
              How do you film a chemical compound actively penetrating a root wall? In traditional video production, this is impossible. You are forced to rely on cheap, static 2D diagrams or generic stock animations that look highly unprofessional and fail to build trust.
            </p>
            <p>
              Using advanced generative modeling, our Jayanagar studio builds breathtaking 3D molecular simulations. We show the soil cells under extreme magnification, visualizing the active ingredients of the nutrient solution forming a protective barrier around the plant's root hairs during periods of drought. This physical representation makes the chemical benefits crystal clear and undeniable.
            </p>

            <h2 className="font-display font-bold text-xl sm:text-2xl text-white pt-4">
              3. Localization at Scale Without Multi-Location Crews
            </h2>
            <p>
              India’s agricultural landscape is highly fragmented, with dozens of regional languages, varying soil profiles, and unique crop cycles. A crop film that resonates with a sugarcane farmer in northern Karnataka will completely fail with a cotton farmer in eastern Maharashtra.
            </p>
            <p>
              Creating separate high-fidelity video campaigns for each region with traditional film crews would be prohibitively expensive. Our AI translation and voiceover pipeline solves this by taking a single, master technical video and translating the script into multiple regional dialects—complete with hyper-realistic localized voice clones that match the regional tone, accent, and terminology of the target farming communities.
            </p>

            <h2 className="font-display font-bold text-xl sm:text-2xl text-white pt-4">
              4. A Concrete Case Study: BioRoot-9's Monsoon Campaign
            </h2>
            <p>
              We recently partnered with BioRoot-9, a regional crop nutrition startup launching an organic root stimulant. They needed to launch localized campaigns across four states in Karnataka, Maharashtra, Andhra Pradesh, and Tamil Nadu in under a week.
            </p>
            <p>
              We built a master cinematic video displaying 3D micro-simulations of the formula accelerating root growth under moisture stress. We then generated localized regional versions in Kannada, Marathi, Telugu, and Tamil. The video ad led directly to their regional WhatsApp support line. Within 30 days of the ad launch, BioRoot-9 saw a 40% increase in direct inquiries and a 2.5x return on their Meta advertising budget.
            </p>

            <h2 className="font-display font-bold text-xl sm:text-2xl text-white pt-4">
              5. Direct-to-Field Conversion Design
            </h2>
            <p>
              High-fidelity video is only the beginning. To convert modern farmers, you must make the path to purchase as frictionless as possible. We structure our digital campaigns to lead modern farmers directly from their Meta feeds into a structured, localized WhatsApp conversation.
            </p>
            <p>
              By bypassing complex websites and online forms, we allow the farmer to immediately contact a regional product specialist, get localized advice, and find their nearest dealer in under 60 seconds. This combination of scientific storytelling and conversational convenience is the ultimate key to driving agricultural conversions in the modern era.
            </p>
          </div>
        );

      case 'meta-click-to-whatsapp':
        return (
          <div className="space-y-8 text-text-grey text-sm sm:text-base leading-relaxed">
            <p className="font-medium text-white text-base sm:text-lg">
              For high-value consumer acquisitions, standard marketing funnels are completely broken. If you force a hot prospect to leave their social media feed, wait for a slow website to load, and fill out a tedious 8-field contact form, you will lose up to 80% of your potential leads due to sheer friction.
            </p>

            <h2 className="font-display font-bold text-xl sm:text-2xl text-white pt-4">
              1. The Reality of Lead Decay
            </h2>
            <p>
              The speed at which you respond to an inbound lead dictates your ultimate conversion rate. Research shows that if you do not contact a lead within 5 minutes of their submission, your chances of qualifying them drop by over 300%.
            </p>
            <p>
              Unfortunately, traditional sales teams are rarely equipped to handle leads in real time. Leads sit in spreadsheets for hours, or even days, before an agent finally calls them—by which time the prospect's interest has cooled, or they have already booked a demo with a competitor.
            </p>

            <h2 className="font-display font-bold text-xl sm:text-2xl text-white pt-4">
              2. The Architecture of a 60-Second Conversion
            </h2>
            <p>
              Our Jayanagar studio designs an entirely different model: the Click-to-WhatsApp campaign funnel. When a user clicks on one of our high-fidelity Meta video ads, we bypass the landing page entirely.
            </p>
            <p>
              Instead of loading a standard web page, the click immediately opens a direct WhatsApp chat window with the user's verified phone number pre-loaded. Instantly, our custom lead-qualifying conversational agent triggers a highly personalized, friendly welcome message, starting the sales conversation in under 2 seconds flat.
            </p>

            <h2 className="font-display font-bold text-xl sm:text-2xl text-white pt-4">
              3. Human-Like Automation: Qualifying Without Friction
            </h2>
            <p>
              A conversational chat bot must never feel like a rigid, robotic automated machine. To build real customer trust, our conversational flows are designed to be warm, friendly, and highly responsive.
            </p>
            <p>
              Rather than demanding a wall of text, we structure our qualifying questions using WhatsApp’s interactive quick-reply buttons and simple choices. We ask about the prospect’s specific interests, budget range, and physical location, collecting a complete, structured customer profile in under five quick taps.
            </p>

            <h2 className="font-display font-bold text-xl sm:text-2xl text-white pt-4">
              4. A Concrete Case Study: Prestige Heights Pre-Launch Campaign
            </h2>
            <p>
              Consider a luxury real estate development company in Bengaluru looking to pre-sell 3BHK premium apartments. Traditionally, they would run standard lead-generation ads and wait for sales agents to manually call the leads back.
            </p>
            <p>
              We replaced this with a Click-to-WhatsApp campaign featuring our high-fidelity cinematic video walkthrough. Clicking the ad opened WhatsApp, which instantly greeted the prospect and sent a high-resolution brochure. The interactive flow asked them to specify their desired floor plan, budget range, and preferred date for a physical site visit. Qualified leads were automatically pushed to their CRM, and hot prospects were routed to a live agent in under 45 seconds, resulting in a 250% increase in scheduled site visits.
            </p>

            <h2 className="font-display font-bold text-xl sm:text-2xl text-white pt-4">
              5. Systemic Integration: From Chat to CRM
            </h2>
            <p>
              An automated conversation is only as powerful as the systems backing it. Our WhatsApp automation solutions do not operate in isolation; they are built to integrate seamlessly with your existing technology stack.
            </p>
            <p>
              Once a lead is qualified, the conversational agent automatically syncs the collected data—such as the prospect's name, verified phone number, budget, and product choices—with standard tools like Salesforce, HubSpot, or secure Google Sheets. Your sales team receives a complete, pre-qualified customer dossier, allowing them to close sales with unmatched speed and efficiency.
            </p>
          </div>
        );

      default:
        // Render general/shorter fallback for other articles
        return (
          <div className="space-y-6 text-text-grey text-sm sm:text-base leading-relaxed">
            <p className="font-medium text-white text-base">
              {article.excerpt}
            </p>
            <p>
              At Pravibe Smarttech, we constantly test and refine our approaches to digital marketing, automated pipelines, and creative production. In this field, general rules do not apply; we rely on real, data-driven tests and clear metrics to achieve massive results.
            </p>
            <h2 className="font-display font-bold text-lg text-white pt-2">
              Deep-Dive Analysis
            </h2>
            <p>
              Our creative processes are designed to bridge the gap between high-level brand storytelling and direct response marketing. We combine advanced AI algorithms, structured generative image layers, and robust system setups to deliver premium visual campaigns at a fraction of traditional agency overhead.
            </p>
            <p>
              For more information on how our Jayanagar studio can design a custom creative and automation strategy for your brand, connect with our team directly.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {/* SECTION 1: BREADCRUMBS & ARTICLE HEADER */}
      <section className="relative pt-24 pb-12 px-4 border-b border-white/5 bg-[#050505]">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Breadcrumb row */}
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <button
              onClick={() => setActivePage('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="h-3 w-3" />
            <button
              onClick={() => setActivePage('blog')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Blog
            </button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white font-medium truncate max-w-[200px] sm:max-w-xs">
              {article.title}
            </span>
          </div>

          {/* Tag & Meta info */}
          <div className="space-y-4 pt-4">
            <span className="inline-block bg-brand-red/15 border border-brand-red/30 text-brand-red text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {article.category}
            </span>
            <h1 className="font-display font-black leading-tight text-white text-3xl sm:text-4xl md:text-5xl">
              {article.title}
            </h1>
            
            {/* Meta author and read stats */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-2 text-xs font-mono text-text-muted border-t border-white/5 mt-6">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-brand-red" />
                Author: <strong className="text-white font-medium">{article.author}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-brand-red" />
                Published: <strong className="text-white font-medium">{article.date}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-red" />
                Read Time: <strong className="text-white font-medium">{article.readTime}</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ARTICLE BODY CONTAINER */}
      <section className="py-16 px-4 bg-bg-black">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Main Featured Photo */}
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl relative">
            <img
              src={article.photoUrl}
              alt={article.id === 'prompt-to-film' ? "Illustration of a person and an AI robot shaking hands through a computer screen, representing human and AI collaboration." : article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </div>

          {/* Article Dynamic Content Column */}
          <div className="max-w-3xl mx-auto">
            {renderArticleContent()}
          </div>

          {/* SECTION 3: RECTANGULAR CLOSING CTA CARD */}
          <div className="max-w-3xl mx-auto pt-12">
            <div className="glass-card relative overflow-hidden rounded-2xl p-8 sm:p-12 border border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
              {/* Backglow accent */}
              <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-brand-red/15 rounded-full filter blur-3xl pointer-events-none" />
              
              <div className="space-y-3 relative z-10 text-center md:text-left flex-1">
                <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                  Ready to upgrade your conversion engine?
                </h3>
                <p className="text-xs sm:text-sm text-text-muted max-w-lg leading-relaxed">
                  Connect with our Jayanagar studio. Let us audit your visual asset pipeline and design a custom, high-velocity automation strategy.
                </p>
              </div>

              <div className="relative z-10 shrink-0 w-full sm:w-auto flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setActivePage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-lg bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold transition-colors shadow-lg shadow-brand-red/10 text-center cursor-pointer"
                  id="blog-detail-cta-contact"
                >
                  Talk to us &rarr;
                </button>
                <button
                  onClick={() => {
                    setActivePage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-lg border border-white/20 text-white hover:border-white hover:bg-white/5 text-xs font-bold transition-all text-center cursor-pointer"
                  id="blog-detail-cta-demo"
                >
                  Get a free demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: RELATED ARTICLES STRIP */}
      <section className="py-24 px-4 bg-bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold tracking-widest text-brand-red uppercase block">
                Related Reading
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                More from our <span className="gradient-text-clip">research archives.</span>
              </h2>
            </div>
            <button
              onClick={() => {
                setActivePage('blog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-mono font-bold text-brand-red hover:text-brand-red-hover flex items-center gap-1 cursor-pointer"
              id="related-see-all-blog"
            >
              See all articles &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((art) => (
              <article
                key={art.id}
                onClick={() => {
                  setActivePage(`blog-${art.id}` as ActivePage);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group bg-card-bg/40 border border-border-grey rounded-xl overflow-hidden hover:border-brand-red/30 transition-all flex flex-col justify-between cursor-pointer"
                id={`related-card-${art.id}`}
              >
                <div>
                  <div className="aspect-[16/9] w-full relative overflow-hidden bg-white/5 border-b border-white/5">
                    <img
                      src={art.photoUrl}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-[9px] font-mono font-bold px-2.5 py-1 rounded border border-white/10 uppercase tracking-wider">
                      {art.category}
                    </span>
                  </div>

                  <div className="p-8 space-y-4">
                    <div className="flex items-center gap-4 text-[10px] font-mono text-text-muted">
                      <span>{art.date}</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h3 className="font-display font-bold text-base text-white leading-snug group-hover:text-brand-red transition-colors">
                      {art.title}
                    </h3>

                    <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-8 pt-0 border-t border-white/5 mt-4 flex justify-between items-center text-xs font-mono">
                  <span className="text-text-muted text-[10px]">Author: {art.author}</span>
                  <span className="text-white group-hover:text-brand-red font-bold flex items-center gap-1 transition-colors">
                    Read full &rarr;
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
