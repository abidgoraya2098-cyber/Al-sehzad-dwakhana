import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Apple,
  AlertCircle,
  Leaf,
  CheckCircle2,
  ShoppingBag
} from 'lucide-react';
import { remediesData } from '../data/remedies';
import { productsData } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import { Product } from '../types';

interface RemediesSectionProps {
  onSelectProduct: (product: Product) => void;
}

export const RemediesSection: React.FC<RemediesSectionProps> = ({
  onSelectProduct,
}) => {
  const { isUrdu, t } = useLanguage();
  const [expandedRemedyId, setExpandedRemedyId] = useState<string | null>(
    remediesData[0]?.id || null
  );
  const [filterQuery, setFilterQuery] = useState('');

  const filteredRemedies = remediesData.filter((rem) => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    return (
      (rem?.titleUr || '').toLowerCase().includes(q) ||
      (rem?.titleEn || '').toLowerCase().includes(q) ||
      (rem?.ailmentUr || '').toLowerCase().includes(q) ||
      (rem?.ailmentEn || '').toLowerCase().includes(q) ||
      (rem?.categoryUr || '').toLowerCase().includes(q)
    );
  });

  return (
    <section id="remedies" className="py-14 sm:py-20 bg-white border-y border-emerald-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3 border border-amber-300">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>{t('آزمودہ قدرتی حکمت و گھریلو علاج', 'Time-Tested Home Remedies')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-emerald-950">
            {t('گھریلو دیسی ٹوٹکے و طبی رہنمائی', 'Traditional Herbal Remedies & Health Wisdom')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
            {t(
              'روزمرہ کے عام امراض کے لیے قدرتی جڑی بوٹیوں اور کچن کی اشیاء سے تیار ہونے والے بے ضرر گھریلو نسخے۔',
              'Safe, natural and effective kitchen remedies and herbal formulations for common everyday ailments.'
            )}
          </p>

          {/* Search Box */}
          <div className="mt-6 max-w-md mx-auto relative">
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder={t('ٹوٹکہ یا بیماری تلاش کریں (مثلاً گیس، کھانسی، بال)...', 'Search remedy (e.g. Cough, Hair, Gas)...')}
              className="w-full text-xs sm:text-sm py-3 px-4 pl-10 rtl:pl-4 rtl:pr-10 rounded-2xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50 shadow-xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute top-3.5 right-3.5 rtl:right-3.5 rtl:left-auto ltr:left-3.5 ltr:right-auto" />
          </div>
        </div>

        {/* Remedies Accordion Cards */}
        <div className="space-y-4">
          {filteredRemedies.map((remedy) => {
            const isExpanded = expandedRemedyId === remedy.id;
            return (
              <div
                key={remedy.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isExpanded
                    ? 'border-emerald-600 shadow-md bg-emerald-50/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setExpandedRemedyId(isExpanded ? null : remedy.id)}
                  className="w-full p-4 sm:p-5 text-right rtl:text-right ltr:text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold text-amber-700 block uppercase">
                        {isUrdu ? remedy.categoryUr : remedy.categoryEn}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-emerald-950">
                        {isUrdu ? remedy.titleUr : remedy.titleEn}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                      {isUrdu ? remedy.ailmentUr : remedy.ailmentEn}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-emerald-700" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Body */}
                {isExpanded && (
                  <div className="p-4 sm:p-6 pt-0 border-t border-emerald-100/60 space-y-4 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      {/* Ingredients */}
                      <div className="bg-white rounded-xl p-4 border border-slate-200">
                        <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{t('اجزائے ترکیبی (ضروری اشیاء):', 'Required Ingredients:')}</span>
                        </h4>
                        <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                          {(isUrdu ? remedy.ingredientsUr : remedy.ingredientsEn).map((ing, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                              <span>{ing}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Preparation & Usage */}
                      <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-3">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 mb-1">{t('تیاری کا طریقہ:', 'Preparation:')}</h4>
                          <p className="text-xs text-slate-700 font-medium leading-relaxed">
                            {isUrdu ? remedy.preparationUr : remedy.preparationEn}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-slate-100">
                          <h4 className="text-xs font-bold text-slate-900 mb-1">{t('استعمال کا طریقہ:', 'Directions:')}</h4>
                          <p className="text-xs text-emerald-900 font-bold leading-relaxed">
                            {isUrdu ? remedy.usageUr : remedy.usageEn}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Precaution */}
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>
                        <strong>{t('پرہیز و احتیاط:', 'Precaution:')}</strong> {isUrdu ? remedy.precautionUr : remedy.precautionEn}
                      </span>
                    </div>

                    {/* Recommended Matching Medicines */}
                    {remedy.recommendedProductIds && remedy.recommendedProductIds.length > 0 && (
                      <div className="pt-2">
                        <span className="text-xs font-bold text-slate-700 block mb-2">
                          {t('اس مرض کے لیے دواخانہ کی تیار شدہ مستند دوا:', 'Ready-made Formulation from Dawakhana:')}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {productsData
                            .filter((p) => remedy.recommendedProductIds?.includes(p.id))
                            .map((p) => (
                              <button
                                key={p.id}
                                onClick={() => onSelectProduct(p)}
                                className="px-3 py-1.5 rounded-xl bg-emerald-800 text-white hover:bg-emerald-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                              >
                                <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                                <span>{isUrdu ? p.nameUr : p.nameEn}</span>
                                <span className="bg-emerald-950/50 px-1.5 py-0.5 rounded text-[10px]">
                                  Rs. {p.price}
                                </span>
                              </button>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
