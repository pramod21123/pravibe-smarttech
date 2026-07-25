import { Service, BlogArticle, CaseStudy } from './types';

export const SERVICES: Service[] = [
  {
    id: 'ai-video',
    slug: 'service-ai-video',
    title: 'AI Video & Films',
    shortDesc: 'Cinematic AI-first video production that bypasses expensive physical shoots.',
    longDesc: 'Traditional video shoots demand massive budgets, casting, site scouts, and weeks of post-production. Our AI-first video pipeline delivers high-impact, premium cinematic films in a fraction of the time. We combine advanced generative video models with professional storytelling, human direction, and expert sound design to create campaign-ready videos for social feeds, websites, and launch campaigns.',
    icon: 'Film',
    features: [
      'Pre-launch cinematic walkthroughs and lifestyle teasers.',
      'Highly engaging, fully scripted vertical video ads.',
      'Custom visual styles, from hyper-realism to striking concept art.',
      'Professional AI voiceovers matched with sound effects and music.'
    ],
    process: [
      'Brief & Concept definition with our team.',
      'Storyboard and AI art direction design.',
      'AI Video Generation and render orchestration.',
      'Professional human editing, grading, and sound mixing.',
      'Delivery and distribution strategy layout.'
    ],
    whoItIsFor: 'Designed for brands needing rapid, high-quality, and frequent video content without the massive overhead, scheduling, and logistical delays of traditional film crews.'
  },
  {
    id: 'meta-ads',
    slug: 'service-meta-ads',
    title: 'Meta Ads & Leads',
    shortDesc: 'High-performing Facebook and Instagram campaigns engineered for real-world ROAS.',
    longDesc: 'We do not build campaigns for vanity metrics like double-taps or impressions. Our Meta advertising engine is structured solely for tangible business growth: high-quality leads, site-visit bookings, and direct sales. By coupling persistent creative testing (using our rapid AI creative pipeline) with laser-focused audience research, we scale your performance and decrease your customer acquisition costs.',
    icon: 'Megaphone',
    features: [
      'Comprehensive competitor and audience analysis.',
      'Constant asset variations to prevent ad fatigue and drop-offs.',
      'Conversion API (CAPI) configuration for pixel accuracy.',
      'Rigorous A/B testing of hooks, copy, and layout styles.'
    ],
    process: [
      'Deep audience research and offer refinement.',
      'Rapid design and rendering of ad creative assets.',
      'Campaign architecture setup and budget scaling rules.',
      'Weekly performance audits and dynamic budget optimization.',
      'Creative iteration based on real conversion data.'
    ],
    whoItIsFor: 'For ambitious businesses with a defined product, plot, or service that require predictable, scalable pipelines of highly qualified buyer leads.'
  },
  {
    id: 'whatsapp-crm',
    slug: 'service-whatsapp-crm',
    title: 'WhatsApp CRM Integration',
    shortDesc: 'Convert lead clicks into automated qualifying conversations in under 60 seconds.',
    longDesc: 'A lead left unanswered for five minutes is a lost lead. Our WhatsApp CRM system connects directly to your Meta ads and landing pages, immediately engaging incoming prospects. We build intelligent, instant follow-up sequences that qualify leads on budget, location, and urgency, and instantly push hot prospects to your active sales agents via notifications.',
    icon: 'MessageSquareText',
    features: [
      'Instant trigger automation for Click-to-WhatsApp ads.',
      'Interactive chat flows that feel conversational and friendly.',
      'Seamless database sync with standard CRM and Google Sheets.',
      'Automated broadcast sequences for re-engaging old prospects.'
    ],
    process: [
      'Map current sales entry points and friction points.',
      'Design clear, conversational, and direct messaging paths.',
      'Connect the API gateway with your lead generation ads.',
      'Set up custom alerts for your sales team when hot leads emerge.',
      'A/B test reply wording to maximize response rates.'
    ],
    whoItIsFor: 'Perfect for businesses currently suffering from high lead drop-off rates due to delayed response times or manual, slow triage workflows.'
  },
  {
    id: 'ai-agents',
    slug: 'service-ai-agents',
    title: 'AI Intelligent Agents',
    shortDesc: 'Automate repetitive workflows and front-line triage with custom AI models.',
    longDesc: 'Our custom AI agents handle the repetitive, resource-draining tasks that slow your team down. Operating on your website, WhatsApp, or internally, these agents converse naturally, resolve client inquiries, triage incoming requests, and route warm buyers. They are trained strictly on your business documentation, ensuring compliant, accurate, and on-brand answers around the clock.',
    icon: 'Cpu',
    features: [
      'Custom knowledge-base setup with your brochures, pricing, and FAQs.',
      'Direct CRM update triggers and automatic appointment booking.',
      'Multi-language capability to address diverse customer bases.',
      'Strict safety guardrails to ensure precise, on-brand responses.'
    ],
    process: [
      'Deconstruct the manual task or conversation route.',
      'Structure the knowledge library and response guardrails.',
      'Develop the agent workflow and test response accuracy.',
      'Integrate the agent into WhatsApp, CRM, or your website.',
      'Go live and continually tune responses based on live chat logs.'
    ],
    whoItIsFor: 'Ideal for teams spending hours answering the same preliminary questions about pricing, location, features, and availability.'
  },
  {
    id: 'brand-design',
    slug: 'service-brand-design',
    title: 'Brand & Promo Design',
    shortDesc: 'Stunning visual identities and assets built to stand out on digital screens.',
    longDesc: 'A brand is not just a logo; it is how you are perceived on a feed, on a shelf, and on a smartphone screen. We design visually striking corporate identities, packaging, and high-impact digital promotional collateral. Our designs are optimized for the digital-first era, making sure your colors, typography, and visual assets command instant attention.',
    icon: 'Palette',
    features: [
      'Distinctive logo suites, typography pairings, and color systems.',
      'Social-first graphic design kits and ad templates.',
      'Product packaging tailored for high screen-appeal and unboxing.',
      'Comprehensive brand guideline books for flawless consistency.'
    ],
    process: [
      'Conduct a thorough brand and competitive visual audit.',
      'Develop 2-3 distinct aesthetic directions and concepts.',
      'Refine the chosen direction and build out the full asset suite.',
      'Format and export assets specifically optimized for key platforms.',
      'Provide a clean, easy-to-use digital style handbook.'
    ],
    whoItIsFor: 'For businesses launching new projects or revitalizing older ones that need to immediately project high-tier authority, trustworthiness, and modernity.'
  },
  {
    id: 'social-media',
    slug: 'service-social-media',
    title: 'Social Media Management',
    shortDesc: 'Turn your social channels into persistent brand engines with active content scheduling.',
    longDesc: 'Social media is not about publishing random graphics; it is about building a compounding asset of attention. We handle your complete social presence—from planning and batch script-writing to post-scheduling, visual assets, and community engagement. We keep your channels highly active, professional, and tightly aligned with your main lead acquisition goals.',
    icon: 'Share2',
    features: [
      'Complete content calendar planning aligned with business priorities.',
      'High-retention video script-writing and short-form editing.',
      'Active community engagement, comment tracking, and outbound replies.',
      'Clear, transparent monthly reporting focusing on growth and engagement.'
    ],
    process: [
      'Define channel voice, target themes, and content buckets.',
      'Plan the monthly calendar and write scripts/briefs.',
      'Orchestrate a single streamlined production day per batch.',
      'Schedule postings and actively monitor and respond to comments.',
      'Analyze data monthly to double down on high-performing formats.'
    ],
    whoItIsFor: 'For busy founders and marketing teams who want a flawless, high-authority, and active social media presence without the stress of managing it daily in-house.'
  },
  {
    id: 'website-development',
    slug: 'service-website-development',
    title: 'Website Development',
    shortDesc: 'High-converting landing page designs and custom multipage website experiences built for speed and mobile lead capture.',
    longDesc: 'A great campaign requires a high-performance destination. We build lightning-fast, conversion-focused landing page layouts and custom multipage website platforms tailored for modern brands. Designed from the ground up to captivate visitors, load in under a second, showcase high-resolution media, and seamlessly capture inbound leads straight into your CRM or WhatsApp automations.',
    icon: 'Globe',
    features: [
      'Custom landing page layouts engineered specifically for high Meta & Google ad conversion.',
      'Scalable multipage website architecture with modern React, Tailwind CSS, and SEO optimization.',
      'Seamless integration with WhatsApp CRM, lead capture webhooks, and analytics tracking.',
      'Ultra-responsive desktop and mobile performance loading in under 1 second.'
    ],
    process: [
      'UX Wireframing & Conversion Architecture mapping based on your target campaign.',
      'High-fidelity UI visual design and interactive desktop/mobile prototype.',
      'Frontend development with clean, accessible code and smooth micro-animations.',
      'Webhook, CRM, and WhatsApp chat widget integration for instant lead capture.',
      'Global CDN deployment and real-time speed & mobile responsiveness testing.'
    ],
    whoItIsFor: 'Designed for businesses looking to upgrade from sluggish traditional templates to high-impact landing page and multipage website experiences that convert ad traffic into paying customers.'
  }
];

/**
 * Transforms any image URL (Google Drive, Unsplash, etc.) into a lightweight, fast-loading,
 * CDN-optimized thumbnail URL so high-quality blog images load instantly instead of downloading multi-megabyte raw files.
 */
export function getOptimizedImageUrl(url: string, width = 800): string {
  if (!url) return '';

  // Handle Google Drive file links
  if (url.includes('googleusercontent.com') || url.includes('drive.google.com')) {
    let fileId = '';
    const dMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (dMatch && dMatch[1]) {
      fileId = dMatch[1];
    } else {
      const idMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
      if (idMatch && idMatch[1]) {
        fileId = idMatch[1];
      }
    }

    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${width}`;
    }
  }

  // Handle Unsplash image links
  if (url.includes('images.unsplash.com')) {
    if (!url.includes('auto=format')) {
      return `${url}&auto=format&w=${width}&q=80`;
    }
  }

  return url;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'prompt-to-film',
    title: 'Prompt-to-Film: How One Line of Text Becomes a Cinematic Launch Campaign',
    category: 'AI Video',
    photoUrl: 'https://drive.google.com/thumbnail?id=1XgoUVLxdK0jNnro7r_zHMnK45Xny876M&sz=w1000',
    excerpt: 'Step behind the curtain of our advanced AI production pipeline. Discover how we turn brief copy prompts into high-end cinematic advertising films.',
    readTime: '6 min read',
    date: 'July 14, 2026',
    author: 'Pramod Shetty'
  },
  {
    id: 'ai-walkthroughs-prelaunch',
    title: 'Why AI Films Are Replacing Sample Flat Walkthroughs in Pre-Launch Marketing',
    category: 'Real Estate',
    photoUrl: 'https://drive.google.com/thumbnail?id=1apX9M8EiNpm_tDXCOh1g2DECLuIP7kyC&sz=w800',
    excerpt: 'Traditional 3D renderings are slow and lack emotional resonance. Here is how real estate developers are generating bookings before laying a single brick.',
    readTime: '5 min read',
    date: 'July 10, 2026',
    author: 'Pramod Shetty'
  },
  {
    id: 'crop-nutrition-video',
    title: 'Selling Crop Nutrition on Video: What Actually Converts Modern Farmers',
    category: 'Agriculture',
    photoUrl: 'https://drive.google.com/thumbnail?id=1FQA7I8PGXDwt_Z-mmSOThdoQGyU8NVPG&sz=w800',
    excerpt: 'How we helped agricultural brands bypass geographic challenges to build high-converting, local-language video campaigns explaining complex nutrition benefits.',
    readTime: '7 min read',
    date: 'July 05, 2026',
    author: 'Pramod Shetty'
  },
  {
    id: 'meta-click-to-whatsapp',
    title: 'From Meta Click to WhatsApp Conversation in 60 Seconds Flat',
    category: 'Automation',
    photoUrl: 'https://drive.google.com/thumbnail?id=1B_q8tfXBB4-A3sxJ9c69omCOmpBBEfkn&sz=w800',
    excerpt: 'Delayed lead follow-up is the silent killer of ad budgets. Read our blueprint for building automated chat loops that qualify leads instantly.',
    readTime: '4 min read',
    date: 'June 28, 2026',
    author: 'Pramod Shetty'
  },
  {
    id: 'shelf-appeal-feed',
    title: 'Shelf Appeal in the Feed: Designing Food Content That Stops the Scroll',
    category: 'Consumer Foods',
    photoUrl: 'https://drive.google.com/thumbnail?id=19F3Z0WsIBeKjwSa5cBHumhSOGhUwwP9N&sz=w800',
    excerpt: 'FMCG and consumer snack brands must command attention on digital screens. Here is how we design packaging and content that drives grocery store demand.',
    readTime: '6 min read',
    date: 'June 20, 2026',
    author: 'Pramod Shetty'
  },
  {
    id: 'cost-traditional-vs-ai',
    title: 'The Real Cost of a Traditional Video Shoot (And What Replaces It)',
    category: 'Marketing',
    photoUrl: 'https://drive.google.com/thumbnail?id=1UCDi-NqAe5ymXUOVElZoJ-gC3UMAyvyK&sz=w800',
    excerpt: 'A detailed cost breakdown of model casting, locations, transport, and equipment compared to a streamlined AI-first production studio pipeline.',
    readTime: '5 min read',
    date: 'June 15, 2026',
    author: 'Pramod Shetty'
  },
  {
    id: 'drone-vs-ai-flythroughs',
    title: 'Drone Footage vs. AI-Generated Flythroughs: Which Sells Plots Faster?',
    category: 'Real Estate',
    photoUrl: 'https://drive.google.com/thumbnail?id=1bX7RackZNugPjU9A8VcQFXIb-YtRaETl&sz=w800',
    excerpt: 'Drone shots are perfect for showing empty soil, but AI-generated flythroughs show the luxury community that will exist. Here is how to combine both.',
    readTime: '5 min read',
    date: 'June 08, 2026',
    author: 'Pramod Shetty'
  },
  {
    id: 'real-estate-launch-film-length',
    title: 'How Long Should a Real Estate Launch Film Actually Be?',
    category: 'Real Estate',
    photoUrl: 'https://drive.google.com/thumbnail?id=1xUZJEgtBWmESHLpeAyh8qBESUKBqPZoI&sz=w800',
    excerpt: 'Analyzing viewer retention statistics on Meta ads. Why short, emotionally intense AI cinematic films are driving 3x more form completions than 5-minute epics.',
    readTime: '4 min read',
    date: 'May 30, 2026',
    author: 'Pramod Shetty'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'zuari-infraworld',
    client: 'Zuari Infraworld',
    industry: 'Real Estate',
    challenge: 'Zuari Infraworld needed to capture immediate interest and premium site-visit bookings for their high-end plotted development before the physical sales office, roads, or model villas were built. Traditional 3D architectural animation was quoted at excessive prices with a 6-week turnaround time.',
    approach: 'Pravibe Smarttech created an AI-first cinematic film series showcasing the future luxury gated lifestyle, complete with realistic day-to-night flythroughs, premium interiors, and ambient soundscapes. We paired these visuals with targeted Meta lead campaigns leading straight to a custom-designed Click-to-WhatsApp CRM qualifying workflow.',
    outcome: 'We launched the entire pre-sales campaign in just 4 days from receiving the brief. Film production costs were slashed by 70% compared to traditional 3D studios, and our automated WhatsApp CRM engine achieved a 92% active qualification and booking rate for inbound leads.',
    testimonial: {
      quote: 'Pravibe completely reimagined how we market our developments. Their AI-driven cinematic walkthroughs were produced in a fraction of the time and cost of traditional agencies, and the WhatsApp-qualified lead engine immediately brought us serious buyers.',
      author: 'VP Marketing',
      role: 'Zuari Infraworld'
    }
  },
  {
    id: 'zuari-farmhub',
    client: 'Zuari FarmHub',
    industry: 'Agriculture',
    challenge: 'Zuari FarmHub needed to educate modern distributors and farmers on precision nutrition benefits. Executing multiple high-production video shoots across diverse rural settings was logistically difficult, slow, and expensive.',
    approach: 'We developed an AI-driven video content engine to generate lifelike agricultural and crop growth simulations, explaining nutrient release in rich detail. We output the films in multiple local languages to ensure deep regional trust.',
    outcome: 'Delivered over 100 localized promotional films within a single quarter, maintaining a strict 48-hour turnaround per concept. The campaign drove a 60% boost in distributor sign-ups and established Zuari FarmHub as a tech-forward leader.',
    testimonial: {
      quote: 'Pravibe gave us the ability to produce top-tier educational and promotional material in a highly agile framework, without worrying about shoot logistics, weather, or regional translation barriers.',
      author: 'National Digital Lead',
      role: 'Zuari FarmHub'
    }
  },
  {
    id: 'cheftalk-nutrifoods',
    client: 'Cheftalk Nutrifoods',
    industry: 'Consumer Foods',
    challenge: 'Cheftalk Nutrifoods was preparing to launch their premium healthy snacks online. They lacked a visual design system, packaging optimization, and an ongoing digital content strategy to stand out on mobile screens.',
    approach: 'We audited their market placement and designed a modern, vibrant digital brand identity, including scroll-stopping packaging render concepts and social templates. We paired this with our full-service Social Media Management, planning and producing high-retention content calendars.',
    outcome: 'Achieved a 100% increase in online audience engagement rates and secured crucial supermarket shelf entries through the high-authority, polished visual mockups and professional brand presentation.',
    testimonial: {
      quote: 'The brand identity and social media system designed by Pravibe completely changed how retailers and consumers perceive our brand. Our digital assets now reflect a premium snack company.',
      author: 'Founder & Managing Director',
      role: 'Cheftalk Nutrifoods'
    }
  }
];
