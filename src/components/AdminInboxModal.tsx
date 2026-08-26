import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  LogOut,
  Trash2,
  CheckCircle,
  Clock,
  Phone,
  MessageSquare,
  Image as ImageIcon,
  User,
  Settings,
  KeyRound,
  Save,
  Upload,
  MapPin,
  Mail,
  AlertCircle
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import { useNotifications } from '../context/NotificationContext';

interface AdminInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminInboxModal: React.FC<AdminInboxModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isUrdu, t } = useLanguage();
  const {
    consultations,
    updateConsultationStatus,
    deleteConsultation,
    logoutAdmin,
    hakeemSettings,
    updateHakeemSettings,
    updateAdminPassword,
  } = useAdmin();

  const { showToast } = useNotifications();

  const [activeTab, setActiveTab] = useState<'inbox' | 'profile' | 'password'>('inbox');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'new' | 'in_progress' | 'completed'>('all');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Form State for Hakeem Profile Edit with safe defaults
  const [nameUr, setNameUr] = useState(hakeemSettings?.nameUr || 'حکیم محمد نواز احمد');
  const [nameEn, setNameEn] = useState(hakeemSettings?.nameEn || 'Hakim Muhammad Nawaz Ahmad');
  const [titleUr, setTitleUr] = useState(hakeemSettings?.titleUr || 'حکیم حاذق و سینئر نباض');
  const [degreeUr, setDegreeUr] = useState(hakeemSettings?.degreeUr || 'فاضل الطب والجراحت (F.T.J / B.U.M.S)');
  const [regNo, setRegNo] = useState(hakeemSettings?.regNo || 'NCT-89423');
  const [phone, setPhone] = useState(hakeemSettings?.phone || '0300-6458169');
  const [email, setEmail] = useState(hakeemSettings?.email || 'nawaznaji012@gmail.com');
  const [addressUr, setAddressUr] = useState(hakeemSettings?.addressUr || 'الشہزاد دواخانہ اینڈ ہربل کلینک، گوجرانوالہ');
  const [avatarUrl, setAvatarUrl] = useState(hakeemSettings?.avatarUrl || '/hakeem-nawaz.jpg');

  // Sync state whenever modal opens or settings change
  useEffect(() => {
    if (isOpen && hakeemSettings) {
      setNameUr(hakeemSettings.nameUr || 'حکیم محمد نواز احمد');
      setNameEn(hakeemSettings.nameEn || 'Hakim Muhammad Nawaz Ahmad');
      setTitleUr(hakeemSettings.titleUr || 'حکیم حاذق و سینئر نباض');
      setDegreeUr(hakeemSettings.degreeUr || 'فاضل الطب والجراحت (F.T.J / B.U.M.S)');
      setRegNo(hakeemSettings.regNo || 'NCT-89423');
      setPhone(hakeemSettings.phone || '0300-6458169');
      setEmail(hakeemSettings.email || 'nawaznaji012@gmail.com');
      setAddressUr(hakeemSettings.addressUr || 'الشہزاد دواخانہ اینڈ ہربل کلینک، گوجرانوالہ');
      setAvatarUrl(hakeemSettings.avatarUrl || '/hakeem-nawaz.jpg');
    }
  }, [isOpen, hakeemSettings]);

  // Password Reset State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passError, setPassError] = useState('');

  if (!isOpen) return null;

  const filtered = consultations.filter((c) =>
    selectedStatus === 'all' ? true : c.status === selectedStatus
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateHakeemSettings({
      nameUr,
      nameEn,
      titleUr,
      degreeUr,
      regNo,
      phone,
      email,
      addressUr,
      avatarUrl,
    });
    showToast(t('حکیم صاحب کی پروفائل و کلینک سیٹنگز کامیابی سے محفوظ ہو گئیں!', 'Hakeem Profile & Clinic Settings Updated Successfully!'));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      setPassError(t('پاس ورڈ کم از کم 4 ہندسوں پر مشتمل ہونا چاہیے', 'Password must be at least 4 characters'));
      return;
    }
    if (newPassword !== confirmPassword) {
      setPassError(t('پاس ورڈ کی تصدیق مماثل نہیں ہے', 'Passwords do not match'));
      return;
    }

    const ok = updateAdminPassword(newPassword);
    if (ok) {
      setPassError('');
      setNewPassword('');
      setConfirmPassword('');
      showToast(t('ایڈمن پاس ورڈ کامیابی سے تبدیل ہو گیا ہے!', 'Admin Password Reset Successfully!'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400 max-h-[92vh] flex flex-col relative">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-black text-base sm:text-lg">
                {t('ایڈمن پورٹل و کلینک کنٹرول پینل', 'Admin & Clinic Management Portal')}
              </h2>
              <span className="text-[11px] text-amber-300 font-mono">
                {t('مستند ایڈمن ایکسس', 'Authorized Access')} • {consultations.length} {t('کیسز', 'cases')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logoutAdmin();
                onClose();
              }}
              className="px-3 py-1.5 rounded-xl bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t('لاگ آؤٹ', 'Logout')}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3 Main Management Tabs */}
        <div className="bg-slate-100 p-2 sm:p-3 px-4 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'inbox'
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('مریضوں کے کیسز و ان باکس', 'Patient Inquiries')}</span>
            <span className="bg-amber-400 text-emerald-950 px-1.5 py-0.2 rounded-full text-[10px]">
              {consultations.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'profile'
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <Settings className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('حکیم صاحب و کلینک پروفائل سیٹنگز', 'Hakeem & Clinic Settings')}</span>
          </button>

          <button
            onClick={() => setActiveTab('password')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'password'
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('پاس ورڈ ری سیٹ کریں', 'Reset Password')}</span>
          </button>
        </div>

        {/* Tab 1: Inbox */}
        {activeTab === 'inbox' && (
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Filter Bar */}
            <div className="bg-slate-50 p-2.5 px-4 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-bold">
              <span className="text-slate-500">{t('فلٹر:', 'Filter:')}</span>
              {(['all', 'new', 'in_progress', 'completed'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    selectedStatus === st
                      ? 'bg-emerald-800 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {st === 'all' && t('تمام کیسز', 'All')}
                  {st === 'new' && t('نئے (New)', 'New')}
                  {st === 'in_progress' && t('زیرِ علاج', 'In Progress')}
                  {st === 'completed' && t('مکمل (Completed)', 'Completed')}
                </button>
              ))}
            </div>

            {/* Consultations List */}
            <div className="p-4 sm:p-6 space-y-4 flex-1">
              {filtered.length === 0 ? (
                <div className="text-center py-16">
                  <User className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-500">
                    {t('کوئی کیس موصول نہیں ہوا', 'No inquiries in this category')}
                  </p>
                </div>
              ) : (
                filtered.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50 shadow-xs space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                      <div>
                        <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                          <span>{item.patientName}</span>
                          <span className="text-xs font-semibold text-slate-500">
                            ({item.age} {t('سال', 'yrs')} • {item.gender === 'male' ? t('مرد', 'Male') : t('خاتون', 'Female')})
                          </span>
                        </h3>
                        <span className="text-xs text-emerald-800 font-bold block mt-0.5">
                          📍 {item.city} • ⏱️ {item.duration} • 📅 {item.timestamp}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={item.status}
                          onChange={(e) => updateConsultationStatus(item.id, e.target.value as any)}
                          className="text-xs font-bold p-1.5 rounded-lg border border-slate-300 bg-white"
                        >
                          <option value="new">🔴 {t('نیا (New)', 'New')}</option>
                          <option value="in_progress">🟡 {t('زیرِ علاج', 'In Progress')}</option>
                          <option value="completed">🟢 {t('مکمل (Completed)', 'Completed')}</option>
                        </select>

                        <button
                          onClick={() => deleteConsultation(item.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                          title={t('حذف کریں', 'Delete')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-700 block mb-1">
                        {t('مرض و علامات کی تفصیل:', 'Symptoms & Details:')}
                      </span>
                      <p className="text-xs text-slate-800 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed font-medium">
                        {item.symptoms}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      {item.prescriptionImage ? (
                        <button
                          onClick={() => setPreviewImage(item.prescriptionImage || null)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-bold hover:bg-emerald-200 transition-colors"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>{t('منسلک نسخہ / رپورٹ دیکھیں 🖼️', 'View Attached Report')}</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">
                          {t('کوئی تصویر منسلک نہیں', 'No report image attached')}
                        </span>
                      )}

                      <a
                        href={`https://wa.me/${(item?.phone || '').replace(/\D/g, '') || '923006458169'}?text=${encodeURIComponent(`السلام علیکم محترم ${item?.patientName || 'مریض'}! میں الشہزاد دواخانہ سے آپ کے آن لائن کیس کے سلسلے میں رابطہ کر رہا ہوں۔`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white text-xs font-bold shadow-xs transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{t('مریض کو واٹس ایپ پر جواب دیں', 'Reply on WhatsApp')}</span>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Hakeem & Clinic Profile Settings */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <span className="font-bold block">
                {t('💡 حکیم صاحب کی پروفائل و کلینک معلومات:', 'Live Editable Clinic & Hakeem Settings:')}
              </span>
              <p>
                {t(
                  'یہاں سے جو بھی نام، فون، ای میل، پتہ یا تصویر تبدیل کریں گے وہ فوراً پوری ویب سائٹ اور واٹس ایپ آرڈرز پر لاگو ہو جائے گی۔',
                  'Any change saved here will update across the entire website and WhatsApp messages instantly.'
                )}
              </p>
            </div>

            {/* Avatar Photo URL & Upload */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                {t('حکیم صاحب کی تصویر (Photo URL یا نئی تصویر اپلوڈ کریں):', 'Hakeem Photo URL or Upload:')}
              </label>
              <div className="flex items-center gap-3">
                <img
                  src={avatarUrl}
                  alt="Hakeem Profile"
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-600 shrink-0"
                />
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
                <label className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 cursor-pointer text-xs font-bold flex items-center gap-1 shrink-0">
                  <Upload className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t('اپلوڈ', 'Upload')}</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  {t('حکیم صاحب کا نام (اردو) *:', 'Hakeem Name (Urdu) *:')}
                </label>
                <input
                  type="text"
                  required
                  value={nameUr}
                  onChange={(e) => setNameUr(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  {t('حکیم صاحب کا نام (English) *:', 'Hakeem Name (English) *:')}
                </label>
                <input
                  type="text"
                  required
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Title & Degrees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  {t('طبی لقب / ٹائٹل:', 'Title:')}
                </label>
                <input
                  type="text"
                  value={titleUr}
                  onChange={(e) => setTitleUr(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  {t('ڈگری / اسناد:', 'Degrees / Qualifications:')}
                </label>
                <input
                  type="text"
                  value={degreeUr}
                  onChange={(e) => setDegreeUr(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  {t('رجسٹریشن نمبر:', 'Registration No:')}
                </label>
                <input
                  type="text"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-emerald-600 font-mono"
                />
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  {t('کلینک موبائل / واٹس ایپ نمبر *:', 'Clinic Mobile / WhatsApp *:')}
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  {t('کلینک ای میل ایڈریس:', 'Clinic Email Address:')}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-emerald-600 font-mono"
                />
              </div>
            </div>

            {/* Clinic Address */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                {t('کلینک کا مکمل پتہ (Address):', 'Clinic Full Address:')}
              </label>
              <textarea
                rows={2}
                value={addressUr}
                onChange={(e) => setAddressUr(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-emerald-600"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>{t('تمام ترامیم محفوظ کریں', 'Save All Changes')}</span>
            </button>
          </form>
        )}

        {/* Tab 3: Password Reset */}
        {activeTab === 'password' && (
          <form onSubmit={handlePasswordChange} className="p-4 sm:p-8 overflow-y-auto flex-1 max-w-lg mx-auto space-y-4 w-full">
            <div className="text-center space-y-1 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center font-black">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                {t('ایڈمن لاگ ان پاس ورڈ ری سیٹ کریں', 'Reset Admin Password')}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {t('اپنے ایڈمن پورٹل کا نیا خفیہ پاس ورڈ منتخب کریں', 'Enter your new secure password')}
              </p>
            </div>

            {passError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{passError}</span>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                {t('نیا پاس ورڈ *:', 'New Password *:')}
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                {t('نئے پاس ورڈ کی تصدیق کریں *:', 'Confirm New Password *:')}
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 font-bold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
            >
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>{t('پاس ورڈ تبدیل کریں', 'Update Password')}</span>
            </button>
          </form>
        )}

        {/* Image Preview Overlay */}
        {previewImage && (
          <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
            <div className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden p-2">
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-full hover:bg-black"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={previewImage}
                alt="Prescription Large Preview"
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
