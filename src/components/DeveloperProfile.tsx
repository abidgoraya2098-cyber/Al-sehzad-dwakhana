import React from 'react';
import { Phone, MessageSquare, Code } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DeveloperProfile: React.FC = () => {
  const { isUrdu, t } = useLanguage();

  return (
    <section id="developer" className="py-6 sm:py-8 bg-slate-900 text-white border-t-2 border-amber-400">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-950/90 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Developer Name & Title */}
          <div className="flex items-center gap-3 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left">
            <div className="w-11 h-11 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  {t('عابد عباس علی گورائیہ', 'Abid Abbas Ali Goraya')}
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  {t('ایپ ڈویلپر', 'App Developer')}
                </span>
              </div>
              <span className="text-xs text-amber-300 font-mono font-bold block mt-0.5">
                {t('موبائل نمبر:', 'Mobile:')} 0300-4800071
              </span>
            </div>
          </div>

          {/* Direct Call & WhatsApp Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:03004800071"
              className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 border border-emerald-600"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('کال کریں', 'Call')} (03004800071)</span>
            </a>

            <a
              href="https://wa.me/923004800071?text=Hello%20Abid%20Abbas!%20I%20am%20contacting%20regarding%20app%20development."
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 bg-[#25D366] hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
