import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle2,
  MapPin,
  Sparkles,
  MessageSquare,
  Droplet,
  Stethoscope
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { useNotifications } from '../context/NotificationContext';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: 'hakeem_checkup' | 'hijama' | 'live_call';
}

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'hakeem_checkup',
}) => {
  const { isUrdu, t } = useLanguage();
  const { hakeemSettings } = useAdmin();
  const { showToast } = useNotifications();

  const [service, setService] = useState<'hakeem_checkup' | 'hijama' | 'live_call'>(defaultService);
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [preferredDate, setPreferredDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<'morning' | 'evening'>('evening');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [tokenNumber, setTokenNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = 'SHZ-' + Math.floor(1000 + Math.random() * 9000);
    setTokenNumber(token);
    setIsBooked(true);
    showToast(t(`ٹوکن نمبر ${token} کے ساتھ اپوائنٹمنٹ بک ہو گئی ہے!`, `Appointment booked with Token #${token}!`));

    const serviceName =
      service === 'hakeem_checkup'
        ? `محترم ${isUrdu ? (hakeemSettings?.nameUr || 'حکیم نواز احمد') : (hakeemSettings?.nameEn || 'Hakim Nawaz Ahmad')} سے بالمشافہ معائنہ (In-Person Clinic Visit)`
        : service === 'hijama'
        ? 'حجامہ و کپنگ تھراپی سیشن (Hijama Therapy)'
        : 'لائیو فون / واٹس ایپ کال مشورہ (Live Call Consultation)';

    const slotName = timeSlot === 'morning' ? 'صبح شفٹ (10:00 AM تا 02:00 PM)' : 'شام شفٹ (04:00 PM تا 08:00 PM)';

    const msg = encodeURIComponent(
      `📅 *الشہزاد دواخانہ — معائنہ و اپوائنٹمنٹ بکنگ کنفرمیشن* 📅\n` +
      `-----------------------------------------\n` +
      `🎫 *ٹوکن نمبر:* ${token}\n` +
      `👤 *مریض کا نام:* ${patientName}\n` +
      `📞 *فون نمبر:* ${phone}\n` +
      `🏙️ *شہر:* ${city || 'پاکستان'}\n` +
      `🩺 *مطلوبہ سروس:* ${serviceName}\n` +
      `📆 *تاریخ:* ${preferredDate}\n` +
      `⏰ *ٹائم سلاٹ:* ${slotName}\n` +
      `📝 *نوٹ / بیماری کی نوعیت:* ${notes || 'معمول کا طبی معائنہ'}\n` +
      `-----------------------------------------\n` +
      `محترم ${isUrdu ? (hakeemSettings?.nameUr || 'حکیم نواز احمد') : (hakeemSettings?.nameEn || 'Hakim Nawaz Ahmad')}! برائے مہربانی اپوائنٹمنٹ ٹائم کنفرم فرما دیں۔ شکریہ!`
    );

    setTimeout(() => {
      window.open(`https://wa.me/${hakeemSettings?.whatsapp || '923006458169'}?text=${msg}`, '_blank');
    }, 900);
  };

  const handleClose = () => {
    setIsBooked(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400 max-h-[92vh] flex flex-col relative">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-black text-base sm:text-lg">
                {t('معائنہ کا وقت و اپوائنٹمنٹ لیں', 'Book Hakeem / Hijama Appointment')}
              </h2>
              <p className="text-[11px] text-emerald-200">
                {t(`زیرِ نگرانی: ${isUrdu ? (hakeemSettings?.nameUr || 'حکیم محمد نواز احمد') : (hakeemSettings?.nameEn || 'Hakim Muhammad Nawaz Ahmad')}`, `Under supervision of ${hakeemSettings?.nameEn || 'Hakim Muhammad Nawaz Ahmad'}`)}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1">
          {isBooked ? (
            <div className="text-center py-8 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                {t('آپ کا ٹوکن جاری ہو گیا ہے', 'Your Appointment Token')}
              </span>
              <div className="text-3xl font-black text-emerald-900 font-mono bg-emerald-50 py-3 px-6 rounded-2xl border-2 border-emerald-300 inline-block">
                {tokenNumber}
              </div>
              <h3 className="text-lg font-black text-slate-900">
                {t('اپوائنٹمنٹ کی تفصیلات واٹس ایپ پر ارسال کر دی گئی ہیں', 'Details Forwarded to Clinic WhatsApp')}
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto font-medium">
                {t(
                  'کلینک آمد پر یہ ٹوکن نمبر دکھائیں۔ شکریہ!',
                  'Please show this token upon arrival at the clinic.'
                )}
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md"
              >
                {t('مکمل کریں', 'Close')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Select Service Type */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1.5">
                  {t('1. مطلوبہ سروس منتخب کریں:', '1. Select Service Type:')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer font-bold transition-all ${service === 'hakeem_checkup' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs' : 'border-slate-200 text-slate-700'}`}>
                    <input
                      type="radio"
                      name="service"
                      checked={service === 'hakeem_checkup'}
                      onChange={() => setService('hakeem_checkup')}
                      className="hidden"
                    />
                    <Stethoscope className="w-4 h-4 text-emerald-700" />
                    <span>{t('حکیم معائنہ', 'Clinic Visit')}</span>
                  </label>

                  <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer font-bold transition-all ${service === 'hijama' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs' : 'border-slate-200 text-slate-700'}`}>
                    <input
                      type="radio"
                      name="service"
                      checked={service === 'hijama'}
                      onChange={() => setService('hijama')}
                      className="hidden"
                    />
                    <Droplet className="w-4 h-4 text-amber-600" />
                    <span>{t('حجامہ تھراپی', 'Hijama Therapy')}</span>
                  </label>

                  <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer font-bold transition-all ${service === 'live_call' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs' : 'border-slate-200 text-slate-700'}`}>
                    <input
                      type="radio"
                      name="service"
                      checked={service === 'live_call'}
                      onChange={() => setService('live_call')}
                      className="hidden"
                    />
                    <Phone className="w-4 h-4 text-teal-600" />
                    <span>{t('لائیو کال', 'Live Call')}</span>
                  </label>
                </div>
              </div>

              {/* Date and Slot Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    {t('2. معائنہ کی تاریخ *', '2. Appointment Date *')}
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50 font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    {t('3. ٹائم شفٹ *', '3. Time Shift *')}
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value as any)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50 font-bold text-slate-900"
                  >
                    <option value="morning">{t('صبح: 10:00 AM تا 02:00 PM', 'Morning: 10:00 AM - 02:00 PM')}</option>
                    <option value="evening">{t('شام: 04:00 PM تا 08:00 PM', 'Evening: 04:00 PM - 08:00 PM')}</option>
                  </select>
                </div>
              </div>

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
                    placeholder={t('نام درج کریں', 'Full Name')}
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    {t('موبائل نمبر *', 'Phone Number *')}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50"
                  />
                </div>
              </div>

              {/* City & Notes */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  {t('شہر و بیماری کا مختصر خلاصہ:', 'City & Brief Reason for Visit:')}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t('مثلاً گوجرانوالہ، گھٹنوں کے درد کا معائنہ...', 'e.g. Gujranwala, Knee pain checkup...')}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-emerald-900 to-teal-800 hover:from-emerald-800 hover:to-teal-700 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 border border-amber-400"
              >
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>{t('اپوائنٹمنٹ بک کریں اور ٹوکن حاصل کریں', 'Book Appointment & Get Token')}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
