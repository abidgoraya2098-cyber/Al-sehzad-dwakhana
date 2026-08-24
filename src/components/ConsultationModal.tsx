import React, { useState } from 'react';
import {
  X,
  Stethoscope,
  Upload,
  User,
  Phone,
  MapPin,
  Clock,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { useNotifications } from '../context/NotificationContext';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isUrdu, t } = useLanguage();
  const { addConsultation, hakeemSettings } = useAdmin();
  const { showToast } = useNotifications();

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [city, setCity] = useState('');
  const [consultationType, setConsultationType] = useState<'whatsapp_call' | 'clinic_visit' | 'home_delivery'>('whatsapp_call');
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('');
  const [prescriptionImage, setPrescriptionImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrescriptionImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    addConsultation({
      patientName,
      phone,
      age,
      gender,
      city,
      consultationType,
      symptoms,
      duration,
      prescriptionImage: prescriptionImage || undefined,
    });

    showToast(t('آپ کا کیس کامیابی سے موصول ہو گیا ہے! حکیم صاحب جلد رابطہ فرمائیں گے۔', 'Case submitted successfully! Hakim will contact you shortly.'));

    const typeText =
      consultationType === 'whatsapp_call'
        ? 'واٹس ایپ آڈیو / ویڈیو کال'
        : consultationType === 'clinic_visit'
        ? 'کلینک پر بالمشافہ معائنہ'
        : 'ادویات بذریعہ پارسل ڈلیوری';

    const msg = encodeURIComponent(
      `🩺 *الشہزاد دواخانہ — آن لائن طبی مشورہ و نسخہ رپورٹ* 🩺\n` +
      `-----------------------------------------\n` +
      `👤 *مریض کا نام:* ${patientName}\n` +
      `📞 *رابطہ نمبر:* ${phone}\n` +
      `🎂 *عمر:* ${age} سال | *جنس:* ${gender === 'male' ? 'مرد' : 'خاتون'}\n` +
      `🏙️ *شہر:* ${city}\n` +
      `🎯 *طریقہ مشورہ:* ${typeText}\n` +
      `⏱️ *مرض کا دورانیہ:* ${duration}\n` +
      `📝 *علامات و تفصیل:* ${symptoms}\n` +
      `🖼️ *نسخہ تصویر:* ${prescriptionImage ? 'تصویر فارم میں منسلک کر دی گئی ہے' : 'کوئی تصویر منسلک نہیں'}\n` +
      `-----------------------------------------\n` +
      `محترم ${isUrdu ? hakeemSettings.nameUr : hakeemSettings.nameEn}! برائے مہربانی میرے کیس کا معائنہ فرما کر مناسب دیسی علاج اور پرہیز تجویز فرمائیں۔ شکریہ!`
    );

    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      window.open(`https://wa.me/${hakeemSettings.whatsapp}?text=${msg}`, '_blank');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-600/40 max-h-[92vh] flex flex-col relative">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-black text-base sm:text-lg">
                {t('آن لائن حکیم کنسلٹیشن و نسخہ اپلوڈ', 'Online Consultation & Prescription')}
              </h2>
              <p className="text-[11px] text-emerald-200">
                {t(`زیرِ سرپرستی: ${isUrdu ? hakeemSettings.nameUr : hakeemSettings.nameEn}`, `Under supervision of ${hakeemSettings.nameEn}`)}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Patient Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                {t('مریض کا نام *', 'Patient Name *')}
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder={t('پورا نام درج کریں', 'Enter full name')}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50 font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                {t('موبائل / واٹس ایپ نمبر *', 'Mobile / WhatsApp *')}
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0300-1234567"
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50 font-bold"
              />
            </div>
          </div>

          {/* Age, Gender & City */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                {t('عمر *', 'Age *')}
              </label>
              <input
                type="number"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="35"
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50 font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                {t('جنس *', 'Gender *')}
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50 font-bold"
              >
                <option value="male">{t('مرد', 'Male')}</option>
                <option value="female">{t('خاتون', 'Female')}</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                {t('شہر *', 'City *')}
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={t('شہر', 'City')}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50 font-bold"
              />
            </div>
          </div>

          {/* Duration of illness */}
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              {t('مرض کا دورانیہ (کتنے عرصے سے تکلیف ہے؟) *', 'Duration of Illness *')}
            </label>
            <input
              type="text"
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder={t('مثلاً 2 ماہ سے، 1 سال سے...', 'e.g. 2 months, 1 year...')}
              className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50"
            />
          </div>

          {/* Symptoms Description */}
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              {t('مرض، علامات اور کیفیت کی تفصیل *', 'Symptoms & Medical Condition Details *')}
            </label>
            <textarea
              rows={3}
              required
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder={t('اپنی علامات، سابقہ ادویات یا تکلیف کی تفصیل واضح لکھیں...', 'Describe your symptoms, previous treatments...')}
              className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50"
            ></textarea>
          </div>

          {/* Prescription Photo Upload */}
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              {t('ڈاکٹر کا نسخہ یا ٹیسٹ رپورٹ اپلوڈ کریں (اختیاری)', 'Upload Doctor Prescription or Lab Report (Optional)')}
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:border-emerald-500 transition-colors bg-slate-50">
              {prescriptionImage ? (
                <div className="relative inline-block">
                  <img
                    src={prescriptionImage}
                    alt="Prescription Preview"
                    className="w-24 h-24 object-cover rounded-xl border border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setPrescriptionImage(null)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center gap-1.5">
                  <Upload className="w-6 h-6 text-emerald-700" />
                  <span className="text-xs font-bold text-slate-700">
                    {t('تصویر منتخب کریں (JPG, PNG)', 'Choose photo (JPG, PNG)')}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-800 hover:from-emerald-800 hover:to-teal-700 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 border border-amber-400"
          >
            <Send className="w-4 h-4 text-amber-400" />
            <span>
              {isSubmitting
                ? t('کیس ارسال ہو رہا ہے...', 'Submitting...')
                : t('حکیم صاحب کو کیس ارسال کریں اور واٹس ایپ پر رابطہ کریں', 'Send Case to Hakim & Connect on WhatsApp')}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};
