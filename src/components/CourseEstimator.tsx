import React, { useState } from 'react';
import {
  Calculator,
  Calendar,
  Sparkles,
  Truck,
  CheckCircle,
  MessageSquare,
  ShieldCheck,
  Percent
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export const CourseEstimator: React.FC = () => {
  const { isUrdu, t } = useLanguage();
  const { hakeemSettings } = useAdmin();

  const [condition, setCondition] = useState<'digestive' | 'joints' | 'vitality' | 'hair' | 'liver'>('vitality');
  const [duration, setDuration] = useState<'15_days' | '1_month' | '2_months'>('1_month');

  const conditionsMap = {
    vitality: {
      nameUr: 'اعصابی و جسمانی کمزوری و مقوی عام',
      nameEn: 'Nervous & Physical Vitality Tonic',
      basePrice15: 2200,
      basePrice1M: 3900,
      basePrice2M: 7200,
      medicinesUr: 'معجون شبابِ خاص + خالص سدر بیری شہد + کشتہ مرکب',
      medicinesEn: 'Majoon Shabab-e-Khas + Pure Sidr Honey + Vitality Blend',
    },
    joints: {
      nameUr: 'جوڑوں، گھٹنوں، یورک ایسڈ اور عرق النساء کا درد',
      nameEn: 'Joints, Uric Acid & Sciatica Relief',
      basePrice15: 1800,
      basePrice1M: 3400,
      basePrice2M: 6200,
      medicinesUr: 'معجون سرنجان خاص + سفوف مقوی مفاصل + روغن درد',
      medicinesEn: 'Majoon Suranjan + Joint Powder + Herbal Pain Oil',
    },
    digestive: {
      nameUr: 'معدے کی تیزابیت، السر، گیس و پرانی قبض',
      nameEn: 'Gastric Acidity, Ulcer & Constipation',
      basePrice15: 1400,
      basePrice1M: 2600,
      basePrice2M: 4800,
      medicinesUr: 'سفوفِ ہاضم خاص + حبِ معدہ + عرقِ بادیان',
      medicinesEn: 'Safoof-e-Hazim + Gastric Tablets + Fennel Distillate',
    },
    hair: {
      nameUr: 'گرتے بالوں، خشکی و قبل از وقت سفید بال',
      nameEn: 'Hair Fall, Dandruff & Regrowth Course',
      basePrice15: 1600,
      basePrice1M: 2950,
      basePrice2M: 5400,
      medicinesUr: 'روغنِ بالاں خاص + ہربل ہیئر واش پاؤڈر + مقوی اعصاب',
      medicinesEn: 'Roghan-e-Balan Oil + Herbal Hair Powder + Tonic',
    },
    liver: {
      nameUr: 'جگر کی گرمی، یرقان و گردہ و مثانہ صفائی',
      nameEn: 'Liver Heat, Jaundice & Kidney Cleanse',
      basePrice15: 1300,
      basePrice1M: 2400,
      basePrice2M: 4400,
      medicinesUr: 'شربتِ بزوری معتدل + عرقِ گلاب سہ آتشہ + قرص جگر',
      medicinesEn: 'Sharbat Bazoori + Damascene Rose Water + Liver Tonic',
    },
  };

  const selectedData = conditionsMap[condition] || conditionsMap.vitality;
  const price =
    duration === '15_days'
      ? selectedData.basePrice15
      : duration === '1_month'
      ? selectedData.basePrice1M
      : selectedData.basePrice2M;

  const discountText =
    duration === '1_month'
      ? '10% بچت (Save 10%)'
      : duration === '2_months'
      ? '20% بچت + فری تحفہ (Save 20%)'
      : 'آزمائشی پیک (Trial Pack)';

  const handleBookCourse = () => {
    const durationLabel =
      duration === '15_days'
        ? '15 دن کا آزمائشی کورس'
        : duration === '1_month'
        ? '1 ماہ کا مکمل کورس'
        : '2 ماہ کا شفا کورس';

    const msg = encodeURIComponent(
      `🌿 *الشہزاد دواخانہ — علاج کورس تخمینہ و بکنگ* 🌿\n` +
      `-----------------------------------------\n` +
      `🩺 *مرض کی نوعیت:* ${selectedData.nameUr}\n` +
      `⏱️ *منتخب کورس:* ${durationLabel}\n` +
      `📦 *شامل ادویات:* ${selectedData.medicinesUr}\n` +
      `💰 *رقم:* Rs. ${price} (فری ہوم ڈلیوری پورے پاکستان میں)\n` +
      `-----------------------------------------\n` +
      `براہ کرم میرا کورس بک فرمائیں اور پارسل کیش آن ڈلیوری پر روانہ فرمائیں۔ شکریہ!`
    );

    window.open(`https://wa.me/${hakeemSettings.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <section id="estimator" className="py-14 sm:py-20 bg-gradient-to-b from-slate-50 to-emerald-50/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3 border border-emerald-300">
            <Calculator className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t('آن لائن تخمینہ لاگت و کورس', 'Smart Course & Cost Calculator')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-emerald-950">
            {t('ادویات کورس دورانیہ و قیمت تخمینہ', 'Estimate Your Herbal Treatment Course')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
            {t(
              'اپنی بیماری اور مطلوبہ کورس کا انتخاب کریں اور معلوم کریں کہ مکمل کورس پر کتنا خرچ آئے گا۔ تمام کورسز پر فری ہوم ڈلیوری دستیاب ہے۔',
              'Select your condition and desired course duration to get an instant cost calculation with free home delivery across Pakistan.'
            )}
          </p>
        </div>

        {/* Interactive Estimator Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Select Condition */}
            <div>
              <label className="text-xs font-black text-emerald-950 block mb-2 uppercase tracking-wide">
                {t('1. اپنی بیماری یا مقصد منتخب کریں:', '1. Select Your Ailment / Concern:')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {Object.entries(conditionsMap).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setCondition(key as any)}
                    className={`p-3 rounded-xl border text-right rtl:text-right ltr:text-left font-bold transition-all ${
                      condition === key
                        ? 'border-emerald-600 bg-emerald-800 text-white shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-emerald-50'
                    }`}
                  >
                    {isUrdu ? val.nameUr : val.nameEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Duration */}
            <div>
              <label className="text-xs font-black text-emerald-950 block mb-2 uppercase tracking-wide">
                {t('2. کورس کا دورانیہ منتخب کریں:', '2. Select Course Duration:')}
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => setDuration('15_days')}
                  className={`p-3 rounded-xl border font-bold text-center transition-all ${
                    duration === '15_days'
                      ? 'border-emerald-600 bg-emerald-800 text-white shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  <span className="block text-sm">15 {t('دن', 'Days')}</span>
                  <span className="text-[10px] opacity-80">{t('آزمائشی پیک', 'Trial')}</span>
                </button>

                <button
                  onClick={() => setDuration('1_month')}
                  className={`p-3 rounded-xl border font-bold text-center transition-all ${
                    duration === '1_month'
                      ? 'border-emerald-600 bg-emerald-800 text-white shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  <span className="block text-sm">1 {t('ماہ', 'Month')}</span>
                  <span className="text-[10px] text-amber-500 font-extrabold">10% Off</span>
                </button>

                <button
                  onClick={() => setDuration('2_months')}
                  className={`p-3 rounded-xl border font-bold text-center transition-all ${
                    duration === '2_months'
                      ? 'border-emerald-600 bg-emerald-800 text-white shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  <span className="block text-sm">2 {t('ماہ', 'Months')}</span>
                  <span className="text-[10px] text-amber-500 font-extrabold">20% Off</span>
                </button>
              </div>
            </div>
          </div>

          {/* Estimate Summary Column */}
          <div className="lg:col-span-5 bg-emerald-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg border-2 border-amber-400/60 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
                <span className="text-xs font-bold text-amber-400">
                  {t('کورس کا خلاصہ', 'Course Summary')}
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[11px] font-extrabold">
                  {discountText}
                </span>
              </div>

              <div>
                <span className="text-xs text-emerald-300 block">{t('منتخب علاج:', 'Condition:')}</span>
                <h4 className="text-sm font-black text-white mt-0.5">
                  {isUrdu ? selectedData.nameUr : selectedData.nameEn}
                </h4>
              </div>

              <div>
                <span className="text-xs text-emerald-300 block">{t('شامل ادویات کا سیٹ:', 'Included Formulations:')}</span>
                <p className="text-xs text-emerald-100 font-medium mt-0.5 leading-relaxed">
                  {isUrdu ? selectedData.medicinesUr : selectedData.medicinesEn}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-amber-300 font-bold bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-800">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('پورے پاکستان میں فری ہوم ڈلیوری', 'Free Cash-on-Delivery Included')}</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xs text-emerald-200">{t('کل تخمینہ لاگت:', 'Total Estimated Cost:')}</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-400">
                  Rs. {price.toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleBookCourse}
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('یہ کورس واٹس ایپ پر بُک کریں', 'Book Course via WhatsApp')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
