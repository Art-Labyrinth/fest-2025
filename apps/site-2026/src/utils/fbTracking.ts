// export const META_PIXEL_ID = '1220572229100482'; // Stratulat
export const META_PIXEL_ID = '1549796436578301'; // Graffex

const FBCLID_KEY = 'fb_clid';

export function saveFbclid(value: string): void {
  if (value) {
    localStorage.setItem(FBCLID_KEY, value);
  }
}

export function getStoredFbclid(): string | null {
  return localStorage.getItem(FBCLID_KEY);
}

function getCookie(name: string): string | undefined {
  return document.cookie
    .split('; ')
    .find(c => c.startsWith(`${name}=`))
    ?.split('=')[1];
}

export interface FbTrackingData {
  pixel_id: string;
  fbp?: string;
  fbc?: string;
  fbclid?: string;
  test_event_code?: string;
}

/**
  * Collects data for Meta CAPI:
  * - pixel_id — pixel ID
  * - fbp — from the _fbp cookie (set by the browser pixel)
  * - fbc — from the _fbc cookie (set when clicking through from a Meta ad)
  * - fbclid — saved from the URL during the first visit
  * - test_event_code — from REACT_APP_META_TEST_EVENT_CODE (for tests only)
  */
export function getFbTrackingData(): FbTrackingData {
  const testEventCode = process.env.REACT_APP_META_TEST_EVENT_CODE;
  return {
    pixel_id: META_PIXEL_ID,
    fbp: getCookie('_fbp') || undefined,
    fbc: getCookie('_fbc') || undefined,
    fbclid: getStoredFbclid() || undefined,
    ...(testEventCode ? { test_event_code: testEventCode } : {}),
  };
}
