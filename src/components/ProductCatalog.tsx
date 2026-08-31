import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Star,
  Eye,
  Filter,
  CheckCircle2,
  Phone,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { Product } from '../types';
import { productsData } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  searchQuery: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProduct,
  searchQuery,
}) => {
  const { isUrdu, t } = useLanguage();
  const { hakeemSettings, products } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating'>('featured');

  const categories = [
    { id: 'all', labelUr: 'تمام ادویات و مصنوعات', labelEn: 'All Products' },
    { id: 'special_courses', labelUr: '🌟 طبی کورسز و سپیشل پیکیجز', labelEn: 'Special Treatment Courses' },
    { id: 'vitality', labelUr: 'مقوی عام و شباب', labelEn: 'Vitality & Stamina' },
    { id: 'majoon', labelUr: 'معجون و خمیرہ جات', labelEn: 'Majoon & Khamira' },
    { id: 'honey_syrup', labelUr: 'قدرتی شہد و شربت', labelEn: 'Honey & Syrups' },
    { id: 'safoof', labelUr: 'سفوف و معدہ', labelEn: 'Safoof & Digestive' },
    { id: 'arqiat', labelUr: 'خالص عرقیات', labelEn: 'Herbal Distillates' },
    { id: 'oils', labelUr: 'ہربل ہیئر آئل و تیل', labelEn: 'Herbal Oils' },
  ];

  const filteredProducts = useMemo(() => {
    const list = Array.isArray(products) && products.length > 0 ? products : productsData;
    return list
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'all' || product.category === selectedCategory;
        const q = (searchQuery || '').toLowerCase();
        const matchesSearch =
          !q ||
          (product?.nameUr || '').toLowerCase().includes(q) ||
          (product?.nameEn || '').toLowerCase().includes(q) ||
          (product?.descriptionUr || '').toLowerCase().includes(q) ||
          (product?.descriptionEn || '').toLowerCase().includes(q) ||
          (product?.categoryUr || '').toLowerCase().includes(q);
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleWhatsAppInstantOrder = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const productName = isUrdu ? (product.nameUr || product.nameEn) : (product.nameEn || product.nameUr);
    const msg = encodeURIComponent(
      `السلام علیکم! میں الشہزاد دواخانہ سے درج ذیل پراڈکٹ آرڈر کرنا چاہتا ہوں:\n\n` +
      `📦 دوا کا نام: ${productName}\n` +
      `💰 قیمت: Rs. ${product.price}\n` +
      `⚖️ وزن / پیکنگ: ${isUrdu ? (product.weightUr || product.weight) : product.weight}\n\n` +
      `برائے مہربانی ڈلیوری کا طریقہ کار اور کنفرمیشن فرمائیں۔ شکریہ!`
    );
    window.open(`https://wa.me/${hakeemSettings?.whatsapp || '923006458169'}?text=${msg}`, '_blank');
  };

  return (
    <section id="products" className="py-14 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3 border border-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t('100% خالص قدرتی دیسی ادویات', '100% Organic Tibbi Medicines')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-emerald-950">
            {t('الشہزاد فارمیسی و ادویات کیٹلاگ', 'Al-Shehzad Herbal Pharmacy & Products')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
            {t(
              'خالص جڑی بوٹیوں سے تیار کردہ اکسیر ادویات، معجون، عرقیات اور روغن جو بے شمار مریضوں پر آزمودہ ہیں۔',
              'Pure organic herbal formulations crafted with authentic Unani recipes, trusted by thousands of cured patients.'
            )}
          </p>
        </div>

        {/* Category Filters & Sort Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Categories Pill Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200'
                }`}
              >
                {isUrdu ? cat.labelUr : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600"
            >
              <option value="featured">{t('ترتیب: سب سے مقبول', 'Sort: Featured')}</option>
              <option value="rating">{t('ترتیب: بہترین ریٹنگ', 'Sort: Highest Rated')}</option>
              <option value="price_low">{t('قیمت: کم سے زیادہ', 'Price: Low to High')}</option>
              <option value="price_high">{t('قیمت: زیادہ سے کم', 'Price: High to Low')}</option>
            </select>
          </div>
        </div>

        {/* Active Search Notification */}
        {searchQuery && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-900 flex items-center justify-between">
            <span>
              {t('تلاش کے نتائج برائے:', 'Search results for:')} <strong>"{searchQuery}"</strong> ({filteredProducts.length} {t('ادویات ملیں', 'products found')})
            </span>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">
              {t('کوئی پراڈکٹ دستیاب نہیں ہے', 'No products found')}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {t('براہ کرم کوئی دوسرا نام یا کیٹیگری منتخب کریں۔', 'Please try searching for another term or category.')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-amber-400/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
              >
                {/* Product Image Box */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Badges */}
                  {product.badgeUr && (
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-amber-500 text-emerald-950 text-[11px] font-extrabold rounded-lg shadow-sm">
                      {isUrdu ? product.badgeUr : product.badgeEn}
                    </span>
                  )}

                  <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold rounded">
                    {isUrdu ? product.weightUr : product.weight}
                  </span>
                </div>

                {/* Content Box */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-emerald-700 font-bold">
                        {isUrdu ? product.categoryUr : product.categoryEn}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Product Title */}
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1 leading-snug">
                      {isUrdu ? product.nameUr : product.nameEn}
                    </h3>

                    {/* Target Ailments */}
                    {product.targetAilmentsUr && (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-0.5 truncate max-w-full">
                        💊 {isUrdu ? product.targetAilmentsUr : (product.targetAilmentsEn || product.targetAilmentsUr)}
                      </span>
                    )}

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1 font-medium">
                      {isUrdu ? product.descriptionUr : product.descriptionEn}
                    </p>
                  </div>

                  {/* Price and Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400 font-semibold">{t('قیمت', 'Price')}</span>
                        {product.freeShipping && (
                          <span className="text-[9px] bg-emerald-100 text-emerald-900 font-black px-1.5 py-0.2 rounded">
                            {t('فری شپنگ', 'Free Delivery')}
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base sm:text-lg font-black text-emerald-950">
                          Rs. {product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-xs font-bold text-red-500 line-through">
                            Rs. {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* WhatsApp 1-Click Order */}
                      <button
                        onClick={(e) => handleWhatsAppInstantOrder(product, e)}
                        className="p-2 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                        title={t('واٹس ایپ آرڈر', 'WhatsApp Order')}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>

                      {/* Add to Cart */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="px-3 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{t('کارٹ', 'Add')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
