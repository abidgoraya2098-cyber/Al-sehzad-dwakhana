import React, { useState } from 'react';
import {
  Search,
  Stethoscope,
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  Truck,
  ArrowRight,
  Leaf,
  CheckCircle2,
  Phone,
  Calendar,
  Droplet
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { ClinicStatusBadge } from './ClinicStatusBadge';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onOpenConsultation: () => void;
  onOpenAppointment: () => void;
  onStartQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onOpenConsultation,
  onOpenAppointment,
  onStartQuiz,
}) => {
  const { isUrdu, t } = useLanguage();
  const { hakeemSettings } = useAdmin();
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      const el = document.getElementById('products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickTags = [
    { labelUr: 'جوڑوں کا درد', labelEn: 'Joint Pain', query: 'جوڑوں' },
    { labelUr: 'معدہ و گیس', labelEn: 'Acidity & Gas', query: 'ہاضم' },
    { labelUr: 'خالص شہد', labelEn: 'Pure Honey', query: 'شہد' },
    { labelUr: 'بالوں کا گرنا', labelEn: 'Hair Fall', query: 'بالاں' },
    { labelUr: 'خمیرہ گاؤزبان', labelEn: 'Khamira Gaozaban', query: 'گاؤزبان' },
    { labelUr: 'عرقِ گلاب', labelEn: 'Rose Water', query: 'عرق' },
  ];

  return (
    <section id="home" className="relative pt-6 pb-12 sm:pb-16 md:pt-10 md:pb-20 overflow-hidden bg-herbal-radial border-b border-emerald-100 w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5">
          {/* Top Status and Slogan Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <ClinicStatusBadge />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-900 text-amber-300 text-[11px] sm:text-xs font-black shadow-xs border border-amber-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('مستند یونانی و ہربل علاج — قائم شدہ 1996', 'Tibb-e-Unani & Herbal Clinic — Est. 1996')}</span>
            </div>
          </div>

          {/* Main Hero Headline (High-Contrast Bold) */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 leading-tight tracking-tight px-1">
            <span>{t('قدرتی جڑی بوٹیوں سے شافی علاج', 'Authentic Natural Herbal Healing')}</span>
            <span className="block mt-1 sm:mt-2 text-emerald-900 font-black">
              {t('الشہزاد دواخانہ اینڈ ہربل کلینک', 'Al-Shehzad Dawakhana & Clinic')}
            </span>
          </h1>

          {/* Subtitle (High-Contrast Dark Gray) */}
          <p className="text-xs sm:text-base md:text-lg text-slate-800 leading-relaxed font-bold max-w-2xl mx-auto px-2">
            {t(
              `${hakeemSettings.experienceYears} سالہ خاندانی تجربہ کار ${isUrdu ? hakeemSettings.nameUr : hakeemSettings.nameEn} کی زیرِ نگرانی خالص دیسی ادویات، معجون، عرقیات، حجامہ تھراپی اور آن لائن مفت طبی رہنمائی۔`,
              `Over ${hakeemSettings.experienceYears} years of authentic clinical pulse diagnosis, customized herbal formulations, pure honey, Hijama therapy, and direct consultations under ${hakeemSettings.nameEn}.`
            )}
          </p>

          {/* Search Box */}
          <div className="pt-1 sm:pt-2 max-w-2xl mx-auto w-full px-1">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-lg rounded-2xl overflow-hidden bg-white border-2 border-emerald-800 focus-within:border-amber-500 transition-all w-full">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t('بیماری، علامت یا دوا تلاش کریں (مثلاً جوڑوں کا درد، معدہ)...', 'Search disease, symptom or herbal medicine...')}
                className="w-full py-3 sm:py-3.5 px-3 sm:px-4 text-xs sm:text-base text-slate-950 font-bold focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="bg-emerald-900 hover:bg-emerald-800 text-white px-4 sm:px-6 py-3 sm:py-3.5 font-black text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 transition-colors shrink-0"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">{t('تلاش کریں', 'Search')}</span>
              </button>
            </form>

            {/* Quick Filter Tags */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-2.5 pt-1">
              <span className="text-[11px] sm:text-xs text-slate-700 font-black">{t('فوری تلاش:', 'Popular:')}</span>
              {quickTags.map((tag) => (
                <button
                  key={tag.query}
                  onClick={() => {
                    setSearchInput(tag.query);
                    onSearch(tag.query);
                    const el = document.getElementById('products');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs rounded-lg bg-emerald-100/80 hover:bg-emerald-200 text-emerald-950 border border-emerald-300 transition-colors font-bold"
                >
                  {isUrdu ? tag.labelUr : tag.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Main Action CTAs */}
          <div className="pt-3 sm:pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full">
            {/* Live Phone Call */}
            <a
              href={`tel:${hakeemSettings.phone.replace(/\D/g, '')}`}
              className="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 border border-amber-500"
            >
              <Phone className="w-4 h-4 fill-emerald-950" />
              <span>{t('حکیم صاحب سے لائیو کال پر بات کریں', 'Call Hakim Live')}</span>
            </a>

            {/* Book Appointment Slot */}
            <button
              onClick={onOpenAppointment}
              className="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-3.5 bg-emerald-900 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 border border-amber-400"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{t('معائنہ / ٹائم سلاٹ بک کریں', 'Book Appointment Slot')}</span>
            </button>

            {/* Upload Prescription */}
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-3.5 bg-white text-emerald-950 hover:bg-emerald-50 font-black text-xs sm:text-sm rounded-xl border-2 border-emerald-700 shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Stethoscope className="w-4 h-4 text-emerald-700" />
              <span>{t('آن لائن نسخہ و رپورٹ بھیجیں', 'Upload Report')}</span>
            </button>

            {/* Hijama Link */}
            <a
              href="#hijama"
              className="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-3.5 bg-teal-800 hover:bg-teal-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Droplet className="w-4 h-4 text-amber-300" />
              <span>{t('حجامہ تھراپی سنٹر', 'Hijama Cupping')}</span>
            </a>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-emerald-200 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          <div className="bg-white rounded-2xl p-3 sm:p-4 text-center border border-emerald-200 shadow-sm flex flex-col items-center">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center mb-1.5 sm:mb-2 font-black">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="font-black text-lg sm:text-xl text-emerald-950">{hakeemSettings.experienceYears} {t('سال', 'Years')}</span>
            <span className="text-[11px] sm:text-xs text-slate-700 font-bold">{t('خاندانی حکمت و نباضی', 'Pulse & Unani Heritage')}</span>
          </div>

          <div className="bg-white rounded-2xl p-3 sm:p-4 text-center border border-emerald-200 shadow-sm flex flex-col items-center">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-1.5 sm:mb-2 font-black">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="font-black text-lg sm:text-xl text-emerald-950">100% {t('خالص', 'Pure')}</span>
            <span className="text-[11px] sm:text-xs text-slate-700 font-bold">{t('قدرتی دیسی جڑی بوٹیاں', '100% Organic Herbs')}</span>
          </div>

          <div className="bg-white rounded-2xl p-3 sm:p-4 text-center border border-emerald-200 shadow-sm flex flex-col items-center">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center mb-1.5 sm:mb-2 font-black">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="font-black text-lg sm:text-xl text-emerald-950">50,000+</span>
            <span className="text-[11px] sm:text-xs text-slate-700 font-bold">{t('مطمئن شفایاب مریض', 'Happy Patients')}</span>
          </div>

          <div className="bg-white rounded-2xl p-3 sm:p-4 text-center border border-emerald-200 shadow-sm flex flex-col items-center">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center mb-1.5 sm:mb-2 font-black">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="font-black text-lg sm:text-xl text-emerald-950">{t('فری ڈلیوری', 'Free Shipping')}</span>
            <span className="text-[11px] sm:text-xs text-slate-700 font-bold">{t('پورے پاکستان میں', 'Across Pakistan')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
