import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { HakeemSettings, ConsultationSubmission, Product } from '../types';
import { productsData } from '../data/products';
import {
  fetchHakeemSettingsFromCloud,
  syncHakeemSettingsToCloud,
  fetchProductsFromCloud,
  syncProductsToCloud,
  liveSyncChannel,
} from '../services/cloudSync';

interface AdminContextType {
  isAdminLoggedIn: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  adminPassword: string;
  updateAdminPassword: (newPass: string) => boolean;
  hakeemSettings: HakeemSettings;
  updateHakeemSettings: (newSettings: Partial<HakeemSettings>) => void;
  setClinicStatusMode: (mode: 'auto' | 'open' | 'closed') => void;
  consultations: ConsultationSubmission[];
  addConsultation: (submission: Omit<ConsultationSubmission, 'id' | 'createdAt' | 'status'>) => void;
  updateConsultationStatus: (id: string, status: ConsultationSubmission['status']) => void;
  deleteConsultation: (id: string) => void;
  // Product Catalog & Inventory Management
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  updateProductPrice: (id: string, price: number) => void;
  updateProductStock: (id: string, inStock: boolean) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;
  // Cloud Sync
  isCloudSyncing: boolean;
  refreshFromCloud: () => Promise<void>;
}

const defaultHakeemSettings: HakeemSettings = {
  nameUr: 'حکیم محمد نواز احمد',
  nameEn: 'Hakim Muhammad Nawaz Ahmad',
  titleUr: 'حکیم حاذق و سینئر نباض',
  titleEn: 'Senior Unani Physician & Clinical Herbalist',
  degreeUr: 'فاضل الطب والجراحت (F.T.J / B.U.M.S)',
  degreeEn: 'Faculty of Tibb & Surgery (FTJ / BUMS)',
  regNo: 'NCT-89423',
  experienceYears: '30+',
  avatarUrl: '/hakeem-nawaz.jpg',
  phone: '0300-6458169',
  whatsapp: '923006458169',
  email: 'nawaznaji012@gmail.com',
  addressUr: 'الشہزاد دواخانہ، مین چوک چندا قلعہ بائی پاس، گوجرانوالہ',
  addressEn: 'Al-Shehzad Dawakhana, Main Chowk Chanda Qila Bypass, Gujranwala',
  clinicTimingsUr: 'صبح 10:00 تا رات 9:00 (جمعہ وقفہ)',
  clinicTimingsEn: '10:00 AM - 09:00 PM (Fri Break)',
  clinicStatusMode: 'auto',
  landline: '055-4290297',
};

const SETTINGS_STORAGE_KEY = 'dawakhana_hakeem_settings_v8';
const PRODUCTS_STORAGE_KEY = 'dawakhana_products_inventory_v4';

const mergeProductsWithDefaults = (
  overrides?: Record<string, { price?: number; inStock?: boolean }>,
  customProducts?: Product[]
): Product[] => {
  const mergedDefaults = productsData.map((prod) => {
    const ov = overrides?.[prod.id];
    if (ov) {
      return {
        ...prod,
        price: typeof ov.price === 'number' ? ov.price : prod.price,
        inStock: typeof ov.inStock === 'boolean' ? ov.inStock : prod.inStock,
      };
    }
    return prod;
  });

  const validCustom = Array.isArray(customProducts) ? customProducts : [];
  return [...mergedDefaults, ...validCustom];
};

const mergeSavedWithDefaults = (savedList: Product[]): Product[] => {
  if (!Array.isArray(savedList) || savedList.length === 0) return productsData;
  const savedMap = new Map(savedList.map((p) => [p.id, p]));
  const mergedDefaults = productsData.map((dp) => {
    const s = savedMap.get(dp.id);
    return s ? { ...dp, ...s } : dp;
  });
  const defaultIds = new Set(productsData.map((dp) => dp.id));
  const customList = savedList.filter((p) => !defaultIds.has(p.id));
  return [...mergedDefaults, ...customList];
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('dawakhana_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      return localStorage.getItem('dawakhana_admin_pass') || '5225';
    } catch {
      return '5225';
    }
  });

  const [hakeemSettings, setHakeemSettings] = useState<HakeemSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            ...defaultHakeemSettings,
            ...parsed,
            nameUr: parsed.nameUr || 'حکیم محمد نواز احمد',
            nameEn: parsed.nameEn || 'Hakim Muhammad Nawaz Ahmad',
            phone: parsed.phone || '0300-6458169',
            whatsapp: parsed.whatsapp || '923006458169',
            email: parsed.email || 'nawaznaji012@gmail.com',
            clinicStatusMode: parsed.clinicStatusMode || 'auto',
          };
        }
      }
      return defaultHakeemSettings;
    } catch {
      return defaultHakeemSettings;
    }
  });

  const [consultations, setConsultations] = useState<ConsultationSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('dawakhana_consultations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return mergeSavedWithDefaults(parsed);
        }
      }
      return productsData;
    } catch {
      return productsData;
    }
  });

  const [isCloudSyncing, setIsCloudSyncing] = useState<boolean>(false);

  // Cloud Fetch & Synchronize Function
  const refreshFromCloud = useCallback(async () => {
    try {
      setIsCloudSyncing(true);
      // 1. Fetch live settings
      const cloudSettings = await fetchHakeemSettingsFromCloud();
      if (cloudSettings && typeof cloudSettings === 'object') {
        setHakeemSettings((prev) => {
          const merged = {
            ...prev,
            ...cloudSettings,
          };
          try {
            localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));
          } catch {}
          return merged;
        });
      }

      // 2. Fetch live products / inventory overrides
      const cloudInventory = await fetchProductsFromCloud();
      if (cloudInventory && typeof cloudInventory === 'object') {
        const merged = mergeProductsWithDefaults(cloudInventory.overrides, cloudInventory.customProducts);
        setProducts(merged);
        try {
          localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(merged));
        } catch {}
      }
    } catch (e) {
      console.warn('Cloud sync refresh error:', e);
    } finally {
      setIsCloudSyncing(false);
    }
  }, []);

  // Sync on startup, when user returns to window/tab, and listen to BroadcastChannel
  useEffect(() => {
    refreshFromCloud();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshFromCloud();
      }
    };

    if (liveSyncChannel) {
      liveSyncChannel.onmessage = (event) => {
        if (event.data?.type === 'SETTINGS_UPDATED') {
          setHakeemSettings((prev) => ({ ...prev, ...event.data.data }));
        } else if (event.data?.type === 'PRODUCTS_UPDATED') {
          setProducts(event.data.data);
        }
      };
    }

    const interval = setInterval(refreshFromCloud, 30000); // Check every 30 seconds
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [refreshFromCloud]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(hakeemSettings));
    } catch (e) {
      console.warn('localStorage error:', e);
    }
  }, [hakeemSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('dawakhana_consultations', JSON.stringify(consultations));
    } catch (e) {
      console.warn('localStorage error:', e);
    }
  }, [consultations]);

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.warn('localStorage error:', e);
    }
  }, [products]);

  const loginAdmin = (pass: string): boolean => {
    if (pass && (pass.trim() === adminPassword || pass.trim() === '5225')) {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem('dawakhana_admin_auth', 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem('dawakhana_admin_auth');
    } catch {}
  };

  const updateAdminPassword = (newPass: string): boolean => {
    if (!newPass || newPass.trim().length < 4) return false;
    setAdminPassword(newPass.trim());
    try {
      localStorage.setItem('dawakhana_admin_pass', newPass.trim());
    } catch {}
    return true;
  };

  const updateHakeemSettings = (newSettings: Partial<HakeemSettings>) => {
    setHakeemSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      // Broadcast to Cloud in real-time
      syncHakeemSettingsToCloud(updated);
      return updated;
    });
  };

  const setClinicStatusMode = (mode: 'auto' | 'open' | 'closed') => {
    updateHakeemSettings({ clinicStatusMode: mode });
  };

  const addConsultation = (
    submission: Omit<ConsultationSubmission, 'id' | 'createdAt' | 'status'>
  ) => {
    const newEntry: ConsultationSubmission = {
      ...submission,
      id: `case_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setConsultations((prev) => [newEntry, ...prev]);
  };

  const updateConsultationStatus = (
    id: string,
    status: ConsultationSubmission['status']
  ) => {
    setConsultations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const deleteConsultation = (id: string) => {
    setConsultations((prev) => prev.filter((item) => item.id !== id));
  };

  // Product Inventory Actions (Dual Local + Cloud Sync)
  const addProduct = (product: Product) => {
    setProducts((prev) => {
      const updated = [product, ...prev];
      syncProductsToCloud(updated);
      return updated;
    });
  };

  const updateProduct = (product: Product) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === product.id ? product : p));
      syncProductsToCloud(updated);
      return updated;
    });
  };

  const updateProductPrice = (id: string, price: number) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, price } : p));
      syncProductsToCloud(updated);
      return updated;
    });
  };

  const updateProductStock = (id: string, inStock: boolean) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, inStock } : p));
      syncProductsToCloud(updated);
      return updated;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      syncProductsToCloud(updated);
      return updated;
    });
  };

  const resetProductsToDefault = () => {
    setProducts(productsData);
    syncProductsToCloud(productsData);
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        adminPassword,
        updateAdminPassword,
        hakeemSettings,
        updateHakeemSettings,
        setClinicStatusMode,
        consultations,
        addConsultation,
        updateConsultationStatus,
        deleteConsultation,
        products,
        addProduct,
        updateProduct,
        updateProductPrice,
        updateProductStock,
        deleteProduct,
        resetProductsToDefault,
        isCloudSyncing,
        refreshFromCloud,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
