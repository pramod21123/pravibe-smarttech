import React from 'react';
import { Sparkles, ArrowLeft, Search } from 'lucide-react';
import { ActivePage } from '../types';

interface NotFoundViewProps {
  setActivePage?: (page: ActivePage) => void;
}

export default function NotFoundView({ setActivePage }: NotFoundViewProps) {
  const handleNavigate = (page: ActivePage) => {
    if (setActivePage) {
      setActivePage(page);
    } else {
      window.location.href = page === 'home' ? '/' : `/${page}`;
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-[#0B0E1A]">
      <div className="max-w-md w-full text-center space-y-6 bg-white/[0.02] border border-white/10 p-8 sm:p-10 rounded-2xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red mx-auto">
          <Search className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-brand-red uppercase tracking-widest">
            Error 404
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-text-grey font-light leading-relaxed">
            The page you are looking for doesn't exist, has been moved, or the URL is incorrect.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => handleNavigate('home')}
            className="px-6 py-3 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-red-hover transition-colors shadow-lg shadow-brand-red/15 cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </button>
          
          <button
            onClick={() => handleNavigate('services')}
            className="px-6 py-3 rounded-xl border border-white/20 text-white text-xs font-bold hover:bg-white/5 transition-colors cursor-pointer"
          >
            View Services
          </button>
        </div>
      </div>
    </div>
  );
}
