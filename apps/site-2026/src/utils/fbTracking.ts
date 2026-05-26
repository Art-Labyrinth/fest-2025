const FBCLID_KEY = 'fb_clid';

/** Saves fbclid to localStorage. An empty value is ignored. */
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

/**
  * Returns data for Meta CAPI:
  * - fbp — from the _fbp cookie (set by the browser pixel)
  * - fbc — from the _fbc cookie (set when clicking through from a Meta ad)
  * - fbclid — saved from the URL on the first visit
  */
export function getFbTrackingData(): { fbp?: string; fbc?: string; fbclid?: string } {
    return {
        fbp: getCookie('_fbp') || undefined,
        fbc: getCookie('_fbc') || undefined,
        fbclid: getStoredFbclid() || undefined,
    };
}
