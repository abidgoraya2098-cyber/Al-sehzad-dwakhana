import React from 'react';
import {
  Award,
  ShieldCheck,
  Phone,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  HeartPulse,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HakeemProfileProps {
  onOpenAppointment: () => void;
  onOpenConsultation: () => void;
}

export const HakeemProfile: React.FC<HakeemProfileProps> = ({
  onOpenAppointment,
  onOpenConsultation,
}) => {
  const { isUrdu, t } = useLanguage();

  const specializations = [
    { ur: 'تشخیص بذریعہ نبض و قارورہ (Pulse Diagnosis)', en: 'Traditional Pulse & Clinical Diagnosis' },
    { ur: 'امراضِ معدہ، جگر، السر و پرانی گیس', en: 'Gastrointestinal & Liver Disorders' },
    { ur: 'جوڑوں، گھٹنوں، یورک ایسڈ اور مہروں کا درد', en: 'Arthritis, Joint Pain & Spine Care' },
    { ur: 'اعصابی کمزوری و مقویاتِ خاص', en: 'Neurological & Physical Vitality' },
    { ur: 'ماہرِ حجامہ و کپنگ تھراپی (سنت علاج)', en: 'Certified Hijama & Cupping Specialist' },
    { ur: 'خواتین و مردانہ پوشیدہ امراض', en: 'Specialized Metabolic & Reproductive Health' },
  ];

  return (
    <section id="hakeem-profile" className="py-16 sm:py-20 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-950 text-xs font-black mb-3 border border-emerald-400 shadow-xs">
            <GraduationCap className="w-4 h-4 text-emerald-800" />
            <span>{t('معالج و سرپرستِ اعلیٰ کا تعارف', 'Chief Physician & Herbal Specialist')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            {t('حکیم صاحب کی مکمل پروفائل و اسناد', 'Chief Hakeem Profile & Qualifications')}
          </h2>
          <p className="text-slate-700 text-sm sm:text-base mt-2 font-semibold">
            {t(
              'مستند رجسٹرڈ طبیب، 30 سالہ خاندانی تجربہ کار نباض اور حجامہ تھراپی کے ماہر۔',
              'Registered Unani Physician with over 30 years of clinical pulse diagnosis and natural medicine expertise.'
            )}
          </p>
        </div>

        {/* Profile Card Container */}
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-amber-400 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Hakeem Avatar & Credentials (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full p-2 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80"
                    alt="Chief Hakeem Al-Shehzad"
                    className="w-full h-full object-cover rounded-full border-4 border-emerald-950"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-400 text-emerald-950 px-4 py-1 rounded-full text-xs font-black shadow-lg flex items-center gap-1 whitespace-nowrap">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t('رجسٹرڈ طبیب', 'Registered Hakim')}</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-amber-300">
                  {t('حکیم حاذق الشہزاد', 'Hakim-e-Haziq Al-Shehzad')}
                </h3>
                <span className="text-xs font-extrabold text-emerald-200 block mt-1">
                  {t('فاضل الطب والجراحت (F.T.J / B.U.M.S)', 'Faculty of Tibb & Surgery (FTJ / BUMS)')}
                </span>
                <span className="text-[11px] text-amber-200/90 block mt-0.5 font-mono">
                  {t('رجسٹریشن نمبر: NCT-89423 (نیشنل کونسل فار طب پاکستان)', 'Reg No: NCT-89423 (National Council for Tibb)')}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <span className="px-3 py-1 bg-emerald-900/90 rounded-full border border-emerald-700 text-[11px] font-bold text-emerald-100">
                  ⭐ 30+ {t('سالہ کلینیکل تجربہ', 'Years Clinical Exp')}
                </span>
                <span className="px-3 py-1 bg-emerald-900/90 rounded-full border border-emerald-700 text-[11px] font-bold text-amber-300">
                  🌿 50,000+ {t('شفایاب مریض', 'Treated Patients')}
                </span>
              </div>
            </div>

            {/* Detailed Bio & Specializations (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Bio Statement */}
              <div className="bg-emerald-900/60 p-5 rounded-2xl border border-emerald-700/60 space-y-2">
                <h4 className="text-sm font-black text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{t('پیغامِ شفاء و خاندانی پس منظر', 'Heritage & Clinical Philosophy')}</span>
                </h4>
                <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
                  {t(
                    'الحمدللہ تین دہائیوں سے زائد عرصے سے ہمارا خاندان طبِ یونانی کے اصولوں کے تحت خالص قدرتی جڑی بوٹیوں اور نبض شناسی کے ذریعے انسانیت کی بے لوث خدمت میں مصروف ہے۔ ہم کیمیکلز سے پاک، خالص کشتہ جات، معجون اور عرق کشید کر کے مریض کے اصل مزاج کے مطابق شفابخش علاج تجویز کرتے ہیں۔',
                    'For over three decades, our family practice has been dedicated to authentic Unani medicine, pulse diagnosis, and Sunnah therapies like Hijama. We prescribe individualized, 100% natural herbal formulas free of chemical additives.'
                  )}
                </p>
              </div>

              {/* Specializations Grid */}
              <div>
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider mb-3">
                  {t('خصوصی طبی مہارت و شعبہ جات (Specializations):', 'Areas of Clinical Specialization:')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {specializations.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-950/70 border border-emerald-800 text-xs font-bold text-white shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{isUrdu ? spec.ur : spec.en}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {/* Live Call Button */}
                <a
                  href="tel:+923000000000"
                  className="px-5 py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 fill-emerald-950" />
                  <span>{t('حکیم صاحب کو ڈائریکٹ کال کریں (0300-0000000)', 'Call Hakim Directly')}</span>
                </a>

                {/* Appointment Booking */}
                <button
                  onClick={onOpenAppointment}
                  className="px-5 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 border border-emerald-400"
                >
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span>{t('معائنہ کا وقت / ٹائم سلاٹ بک کریں', 'Book Appointment Time')}</span>
                </button>

                {/* WhatsApp Message */}
                <button
                  onClick={onOpenConsultation}
                  className="px-4 py-3.5 bg-white/10 hover:bg-white/20 text-emerald-100 font-bold text-xs sm:text-sm rounded-xl border border-emerald-600 transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                  <span>{t('نسخہ / رپورٹ بھیجیں', 'Upload Report')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
