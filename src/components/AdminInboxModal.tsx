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
  User
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';

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
    adminEmail,
  } = useAdmin();

  const [selectedStatus, setSelectedStatus] = useState<'all' | 'new' | 'in_progress' | 'completed'>('all');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = consultations.filter((c) =>
    selectedStatus === 'all' ? true : c.status === selectedStatus
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/60 max-h-[92vh] flex flex-col relative">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-black text-base sm:text-lg">
                {t('ایڈمن کنٹرول پینل و ان باکس', 'Admin Dashboard & Consultations Inbox')}
              </h2>
              <span className="text-[11px] text-amber-300 font-mono">
                {adminEmail} ({consultations.length} {t('کیسز موصول ہوئے', 'total records')})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logoutAdmin();
                onClose();
              }}
              className="px-3 py-1.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold flex items-center gap-1 transition-colors"
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

        {/* Filter Bar */}
        <div className="bg-slate-100 p-3 px-5 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-bold">
          <span className="text-slate-500">{t('فلٹر کریں:', 'Filter:')}</span>
          {(['all', 'new', 'in_progress', 'completed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedStatus === st
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {st === 'all' && t('تمام کیسز', 'All Cases')}
              {st === 'new' && t('نئے کیسز (New)', 'New')}
              {st === 'in_progress' && t('زیرِ علاج (In Progress)', 'In Progress')}
              {st === 'completed' && t('مکمل شدہ (Completed)', 'Completed')}
            </button>
          ))}
        </div>

        {/* Consultations List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <User className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-500">
                {t('کوئی کیس موصول نہیں ہوا', 'No consultation requests found in this category')}
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/60 shadow-xs space-y-3"
              >
                {/* Top Info */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
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

                  {/* Status Dropdown & Delete */}
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

                {/* Symptoms */}
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-1">
                    {t('مرض و علامات کی تفصیل:', 'Symptoms & Details:')}
                  </span>
                  <p className="text-xs text-slate-800 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed font-medium">
                    {item.symptoms}
                  </p>
                </div>

                {/* Attached Image & WhatsApp Call */}
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
                    href={`https://wa.me/${item.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`السلام علیکم محترم ${item.patientName}! میں الشہزاد دواخانہ سے آپ کے آن لائن کیس کے سلسلے میں رابطہ کر رہا ہوں۔`)}`}
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

        {/* Image Preview Modal */}
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
