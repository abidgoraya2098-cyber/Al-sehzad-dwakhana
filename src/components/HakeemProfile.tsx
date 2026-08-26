import React from 'react';
import {
  ShieldCheck,
  Phone,
  Calendar,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Mail,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

interface HakeemProfileProps {
  onOpenAppointment: () => void;
  onOpenConsultation: () => void;
}

export const HakeemProfile: React.FC<HakeemProfileProps> = ({
  onOpenAppointment,
  onOpenConsultation,
}) => {
  const { isUrdu, t } = useLanguage();
  const { hakeemSettings } = useAdmin();

  const specializations = [
    { ur: 'تشخیص بذریعہ نبض و قارورہ (Pulse Diagnosis)', en: 'Traditional Pulse & Clinical Diagnosis' },
    { ur: 'امراضِ معدہ، جگر، السر و پرانی گیس', en: 'Gastrointestinal & Liver Disorders' },
    { ur: 'جوڑوں، گھٹنوں، یورک ایسڈ اور مہروں کا درد', en: 'Arthritis, Joint Pain & Spine Care' },
    { ur: 'اعصابی کمزوری و مقویاتِ خاص', en: 'Neurological & Physical Vitality' },
    { ur: 'ماہرِ حجامہ و کپنگ تھراپی (سنت علاج)', en: 'Certified Hijama & Cupping Specialist' },
    { ur: 'خواتین و مردانہ پوشیدہ امراض', en: 'Specialized Metabolic & Reproductive Health' },
  ];

  const profilePhoto = hakeemSettings.avatarUrl || '/hakeem-nawaz.jpg';
  const emailAddress = hakeemSettings.email || 'nawaznaji012@gmail.com';
  const mobileNumber = hakeemSettings.phone || '0300-6458169';
  const whatsappNumber = hakeemSettings.whatsapp || '923006458169';

  return (
    <section id="hakeem-profile" className="py-14 sm:py-20 bg-white border-b border-emerald-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-950 text-xs font-black mb-3 border border-emerald-400 shadow-xs">
            <GraduationCap className="w-4 h-4 text-emerald-800" />
            <span>{t('معالج و سرپرستِ اعلیٰ کا تعارف', 'Chief Physician & Herbal Specialist')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
            {t('حکیم صاحب کی مکمل پروفائل و رابطہ تفصیلات', 'Chief Hakeem Profile & Contact Details')}
          </h2>
          <p className="text-slate-700 text-xs sm:text-sm md:text-base mt-2 font-semibold">
            {t(
              'مستند رجسٹرڈ طبیب، 30 سالہ خاندانی تجربہ کار نباض اور حجامہ تھراپی کے ماہر۔',
              'Registered Unani Physician with over 30 years of clinical pulse diagnosis and natural medicine expertise.'
            )}
          </p>
        </div>

        {/* Profile Card Container */}
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl border-2 border-amber-400 relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            {/* Hakeem Avatar & Direct Contact Info (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
              {/* Circular Profile Picture with Royal Ring */}
              <div className="relative">
                <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-2xl overflow-hidden">
                  <img
                    src={profilePhoto}
                    alt="Hakim Muhammad Nawaz Ahmad"
                    className="w-full h-full object-cover rounded-full border-4 border-emerald-950 bg-slate-800"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/hakeem-nawaz.jpg';
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-400 text-emerald-950 px-3.5 py-1 rounded-full text-[11px] font-black shadow-lg flex items-center gap-1 whitespace-nowrap">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t('رجسٹرڈ طبیب', 'Registered Hakim')}</span>
                </div>
              </div>

              {/* Name & Titles */}
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-black text-amber-300">
                  {isUrdu ? hakeemSettings.nameUr : hakeemSettings.nameEn}
                </h3>
                <span className="text-xs sm:text-sm font-bold text-emerald-200 block">
                  {isUrdu ? hakeemSettings.degreeUr : hakeemSettings.degreeEn}
                </span>
                <span className="text-[11px] text-amber-200/90 block font-mono">
                  {t('رجسٹریشن نمبر:', 'Reg No:')} {hakeemSettings.regNo} ({t('نیشنل کونسل فار طب', 'National Council for Tibb')})
                </span>
              </div>

              {/* Clean Contact Details Box */}
              <div className="w-full bg-emerald-900/90 rounded-2xl p-4 border border-emerald-700/80 text-left rtl:text-right space-y-2.5 text-xs">
                {/* Mobile Number */}
                <div className="flex items-center justify-between gap-2 p-2 bg-emerald-950/60 rounded-xl border border-emerald-800">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-bold text-slate-200">{t('موبائل نمبر:', 'Mobile:')}</span>
                  </div>
                  <a
                    href={`tel:${mobileNumber.replace(/\D/g, '')}`}
                    className="font-mono font-black text-amber-300 hover:text-amber-200"
                  >
                    {mobileNumber}
                  </a>
                </div>

                {/* WhatsApp Number */}
                <div className="flex items-center justify-between gap-2 p-2 bg-emerald-950/60 rounded-xl border border-emerald-800">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                    <span className="font-bold text-slate-200">{t('واٹس ایپ:', 'WhatsApp:')}</span>
                  </div>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono font-black text-[#25D366] hover:text-emerald-400"
                  >
                    0300-6458169
                  </a>
                </div>

                {/* Email Address */}
                <div className="flex items-center justify-between gap-2 p-2 bg-emerald-950/60 rounded-xl border border-emerald-800">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                    <span className="font-bold text-slate-200">{t('ای میل:', 'Email:')}</span>
                  </div>
                  <a
                    href={`mailto:${emailAddress}`}
                    className="font-mono text-emerald-200 hover:text-white truncate max-w-[180px]"
                  >
                    {emailAddress}
                  </a>
                </div>
              </div>
            </div>

            {/* Detailed Bio & Specializations (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Bio Statement */}
              <div className="bg-emerald-900/60 p-4 sm:p-5 rounded-2xl border border-emerald-700/60 space-y-2">
                <h4 className="text-xs sm:text-sm font-black text-amber-300 flex items-center gap-2">
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
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider mb-2.5">
                  {t('خصوصی طبی مہارت و شعبہ جات (Specializations):', 'Areas of Clinical Specialization:')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {specializations.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-800 text-xs font-bold text-white shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{isUrdu ? spec.ur : spec.en}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                {/* Live Call Button */}
                <a
                  href={`tel:${mobileNumber.replace(/\D/g, '')}`}
                  className="w-full sm:w-auto px-4 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 fill-emerald-950" />
                  <span>{t(`حکیم صاحب کو لائیو کال کریں (${mobileNumber})`, `Call Hakim (${mobileNumber})`)}</span>
                </a>

                {/* Appointment Booking */}
                <button
                  onClick={onOpenAppointment}
                  className="w-full sm:w-auto px-4 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 border border-emerald-400"
                >
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span>{t('معائنہ کا وقت / ٹوکن بک کریں', 'Book Appointment Slot')}</span>
                </button>

                {/* WhatsApp Message */}
                <button
                  onClick={onOpenConsultation}
                  className="w-full sm:w-auto px-4 py-3 bg-white/10 hover:bg-white/20 text-emerald-100 font-bold text-xs sm:text-sm rounded-xl border border-emerald-600 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                  <span>{t('نسخہ و رپورٹ بھیجیں', 'Upload Case Report')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
