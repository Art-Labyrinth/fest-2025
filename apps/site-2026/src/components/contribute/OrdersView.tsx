import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { CustomerOrder } from '../../api/customerApi';
import { btnPrimary, btnSecondary } from './styles';

function copyText(value: string): Promise<void> {
  if (!navigator.clipboard?.writeText) {
    return Promise.resolve();
  }

  return navigator.clipboard.writeText(value).catch(() => undefined);
}

interface OrdersViewProps {
  orders: CustomerOrder[];
  ordersLoading: boolean;
  salesClosed: boolean;
  onLogout: () => void;
  onStartNewOrder: () => void;
  userEmail: string | null;
}

export default function OrdersView({
  orders,
  ordersLoading,
  salesClosed,
  onLogout,
  onStartNewOrder,
  userEmail,
}: OrdersViewProps) {
  const { t } = useTranslation();

  function handleCopyOrderId(orderId: number) {
    void copyText(`#${orderId}`);
  }

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

      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <h2 className="text-lg font-bold">{t('contribute.my_orders')}</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/contribute/tickets" className={`${btnSecondary} inline-flex items-center`}>
            {t('contribute.my_tickets')}
          </Link>
          <button type="button" className={btnPrimary} disabled={salesClosed} onClick={onStartNewOrder}>
            {salesClosed ? t('contribute.sales_closed') : t('contribute.new_order')}
          </button>
        </div>
      </div>

      {ordersLoading && <p className="text-center text-brown/50 py-10">{t('contribute.loading')}</p>}

      {!ordersLoading && orders.length === 0 && <p className="text-center text-brown/50 py-10">{t('contribute.no_orders')}</p>}

      <div className="space-y-3">
        {orders.map(order => (
          <div key={order.id} className="border border-brown/20 rounded-2xl p-4">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="text-md text-black block hover:opacity-70 transition-opacity"
                    onClick={() => handleCopyOrderId(order.id)}
                    title={String(t('contribute.copy_order_id'))}
                  >
                    ID: #{order.id}
                  </button>
                  <button
                    type="button"
                    className="text-xs text-brown/60 hover:text-brown transition-colors mb-1"
                    onClick={() => handleCopyOrderId(order.id)}
                    title={String(t('contribute.copy_order_id'))}
                    aria-label={String(t('contribute.copy_order_id'))}
                  >
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden="true">
                      <rect x="7" y="3" width="10" height="12" rx="2" />
                      <path d="M5 7H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1" />
                    </svg>
                  </button>
                </div>
                <span className="text-xs text-brown/50 block">
                  {new Date(order.created_at).toLocaleDateString()} · {order.amount} MDL
                </span>
                <span className={`text-sm font-bold ${order.status === 'paid' ? 'text-green-700' : 'text-orange-600'}`}>
                  {t(`contribute.status_${order.status}`, { defaultValue: order.status })}
                </span>
              </div>
              <div className="shrink-0">
                {order.status === 'paid' ? (
                  <Link
                    to={`/contribute/orders/${order.id}`}
                    className={`${btnPrimary} inline-flex items-center`}
                  >
                    {t('contribute.open_order')}
                  </Link>
                ) : order.invoice_url ? (
                  <a href={order.invoice_url} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} inline-flex items-center`}>
                    {t('contribute.pay')}
                  </a>
                ) : (
                  <button type="button" disabled className={`${btnPrimary} opacity-40 cursor-not-allowed`}>
                    {t('contribute.pay')}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}