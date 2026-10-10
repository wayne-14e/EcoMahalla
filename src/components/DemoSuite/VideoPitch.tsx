import React from 'react';
import { Language } from '../../types';
import demoVideo from '../../assets/eco-mahalla-demo.mp4';
import {
  Smartphone,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  TrendingUp,
  MapPin,
  FileText
} from 'lucide-react';

interface VideoPitchProps {
  lang: Language;
  onGoToPrototype: () => void;
}

export const VideoPitch: React.FC<VideoPitchProps> = ({ lang, onGoToPrototype }) => {
  const isUz = lang === 'uz';

  return (
    <div className="space-y-6">
      {/* Main 2-Column Layout: Video on the left (more space), Description + Prototype on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Vertical Mobile Video Player (Given more space) */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-[420px] rounded-3xl border-4 border-slate-900 bg-black shadow-2xl overflow-hidden relative">
            {/* Phone Notch / Header indicator */}
            <div className="bg-slate-900 text-slate-400 px-4 py-2 flex items-center justify-between text-xs border-b border-slate-800">
              <div className="flex items-center gap-1.5 font-medium">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] text-slate-300">EcoMahalla Mobile Demo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-mono text-[10px] text-emerald-400 font-bold">~2.5 MIN</span>
              </div>
            </div>

            {/* Native HTML5 Video Player */}
            <div className="relative aspect-[9/16] w-full bg-black flex items-center justify-center">
              <video
                src={demoVideo}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-contain bg-black"
              >
                {isUz
                  ? "Brauzeringiz video formatini qo'llab-quvvatlamaydi."
                  : 'Your browser does not support the video tag.'}
              </video>
            </div>

            {/* Bottom player caption */}
            <div className="bg-slate-950 px-4 py-2.5 text-center border-t border-slate-800/80">
              <p className="text-[11px] text-slate-400">
                {isUz
                  ? '📱 Haqiqiy mobil ekranda yozib olingan demo video (2:30)'
                  : '📱 Screen recording from live mobile device (2:30)'}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Short Pitch Description + Launch Prototype Block */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-6">
          
          {/* Pitch Script Summary (Short & Focused) */}
          <div className="p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                {isUz ? 'Startap Taqdimoti' : 'Startup Pitch Script'}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>2.5 daqiqa</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {isUz
                  ? 'EcoMahalla: Shahar Chiqindi Tartibsizligiga Giperlokal Yechim'
                  : 'EcoMahalla: Hyperlocal Civic Waste Platform'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isUz
                  ? 'Ekran ulashib (screen-share) taqdimot qilish uchun qisqa va aniq ssenariy'
                  : 'Concise 3-minute screen-share pitch structure'}
              </p>
            </div>

            {/* Script Breakdown Points */}
            <div className="space-y-3.5 text-xs sm:text-sm">
              {/* 1. Muammo */}
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 space-y-1">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wide">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>{isUz ? '1. Muammo (0:00 – 0:45)' : '1. Problem (0:00 – 0:45)'}</span>
                </div>
                <p className="text-xs text-amber-950/90 leading-relaxed">
                  {isUz
                    ? 'Toshkentda millionlab fuqarolar mashina kelish kunini bilmaydi. Chiqindi kunlab ko‘chada qolib ketadi, jadval kechikadi va qayta ishlash darajasi 5% dan oshmaydi.'
                    : 'Millions of urban residents face schedule uncertainty. Missed collections create roadside bottlenecks, while less than 5% of household waste gets segregated.'}
                </p>
              </div>

              {/* 2. Yechim va Prototip */}
              <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 space-y-1">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{isUz ? '2. Yechim & Jonli Demo (0:45 – 2:00)' : '2. Solution & Demo (0:45 – 2:00)'}</span>
                </div>
                <p className="text-xs text-emerald-950/90 leading-relaxed">
                  {isUz
                    ? '12 ta tuman bo‘yicha 0ms oflayn 7 kunlik jadval, real-vaqt kuni (Bugun/Ertaga), Gemini AI saralash maslahatchisi va 1-bosishda dispetcherga murojaat qilish mexanizmi.'
                    : 'Instant 0ms offline 7-day mahalla schedule, real calendar day tracking, Gemini AI waste sorting assistant, and 1-tap citizen dispatch reporting.'}
                </p>
              </div>

              {/* 3. Biznes va Miqyos */}
              <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200/80 space-y-1">
                <div className="flex items-center gap-2 text-sky-900 font-bold text-xs uppercase tracking-wide">
                  <TrendingUp className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                  <span>{isUz ? '3. Miqyos & Ta’sir (2:00 – 2:30)' : '3. Scale & Impact (2:00 – 2:30)'}</span>
                </div>
                <p className="text-xs text-sky-950/90 leading-relaxed">
                  {isUz
                    ? 'Toshkentning 584 ta mahallasini qamrab olish, shahar kommunal xizmatlari uchun ochiq API va toza yashil shahar infratuzilmasi.'
                    : 'Ready to scale across 584 Tashkent mahallas with open municipal APIs for dispatchers and route optimization.'}
                </p>
              </div>
            </div>
          </div>

          {/* Launch Working Prototype Block (Right below the short description) */}
          <div className="p-6 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50/60 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{isUz ? 'Jonli Prototip' : 'Live Working Prototype'}</span>
              </div>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                v1.2-live
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900">
                {isUz ? 'To‘g‘ridan-to‘g‘ri vebda sinab ko‘ring' : 'Test the Prototype Directly'}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {isUz
                  ? 'Toshkentning barcha 12 ta tumani jadvallari, avtomatik GPS joylashuv, AI yordamchi va fuqaro dispetcher murojaatini o‘zingiz tekshiring.'
                  : 'Check all 12 districts, live day detection, auto-detect location, AI recycling advisor, and citizen dispatch reporting.'}
              </p>
            </div>

            <button
              onClick={onGoToPrototype}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer group hover:shadow-lg"
            >
              <span>{isUz ? 'Ishlayotgan Prototipni Ochish' : 'Launch Working Prototype'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
