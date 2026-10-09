import React, { useState } from 'react';
import { Language, DemoSubTab } from '../../types';
import { VideoPitch } from './VideoPitch';
import { InteractivePrototype } from './InteractivePrototype';
import { AIChatbot } from './AIChatbot';
import { APIAccess } from './APIAccess';
import {
  ArrowLeft,
  Smartphone,
  Video,
  Bot,
  Terminal,
  Languages,
} from 'lucide-react';

interface DemoPageProps {
  lang: Language;
  onBackToMain?: () => void;
  onToggleLang?: () => void;
}

export const DemoPage: React.FC<DemoPageProps> = ({
  lang,
  onBackToMain,
  onToggleLang,
}) => {
  const isUz = lang === 'uz';
  const [activeSubTab, setActiveSubTab] = useState<DemoSubTab>('prototype');

  return (
    <div id="demo-suite" className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Bar: Back Button (Left), Switcher Pill (Center), Language & Status (Right) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Top Left: Back button to main page */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <button
              onClick={onBackToMain}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/80 transition-all cursor-pointer shadow-2xs group"
              title={isUz ? 'Asosiy sahifaga qaytish' : 'Back to main page'}
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-slate-500 group-hover:text-slate-900" />
              <span>{isUz ? 'Asosiy sahifaga qaytish' : 'Back to Main Page'}</span>
            </button>

            {/* Mobile quick language toggle */}
            <div className="flex md:hidden items-center gap-2">
              {onToggleLang && (
                <button
                  onClick={onToggleLang}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-colors cursor-pointer"
                >
                  <Languages className="w-3.5 h-3.5 text-slate-500" />
                  <span className="font-mono">{isUz ? 'O‘Z' : 'EN'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Top Center: Switcher Pill */}
          <div className="inline-flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200/90 shadow-2xs gap-1 max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveSubTab('prototype')}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'prototype'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 shrink-0" />
              <span>Prototype</span>
            </button>

            <button
              onClick={() => setActiveSubTab('video')}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'video'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Video className="w-3.5 h-3.5 shrink-0" />
              <span>Video</span>
            </button>

            <button
              onClick={() => setActiveSubTab('ai-bot')}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'ai-bot'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Bot className="w-3.5 h-3.5 shrink-0" />
              <span>AI-Chatbot</span>
            </button>

            <button
              onClick={() => setActiveSubTab('api-access')}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'api-access'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 shrink-0" />
              <span>API Sandbox</span>
            </button>
          </div>

          {/* Top Right: Status Badge & Desktop Language Switcher */}
          <div className="hidden md:flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live MVP
            </span>

            {onToggleLang && (
              <button
                onClick={onToggleLang}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-colors cursor-pointer"
                title="Toggle Language"
              >
                <Languages className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-mono">{isUz ? 'O‘Z' : 'EN'}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Product Canvas: No headers, no footers, only the selected product tool */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
        {activeSubTab === 'prototype' && <InteractivePrototype lang={lang} />}
        {activeSubTab === 'video' && (
          <VideoPitch lang={lang} onGoToPrototype={() => setActiveSubTab('prototype')} />
        )}
        {activeSubTab === 'ai-bot' && <AIChatbot lang={lang} />}
        {activeSubTab === 'api-access' && <APIAccess lang={lang} />}
      </main>
    </div>
  );
};
