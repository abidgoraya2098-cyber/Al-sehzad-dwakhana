import React from 'react';
import {
  Code,
  Mail,
  Phone,
  Github,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DeveloperProfile: React.FC = () => {
  const { isUrdu, t } = useLanguage();

  return (
    <section id="developer" className="py-6 sm:py-8 bg-slate-950 text-white border-t-2 border-amber-400">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Developer Details */}
          <div className="flex items-center gap-3 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left">
            <div className="w-12 h-12 rounded-xl p-0.5 bg-gradient-to-tr from-amber-400 to-emerald-400 shadow-md shrink-0 flex items-center justify-center bg-slate-800">
              <Code className="w-6 h-6 text-amber-400" />
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  {t('ایپ ڈویلپر کریڈٹ:', 'App Developer:')}
                </span>
                <h4 className="text-sm sm:text-base font-black text-white">
                  Abid Abbas Ali Goraya (عابد عباس علی گورائیہ)
                </h4>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1 text-xs text-slate-300">
                <span className="font-bold text-emerald-400">
                  {t('رابطہ نمبر:', 'Contact:')} <span className="font-mono text-white">0300-4800071</span>
                </span>
                <span className="text-slate-500">•</span>
                <span className="font-mono text-slate-400">abidgoraya2098@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:03004800071"
              className="px-3 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 fill-slate-950" />
              <span>{t('کال کریں', 'Call')} (0300-4800071)</span>
            </a>

            <a
              href="https://wa.me/923004800071?text=Hello%20Abid%20Abbas!%20I%20am%20contacting%20regarding%20web%20development."
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <a
              href="mailto:abidgoraya2098@gmail.com"
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
