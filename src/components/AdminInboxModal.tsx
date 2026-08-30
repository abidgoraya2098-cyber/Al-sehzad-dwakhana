import React, { useState, useEffect } from 'react';
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
  AlertCircle,
  Package,
  Plus,
  Edit,
  Search,
  Check,
  RotateCcw,
  Sparkles,
  Cloud,
  RefreshCw
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import { useNotifications } from '../context/NotificationContext';
import { Product } from '../types';

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
    setClinicStatusMode,
    updateAdminPassword,
    products,
    addProduct,
    updateProduct,
    updateProductPrice,
    updateProductStock,
    deleteProduct,
    resetProductsToDefault,
    isCloudSyncing,
    refreshFromCloud,
  } = useAdmin();

  const { showToast } = useNotifications();

  const [activeTab, setActiveTab] = useState<'inbox' | 'medicines' | 'profile' | 'password'>('inbox');
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
  const [clinicStatusModeState, setClinicStatusModeState] = useState<'auto' | 'open' | 'closed'>(hakeemSettings?.clinicStatusMode || 'auto');

  // Medicine Management State
  const [medicineSearch, setMedicineSearch] = useState('');
  const [medicineCategory, setMedicineCategory] = useState('all');
  const [isAddMedicineOpen, setIsAddMedicineOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New/Edit Medicine Form State
  const [medNameUr, setMedNameUr] = useState('');
  const [medNameEn, setMedNameEn] = useState('');
  const [medCategory, setMedCategory] = useState('majoon');
  const [medCategoryUr, setMedCategoryUr] = useState('معجون و خمیرہ جات');
  const [medPrice, setMedPrice] = useState(1500);
  const [medWeightUr, setMedWeightUr] = useState('200 گرام');
  const [medWeightEn, setMedWeightEn] = useState('200g');
  const [medDescUr, setMedDescUr] = useState('');
  const [medDescEn, setMedDescEn] = useState('');
  const [medDosageUr, setMedDosageUr] = useState('');
  const [medDosageEn, setMedDosageEn] = useState('');
  const [medInStock, setMedInStock] = useState(true);
  const [medFeatured, setMedFeatured] = useState(false);
  const [medImage, setMedImage] = useState('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80');

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
      setClinicStatusModeState(hakeemSettings.clinicStatusMode || 'auto');
    }
  }, [isOpen, hakeemSettings]);

  // Password Reset State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passError, setPassError] = useState('');

  if (!isOpen) return null;

  const filteredConsultations = consultations.filter((c) =>
    selectedStatus === 'all' ? true : c.status === selectedStatus
  );

  const filteredMedicines = products.filter((p) => {
    const matchesCategory = medicineCategory === 'all' || p.category === medicineCategory;
    const q = (medicineSearch || '').toLowerCase();
    const matchesSearch =
      !q ||
      (p?.nameUr || '').toLowerCase().includes(q) ||
      (p?.nameEn || '').toLowerCase().includes(q) ||
      (p?.categoryUr || '').toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

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
      clinicStatusMode: clinicStatusModeState,
    });
    showToast(t('پروفائل محفوظ اور تمام صارفین کے پاس لائیو کلاؤڈ سنک ہو گئی!', 'Profile Saved & Live Synced to Cloud!'));
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

  const handleOpenAddMedicine = () => {
    setEditingProduct(null);
    setMedNameUr('');
    setMedNameEn('');
    setMedCategory('majoon');
    setMedCategoryUr('معجون و خمیرہ جات');
    setMedPrice(1500);
    setMedWeightUr('200 گرام');
    setMedWeightEn('200g');
    setMedDescUr('');
    setMedDescEn('');
    setMedDosageUr('صبح و شام بعد از غذا ہمراہ نیم گرم دودھ۔');
    setMedDosageEn('Morning and evening after meals with warm milk.');
    setMedInStock(true);
    setMedFeatured(false);
    setMedImage('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80');
    setIsAddMedicineOpen(true);
  };

  const handleOpenEditMedicine = (p: Product) => {
    setEditingProduct(p);
    setMedNameUr(p.nameUr || '');
    setMedNameEn(p.nameEn || '');
    setMedCategory(p.category || 'majoon');
    setMedCategoryUr(p.categoryUr || 'معجون و خمیرہ جات');
    setMedPrice(p.price || 1000);
    setMedWeightUr(p.weightUr || p.weight || '200 گرام');
    setMedWeightEn(p.weight || '200g');
    setMedDescUr(p.descriptionUr || '');
    setMedDescEn(p.descriptionEn || '');
    setMedDosageUr(p.dosageUr || '');
    setMedDosageEn(p.dosageEn || '');
    setMedInStock(p.inStock !== false);
    setMedFeatured(!!p.featured);
    setMedImage(p.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80');
    setIsAddMedicineOpen(true);
  };

  const handleSaveMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medNameUr.trim()) {
      alert(t('دوا کا نام درج کریں', 'Please enter medicine name'));
      return;
    }

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        nameUr: medNameUr,
        nameEn: medNameEn || medNameUr,
        category: medCategory as any,
        categoryUr: medCategoryUr,
        categoryEn: medCategory,
        price: Number(medPrice) || 0,
        weight: medWeightEn,
        weightUr: medWeightUr,
        descriptionUr: medDescUr,
        descriptionEn: medDescEn || medDescUr,
        dosageUr: medDosageUr,
        dosageEn: medDosageEn || medDosageUr,
        inStock: medInStock,
        featured: medFeatured,
        image: medImage,
      };
      updateProduct(updated);
      showToast(t('دوا اپ ڈیٹ ہو کر تمام صارفین کے پاس لائیو ہو گئی!', 'Medicine Live Synced to Cloud!'));
    } else {
      const newId = 'med_' + Date.now();
      const created: Product = {
        id: newId,
        nameUr: medNameUr,
        nameEn: medNameEn || medNameUr,
        category: medCategory as any,
        categoryUr: medCategoryUr,
        categoryEn: medCategory,
        price: Number(medPrice) || 0,
        weight: medWeightEn,
        weightUr: medWeightUr,
        descriptionUr: medDescUr,
        descriptionEn: medDescEn || medDescUr,
        benefitsUr: ['قدرتی جڑی بوٹیوں سے تیار کردہ', 'خالص دیسی اجزاء بغیر سائیڈ ایفیکٹ'],
        benefitsEn: ['Formulated with 100% natural herbs', 'Pure traditional formula with zero side-effects'],
        ingredientsUr: ['خالص جڑی بوٹیاں'],
        ingredientsEn: ['Natural Herbs'],
        dosageUr: medDosageUr || 'صبح و شام بعد از غذا۔',
        dosageEn: medDosageEn || 'Morning and evening after meals.',
        image: medImage,
        inStock: medInStock,
        featured: medFeatured,
        rating: 5.0,
        reviewsCount: 1,
      };
      addProduct(created);
      showToast(t('نئی دوا شامل ہو کر تمام صارفین کے پاس لائیو ہو گئی!', 'New Medicine Live Synced to Cloud!'));
    }
    setIsAddMedicineOpen(false);
  };

  const handleAdjustPrice = (id: string, currentPrice: number, delta: number) => {
    const newPrice = Math.max(0, currentPrice + delta);
    updateProductPrice(id, newPrice);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400 max-h-[94vh] flex flex-col relative">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-black text-base sm:text-lg">
                {t('ایڈمن پورٹل و کلینک کنٹرول پینل', 'Admin & Clinic Management Portal')}
              </h2>
              <span className="text-[11px] text-amber-300 font-mono">
                {t('مستند ایڈمن ایکسس', 'Authorized Access')} • {consultations.length} {t('کیسز', 'cases')} • {products.length} {t('ادویات', 'medicines')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Cloud Sync Status Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs bg-emerald-900/90 border border-emerald-700 px-3 py-1.5 rounded-xl text-emerald-200">
              <Cloud className={`w-3.5 h-3.5 ${isCloudSyncing ? 'text-amber-400 animate-spin' : 'text-emerald-400'}`} />
              <span className="font-bold">
                {isCloudSyncing ? t('کلاؤڈ سنک ہو رہا ہے...', 'Syncing...') : t('کلاؤڈ لائیو سنک فعال ہے ☁️', 'Cloud Sync Active ☁️')}
              </span>
              <button
                onClick={() => {
                  refreshFromCloud().then(() => {
                    showToast(t('کلاؤڈ سے تمام ڈیٹا ریفریش ہو گیا!', 'Cloud Data Refreshed!'));
                  });
                }}
                className="p-1 hover:bg-emerald-800 rounded-lg text-amber-300 ml-1 cursor-pointer transition-colors"
                title="Refresh Cloud Data"
              >
                <RefreshCw className={`w-3 h-3 ${isCloudSyncing ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => {
                logoutAdmin();
                onClose();
              }}
              className="px-3 py-1.5 rounded-xl bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t('لاگ آؤٹ', 'Logout')}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Clinic Open / Closed Status Bar */}
        <div className="bg-emerald-950 px-4 py-2.5 text-white flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800 text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-300">
              {t('حکیم صاحب کلینک اسٹیٹس کنٹرول:', 'Clinic Status Control:')}
            </span>
            <span className="text-[11px] text-emerald-200">
              {hakeemSettings?.clinicStatusMode === 'open' && t('🟢 اس وقت کھلا ہے (Open)', '🟢 Open')}
              {hakeemSettings?.clinicStatusMode === 'closed' && t('🔴 اس وقت بند ہے / آف لائن دستیاب (Closed / Offline)', '🔴 Closed (Offline Available)')}
              {(hakeemSettings?.clinicStatusMode === 'auto' || !hakeemSettings?.clinicStatusMode) && t('⏰ خودکار ٹائمنگ شیڈول (Auto Schedule)', '⏰ Auto Timing')}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                setClinicStatusMode('open');
                setClinicStatusModeState('open');
                showToast(t('کلینک کا اسٹیٹس "کھلا ہے (Open)" سیٹ کر دیا گیا ہے!', 'Clinic status set to OPEN!'));
              }}
              className={`px-3 py-1 rounded-lg font-black text-xs transition-all flex items-center gap-1 cursor-pointer ${
                hakeemSettings?.clinicStatusMode === 'open'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700'
              }`}
            >
              <span>🟢 {t('کلینک کھلا ہے (Open)', 'Open')}</span>
            </button>

            <button
              onClick={() => {
                setClinicStatusMode('closed');
                setClinicStatusModeState('closed');
                showToast(t('کلینک کا اسٹیٹس "بند ہے / آف لائن دستیاب" سیٹ کر دیا گیا ہے!', 'Clinic status set to CLOSED / Offline!'));
              }}
              className={`px-3 py-1 rounded-lg font-black text-xs transition-all flex items-center gap-1 cursor-pointer ${
                hakeemSettings?.clinicStatusMode === 'closed'
                  ? 'bg-red-500 text-white shadow-xs'
                  : 'bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700'
              }`}
            >
              <span>🔴 {t('کلینک بند ہے (Offline)', 'Closed')}</span>
            </button>

            <button
              onClick={() => {
                setClinicStatusMode('auto');
                setClinicStatusModeState('auto');
                showToast(t('کلینک اسٹیٹس خودکار ٹائمنگ شیڈول پر سیٹ کر دیا گیا ہے!', 'Clinic status set to Auto Schedule!'));
              }}
              className={`px-3 py-1 rounded-lg font-black text-xs transition-all flex items-center gap-1 cursor-pointer ${
                hakeemSettings?.clinicStatusMode === 'auto' || !hakeemSettings?.clinicStatusMode
                  ? 'bg-amber-400 text-emerald-950 shadow-xs'
                  : 'bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700'
              }`}
            >
              <span>⏰ {t('خودکار شیڈول (Auto)', 'Auto')}</span>
            </button>
          </div>
        </div>

        {/* 4 Main Management Tabs */}
        <div className="bg-slate-100 p-2 sm:p-3 px-4 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'inbox'
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('مریضوں کے کیسز', 'Patient Inquiries')}</span>
            <span className="bg-amber-400 text-emerald-950 px-1.5 py-0.2 rounded-full text-[10px]">
              {consultations.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('medicines')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'medicines'
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <Package className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('ادویات، ریٹ و سٹاک کنٹرول', 'Medicines & Inventory')}</span>
            <span className="bg-amber-400 text-emerald-950 px-1.5 py-0.2 rounded-full text-[10px]">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <Settings className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('حکیم صاحب سیٹنگز', 'Hakeem Settings')}</span>
          </button>

          <button
            onClick={() => setActiveTab('password')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'password'
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('پاس ورڈ ری سیٹ', 'Reset Password')}</span>
          </button>
        </div>

        {/* Tab 1: Inbox */}
        {activeTab === 'inbox' && (
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Filter Bar */}
            <div className="bg-slate-50 p-2.5 px-4 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-bold shrink-0">
              <span className="text-slate-500">{t('فلٹر:', 'Filter:')}</span>
              {(['all', 'new', 'in_progress', 'completed'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    selectedStatus === st
                      ? 'bg-emerald-800 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {st === 'all' && t('تمام کیسز', 'All')}
                  {st === 'new' && t('نئے (New)', 'New')}
                  {st === 'in_progress' && t('زیرِ غور', 'In Progress')}
                  {st === 'completed' && t('مکمل شدہ', 'Completed')}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="p-4 space-y-3 flex-1 overflow-y-auto">
              {filteredConsultations.length === 0 ? (
                <div className="text-center py-16 text-slate-400 space-y-2">
                  <MessageSquare className="w-12 h-12 mx-auto text-slate-300" />
                  <p className="text-sm font-bold">{t('کوئی نیا کیس موجود نہیں ہے', 'No patient inquiries found')}</p>
                </div>
              ) : (
                filteredConsultations.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border-2 border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3 shadow-xs hover:border-emerald-500 transition-all text-right rtl:text-right ltr:text-left"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-black text-sm text-slate-900">{item.patientName}</h4>
                          <span className="text-[11px] text-slate-500">
                            {item.age} {t('سال', 'yrs')} • {item.gender === 'male' ? t('مرد', 'Male') : t('خاتون', 'Female')} • {item.city}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <select
                          value={item.status}
                          onChange={(e) => updateConsultationStatus(item.id, e.target.value as any)}
                          className={`text-xs font-black px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                            item.status === 'new'
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : item.status === 'in_progress'
                              ? 'bg-blue-100 text-blue-900 border-blue-300'
                              : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          }`}
                        >
                          <option value="new">{t('نیا کیس', 'New')}</option>
                          <option value="in_progress">{t('زیرِ معائنہ', 'In Progress')}</option>
                          <option value="completed">{t('مکمل ہو گیا', 'Completed')}</option>
                        </select>

                        <button
                          onClick={() => deleteConsultation(item.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Case"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl">
                      <div>
                        <span className="font-bold text-slate-500">{t('رابطہ فون:', 'Phone:')} </span>
                        <span className="font-mono font-bold text-slate-900">{item.phone}</span>
                      </div>
                      <div>
                        <span className="font-bold text-slate-500">{t('بیماری کا دورانیہ:', 'Duration:')} </span>
                        <span className="font-bold text-slate-900">{item.diseaseDuration}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="font-bold text-slate-500">{t('اہم علامات:', 'Symptoms:')} </span>
                        <span className="font-bold text-slate-900">{item.mainComplaint}</span>
                      </div>
                      {item.previousTreatment && (
                        <div className="sm:col-span-2">
                          <span className="font-bold text-slate-500">{t('سابقہ علاج:', 'Previous Meds:')} </span>
                          <span className="text-slate-800">{item.previousTreatment}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      {item.prescriptionImage ? (
                        <button
                          onClick={() => setPreviewImage(item.prescriptionImage || null)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 text-xs font-bold transition-colors cursor-pointer"
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
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
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

        {/* Tab 2: Medicines & Stock Management */}
        {activeTab === 'medicines' && (
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Top Toolbar */}
            <div className="bg-slate-50 p-3 sm:p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[240px]">
                <div className="relative flex-1 min-w-[180px]">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto" />
                  <input
                    type="text"
                    value={medicineSearch}
                    onChange={(e) => setMedicineSearch(e.target.value)}
                    placeholder={t('دوا کا نام یا کیٹیگری تلاش کریں...', 'Search medicine by name...')}
                    className="w-full text-xs py-2 px-9 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 font-bold bg-white"
                  />
                </div>

                <select
                  value={medicineCategory}
                  onChange={(e) => setMedicineCategory(e.target.value)}
                  className="text-xs font-bold py-2 px-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-emerald-600 cursor-pointer"
                >
                  <option value="all">{t('تمام اقسام', 'All Categories')}</option>
                  <option value="vitality">{t('مقوی عام و شباب', 'Vitality')}</option>
                  <option value="majoon">{t('معجون و خمیرہ', 'Majoon')}</option>
                  <option value="honey_syrup">{t('شہد و شربت', 'Honey/Syrups')}</option>
                  <option value="safoof">{t('سفوف و ہاضمہ', 'Safoof')}</option>
                  <option value="arqiat">{t('عرقیات', 'Arqiat')}</option>
                  <option value="oils">{t('تیل و ہیئر آئل', 'Oils')}</option>
                </select>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleOpenAddMedicine}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer border border-emerald-600"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>{t('نئی دوا شامل کریں', 'Add New Medicine')}</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm(t('کیا آپ تمام ادویات کو ڈیفالٹ حالت پر ری سیٹ کرنا چاہتے ہیں؟', 'Reset all medicines to default?'))) {
                      resetProductsToDefault();
                      showToast(t('ادویات ڈیفالٹ پر ری سیٹ ہو گئیں!', 'Reset to defaults!'));
                    }
                  }}
                  className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl transition-colors cursor-pointer"
                  title={t('ڈیفالٹ پر ری سیٹ کریں', 'Reset to Default')}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Medicines List Grid */}
            <div className="p-4 space-y-3 flex-1 overflow-y-auto">
              {filteredMedicines.length === 0 ? (
                <div className="text-center py-16 text-slate-400 space-y-2">
                  <Package className="w-12 h-12 mx-auto text-slate-300" />
                  <p className="text-sm font-bold">{t('کوئی دوا تلاش کے مطابق نہیں ملی', 'No medicines matched')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {filteredMedicines.map((prod) => (
                    <div
                      key={prod.id}
                      className={`bg-white border-2 rounded-2xl p-3.5 sm:p-4 shadow-xs transition-all flex flex-col justify-between gap-3 text-right rtl:text-right ltr:text-left ${
                        prod.inStock !== false
                          ? 'border-emerald-100 hover:border-emerald-500'
                          : 'border-red-200 bg-red-50/20'
                      }`}
                    >
                      {/* Product Header */}
                      <div className="flex items-start gap-3">
                        <img
                          src={prod.image || '/logo.png'}
                          alt={prod.nameUr}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0 bg-emerald-950"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                              {prod.categoryUr || prod.category}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500 font-bold">
                              {prod.weightUr || prod.weight}
                            </span>
                          </div>
                          <h4 className="font-black text-sm text-slate-900 truncate mt-1">
                            {prod.nameUr}
                          </h4>
                          <span className="text-[11px] text-slate-500 truncate block">
                            {prod.nameEn}
                          </span>
                        </div>
                      </div>

                      {/* Controls Bar: Price Adjuster & Stock Toggle */}
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                        {/* Price Adjuster (+ / -) */}
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-600">{t('قیمت:', 'Rate:')}</span>
                          
                          <div className="flex items-center bg-white border border-slate-300 rounded-lg overflow-hidden shadow-2xs">
                            <button
                              onClick={() => handleAdjustPrice(prod.id, prod.price, -50)}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-black cursor-pointer transition-colors"
                              title="- Rs. 50"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={prod.price}
                              onChange={(e) => updateProductPrice(prod.id, Number(e.target.value) || 0)}
                              className="w-16 text-center text-xs font-black text-emerald-950 focus:outline-none py-1"
                            />
                            <button
                              onClick={() => handleAdjustPrice(prod.id, prod.price, 50)}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-black cursor-pointer transition-colors"
                              title="+ Rs. 50"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-black text-emerald-800 text-[11px]">Rs.</span>
                        </div>

                        {/* In Stock / Out of Stock Toggle */}
                        <button
                          onClick={() => updateProductStock(prod.id, !prod.inStock)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                            prod.inStock !== false
                              ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border border-emerald-300'
                              : 'bg-red-100 hover:bg-red-200 text-red-950 border border-red-300'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${prod.inStock !== false ? 'bg-emerald-600' : 'bg-red-600'}`}></span>
                          <span>{prod.inStock !== false ? t('دستیاب ہے (In Stock)', 'In Stock') : t('ختم ہے (Out of Stock)', 'Out of Stock')}</span>
                        </button>
                      </div>

                      {/* Action Buttons: Edit & Delete */}
                      <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
                        <button
                          onClick={() => handleOpenEditMedicine(prod)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 text-emerald-900 border border-slate-300 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>{t('ترمیم کریں', 'Edit')}</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(t(`کیا آپ "${prod.nameUr}" کو حذف کرنا چاہتے ہیں؟`, `Delete ${prod.nameUr}?`))) {
                              deleteProduct(prod.id);
                              showToast(t('دوا حذف کر دی گئی', 'Medicine deleted'));
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Medicine"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Hakeem Profile Edit */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="p-5 sm:p-6 space-y-4 flex-1 overflow-y-auto text-right rtl:text-right ltr:text-left">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="font-black text-base text-slate-900">
                {t('حکیم صاحب و کلینک پروفائل سیٹنگز (کلاؤڈ سنک)', 'Hakeem & Clinic Profile Information (Cloud Synced)')}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {t('یہاں سے آپ جو بھی تفصیلات، رجسٹریشن نمبر یا تصویر محفوظ کریں گے، وہ فورا تمام صارفین کے پاس لائیو اپ ڈیٹ ہو جائے گی۔', 'Any updates saved here sync instantly to the cloud and become live for all visitors worldwide.')}
              </p>
            </div>

            {/* Clinic Open / Closed Status Selector */}
            <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-300 space-y-2">
              <label className="text-xs font-black text-emerald-950 block">
                {t('کلینک دستیابی کنٹرول (جب آپ کلینک میں موجود نہ ہوں تو آف لائن سیٹ کریں):', 'Clinic Availability Control (Set to Closed when away):')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setClinicStatusModeState('open')}
                  className={`p-3 rounded-xl border-2 font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    clinicStatusModeState === 'open'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>🟢 {t('ہمیشہ کھلا رکھیں (Open)', 'Always Open')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setClinicStatusModeState('closed')}
                  className={`p-3 rounded-xl border-2 font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    clinicStatusModeState === 'closed'
                      ? 'bg-red-600 text-white border-red-700 shadow-sm'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>🔴 {t('کلینک بند رکھیں (Offline)', 'Closed / Offline')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setClinicStatusModeState('auto')}
                  className={`p-3 rounded-xl border-2 font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    clinicStatusModeState === 'auto'
                      ? 'bg-amber-400 text-emerald-950 border-amber-500 shadow-sm'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>⏰ {t('خودکار ٹائمنگ شیڈول (Auto)', 'Auto Timing')}</span>
                </button>
              </div>
            </div>

            {/* Avatar Upload Preview */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="w-20 h-20 rounded-full border-2 border-amber-400 overflow-hidden shadow-md shrink-0 bg-slate-800">
                <img
                  src={avatarUrl}
                  alt="Hakeem Nawaz"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 12%' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/hakeem-nawaz.jpg';
                  }}
                />
              </div>
              <div className="space-y-1.5 flex-1 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left">
                <span className="text-xs font-black text-slate-900 block">
                  {t('حکیم صاحب کی تصویر اپ ڈیٹ کریں:', 'Update Hakeem Portrait Photo:')}
                </span>
                <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs">
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('نئی تصویر منتخب کریں', 'Choose Image')}</span>
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
                  {t('رجسٹریشن نمبر *:', 'Registration No *:')}
                </label>
                <input
                  type="text"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-emerald-600 font-mono"
                  placeholder="e.g. NCT-89423"
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
                {t('کلینک کا پتہ:', 'Clinic Full Address:')}
              </label>
              <input
                type="text"
                value={addressUr}
                onChange={(e) => setAddressUr(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-800 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-400"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>{t('سیٹنگز محفوظ کریں اور لائیو سنک کریں (Save & Sync Live)', 'Save & Sync Live')}</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 4: Password Reset */}
        {activeTab === 'password' && (
          <form onSubmit={handlePasswordChange} className="p-6 sm:p-8 space-y-4 max-w-md mx-auto my-auto w-full text-right rtl:text-right ltr:text-left">
            <div className="text-center space-y-1 pb-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mx-auto mb-2 font-black border border-amber-300">
                <KeyRound className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-black text-base text-slate-900">
                {t('ایڈمن پاس ورڈ ری سیٹ کریں', 'Reset Admin Password')}
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
              className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>{t('پاس ورڈ تبدیل کریں', 'Update Password')}</span>
            </button>
          </form>
        )}

        {/* Add/Edit Medicine Modal */}
        {isAddMedicineOpen && (
          <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 space-y-4 border-2 border-emerald-600 text-right rtl:text-right ltr:text-left relative">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-800" />
                  <h3 className="font-black text-base text-slate-900">
                    {editingProduct ? t('دوا میں ترمیم کریں', 'Edit Medicine') : t('نئی دوا شامل کریں', 'Add New Medicine')}
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddMedicineOpen(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveMedicine} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    {t('دوا کا نام (اردو) *:', 'Medicine Name (Urdu) *:')}
                  </label>
                  <input
                    type="text"
                    required
                    value={medNameUr}
                    onChange={(e) => setMedNameUr(e.target.value)}
                    placeholder="مثلاً معجون شبابِ خاص"
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    {t('دوا کا نام (English):', 'Medicine Name (English):')}
                  </label>
                  <input
                    type="text"
                    value={medNameEn}
                    onChange={(e) => setMedNameEn(e.target.value)}
                    placeholder="e.g. Majoon Shabab-e-Khas"
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">
                      {t('قسم / کیٹیگری:', 'Category:')}
                    </label>
                    <select
                      value={medCategory}
                      onChange={(e) => {
                        setMedCategory(e.target.value);
                        const labelMap: Record<string, string> = {
                          vitality: 'مقوی عام و شباب',
                          majoon: 'معجون و خمیرہ جات',
                          honey_syrup: 'قدرتی شہد و شربت',
                          safoof: 'سفوف و معدہ',
                          arqiat: 'خالص عرقیات',
                          oils: 'ہربل ہیئر آئل و تیل',
                        };
                        setMedCategoryUr(labelMap[e.target.value] || 'دیسی ادویات');
                      }}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-emerald-600 bg-white"
                    >
                      <option value="vitality">مقوی عام و شباب (Vitality)</option>
                      <option value="majoon">معجون و خمیرہ جات (Majoon)</option>
                      <option value="honey_syrup">قدرتی شہد و شربت (Honey/Syrups)</option>
                      <option value="safoof">سفوف و معدہ (Safoof)</option>
                      <option value="arqiat">خالص عرقیات (Arqiat)</option>
                      <option value="oils">ہربل ہیئر آئل و تیل (Oils)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">
                      {t('قیمت / ریٹ (Rs.) *:', 'Price (Rs.) *:')}
                    </label>
                    <input
                      type="number"
                      required
                      value={medPrice}
                      onChange={(e) => setMedPrice(Number(e.target.value) || 0)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-emerald-600 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">
                      {t('وزن / پیکنگ (اردو):', 'Weight (Urdu):')}
                    </label>
                    <input
                      type="text"
                      value={medWeightUr}
                      onChange={(e) => setMedWeightUr(e.target.value)}
                      placeholder="مثلاً 250 گرام"
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">
                      {t('تصویر کا لنک (Image URL):', 'Image URL:')}
                    </label>
                    <input
                      type="text"
                      value={medImage}
                      onChange={(e) => setMedImage(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono focus:outline-none focus:border-emerald-600 text-[11px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    {t('مختصر تفصیل / فوائد (اردو):', 'Short Description (Urdu):')}
                  </label>
                  <textarea
                    rows={2}
                    value={medDescUr}
                    onChange={(e) => setMedDescUr(e.target.value)}
                    placeholder="دوا کے اہم فوائد اور خصوصیات..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-emerald-600"
                  ></textarea>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    {t('طریقہ استعمال / خوراک (اردو):', 'Dosage & Usage (Urdu):')}
                  </label>
                  <input
                    type="text"
                    value={medDosageUr}
                    onChange={(e) => setMedDosageUr(e.target.value)}
                    placeholder="مثلاً نصف چمچ صبح و شام نیم گرم دودھ کے ہمراہ..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={medInStock}
                      onChange={(e) => setMedInStock(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-800 focus:ring-emerald-500"
                    />
                    <span>{t('سٹاک میں دستیاب ہے (In Stock)', 'In Stock')}</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={medFeatured}
                      onChange={(e) => setMedFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-800 focus:ring-emerald-500"
                    />
                    <span>{t('نمایاں پراڈکٹ (Featured)', 'Featured')}</span>
                  </label>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>{editingProduct ? t('تبدیلیاں محفوظ کریں', 'Save Changes') : t('دوا شامل کریں', 'Add Medicine')}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Image Preview Overlay */}
        {previewImage && (
          <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
            <div className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden p-2">
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-full hover:bg-black cursor-pointer"
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
