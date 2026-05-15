export type OrderType = 'basic' | 'discounted' | 'family';
export type View = 'orders' | 'newOrder';
export type PriceStageKey = 'may' | 'june' | 'july';

export interface TicketDraft {
  name: string;
}

export const PRICES_BY_STAGE: Record<Exclude<PriceStageKey, 'july'>, Record<OrderType, number>> = {
  may: { basic: 600, discounted: 400, family: 500 },
  june: { basic: 700, discounted: 400, family: 600 },
};

export function getCurrentPriceStage(date = new Date()): PriceStageKey {
  const month = date.getMonth();
  const day = date.getDate();

  if (month === 4) return 'may';
  if (month === 5 && day < 15) return 'june';
  return 'july';
}

export function langForApi(lang: string): string {
  return lang === 'md' ? 'ro' : lang;
}

export function makeDraft(name = ''): TicketDraft {
  return { name };
}