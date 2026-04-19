import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  customerApi,
  saveSession,
  clearSession,
  getStoredToken,
  getStoredEmail,
  CreateOrderBody,
  CustomerOrder,
} from '../api/customerApi';

type OrderType = 'guest' | 'discounted' | 'family';
type View = 'orders' | 'newOrder';

interface TicketDraft {
  name: string;
  send_email: boolean;
  email: string;
}

const PRICES: Record<OrderType, number> = { guest: 400, discounted: 400, family: 600 };

function langForApi(lang: string): string {
  return lang === 'md' ? 'ro' : lang;
}

function makeDraft(email: string): TicketDraft {
  return { name: '', send_email: true, email };
}

const card = 'w-full max-w-2xl rounded-3xl border border-brown/20 bg-orange-150/85 backdrop-blur-sm shadow-lg px-6 py-8 sm:px-10';
const input = 'w-full border border-brown/30 rounded-lg px-3 py-2 bg-orange-150/50 text-brown placeholder-brown/40 focus:outline-none focus:border-brown/60 text-sm';
const btnPrimary = 'bg-brown text-orange-150 text-sm font-bold py-2.5 px-6 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-40 cursor-pointer disabled:cursor-default';
const btnSecondary = 'border border-brown text-brown text-sm font-bold py-2.5 px-6 rounded-lg hover:bg-brown hover:text-orange-150 transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-default';

export default function Tickets() {
  const { t, i18n } = useTranslation();

  const [token, setToken] = useState(getStoredToken);
  const [userEmail, setUserEmail] = useState(getStoredEmail);

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [view, setView] = useState<View>('orders');
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const [orderType, setOrderType] = useState<OrderType>('guest');
  const [tickets, setTickets] = useState<TicketDraft[]>([makeDraft('')]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState('');

  const [downloading, setDownloading] = useState<Set<number>>(new Set());

  function logout() {
    clearSession();
    setToken(null);
    setUserEmail(null);
    setOrders([]);
  }

  const loadOrders = useCallback(async () => {
    setOrdersLoading(true);
    try {
      setOrders(await customerApi.getOrders());
    } catch (e: any) {
      if (e.message.includes('401') || e.message.includes('403')) logout();
    } finally {
      setOrdersLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) loadOrders();
  }, [token, loadOrders]);

  useEffect(() => {
    setTickets(prev => {
      const next = [...prev];
      while (next.length < 1) next.push(makeDraft(userEmail || ''));
      return next;
    });
  }, [userEmail]);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    try {
      const res = authMode === 'login'
        ? await customerApi.login(authEmail, authPassword)
        : await customerApi.register(authEmail, authPassword, langForApi(i18n.language), authName || undefined);
      saveSession(res.access_token, res.email);
      setToken(res.access_token);
      setUserEmail(res.email);
      setTickets([makeDraft(res.email)]);
    } catch (e: any) {
      setAuthError(e.message);
    } finally {
      setAuthLoading(false);
    }
  }

  function setTicketCount(n: number) {
    const count = Math.max(1, Math.min(20, n));
    setTickets(prev => {
      const next = [...prev];
      while (next.length < count) next.push(makeDraft(userEmail || ''));
      return next.slice(0, count);
    });
  }

  function updateTicket(i: number, patch: Partial<TicketDraft>) {
    setTickets(prev => prev.map((t, idx) => idx === i ? { ...t, ...patch } : t));
  }

  function calcTotal(): number {
    const base = PRICES[orderType];
    const discount = orderType === 'guest' && tickets.length >= 6 ? 0.9 : 1;
    return Math.round(base * discount * tickets.length);
  }

  async function handleCreateOrder(e: React.FormEvent) {
    e.preventDefault();
    setOrderError('');
    setOrderLoading(true);
    try {
      const body: CreateOrderBody = {
        type_order: orderType,
        lang: langForApi(i18n.language),
        tickets: tickets.map(t => ({
          name: t.name,
          send_email: t.send_email,
          ...(t.send_email && t.email && t.email !== userEmail ? { email: t.email } : {}),
        })),
      };
      const res = await customerApi.createOrder(body);
      window.location.href = res.invoice_url;
    } catch (e: any) {
      setOrderError(e.message);
      setOrderLoading(false);
    }
  }

  async function handleDownload(ticketId: number, name: string) {
    setDownloading(prev => new Set(prev).add(ticketId));
    try {
      const blob = await customerApi.downloadTicket(ticketId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ticket-${name}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {}
    setDownloading(prev => { const s = new Set(prev); s.delete(ticketId); return s; });
  }

  async function handlePrint(ticketId: number) {
    try {
      const blob = await customerApi.downloadTicket(ticketId);
      const url = URL.createObjectURL(blob);
      const win = window.open(url, '_blank');
      if (win) win.onload = () => { win.focus(); win.print(); };
    } catch {}
  }

  if (!token) {
    return (
      <main className="min-h-[calc(100vh-130px)] px-5 md:px-12 py-16 font-deledda text-brown flex items-center justify-center">
        <div className={card}>
          <h1 className="text-2xl sm:text-3xl font-bold font-roca mb-6 text-center">{t('tickets.title')}</h1>

          <div className="flex rounded-lg overflow-hidden border border-brown/20 mb-6">
            {(['login', 'register'] as const).map(mode => (
              <button
                key={mode}
                type="button"
                className={`flex-1 py-2 text-sm font-bold transition-colors cursor-pointer ${authMode === mode ? 'bg-brown text-orange-150' : 'text-brown hover:bg-brown/10'}`}
                onClick={() => { setAuthMode(mode); setAuthError(''); }}
              >
                {t(`tickets.${mode}`)}
              </button>
            ))}
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">{t('tickets.email')}</label>
              <input type="email" required className={input} value={authEmail} onChange={e => setAuthEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">{t('tickets.password')}</label>
              <input type="password" required minLength={8} className={input} value={authPassword} onChange={e => setAuthPassword(e.target.value)} />
            </div>
            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-bold mb-1">
                  {t('tickets.name')} <span className="font-normal text-brown/50">({t('tickets.optional')})</span>
                </label>
                <input type="text" className={input} value={authName} onChange={e => setAuthName(e.target.value)} />
              </div>
            )}
            {authError && <p className="text-red-600 text-sm">{authError}</p>}
            <button type="submit" className={`${btnPrimary} w-full`} disabled={authLoading}>
              {authLoading ? t('tickets.loading') : t(`tickets.submit_${authMode}`)}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-130px)] px-5 md:px-12 py-10 font-deledda text-brown flex flex-col items-center">
      <div className={`${card} w-full`}>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold font-roca">{t('tickets.title')}</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-brown/50 hidden sm:block truncate max-w-[200px]">{userEmail}</span>
            <button type="button" className={btnSecondary} onClick={logout}>{t('tickets.logout')}</button>
          </div>
        </div>

        {view === 'orders' ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">{t('tickets.my_orders')}</h2>
              <button
                type="button"
                className={btnPrimary}
                onClick={() => { setView('newOrder'); setOrderError(''); setOrderType('guest'); setTickets([makeDraft(userEmail || '')]); }}
              >
                {t('tickets.new_order')}
              </button>
            </div>

            {ordersLoading && (
              <p className="text-center text-brown/50 py-10">{t('tickets.loading')}</p>
            )}

            {!ordersLoading && orders.length === 0 && (
              <p className="text-center text-brown/50 py-10">{t('tickets.no_orders')}</p>
            )}

            <div className="space-y-3">
              {orders.map(order => (
                <div key={order.id} className="border border-brown/20 rounded-2xl p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-xs text-brown/50 block">
                        {new Date(order.created_at).toLocaleDateString()} · {order.amount} MDL
                      </span>
                      <span className={`text-sm font-bold ${order.status === 'paid' ? 'text-green-700' : 'text-orange-600'}`}>
                        {t(`tickets.status_${order.status}`, { defaultValue: order.status })}
                      </span>
                    </div>
                    {order.status !== 'paid' && order.invoice_url && (
                      <a
                        href={order.invoice_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${btnPrimary} inline-block`}
                      >
                        {t('tickets.pay')}
                      </a>
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
                              disabled={downloading.has(ticket.id)}
                              onClick={() => handleDownload(ticket.id, ticket.name)}
                            >
                              {downloading.has(ticket.id) ? '...' : t('tickets.download')}
                            </button>
                            <button
                              type="button"
                              className={`${btnSecondary} text-xs py-1 px-3`}
                              onClick={() => handlePrint(ticket.id)}
                            >
                              {t('tickets.print')}
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
        ) : (
          <form onSubmit={handleCreateOrder}>
            <div className="flex items-center gap-3 mb-6">
              <button
                type="button"
                className="text-brown/60 hover:text-brown transition-colors text-sm cursor-pointer"
                onClick={() => { setView('orders'); setOrderError(''); }}
              >
                ← {t('tickets.back')}
              </button>
              <h2 className="text-lg font-bold">{t('tickets.new_order')}</h2>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-bold mb-2">{t('tickets.order_type')}</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(['guest', 'discounted', 'family'] as OrderType[]).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setOrderType(type)}
                    className={`rounded-xl border p-3 text-left transition-colors cursor-pointer ${orderType === type ? 'border-brown bg-brown/10' : 'border-brown/20 hover:border-brown/50'}`}
                  >
                    <span className="block font-bold text-sm">{t(`tickets.type_${type}`)}</span>
                    <span className="block text-xs text-brown/60 mt-0.5">{PRICES[type]} MDL</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-bold mb-2">{t('tickets.quantity')}</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="w-9 h-9 rounded-full border border-brown/30 text-brown font-bold hover:bg-brown/10 transition-colors cursor-pointer flex items-center justify-center"
                  onClick={() => setTicketCount(tickets.length - 1)}
                >−</button>
                <span className="text-lg font-bold w-6 text-center">{tickets.length}</span>
                <button
                  type="button"
                  className="w-9 h-9 rounded-full border border-brown/30 text-brown font-bold hover:bg-brown/10 transition-colors cursor-pointer flex items-center justify-center"
                  onClick={() => setTicketCount(tickets.length + 1)}
                >+</button>
                {orderType === 'guest' && tickets.length >= 6 && (
                  <span className="text-xs text-green-700 font-bold">{t('tickets.discount_info')}</span>
                )}
              </div>
            </div>

            <div className="space-y-3 mb-5">
              {tickets.map((ticket, i) => (
                <div key={i} className="border border-brown/20 rounded-xl p-4">
                  <p className="text-xs font-bold text-brown/50 mb-3">{t('tickets.ticket_n', { n: i + 1 })}</p>
                  <div className="mb-3">
                    <label className="block text-sm font-bold mb-1">{t('tickets.ticket_name')}</label>
                    <input
                      type="text"
                      required
                      className={input}
                      value={ticket.name}
                      onChange={e => updateTicket(i, { name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ticket.send_email}
                        onChange={e => updateTicket(i, { send_email: e.target.checked })}
                        className="accent-brown w-4 h-4"
                      />
                      <span className="text-sm font-bold">{t('tickets.send_email')}</span>
                    </label>
                    {ticket.send_email && (
                      <input
                        type="email"
                        className={`${input} mt-2`}
                        placeholder={userEmail || ''}
                        value={ticket.email}
                        onChange={e => updateTicket(i, { email: e.target.value })}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center py-3 border-t border-brown/20 mb-5">
              <span className="font-bold">{t('tickets.total')}</span>
              <span className="text-xl font-bold">{calcTotal()} MDL</span>
            </div>

            {orderError && <p className="text-red-600 text-sm mb-4">{orderError}</p>}

            <button type="submit" className={`${btnPrimary} w-full`} disabled={orderLoading}>
              {orderLoading ? t('tickets.loading') : t('tickets.create_order')}
            </button>
            <p className="text-xs text-brown/50 text-center mt-3">{t('tickets.bpay_notice')}</p>
          </form>
        )}
      </div>
    </main>
  );
}
