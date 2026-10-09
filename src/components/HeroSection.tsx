import React from 'react';
import { Language, SectionTab } from '../types';
import { HERO_IMAGE } from '../data/content';
import { PlayCircle, ArrowRight, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  lang: Language;
  onNavigate: (tab: SectionTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang, onNavigate }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 via-slate-50 to-white pt-10 pb-16 lg:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value proposition and CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/70 border border-emerald-200/80 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {lang === 'uz'
                  ? 'Toshkent & Mintaqaviy Shaharlar Uchun Giperlokal Civic Tech'
                  : 'Hyperlocal Civic Waste Infrastructure for Municipalities'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {lang === 'uz' ? (
                <>
                  Chiqindi olib ketish kunini{' '}
                  <span className="text-emerald-700 underline decoration-emerald-300 underline-offset-4">
                    hech qachon
                  </span>{' '}
                  o‘tkazib yubormang.
                </>
              ) : (
                <>
                  Never miss collection day again.{' '}
                  <span className="text-emerald-700 underline decoration-emerald-300 underline-offset-4">
                    What goes where, when.
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {lang === 'uz'
                ? 'Mahallangiz bo‘yicha aniq olib ketish jadvallari, oflayn rejimda ishlovchi chiqindilarni saralash qo‘llanmasi va shahar kommunal xizmatlari bilan to‘g‘ridan-to‘g‘ri raqamli aloqa.'
                : 'A hyperlocal recycling and waste collection scheduler providing accurate, community-verified schedules for municipalities starting with Tashkent mahallas.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => onNavigate('demo')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-all hover:shadow-lg cursor-pointer"
              >
                <span>{lang === 'uz' ? 'Jonli /demo va Prototipni Sinash' : 'Explore Live /demo & Prototype'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('problem-solution')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
              >
                <PlayCircle className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'uz' ? 'Prezentatsiya & Arxitektura' : 'Startup Deck & Architecture'}</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-4 border-t border-slate-200/80 grid grid-cols-3 gap-2 sm:gap-4 text-left">
              <div>
                <p className="text-lg sm:text-2xl font-extrabold text-slate-900 tabular-nums">99.8%</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                  {lang === 'uz' ? 'Jadval aniqligi' : 'Schedule Accuracy'}
                </p>
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-extrabold text-slate-900 tabular-nums">100%</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                  {lang === 'uz' ? 'Oflayn mavjudlik' : 'Offline Availability'}
                </p>
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-extrabold text-slate-900 tabular-nums">12 Tuman</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                  {lang === 'uz' ? 'Toshkent to‘liq qamrovi' : 'All Tashkent Zones'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 group">
              <img
                src={HERO_IMAGE}
                alt={lang === 'uz' ? 'Toshkent zamonaviy chiqindi saralash bekatlari' : 'Modern smart recycling stations in Tashkent'}
                referrerPolicy="no-referrer"
                className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/20 shadow-lg text-slate-900">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 mb-1">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {lang === 'uz' ? 'Toshkent sh., Chilonzor 7-mavze' : 'Tashkent, Chilanzar Pilot'}
                  </span>
                  <span className="text-slate-500 font-normal">
                    {lang === 'uz' ? 'Ertaga 07:30 da' : 'Tomorrow at 07:30'}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900">
                  {lang === 'uz'
                    ? 'Ko‘k idish: Qayta ishlanadigan plastik va qog‘oz olib ketiladi'
                    : 'Blue Bin: Recyclable plastics & dry paper pickup'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
