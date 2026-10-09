import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { VIDEO_THUMBNAIL, VIDEO_CHAPTERS, MOBILE_MOCKUP } from '../../data/content';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';

interface VideoPitchProps {
  lang: Language;
  onGoToPrototype: () => void;
}

export const VideoPitch: React.FC<VideoPitchProps> = ({ lang, onGoToPrototype }) => {
  const isUz = lang === 'uz';
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);

  const totalDuration = 285; // 4 minutes 45 seconds

  // Simulated video playback timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Update chapter based on time
  useEffect(() => {
    if (currentTime >= 210) {
      setActiveChapterIndex(3);
    } else if (currentTime >= 135) {
      setActiveChapterIndex(2);
    } else if (currentTime >= 70) {
      setActiveChapterIndex(1);
    } else {
      setActiveChapterIndex(0);
    }
  }, [currentTime]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const jumpToChapter = (chapterIdx: number) => {
    const times = [0, 70, 135, 210];
    setCurrentTime(times[chapterIdx]);
    setActiveChapterIndex(chapterIdx);
    setIsPlaying(true);
  };

  const currentChapter = VIDEO_CHAPTERS[activeChapterIndex] || VIDEO_CHAPTERS[0];

  return (
    <div className="space-y-8">
      {/* 6.1: Video Player Container */}
      <div className="rounded-2xl border border-slate-200 bg-slate-950 overflow-hidden shadow-xl text-white">
        {/* Video Canvas Simulation */}
        <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center overflow-hidden group">
          <img
            src={VIDEO_THUMBNAIL}
            alt="EcoMahalla Demo Video Presentation"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isPlaying ? 'opacity-70' : 'opacity-90'
            }`}
          />

          {/* Active Overlay Content when playing or paused */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-between p-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-md bg-emerald-600/90 text-white text-xs font-bold tracking-wide uppercase">
                {isUz ? 'Demo-Video (1–5 daqiqa)' : 'Demo Video Pitch'}
              </span>

              <span className="text-xs font-mono bg-black/60 px-2.5 py-1 rounded text-slate-300">
                {formatSeconds(currentTime)} / {formatSeconds(totalDuration)}
              </span>
            </div>

            {/* Subtitle / Talking Points overlay */}
            <div className="bg-slate-950/80 backdrop-blur-md p-4 rounded-xl border border-white/10 max-w-2xl">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                {isUz ? `Bo‘lim ${activeChapterIndex + 1}: ${currentChapter.titleUz}` : `Chapter ${activeChapterIndex + 1}: ${currentChapter.titleEn}`}
              </p>
              <p className="text-sm sm:text-base text-slate-100 font-medium">
                {isUz ? currentChapter.descUz : currentChapter.descEn}
              </p>
            </div>
          </div>

          {/* Centered Play/Pause Button overlay */}
          {!isPlaying && (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute w-20 h-20 rounded-full bg-emerald-600/95 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer z-10"
              title="Play Video"
            >
              <Play className="w-9 h-9 ml-1 fill-white" />
            </button>
          )}
        </div>

        {/* Video Controls Bar */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-3">
          {/* Scrubber Timeline */}
          <div className="relative w-full h-2 bg-slate-800 rounded-full overflow-hidden cursor-pointer">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${(currentTime / totalDuration) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 hover:text-white transition-colors cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>

              <button
                onClick={() => {
                  setCurrentTime(0);
                  setIsPlaying(false);
                }}
                className="p-1.5 hover:text-white transition-colors cursor-pointer"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 hover:text-white transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="font-mono text-xs tabular-nums text-slate-400">
                {formatSeconds(currentTime)} / {formatSeconds(totalDuration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 hidden sm:inline">
                {isUz ? 'HD 1080p · O‘zbekcha & English' : 'HD 1080p · Pitch Deck'}
              </span>
              <button className="p-1.5 hover:text-white transition-colors cursor-pointer" title="Fullscreen">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Selector Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {VIDEO_CHAPTERS.map((ch, idx) => (
          <button
            key={idx}
            onClick={() => jumpToChapter(idx)}
            className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
              activeChapterIndex === idx
                ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-sm'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
              <span>{ch.time}</span>
              {activeChapterIndex === idx && <span className="text-emerald-700 font-bold">● Jonli</span>}
            </div>
            <p className="line-clamp-2">{isUz ? ch.titleUz : ch.titleEn}</p>
          </button>
        ))}
      </div>

      {/* 6.2 & 6.3: Video Description and Direct Prototype Launch */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 6.2: Demo Video Description */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              {isUz ? 'Demo-Videoning Tavsifi' : 'Demo Video Pitch Description'}
            </span>
            <span className="text-xs text-slate-400 font-mono">Davomiyligi: 4 daqiqa 45 soniya</span>
          </div>

          <h3 className="text-xl font-bold text-slate-900">
            {isUz
              ? 'Toshkent mahallalari uchun giperlokal chiqindi saralash platformasi'
              : 'Hyperlocal Recycling & Collection Architecture Pitch'}
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            {isUz
              ? 'Ushbu videoda EcoMahalla startapining asosiy muammosi, mavjud shahar infratuzilmasidagi uzilishlar va ularni bartaraf etuvchi 4 ta innovatsion xususiyat ko‘rsatib berilgan: oflayn rejim, ranglar bilan kodlangan saralash katalogi, kechki push-eslatmalar va tuman dispetcheriga to‘g‘ridan-to‘g‘ri murojaat yuborish mexanizmi.'
              : 'This 4.5-minute video pitch details the core problem of municipal waste fragmentation, validates the unmet demand across 680+ resident reviews, walks through the live mobile prototype, and articulates our $2 ARPU unit economics.'}
          </p>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-700">
            <h4 className="font-bold text-slate-900">
              {isUz ? 'Video taqdimotining asosiy tezislari:' : 'Key Takeaways from the Pitch:'}
            </h4>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600">
              <li>
                <strong>0:00 - 1:10:</strong>{' '}
                {isUz
                  ? 'Muammo chuqurligi: 680+ fuqaro sharhlari va noto‘g‘ri sanalar tufayli o‘tkazib yuborilgan chiqindilar.'
                  : 'Validating the problem: 680+ resident complaints regarding shifted schedules.'}
              </li>
              <li>
                <strong>1:10 - 2:15:</strong>{' '}
                {isUz
                  ? 'EcoMahalla texnik yondashuvi: internet bo‘lmaganda ham ochiladigan oflayn kesh.'
                  : 'Offline-first resilience: local schedule cache accessible during cell dropouts.'}
              </li>
              <li>
                <strong>2:15 - 3:30:</strong>{' '}
                {isUz
                  ? 'Ilova interfeysi: 1 ta bosishda ertangi kun jadvali va rangli idishlar qo‘llanmasi.'
                  : 'Mobile interface walkthrough: 1-tap lookup and waste categorization.'}
              </li>
              <li>
                <strong>3:30 - 4:45:</strong>{' '}
                {isUz
                  ? 'Biznes model: $2 ARPU bilan 50,000 foydalanuvchida $100,000 yillik daromad va shahar hokimiyatlari uchun B2G xizmatlar.'
                  : 'Business model & unit economics: Freemium model targeting $2 ARPU.'}
              </li>
            </ul>
          </div>
        </div>

        {/* Ishlayotgan Prototipga O'tish Blok */}
        <div className="lg:col-span-4 p-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{isUz ? 'Ishlayotgan Prototip' : 'Working Prototype'}</span>
          </div>

          <h4 className="text-base font-bold text-slate-900">
            {isUz ? 'To‘g‘ridan-to‘g‘ri vebda sinab ko‘ring' : 'Test the Live Prototype Directly'}
          </h4>

          <p className="text-xs text-slate-600 leading-relaxed">
            {isUz
              ? 'Toshkentning barcha 12 ta tumani bo‘yicha real jadvalni tekshiring, avtomatik GPS joylashuvni aniqlang, chiqindilarni saralang va sinov murojaati yuboring.'
              : 'Inspect live schedules across all 12 Tashkent districts, detect live GPS location, filter waste sorting guides, and submit a test delay report.'}
          </p>

          <button
            onClick={onGoToPrototype}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <span>{isUz ? 'Ishlayotgan Prototipni Ochish' : 'Launch Working Prototype'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 border-t border-emerald-200/60 text-[11px] text-emerald-800 flex items-center justify-between">
            <span>{isUz ? 'Mavqei: 12 ta tuman qamrovi' : 'Status: 12 Districts Active'}</span>
            <span className="font-mono">v1.2-live</span>
          </div>
        </div>
      </div>
    </div>
  );
};
