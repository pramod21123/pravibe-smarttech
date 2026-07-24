import React, { useState } from 'react';
import { ActivePage, BlogArticle } from '../types';
import { BLOG_ARTICLES } from '../data';
import { Search, Filter, BookOpen, Clock, Calendar, ChevronRight } from 'lucide-react';

interface BlogViewProps {
  setActivePage: (page: ActivePage) => void;
}

export default function BlogView({ setActivePage }: BlogViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = ['All', 'AI Video', 'Real Estate', 'Agriculture', 'Automation', 'Consumer Foods', 'Marketing'];

  // Filter blog articles based on search and category
  const filteredArticles = BLOG_ARTICLES.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          art.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, filteredArticles.length));
  };

  return (
    <div className="w-full">
      {/* SECTION 1: BLOG HERO */}
      <section className="relative eclipse-bg pt-20 pb-24 px-4 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="text-xs font-mono font-semibold tracking-widest text-brand-red uppercase block">
            Pravibe Perspectives
          </span>
          <h1 className="font-display font-black leading-tight text-white tracking-tight text-4xl sm:text-5xl md:text-6xl">
            Ideas worth <span className="gradient-text-clip">building on.</span>
          </h1>
          <p className="text-text-grey text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            We actively document our generative pipeline setups, Meta lead ad structures, and conversion benchmarks. Read our latest findings.
          </p>
        </div>
      </section>

      {/* SECTION 2: FILTER & SEARCH UTILITY ROW */}
      <section className="bg-card-bg/20 border-b border-white/5 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 justify-between items-center">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search insights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-text-muted focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
              id="blog-search-input"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-brand-red text-white border-brand-red shadow-md shadow-brand-red/10'
                    : 'bg-white/5 text-text-muted border border-white/10 hover:border-white/30 hover:text-white'
                }`}
                id={`blog-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: ARTICLES GRID */}
      <section className="py-24 px-4 bg-bg-black">
        <div className="max-w-7xl mx-auto space-y-16">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 text-text-muted space-y-2">
              <BookOpen className="h-12 w-12 mx-auto opacity-30 text-brand-red" />
              <p className="text-sm font-semibold">No articles found matching your search criteria.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                className="text-xs text-brand-red font-bold underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.slice(0, visibleCount).map((art) => (
                <article
                  key={art.id}
                  onClick={() => {
                    setActivePage(`blog-${art.id}` as ActivePage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group bg-card-bg/40 border border-border-grey rounded-xl overflow-hidden hover:border-brand-red/30 transition-all flex flex-col justify-between cursor-pointer"
                  id={`blog-card-${art.id}`}
                >
                  <div>
                    {/* Photo Wrapper */}
                    <div className="aspect-[16/9] w-full relative overflow-hidden bg-white/5 border-b border-white/5">
                      <img
                        src={art.photoUrl}
                        alt={art.id === 'prompt-to-film' ? "Illustration of a person and an AI robot shaking hands through a computer screen, representing human and AI collaboration." : art.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-[9px] font-mono font-bold px-2.5 py-1 rounded border border-white/10 uppercase tracking-wider">
                        {art.category}
                      </span>
                    </div>

                    {/* Meta info & Description */}
                    <div className="p-8 space-y-4">
                      <div className="flex items-center gap-4 text-[10px] font-mono text-text-muted">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-brand-red" />
                          {art.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-brand-red" />
                          {art.readTime}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-lg text-white leading-snug group-hover:text-brand-red transition-colors">
                        {art.title}
                      </h3>

                      <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer link */}
                  <div className="p-8 pt-0 border-t border-white/5 mt-4 flex items-center justify-between text-xs font-mono">
                    <span className="text-text-muted text-[10px]">Author: {art.author}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePage(`blog-${art.id}` as ActivePage);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-white group-hover:text-brand-red font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      id={`blog-read-btn-${art.id}`}
                    >
                      Read full &rarr;
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {filteredArticles.length > visibleCount && (
            <div className="text-center pt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 rounded-lg border border-white/20 text-white text-xs font-bold hover:border-white hover:bg-white/5 transition-all cursor-pointer"
                id="blog-load-more"
              >
                Load more articles
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
