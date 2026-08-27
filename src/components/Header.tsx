import React, { useState, useEffect } from 'react';
import {
  Phone,
  ShoppingBag,
  Bell,
  Languages,
  Download,
  Menu,
  X,
  Stethoscope,
  Sparkles,
  ShieldCheck,
  Lock,
  Calendar,
  User,
  Droplet,
  Code
} from 'lucide-react';
import { DawakhanaLogo } from './DawakhanaLogo';
import { ClinicStatusBadge } from './ClinicStatusBadge';
import { InstallButton } from './InstallButton';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import { useAdmin } from '../context/AdminContext';

interface HeaderProps {
  onOpenConsultation: () => void;
  onOpenAppointment: () => void;
  onOpenAdminLogin: () => void;
  onOpenAdminInbox: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenConsultation,
  onOpenAppointment,
  onOpenAdminLogin,
  onOpenAdminInbox,
}) => {
  const { language, setLanguage, isUrdu, t } = useLanguage();
  const { totalItems, setIsCartOpen } = useCart();
  const { unreadCount, setIsModalOpen } = useNotifications();
  const { isAdminLoggedIn, hakeemSettings } = useAdmin();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [canInstallPwa, setCanInstallPwa] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const handlePwaReady = () => setCanInstallPwa(true);
    window.addEventListener('pwa-ready', handlePwaReady);
    if ((window as any).deferredPrompt || (window as any).deferredPwaPrompt) {
      setCanInstallPwa(true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pwa-ready', handlePwaReady);
    };
  }, []);

  const handleInstallPwa = async () => {
    const promptEvent = (window as any).deferredPrompt || (window as any).deferredPwaPrompt;
    if (promptEvent) {
      promptEvent.prompt();
      const choiceResult = await promptEvent.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setCanInstallPwa(false);
      }
      (window as any).deferredPrompt = null;
      (window as any).deferredPwaPrompt = null;
    }
  };

  const navLinks = [
    { href: '#home', labelUr: 'ہوم', labelEn: 'Home' },
    { href: '#hakeem-profile', labelUr: 'حکیم صاحب', labelEn: 'Hakeem' },
    { href: '#hijama', labelUr: 'حجامہ سنٹر', labelEn: 'Hijama' },
    { href: '#products', labelUr: 'دیسی ادویات', labelEn: 'Medicines' },
    { href: '#mizaj-quiz', labelUr: 'مزاج ٹیسٹ', labelEn: 'Mizaj' },
    { href: '#remedies', labelUr: 'دیسی ٹوٹکے', labelEn: 'Remedies' },
    { href: '#estimator', labelUr: 'کورس تخمینہ', labelEn: 'Estimator' },
    { href: '#reviews', labelUr: 'مریضوں کی رائے', labelEn: 'Reviews' },
    { href: '#developer', labelUr: 'ایپ ڈویلپر', labelEn: 'Developer' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 w-full ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-md shadow-md border-b border-emerald-200 py-1.5'
          : 'bg-white/90 backdrop-blur-sm border-b border-emerald-100 py-2.5'
      }`}
    >
      {/* Top Banner with Real-time Clinic Status & Helpline */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white text-xs py-1.5 px-4 -mt-2.5 mb-2 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ClinicStatusBadge />
            <span className="text-emerald-300">|</span>
            <span className="font-semibold text-emerald-100">
              {isUrdu ? (hakeemSettings?.clinicTimingsUr || 'صبح 09:00 تا 01:30 بجے • شام 04:30 تا 10:30 بجے') : (hakeemSettings?.clinicTimingsEn || '09:00 AM - 01:30 PM & 04:30 PM - 10:30 PM')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${(hakeemSettings?.phone || '0300-6458169').replace(/\D/g, '') || '03006458169'}`}
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors font-extrabold bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/40"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{t(`لائیو کال: ${hakeemSettings?.phone || '0300-6458169'}`, `Call: ${hakeemSettings?.phone || '0300-6458169'}`)}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center shrink-0">
          <DawakhanaLogo size={42} />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-800 hover:text-emerald-800 font-bold text-xs sm:text-[13px] transition-colors relative py-1 group whitespace-nowrap"
            >
              {isUrdu ? link.labelUr : link.labelEn}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0 flex-nowrap">
          {/* Direct Live Call Button */}
          <a
            href={`tel:${(hakeemSettings?.phone || '0300-6458169').replace(/\D/g, '') || '03006458169'}`}
            className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs shadow-sm transition-all border border-amber-500 shrink-0"
            title={t('حکیم صاحب کو لائیو کال کریں', 'Direct Phone Call')}
          >
            <Phone className="w-3.5 h-3.5 fill-emerald-950" />
            <span className="hidden sm:inline">{t('لائیو کال', 'Call')}</span>
          </a>

          {/* Appointment Booking Button */}
          <button
            onClick={onOpenAppointment}
            className="hidden md:flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all border border-emerald-600 shrink-0"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            <span>{t('وقت لیں', 'Book Slot')}</span>
          </button>

          {/* Direct 1-Click Native Chrome Install Button */}
          <InstallButton />

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'ur' ? 'en' : 'ur')}
            className="flex items-center gap-1 px-1.5 sm:px-2 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors shrink-0"
          >
            <Languages className="w-3.5 h-3.5 text-emerald-700" />
            <span className="text-[11px] sm:text-xs">{language === 'ur' ? 'EN' : 'اردو'}</span>
          </button>

          {/* Notification Bell */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="relative p-1.5 sm:p-2 rounded-xl text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors shrink-0"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-amber-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-1.5 sm:p-2 rounded-xl bg-emerald-800 text-white hover:bg-emerald-700 shadow-sm transition-all flex items-center gap-1 px-2 sm:px-3 shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-black hidden sm:inline">{t('کارٹ', 'Cart')}</span>
            {totalItems > 0 && (
              <span className="bg-amber-400 text-emerald-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          {/* Admin Portal Button */}
          {isAdminLoggedIn ? (
            <button
              onClick={onOpenAdminInbox}
              className="p-1.5 sm:p-2 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs flex items-center gap-1 border border-amber-300 shrink-0"
            >
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span className="hidden md:inline">Admin</span>
            </button>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-700 transition-colors shrink-0"
              title="Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 sm:p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b-2 border-emerald-600 px-4 pt-3 pb-5 space-y-3 shadow-2xl animate-fadeIn">
          <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
            <ClinicStatusBadge />
            <a
              href={`tel:${(hakeemSettings?.phone || '0300-6458169').replace(/\D/g, '') || '03006458169'}`}
              className="flex items-center gap-1 px-3 py-1 bg-amber-400 text-emerald-950 text-xs font-black rounded-lg shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 fill-emerald-950" />
              <span>{hakeemSettings?.phone || '0300-6458169'}</span>
            </a>
          </div>

          <div className="grid grid-cols-1 gap-1.5 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-slate-800 hover:bg-emerald-50 hover:text-emerald-900 font-bold text-sm flex items-center justify-between"
              >
                <span>{isUrdu ? link.labelUr : link.labelEn}</span>
                <span className="text-xs text-emerald-600">→</span>
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointment();
              }}
              className="w-full py-2.5 bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{t('معائنہ کا وقت / ٹوکن لیں', 'Book Appointment Time')}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-2.5 bg-amber-400 text-emerald-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-md"
            >
              <Stethoscope className="w-4 h-4" />
              <span>{t('حکیم صاحب کو نسخہ / رپورٹ بھیجیں', 'Upload Report / Consultation')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
