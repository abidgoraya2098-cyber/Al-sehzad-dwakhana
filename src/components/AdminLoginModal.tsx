import React, { useState } from 'react';
import { X, Lock, ShieldCheck, AlertCircle, KeyRound } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { loginAdmin } = useAdmin();
  const { isUrdu, t } = useLanguage();

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = loginAdmin(password);
    if (success) {
      setPassword('');
      onClose();
      onSuccess();
    } else {
      setError(t('غلط پاس ورڈ! برائے مہربانی درست پاس ورڈ درج کریں۔', 'Invalid Password! Please enter the correct PIN (5225).'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400 relative">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-emerald-950 flex items-center justify-center font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="font-black text-sm sm:text-base">
              {t('ایڈمن لاگ ان', 'Admin Login')}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-emerald-900 mx-auto flex items-center justify-center font-black mb-2 shadow-xs">
              <KeyRound className="w-6 h-6 text-emerald-800" />
            </div>
            <p className="text-xs text-slate-600 font-bold">
              {t('کلینک ایڈمن پینل تک رسائی کے لیے پاس ورڈ درج کریں:', 'Enter Admin Password / PIN:')}
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2 font-bold animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              {t('ایڈمن پاس ورڈ / پن کوڈ *:', 'Admin PIN / Password *:')}
            </label>
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••"
              className="w-full text-center text-lg tracking-widest p-3 rounded-xl border-2 border-slate-300 focus:outline-none focus:border-emerald-700 font-black bg-slate-50 text-slate-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-emerald-900 to-teal-800 hover:from-emerald-800 hover:to-teal-700 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 border border-amber-400"
          >
            <Lock className="w-4 h-4 text-amber-400" />
            <span>{t('لاگ ان کریں', 'Unlock Admin Panel')}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
