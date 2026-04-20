import React from 'react';
import { useTranslation } from 'react-i18next';
import type { CustomerOrder } from '../../api/customerApi';
import { btnPrimary, btnSecondary } from './styles';

interface OrdersViewProps {
  orders: CustomerOrder[];
  ordersLoading: boolean;
  salesClosed: boolean;
  downloading: Set<string>;
  onLogout: () => void;
  onStartNewOrder: () => void;
  onDownload: (ticketId: string, name: string) => void;
  userEmail: string | null;
}

export default function OrdersView({
  orders,
  ordersLoading,
  salesClosed,
  downloading,
  onLogout,
  onStartNewOrder,
  onDownload,
  userEmail,
}: OrdersViewProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold font-roca">{t('contribute.title')}</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-brown/50 hidden sm:block truncate max-w-[200px]">{userEmail}</span>
          <button type="button" className={btnSecondary} onClick={onLogout}>{t('contribute.logout')}</button>
        </div>
      </div>

      <div className="text-center text-brown/50 mb-10">{t('contribute.description.auth')}</div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{t('contribute.my_orders')}</h2>
        <button type="button" className={btnPrimary} disabled={salesClosed} onClick={onStartNewOrder}>
          {salesClosed ? t('contribute.sales_closed') : t('contribute.new_order')}
        </button>
      </div>

      {ordersLoading && <p className="text-center text-brown/50 py-10">{t('contribute.loading')}</p>}

      {!ordersLoading && orders.length === 0 && <p className="text-center text-brown/50 py-10">{t('contribute.no_orders')}</p>}

      <div className="space-y-3">
        {orders.map(order => (
          <div key={order.id} className="border border-brown/20 rounded-2xl p-4">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div>
                <span className="text-xs text-brown/50 block">
                  {new Date(order.created_at).toLocaleDateString()} · {order.amount} MDL
                </span>
                <span className={`text-sm font-bold ${order.status === 'paid' ? 'text-green-700' : 'text-orange-600'}`}>
                  {t(`contribute.status_${order.status}`, { defaultValue: order.status })}
                </span>
              </div>
              {order.status !== 'paid' && (
                order.invoice_url ? (
                  <a href={order.invoice_url} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} inline-block`}>
                    {t('contribute.pay')}
                  </a>
                ) : (
                  <button type="button" disabled className={`${btnPrimary} opacity-40 cursor-not-allowed`}>
                    {t('contribute.pay')}
                  </button>
                )
              )}
            </div>

            <div className="space-y-2">
              {order.tickets.map(ticket => (
                <div key={ticket.id} className="flex flex-wrap items-center gap-2 pt-2 border-t border-brown/10">
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-brown/40 block">{ticket.ticket_id}</span>
                    <span className="text-sm font-bold truncate block">{ticket.name}</span>
                  </div>
                  {ticket.is_sold && (
                    <div className="flex gap-2 shrink-0">
                      <button
                        type="button"
                        className={`${btnSecondary} text-xs py-1 px-3`}
                        disabled={downloading.has(ticket.ticket_id)}
                        onClick={() => onDownload(ticket.ticket_id, ticket.name)}
                      >
                        {downloading.has(ticket.ticket_id) ? '...' : t('contribute.download')}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}