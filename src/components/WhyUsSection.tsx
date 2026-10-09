import React from 'react';
import { Language } from '../types';
import { ShieldCheck, HeartHandshake, Database, Smartphone, Flame, Check, Zap, Award } from 'lucide-react';

interface WhyUsSectionProps {
  lang: Language;
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ lang }) => {
  const isUz = lang === 'uz';

  const reasons = isUz
    ? [
        {
          icon: Zap,
          title: 'Haqiqiy Mahsulotlarni Ishlab Chiqqan Tajriba',
          desc: 'Sardor Omonov noldan real LMS (ta’lim boshqaruvi), Headless CMS va veb lug‘at o‘rganish platformalarini mustaqil ravishda ishlab chiqqan va ishga tushirgan. Murakkab tizimlarni yakka o‘zi tez va sifatli qurishda isbotlangan tajribaga ega.',
          badge: 'Haqiqiy Tizimlar',
        },
        {
          icon: Award,
          title: 'Recognized NexFellow Builder & Eng Zamonaviy Vositalar',
          desc: 'Google AI Studio, Opencode CLI + Firebase MCP va sun’iy intellekt vositalaridan maksimal darajada foydalangan holda, an’anaviy katta jamoalarga qaraganda 5–10 barobar tezroq ishlaydi va yangi xususiyatlarni bir kunda yetkazib beradi.',
          badge: 'NexFellow Builder',
        },
        {
          icon: Smartphone,
          title: 'Full-Stack & Dizaynning To‘liq Uyg‘unligi (Figma + Kod)',
          desc: 'Figma orqali qulay va inklyuziv foydalanuvchi tajribasini (UX) chizishdan tortib, Python, React, Supabase va PostgreSQL ma’lumotlar bazalarini sozlashgacha — barchasi bir qo‘lda, hech qanday aloqa yo‘qotishlarisiz amalga oshiriladi.',
          badge: 'To‘liq Nazorat',
        },
        {
          icon: HeartHandshake,
          title: 'Mahalla Madaniyati va Oflayn-Birinchi Arxitektura',
          desc: 'Toshkentning 584 ta mahallasi, "Maxsustrans" chiqindi tashish marshrutlari va internet uzilishlariga moslashgan 0ms oflayn-kesh mexanizmini puxta tushungan holda amaliyotga joriy qiladi.',
          badge: 'Lokal Kontekst',
        },
      ]
    : [
        {
          icon: Zap,
          title: 'Proven Track Record of Shipping Real Platforms',
          desc: 'Sardor Omonov has independently architected and shipped complex production systems—including a full LMS, Headless CMS, and adaptive web vocabulary platform. He knows what it takes to take an idea all the way to launch.',
          badge: 'Proven Shipper',
        },
        {
          icon: Award,
          title: 'Recognized NexFellow Builder & 10x Velocity',
          desc: 'Leveraging Google AI Studio, Opencode CLI + Firebase MCP, and modern AI acceleration to outpace traditional bureaucratic engineering teams with rapid iteration cycles.',
          badge: 'NexFellow Builder',
        },
        {
          icon: Smartphone,
          title: 'Unified Product & Tech Ownership (Figma to DB)',
          desc: 'From pixel-perfect accessible Figma design to high-throughput Python backends, Supabase, and offline React architectures—zero communication loss between designer and coder.',
          badge: 'Full Ownership',
        },
        {
          icon: HeartHandshake,
          title: 'Deep Local Insight & Offline-First Civic Focus',
          desc: 'Direct understanding of Tashkent’s mahalla network, municipal truck scheduling, and offline-first data caching designed specifically for real-world connectivity conditions.',
          badge: 'Civic Impact',
        },
      ];

  const proofPoints = isUz
    ? [
        'Sardor Omonov tomonidan LMS, CMS va lug‘at o‘rganish platformalari mustaqil arxitektura qilingan va ishga tushirilgan',
        'Recognized NexFellow Builder sifatida tan olingan va ilg‘or vositalar (Google AI Studio, Opencode CLI + Firebase MCP) bilan qurollangan',
        'Toshkent shahrining 4 ta sinov tumanida (Chilonzor, Yunusobod, Mirzo Ulug‘bek, Yakkasaroy) real jadvallar raqamlashtirildi',
        'Figma UI/UX, Python, Supabase, Firebase va oflayn kesh texnologiyalarining yagona muhandis qo‘lida to‘liq birlashuvi',
      ]
    : [
        'Independently built and deployed real production LMS, CMS, and web vocabulary learning platforms',
        'Recognized NexFellow Builder leveraging Google AI Studio, Opencode CLI + Firebase MCP, and modern builder tooling',
        'Digitized operational pickup schedules across 4 major pilot districts in Tashkent with zero delay',
        'Seamless integration of Figma UI/UX, Python, Supabase, Firebase, and offline-first mobile web architecture',
      ];

  return (
    <section id="why-us" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
            {isUz ? '03. Nega Aynan Sardor Omonov?' : '03. Why Sardor Omonov?'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isUz
              ? 'Nima uchun Sardor Omonov bu muammoni hal qila oladi?'
              : 'Why Sardor Omonov Is Uniquely Positioned to Solve This'}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {isUz
              ? 'Haqiqiy mahsulotlarni yetkazib bera oladigan tajribali full-stack yaratuvchi (builder). Murakkab kommunal muammoni yengil, ishonchli va chiroyli veb-platformaga aylantirish qobiliyatiga ega.'
              : 'A seasoned full-stack builder with a proven track record of shipping real LMS, CMS, and EdTech platforms, possessing the rare fusion of design taste, backend rigor, and civic passion.'}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Builder Impact Banner */}
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-6 sm:p-8">
          <div className="max-w-3xl space-y-4">
            <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <span>{isUz ? 'Yakkaxon Yaratuvchining Amaliy Kafolati' : 'The Solo Builder Advantage & Validation'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {proofPoints.map((pt, pIdx) => (
                <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-100">
                  <div className="w-4 h-4 rounded-full bg-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-white">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
