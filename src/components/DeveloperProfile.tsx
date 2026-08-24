import React from 'react';
import {
  Code,
  Mail,
  Phone,
  Github,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DeveloperProfile: React.FC = () => {
  const { isUrdu, t } = useLanguage();

  return (
    <section id="developer" className="py-8 sm:py-10 bg-slate-900 text-white border-t-2 border-amber-400">
      <div className="max-w-4xl mx-auto px-3 sm:px-6">
        <div className="bg-slate-950/80 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Avatar & Quick Details */}
          <div className="flex items-center gap-3.5 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-0.5 bg-gradient-to-tr from-amber-400 to-emerald-400 shadow-md shrink-0 overflow-hidden">
              <img
                src="https://avatars.githubusercontent.com/u/308350951?v=4"
                alt="Abid Abbas Ali Goraya"
                className="w-full h-full object-cover rounded-xl bg-slate-800"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                }}
              />
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <h3 className="text-base sm:text-lg font-black text-white">
                  {t('عابد عباس علی گورائیہ', 'Abid Abbas Ali Goraya')}
                </h3>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                  Lead Dev
                </span>
              </div>
              <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                {t('سافٹ ویئر انجینئر و ایپ ڈویلپر', 'Lead Software Engineer & Full-Stack Architect')}
              </p>
              <span className="text-[11px] text-slate-400 font-mono block">
                abidgoraya2098@gmail.com
              </span>
            </div>
          </div>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
            <a
              href="mailto:abidgoraya2098@gmail.com"
              className="px-3 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Mail className="w-3.5 h-3.5 text-amber-300" />
              <span>Email</span>
            </a>

            <a
              href="https://github.com/abidgoraya2098-cyber"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5 text-amber-400" />
              <span>GitHub</span>
            </a>

            <a
              href="https://wa.me/923000000000?text=Hello%20Abid%20Abbas!%20I%20am%20contacting%20regarding%20web%20development."
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
