export type OrderType = 'basic' | 'discounted' | 'family';
export type View = 'orders' | 'newOrder';
export type PriceStageKey = 'april' | 'may' | 'june' | 'july';

export interface TicketDraft {
  name: string;
}

export const PRICES_BY_STAGE: Record<Exclude<PriceStageKey, 'july'>, Record<OrderType, number>> = {
  april: { basic: 400, discounted: 350, family: 300 },
  may: { basic: 500, discounted: 425, family: 350 },
  june: { basic: 600, discounted: 500, family: 400 },
};

export function getCurrentPriceStage(date = new Date()): PriceStageKey {
  const month = date.getMonth();
  const day = date.getDate();

  console.log('Current month:', month, 'day:', day);

  if (month === 3) return 'april';
  if (month === 4 && day < 15) return 'may';
  if (month === 4 || (month === 5 && day < 15)) return 'june';
  return 'july';
}

export function langForApi(lang: string): string {
  return lang === 'md' ? 'ro' : lang;
}

export function makeDraft(name = ''): TicketDraft {
  return { name };
}