import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageSquare,
  Truck,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const { isUrdu, t } = useLanguage();
  const { hakeemSettings } = useAdmin();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  if (!isCartOpen) return null;

  const deliveryCharges = totalPrice >= 3000 || totalPrice === 0 ? 0 : 250;
  const grandTotal = totalPrice + deliveryCharges;

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const itemsSummary = cart
      .map((item, idx) => {
        const pName = isUrdu ? item.product.nameUr : item.product.nameEn;
        return `${idx + 1}. ${pName} (${isUrdu ? item.product.weightUr : item.product.weight}) × ${item.quantity} = Rs. ${item.product.price * item.quantity}`;
      })
      .join('\n');

    const msg = encodeURIComponent(
      `🌿 *الشہزاد دواخانہ اینڈ ہربل کلینک — نیا آرڈر انوائس* 🌿\n` +
      `-----------------------------------------\n` +
      `👤 *مریض / گاہک کا نام:* ${customerName || 'معزز گاہک'}\n` +
      `📞 *فون نمبر:* ${customerPhone || 'فراہم نہیں کیا گیا'}\n` +
      `🏙️ *شہر:* ${customerCity || 'پاکستان'}\n` +
      `📍 *مکمل پتہ:* ${customerAddress || 'کیش آن ڈلیوری'}\n` +
      `-----------------------------------------\n` +
      `📦 *آرڈر کی گئی ادویات:*\n${itemsSummary}\n` +
      `-----------------------------------------\n` +
      `💵 *ادویات کی رقم:* Rs. ${totalPrice}\n` +
      `🚚 *ڈلیوری چارجز:* ${deliveryCharges === 0 ? 'مفت (Free)' : `Rs. ${deliveryCharges}`}\n` +
      `💰 *کل رقم (Grand Total):* Rs. ${grandTotal}\n` +
      `-----------------------------------------\n` +
      `محترم ${isUrdu ? (hakeemSettings?.nameUr || 'حکیم محمد نواز احمد') : (hakeemSettings?.nameEn || 'Hakim Muhammad Nawaz Ahmad')}! برائے مہربانی میرا آرڈر کنفرم فرمائیں اور پارسل کیش آن ڈلیوری پر روانہ فرمائیں۔ شکریہ!`
    );

    window.open(`https://wa.me/${hakeemSettings?.whatsapp || '923006458169'}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col relative animate-slideLeft">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="font-extrabold text-base sm:text-lg">
              {t('آپ کا شاپنگ کارٹ', 'Your Shopping Cart')}
            </h2>
            <span className="bg-amber-400 text-emerald-950 text-xs font-black px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Tracker */}
        <div className="bg-emerald-50 px-4 py-2.5 border-b border-emerald-100 flex items-center gap-2 text-xs text-emerald-900 font-semibold">
          <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
          {totalPrice >= 3000 ? (
            <span className="text-emerald-800 font-bold">
              {t('مبارک ہو! آپ کے لیے فری ہوم ڈلیوری لاگو ہو چکی ہے 🎉', 'Congratulations! Free Home Delivery Applied 🎉')}
            </span>
          ) : (
            <span>
              {t('صرف', 'Add')} Rs. {(3000 - totalPrice).toLocaleString()} {t('کی مزید ادویات شامل کریں اور مفت ڈلیوری پائیں', 'more to get Free Delivery!')}
            </span>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-600">
                {t('آپ کا کارٹ ابھی خالی ہے', 'Your cart is empty')}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {t('ہماری خالص دیسی ادویات کیٹلاگ سے اشیاء منتخب کریں', 'Explore our herbal pharmacy products to add items')}
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 bg-slate-50/50"
              >
                <img
                  src={item.product.image}
                  alt={item.product.nameEn}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {isUrdu ? item.product.nameUr : item.product.nameEn}
                  </h4>
                  <span className="text-xs text-slate-500 block">
                    {isUrdu ? item.product.weightUr : item.product.weight}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-emerald-900 block mt-0.5">
                    Rs. {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                    title={t('حذف کریں', 'Remove')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-2 py-0.5 hover:bg-slate-100 text-slate-600 text-xs font-bold"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-xs font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-2 py-0.5 hover:bg-slate-100 text-slate-600 text-xs font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout Form & Total Box */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-slate-200 space-y-4">
            {/* Quick Contact Form */}
            <form onSubmit={handleWhatsAppCheckout} className="space-y-2.5">
              <span className="text-xs font-extrabold text-emerald-950 block">
                {t('ڈلیوری کی معلومات (کیش آن ڈلیوری):', 'Delivery Details (Cash on Delivery):')}
              </span>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={t('آپ کا نام', 'Your Full Name')}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder={t('موبائل نمبر', 'Phone Number')}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  placeholder={t('شہر کا نام', 'City Name')}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
                <input
                  type="text"
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder={t('مکمل پتہ', 'Delivery Address')}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
              </div>

              {/* Price Breakdown */}
              <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>{t('ادویات کی قیمت:', 'Subtotal:')}</span>
                  <span className="font-bold">Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('ڈلیوری چارجز:', 'Delivery:')}</span>
                  <span className="font-bold">
                    {deliveryCharges === 0 ? t('مفت (Free)', 'Free') : `Rs. ${deliveryCharges}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-emerald-950 pt-1 border-t border-slate-200">
                  <span>{t('کل رقم (Grand Total):', 'Total Amount:')}</span>
                  <span className="text-base text-emerald-800">Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* WhatsApp Checkout Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-emerald-800 to-teal-700 hover:from-emerald-700 hover:to-teal-600 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>{t('واٹس ایپ پر آرڈر کنفرم کریں', 'Confirm Order via WhatsApp')}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
