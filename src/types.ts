export type Language = 'ur' | 'en';

export interface Product {
  id: string;
  nameUr: string;
  nameEn: string;
  category: 'majoon' | 'arqiat' | 'safoof' | 'honey_syrup' | 'oils' | 'vitality';
  categoryUr: string;
  categoryEn: string;
  price: number;
  weight: string;
  weightUr: string;
  descriptionUr: string;
  descriptionEn: string;
  benefitsUr: string[];
  benefitsEn: string[];
  ingredientsUr: string[];
  ingredientsEn: string[];
  dosageUr: string;
  dosageEn: string;
  image: string;
  inStock: boolean;
  featured: boolean;
  badgeUr?: string;
  badgeEn?: string;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Remedy {
  id: string;
  titleUr: string;
  titleEn: string;
  categoryUr: string;
  categoryEn: string;
  ailmentUr: string;
  ailmentEn: string;
  symptomsUr: string[];
  symptomsEn: string[];
  ingredientsUr: string[];
  ingredientsEn: string[];
  preparationUr: string;
  preparationEn: string;
  usageUr: string;
  usageEn: string;
  precautionUr: string;
  precautionEn: string;
  recommendedProductIds?: string[];
}

export interface MizajResult {
  temperament: 'damvi' | 'balghami' | 'safrawi' | 'saudawi';
  titleUr: string;
  titleEn: string;
  natureUr: string;
  natureEn: string;
  characteristicsUr: string[];
  characteristicsEn: string[];
  beneficialFoodsUr: string[];
  beneficialFoodsEn: string[];
  foodsToAvoidUr: string[];
  foodsToAvoidEn: string[];
  recommendedHerbsUr: string[];
  recommendedHerbsEn: string[];
  matchedProductIds: string[];
}

export interface ConsultationSubmission {
  id: string;
  patientName: string;
  phone: string;
  age: string;
  gender: 'male' | 'female' | 'other';
  city: string;
  consultationType: 'whatsapp_call' | 'clinic_visit' | 'home_delivery';
  symptoms: string;
  duration: string;
  prescriptionImage?: string;
  timestamp: string;
  status: 'new' | 'in_progress' | 'completed';
}

export interface Review {
  id: string;
  nameUr: string;
  nameEn: string;
  cityUr: string;
  cityEn: string;
  treatmentUr: string;
  treatmentEn: string;
  commentUr: string;
  commentEn: string;
  rating: number;
  date: string;
  verified: boolean;
}

export interface NotificationItem {
  id: string;
  titleUr: string;
  titleEn: string;
  messageUr: string;
  messageEn: string;
  time: string;
  type: 'announcement' | 'health_tip' | 'discount';
  read: boolean;
}
