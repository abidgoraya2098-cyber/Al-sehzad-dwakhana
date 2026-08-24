import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Heart,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ChevronUp
} from 'lucide-react';
import { DawakhanaLogo } from './DawakhanaLogo';
import { useLanguage } from '../context/LanguageContext';

export const ClinicFooter: React.FC = () => {
  const { isUrdu, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#022319] text-white pt-14 pb-8 border-t-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <DawakhanaLogo size={52} />
            <p className="text-xs text-emerald-200 leading-relaxed font-medium">
              {t(
                'الشہزاد دواخانہ اینڈ ہربل کلینک — 30 سالہ خاندانی روایت کے تحت خالص قدرتی دیسی جڑی بوٹیوں سے تیار کردہ اکسیر ادویات اور آن لائن طبی رہنمائی۔',
                'Al-Shehzad Dawakhana & Herbal Clinic — 30+ years of heritage delivering authenticated Unani formulations and online herbal consultations.'
              )}
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{t('مستند رجسٹرڈ حکمت و طریقہ علاج', 'Registered Herbal Practice')}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-amber-400 uppercase tracking-widest border-b border-emerald-800/80 pb-2">
              {t('اہم لنکس و صفحات', 'Quick Navigation')}
            </h3>
            <ul className="space-y-2 text-xs text-emerald-200">
              <li>
                <a href="#home" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>•</span> {t('ہوم پیج', 'Home')}
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>•</span> {t('دیسی ادویات کیٹلاگ', 'Herbal Medicines Catalog')}
                </a>
              </li>
              <li>
                <a href="#mizaj-quiz" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>•</span> {t('طبی مزاج ٹیسٹ', 'Mizaj Diagnostic Quiz')}
                </a>
              </li>
              <li>
                <a href="#remedies" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>•</span> {t('گھریلو دیسی ٹوٹکے', 'Home Remedies')}
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>•</span> {t('علاج کورس تخمینہ', 'Course Estimator')}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>•</span> {t('مریضوں کے تاثرات', 'Patient Reviews')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinic Timings & Schedule */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-amber-400 uppercase tracking-widest border-b border-emerald-800/80 pb-2">
              {t('کلینک اوقات و معائنہ', 'Clinic Timings')}
            </h3>
            <div className="space-y-2 text-xs text-emerald-200">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">{t('ہفتہ تا جمعرات:', 'Saturday to Thursday:')}</span>
                  <span>{t('صبح 09:00 تا رات 10:00 بجے', '09:00 AM - 10:00 PM')}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2 border-t border-emerald-900/60">
                <Clock className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-red-300 block">{t('جمعۃ المبارک:', 'Friday:')}</span>
                  <span>{t('ہفتہ وار تعطیل (آن لائن ایمرجنسی واٹس ایپ دستیاب)', 'Weekly Holiday (WhatsApp emergency available)')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-amber-400 uppercase tracking-widest border-b border-emerald-800/80 pb-2">
              {t('رابطہ و ایڈریس', 'Contact & Location')}
            </h3>
            <div className="space-y-3 text-xs text-emerald-200">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {t('الشہزاد دواخانہ، مین جی ٹی روڈ، گوجرانوالہ / پنجاب، پاکستان', 'Al-Shehzad Dawakhana, Main GT Road, Gujranwala, Punjab, Pakistan')}
                </span>
              </div>

              <a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors font-bold"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>{t('واٹس ایپ: 0300-0000000', 'WhatsApp: +92 300 0000000')}</span>
              </a>

              <a
                href="mailto:abidgoraya2098@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>abidgoraya2098@gmail.com</span>
              </a>

              <a
                href="https://maps.google.com/?q=Al+Shehzad+Dawakhana"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900 text-amber-300 border border-emerald-700 text-xs font-bold hover:bg-emerald-800 transition-colors mt-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t('گوگل میپس پر لوکیشن دیکھیں', 'Google Maps Location')}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright and Back to Top */}
        <div className="pt-8 border-t border-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300">
          <div className="text-center sm:text-right rtl:sm:text-right ltr:sm:text-left space-y-1">
            <p>© 2026 {t('الشہزاد دواخانہ اینڈ ہربل کلینک۔ جملہ حقوق محفوظ ہیں۔', 'Al-Shehzad Dawakhana & Herbal Clinic. All Rights Reserved.')}</p>
            <p className="text-[11px] text-emerald-400">
              Developed by <strong className="text-amber-400">Abid Abbas Ali Goraya</strong> (عابد عباس علی گورائیہ)
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-emerald-900 text-amber-400 hover:bg-amber-400 hover:text-emerald-950 transition-all border border-emerald-700 shadow-md"
            title={t('اوپر جائیں', 'Scroll to Top')}
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
