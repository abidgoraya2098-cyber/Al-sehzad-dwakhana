import React from 'react';
import {
  Phone,
  MessageSquare,
  ShoppingBag,
  Stethoscope
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

interface FloatingActionBarProps {
  onOpenConsultation: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  onOpenConsultation,
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 select-none">
      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-3.5 rounded-full bg-emerald-800 text-white shadow-xl hover:bg-emerald-700 hover:scale-105 transition-all border-2 border-amber-400"
          title={t('شاپنگ کارٹ دیکھیں', 'View Cart')}
        >
          <ShoppingBag className="w-6 h-6 text-amber-300" />
          <span className="absolute -top-1 -right-1 bg-amber-400 text-emerald-950 text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shadow-md animate-bounce">
            {totalItems}
          </span>
        </button>
      )}

      {/* Floating Consultation Button */}
      <button
        onClick={onOpenConsultation}
        className="p-3.5 rounded-full bg-gradient-to-r from-emerald-900 to-teal-800 text-white shadow-xl hover:scale-105 transition-all border-2 border-amber-400/80 group flex items-center gap-2"
        title={t('آن لائن حکیم مشورہ', 'Free Consultation')}
      >
        <Stethoscope className="w-6 h-6 text-amber-400" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-xs font-bold whitespace-nowrap">
          {t('حکیم مشورہ', 'Consultation')}
        </span>
      </button>

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/923000000000?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%DB%8C%DA%A9%D9%85!%20%D9%85%DB%8C%DA%BA%20%D8%A7%D9%84%D8%B4%DB%81%D8%B2%D8%A7%D8%AF%20%D8%AF%D9%88%D8%A7%D8%AE%D8%A7%D9%86%DB%81%20%D8%B3%DB%8C%20%D8%B7%D8%A8%DB%8C%20%D9%85%D8%B4%D9%88%D8%B1%DB%81%20%D9%88%20%D8%A7%D8%AF%D9%88%DB%8C%D8%A7%D8%AA%20%DA%A9%DB%92%20%D8%A8%D8%A7%D8%B1%DB%92%20%D9%85%DB%8C%DA%BA%20%D8%B1%D8%A7%D8%A8%D8%B7%DB%81%20%DA%A9%D8%B1%20%D8%B1%DB%81%D8%A7%20%DB%81%D9%88%DA%BA%DB%94"
        target="_blank"
        rel="noreferrer"
        className="p-4 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 transition-all whatsapp-pulse flex items-center justify-center"
        title={t('واٹس ایپ پر رابطہ کریں', 'Chat on WhatsApp')}
      >
        <MessageSquare className="w-7 h-7 fill-white text-[#25D366]" />
      </a>
    </div>
  );
};
