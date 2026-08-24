import React from 'react';
import {
  Phone,
  MessageSquare,
  ShoppingBag,
  Calendar,
  Stethoscope
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

interface FloatingActionBarProps {
  onOpenConsultation: () => void;
  onOpenAppointment: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  onOpenConsultation,
  onOpenAppointment,
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5 select-none">
      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-3.5 rounded-full bg-emerald-900 text-white shadow-2xl hover:bg-emerald-800 hover:scale-105 transition-all border-2 border-amber-400"
          title={t('شاپنگ کارٹ دیکھیں', 'View Cart')}
        >
          <ShoppingBag className="w-5 h-5 text-amber-300" />
          <span className="absolute -top-1 -right-1 bg-amber-400 text-emerald-950 text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shadow-md animate-bounce">
            {totalItems}
          </span>
        </button>
      )}

      {/* Floating Book Appointment Button */}
      <button
        onClick={onOpenAppointment}
        className="p-3.5 rounded-full bg-emerald-800 text-white shadow-2xl hover:scale-105 transition-all border-2 border-amber-400 group flex items-center gap-2"
        title={t('معائنہ کا وقت / ٹوکن لیں', 'Book Appointment Time')}
      >
        <Calendar className="w-5 h-5 text-amber-300" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-xs font-black whitespace-nowrap">
          {t('وقت لیں (Appointment)', 'Book Slot')}
        </span>
      </button>

      {/* Floating Direct Phone Call Button */}
      <a
        href="tel:+923000000000"
        className="p-3.5 rounded-full bg-amber-400 text-emerald-950 shadow-2xl hover:scale-105 transition-all border-2 border-amber-500 group flex items-center gap-2"
        title={t('حکیم صاحب کو لائیو کال ملائیں', 'Direct Phone Call')}
      >
        <Phone className="w-5 h-5 fill-emerald-950" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-xs font-black whitespace-nowrap">
          {t('لائیو کال (0300-0000000)', 'Call Hakim')}
        </span>
      </a>

      {/* Floating WhatsApp Action Button with Pulse Glow */}
      <a
        href="https://wa.me/923000000000?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%DB%8C%DA%A9%D9%85!%20%D9%85%DB%8C%DA%BA%20%D8%A7%D9%84%D8%B4%DB%81%D8%B2%D8%A7%D8%AF%20%D8%AF%D9%88%D8%A7%D8%AE%D8%A7%D9%86%DB%81%20%D8%B3%DB%8C%20%D8%B7%D8%A8%DB%8C%20%D9%85%D8%B4%D9%88%D8%B1%DB%81%20%D9%88%20%D8%A7%D8%AF%D9%88%DB%8C%D8%A7%D8%AA%20%DA%A9%DB%92%20%D8%A8%D8%A7%D8%B1%DB%92%20%D9%85%DB%8C%DA%BA%20%D8%B1%D8%A7%D8%A8%D8%B7%DB%81%20%DA%A9%D8%B1%20%D8%B1%DB%81%D8%A7%20%DB%81%D9%88%DA%BA%DB%94"
        target="_blank"
        rel="noreferrer"
        className="p-4 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 transition-all whatsapp-pulse flex items-center justify-center"
        title={t('واٹس ایپ پر رابطہ کریں', 'Chat on WhatsApp')}
      >
        <MessageSquare className="w-6 h-6 fill-white text-[#25D366]" />
      </a>
    </div>
  );
};
