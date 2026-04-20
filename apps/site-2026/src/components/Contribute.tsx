import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  customerApi,
  saveSession,
  clearSession,
  getStoredToken,
  getStoredEmail,
  getStoredName,
  CreateOrderBody,
  CustomerOrder,
} from '../api/customerApi';
import AuthCard from './contribute/AuthCard';
import OrdersView from './contribute/OrdersView';
import NewOrderForm from './contribute/NewOrderForm';
import {
  getCurrentPriceStage,
  langForApi,
  makeDraft,
  PRICES_BY_STAGE,
} from './contribute/model';
import type { OrderType, TicketDraft, View } from './contribute/model';
import { card } from './contribute/styles';

export default function Contribute() {
  const { t, i18n } = useTranslation();
  const currentPriceStage = getCurrentPriceStage();
  const salesClosed = currentPriceStage === 'july';
  const currentPrices = salesClosed ? null : PRICES_BY_STAGE[currentPriceStage];

  const [token, setToken] = useState(getStoredToken);
  const [userEmail, setUserEmail] = useState(getStoredEmail);
  const [userName, setUserName] = useState<string>(getStoredName() || '');

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [view, setView] = useState<View>('orders');
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const [orderType, setOrderType] = useState<OrderType>('basic');
  const [tickets, setTickets] = useState<TicketDraft[]>([makeDraft('')]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState('');

  const [downloading, setDownloading] = useState<Set<string>>(new Set());

  function logout() {
    clearSession();
    setToken(null);
    setUserEmail(null);
    setUserName('');
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
      const name = res.name || '';
      saveSession(res.access_token, res.email, name);
      setToken(res.access_token);
      setUserEmail(res.email);
      setUserName(name);
      setTickets([makeDraft(res.email, name)]);
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
    if (!currentPrices) return 0;

    const base = currentPrices[orderType];
    const discount = orderType === 'basic' && tickets.length >= 6 ? 0.9 : 1;
    return Math.round(base * discount * tickets.length);
  }

  async function handleCreateOrder(e: React.FormEvent) {
    e.preventDefault();
    if (salesClosed) {
      setOrderError(String(t('contribute.sales_closed_notice')));
      return;
    }
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
      if (res.invoice_url) {
        window.location.href = res.invoice_url;
      } else {
        setView('orders');
        setOrderLoading(false);
        loadOrders();
      }
    } catch (e: any) {
      setOrderError(e.message);
      setOrderLoading(false);
    }
  }

  async function handleDownload(ticketId: string, name: string) {
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


  if (!token) {
    return (
      <AuthCard
        authMode={authMode}
        authEmail={authEmail}
        authPassword={authPassword}
        authName={authName}
        authError={authError}
        authLoading={authLoading}
        onAuthModeChange={mode => { setAuthMode(mode); setAuthError(''); }}
        onAuthEmailChange={setAuthEmail}
        onAuthPasswordChange={setAuthPassword}
        onAuthNameChange={setAuthName}
        onSubmit={handleAuth}
      />
    );
  }

  return (
    <main className="min-h-[calc(100vh-130px)] px-5 md:px-12 py-10 font-deledda text-brown flex flex-col items-center">
      <div className={`${card} w-full`}>
        {view === 'orders' ? (
          <OrdersView
            orders={orders}
            ordersLoading={ordersLoading}
            salesClosed={salesClosed}
            downloading={downloading}
            onLogout={logout}
            onStartNewOrder={() => {
              if (salesClosed) return;
              setView('newOrder');
              setOrderError('');
              setOrderType('basic');
              setTickets([makeDraft(userEmail || '', userName)]);
            }}
            onDownload={handleDownload}
            userEmail={userEmail}
          />
        ) : (
          <NewOrderForm
            currentPriceStage={currentPriceStage}
            currentPrices={currentPrices}
            orderError={orderError}
            orderLoading={orderLoading}
            orderType={orderType}
            salesClosed={salesClosed}
            tickets={tickets}
            total={calcTotal()}
            userEmail={userEmail}
            onBack={() => { setView('orders'); setOrderError(''); }}
            onOrderTypeChange={setOrderType}
            onSubmit={handleCreateOrder}
            onTicketCountChange={setTicketCount}
            onTicketUpdate={updateTicket}
          />
        )}
      </div>
    </main>
  );
}
