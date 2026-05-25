import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GTM_ID = 'GTM-WGJVLZWW';

/** Routes on which GTM should not work (payments / account) */
function isBlockedPath(pathname: string): boolean {
  return pathname === '/contribute' || pathname.startsWith('/contribute/');
}

let gtmLoaded = false;

/**
 * Dynamically loads GTM and tracks SPA navigation.
 * On /contribute* routes, the script is not loaded and events are not sent.
 */
export default function GTMLoader() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (isBlockedPath(pathname)) return;

    if (!gtmLoaded) {
      gtmLoaded = true;

      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(script);

      // Fallback noscript fragment (for browsers without JS)
      const noscript = document.createElement('noscript');
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
      iframe.height = '0';
      iframe.width = '0';
      iframe.style.display = 'none';
      iframe.style.visibility = 'hidden';
      noscript.appendChild(iframe);
      document.body.insertBefore(noscript, document.body.firstChild);
    }

    // Page change event for SPA navigation
    (window as any).dataLayer?.push({
      event: 'pageview',
      pagePath: pathname,
    });
  }, [pathname]);

  return null;
}
