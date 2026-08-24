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
  HeartPulse
} from 'lucide-react';
import { DawakhanaLogo } from './DawakhanaLogo';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import { useAdmin } from '../context/AdminContext';

interface HeaderProps {
  onOpenConsultation: () => void;
  onOpenAdminLogin: () => void;
  onOpenAdminInbox: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenConsultation,
  onOpenAdminLogin,
  onOpenAdminInbox,
}) => {
  const { language, setLanguage, isUrdu, t } = useLanguage();
  const { totalItems, setIsCartOpen } = useCart();
  const { unreadCount, setIsModalOpen } = useNotifications();
  const { isAdminLoggedIn } = useAdmin();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [canInstallPwa, setCanInstallPwa] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Check PWA ready
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
    { href: '#products', labelUr: 'ادویات و مصنوعات', labelEn: 'Medicines' },
    { href: '#mizaj-quiz', labelUr: 'طبی مزاج ٹیسٹ', labelEn: 'Mizaj Quiz' },
    { href: '#remedies', labelUr: 'دیسی ٹوٹکے', labelEn: 'Home Remedies' },
    { href: '#estimator', labelUr: 'کورس تخمینہ', labelEn: 'Course Estimator' },
    { href: '#reviews', labelUr: 'مریضوں کی رائے', labelEn: 'Reviews' },
    { href: '#contact', labelUr: 'کلینک و رابطہ', labelEn: 'Contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-emerald-100 py-2.5'
          : 'bg-white/80 backdrop-blur-sm border-b border-emerald-100/60 py-3.5'
      }`}
    >
      {/* Top Banner for Hotline & Timings */}
      <div className="hidden lg:block bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white text-xs py-1.5 px-4 -mt-3.5 mb-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              {t('100% خالص قدرتی دیسی جڑی بوٹیاں اور مستند حکمت', '100% Pure Herbal & Authenticated Tibbi Formulations')}
            </span>
            <span className="text-emerald-300">|</span>
            <span>{t('اوقات: صبح 9 تا رات 10 بجے (ہفتہ وار تعطیل جمعہ)', 'Hours: 9:00 AM - 10:00 PM (Friday Closed)')}</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+923000000000"
              className="flex items-center gap-1 text-amber-300 hover:text-amber-200 transition-colors font-medium"
            >
              <Phone className="w-3 h-3" />
              <span>{t('ہیلپ لائن: 0300-0000000', 'Helpline: +92 300 0000000')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center">
          <DawakhanaLogo size={46} />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-700 hover:text-emerald-700 font-medium text-sm transition-colors relative py-1 group"
            >
              {isUrdu ? link.labelUr : link.labelEn}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* PWA Install Button */}
          {canInstallPwa && (
            <button
              onClick={handleInstallPwa}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-amber-400 hover:bg-amber-300 rounded-full shadow-sm transition-all"
              title={t('ایپ انسٹال کریں', 'Install App')}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t('ایپ انسٹال کریں', 'Install App')}</span>
            </button>
          )}

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'ur' ? 'en' : 'ur')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-emerald-200 text-xs font-bold text-emerald-800 hover:bg-emerald-50 transition-colors"
            title={t('Switch to English', 'اردو میں دیکھیں')}
          >
            <Languages className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'ur' ? 'English' : 'اردو'}</span>
          </button>

          {/* Notification Trigger */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="relative p-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            title={t('اعلانات و ٹپس', 'Notifications')}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm transition-all flex items-center gap-1.5 px-3"
            title={t('شاپنگ کارٹ', 'View Cart')}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-bold hidden sm:inline">{t('کارٹ', 'Cart')}</span>
            {totalItems > 0 && (
              <span className="bg-amber-400 text-emerald-950 text-[11px] font-extrabold px-1.5 py-0.2 rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          {/* Consultation CTA button */}
          <button
            onClick={onOpenConsultation}
            className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-800 to-teal-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg hover:from-emerald-700 hover:to-teal-600 transition-all border border-amber-400/50"
          >
            <Stethoscope className="w-4 h-4 text-amber-400" />
            <span>{t('حکیم صاحب سے مشورہ', 'Consult Hakeem')}</span>
          </button>

          {/* Admin Portal Button */}
          {isAdminLoggedIn ? (
            <button
              onClick={onOpenAdminInbox}
              className="p-2 rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors text-xs font-bold flex items-center gap-1"
              title="Admin Inbox"
            >
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Admin Login"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-emerald-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-emerald-100 px-4 pt-3 pb-5 space-y-3 shadow-xl animate-fadeIn">
          <div className="grid grid-cols-1 gap-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 font-medium text-sm flex items-center justify-between"
              >
                <span>{isUrdu ? link.labelUr : link.labelEn}</span>
                <span className="text-xs text-emerald-600">→</span>
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-emerald-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-2.5 bg-gradient-to-r from-emerald-800 to-teal-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md"
            >
              <Stethoscope className="w-4 h-4 text-amber-400" />
              <span>{t('حکیم صاحب سے آن لائن مشورہ حاصل کریں', 'Book Online Hakeem Consultation')}</span>
            </button>

            {canInstallPwa && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleInstallPwa();
                }}
                className="w-full py-2 bg-amber-400 text-emerald-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>{t('ایپ ڈاؤن لوڈ و انسٹال کریں', 'Download & Install PWA App')}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
