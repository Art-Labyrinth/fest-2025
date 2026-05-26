// export const META_PIXEL_ID = '1220572229100482'; // Stratulat
export const META_PIXEL_ID = '1549796436578301'; // Graffex

const FBCLID_KEY = 'fb_clid';

/** Сохраняет fbclid в localStorage. Пустое значение игнорируется. */
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
  /** Только для тестирования через Meta Events Manager. Не использовать в продакшн. */
  test_event_code?: string;
}

/**
 * Собирает данные для Meta CAPI:
 * - pixel_id — идентификатор пикселя
 * - fbp — из cookie _fbp (устанавливается браузерным пикселем)
 * - fbc — из cookie _fbc (устанавливается при переходе с рекламы Meta)
 * - fbclid — сохранённый из URL при первом визите
 * - test_event_code — из REACT_APP_META_TEST_EVENT_CODE (только для тестов)
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
