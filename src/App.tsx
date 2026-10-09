import React, { useState, useEffect } from 'react';
import { Language, SectionTab } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSolutionSection } from './components/ProblemSolutionSection';
import { TeamSection } from './components/TeamSection';
import { RoadmapSection } from './components/RoadmapSection';
import { TechPlanSection } from './components/TechPlanSection';
import { DemoPage } from './components/DemoSuite/DemoPage';
import { Footer } from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<Language>('uz');
  const [activeTab, setActiveTab] = useState<SectionTab>('overview');

  // Listen to hash / route changes for /demo
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/demo' || hash === '#demo') {
        setActiveTab('demo');
      } else if (hash === '#problem-solution') {
        setActiveTab('problem-solution');
      } else if (hash === '#team' || hash === '#why-us') {
        setActiveTab('team');
      } else if (hash === '#roadmap') {
        setActiveTab('roadmap');
      } else if (hash === '#tech-plan') {
        setActiveTab('tech-plan');
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const handleSelectTab = (tab: SectionTab) => {
    setActiveTab(tab);
    if (tab === 'demo') {
      window.history.pushState(null, '', '#demo');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState(null, '', `#${tab}`);
      const el = document.getElementById(tab);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'uz' ? 'en' : 'uz'));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-emerald-200 selection:text-emerald-950">
      {/* Navigation Top Bar - Hidden in /demo mode so only the product itself is shown */}
      {activeTab !== 'demo' && (
        <Navbar
          lang={lang}
          onToggleLang={toggleLanguage}
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
        />
      )}

      {/* Main Content Area */}
      <main>
        {activeTab === 'demo' ? (
          <DemoPage
            lang={lang}
            onBackToMain={() => handleSelectTab('overview')}
            onToggleLang={toggleLanguage}
          />
        ) : (
          <div>
            <HeroSection lang={lang} onNavigate={handleSelectTab} />
            <ProblemSolutionSection lang={lang} />
            <TeamSection lang={lang} />
            <RoadmapSection lang={lang} />
            <TechPlanSection lang={lang} />

            {/* Teaser CTA leading into /demo */}
            <section className="py-16 bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 text-white border-t border-slate-800">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold">
                  <span>{lang === 'uz' ? '6. Interaktiv /demo Markazi' : '6. Interactive /demo Suite'}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {lang === 'uz'
                    ? 'EcoMahallani amalda sinab ko‘rishga tayyormisiz?'
                    : 'Ready to Experience EcoMahalla in Action?'}
                </h2>

                <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  {lang === 'uz'
                    ? '1–5 daqiqalik video taqdimot, 12 ta tuman bo‘yicha ishlayotgan jonli prototip, Gemini AI chiqindi maslahatchisi va ishlab chiquvchilar uchun ochiq API konsolini ko‘ring.'
                    : 'Inspect our 1-5 min video pitch, live working prototype across all 12 districts, Gemini AI waste advisor, and developer API sandbox.'}
                </p>

                <div>
                  <button
                    onClick={() => handleSelectTab('demo')}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base shadow-lg transition-transform hover:scale-105 cursor-pointer"
                  >
                    <span>{lang === 'uz' ? '/demo Sahifasiga O‘tish' : 'Open /demo Page Now'}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Global Footer - Hidden in /demo mode so only the product itself is shown */}
      {activeTab !== 'demo' && <Footer lang={lang} onSelectTab={handleSelectTab} />}
    </div>
  );
}
