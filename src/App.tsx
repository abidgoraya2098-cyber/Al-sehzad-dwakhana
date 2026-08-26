import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import { NotificationProvider, useNotifications } from './context/NotificationContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HakeemProfile } from './components/HakeemProfile';
import { HijamaServices } from './components/HijamaServices';
import { MizajQuiz } from './components/MizajQuiz';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { ConsultationModal } from './components/ConsultationModal';
import { AppointmentBookingModal } from './components/AppointmentBookingModal';
import { RemediesSection } from './components/RemediesSection';
import { CourseEstimator } from './components/CourseEstimator';
import { Feedback } from './components/Feedback';
import { DeveloperProfile } from './components/DeveloperProfile';
import { ClinicFooter } from './components/ClinicFooter';
import { FloatingActionBar } from './components/FloatingActionBar';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminInboxModal } from './components/AdminInboxModal';
import { NotificationModal } from './components/NotificationModal';
import { SplashScreen } from './components/SplashScreen';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Product } from './types';
import { CheckCircle2 } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { toastMessage } = useNotifications();
  const [showSplash, setShowSplash] = useState(true);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentService, setAppointmentService] = useState<'hakeem_checkup' | 'hijama' | 'live_call'>('hakeem_checkup');
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminInboxOpen, setIsAdminInboxOpen] = useState(false);

  const handleStartMizajQuiz = () => {
    const el = document.getElementById('mizaj-quiz');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenAppointmentModal = (serviceType: 'hakeem_checkup' | 'hijama' | 'live_call' = 'hakeem_checkup') => {
    setAppointmentService(serviceType);
    setIsAppointmentOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-slate-900 selection:bg-emerald-800 selection:text-white">
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-950 text-white px-5 py-3 rounded-2xl shadow-2xl border-2 border-amber-400 flex items-center gap-2.5 text-xs sm:text-sm font-black animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Navigation */}
      <Header
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenAppointment={() => handleOpenAppointmentModal('hakeem_checkup')}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenAdminInbox={() => setIsAdminInboxOpen(true)}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onSearch={(q) => setSearchQuery(q)}
          onOpenConsultation={() => setIsConsultationOpen(true)}
          onOpenAppointment={() => handleOpenAppointmentModal('hakeem_checkup')}
          onStartQuiz={handleStartMizajQuiz}
        />

        {/* 2. Chief Hakeem Profile & Credentials */}
        <HakeemProfile
          onOpenAppointment={() => handleOpenAppointmentModal('hakeem_checkup')}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* 3. Hijama & Cupping Therapy Center */}
        <HijamaServices
          onBookHijama={() => handleOpenAppointmentModal('hijama')}
        />

        {/* 4. Products & Herbal Pharmacy Catalog */}
        <ProductCatalog
          searchQuery={searchQuery}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        {/* 5. Tibbi Mizaj Diagnostic Quiz */}
        <MizajQuiz onSelectProduct={(p) => setSelectedProduct(p)} />

        {/* 6. Traditional Desi Totkay & Home Remedies */}
        <RemediesSection onSelectProduct={(p) => setSelectedProduct(p)} />

        {/* 7. Treatment Course Duration & Cost Estimator */}
        <CourseEstimator />

        {/* 8. Patient Feedback & 5-Star Reviews */}
        <Feedback />

        {/* 9. Lead Developer Profile */}
        <DeveloperProfile />
      </main>

      {/* Footer */}
      <ClinicFooter />

      {/* Floating Action Bar */}
      <FloatingActionBar
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenAppointment={() => handleOpenAppointmentModal('hakeem_checkup')}
      />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <CartDrawer />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      <AppointmentBookingModal
        isOpen={isAppointmentOpen}
        defaultService={appointmentService}
        onClose={() => setIsAppointmentOpen(false)}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => setIsAdminInboxOpen(true)}
      />

      <AdminInboxModal
        isOpen={isAdminInboxOpen}
        onClose={() => setIsAdminInboxOpen(false)}
      />

      <NotificationModal />

      <PwaInstallPrompt />
    </div>
  );
};

export function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <CartProvider>
          <AdminProvider>
            <NotificationProvider>
              <MainAppContent />
            </NotificationProvider>
          </AdminProvider>
        </CartProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
