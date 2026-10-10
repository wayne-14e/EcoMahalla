import React, { useState } from 'react';
import { Language } from '../../types';
import { Bot, Send, Sparkles, User, RefreshCw, HelpCircle } from 'lucide-react';

interface AIChatbotProps {
  lang: Language;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: string;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ lang }) => {
  const isUz = lang === 'uz';

  const samplePrompts = isUz
    ? [
        'Plastik butilkalarni qanday to‘g‘ri tayyorlash kerak?',
        'Eski telefon va litiy batareyalarni qayerga topshiramiz?',
        'Non va quruq oziq-ovqat qoldiqlarini nima qilish lozim?',
        'Shisha idishlar va singan oyna farqi nimada?',
      ]
    : [
        'How do I prep PET plastic bottles for recycling?',
        'Where do old phones and lithium batteries go in Tashkent?',
        'What is the proper disposal for bread and food scraps?',
        'Can broken window glass go into the blue bottle recycling bin?',
      ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: isUz
        ? 'Assalomu alaykum! Men **EcoMahalla AI** maslahatchisiman.\n\nChiqindilarni to‘g‘ri saralash, qutilarning ranglari (Ko‘k, Yashil, Kulrang, Qizil) yoki tuman jadvallari bo‘yicha istalgan savolingizni bering.'
        : 'Hello! I am **EcoMahalla AI**, your municipal recycling advisor.\n\nAsk me anything about waste sorting streams, bin colors (Blue, Green, Gray, Red), or municipal collection schedules.',
      timestamp: 'Bugun / Today',
      source: 'gemini-3.8-flash',
    },
  ]);

  const [inputQuestion, setInputQuestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Robust Markdown parser for rich bold (**bold**), italic (*italic*), code (`code`), and lists
  const renderFormattedContent = (text: string, isUser: boolean) => {
    const paragraphs = text.split(/\n\s*\n/);

    const formatLine = (line: string, keyPrefix: string) => {
      // Split by bold (**...**), italic (*...*), or code (`...`)
      const parts = line.split(/(\*\*[^*]+?\*\*|\*[^*]+?\*|`[^`]+?`)/g);

      return parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
          return (
            <strong
              key={`${keyPrefix}-${idx}`}
              className={
                isUser
                  ? 'font-bold text-white underline decoration-white/40'
                  : 'font-extrabold text-slate-950'
              }
            >
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
          return (
            <em key={`${keyPrefix}-${idx}`} className="italic opacity-90">
              {part.slice(1, -1)}
            </em>
          );
        }
        if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
          return (
            <code
              key={`${keyPrefix}-${idx}`}
              className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[11px] text-emerald-800 font-semibold"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      });
    };

    return (
      <div className="space-y-2">
        {paragraphs.map((para, pIdx) => {
          const lines = para.split('\n');
          return (
            <div key={pIdx} className="space-y-1">
              {lines.map((line, lIdx) => {
                const trimmed = line.trim();
                const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ');
                const contentToParse = isBullet ? trimmed.replace(/^[-•*]\s+/, '') : line;
                const numMatch = trimmed.match(/^(\d+\.)\s+(.*)$/);

                if (isBullet) {
                  return (
                    <div key={lIdx} className="flex items-start gap-2 ml-1 text-xs sm:text-sm">
                      <span className="text-emerald-600 font-bold leading-relaxed">•</span>
                      <span className="flex-1 leading-relaxed">
                        {formatLine(contentToParse, `p${pIdx}-l${lIdx}`)}
                      </span>
                    </div>
                  );
                }

                if (numMatch) {
                  return (
                    <div key={lIdx} className="flex items-start gap-2 ml-1 text-xs sm:text-sm">
                      <span className="text-emerald-700 font-bold leading-relaxed text-xs">
                        {numMatch[1]}
                      </span>
                      <span className="flex-1 leading-relaxed">
                        {formatLine(numMatch[2], `p${pIdx}-l${lIdx}`)}
                      </span>
                    </div>
                  );
                }

                return (
                  <p key={lIdx} className="leading-relaxed">
                    {formatLine(line, `p${pIdx}-l${lIdx}`)}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const handleSend = async (questionText?: string) => {
    const q = (questionText || inputQuestion).trim();
    if (!q || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/waste-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, language: lang }),
      });
      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.answer || (isUz ? 'Javob olindi.' : 'Response received.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini-3.8-flash',
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        text: isUz
          ? 'Qayta ishlanadigan toza materiallar (plastik, qog‘oz, shisha) **Ko‘k quti**ga, organik qoldiqlar **Yashil quti**ga, umumiy chiqindilar **Kulrang quti**ga tushadi.'
          : 'Clean dry recyclables belong in the **Blue Bin**, organic scraps in **Green**, and residual waste in **Gray**.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'knowledge-base-advisor',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col h-[620px]">
      {/* Chatbot Top Header */}
      <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm">EcoMahalla AI Advisor</h4>
              <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {isUz ? 'Chiqindilarni saralash va shahar jadvallari bo‘yicha aqlli yordamchi' : 'Context-aware waste sorting & civic Q&A'}
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'reset',
                sender: 'assistant',
                text: isUz
                  ? 'Suhbat yangilandi. Qanday savolingiz bor?'
                  : 'Chat reset. What would you like to ask about recycling?',
                timestamp: '00:00',
                source: 'gemini-3.8-flash',
              },
            ])
          }
          className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Reset Chat"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Message Feed with Custom Scrollbar */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/40">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white text-xs ${
                  isUser ? 'bg-slate-800' : 'bg-emerald-600'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-slate-900 text-white rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-800 shadow-2xs rounded-tl-none'
                }`}
              >
                {renderFormattedContent(msg.text, isUser)}
                <div
                  className={`mt-2 pt-1 border-t flex items-center justify-between text-[10px] ${
                    isUser ? 'border-white/10 text-slate-400' : 'border-slate-100 text-slate-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {!isUser && msg.source && <span className="font-mono">model: {msg.source}</span>}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3 text-slate-500 text-xs italic">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl rounded-tl-none flex items-center gap-2 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isUz ? 'Gemini AI tahlil qilmoqda...' : 'EcoMahalla AI is thinking...'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Control Area: Samples directly above Input Field */}
      <div className="bg-white border-t border-slate-200">
        {/* Suggested Samples Pill Row Above Input Field */}
        <div className="px-3 sm:px-4 pt-2.5 pb-2 bg-slate-50/90 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
          <div className="flex items-center gap-1 text-slate-500 shrink-0 font-medium">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isUz ? 'Namunalar:' : 'Samples:'}</span>
          </div>
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-800 hover:bg-emerald-50/40 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-2xs text-[11px] font-medium"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form Bar */}
        <div className="p-3 sm:p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              placeholder={
                isUz
                  ? 'Chiqindini qaysi qutiga tashlashni so‘rang (masalan: "Eski batareyani nima qilay?")...'
                  : 'Ask how to dispose of any item (e.g. "What to do with old batteries?")...'
              }
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 text-xs sm:text-sm"
            />

            <button
              type="submit"
              disabled={!inputQuestion.trim() || isLoading}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">{isUz ? 'Yuborish' : 'Send'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
