export async function sha256(input: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

type FacebookUserData = {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    externalId?: string;
};

export async function SendFacebookEvent({
    pixelId,
    eventName,
    value,
    currency,
    contentName,
    contentIds,
    externalId,
    userData = {},
}: { pixelId: string; eventName: string; value?: number | string; currency?: string; contentName?: string; contentIds?: string; externalId?: string; userData?: FacebookUserData; }) {
    if (!pixelId || !eventName) {
        console.warn('sendFacebookEvent: pixelId and eventName necessarily');
        return;
    }

    const url = new URL('https://www.facebook.com/tr');
    const fbclid = localStorage.getItem('fbclid') || undefined;
    url.searchParams.set('id', pixelId);
    url.searchParams.set('ev', eventName);

    if (value !== undefined) url.searchParams.set('cd[value]', String(value));
    if (currency) url.searchParams.set('cd[currency]', currency);
    if (contentName) url.searchParams.set('cd[content_name]', contentName);
    if (contentIds) url.searchParams.set('cd[content_ids]', contentIds);
    if (externalId) url.searchParams.set('external_id', externalId);
    if (fbclid) url.searchParams.set('fbclid', fbclid);

    const userFields = {
        em: userData.email,
        ph: userData.phone,
        fn: userData.firstName,
        ln: userData.lastName,
        external_id: userData.externalId
    };

    for (const [key, value] of Object.entries(userFields)) {
        if (value) {
            const normalized = value.toLowerCase().trim();
            const hashed = await sha256(normalized);
            url.searchParams.set(key, hashed);
        }
    }

    const img = new Image();
    img.src = url.toString();
}
