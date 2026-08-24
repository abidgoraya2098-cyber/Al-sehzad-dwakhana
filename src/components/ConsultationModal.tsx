import React, { useState } from 'react';
import {
  X,
  Stethoscope,
  UploadCloud,
  CheckCircle,
  Phone,
  MessageSquare,
  ShieldCheck,
  Calendar,
  User,
  Clock,
  MapPin,
  Image as ImageIcon
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
  const { addConsultation } = useAdmin();
  const { showToast } = useNotifications();

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [city, setCity] = useState('');
  const [consultationType, setConsultationType] = useState<'whatsapp_call' | 'clinic_visit' | 'home_delivery'>('whatsapp_call');
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('');
  const [prescriptionImage, setPrescriptionImage] = useState<string | undefined>(undefined);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    addConsultation({
      patientName,
      phone,
      age,
      gender,
      city,
      consultationType,
      symptoms,
      duration,
      prescriptionImage,
    });

    showToast(t('آپ کی درخواست موصول ہو گئی ہے!', 'Your consultation inquiry has been recorded!'));
    setIsSubmitted(true);

    const typeLabel =
      consultationType === 'whatsapp_call'
        ? 'واٹس ایپ آڈیو/ویڈیو مشورہ'
        : consultationType === 'clinic_visit'
        ? 'کلینک پر بالمشافہ معائنہ'
        : 'گھر پر دوا ڈلیوری';

    const msg = encodeURIComponent(
      `🩺 *الشہزاد دواخانہ — آن لائن طبی معائنہ و مشورہ* 🩺\n` +
      `-----------------------------------------\n` +
      `👤 *مریض کا نام:* ${patientName}\n` +
      `📞 *موبائل نمبر:* ${phone}\n` +
      `🎂 *عمر / جنس:* ${age} سال (${gender === 'male' ? 'مرد' : 'خاتون'})\n` +
      `🏙️ *شہر:* ${city}\n` +
      `🎯 *مشورے کی نوعیت:* ${typeLabel}\n` +
      `⏱️ *مرض کا دورانیہ:* ${duration}\n` +
      `📝 *مرض و علامات کی تفصیل:*\n${symptoms}\n` +
      `-----------------------------------------\n` +
      `حکیم صاحب سے التماس ہے کہ جلد از جلد رہنمائی اور مستند نسخہ تجویز فرمائیں۔ شکریہ!`
    );

    setTimeout(() => {
      window.open(`https://wa.me/923000000000?text=${msg}`, '_blank');
    }, 800);
  };

  const resetForm = () => {
    setPatientName('');
    setPhone('');
    setAge('');
    setCity('');
    setSymptoms('');
    setDuration('');
    setPrescriptionImage(undefined);
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-600/30 max-h-[92vh] flex flex-col relative">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg">
                {t('آن لائن حکیم صاحب سے مفت طبی مشورہ', 'Free Online Hakeem Consultation')}
              </h2>
              <p className="text-[11px] text-emerald-200">
                {t('سینئر حکماء کے زیرِ نگرانی 100% مستند تشخیص', 'Expert diagnosis & customized herbal treatment')}
              </p>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-8 flex-1">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-emerald-950">
                {t('آپ کا فارم کامیابی سے جمع ہو چکا ہے!', 'Inquiry Submitted Successfully!')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                {t(
                  'آپ کا کیس ہمارے سینئر حکیم صاحب کو واٹس ایپ پر ارسال کر دیا گیا ہے۔ وہ جلد آپ سے رابطہ فرمائیں گے۔',
                  'Your case has been forwarded to our Chief Hakim via WhatsApp. We will connect with you shortly.'
                )}
              </p>
              <button
                onClick={resetForm}
                className="px-6 py-2.5 bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md"
              >
                {t('مکمل کریں', 'Done')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Patient Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t('مریض کا نام *', 'Patient Name *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder={t('نام درج کریں', 'Enter full name')}
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t('موبائل / واٹس ایپ نمبر *', 'WhatsApp / Mobile No *')}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('0300-1234567', '0300-1234567')}
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Age, Gender & City */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t('عمر (سال)', 'Age (Years)')}
                  </label>
                  <input
                    type="number"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="30"
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t('جنس', 'Gender')}
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50/50 font-semibold"
                  >
                    <option value="male">{t('مرد (Male)', 'Male')}</option>
                    <option value="female">{t('خاتون (Female)', 'Female')}</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t('شہر', 'City')}
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={t('لاہور، کراچی وغیرہ', 'Lahore, etc.')}
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Consultation Type Radio */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  {t('مشورے کی قسم منتخب کریں:', 'Select Consultation Preference:')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer font-semibold transition-all ${consultationType === 'whatsapp_call' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs' : 'border-slate-200 text-slate-700'}`}>
                    <input
                      type="radio"
                      name="consultationType"
                      checked={consultationType === 'whatsapp_call'}
                      onChange={() => setConsultationType('whatsapp_call')}
                      className="hidden"
                    />
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>{t('واٹس ایپ مشورہ', 'WhatsApp Call')}</span>
                  </label>

                  <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer font-semibold transition-all ${consultationType === 'clinic_visit' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs' : 'border-slate-200 text-slate-700'}`}>
                    <input
                      type="radio"
                      name="consultationType"
                      checked={consultationType === 'clinic_visit'}
                      onChange={() => setConsultationType('clinic_visit')}
                      className="hidden"
                    />
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>{t('کلینک پر معائنہ', 'Clinic Visit')}</span>
                  </label>

                  <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer font-semibold transition-all ${consultationType === 'home_delivery' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs' : 'border-slate-200 text-slate-700'}`}>
                    <input
                      type="radio"
                      name="consultationType"
                      checked={consultationType === 'home_delivery'}
                      onChange={() => setConsultationType('home_delivery')}
                      className="hidden"
                    />
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>{t('گھر پر دوا ڈلیوری', 'Home Delivery')}</span>
                  </label>
                </div>
              </div>

              {/* Disease Duration */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t('مرض کا دورانیہ (کب سے یہ تکلیف ہے؟)', 'Duration of Ailment')}
                </label>
                <input
                  type="text"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder={t('مثلاً 2 ہفتے، 6 ماہ، 1 سال...', 'e.g. 2 weeks, 6 months, 1 year...')}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50/50"
                />
              </div>

              {/* Symptoms Details */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t('مرض، علامات اور موجودہ کیفیت کی تفصیل *', 'Detailed Symptoms & Medical Concerns *')}
                </label>
                <textarea
                  required
                  rows={3}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder={t('اپنی تمام تکالیف اور علامات کھل کر بیان فرمائیں...', 'Describe your symptoms, previous treatments, and current condition...')}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50/50 leading-relaxed"
                ></textarea>
              </div>

              {/* Prescription / Lab Report Upload */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t('سابقہ نسخہ، ٹیسٹ رپورٹ یا تصویر اپلوڈ کریں (اختیاری):', 'Upload Prescription / Medical Report (Optional):')}
                </label>
                <label className="border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/60">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {prescriptionImage ? (
                    <div className="flex items-center gap-3">
                      <img
                        src={prescriptionImage}
                        alt="Prescription Preview"
                        className="w-16 h-16 rounded-xl object-cover border border-emerald-300"
                      />
                      <span className="text-xs font-bold text-emerald-800">
                        {t('تصویر منسلک ہو گئی ہے ✔️ (تبدیل کرنے کے لیے کلک کریں)', 'Image attached ✔️ (Click to change)')}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-slate-500">
                      <UploadCloud className="w-6 h-6 mb-1 text-emerald-700" />
                      <span className="text-xs font-bold">
                        {t('تصویر منتخب کرنے کے لیے یہاں کلک کریں', 'Click here to upload report photo')}
                      </span>
                    </div>
                  )}
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-emerald-800 to-teal-700 hover:from-emerald-700 hover:to-teal-600 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>{t('حکیم صاحب کو کیس جمع کروائیں (WhatsApp)', 'Submit Case to Hakeem (WhatsApp)')}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
