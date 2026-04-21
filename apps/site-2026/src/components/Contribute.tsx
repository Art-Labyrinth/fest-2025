import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  CUSTOMER_UNAUTHORIZED_EVENT,
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

interface ContributeProps {
  autoOpenTickets?: boolean;
}

export default function Contribute({ autoOpenTickets = true }: ContributeProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
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
  const [landingChecked, setLandingChecked] = useState(false);

  const [orderType, setOrderType] = useState<OrderType>('basic');
  const [tickets, setTickets] = useState<TicketDraft[]>([makeDraft()]);
  const [orderSendEmail, setOrderSendEmail] = useState(true);
  const [orderEmail, setOrderEmail] = useState(getStoredEmail() || '');
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState('');

  function logout() {
    clearSession();
    setToken(null);
    setUserEmail(null);
    setUserName('');
    setOrders([]);
  }

  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener(CUSTOMER_UNAUTHORIZED_EVENT, handleUnauthorized);
    return () => {
      window.removeEventListener(CUSTOMER_UNAUTHORIZED_EVENT, handleUnauthorized);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadOrders = useCallback(async () => {
    setOrdersLoading(true);
    try {
      setOrders(await customerApi.getOrders());
    } catch {
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      setLandingChecked(false);
      return;
    }

    let isActive = true;

    if (!autoOpenTickets) {
      setLandingChecked(true);
      loadOrders();
      return () => {
        isActive = false;
      };
    }

    setLandingChecked(false);

    customerApi.getTickets()
      .then(nextTickets => {
        if (!isActive) return;

        const availableTickets = nextTickets.filter(ticket => ticket.active && ticket.is_sold);
        if (availableTickets.length > 0) {
          navigate('/contribute/tickets', { replace: true });
          return;
        }

        setLandingChecked(true);
        loadOrders();
      })
      .catch(() => {
        if (!isActive) return;
        setLandingChecked(true);
        loadOrders();
      });

    return () => {
      isActive = false;
    };
  }, [autoOpenTickets, loadOrders, navigate, token]);

  useEffect(() => {
    setTickets(prev => {
      const next = [...prev];
      while (next.length < 1) next.push(makeDraft());
      return next;
    });
  }, [userEmail]);

  useEffect(() => {
    setOrderEmail(userEmail || '');
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
      setTickets([makeDraft(name)]);
      setOrderSendEmail(true);
      setOrderEmail(res.email);
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
      while (next.length < count) next.push(makeDraft());
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
          send_email: orderSendEmail,
          ...(orderSendEmail && orderEmail && orderEmail !== userEmail ? { email: orderEmail } : {}),
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

  if (autoOpenTickets && !landingChecked) {
    return (
      <main className="min-h-[calc(100vh-130px)] px-5 md:px-12 py-10 font-deledda text-brown flex flex-col items-center">
        <div className={`${card} w-full`}>
          <p className="text-center text-brown/50 py-10">{t('contribute.loading')}</p>
        </div>
      </main>
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
            onLogout={logout}
            onStartNewOrder={() => {
              if (salesClosed) return;
              setView('newOrder');
              setOrderError('');
              setOrderType('basic');
              setTickets([makeDraft(userName)]);
              setOrderSendEmail(true);
              setOrderEmail(userEmail || '');
            }}
            userEmail={userEmail}
          />
        ) : (
          <NewOrderForm
            currentPriceStage={currentPriceStage}
            currentPrices={currentPrices}
            orderError={orderError}
            orderEmail={orderEmail}
            orderLoading={orderLoading}
            orderSendEmail={orderSendEmail}
            orderType={orderType}
            salesClosed={salesClosed}
            tickets={tickets}
            total={calcTotal()}
            userEmail={userEmail}
            onBack={() => { setView('orders'); setOrderError(''); }}
            onOrderEmailChange={setOrderEmail}
            onOrderSendEmailChange={setOrderSendEmail}
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
