import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  FbData,
  RegisterFbParams,
} from '../api/customerApi';
import AuthCard from './contribute/AuthCard';
import PasswordResetCard from './contribute/PasswordResetCard';
import OrdersView from './contribute/OrdersView';
import NewOrderForm from './contribute/NewOrderForm';
import { getFbTrackingData } from '../utils/fbTracking';
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

function isWrongPasswordError(message: string): boolean {
  const normalized = message.toLowerCase();
  return /password|парол|credential/.test(normalized);
}

function getPasswordResetFrontendBaseUrl(): string {
  if (typeof window === 'undefined') {
    return '/contribute/password-reset';
  }

  const publicUrl = process.env.PUBLIC_URL || '';
  const normalizedPublicUrl = publicUrl.endsWith('/') ? publicUrl.slice(0, -1) : publicUrl;
  return `${window.location.origin}${normalizedPublicUrl}/contribute/password-reset`;
}

export default function Contribute({ autoOpenTickets = true }: ContributeProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const resetToken = params.get('token');
  const isPasswordResetPath = /\/contribute\/password-reset\/?$/.test(location.pathname);
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
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [resetEmail, setResetEmail] = useState('');
  const [resetRequestLoading, setResetRequestLoading] = useState(false);
  const [resetRequestError, setResetRequestError] = useState('');
  const [resetRequestSuccess, setResetRequestSuccess] = useState('');

  const [resetTokenValidationLoading, setResetTokenValidationLoading] = useState(false);
  const [resetTokenValidationError, setResetTokenValidationError] = useState('');
  const [resetTokenValid, setResetTokenValid] = useState(false);

  const [resetNewPassword, setResetNewPassword] = useState('');
  const [resetRepeatPassword, setResetRepeatPassword] = useState('');
  const [resetConfirmLoading, setResetConfirmLoading] = useState(false);
  const [resetConfirmError, setResetConfirmError] = useState('');
  const [resetConfirmSuccess, setResetConfirmSuccess] = useState('');

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

  const shouldShowResetConfirm = Boolean(resetToken && !token && isPasswordResetPath);
  const shouldShowResetRequest = Boolean(!token && isPasswordResetPath && !resetToken);

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

  useEffect(() => {
    if (!resetEmail && authEmail) {
      setResetEmail(authEmail);
    }
  }, [authEmail, resetEmail]);

  useEffect(() => {
    if (!shouldShowResetConfirm || !resetToken) {
      setResetTokenValidationLoading(false);
      setResetTokenValidationError('');
      setResetTokenValid(false);
      return;
    }

    let isActive = true;
    setResetTokenValidationLoading(true);
    setResetTokenValidationError('');

    customerApi.verifyPasswordResetToken({ token: resetToken })
      .then(result => {
        if (!isActive) return;
        setResetTokenValid(Boolean(result.valid));
      })
      .catch((e: any) => {
        if (!isActive) return;
        setResetTokenValidationError(e?.message || String(t('contribute.reset_password_token_invalid')));
      })
      .finally(() => {
        if (!isActive) return;
        setResetTokenValidationLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [resetToken, shouldShowResetConfirm, t]);

  function resetPasswordScreenState() {
    setResetRequestError('');
    setResetRequestSuccess('');
    setResetConfirmError('');
    setResetConfirmSuccess('');
    setResetNewPassword('');
    setResetRepeatPassword('');
  }

  function openRequestPasswordReset() {
    navigate('/contribute/password-reset');
    setResetEmail(authEmail || '');
    setShowForgotPassword(false);
    resetPasswordScreenState();
  }

  function backToLogin() {
    setAuthError('');
    setShowForgotPassword(false);
    resetPasswordScreenState();
    navigate('/contribute', { replace: true });
  }

  async function handlePasswordResetRequest(e: React.FormEvent) {
    e.preventDefault();
    setResetRequestError('');
    setResetRequestSuccess('');
    setResetRequestLoading(true);

    try {
      await customerApi.requestPasswordReset({
        email: resetEmail,
        lang: langForApi(i18n.language),
        frontend_base_url: getPasswordResetFrontendBaseUrl(),
      });
      setResetRequestSuccess(String(t('contribute.reset_password_request_sent')));
    } catch (e: any) {
      setResetRequestError(e?.message || String(t('contribute.reset_password_request_failed')));
    } finally {
      setResetRequestLoading(false);
    }
  }

  async function handlePasswordResetConfirm(e: React.FormEvent) {
    e.preventDefault();
    if (!resetToken) return;

    setResetConfirmError('');
    setResetConfirmSuccess('');

    if (resetNewPassword !== resetRepeatPassword) {
      setResetConfirmError(String(t('contribute.reset_password_mismatch')));
      return;
    }

    setResetConfirmLoading(true);
    try {
      await customerApi.confirmPasswordReset({ token: resetToken, new_password: resetNewPassword });
      setResetConfirmSuccess(String(t('contribute.reset_password_success')));
    } catch (e: any) {
      setResetConfirmError(e?.message || String(t('contribute.reset_password_confirm_failed')));
    } finally {
      setResetConfirmLoading(false);
    }
  }

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setAuthError('');
    setShowForgotPassword(false);
    setAuthLoading(true);
    try {
      let res;
      if (authMode === 'login') {
        res = await customerApi.login(authEmail, authPassword);
      } else {
        const { pixel_id, fbp, fbc, fbclid } = getFbTrackingData();
        const fb: RegisterFbParams = {
          fb_pixel_id: pixel_id,
          event_source_url: window.location.href,
          ...(fbp ? { fbp } : {}),
          ...(fbc ? { fbc } : {}),
          ...(fbclid ? { fbclid } : {}),
        };
        res = await customerApi.register(authEmail, authPassword, langForApi(i18n.language), authName || undefined, fb);
      }
      const name = res.name || '';
      saveSession(res.access_token, res.email, name);
      setToken(res.access_token);
      setUserEmail(res.email);
      setUserName(name);
      setTickets([makeDraft(name)]);
      setOrderSendEmail(true);
      setOrderEmail(res.email);
    } catch (e: any) {
      const message = e?.message || String(t('contribute.auth_failed'));
      setAuthError(message);
      setShowForgotPassword(authMode === 'login' && isWrongPasswordError(message));
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
    return Math.round(base * tickets.length);
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
      const { pixel_id, fbp, fbc, fbclid } = getFbTrackingData();
      const fb: FbData = {
        pixel_id,
        ...(fbp ? { fbp } : {}),
        ...(fbc ? { fbc } : {}),
        ...(fbclid ? { fbclid } : {}),
      };
      const body: CreateOrderBody = {
        type_order: orderType,
        lang: langForApi(i18n.language),
        tickets: tickets.map(t => ({
          name: t.name,
          send_email: orderSendEmail,
          ...(orderSendEmail && orderEmail && orderEmail !== userEmail ? { email: orderEmail } : {}),
        })),
        fb,
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
    if (shouldShowResetConfirm || shouldShowResetRequest) {
      return (
        <PasswordResetCard
          mode={shouldShowResetConfirm ? 'confirm' : 'request'}
          email={resetEmail}
          requestLoading={resetRequestLoading}
          requestError={resetRequestError}
          requestSuccess={resetRequestSuccess}
          onEmailChange={setResetEmail}
          onRequestSubmit={handlePasswordResetRequest}
          tokenValidationLoading={resetTokenValidationLoading}
          tokenValid={resetTokenValid}
          tokenValidationError={resetTokenValidationError}
          newPassword={resetNewPassword}
          confirmPassword={resetRepeatPassword}
          confirmLoading={resetConfirmLoading}
          confirmError={resetConfirmError}
          confirmSuccess={resetConfirmSuccess}
          onNewPasswordChange={setResetNewPassword}
          onConfirmPasswordChange={setResetRepeatPassword}
          onConfirmSubmit={handlePasswordResetConfirm}
          onBackToLogin={backToLogin}
        />
      );
    }

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
        showForgotPassword={showForgotPassword}
        onForgotPasswordClick={openRequestPasswordReset}
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
