import React, { useState } from 'react';
import { Language, SectionTab } from '../types';
import { Leaf, Globe, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  activeTab: SectionTab;
  onSelectTab: (tab: SectionTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  activeTab,
  onSelectTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleMobileNav = (tab: SectionTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleMobileNav('overview')}
          className="flex items-center gap-2 text-slate-900 hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm">
            <Leaf className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
            EcoMahalla
          </span>
        </button>

        {/* Zone 2: Single-line Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectTab('problem-solution')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 ${
              activeTab === 'problem-solution'
                ? 'text-emerald-700 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            {lang === 'uz' ? 'Muammo & Yechim' : 'Problem & Solution'}
          </button>

          <button
            onClick={() => onSelectTab('team')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 ${
              activeTab === 'team'
                ? 'text-emerald-700 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            {lang === 'uz' ? 'Asoschi & Tajriba' : 'Founder & Skills'}
          </button>

          <button
            onClick={() => onSelectTab('roadmap')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 ${
              activeTab === 'roadmap'
                ? 'text-emerald-700 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            {lang === 'uz' ? 'Yo‘l Xaritasi' : 'Roadmap'}
          </button>

          <button
            onClick={() => onSelectTab('tech-plan')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 ${
              activeTab === 'tech-plan'
                ? 'text-emerald-700 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            {lang === 'uz' ? 'Texnologiyalar & Reja' : 'Execution & Tech'}
          </button>
        </nav>

        {/* Zone 3: Controls (Language, CTA, Mobile Hamburger) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-semibold rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap cursor-pointer"
            title="Tilni o'zgartirish / Switch language"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{lang === 'uz' ? 'O‘Z' : 'EN'}</span>
            <span className="text-slate-400 font-normal">|</span>
            <span className="text-slate-400 text-[11px]">
              {lang === 'uz' ? 'EN' : 'O‘Z'}
            </span>
          </button>

          <button
            onClick={() => handleMobileNav('demo')}
            className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shadow-sm cursor-pointer ${
              activeTab === 'demo'
                ? 'bg-emerald-800 text-white ring-2 ring-emerald-600 ring-offset-1'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <span className="hidden sm:inline">
              {lang === 'uz' ? '/demo — Jonli Prototip' : '/demo — Live Prototype'}
            </span>
            <span className="sm:hidden font-bold">/demo</span>
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <button
            onClick={() => handleMobileNav('problem-solution')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
              activeTab === 'problem-solution'
                ? 'bg-emerald-50 text-emerald-800'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>{lang === 'uz' ? '01. Muammo & Yechim' : '01. Problem & Solution'}</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => handleMobileNav('team')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
              activeTab === 'team'
                ? 'bg-emerald-50 text-emerald-800'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>{lang === 'uz' ? '02. Asoschi & Tajriba (Sardor Omonov)' : '02. Founder & Skills (Sardor Omonov)'}</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => handleMobileNav('roadmap')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
              activeTab === 'roadmap'
                ? 'bg-emerald-50 text-emerald-800'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>{lang === 'uz' ? '03. Yo‘l Xaritasi (Idea → Launched)' : '03. Roadmap (Idea → Launched)'}</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => handleMobileNav('tech-plan')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
              activeTab === 'tech-plan'
                ? 'bg-emerald-50 text-emerald-800'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>{lang === 'uz' ? '04. Texnologiyalar & Reja' : '04. Execution & Tech Stack'}</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => handleMobileNav('demo')}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <span>{lang === 'uz' ? 'Jonli /demo Markaziga O‘tish' : 'Open /demo Suite'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
