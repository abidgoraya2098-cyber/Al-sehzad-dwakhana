import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import { NotificationProvider, useNotifications } from './context/NotificationContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MizajQuiz } from './components/MizajQuiz';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { ConsultationModal } from './components/ConsultationModal';
import { RemediesSection } from './components/RemediesSection';
import { CourseEstimator } from './components/CourseEstimator';
import { Feedback } from './components/Feedback';
import { ClinicFooter } from './components/ClinicFooter';
import { FloatingActionBar } from './components/FloatingActionBar';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminInboxModal } from './components/AdminInboxModal';
import { NotificationModal } from './components/NotificationModal';
import { SplashScreen } from './components/SplashScreen';
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
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminInboxOpen, setIsAdminInboxOpen] = useState(false);

  const handleStartMizajQuiz = () => {
    const el = document.getElementById('mizaj-quiz');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f9f5] text-slate-900 selection:bg-emerald-700 selection:text-white">
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-2xl border-2 border-amber-400 flex items-center gap-2.5 text-xs sm:text-sm font-bold animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Navigation */}
      <Header
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenAdminInbox={() => setIsAdminInboxOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onSearch={(q) => setSearchQuery(q)}
          onOpenConsultation={() => setIsConsultationOpen(true)}
          onStartQuiz={handleStartMizajQuiz}
        />

        {/* Tibbi Mizaj Quiz */}
        <MizajQuiz onSelectProduct={(p) => setSelectedProduct(p)} />

        {/* Products Pharmacy Catalog */}
        <ProductCatalog
          searchQuery={searchQuery}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        {/* Home Remedies / Totkay */}
        <RemediesSection onSelectProduct={(p) => setSelectedProduct(p)} />

        {/* Course Duration & Cost Estimator */}
        <CourseEstimator />

        {/* Feedback & Reviews */}
        <Feedback />
      </main>

      {/* Footer */}
      <ClinicFooter />

      {/* Floating Action Bar */}
      <FloatingActionBar onOpenConsultation={() => setIsConsultationOpen(true)} />

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
