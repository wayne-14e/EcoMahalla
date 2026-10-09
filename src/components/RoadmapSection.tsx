import React, { useState } from 'react';
import { Language } from '../types';
import { ROADMAP_MILESTONES } from '../data/content';
import { CheckCircle2, CircleDot, Clock, ArrowRight, Check } from 'lucide-react';

interface RoadmapSectionProps {
  lang: Language;
}

export const RoadmapSection: React.FC<RoadmapSectionProps> = ({ lang }) => {
  const isUz = lang === 'uz';
  const [selectedPhase, setSelectedPhase] = useState<string>('prototype');

  const activeMilestone = ROADMAP_MILESTONES.find((m) => m.phase === selectedPhase) || ROADMAP_MILESTONES[1];

  return (
    <section id="roadmap" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
            {isUz ? '03. Rivojlanish Bosqichlari' : '03. Strategic Roadmap'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isUz ? 'Yo‘l xaritasi: Idea → Prototype → MVP → Launched' : 'Milestone Roadmap: Idea / Prototype / MVP / Launched'}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {isUz
              ? 'G‘oyani tasdiqlashdan boshlab to to‘liq shahar miqyosidagi kommunal platformagacha bo‘lgan aniq bosqichlar va muddatlar.'
              : 'Our clear trajectory from initial field research to working prototype, mobile MVP release, and citywide municipal rollout.'}
          </p>
        </div>

        {/* 4-Stage Horizontal Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {ROADMAP_MILESTONES.map((m) => {
            const isSelected = selectedPhase === m.phase;
            return (
              <button
                key={m.phase}
                onClick={() => setSelectedPhase(m.phase)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 bg-white shadow-md ring-2 ring-emerald-600/20'
                    : 'border-slate-200 bg-white/70 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {m.period}
                  </span>
                  {m.isDone ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      {isUz ? 'Tayyor' : 'Done'}
                    </span>
                  ) : m.isCurrent ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full animate-pulse">
                      <CircleDot className="w-3 h-3" />
                      {isUz ? 'Hozirda' : 'Active'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" />
                      {isUz ? 'Reja' : 'Planned'}
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-1">
                  {isUz ? m.phaseTitleUz : m.phaseTitleEn}
                </h4>

                <p className="text-xs text-slate-500">
                  {isUz ? m.statusUz : m.statusEn}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Milestone Deep-Dive Box */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  {activeMilestone.period}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs font-medium text-slate-500">
                  {isUz ? activeMilestone.statusUz : activeMilestone.statusEn}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {isUz ? activeMilestone.phaseTitleUz : activeMilestone.phaseTitleEn}
              </h3>
            </div>

            <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg shrink-0">
              {isUz ? 'Bosqich holati:' : 'Phase Status:'}{' '}
              <span className="font-bold text-slate-800">
                {activeMilestone.isDone
                  ? (isUz ? 'Muvaffaqiyatli yakunlangan' : 'Fully Completed')
                  : activeMilestone.isCurrent
                  ? (isUz ? 'Aktiv sinov va prototip fazasi' : 'Active Validation & Demo Stage')
                  : (isUz ? 'Keyingi ishlab chiqish bosqichi' : 'Upcoming Expansion Horizon')}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isUz ? 'Ushbu bosqichdagi asosiy natijalar va vazifalar:' : 'Key Deliverables & Action Items:'}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {(isUz ? activeMilestone.deliverablesUz : activeMilestone.deliverablesEn).map((d, dIdx) => (
                <div
                  key={dIdx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    activeMilestone.isDone
                      ? 'bg-emerald-600 text-white'
                      : activeMilestone.isCurrent
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-300 text-slate-700'
                  }`}>
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {d}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
