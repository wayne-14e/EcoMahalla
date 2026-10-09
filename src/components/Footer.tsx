import React from 'react';
import { Language, SectionTab } from '../types';
import { Leaf, Github, ArrowUp } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onSelectTab: (tab: SectionTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onSelectTab }) => {
  const isUz = lang === 'uz';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg tracking-tight">EcoMahalla</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              {isUz
                ? 'Toshkent va mintaqaviy shaharlar uchun giperlokal chiqindi jadvali va fuqarolik ma’lumotlari platformasi.'
                : 'Hyperlocal civic waste collection scheduler startup demo for Tashkent and regional municipalities.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
            <button onClick={() => onSelectTab('problem-solution')} className="hover:text-white transition-colors cursor-pointer">
              {isUz ? 'Muammo & Yechim' : 'Problem & Solution'}
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button onClick={() => onSelectTab('team')} className="hover:text-white transition-colors cursor-pointer">
              {isUz ? 'Asoschi & Tajriba' : 'Founder & Skills'}
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button onClick={() => onSelectTab('roadmap')} className="hover:text-white transition-colors cursor-pointer">
              {isUz ? 'Yo‘l Xaritasi' : 'Roadmap'}
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button onClick={() => onSelectTab('demo')} className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer">
              {isUz ? '/demo Prototip' : '/demo Prototype'}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} EcoMahalla · {isUz ? 'Asoschi: Sardor Omonov (Recognized NexFellow Builder)' : 'Founder: Sardor Omonov (Recognized NexFellow Builder)'}
          </p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-500 font-mono">
              React 19 · Node.js Express · Gemini 3.8 Flash
            </span>

            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="Yuqoriga qaytish / Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
