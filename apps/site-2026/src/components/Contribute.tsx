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
import TicketsModal from './contribute/TicketsModal';
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
  const [showTicketsModal, setShowTicketsModal] = useState(false);
  const [availableTickets, setAvailableTickets] = useState<any[]>([]);

  const [orderType, setOrderType] = useState<OrderType>('basic');
  const [tickets, setTickets] = useState<TicketDraft[]>([makeDraft()]);
  const [orderSendEmail, setOrderSendEmail] = useState(true);
  const [orderEmail, setOrderEmail] = useState(getStoredEmail() || '');
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [isCopied, setIsCopied] = useState(false);

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

        const availableTicketList = nextTickets.filter(ticket => ticket.active && ticket.is_sold);
        setAvailableTickets(availableTicketList);

        // Don't redirect, just set the flag
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

  // Manage tickets modal URL
  useEffect(() => {
    const isTicketsPath = /\/contribute\/tickets\/?$/.test(location.pathname);
    setShowTicketsModal(isTicketsPath);
  }, [location.pathname]);

  useEffect(() => {
    if (showTicketsModal && !location.pathname.includes('/tickets')) {
      navigate('/contribute/tickets');
    } else if (!showTicketsModal && location.pathname.includes('/tickets')) {
      navigate('/contribute', { replace: true });
    }
  }, [showTicketsModal, location.pathname, navigate]);

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
      <main>
        {/* Hero Top */}
        <section
          className="relative bg-cover bg-top sm:bg-[center_50%] py-[5%] w-full
              bg-[url('https://files.art-labyrinth.org/fest2025/contribute/sm_contribute_hero_1.webp')]
              md:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/md_contribute_hero_1.webp')]
              lg:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/lg_contribute_hero_1.webp')]
              xl:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/xl_contribute_hero_1.webp')]
              2xl:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/2xl_contribute_hero_1.webp')]"
        >
          <div className="flex flex-col relative px-4 text-center z-10">
            <h1 className="text-4xl md:text-5xl font-bold font-deledda mb-4 text-orange-150 uppercase">
              {t("contribute.hero_1.header")}
            </h1>
            <div className="max-w-xl mx-auto p-6 text-orange-150">
              <p className="text-lg font-extrabold">
                {t("contribute.hero_1.text_1")}
              </p>
              <p className="text-lg">
                {t("contribute.hero_1.text_2")}
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-[#35190499] bg-opacity-60"></div>
        </section>

        {/* Pricing Section - Available for all users */}
        <section className="bg-orange-150 py-12">
          <div className="container px-4 max-w-6xl mx-auto">
            {/* Upper Part */}
            <div className="text-left mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brown font-deledda mb-4">
                {t("contribute.pricing.header")}
              </h2>
              <p className="text-lg italic text-brown mb-4">
                "{t("contribute.pricing.motto")}"
              </p>
              <p className="text-brown md:w-2/5">
                {t("contribute.pricing.text")}
              </p>
              <div className="text-brown bg-[#F6D8B4] border-l-4 border-[#F07B17] p-4 my-4 font-semibold shadow-md rounded">
                {(t("contribute.pricing.warnings", { returnObjects: true }) as String[]).map((warning, index) => (
                  <p key={index}>{warning}</p>
                ))}
              </div>
              <div className="text-brown p-4 my-4 font-semibold shadow-md rounded">
                {(t("contribute.pricing.tiraspol", { returnObjects: true }) as String[]).map((warning, index) => (
                  <p key={index}>{warning}</p>
                ))}
              </div>
            </div>

            {/* Ticket Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:h-full">
              {[
                {
                  key: 'basic',
                  title: t("contribute.pricing.column_1.title"),
                  price: currentPrices?.basic || 0,
                  text: t("contribute.pricing.column_1.text"),
                },
                {
                  key: 'discounted',
                  title: t("contribute.pricing.column_2.title"),
                  price: currentPrices?.discounted || 0,
                  text: t("contribute.pricing.column_2.text"),
                },
                {
                  key: 'family',
                  title: t("contribute.pricing.column_3.title"),
                  price: currentPrices?.family || 0,
                  text: t("contribute.pricing.column_3.text"),
                },
              ].map((type) => (
                <div
                  key={type.key}
                  className={`p-5 md:flex flex-col text-left cursor-pointer border-2 transition-all ${
                    orderType === type.key ? "border-[#2B390E] rounded-xl bg-[#F6D8B4]/60" : "border-transparent shadow-lg"
                  }`}
                  onClick={() => setOrderType(type.key as OrderType)}
                >
                  <h3 className="text-xl font-bold text-brown mb-2">{type.title}</h3>
                  <p className="text-2xl font-semibold text-[#4A6218] mb-2">{type.price} mdl</p>
                  <p className="text-brown mb-4">{type.text}</p>
                </div>
              ))}
            </div>

            <div className="my-8 h-0.5 bg-[#4A6218] opacity-40 rounded w-full" />

            {/* Quantity Selection */}
            <div className="max-w-2xl mx-auto">
              <div className="text-brown font-semibold mb-4 text-center">
                <label className="text-lg">
                  {t("contribute.form.tickets")}
                </label>
                <div className="flex flex-col gap-2 mt-2">
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={tickets.length}
                    onChange={e => setTicketCount(Number(e.target.value))}
                    className="w-full accent-[#4A6218]"
                  />
                  <span className="text-brown text-center">{t("contribute.form.count")}: <b>{tickets.length || 1}</b></span>
                </div>
              </div>

              {/* Total Price */}
              <div className="flex flex-col items-center justify-center bg-[#F6D8B4] rounded-lg p-6 shadow-lg">
                <span className="text-brown text-lg mb-2">{t("contribute.form.total")}</span>
                <span className="text-3xl font-bold text-[#4A6218] mb-4">
                  {calcTotal().toLocaleString()} MDL
                </span>
                <p className="text-brown text-sm text-center">
                  {t("contribute.pricing.note")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Auth Section */}
        <section className="bg-orange-150 py-12">
          <div className="container px-4 max-w-6xl mx-auto">
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
          </div>
        </section>

        {/* Help Us Section for Guests */}
        <section className="bg-main py-12">
          <div className="container px-4 text-brown font-deledda max-w-6xl mx-auto">
            {/* Upper Row */}
            <div className="text-left mb-12">
              <h2 className="text-2xl md:text-4xl font-bold font-deledda mb-4 uppercase">
                {t("contribute.help_us.header")}
              </h2>
              <p className="md:w-1/2">
                {t("contribute.help_us.text_1")}
              </p>
            </div>

            {/* Lower Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:h-full">
              {/* Left Column */}
              <div className="flex flex-col text-left">
                <div className="mb-4">
                  {(t("contribute.help_us.credentials_list", { returnObjects: true }) as string[]).map((item, idx) => (
                    <p key={idx} className="text-lg">{item}</p>
                  ))}
                </div>
                <button
                  className={`md:w-2/5 w-1/2 ${isCopied ? 'bg-[#4A6218] text-white' : 'bg-transparent border border-black text-black hover:border-white hover:text-white'
                    } px-4 py-2 rounded mt-auto transition-colors duration-300`}
                  onClick={() => {
                    const details = (t("contribute.help_us.credentials_list", { returnObjects: true }) as string[]).join(' \n');
                    navigator.clipboard.writeText(details);
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                  }}
                >
                  {isCopied ? t("contribute.help_us.copied") : t("contribute.help_us.button")}
                </button>
              </div>

              {/* Right Column */}
              <div className="flex flex-col text-left mt-auto">
                <p className="mb-4">
                  {t("contribute.help_us.text_2")}
                </p>
                <p className="flex flex-col md:flex-row gap-3">
                  <a href="tel:+37367496787" className="bg-[#4A6218] text-white px-4 py-2 rounded hover:bg-[#4A6218]/75 disabled:bg-[#99a67d] w-fit">
                    +373 67 496 787
                  </a>
                  <a href={`mailto:${t("contacts.hero.email_text")}`} className="bg-[#4A6218] text-white px-4 py-2 rounded hover:bg-[#4A6218]/75 disabled:bg-[#99a67d] w-fit">
                    {t("contacts.hero.email_text")}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Needs Section for Guests */}
        <section className="bg-orange-150 py-10">
          <div className="container mx-auto font-deledda">
            {/* Upper Row with Green Background */}
            <div className="bg-[#4A6218] rounded py-10 outline outline-8 outline-[#4A6218]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 px-5 max-w-6xl mx-auto">
                {/* Upper Left Cell */}
                <div className="flex flex-col text-left text-orange-150">
                  <h3 className="text-xl font-bold text-brown mb-0 uppercase font-sans">
                    {t("contribute.our_needs.header_1")}
                  </h3>
                  <p className="text-brown  m-0">
                    {t("contribute.our_needs.header_3")}
                  </p>
                  <ul className="text-brown list-disc mt-4 ml-5">
                    {(t("contribute.our_needs.list", { returnObjects: true }) as string[]).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Upper Right Cell */}
                <div className="flex flex-col text-left text-orange-150 my-auto gap-5">
                  <p className="text-brown mx-4">
                    {t("contribute.our_needs.text_3")}
                  </p>
                  <p className="flex flex-col md:flex-row gap-3">
                    <a href="tel:+37367496787" className="bg-transparent text-white border border-white px-4 py-2 md:mx-4 rounded hover:bg-[#434937] disabled:bg-[#99a67d] mt-auto w-fit">
                      +373 67 496 787
                    </a>
                    <a href={`mailto:${t("contacts.hero.email_text")}`} className="bg-transparent text-white border border-white px-4 py-2 md:mx-4 rounded hover:bg-[#434937] disabled:bg-[#99a67d] mt-auto w-fit">
                      {t("contacts.hero.email_text")}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Lower Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10 max-w-6xl mx-auto text-brown px-5">
              {/* Lower Left Cell */}
              <div className="flex flex-col text-left">
                <h3 className="text-xl font-bold text-brown mb-2 uppercase">
                  {t("contribute.our_needs.header_2")}
                </h3>
                <p className="text-brown text-lg">
                  {t("contribute.our_needs.text_2")}
                </p>
              </div>

              {/* Lower Right Cell */}
              <div className="flex flex-col text-left">
                <p className="text-brown text-lg mb-4 my-auto">
                  {t("contribute.our_needs.text_4")}
                </p>
                <a href="https://docs.google.com/document/d/1hWkqxJShZEWnt9Yl9EZfF3zswS3d9Y_dNqmycmktT9Y" target="_blank" rel="noopener noreferrer">
                  <button
                    className="md:w-2/5 w-1/2 bg-[#F07B17] text-white px-4 py-2 rounded hover:bg-[#F07B17]/75 disabled:bg-[#F6D8B4] mt-auto"
                  >
                    {t("contribute.our_needs.button")}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Bottom */}
        <section
          className="relative bg-cover bg-top sm:bg-[center_70%]  py-[5%] w-full
              bg-[url('https://files.art-labyrinth.org/fest2025/contribute/sm_contribute_hero_2.webp')]
              md:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/md_contribute_hero_2.webp')]
              lg:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/lg_contribute_hero_2.webp')]
              xl:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/xl_contribute_hero_2.webp')]
              2xl:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/2xl_contribute_hero_2.webp')]"
        >
          <div className="flex flex-col relative container mx-auto px-4 text-center z-10">
            <div className="max-w-lg mx-auto p-6 text-[#FFF9EC]">
              <p className="text-brown text-lg">
                {t("contribute.hero_2.text")}
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-[#35190499] bg-opacity-60"></div>
        </section>
      </main>
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
    <main>
      {/* Content based on view */}
      {view === 'orders' ? (
        <section className="bg-orange-150 py-12">
          <div className="container px-4 max-w-6xl mx-auto">
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
          </div>
        </section>
      ) : (
        <>
          {/* Pricing Section */}
          <section className="bg-orange-150 py-12">
            <div className="container px-4 max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-brown font-deledda mb-4">
                    {t("contribute.pricing.header")}
                  </h2>
                </div>
                {availableTickets.length > 0 && (
                  <button
                    onClick={() => setShowTicketsModal(true)}
                    className="px-6 py-3 bg-[#4A6218] text-white rounded hover:bg-[#4A6218]/75 transition-colors font-semibold whitespace-nowrap"
                  >
                    {t("contribute.my_tickets") || "Мои билеты"} ({availableTickets.length})
                  </button>
                )}
              </div>

              {/* New Order Form */}
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
            </div>
          </section>
        </>
      )}

      {/* Help Us and Our Needs sections (visible for authenticated users) */}
      <section className="bg-main py-12">
        <div className="container px-4 text-brown font-deledda max-w-6xl mx-auto">
          <div className="text-left mb-12">
            <h2 className="text-2xl md:text-4xl font-bold font-deledda mb-4 uppercase">
              {t("contribute.help_us.header")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col text-left">
              <div className="mb-4">
                {(t("contribute.help_us.credentials_list", { returnObjects: true }) as string[]).map((item, idx) => (
                  <p key={idx} className="text-lg">{item}</p>
                ))}
              </div>
            </div>

            <div className="flex flex-col text-left mt-auto">
              <p className="mb-4">{t("contribute.help_us.text_2")}</p>
              <p className="flex flex-col md:flex-row gap-3">
                <a href="tel:+37367496787" className="bg-[#4A6218] text-white px-4 py-2 rounded hover:bg-[#4A6218]/75 w-fit">
                  +373 67 496 787
                </a>
                <a href={`mailto:${t("contacts.hero.email_text")}`} className="bg-[#4A6218] text-white px-4 py-2 rounded hover:bg-[#4A6218]/75 w-fit">
                  {t("contacts.hero.email_text")}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Bottom */}
      <section
        className="relative bg-cover bg-top sm:bg-[center_70%]  py-[5%] w-full
            bg-[url('https://files.art-labyrinth.org/fest2025/contribute/sm_contribute_hero_2.webp')]
            md:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/md_contribute_hero_2.webp')]
            lg:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/lg_contribute_hero_2.webp')]
            xl:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/xl_contribute_hero_2.webp')]
            2xl:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/2xl_contribute_hero_2.webp')]"
      >
        <div className="flex flex-col relative container mx-auto px-4 text-center z-10">
          <div className="max-w-lg mx-auto p-6 text-[#FFF9EC]">
            <p className="text-brown text-lg">
              {t("contribute.hero_2.text")}
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[#35190499] bg-opacity-60"></div>
      </section>

      <TicketsModal
        isOpen={showTicketsModal}
        onClose={() => setShowTicketsModal(false)}
        tickets={availableTickets}
        loading={ordersLoading}
      />

    </main>
  );
}
