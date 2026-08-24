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
  ChevronUp,
  User,
  Droplet,
  Code
} from 'lucide-react';
import { DawakhanaLogo } from './DawakhanaLogo';
import { ClinicStatusBadge } from './ClinicStatusBadge';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export const ClinicFooter: React.FC = () => {
  const { isUrdu, t } = useLanguage();
  const { hakeemSettings } = useAdmin();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#021f16] text-white pt-14 pb-8 border-t-4 border-amber-400 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <DawakhanaLogo size={52} />
            <p className="text-xs text-emerald-200 leading-relaxed font-medium">
              {t(
                `الشہزاد دواخانہ اینڈ ہربل کلینک — ${hakeemSettings.experienceYears} سالہ خاندانی روایت کے تحت خالص قدرتی دیسی جڑی بوٹیوں سے تیار کردہ اکسیر ادویات، حجامہ تھراپی اور آن لائن طبی رہنمائی۔`,
                `Al-Shehzad Dawakhana & Herbal Clinic — ${hakeemSettings.experienceYears} years of heritage delivering authenticated Unani formulations, Hijama therapy, and online herbal consultations under ${hakeemSettings.nameEn}.`
              )}
            </p>
            <ClinicStatusBadge />
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-amber-400 uppercase tracking-widest border-b border-emerald-800 pb-2">
              {t('اہم لنکس و صفحات', 'Quick Navigation')}
            </h3>
            <ul className="space-y-2 text-xs text-emerald-200 font-semibold">
              <li>
                <a href="#hakeem-profile" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isUrdu ? hakeemSettings.nameUr : hakeemSettings.nameEn}</span>
                </a>
              </li>
              <li>
                <a href="#hijama" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('حجامہ و کپنگ تھراپی سنٹر', 'Hijama Cupping Center')}</span>
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>•</span> {t('دیسی ادویات کیٹلاگ', 'Herbal Medicines Catalog')}
                </a>
              </li>
              <li>
                <a href="#mizaj-quiz" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>•</span> {t('طبی مزاج ٹیسٹ کوئز', 'Mizaj Diagnostic Quiz')}
                </a>
              </li>
              <li>
                <a href="#remedies" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>•</span> {t('گھریلو دیسی ٹوٹکے', 'Home Remedies')}
                </a>
              </li>
              <li>
                <a href="#developer" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('ایپ ڈویلپر پروفائل', 'App Developer Profile')}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinic Timings & Schedule */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-amber-400 uppercase tracking-widest border-b border-emerald-800 pb-2">
              {t('کلینک اوقات و معائنہ', 'Clinic Timings')}
            </h3>
            <div className="space-y-2 text-xs text-emerald-200 font-medium">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">{t('صبح و شام اوقات:', 'Clinic Shift Timings:')}</span>
                  <span>{isUrdu ? hakeemSettings.clinicTimingsUr : hakeemSettings.clinicTimingsEn}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2 border-t border-emerald-900">
                <Clock className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-red-300 block">{t('جمعۃ المبارک:', 'Friday:')}</span>
                  <span>{t('ہفتہ وار تعطیل (آن لائن ایمرجنسی دستیاب)', 'Weekly Holiday (Online emergency available)')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-amber-400 uppercase tracking-widest border-b border-emerald-800 pb-2">
              {t('رابطہ و ایڈریس', 'Contact & Location')}
            </h3>
            <div className="space-y-3 text-xs text-emerald-200 font-semibold">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {isUrdu ? hakeemSettings.addressUr : hakeemSettings.addressEn}
                </span>
              </div>

              <a
                href={`tel:${hakeemSettings.phone.replace(/\D/g, '')}`}
                className="flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors font-black bg-emerald-900/80 p-2 rounded-xl border border-emerald-700"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{t(`ڈائریکٹ فون: ${hakeemSettings.phone}`, `Phone: ${hakeemSettings.phone}`)}</span>
              </a>

              <a
                href={`https://wa.me/${hakeemSettings.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-300 hover:text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>{t(`واٹس ایپ: ${hakeemSettings.phone}`, `WhatsApp: ${hakeemSettings.phone}`)}</span>
              </a>

              <a
                href={`mailto:${hakeemSettings.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{hakeemSettings.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright and Developer Credit */}
        <div className="pt-8 border-t border-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300">
          <div className="text-center sm:text-right rtl:sm:text-right ltr:sm:text-left space-y-1">
            <p>© 2026 {t('الشہزاد دواخانہ اینڈ ہربل کلینک۔ جملہ حقوق محفوظ ہیں۔', 'Al-Shehzad Dawakhana & Herbal Clinic. All Rights Reserved.')}</p>
            <p className="text-[11px] text-emerald-300 font-bold">
              Developed &amp; Architected by <a href="#developer" className="text-amber-400 hover:underline">Abid Abbas Ali Goraya</a> (عابد عباس علی گورائیہ)
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
