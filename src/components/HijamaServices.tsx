import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Calendar,
  Phone,
  CheckCircle2,
  Heart,
  Droplet,
  Users,
  Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

interface HijamaServicesProps {
  onBookHijama: () => void;
}

export const HijamaServices: React.FC<HijamaServicesProps> = ({
  onBookHijama,
}) => {
  const { isUrdu, t } = useLanguage();
  const { hakeemSettings } = useAdmin();

  const hijamaBenefits = [
    {
      titleUr: 'سنتِ رسول ﷺ کے مطابق مکمل شفا',
      titleEn: 'Sunnah-Compliant Healing',
      descUr: 'احادیثِ مبارکہ کی روشنی میں ہر بیماری اور فاسد خون سے نجات کا قدرتی ذریعہ۔',
      descEn: 'Prophetic medicine for deep detoxification and vitality.',
    },
    {
      titleUr: 'جوڑوں کے درد اور یورک ایسڈ سے نجات',
      titleEn: 'Joints & Sciatica Relief',
      descUr: 'گھٹنوں، کمر درد، عرق النساء اور مہروں کے کھچاؤ میں فوری فائدہ۔',
      descEn: 'Rapid relief for lower back, knee stiffness and arthritis.',
    },
    {
      titleUr: 'مائیگرین (آدھے سر کا درد) اور ڈپریشن',
      titleEn: 'Migraine & Mental Clarity',
      descUr: 'دائمی سر درد، بلڈ پریشر اور بے خوابی کو کنٹرول کرنے میں معاون۔',
      descEn: 'Effective treatment for chronic headaches, tension and insomnia.',
    },
    {
      titleUr: '100% ڈسپوزیبل و جراثیم سے پاک کٹس',
      titleEn: 'Sterilized Disposable Kits',
      descUr: 'ہر مریض کے لیے نئی ڈسپوزیبل کٹ اور مکمل ہائیجین پروٹوکول۔',
      descEn: 'Strict hygiene with single-use sterile medical grade cups.',
    },
  ];

  return (
    <section id="hijama" className="py-16 sm:py-20 bg-gradient-to-b from-emerald-50/40 via-white to-slate-50 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 text-amber-950 text-xs font-black mb-3 border border-amber-300 shadow-xs">
            <Droplet className="w-4 h-4 text-amber-700" />
            <span>{t('سنتِ نبوی ﷺ کے عین مطابق', 'Prophetic Sunnah Therapy')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            {t('الشہزاد حجامہ و کپنگ تھراپی سنٹر', 'Al-Shehzad Hijama & Cupping Therapy Center')}
          </h2>
          <p className="text-slate-700 text-sm sm:text-base mt-2 font-semibold">
            {t(
              'سنت طریقہ علاج کے مطابق مستند حکماء کی نگرانی میں جراثیم سے پاک ڈسپوزیبل کٹس کے ساتھ حجامہ تھراپی۔ خواتین اور مرد حضرات کے لیے علیحدہ اور پردہ دار انتظام۔',
              'Professional, sterile, and authentic Hijama cupping therapy performed by certified practitioners with separate arrangements for ladies and gents.'
            )}
          </p>
        </div>

        {/* Hijama 4 Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {hijamaBenefits.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border-2 border-emerald-100 hover:border-emerald-500 shadow-sm hover:shadow-lg transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                <CheckCircle2 className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-base font-black text-slate-900 leading-snug">
                {isUrdu ? item.titleUr : item.titleEn}
              </h3>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                {isUrdu ? item.descUr : item.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Hijama CTA Banner */}
        <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 border-2 border-amber-400 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-right rtl:md:text-right ltr:md:text-left">
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block">
              {t('خواتین و مرد حضرات کے لیے الگ تجربہ کار عملہ', 'Dedicated Male & Female Certified Staff')}
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-white">
              {t('آج ہی اپنا حجامہ سیشن اور وقت بک کروائیں', 'Schedule Your Hijama Cupping Session Today')}
            </h4>
            <p className="text-xs text-emerald-200 font-medium">
              {t('سنت تاریخوں (17، 19، 21 قمری تاریخ) کے لیے خصوصی بکنگ دستیاب ہے۔', 'Special appointments available for Sunnah dates (17th, 19th, 21st Islamic month).')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={onBookHijama}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('حجامہ ٹائم سلاٹ بک کریں', 'Book Hijama Slot')}</span>
            </button>

            <a
              href={`tel:${hakeemSettings.phone.replace(/\D/g, '')}`}
              className="px-5 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl border border-emerald-500 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>{t(`براہِ راست کال (${hakeemSettings.phone})`, `Call (${hakeemSettings.phone})`)}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
