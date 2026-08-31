import React, { useState } from 'react';
import {
  ShieldCheck,
  Phone,
  Calendar,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Mail,
  MessageSquare,
  Award,
  Clock,
  MapPin,
  FileCheck,
  CreditCard,
  X
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
  const [showCardModal, setShowCardModal] = useState(false);

  // Exact Specializations from Visiting Card
  const specializations = [
    {
      ur: 'علاج بے اولادی و بانجھ پن (مرادِ انس کورس)',
      en: 'Infertility Treatment & Family Wellness (Murad-e-Anas Course)',
      tagUr: 'سپیشلسٹ شعبہ',
      tagEn: 'Specialist'
    },
    {
      ur: 'مردانہ کمزوری و سپرم کی کمی (Oligospermia)',
      en: 'Male Infertility & Low Sperm Count Treatment',
      tagUr: '100% ہربل علاج',
      tagEn: '100% Herbal'
    },
    {
      ur: 'زنانہ امراض و نسوانی پوشیدہ مسائل',
      en: 'Female Gynecological & Hormonal Disorders',
      tagUr: 'طبی نگہداشت',
      tagEn: 'Specialized'
    },
    {
      ur: 'فالج (Paralysis) و اعصابی بحالی',
      en: 'Paralysis & Neuromuscular Rehabilitation',
      tagUr: 'آزمودہ علاج',
      tagEn: 'Clinical Care'
    },
    {
      ur: 'لقوہ (Facial Palsy) کا شافی دیسی علاج',
      en: 'Facial Palsy (Laqwa) Natural Cure',
      tagUr: 'روایتی شفاء',
      tagEn: 'Effective'
    },
    {
      ur: 'تشخیص بذریعہ نبض و قارورہ (Pulse Diagnosis)',
      en: 'Traditional Pulse & Clinical Diagnosis',
      tagUr: '35+ سالہ نباضی',
      tagEn: 'Diagnostic'
    },
    {
      ur: 'سنت طریقہ علاج: ماہرِ حجامہ و کپنگ تھراپی',
      en: 'Certified Sunnah Hijama & Cupping Therapy',
      tagUr: 'سنت علاج',
      tagEn: 'Sunnah Care'
    },
    {
      ur: 'امراضِ معدہ، جگر، السر، جوڑوں و مہروں کا درد',
      en: 'Gastrointestinal, Liver, Arthritis & Joint Pains',
      tagUr: 'اکسیر ادویات',
      tagEn: 'Herbal Care'
    },
  ];

  const profilePhoto = hakeemSettings?.avatarUrl || '/hakeem-nawaz.jpg';
  const visitingCardImg = hakeemSettings?.visitingCardImage || '/hakeem-visiting-card.jpg';
  const emailAddress = hakeemSettings?.email || 'nawaznaji012@gmail.com';
  const mobileNumber = hakeemSettings?.phone || '0300-6458169';
  const whatsappNumber = hakeemSettings?.whatsapp || '923006458169';
  const cleanPhoneDigits = (mobileNumber || '03006458169').replace(/\D/g, '') || '03006458169';
  const nctReg = hakeemSettings?.regNo || 'QH-34430-A';
  const phcReg = hakeemSettings?.phcRegNo || 'R-63608';
  const doctorName = isUrdu ? (hakeemSettings?.nameUr || 'حکیم نواز احمد') : (hakeemSettings?.nameEn || 'Hakim Nawaz Ahmad');

  return (
    <section id="hakeem-profile" className="py-14 sm:py-20 bg-white border-b border-emerald-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-950 text-xs font-black mb-3 border border-emerald-400 shadow-xs">
            <GraduationCap className="w-4 h-4 text-emerald-800" />
            <span>{t('الشہزاد دواخانہ (رجسٹرڈ) — قائم شدہ 1990', 'Al-Shahzad Dawakhana (Regd.) — Est. 1990')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
            {t('حکیم صاحب کا مکمل تعارف و تصدیق شدہ اسناد', 'Chief Hakim Profile, Credentials & Contact')}
          </h2>
          <p className="text-slate-700 text-xs sm:text-sm md:text-base mt-2 font-semibold">
            {t(
              'مستند رجسٹرڈ طبیب، 35+ سالہ خاندانی تجربہ کار نباض، بیسٹ پرفارمنس ایوارڈ ہولڈر اور حجامہ تھراپی کے ماہر۔',
              'Registered Unani Physician with 35+ years of clinical pulse diagnosis, Best Performance Award holder & Hijama specialist.'
            )}
          </p>
        </div>

        {/* Profile Card Container */}
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl border-2 border-amber-400 relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start relative z-10">
            {/* Hakeem Avatar & Official Credentials Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
              {/* Circular Profile Picture with Royal Ring */}
              <div className="relative">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-2xl overflow-hidden">
                  <img
                    src={profilePhoto}
                    alt={doctorName}
                    className="w-full h-full object-cover rounded-full border-4 border-emerald-950 bg-slate-800 transition-transform duration-300 hover:scale-105"
                    style={{ objectPosition: 'center 12%' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/hakeem-nawaz.jpg';
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-400 text-emerald-950 px-3.5 py-1 rounded-full text-[11px] font-black shadow-lg flex items-center gap-1 whitespace-nowrap">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t('رجسٹرڈ طبیب (قائم شدہ 1990)', 'Registered Hakim (Est. 1990)')}</span>
                </div>
              </div>

              {/* Name & Titles from Visiting Card */}
              <div className="space-y-1.5 w-full">
                <h3 className="text-2xl sm:text-3xl font-black text-amber-300">
                  {doctorName}
                </h3>
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-400/20 text-amber-200 border border-amber-400/40 rounded-full text-xs font-bold font-mono">
                  <span>D.H.M.S, F.T.J, R.M.P</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-xs font-black text-amber-300 pt-0.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Best Performance Award Holder</span>
                </div>
              </div>

              {/* Official Registration License Numbers Box */}
              <div className="w-full bg-emerald-950/80 rounded-2xl p-3.5 border border-amber-400/50 shadow-md text-left rtl:text-right space-y-2 text-xs">
                <div className="text-[11px] font-black text-amber-300 uppercase tracking-wider flex items-center justify-between pb-1 border-b border-emerald-800">
                  <span className="flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t('سرکاری رجسٹریشن و اسناد', 'Official Registrations')}</span>
                  </span>
                  <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded text-emerald-200">
                    {t('حکومتِ پاکستان', 'Govt Verified')}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {/* NCT Reg */}
                  <div className="p-2 bg-emerald-900/90 rounded-xl border border-emerald-700/80">
                    <span className="text-[10px] font-bold text-slate-300 block">
                      {t('نیشنل کونسل فار طب:', 'National Council for Tibb:')}
                    </span>
                    <span className="font-mono font-black text-amber-300 text-xs">
                      {nctReg}
                    </span>
                  </div>

                  {/* PHC Reg */}
                  <div className="p-2 bg-emerald-900/90 rounded-xl border border-emerald-700/80">
                    <span className="text-[10px] font-bold text-slate-300 block">
                      {t('پنجاب ہیلتھ کیئر کمیشن:', 'Punjab Health Commission:')}
                    </span>
                    <span className="font-mono font-black text-emerald-300 text-xs">
                      {phcReg}
                    </span>
                  </div>
                </div>

                {/* View Visiting Card Button */}
                <button
                  type="button"
                  onClick={() => setShowCardModal(true)}
                  className="w-full mt-2 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-emerald-950 font-black text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{t('حکیم صاحب کا اصل وزٹنگ کارڈ دیکھیں', 'View Official Visiting Card')}</span>
                </button>
              </div>

              {/* Clean Contact Details Box */}
              <div className="w-full bg-emerald-900/90 rounded-2xl p-4 border border-emerald-700/80 text-left rtl:text-right space-y-2.5 text-xs">
                {/* Mobile / WhatsApp */}
                <div className="flex items-center justify-between gap-2 p-2 bg-emerald-950/60 rounded-xl border border-emerald-800">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-bold text-slate-200">{t('موبائل / واٹس ایپ:', 'Mobile / WhatsApp:')}</span>
                  </div>
                  <a
                    href={`tel:${cleanPhoneDigits}`}
                    className="font-mono font-black text-amber-300 hover:text-amber-200 text-sm"
                  >
                    {mobileNumber}
                  </a>
                </div>

                {/* Direct WhatsApp Action */}
                <div className="flex items-center justify-between gap-2 p-2 bg-emerald-950/60 rounded-xl border border-emerald-800">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                    <span className="font-bold text-slate-200">{t('براہِ راست چیٹ:', 'Direct Chat:')}</span>
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

                {/* Landline Number */}
                <div className="flex items-center justify-between gap-2 p-2 bg-emerald-950/60 rounded-xl border border-emerald-800">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-bold text-slate-200">{t('پی ٹی سی ایل کلینک:', 'Landline Clinic:')}</span>
                  </div>
                  <a
                    href="tel:0554290297"
                    className="font-mono font-black text-amber-300 hover:text-amber-200"
                  >
                    055-4290297
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

            {/* Detailed Bio, Infertility Course Banner & Specializations (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Murad-e-Anas Featured Infertility Banner Card */}
              <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 p-4 sm:p-5 rounded-2xl border-2 border-amber-400 shadow-xl flex flex-col sm:flex-row items-center gap-4">
                <img
                  src="/murad-anas-course.jpg"
                  alt="Murad-e-Anas Course"
                  className="w-full sm:w-44 h-38 object-cover rounded-xl border border-amber-300 shrink-0 shadow-md"
                />
                <div className="space-y-1.5 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left flex-1">
                  <span className="inline-block px-2.5 py-0.5 bg-amber-400 text-emerald-950 font-black text-[11px] rounded-full shadow-xs">
                    {t('🌟 شاہکار طبی کورس — بے اولادی کا علاج', '🌟 Special Infertility Treatment')}
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-white">
                    {t('مرادِ انس کورس — بے اولاد حضرات کیلئے پیغامِ شفاء', 'Murad-e-Anas Course — Infertility is Curable')}
                  </h4>
                  <p className="text-xs text-emerald-100 font-medium leading-relaxed">
                    {t(
                      'سپرم کی کمی (Oligospermia)، مردانہ و زنانہ بانجھ پن کا 100% انشاء اللہ آزمودہ نباتاتی علاج۔ دورانیہ کورس: 3 ہفتے — قیمت صرف 4000 روپے بمعہ فری ہوم ڈیلیوری۔',
                      '100% herbal cure for low sperm count, motility, and reproductive wellness. 3 weeks course for Rs. 4000 with Free Nationwide Home Delivery.'
                    )}
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1.5">
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('السلام علیکم حکیم صاحب! مجھے مرادِ انس کورس (بے اولاد حضرات کیلئے پیغام شفاء) کے سلسلے میں رہنمائی اور آرڈر چاہیے ہے۔')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 bg-[#25D366] hover:bg-emerald-600 text-white font-black text-xs rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-md"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{t('مرادِ انس کورس کا آرڈر کریں', 'Order Murad-e-Anas Course')}</span>
                    </a>
                    <a
                      href="#products"
                      className="px-3 py-1.5 bg-emerald-950/80 hover:bg-emerald-950 text-amber-300 border border-amber-400/50 font-bold text-xs rounded-lg transition-colors inline-flex items-center gap-1"
                    >
                      <span>{t('کیٹلاگ میں دیکھیں', 'View in Catalog')}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Exact Clinic Timings & Location Card from Visiting Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Timings */}
                <div className="bg-emerald-900/80 p-3.5 rounded-2xl border border-emerald-700/70 space-y-1.5">
                  <h5 className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{t('کلینک ٹائمنگ (اوقاتِ کار):', 'Clinic Timings:')}</span>
                  </h5>
                  <div className="space-y-1 text-xs text-emerald-100">
                    <p className="flex items-center justify-between">
                      <span className="text-slate-300">{t('صبح کا وقت:', 'Morning:')}</span>
                      <strong className="text-amber-200">10:00 AM تا 02:00 PM</strong>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-slate-300">{t('وقفہ بریک:', 'Break:')}</span>
                      <strong className="text-slate-300">02:00 PM تا 04:00 PM</strong>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-slate-300">{t('شام کا وقت:', 'Evening:')}</span>
                      <strong className="text-amber-200">04:00 PM تا 08:00 PM</strong>
                    </p>
                    <p className="flex items-center justify-between pt-1 border-t border-emerald-800/80 text-red-300 font-bold">
                      <span>{t('ہفتہ وار ناغہ:', 'Weekly Off:')}</span>
                      <span>{t('بروز جمعۃ المبارک', 'Friday Closed')}</span>
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-emerald-900/80 p-3.5 rounded-2xl border border-emerald-700/70 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h5 className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <span>{t('کلینک کا پتہ:', 'Clinic Address:')}</span>
                    </h5>
                    <p className="text-xs font-bold text-white leading-relaxed">
                      {isUrdu
                        ? 'چندا قلعہ چوک نزد نعیم الیکٹرونکس گوجرانوالہ، پنجاب'
                        : 'Chanda Qila Chowk, Near Naeem Electronics, Gujranwala, Punjab, Pakistan'}
                    </p>
                  </div>
                  <div className="text-[11px] text-emerald-200/90 pt-1 border-t border-emerald-800/80 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{t('سہولت: فری پارکنگ و ویٹنگ ایریا', 'Facility: Easy Access & Parking')}</span>
                  </div>
                </div>
              </div>

              {/* Bio Statement */}
              <div className="bg-emerald-900/60 p-4 rounded-2xl border border-emerald-700/60 space-y-2">
                <h4 className="text-xs sm:text-sm font-black text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{t('پیغامِ شفاء و 35 سالہ خاندانی روایت', 'Heritage & Clinical Philosophy')}</span>
                </h4>
                <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
                  {t(
                    'الشہزاد دواخانہ (قائم شدہ 1990) ساڑھے تین دہائیوں سے زائد عرصے سے خالص نباتاتی و یونانی اصولوں کے تحت انسانیت کی خدمت انجام دے رہا ہے۔ ہمارے پاس مردانہ و زنانہ بانجھ پن، اعصابی امراض (فالج، لقوہ)، نبض شناسی اور مسنون طریقہ علاج حجامہ کے ذریعے مریض کے اصل مزاج کا تعین کر کے خالص شفابخش علاج کیا جاتا ہے۔',
                    'Established in 1990, Al-Shahzad Dawakhana has been serving humanity for over 35 years with authentic Unani medicine, pulse diagnosis, and specialized treatments for male & female infertility, paralysis, and facial palsy.'
                  )}
                </p>
              </div>

              {/* Specializations Grid from Visiting Card */}
              <div>
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>{t('سپیشلسٹ شعبہ جات و طبی مہارت (Specializations):', 'Areas of Specialization & Practice:')}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {specializations.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-800 text-xs font-bold text-white shadow-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{isUrdu ? spec.ur : spec.en}</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-800/90 text-amber-200 shrink-0 font-medium">
                        {isUrdu ? spec.tagUr : spec.tagEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                {/* Live Call Button */}
                <a
                  href={`tel:${cleanPhoneDigits}`}
                  className="w-full sm:w-auto px-4 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 fill-emerald-950" />
                  <span>{t(`حکیم صاحب سے براہ راست رابطہ (${mobileNumber})`, `Call Hakim (${mobileNumber})`)}</span>
                </a>

                {/* Appointment Booking */}
                <button
                  onClick={onOpenAppointment}
                  className="w-full sm:w-auto px-4 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 border border-emerald-400 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span>{t('معائنہ کا وقت / ٹوکن بک کریں', 'Book Appointment Slot')}</span>
                </button>

                {/* WhatsApp Consultation */}
                <button
                  onClick={onOpenConsultation}
                  className="w-full sm:w-auto px-4 py-3 bg-white/10 hover:bg-white/20 text-emerald-100 font-bold text-xs sm:text-sm rounded-xl border border-emerald-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                  <span>{t('نسخہ و رپورٹ بھیجیں', 'Upload Case Report')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visiting Card Modal Popup */}
      {showCardModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            {/* Modal Header */}
            <div className="p-4 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-800">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <h3 className="font-black text-sm sm:text-base text-amber-300">
                  {t('الشہزاد دواخانہ — حکیم نواز احمد کا اصل وزٹنگ کارڈ', 'Official Visiting Card — Hakim Nawaz Ahmad')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCardModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Image */}
            <div className="p-4 sm:p-6 bg-slate-950 flex flex-col items-center">
              <div className="rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl max-w-full">
                <img
                  src={visitingCardImg}
                  alt="Hakim Nawaz Ahmad Visiting Card"
                  className="w-full max-h-[70vh] object-contain rounded-xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/hakeem-photo.jpg';
                  }}
                />
              </div>

              {/* Card Meta details */}
              <div className="mt-4 w-full bg-emerald-950/90 rounded-xl p-3 border border-emerald-800 text-xs text-emerald-100 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-black text-amber-300 block">{doctorName} (D.H.M.S, F.T.J, R.M.P)</span>
                  <span className="text-[11px] text-slate-300">NCT: {nctReg} | PHC: {phcReg}</span>
                </div>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs rounded-lg transition-colors inline-flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t('واٹس ایپ رابطہ', 'WhatsApp')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
