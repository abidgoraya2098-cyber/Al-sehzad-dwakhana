import React from 'react';
import {
  Code,
  Sparkles,
  Mail,
  Phone,
  Github,
  Globe,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Layers,
  Heart
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DeveloperProfile: React.FC = () => {
  const { isUrdu, t } = useLanguage();

  return (
    <section id="developer" className="py-16 sm:py-20 bg-slate-900 text-white border-t-2 border-amber-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black mb-3 border border-amber-400/40">
            <Code className="w-4 h-4 text-amber-400" />
            <span>{t('ایپ ڈویلپر و سوفٹ وئیر انجینئر تعارف', 'Application Developer Profile')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t('ایپ ڈویلپر پروفائل و ٹیکنالوجی آرکیٹیکٹ', 'Lead Full-Stack Software Architect')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 font-medium">
            {t(
              'الشہزاد دواخانہ ڈیجیٹل پلیٹ فارم اور پی ڈبلیو اے ایپلیکیشن کے بانی و چیف ڈویلپر۔',
              'Creator, Lead Full-Stack Software Engineer & Technology Architect of Al-Shehzad Dawakhana Web Platform.'
            )}
          </p>
        </div>

        {/* Developer Card */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-10 border-2 border-amber-400/60 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Avatar & Basic Info (4 cols) */}
            <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="w-40 h-40 rounded-3xl p-1.5 bg-gradient-to-tr from-amber-400 via-emerald-400 to-amber-500 shadow-2xl overflow-hidden">
                  <img
                    src="https://avatars.githubusercontent.com/u/308350951?v=4"
                    alt="Abid Abbas Ali Goraya"
                    className="w-full h-full object-cover rounded-2xl bg-slate-800"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                </div>
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                  Lead Developer
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">
                  {t('عابد عباس علی گورائیہ', 'Abid Abbas Ali Goraya')}
                </h3>
                <span className="text-xs font-bold text-amber-300 block mt-0.5">
                  Senior Full-Stack &amp; AI Systems Engineer
                </span>
                <span className="text-xs text-slate-400 font-mono block mt-1">
                  abidgoraya2098@gmail.com
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <span className="px-3 py-1 bg-slate-800 rounded-lg text-[11px] font-bold text-emerald-400 border border-slate-700">
                  ⚡ React 19 + TypeScript
                </span>
                <span className="px-3 py-1 bg-slate-800 rounded-lg text-[11px] font-bold text-amber-300 border border-slate-700">
                  📱 Full PWA Suite
                </span>
              </div>
            </div>

            {/* Description & Tech Highlights (8 cols) */}
            <div className="md:col-span-8 space-y-6">
              <div className="bg-slate-850/80 p-5 rounded-2xl border border-slate-700/80 space-y-2">
                <h4 className="text-sm font-black text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{t('ڈویلپر مشن و تعارف', 'Developer Bio & Engineering Vision')}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  {t(
                    'عابد عباس علی گورائیہ جدید ترین ویب ٹیکنالوجیز (React 19, TypeScript, Tailwind CSS, Service Workers, Google Gemini AI) کے ماہر ہیں۔ انہوں نے الشہزاد دواخانہ کی یہ جدید ایپ مریضوں کی آسانی، آن لائن ادویات کی فراہمی اور مستند طبی مشاورت کے لیے انتہائی خوبصورتی اور تیز رفتار کارکردگی کے ساتھ ڈیزائن کی ہے۔',
                    'Abid Abbas Ali Goraya is a specialized Full-Stack and AI Systems Engineer. He designed and engineered the Al-Shehzad Dawakhana web application to empower patients across Pakistan with modern telemedicine, seamless herbal product ordering, and high-performance offline PWA capabilities.'
                  )}
                </p>
              </div>

              {/* Skills and Ecosystem */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center gap-2 font-bold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>React 19 &amp; Vite 6</span>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center gap-2 font-bold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>TypeScript &amp; Tailwind</span>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center gap-2 font-bold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Bilingual RTL &amp; LTR</span>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center gap-2 font-bold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>PWA &amp; Service Worker</span>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center gap-2 font-bold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp Tele-medicine</span>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center gap-2 font-bold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Vercel Cloud Deployment</span>
                </div>
              </div>

              {/* Connect Links */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:abidgoraya2098@gmail.com"
                  className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-amber-300" />
                  <span>Email Developer</span>
                </a>

                <a
                  href="https://github.com/abidgoraya2098-cyber"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-600 transition-all flex items-center gap-2"
                >
                  <Github className="w-4 h-4 text-amber-400" />
                  <span>GitHub Profile</span>
                </a>

                <a
                  href="https://wa.me/923000000000?text=Hello%20Abid%20Abbas!%20I%20am%20contacting%20regarding%20your%20software%20and%20web%20development%20services."
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-[#25D366] hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp Direct</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
