import React from 'react';
import { Language } from '../types';
import { TEAM_MEMBERS, SARDOR_PORTRAIT, SHIPPED_PROJECTS } from '../data/content';
import { Github, Linkedin, ExternalLink, Code2, Award, Sparkles, CheckCircle2, Terminal, Layers, Database } from 'lucide-react';

interface TeamSectionProps {
  lang: Language;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ lang }) => {
  const isUz = lang === 'uz';
  const founder = TEAM_MEMBERS[0];

  return (
    <section id="team" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
            {isUz ? '02. Asoschi va Muhandislik Tajribasi' : '02. Solo Founder & Engineering Track Record'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isUz
              ? 'Loyiha ortidagi yagona asoschi va ishlab chiquvchi'
              : 'The Solo Builder & Architect Behind EcoMahalla'}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {isUz
              ? 'Ko‘p bosqichli byurokratik jamoalar o‘rniga — to‘liq stak dasturlash, dizayn va ilg‘or AI vositalarini (Google AI Studio, Opencode CLI + Firebase MCP) mukammal egallagan yakka yaratuvchi.'
              : 'Instead of bloated multi-tier teams, EcoMahalla is engineered by a proven, agile solo builder mastering full-stack architecture, Python, Figma, Supabase, and cutting-edge tooling.'}
          </p>
        </div>

        {/* Solo Founder Spotlight Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 lg:p-10 shadow-sm overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Founder Portrait (Significantly Enlarged & Prominent on Desktop) */}
            <div className="lg:col-span-6 relative flex justify-center items-center w-full">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none h-[420px] sm:h-[500px] lg:h-[700px] xl:h-[760px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-900 bg-slate-950 group">
                {/* Ambient glow accent */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-600/30 via-teal-500/10 to-transparent blur-md pointer-events-none" />

                <img
                  src={SARDOR_PORTRAIT}
                  alt="Sardor Omonov — Founder & Builder of EcoMahalla"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-[center_top] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                
                {/* Subtle vignette overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 text-white text-xs font-semibold shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isUz ? 'Yakkaxon Asoschi & Muhandis' : 'Solo Founder & Builder'}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl sm:rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/10 text-white shadow-xl">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-base sm:text-lg font-extrabold text-white truncate">Sardor Omonov</p>
                      <p className="text-xs text-emerald-400 font-medium truncate">
                        {isUz ? 'Full-Stack • Python • Civic Tech' : 'Full-Stack • Python • Civic Tech'}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-700/80 shrink-0 font-bold">
                      NexFellow
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Bio & Builder Credentials */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-extrabold shadow-2xs">
                  <Award className="w-3.5 h-3.5 text-amber-700" />
                  <span>Recognized NexFellow Builder</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Full-Stack & Python Architect</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Sardor Omonov
                </h3>
                <p className="text-sm font-semibold text-emerald-700 mt-1">
                  {isUz ? founder.roleUz : founder.roleEn}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {isUz ? founder.bioUz : founder.bioEn}
              </p>

              {/* Skills Tags */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {isUz ? 'Asosiy Ko‘nikmalar va Texnologik Imkoniyatlar:' : 'Core Competencies & Stack:'}
                </p>
                <div className="flex flex-wrap gap-1.5 text-xs font-medium text-slate-700">
                  {founder.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Advanced Tooling Badges */}
              <div className="p-4 rounded-xl bg-slate-950 text-white space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <Terminal className="w-4 h-4" />
                  <span>{isUz ? 'Supercharged Builder Vositalari:' : 'Supercharged Builder Arsenal:'}</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-emerald-900/60 border border-emerald-700 text-emerald-200">
                    Google AI Studio
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-900/60 border border-blue-700 text-blue-200">
                    Opencode CLI + Firebase MCP
                  </span>
                  <span className="px-2 py-0.5 rounded bg-purple-900/60 border border-purple-700 text-purple-200">
                    Supabase & Edge Functions
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-900/60 border border-amber-700 text-amber-200">
                    Python FastAPI
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                    Figma UI/UX Systems
                  </span>
                </div>
              </div>

              {/* Verified Links */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={founder.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub: wayne-14e</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Shipped Products Showcase */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {isUz ? 'Avval Yaratilgan Haqiqiy Loyihalar' : 'Proven Track Record'}
              </p>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                {isUz
                  ? 'Sardor Omonov tomonidan mustaqil ishlab chiqilgan tizimlar'
                  : 'Real-World Production Platforms Shipped by Sardor'}
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              Production Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SHIPPED_PROJECTS.map((proj, pIdx) => (
              <div
                key={pIdx}
                className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-emerald-500/50 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-700">{proj.category}</span>
                    <span className="text-[11px] text-slate-400 font-mono">Shipped</span>
                  </div>
                  <h4 className="font-bold text-base text-slate-900">
                    {isUz ? proj.titleUz : proj.titleEn}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isUz ? proj.descUz : proj.descEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5 text-[11px] text-slate-500 font-mono">
                  {proj.tags.map((t, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
