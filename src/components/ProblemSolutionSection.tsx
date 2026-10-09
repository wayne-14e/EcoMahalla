import React from 'react';
import { Language } from '../types';
import { AlertCircle, CheckCircle2, WifiOff, RefreshCw, Layers, ShieldAlert, ArrowRight } from 'lucide-react';

interface ProblemSolutionSectionProps {
  lang: Language;
}

export const ProblemSolutionSection: React.FC<ProblemSolutionSectionProps> = ({ lang }) => {
  const isUz = lang === 'uz';

  const painPoints = isUz
    ? [
        {
          quote: 'Ilovada ko‘rsatilgan sana noto‘g‘ri bo‘lgani uchun yana qayta ishlash mashinasini o‘tkazib yubordim.',
          source: 'Toshkent shahar aholisi sharhi',
        },
        {
          quote: 'Batareya yoki eski telefonni qaysi qutiga tashlash kerakligini tushunib bo‘lmaydi.',
          source: 'Fuqaro murojaati',
        },
        {
          quote: 'Hokimiyat yoki Maxsustrans sayti telefonda umuman ochilmaydi yoki murakkab PDF fayl beradi.',
          source: 'Foydalanuvchi sinovi',
        },
        {
          quote: 'Xatolik haqida xabar bersangiz ham, hech kim javob bermaydi va jadval yangilanmaydi.',
          source: 'Tizim audit xulosasi',
        },
      ]
    : [
        {
          quote: 'Missed recycling pickup again because the municipal app showed the wrong date.',
          source: 'Resident app store review',
        },
        {
          quote: 'Cannot find which bin or collection point to use for electronics and batteries.',
          source: 'Citizen survey feedback',
        },
        {
          quote: 'The city website is impossible to navigate on mobile—just messy PDFs.',
          source: 'Mobile UX audit',
        },
        {
          quote: 'No one responds when I report incorrect collection days or missed bins.',
          source: 'User support report',
        },
      ];

  const comparisonRows = isUz
    ? [
        { aspect: 'Ma’lumotlar aniqligi', old: 'Past — Kamdan-kam yangilanadi', eco: 'Yuqori — Jamiyat tasdiqlaydi + to‘g‘ridan-to‘g‘ri shahar oqimi' },
        { aspect: 'Oflayn ishlash', old: 'Yo‘q — Har safar internet talab qiladi', eco: 'To‘liq oflayn — Kesh jadvallari doim qo‘l ostida' },
        { aspect: 'Saralash qo‘llanmasi', old: 'Mavjud emas yoki quruq matn', eco: 'Rangli, qidiruvli, AI yordamchi bilan integratsiyalashgan' },
        { aspect: 'Fuqarolar murojaati', old: 'E’tiborsiz qoldiriladi', eco: 'Faol qabul qilinadi, dispetcherga to‘g‘ridan-to‘g‘ri yuboriladi' },
        { aspect: 'Interfeys soddaligi', old: 'Haddan tashqari murakkab', eco: '1 ta tugma: "Ertaga nima chiqadi?"' },
        { aspect: 'Shaffoflik', old: 'Manba va sana noma’lum', eco: 'Oxirgi tekshirilgan vaqt va mahalla tasdig‘i ko‘rsatiladi' },
      ]
    : [
        { aspect: 'Data Accuracy', old: 'Low — Rarely updated or validated', eco: 'High — Community verified + direct city feeds' },
        { aspect: 'Offline Access', old: 'Limited / None — Fails without cellular data', eco: 'Full offline capability — Instant local cache' },
        { aspect: 'Sorting Guide', old: 'Missing or buried in official legalese', eco: 'Color-coded, searchable, backed by Gemini AI' },
        { aspect: 'User Feedback', old: 'Ignored or black-holed in bureaucratic forms', eco: 'Actively logged & dispatched to municipal teams' },
        { aspect: 'Simplicity', old: 'Overcomplicated desktop portals', eco: 'One-tap access: "What goes out tomorrow?"' },
        { aspect: 'Transparency', old: 'Unknown sources with zero timestamps', eco: 'Clear source attribution & verified update stamp' },
      ];

  return (
    <section id="problem-solution" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
            {isUz ? '01. Bozor Muammosi va Innovatsion Yechim' : '01. Problem & Solution'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isUz
              ? 'Nega shahar aholisi har hafta chiqindini noto‘g‘ri va kechikib chiqaradi?'
              : 'Why Municipalities and Residents Struggle with Recycling'}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {isUz
              ? 'Bozorda mavjud 61 ta ilova va rasmiy portallarning 680 dan ortiq salbiy sharhlari bitta bosh muammoni ko‘rsatadi: jadvallarning noto‘g‘riligi va oflayn rejim yo‘qligi.'
              : 'Our audit of existing municipal apps revealed 680+ critical reviews citing outdated schedules and zero offline support as the #1 resident grievance.'}
          </p>
        </div>

        {/* 2-Column Split: Problem vs Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left: The Problem */}
          <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isUz ? 'Mavjud Tizimdagi Kamchiliklar' : 'The Broken Status Quo'}
                </h3>
                <p className="text-xs text-rose-700 font-medium">
                  {isUz ? 'Noaniqlik, e’tiborsizlik va murakkablik' : 'Inaccuracy, fragmentation & frustration'}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {painPoints.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white border border-rose-100 shadow-sm text-sm">
                  <p className="text-slate-800 italic">“{item.quote}”</p>
                  <p className="mt-1 text-xs text-slate-400 font-medium">— {item.source}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-rose-100/70 border border-rose-200 text-xs text-rose-900 leading-relaxed">
              <strong>{isUz ? 'Xulosa:' : 'Key Finding:'}</strong>{' '}
              {isUz
                ? 'Hokimiyatlar chiqindi saralash qoidalarini muntazam yangilaydi, biroq aholida buni tekshiruvchi sodda mobil vosita yo‘q.'
                : 'Cities continuously update waste policies, but residents lack a single dependable, responsive mobile utility.'}
            </div>
          </div>

          {/* Right: The Solution */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isUz ? 'EcoMahalla Taklif Qilayotgan Yechim' : 'The EcoMahalla Platform'}
                </h3>
                <p className="text-xs text-emerald-700 font-medium">
                  {isUz ? 'Aniq, oflayn va jamiyat tomonidan tasdiqlangan' : 'Accurate, offline-first & verified'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm">
              <div className="p-4 rounded-xl bg-white border border-emerald-100 shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase">
                  <WifiOff className="w-4 h-4 text-emerald-600" />
                  <span>{isUz ? 'Oflayn-Birinchi' : 'Offline-First'}</span>
                </div>
                <p className="text-xs text-slate-600">
                  {isUz ? 'Mobil internet yo‘q joyda ham haftalik jadval bir zumda ochiladi.' : 'Cached weekly calendars always accessible without network signal.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-emerald-100 shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>{isUz ? 'Saralash Qo‘llanmasi' : 'What Goes Where'}</span>
                </div>
                <p className="text-xs text-slate-600">
                  {isUz ? 'Plastik, batareya, meva po‘stlog‘ini qaysi rangli idishga solish ko‘rsatiladi.' : 'Visual color-coded guide for plastics, e-waste, organics and paper.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-emerald-100 shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase">
                  <RefreshCw className="w-4 h-4 text-emerald-600" />
                  <span>{isUz ? 'Jamiyat Tekshiruvi' : 'Crowd Verified'}</span>
                </div>
                <p className="text-xs text-slate-600">
                  {isUz ? 'Mahalla faollari va aholi kechikishlarni bir bosishda bildiradi.' : 'Residents actively report schedule shifts for municipal verification.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-emerald-100 shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase">
                  <ShieldAlert className="w-4 h-4 text-emerald-600" />
                  <span>{isUz ? 'Kechki Eslatma' : 'Evening Push'}</span>
                </div>
                <p className="text-xs text-slate-600">
                  {isUz ? 'Har oqshom 18:00 da ertangi kun uchun qisqa eslatma beriladi.' : 'Automated 6:00 PM alerts stating what goes out the next morning.'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-100/70 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
              <strong>{isUz ? 'Asosiy ustunlik:' : 'Competitive Edge:'}</strong>{' '}
              {isUz
                ? 'Biz faqat jadval ko‘rsatmaymiz, balki Toshkent mahallalari va shahar tozalash korxonalari o‘rtasidagi raqamli ko‘prikni yaratamiz.'
                : 'We bridge municipal operators and local neighborhoods through crowd-verified data and open civic infrastructure.'}
            </div>
          </div>
        </div>

        {/* Structured Comparison Table */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
            <h3 className="font-bold text-sm">
              {isUz ? 'Taqqoslash: Mavjud Ilovalar vs. EcoMahalla' : 'Side-by-Side: Existing Apps vs. EcoMahalla'}
            </h3>
            <span className="text-xs text-slate-400">
              {isUz ? 'Bozor tahlili 2024–2026' : 'Market Analysis 2024–2026'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[580px] text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 sm:px-6">{isUz ? 'Mezon' : 'Criterion'}</th>
                  <th className="py-3 px-4 sm:px-6 text-rose-700">{isUz ? 'Eski / Mavjud Ilovalar' : 'Existing Apps'}</th>
                  <th className="py-3 px-4 sm:px-6 text-emerald-700 font-bold">{isUz ? 'EcoMahalla Yondashuvi' : 'EcoMahalla Approach'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">{row.aspect}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-rose-600">{row.old}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-emerald-900 font-medium bg-emerald-50/30">{row.eco}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
