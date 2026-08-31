import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  MessageSquare,
  ShieldCheck,
  CheckCircle,
  Truck,
  Leaf,
  Clock,
  Plus,
  Minus
} from 'lucide-react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const { isUrdu, t } = useLanguage();
  const { addToCart } = useCart();
  const { hakeemSettings } = useAdmin();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleWhatsAppOrder = () => {
    const productName = isUrdu ? product.nameUr : product.nameEn;
    const msg = encodeURIComponent(
      `السلام علیکم! میں الشہزاد دواخانہ سے درج ذیل دوا فوری آرڈر کرنا چاہتا ہوں:\n\n` +
      `📦 دوا کا نام: ${productName}\n` +
      `🔢 مقدار (Quantity): ${quantity}\n` +
      `💰 کل رقم: Rs. ${product.price * quantity}\n` +
      `⚖️ وزن: ${isUrdu ? product.weightUr : product.weight}\n\n` +
      `برائے مہربانی ڈلیوری کی تفصیلات فراہم کریں۔ شکریہ!`
    );
    window.open(`https://wa.me/${hakeemSettings?.whatsapp || '923006458169'}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-600/30 max-h-[92vh] flex flex-col relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 rtl:left-4 rtl:right-auto ltr:right-4 ltr:left-auto z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Top Section: Image & Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="relative aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={product.image}
                alt={product.nameEn}
                className="w-full h-full object-cover"
              />
              {product.badgeUr && (
                <span className="absolute top-3 right-3 px-3 py-1 bg-amber-500 text-emerald-950 text-xs font-black rounded-lg shadow-md">
                  {isUrdu ? product.badgeUr : product.badgeEn}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wide">
                  {isUrdu ? product.categoryUr : product.categoryEn}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 leading-snug">
                  {isUrdu ? product.nameUr : product.nameEn}
                </h2>
              </div>

              {/* Rating, Stock & Duration */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-500">({product.reviewsCount} {t('آراء', 'reviews')})</span>
                </div>

                <span className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {t('100% مستند و خالص', '100% Genuine')}
                </span>

                {product.durationUr && (
                  <span className="flex items-center gap-1 text-amber-900 font-bold bg-amber-100/80 px-2.5 py-1 rounded-lg border border-amber-300">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    {isUrdu ? product.durationUr : (product.durationEn || product.durationUr)}
                  </span>
                )}
              </div>

              {product.targetAilmentsUr && (
                <div className="p-2.5 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs text-emerald-950 font-bold">
                  <span>🎯 {t('مخصوص برائے:', 'Target Ailments:')} </span>
                  <span className="font-semibold">{isUrdu ? product.targetAilmentsUr : (product.targetAilmentsEn || product.targetAilmentsUr)}</span>
                </div>
              )}

              {/* Price & Weight */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-semibold block">{t('حتمی قیمت', 'Price')}</span>
                  <span className="text-2xl font-black text-emerald-950">
                    Rs. {(product.price * quantity).toLocaleString()}
                  </span>
                </div>
                <div className="text-right rtl:text-right ltr:text-left">
                  <span className="text-xs text-slate-500 font-semibold block">{t('پیکنگ وزن', 'Packing')}</span>
                  <span className="text-sm font-bold text-slate-800">
                    {isUrdu ? product.weightUr : product.weight}
                  </span>
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-bold text-slate-700">{t('مقدار (Quantity):', 'Quantity:')}</span>
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-slate-100 text-slate-600 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-slate-100 text-slate-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-slate-100 pt-4">
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span>{t('طبی تعارف و تفصیل', 'Product Description')}</span>
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {isUrdu ? product.descriptionUr : product.descriptionEn}
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 space-y-3">
            <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
              <span>{t('طبی فوائد و خصوصیات', 'Key Health Benefits')}</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 font-medium">
              {(isUrdu ? product.benefitsUr : product.benefitsEn).map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ingredients & Dosage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-white">
              <h4 className="text-xs font-bold text-slate-900 mb-2">{t('اہم قدرتی اجزاء:', 'Main Herbal Ingredients:')}</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {(isUrdu ? product.ingredientsUr : product.ingredientsEn).join(' • ')}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40">
              <h4 className="text-xs font-bold text-amber-950 mb-2 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>{t('خوراک و طریقہ استعمال:', 'Dosage & Usage:')}</span>
              </h4>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {isUrdu ? product.dosageUr : product.dosageEn}
              </p>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleAddToCart}
              className="w-full sm:flex-1 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t('شاپنگ کارٹ میں شامل کریں', 'Add to Cart')}</span>
            </button>

            <button
              onClick={handleWhatsAppOrder}
              className="w-full sm:flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t('واٹس ایپ پر فوری آرڈر کریں', '1-Click WhatsApp Order')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
