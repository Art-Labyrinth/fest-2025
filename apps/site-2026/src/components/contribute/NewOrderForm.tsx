import React from 'react';
import { useTranslation } from 'react-i18next';
import type { OrderType, PriceStageKey, TicketDraft } from './model';
import { btnPrimary, input } from './styles';

interface NewOrderFormProps {
  currentPriceStage: PriceStageKey;
  currentPrices: Record<OrderType, number> | null;
  orderError: string;
  orderEmail: string;
  orderLoading: boolean;
  orderSendEmail: boolean;
  orderType: OrderType;
  salesClosed: boolean;
  tickets: TicketDraft[];
  total: number;
  userEmail: string | null;
  onBack: () => void;
  onOrderEmailChange: (value: string) => void;
  onOrderSendEmailChange: (value: boolean) => void;
  onOrderTypeChange: (value: OrderType) => void;
  onSubmit: (event: React.FormEvent) => void;
  onTicketCountChange: (count: number) => void;
  onTicketUpdate: (index: number, patch: Partial<TicketDraft>) => void;
}

export default function NewOrderForm({
  currentPriceStage,
  currentPrices,
  orderError,
  orderEmail,
  orderLoading,
  orderSendEmail,
  orderType,
  salesClosed,
  tickets,
  total,
  userEmail,
  onBack,
  onOrderEmailChange,
  onOrderSendEmailChange,
  onOrderTypeChange,
  onSubmit,
  onTicketCountChange,
  onTicketUpdate,
}: NewOrderFormProps) {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center gap-3 mb-6">
        <button type="button" className="text-brown/60 hover:text-brown transition-colors text-sm cursor-pointer" onClick={onBack}>
          ← {t('contribute.back')}
        </button>
        <h2 className="text-lg font-bold">{t('contribute.new_order')}</h2>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-bold mb-2">{t('contribute.order_type')}</label>
        {!salesClosed && (
          <p className="text-sm text-brown/60 mb-3">
            {t('contribute.current_month_prices', { month: t(`contribute.month_${currentPriceStage}`) })}
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {(['basic', 'family', 'discounted'] as OrderType[]).map(type => {
            const disabled = salesClosed;

            return (
              <button
                key={type}
                type="button"
                disabled={disabled}
                onClick={() => !disabled && onOrderTypeChange(type)}
                className={`rounded-xl border p-3 text-left transition-colors ${disabled
                  ? 'opacity-40 cursor-not-allowed border-brown/20'
                  : `cursor-pointer ${orderType === type
                    ? 'border-brown bg-brown/10'
                    : 'border-brown/20 hover:border-brown/50'}`}`}
              >
                <span className="block font-bold text-sm">{t(`contribute.type_${type}`)}</span>
                <span className="block text-xs text-brown/60 mt-0.5">
                  {currentPrices ? `${currentPrices[type]} MDL` : t('contribute.sales_closed')}
                </span>
              </button>
            );
          })}
        </div>
        {!salesClosed && (
          <p className="text-sm text-brown/70 mt-3 leading-snug">{t(`contribute.type_${orderType}_desc`)}</p>
        )}
        {salesClosed && <p className="text-sm text-red-600 mt-3">{t('contribute.sales_closed_notice')}</p>}
      </div>

      <div className="mb-5">
        <label className="block text-sm font-bold mb-2">{t('contribute.quantity')}</label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="w-9 h-9 rounded-full border border-brown/30 text-brown font-bold hover:bg-brown/10 transition-colors cursor-pointer flex items-center justify-center"
            onClick={() => onTicketCountChange(tickets.length - 1)}
          >−</button>
          <span className="text-lg font-bold w-6 text-center">{tickets.length}</span>
          <button
            type="button"
            className="w-9 h-9 rounded-full border border-brown/30 text-brown font-bold hover:bg-brown/10 transition-colors cursor-pointer flex items-center justify-center"
            onClick={() => onTicketCountChange(tickets.length + 1)}
          >+</button>
        </div>
      </div>

      <div className="space-y-3 mb-5">
        {tickets.map((ticket, index) => (
          <div key={index} className="border border-brown/20 rounded-xl p-4">
            <p className="text-xs font-bold text-brown/50 mb-3">{t('contribute.ticket_n', { n: index + 1 })}</p>
            <div className="mb-3">
              <label className="block text-sm font-bold mb-1">
                {t('contribute.ticket_name')} <span className="text-xs text-brown/50">({t('contribute.ticket_name_hint')})</span>
              </label>
              <input
                type="text"
                className={input}
                value={ticket.name}
                maxLength={18}
                onChange={event => onTicketUpdate(index, { name: event.target.value })}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border border-brown/20 rounded-xl p-4 mb-5">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={orderSendEmail}
            onChange={event => onOrderSendEmailChange(event.target.checked)}
            className="accent-brown w-4 h-4"
          />
          <span className="text-sm font-bold">{t('contribute.send_email')}</span>
        </label>
        {orderSendEmail && (
          <input
            type="email"
            className={`${input} mt-2`}
            placeholder={userEmail || ''}
            value={orderEmail}
            onChange={event => onOrderEmailChange(event.target.value)}
          />
        )}
      </div>

      <div className="flex justify-between items-center py-3 border-t border-brown/20 mb-5">
        <span className="font-bold">{t('contribute.total')}</span>
        <span className="text-xl font-bold">{total} MDL</span>
      </div>

      {orderError && <p className="text-red-600 text-sm mb-4">{orderError}</p>}

      <button type="submit" className={`${btnPrimary} w-full`} disabled={orderLoading}>
        {orderLoading ? t('contribute.loading') : t('contribute.create_order')}
      </button>
      <p className="text-xs text-brown/50 text-center mt-3">{t('contribute.bpay_notice')}</p>
    </form>
  );
}