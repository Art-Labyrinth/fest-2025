export type OrderType = 'basic' | 'discounted' | 'family';
export type View = 'orders' | 'newOrder';
export type PriceStageKey = 'may' | 'june' | 'july' | 'fest' | 'closed';

export interface TicketDraft {
  name: string;
}

export const PRICES_BY_STAGE: Record<Exclude<PriceStageKey, 'july' | 'closed'>, Record<OrderType, number>> = {
  may: { basic: 600, discounted: 400, family: 500 },
  june: { basic: 700, discounted: 400, family: 600 },
  fest: { basic: 800, discounted: 400, family: 600 },
};

// Festival on-site sales window, expressed as absolute instants. The +03:00
// offset is Europe/Chișinău summer time (EEST), correct for June. Using an ISO
// string with an explicit offset yields the right instant regardless of the
// visitor's local timezone.
const FEST_START = new Date('2026-06-18T00:00:00+03:00'); // start of June 18
const FEST_END = new Date('2026-06-20T16:00:00+03:00');   // June 20 16:00 — sales close

export function getCurrentPriceStage(date = new Date()): PriceStageKey {
  const month = date.getMonth();

  if (month === 4) return 'may';
  // June prices run right up to the festival — no gap before it starts.
  if (month === 5 && date < FEST_START) return 'june';
  // Full-price festival sales from the start of June 18 until June 20 16:00
  // (Europe/Chișinău). At 16:00 sharp and after, sales are closed.
  if (date >= FEST_START && date < FEST_END) return 'fest';
  return 'closed';
}

export function langForApi(lang: string): string {
  return lang === 'md' ? 'ro' : lang;
}

export function makeDraft(name = ''): TicketDraft {
  return { name };
}