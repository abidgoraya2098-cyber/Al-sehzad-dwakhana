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
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onOpenConsultation: () => void;
  onStartQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onOpenConsultation,
  onStartQuiz,
}) => {
  const { isUrdu, t } = useLanguage();
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
    <section id="home" className="relative pt-6 pb-14 md:pt-12 md:pb-20 overflow-hidden bg-herbal-radial">
      {/* Decorative Ornaments */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          {/* Royal Heritage Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/10 border border-emerald-700/30 text-emerald-900 text-xs md:text-sm font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '8s' }} />
            <span>{t('مستند یونانی و ہربل طریقہ علاج — قائم شدہ 1996', 'Authenticated Tibb-e-Unani & Herbal Clinic — Est. 1996')}</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
            <span>{t('قدرتی جڑی بوٹیوں سے شفا', 'Natural Healing with Pure Herbs')}</span>
            <span className="block mt-2 gold-gradient-text font-black">
              {t('الشہزاد دواخانہ اینڈ ہربل کلینک', 'Al-Shehzad Dawakhana & Clinic')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium max-w-2xl mx-auto">
            {t(
              'خالص دیسی جڑی بوٹیوں سے تیار کردہ معجون، عرقیات، کشتہ جات اور ہربل مصنوعات۔ سینئر حکماء کی زیرِ نگرانی آن لائن مفت تشخیص و نسخہ جات۔',
              'Pure herbal formulations including Majoon, Herbal Distillates, and customized treatments under the direct supervision of experienced Hakim specialists.'
            )}
          </p>

          {/* Search Box */}
          <div className="pt-2 max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-lg rounded-2xl overflow-hidden bg-white border-2 border-emerald-600/30 focus-within:border-emerald-600 transition-all">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t('اپنی بیماری، علامت یا دوا کا نام تلاش کریں (مثلاً جوڑوں کا درد، معجون، معدہ)...', 'Search disease, symptom or herbal medicine (e.g. Joint Pain, Honey, Digestion)...')}
                className="w-full py-3.5 px-4 text-sm sm:text-base text-slate-900 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="bg-emerald-800 hover:bg-emerald-700 text-white px-6 py-3.5 font-bold text-sm flex items-center gap-2 transition-colors shrink-0"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">{t('تلاش کریں', 'Search')}</span>
              </button>
            </form>

            {/* Quick Filter Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 pt-1">
              <span className="text-xs text-slate-500 font-semibold">{t('فوری تلاش:', 'Popular:')}</span>
              {quickTags.map((tag) => (
                <button
                  key={tag.query}
                  onClick={() => {
                    setSearchInput(tag.query);
                    onSearch(tag.query);
                    const el = document.getElementById('products');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-2.5 py-1 text-xs rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors font-medium"
                >
                  {isUrdu ? tag.labelUr : tag.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#products"
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 border border-amber-400/40"
            >
              <Leaf className="w-5 h-5 text-amber-300" />
              <span>{t('دیسی ادویات کیٹلاگ دیکھیں', 'Explore Herbal Products')}</span>
            </a>

            <button
              onClick={onOpenConsultation}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Stethoscope className="w-5 h-5" />
              <span>{t('مفت آن لائن حکیم مشورہ', 'Free Hakeem Consultation')}</span>
            </button>

            <button
              onClick={onStartQuiz}
              className="px-5 py-3.5 bg-white text-emerald-900 border-2 border-emerald-300 hover:bg-emerald-50 font-bold text-sm sm:text-base rounded-xl shadow-sm transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{t('طبی مزاج ٹیسٹ کریں', 'Take Mizaj Quiz')}</span>
            </button>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-12 pt-8 border-t border-emerald-200/70 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white/90 rounded-2xl p-4 text-center border border-emerald-100 shadow-xs flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2">
              <Award className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl text-emerald-950">30+ {t('سال', 'Years')}</span>
            <span className="text-xs text-slate-600 font-medium">{t('خاندانی حکمت و تجربہ', 'Tibb Heritage')}</span>
          </div>

          <div className="bg-white/90 rounded-2xl p-4 text-center border border-emerald-100 shadow-xs flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl text-emerald-950">100% {t('خالص', 'Pure')}</span>
            <span className="text-xs text-slate-600 font-medium">{t('قدرتی دیسی جڑی بوٹیاں', 'Natural Herbs')}</span>
          </div>

          <div className="bg-white/90 rounded-2xl p-4 text-center border border-emerald-100 shadow-xs flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-2">
              <Users className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl text-emerald-950">50,000+</span>
            <span className="text-xs text-slate-600 font-medium">{t('مطمئن شفایاب مریض', 'Happy Patients')}</span>
          </div>

          <div className="bg-white/90 rounded-2xl p-4 text-center border border-emerald-100 shadow-xs flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2">
              <Truck className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl text-emerald-950">{t('فری ڈلیوری', 'Free Shipping')}</span>
            <span className="text-xs text-slate-600 font-medium">{t('پورے پاکستان میں', 'Across Pakistan')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
