import React, { useState } from 'react';
import {
  Star,
  MessageSquare,
  CheckCircle2,
  MapPin,
  Sparkles,
  Send,
  ExternalLink,
  ThumbsUp
} from 'lucide-react';
import { Review } from '../types';
import { reviewsData as initialReviews } from '../data/reviews';
import { useLanguage } from '../context/LanguageContext';
import { useNotifications } from '../context/NotificationContext';

export const Feedback: React.FC = () => {
  const { isUrdu, t } = useLanguage();
  const { showToast } = useNotifications();

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('dawakhana_reviews');
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [treatment, setTreatment] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      nameUr: name,
      nameEn: name,
      cityUr: city || 'پاکستان',
      cityEn: city || 'Pakistan',
      treatmentUr: treatment || 'طبی علاج و ادویات',
      treatmentEn: treatment || 'Herbal Treatment',
      commentUr: comment,
      commentEn: comment,
      rating,
      date: 'آج',
      verified: true,
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    localStorage.setItem('dawakhana_reviews', JSON.stringify(updated));

    showToast(t('آپ کے تاثرات کا شکریہ! آپ کا ریویو شامل کر دیا گیا ہے۔', 'Thank you for your review!'));
    setSubmitted(true);

    setName('');
    setCity('');
    setTreatment('');
    setComment('');
  };

  const handleOpenGoogleReview = () => {
    window.open('https://maps.google.com/?q=Al+Shehzad+Dawakhana', '_blank');
  };

  return (
    <section id="reviews" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3 border border-amber-300">
            <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>{t('مریضوں کے تاثرات و شفا کے اعترافات', 'Patient Success Stories')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-emerald-950">
            {t('مریضوں کی رائے اور 5-اسٹار ریٹنگ', 'Customer Reviews & Verified Feedback')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
            {t(
              'ہزاروں مطمئن مریضوں کے حقیقی تاثرات جنہوں نے الشہزاد دواخانہ کی خالص جڑی بوٹیوں سے شفا پائی۔',
              'Real testimonials from thousands of satisfied patients across Pakistan.'
            )}
          </p>

          {/* Google Maps Review CTA */}
          <div className="mt-4">
            <button
              onClick={handleOpenGoogleReview}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors border border-slate-300"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t('گوگل میپس پر بھی اپنا ریویو دیں ⭐⭐⭐⭐⭐', 'Leave a 5-Star Review on Google Maps')}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Reviews List (8 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3 hover:border-emerald-300 transition-colors"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{rev.date}</span>
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed italic">
                    "{isUrdu ? rev.commentUr : rev.commentEn}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-extrabold text-emerald-950">
                      {isUrdu ? rev.nameUr : rev.nameEn}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {isUrdu ? rev.treatmentUr : rev.treatmentEn} • {isUrdu ? rev.cityUr : rev.cityEn}
                    </span>
                  </div>

                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{t('مصدقہ', 'Verified')}</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Review Submission Form (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border-2 border-amber-400/40 space-y-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                {t('آپ کی رائے ہمارے لیے اہم ہے', 'Share Your Feedback')}
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                {t('اپنا تاثر اور ریٹنگ درج کریں', 'Submit Your Experience')}
              </h3>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-3.5">
              {/* Star Rating Picker */}
              <div>
                <label className="text-xs font-bold text-emerald-200 block mb-1">
                  {t('ریٹنگ منتخب کریں:', 'Select Rating:')}
                </label>
                <div className="flex items-center gap-1.5 bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-700/60 inline-flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (hoverRating || rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-emerald-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-300 ml-2 rtl:mr-2 rtl:ml-0">
                    {rating} / 5
                  </span>
                </div>
              </div>

              {/* Name & City */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('آپ کا نام *', 'Your Name *')}
                    className="w-full text-xs p-3 rounded-xl bg-emerald-950/70 border border-emerald-700 text-white placeholder-emerald-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={t('شہر *', 'Your City *')}
                    className="w-full text-xs p-3 rounded-xl bg-emerald-950/70 border border-emerald-700 text-white placeholder-emerald-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Treatment Used */}
              <div>
                <input
                  type="text"
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  placeholder={t('کس دوا یا علاج سے فائدہ ہوا؟ (مثلاً معجون، جوڑوں کا درد)...', 'Product or treatment used...')}
                  className="w-full text-xs p-3 rounded-xl bg-emerald-950/70 border border-emerald-700 text-white placeholder-emerald-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Comment Message */}
              <div>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t('اپنے تاثرات اور تجربہ تفصیل سے لکھیں...', 'Share your detailed experience with our medicines...')}
                  className="w-full text-xs p-3 rounded-xl bg-emerald-950/70 border border-emerald-700 text-white placeholder-emerald-400 focus:outline-none focus:border-amber-400 leading-relaxed"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{t('ریویو شائع کریں', 'Submit Review')}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
