import React, { useState } from 'react';
import {
  Sparkles,
  HelpCircle,
  Check,
  RefreshCw,
  ShoppingBag,
  Apple,
  AlertCircle,
  Flame,
  Droplets,
  Wind,
  Mountain
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MizajResult, Product } from '../types';
import { productsData } from '../data/products';

const quizQuestions = [
  {
    id: 'q1',
    questionUr: '1. آپ عام طور پر کس قسم کے موسم یا درجہ حرارت میں زیادہ بے چینی محسوس کرتے ہیں؟',
    questionEn: '1. Which season or temperature makes you feel most uncomfortable?',
    options: [
      { id: 'opt1', textUr: 'شدید گرمی اور دھوپ برداشت نہیں ہوتی (جسم میں گرمی رہتی ہے)', textEn: 'Extreme heat & sun (body feels hot)', humor: 'safrawi' },
      { id: 'opt2', textUr: 'سردی زیادہ لگتی ہے اور ہاتھ پاؤں ٹھنڈے رہتے ہیں', textEn: 'Easily get cold, hands & feet remain cold', humor: 'balghami' },
      { id: 'opt3', textUr: 'معتدل موسم پسند ہے لیکن گرمی میں خون کا جوش بڑھ جاتا ہے', textEn: 'Prefer moderate weather, feel flushed easily', humor: 'damvi' },
      { id: 'opt4', textUr: 'خشک سردی اور ہوا سے پریشانی، جلد خشک ہو جاتی ہے', textEn: 'Dry cold winds cause discomfort, skin gets dry', humor: 'saudawi' },
    ]
  },
  {
    id: 'q2',
    questionUr: '2. آپ کا نظامِ ہاضمہ اور بھوک کی کیفیت کیسی رہتی ہے؟',
    questionEn: '2. How would you describe your appetite and digestive state?',
    options: [
      { id: 'opt1', textUr: 'بھوک تیز لگتی ہے مگر کھانے کے بعد پیاس اور جلن ہو سکتی ہے', textEn: 'Intense appetite, but prone to thirst & acid burning', humor: 'safrawi' },
      { id: 'opt2', textUr: 'ہاضمہ سست ہے، کھانا دیر سے ہضم ہوتا ہے، پیٹ میں بھاری پن', textEn: 'Slow digestion, heaviness in stomach after eating', humor: 'balghami' },
      { id: 'opt3', textUr: 'کھانا خوب ہضم ہوتا ہے، بھوک معمول کے مطابق اچھی لگتی ہے', textEn: 'Strong digestion, robust healthy appetite', humor: 'damvi' },
      { id: 'opt4', textUr: 'بھوک بے قاعدہ ہے، گیس، قبض اور اپھارہ کی شکایت رہتی ہے', textEn: 'Irregular appetite, prone to constipation and gas', humor: 'saudawi' },
    ]
  },
  {
    id: 'q3',
    questionUr: '3. آپ کی نیند اور ذہنی کیفیت کا عام رجحان کیا ہے؟',
    questionEn: '3. What is your typical sleep pattern and mental disposition?',
    options: [
      { id: 'opt1', textUr: 'نیند کم آتی ہے، غصہ اور چڑچڑاپن جلدی آتا ہے، چست طبیعت', textEn: 'Light sleep, quick to react/angry, highly energetic', humor: 'safrawi' },
      { id: 'opt2', textUr: 'نیند بہت گہری اور زیادہ آتی ہے، طبیعت میں سستی و سکون رہتا ہے', textEn: 'Deep long sleep, calm and relaxed disposition', humor: 'balghami' },
      { id: 'opt3', textUr: 'پرسکون پرامید نیند، خوش مزاج، باتونی اور متحرک', textEn: 'Pleasant sound sleep, cheerful, talkative and social', humor: 'damvi' },
      { id: 'opt4', textUr: 'نیند اڑ جاتی ہے، وسوسے اور گہری سوچیں زیادہ پریشان کرتی ہیں', textEn: 'Insomnia, overthinking, anxiety and deep rumination', humor: 'saudawi' },
    ]
  },
  {
    id: 'q4',
    questionUr: '4. آپ کی جلد اور جسمانی ساخت کیسی ہے؟',
    questionEn: '4. How is your skin texture and overall physical build?',
    options: [
      { id: 'opt1', textUr: 'جلد گرم، ہلکی زردی مائل یا پسینہ زیادہ آنا', textEn: 'Warm skin, yellowish tone, sweats easily', humor: 'safrawi' },
      { id: 'opt2', textUr: 'جلد نرم، سفید و ٹھنڈی اور جسم میں موٹاپے کا رجحان', textEn: 'Soft, pale, cool skin, tendency to gain weight', humor: 'balghami' },
      { id: 'opt3', textUr: 'جلد سرخی مائل، پٹھے مضبوط اور نبض پرجوش', textEn: 'Ruddy reddish skin, muscular tone, strong pulse', humor: 'damvi' },
      { id: 'opt4', textUr: 'جلد خشک، کھرری، گندمی یا سیاہی مائل اور دبلا پتلا جسم', textEn: 'Dry rough skin, darker tint, lean slender build', humor: 'saudawi' },
    ]
  }
];

const mizajDatabase: Record<string, MizajResult> = {
  safrawi: {
    temperament: 'safrawi',
    titleUr: 'صفراوی مزاج (گرم خشک - Choleric)',
    titleEn: 'Safrawi Temperament (Hot & Dry)',
    natureUr: 'آگ کی خاصیت — حرارت و خشکی کا غلبہ',
    natureEn: 'Fiery nature — Dominance of Heat and Dryness',
    characteristicsUr: [
      'جسم میں گرمی، پیاس کی شدت اور تیز نبض',
      'فوری فیصلہ سازی اور چست و متحرک طبیعت',
      'یرقان، پیشاب کی جلن یا سینے کی تیزابیت کا رجحان'
    ],
    characteristicsEn: [
      'Internal warmth, intense thirst and brisk pulse',
      'Sharp intellect, proactive and decisive behavior',
      'Predisposition to acidity, bile heat, and dehydration'
    ],
    beneficialFoodsUr: ['تربوز، کھیرا، ککڑی، مولی', 'شربتِ بزوری، عرق گلاب', 'جو کا دلیہ، دہی کی لسی', 'انار، کینو، آلو بخارہ'],
    beneficialFoodsEn: ['Watermelon, Cucumber, Radish', 'Sharbat Bazoori, Rose Water', 'Barley porridge, Yogurt drink', 'Pomegranate, Plum'],
    foodsToAvoidUr: ['سرخ مرچ، تلی ہوئی اشیاء', 'بڑا گوشت (بیف)، مچھلی کا کثرت سے استعمال', 'گرم مصالحہ جات اور انڈے کی زردی'],
    foodsToAvoidEn: ['Red chillies, deep-fried foods', 'Excessive red meat and spicy fish', 'Hot spices and egg yolks'],
    recommendedHerbsUr: ['عرقِ گلاب', 'شربتِ بزوری معتدل', 'تخم ملنگا و اسپغول'],
    recommendedHerbsEn: ['Damascene Rose Water', 'Sharbat-e-Bazoori', 'Basil Seeds & Psyllium Husk'],
    matchedProductIds: ['arq-e-gulab-khas', 'sharbat-e-bazoori-motadil']
  },
  balghami: {
    temperament: 'balghami',
    titleUr: 'بلغمائی مزاج (سرد تر - Phlegmatic)',
    titleEn: 'Balghami Temperament (Cold & Moist)',
    natureUr: 'پانی کی خاصیت — رطوبت اور ٹھنڈک کا غلبہ',
    natureEn: 'Watery nature — Dominance of Moisture and Cold',
    characteristicsUr: [
      'سردی کا زیادہ لگنا اور سستی و کاہلی کا رجحان',
      'رطوبات، بلغم، نزلہ زکام اور جوڑوں کے درد کا خطرہ',
      'پرسکون، ٹھنڈے مزاج اور صابر طبیعت'
    ],
    characteristicsEn: [
      'High sensitivity to cold and tendency toward lethargy',
      'Predisposition to excess mucus, joint aches, and congestion',
      'Calm, patient, steady and peaceful disposition'
    ],
    beneficialFoodsUr: ['خالص بیری کا شہد، ادرک، دارچینی', 'مغز بادام، پستہ، چلغوزہ', 'دیسی مرغ کی یخنی، کالی مرچ', 'گرم قہوہ جات، زیتون کا تیل'],
    beneficialFoodsEn: ['Pure Sidr Honey, Ginger, Cinnamon', 'Almonds, Pistachios, Walnuts', 'Desi chicken broth with black pepper', 'Herbal teas, Olive oil'],
    foodsToAvoidUr: ['چاول، دہی، ٹھنڈا پانی، آئس کریم', 'ماش کی دال، کیلا، کدو'],
    foodsToAvoidEn: ['White rice, curd, cold iced water', 'Heavy legumes, bananas, cold vegetables'],
    recommendedHerbsUr: ['خالص بیری شہد', 'معجون سرنجان', 'سفوف ہاضم'],
    recommendedHerbsEn: ['Pure Sidr Honey', 'Majoon Suranjan', 'Safoof-e-Hazim'],
    matchedProductIds: ['pure-sidr-honey', 'majoon-suranjan-khas']
  },
  damvi: {
    temperament: 'damvi',
    titleUr: 'دموی مزاج (گرم تر - Sanguine)',
    titleEn: 'Damvi Temperament (Hot & Moist)',
    natureUr: 'ہوا کی خاصیت — خون اور حرارتِ غریزیہ کا کمال',
    natureEn: 'Airy nature — Rich blood circulation and vitality',
    characteristicsUr: [
      'چہرہ سرخ و شاداب، جسم بھرا ہوا اور توانا',
      'خوش مزاج، پرجوش اور ملنسار',
      'بلڈ پریشر اور خون کے جوش کا امکان'
    ],
    characteristicsEn: [
      'Ruddy glowing complexion, robust physique',
      'Sociable, optimistic, warm and enthusiastic',
      'Susceptible to high blood pressure and vascular congestion'
    ],
    beneficialFoodsUr: ['سیب، انار، ناشپاتی، گاجر', 'عرق مکو و کاسنی', 'گندم کی روٹی، سبزیاں', 'سبز چائے اور لیموں پانی'],
    beneficialFoodsEn: ['Apples, Pomegranates, Carrots', 'Chicory distillate', 'Whole wheat, green veggies', 'Green tea and lemon water'],
    foodsToAvoidUr: ['چکنائی والے کھانے، زیادہ میٹھا', 'بڑا گوشت اور بیکری مصنوعات'],
    foodsToAvoidEn: ['Heavy oily foods, excessive refined sweets', 'Excess red meat and bakery items'],
    recommendedHerbsUr: ['خمیرہ گاؤزبان عنبری', 'عرقِ گلاب', 'تخم کاسنی'],
    recommendedHerbsEn: ['Khamira Gaozaban', 'Rose Water', 'Chicory Seeds'],
    matchedProductIds: ['khamira-gaozaban-ambari', 'arq-e-gulab-khas']
  },
  saudawi: {
    temperament: 'saudawi',
    titleUr: 'سوداوی مزاج (سرد خشک - Melancholic)',
    titleEn: 'Saudawi Temperament (Cold & Dry)',
    natureUr: 'مٹی کی خاصیت — خشکی اور برودت کا غلبہ',
    natureEn: 'Earthy nature — Dominance of Dryness and Cold',
    characteristicsUr: [
      'جلد خشک اور دبلا پتلا جسم',
      'گہری سوچیں، بے خوابی، وسوسے اور قبض',
      'محنتی، سنجیدہ اور تخلیقی ذہن'
    ],
    characteristicsEn: [
      'Dry skin and lean slender frame',
      'Prone to deep rumination, insomnia and constipation',
      'Detail-oriented, serious, creative and analytical'
    ],
    beneficialFoodsUr: ['نیم گرم دودھ میں دیسی گھی یا روغن بادام', 'پالک، مونگ کی دال، بکرے کا گوشت', 'سیب، انگور، انجیر، منقیٰ', 'بادام کا حلوہ'],
    beneficialFoodsEn: ['Warm milk with pure Desi Ghee or Almond oil', 'Spinach, Moong dal, Mutton broth', 'Apples, Fresh Grapes, Figs, Raisins', 'Almond halwa'],
    foodsToAvoidUr: ['بینگن، چنا، پکوڑے، سموسے', 'چائے، کافی، کولڈ ڈرنکس اور سگریٹ'],
    foodsToAvoidEn: ['Eggplant, Chickpeas, fried snacks', 'Excess tea, coffee, sodas'],
    recommendedHerbsUr: ['روغنِ بالاں خاص', 'معجون شبابِ خاص', 'خمیرہ گاؤزبان'],
    recommendedHerbsEn: ['Roghan-e-Balan', 'Majoon Shabab-e-Khas', 'Khamira Gaozaban'],
    matchedProductIds: ['roghan-e-balan-hair-oil', 'majoon-shabab-khas']
  }
};

interface MizajQuizProps {
  onSelectProduct: (product: Product) => void;
}

export const MizajQuiz: React.FC<MizajQuizProps> = ({ onSelectProduct }) => {
  const { isUrdu, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<MizajResult | null>(null);

  const handleSelectOption = (questionId: string, humor: string) => {
    const nextAnswers = { ...answers, [questionId]: humor };
    setAnswers(nextAnswers);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate winner humor
      const counts: Record<string, number> = { safrawi: 0, balghami: 0, damvi: 0, saudawi: 0 };
      Object.values(nextAnswers).forEach((h) => {
        counts[h] = (counts[h] || 0) + 1;
      });

      let topHumor = 'safrawi';
      let maxCount = -1;
      Object.entries(counts).forEach(([humor, count]) => {
        if (count > maxCount) {
          maxCount = count;
          topHumor = humor;
        }
      });

      setResult(mizajDatabase[topHumor] || mizajDatabase.safrawi);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  const currentQ = quizQuestions[currentStep] || quizQuestions[0];

  return (
    <section id="mizaj-quiz" className="py-14 bg-gradient-to-b from-emerald-50/50 via-white to-emerald-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{t('یونانی حکمت کی رو سے اپنا مزاج جانیں', 'Discover Your Tibbi Temperament')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
            {t('طبی مزاج تشخیصی ٹیسٹ (Mizaj Assessment)', 'Tibbi Temperament (Mizaj) Diagnostic Quiz')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
            {t(
              '4 سادہ سوالات کے جواب دیں اور معلوم کریں کہ آپ کا جسمانی مزاج کیا ہے اور آپ کے لیے کون سی غذائیں اور جڑی بوٹیاں مفید ہیں۔',
              'Answer 4 simple questions to discover your body temperament and get customized diet and herbal remedy advice.'
            )}
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-emerald-600/20 relative overflow-hidden">
          {!result ? (
            <div>
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                  <span>
                    {t('سوال', 'Question')} {currentStep + 1} {t('از', 'of')} {quizQuestions.length}
                  </span>
                  <span>{Math.round(((currentStep + 1) / quizQuestions.length) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-600 to-amber-500 transition-all duration-300 rounded-full"
                    style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl font-bold text-emerald-950 mb-6 leading-snug">
                {isUrdu ? currentQ.questionUr : currentQ.questionEn}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3.5">
                {currentQ.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(currentQ.id, opt.humor)}
                    className="w-full text-right rtl:text-right ltr:text-left p-4 sm:p-5 rounded-2xl border-2 border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/60 transition-all flex items-center justify-between group shadow-xs cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-slate-800 group-hover:text-emerald-950">
                      {isUrdu ? opt.textUr : opt.textEn}
                    </span>
                    <span className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-emerald-600 group-hover:bg-emerald-600 flex items-center justify-center shrink-0 transition-colors">
                      <Check className="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Screen */
            <div className="space-y-8 animate-fadeIn">
              <div className="text-center border-b border-emerald-100 pb-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-900 text-amber-400 mx-auto flex items-center justify-center shadow-lg mb-3">
                  <Sparkles className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                  {t('تشخیصی نتیجہ', 'Your Diagnostic Result')}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-emerald-950 mt-1">
                  {isUrdu ? result.titleUr : result.titleEn}
                </h3>
                <p className="text-sm font-semibold text-emerald-800 mt-1">
                  {isUrdu ? result.natureUr : result.natureEn}
                </p>
              </div>

              {/* Characteristics & Dietary Guide */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Beneficial Foods */}
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5">
                  <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-2 mb-3">
                    <Apple className="w-4 h-4 text-emerald-700" />
                    <span>{t('مفید و شفا بخش غذائیں (Recommended Diet)', 'Beneficial Foods')}</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                    {(isUrdu ? result.beneficialFoodsUr : result.beneficialFoodsEn).map((food, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                        <span>{food}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Foods to Avoid */}
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5">
                  <h4 className="font-bold text-amber-950 text-sm flex items-center gap-2 mb-3">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <span>{t('پرہیز و احتیاط (Foods to Avoid)', 'Foods to Avoid')}</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                    {(isUrdu ? result.foodsToAvoidUr : result.foodsToAvoidEn).map((food, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0"></span>
                        <span>{food}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommended Products */}
              <div className="bg-white rounded-2xl border-2 border-emerald-300 p-5 shadow-xs">
                <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-2 mb-4">
                  <ShoppingBag className="w-4 h-4 text-emerald-700" />
                  <span>{t('آپ کے مزاج کے لیے خصوصی مفید ادویات', 'Specially Recommended Herbal Medicines')}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {productsData
                    .filter((p) => result.matchedProductIds.includes(p.id))
                    .map((product) => (
                      <div
                        key={product.id}
                        onClick={() => onSelectProduct(product)}
                        className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-200 hover:border-emerald-500 transition-all cursor-pointer group"
                      >
                        <img
                          src={product.image}
                          alt={product.nameEn}
                          className="w-14 h-14 rounded-lg object-cover border border-emerald-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-xs sm:text-sm text-emerald-950 truncate group-hover:text-emerald-700">
                            {isUrdu ? product.nameUr : product.nameEn}
                          </h5>
                          <span className="text-xs font-black text-amber-700 block mt-0.5">
                            Rs. {product.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Reset Button */}
              <div className="text-center pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors inline-flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t('دوبارہ ٹیسٹ کریں', 'Retake Quiz')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
