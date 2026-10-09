import React from 'react';
import { Language } from '../types';
import { Layers, Bot, Cpu, Database, Radio, Sparkles, CheckCircle2 } from 'lucide-react';

interface TechPlanSectionProps {
  lang: Language;
}

export const TechPlanSection: React.FC<TechPlanSectionProps> = ({ lang }) => {
  const isUz = lang === 'uz';

  const techRows = isUz
    ? [
        { layer: 'Frontend & UI Tizimi', tech: 'React 19, TypeScript, Tailwind CSS v4, Figma', reason: 'Tezkor yuklanish, toza komponentlar, WCAG AA qulaylik standartlari va professional dizayn tizimi' },
        { layer: 'AI Muhandislik & Studio', tech: 'Google AI Studio & Gemini 3.8 Flash SDK', reason: 'Chiqindilarni saralash bo‘yicha aqlli AI-agent va fuqarolik maslahatchisini bir zumda integratsiya qilish' },
        { layer: 'CLI & Bulut Integratsiyasi', tech: 'Opencode CLI + Firebase MCP Server', reason: 'Avtomatlashtirilgan bulut xizmatlari (Firestore, Auth, Rules) va buyruqlar satri orqali tezkor boshqaruv' },
        { layer: 'Backend & Ma’lumotlar Tahlili', tech: 'Python, FastAPI, Node.js Express Proxy', reason: 'Yuqori yuklamali geoma’lumotlarni qayta ishlash va xavfsiz API server arxitekturasi' },
        { layer: 'Ma’lumotlar Bazasi & Kesh', tech: 'Supabase, PostgreSQL + PostGIS, SQLite Kesh', reason: 'Internet o‘chganda ham 0ms kechikish bilan jadvallarni ko‘rsatish va geolokatsion qidiruv' },
        { layer: 'Mobil Platforma (MVP)', tech: 'React Native & ExpoGo', reason: 'iOS va Android uchun yagona kod bazasi, tezkor sinov va push-xabarnomalar' },
      ]
    : [
        { layer: 'Frontend & UI System', tech: 'React 19, TypeScript, Tailwind CSS v4, Figma', reason: 'Blazing fast load times, modular architecture, full WCAG AA accessibility & tailored UX' },
        { layer: 'AI Engineering & Studio', tech: 'Google AI Studio & Gemini 3.8 Flash SDK', reason: 'Context-aware waste sorting intelligence and real-time civic advisor integration' },
        { layer: 'CLI & Cloud Tooling', tech: 'Opencode CLI + Firebase MCP Server', reason: 'Automated cloud infrastructure deployment (Firestore, Auth, Rules) via Model Context Protocol' },
        { layer: 'Backend & Data Engine', tech: 'Python, FastAPI, Node.js Express Proxy', reason: 'High-throughput spatial calculation, secure token encapsulation and microservice speed' },
        { layer: 'Database & Offline Cache', tech: 'Supabase, PostgreSQL + PostGIS, SQLite Cache', reason: 'Guaranteed 0ms offline availability during connectivity dropouts and geospatial queries' },
        { layer: 'Mobile Platform (MVP)', tech: 'React Native & ExpoGo', reason: 'Single cross-platform codebase, rapid testing, and automated 6 PM push notifications' },
      ];

  const executionSteps = isUz
    ? [
        {
          num: '1',
          title: 'Ma’lumotlarni Raqamlashtirish & Tozalash',
          desc: 'Toshkent shahar tumanlari bo‘yicha tarqoq PDF va xabarlarni yagona PostGIS geoma’lumotlar bazasiga standartlashtiramiz.',
        },
        {
          num: '2',
          title: 'Oflayn-Birinchi Kesh Dvigatelini Integratsiya Qilish',
          desc: 'Foydalanuvchi ilovani ochishi bilan uning mahallasi bo‘yicha 30 kunlik jadval lokal xotiraga yuklanadi.',
        },
        {
          num: '3',
          title: 'Gemini 3.8 Flash AI Saralovchini O‘rnatish',
          desc: 'Fuqaro "Menga singan oyna idishini qayerga tashlay?" deb so‘raganida, AI mahalliy qoidalarga mos aniq javob beradi.',
        },
        {
          num: '4',
          title: 'Hokimiyat va Fuqarolar Muloqot API-sini Ishga Tushirish',
          desc: 'Aholi tomonidan yuborilgan jadval xatoliklari va kechikish hisobotlari avtomatik tarzda tuman dispetcheriga uzatiladi.',
        },
      ]
    : [
        {
          num: '1',
          title: 'Municipal GIS Ingestion & Normalization',
          desc: 'Ingesting and structuring fragmented PDF timetables and contractor routes into a unified PostGIS relational schema.',
        },
        {
          num: '2',
          title: 'Offline-First Client Sync Engine',
          desc: '30-day lookahead schedules cached into IndexedDB/SQLite on first launch, ensuring complete zero-network availability.',
        },
        {
          num: '3',
          title: 'Gemini 3.8 Flash Waste Advisor Integration',
          desc: 'Context-aware multilingual model delivering authoritative disposal advice and local mahalla drop-off locations in real time.',
        },
        {
          num: '4',
          title: 'Two-Way Citizen Correction & Dispatch API',
          desc: 'Crowdsourced schedule delay reports and missed-bin dispatches routed straight to municipal operations desks.',
        },
      ];

  return (
    <section id="tech-plan" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
            {isUz ? '04. Texnologik Arxitektura va Amalga Oshirish' : '04. Execution Strategy & Tech Stack'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isUz
              ? 'Yechimni qanday amalga oshirishni rejalashtiryapmiz?'
              : 'How We Execute: Phases, Tech Stack & AI Acceleration'}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {isUz
              ? 'Bosqichlar, foydalanilgan texnologiyalar, sun’iy intellekt vositalari (AI vibecoding) va fuqarolik infratuzilmasi yechimlari.'
              : 'Detailed breakdown of our execution roadmap, engineering stack, AI-driven development workflow, and municipal data pipeline.'}
          </p>
        </div>

        {/* 4 Execution Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {executionSteps.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-3"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
                {step.num}
              </div>
              <h4 className="font-bold text-base text-slate-900">{step.title}</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Technology Stack Table */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-12">
          <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-sm">
                {isUz ? 'Texnologiyalar Steki va Tanlov Asosi' : 'Technology Stack & Selection Rationale'}
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              {isUz ? 'Zamonaviy Web & Mobile Stack' : 'Production-Ready Civic Stack'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 sm:px-6">{isUz ? 'Qatlam' : 'Layer'}</th>
                  <th className="py-3 px-4 sm:px-6">{isUz ? 'Texnologiya' : 'Technology'}</th>
                  <th className="py-3 px-4 sm:px-6">{isUz ? 'Nega aynan shu texnologiya tanlandi?' : 'Selection Rationale'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {techRows.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">{row.layer}</td>
                    <td className="py-3.5 px-4 sm:px-6 font-mono text-emerald-800 bg-emerald-50/30 font-medium">
                      {row.tech}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-slate-600">{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Vibecoding & Development Acceleration Callout */}
        <div className="p-6 sm:p-8 rounded-2xl border border-emerald-200 bg-emerald-50/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-200/60 px-2.5 py-1 rounded-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isUz ? 'Google AI Studio & Opencode CLI + Firebase MCP' : 'Google AI Studio & Opencode CLI + Firebase MCP'}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {isUz
                ? 'Zamonaviy vositalar orqali 10x tezlikda yaratilgan arxitektura'
                : '10x Engineering Velocity via Google AI Studio & MCP Integration'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isUz
                ? 'Sardor Omonov Google AI Studio, Opencode CLI va Firebase MCP serveridan foydalanib, to‘liq loyiha arxitekturasini atigi 2 haftada tayyorladi. Bu an’anaviy katta dasturchilar jamoasiga qaraganda bir necha barobar tejamkor va tezkor natija beradi.'
                : 'By harnessing Google AI Studio, Opencode CLI, and Firebase MCP servers, Sardor Omonov independently engineered and verified the entire civic platform in 2 weeks, outperforming traditional slow engineering teams.'}
            </p>
          </div>

          <div className="bg-white border border-emerald-200 p-4 rounded-xl shadow-sm shrink-0 text-left w-full sm:w-auto">
            <p className="text-xs text-slate-500 font-medium">{isUz ? 'Muhandislik tezligi:' : 'Builder Velocity:'}</p>
            <p className="text-2xl font-bold text-emerald-700 tabular-nums">10x</p>
            <p className="text-[11px] text-slate-400">{isUz ? 'Tezkor bozorga chiqish' : 'Solo builder velocity'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
