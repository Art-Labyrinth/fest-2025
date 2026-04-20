export type OrderType = 'basic' | 'discounted' | 'family';
export type View = 'orders' | 'newOrder';
export type PriceStageKey = 'april' | 'may' | 'june' | 'july';

export interface TicketDraft {
  name: string;
  send_email: boolean;
  email: string;
}

export const PRICES_BY_STAGE: Record<Exclude<PriceStageKey, 'july'>, Record<OrderType, number>> = {
  april: { basic: 400, discounted: 350, family: 300 },
  may: { basic: 500, discounted: 425, family: 350 },
  june: { basic: 600, discounted: 500, family: 400 },
};

export function getCurrentPriceStage(date = new Date()): PriceStageKey {
  const month = date.getMonth();

  if (month <= 4) return 'april';
  if (month === 5) return 'may';
  if (month > 5) return 'june';
  return 'july';
}

export function langForApi(lang: string): string {
  return lang === 'md' ? 'ro' : lang;
}

export function makeDraft(email: string, name = ''): TicketDraft {
  return { name, send_email: true, email };
}