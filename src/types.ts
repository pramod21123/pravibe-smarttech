export type ActivePage =
  | 'home'
  | 'services'
  | 'service-ai-video'
  | 'service-meta-ads'
  | 'service-whatsapp-crm'
  | 'service-ai-agents'
  | 'service-brand-design'
  | 'service-social-media'
  | 'service-website-development'
  | 'blog'
  | 'about'
  | 'contact'
  | 'blog-prompt-to-film'
  | 'blog-ai-walkthroughs-prelaunch'
  | 'blog-crop-nutrition-video'
  | 'blog-meta-click-to-whatsapp'
  | 'blog-shelf-appeal-feed'
  | 'blog-cost-traditional-vs-ai'
  | 'blog-drone-vs-ai-flythroughs'
  | 'blog-real-estate-launch-film-length';

export interface Service {
  id: string;
  slug: ActivePage;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: string;
  features: string[];
  process: string[];
  whoItIsFor: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  photoUrl: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  challenge: string;
  approach: string;
  outcome: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}
