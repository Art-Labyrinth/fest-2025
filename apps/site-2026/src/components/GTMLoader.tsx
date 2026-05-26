import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GTM_ID = 'GTM-WGJVLZWW';
const META_PIXEL_ID = '1549796436578301';

/** GTM не загружается на всех страницах /contribute* */
function isGtmBlocked(pathname: string): boolean {
  return pathname === '/contribute' || pathname.startsWith('/contribute/');
}

/** Meta Pixel не загружается только на странице сброса пароля */
function isPixelBlocked(pathname: string): boolean {
  return pathname === '/contribute/password-reset' || pathname.startsWith('/contribute/password-reset/');
}

let gtmLoaded = false;
let metaPixelLoaded = false;

/**
 * Динамически загружает GTM и Meta Pixel, отслеживает SPA-навигацию.
 * GTM заблокирован на всех /contribute*, Meta Pixel — только на /contribute/password-reset.
 */
export default function AnalyticsLoader() {
  const { pathname } = useLocation();

  useEffect(() => {
    // --- Google Tag Manager ---
    if (!isGtmBlocked(pathname)) {
      if (!gtmLoaded) {
        gtmLoaded = true;

        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

        const gtmScript = document.createElement('script');
        gtmScript.async = true;
        gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
        document.head.appendChild(gtmScript);

        const gtmNoscript = document.createElement('noscript');
        const gtmIframe = document.createElement('iframe');
        gtmIframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
        gtmIframe.height = '0';
        gtmIframe.width = '0';
        gtmIframe.style.display = 'none';
        gtmIframe.style.visibility = 'hidden';
        gtmNoscript.appendChild(gtmIframe);
        document.body.insertBefore(gtmNoscript, document.body.firstChild);
      }

      (window as any).dataLayer?.push({ event: 'pageview', pagePath: pathname });
    }

    // --- Meta Pixel ---
    if (!isPixelBlocked(pathname)) {
      if (!metaPixelLoaded) {
        metaPixelLoaded = true;

        const win = window as any;
        if (!win.fbq) {
          const fbq: any = function (...args: any[]) {
            fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args);
          };
          win.fbq = fbq;
          win._fbq = fbq;
          fbq.push = fbq;
          fbq.loaded = true;
          fbq.version = '2.0';
          fbq.queue = [];
        }

        const fbScript = document.createElement('script');
        fbScript.async = true;
        fbScript.src = 'https://connect.facebook.net/en_US/fbevents.js';
        document.head.appendChild(fbScript);

        // Резервный пиксель для браузеров без JS
        const fbNoscript = document.createElement('noscript');
        const fbImg = document.createElement('img');
        fbImg.height = 1;
        fbImg.width = 1;
        fbImg.style.display = 'none';
        fbImg.src = `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`;
        fbNoscript.appendChild(fbImg);
        document.body.insertBefore(fbNoscript, document.body.firstChild);

        (win.fbq as any)('init', META_PIXEL_ID);
      }

      (window as any).fbq?.('track', 'PageView');
    }
  }, [pathname]);

  return null;
}
