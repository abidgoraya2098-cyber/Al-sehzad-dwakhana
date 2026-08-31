// Cloud Synchronization Service for Al-Shehzad Dawakhana & Clinic
// Enables real-time synchronization of Hakeem profile, registration details, clinic open/closed status, and medicine inventory across all devices and visitors.

import { HakeemSettings, Product } from '../types';

const API_BASE = 'https://api.restful-api.dev/objects';
const DEFAULT_SETTINGS_DOC_ID = 'ff808181a04ccf2d01a056bcc657225c';
const DEFAULT_PRODUCTS_DOC_ID = 'ff808181a04ccf2d01a052dc72b21777';

const STORAGE_SETTINGS_DOC_KEY = 'dawakhana_settings_cloud_doc_id';
const STORAGE_PRODUCTS_DOC_KEY = 'dawakhana_products_cloud_doc_id';

function getSettingsDocId(): string {
  try {
    return localStorage.getItem(STORAGE_SETTINGS_DOC_KEY) || DEFAULT_SETTINGS_DOC_ID;
  } catch {
    return DEFAULT_SETTINGS_DOC_ID;
  }
}

function getProductsDocId(): string {
  try {
    return localStorage.getItem(STORAGE_PRODUCTS_DOC_KEY) || DEFAULT_PRODUCTS_DOC_ID;
  } catch {
    return DEFAULT_PRODUCTS_DOC_ID;
  }
}

// Safe UTF-8 Encoder to protect Urdu text from corruption across remote APIs
function safeEncode(data: any): string {
  try {
    return encodeURIComponent(JSON.stringify(data));
  } catch {
    return '';
  }
}

// Safe UTF-8 Decoder
function safeDecode<T>(encodedStr: string): T | null {
  try {
    if (!encodedStr || typeof encodedStr !== 'string') return null;
    return JSON.parse(decodeURIComponent(encodedStr)) as T;
  } catch {
    return null;
  }
}

// Broadcast Channel for Instant 0ms Sync across tabs and windows
export const liveSyncChannel =
  typeof window !== 'undefined' && typeof BroadcastChannel !== 'undefined'
    ? new BroadcastChannel('dawakhana_live_sync_v2')
    : null;

export function broadcastLocalUpdate(type: 'SETTINGS_UPDATED' | 'PRODUCTS_UPDATED' | 'ALL_UPDATED') {
  try {
    if (liveSyncChannel) {
      liveSyncChannel.postMessage({ type, timestamp: Date.now() });
    }
  } catch (err) {
    console.debug('Broadcast error:', err);
  }
}

// Sanitize Hakeem settings to guarantee National Council for Tibb and PHC numbers are strictly authentic
export function sanitizeHakeemSettings(settings: Partial<HakeemSettings>): Partial<HakeemSettings> {
  const isCorruptedUrdu = (str?: string) => !str || str.includes('????') || str.trim().length === 0;

  return {
    ...settings,
    nameUr: isCorruptedUrdu(settings.nameUr) ? 'حکیم نواز احمد' : settings.nameUr,
    nameEn: settings.nameEn || 'Hakim Nawaz Ahmad',
    titleUr: isCorruptedUrdu(settings.titleUr) ? 'حکیم حاذق، ماہر نباض و معالج (رجسٹرڈ)' : settings.titleUr,
    degreeUr: isCorruptedUrdu(settings.degreeUr) ? 'D.H.M.S, F.T.J, R.M.P' : settings.degreeUr,
    // National Council for Tibb strictly QH-34430-A
    regNo: (!settings.regNo || settings.regNo === 'NCT-89423' || settings.regNo === 'NCT-UPDATED') ? 'QH-34430-A' : settings.regNo,
    // Punjab Healthcare Commission strictly R-63608
    phcRegNo: settings.phcRegNo || 'R-63608',
    awardUr: settings.awardUr || 'Best Performance Award Holder',
    phone: settings.phone || '0300-6458169',
    whatsapp: settings.whatsapp || '923006458169',
    addressUr: isCorruptedUrdu(settings.addressUr) ? 'چندا قلعہ چوک نزد نعیم الیکٹرونکس گوجرانوالہ' : settings.addressUr,
    addressEn: settings.addressEn || 'Chanda Qila Chowk, Near Naeem Electronics, Gujranwala',
    clinicTimingsUr: isCorruptedUrdu(settings.clinicTimingsUr) ? 'صبح 10:00 تا 02:00 بجے • شام 04:00 تا 08:00 بجے (جمعہ ناغہ)' : settings.clinicTimingsUr,
    clinicTimingsEn: settings.clinicTimingsEn || '10:00 AM - 02:00 PM & 04:00 PM - 08:00 PM (Friday Closed)',
    avatarUrl: settings.avatarUrl || '/hakeem-nawaz.jpg',
    visitingCardImage: '/hakeem-visiting-card.jpg',
    experienceYears: settings.experienceYears || '35+',
  };
}

// 1. Fetch live Hakeem Settings from Cloud
export async function fetchHakeemSettingsFromCloud(): Promise<Partial<HakeemSettings> | null> {
  try {
    const docId = getSettingsDocId();
    const res = await fetch(`${API_BASE}/${docId}?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json && json.data) {
      if (json.data.encodedPayload) {
        const decoded = safeDecode<Partial<HakeemSettings>>(json.data.encodedPayload);
        if (decoded) {
          return sanitizeHakeemSettings(decoded);
        }
      }
      if (typeof json.data === 'object') {
        return sanitizeHakeemSettings(json.data as Partial<HakeemSettings>);
      }
    }
    return null;
  } catch (err) {
    console.warn('CloudSync: Could not fetch Hakeem settings from cloud (using local/cache):', err);
    return null;
  }
}

// 2. Save Hakeem Settings to Cloud (broadcasts to all users)
export async function syncHakeemSettingsToCloud(settings: HakeemSettings): Promise<boolean> {
  const sanitized = sanitizeHakeemSettings(settings) as HakeemSettings;
  const encodedPayload = safeEncode(sanitized);

  const payloadBody = {
    name: 'al_shehzad_hakeem_settings',
    data: {
      encodedPayload,
      regNo: 'QH-34430-A',
      phcRegNo: 'R-63608',
      phone: sanitized.phone,
      syncedAt: new Date().toISOString(),
    }
  };

  try {
    const docId = getSettingsDocId();
    let res = await fetch(`${API_BASE}/${docId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payloadBody)
    });

    if (!res.ok) {
      res = await fetch(`${API_BASE}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadBody)
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.id) {
          try {
            localStorage.setItem(STORAGE_SETTINGS_DOC_KEY, json.id);
          } catch {}
        }
      }
    }

    broadcastLocalUpdate('SETTINGS_UPDATED');
    return res.ok;
  } catch (err) {
    console.error('CloudSync: Failed to upload Hakeem settings to cloud:', err);
    broadcastLocalUpdate('SETTINGS_UPDATED');
    return false;
  }
}

// 3. Fetch live Products from Cloud
export async function fetchProductsFromCloud(): Promise<Product[] | null> {
  try {
    const docId = getProductsDocId();
    const res = await fetch(`${API_BASE}/${docId}?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json && json.data) {
      if (json.data.encodedPayload) {
        const decoded = safeDecode<{ products: Product[] }>(json.data.encodedPayload);
        if (decoded && Array.isArray(decoded.products) && decoded.products.length > 0) {
          return decoded.products;
        }
      }
      if (Array.isArray(json.data.products) && json.data.products.length > 0) {
        return json.data.products as Product[];
      }
    }
    return null;
  } catch (err) {
    console.warn('CloudSync: Could not fetch products from cloud (using local/cache):', err);
    return null;
  }
}

// 4. Save Products to Cloud (broadcasts to all users)
export async function syncProductsToCloud(products: Product[]): Promise<boolean> {
  const encodedPayload = safeEncode({ products });

  const payloadBody = {
    name: 'al_shehzad_products_inventory',
    data: {
      encodedPayload,
      count: products.length,
      syncedAt: new Date().toISOString(),
    }
  };

  try {
    const docId = getProductsDocId();
    let res = await fetch(`${API_BASE}/${docId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payloadBody)
    });

    if (!res.ok) {
      res = await fetch(`${API_BASE}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadBody)
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.id) {
          try {
            localStorage.setItem(STORAGE_PRODUCTS_DOC_KEY, json.id);
          } catch {}
        }
      }
    }

    broadcastLocalUpdate('PRODUCTS_UPDATED');
    return res.ok;
  } catch (err) {
    console.error('CloudSync: Failed to upload products to cloud:', err);
    broadcastLocalUpdate('PRODUCTS_UPDATED');
    return false;
  }
}
