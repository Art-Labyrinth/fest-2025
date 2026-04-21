import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Navigate, useParams } from 'react-router-dom';
import { CUSTOMER_UNAUTHORIZED_EVENT, customerApi, getStoredEmail, getStoredToken, type CustomerOrder } from '../../api/customerApi';
import { btnPrimary, btnSecondary, card, input } from './styles';

function sanitizeFileName(value: string): string {
    const normalized = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return normalized || 'ticket';
}

function copyText(value: string): Promise<void> {
    if (!navigator.clipboard?.writeText) {
        return Promise.resolve();
    }

    return navigator.clipboard.writeText(value).catch(() => undefined);
}

function handleCopyTicketId(ticketId: string) {
    void copyText(ticketId);
}

function downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export default function OrderPage() {
    const { t } = useTranslation();
    const { orderId } = useParams();
    const [token, setToken] = useState(getStoredToken);
    const [order, setOrder] = useState<CustomerOrder | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [ticketImages, setTicketImages] = useState<Record<string, string>>({});
    const [ticketBlobs, setTicketBlobs] = useState<Record<string, Blob>>({});
    const [ticketEmails, setTicketEmails] = useState<Record<string, string>>({});
    const [ticketNotices, setTicketNotices] = useState<Record<string, string>>({});
    const [busyTicketId, setBusyTicketId] = useState<string | null>(null);
    const [printLoading, setPrintLoading] = useState(false);

    const numericOrderId = useMemo(() => Number(orderId), [orderId]);

    useEffect(() => {
        const handleUnauthorized = () => {
            setToken(null);
        };

        window.addEventListener(CUSTOMER_UNAUTHORIZED_EVENT, handleUnauthorized);
        return () => {
            window.removeEventListener(CUSTOMER_UNAUTHORIZED_EVENT, handleUnauthorized);
        };
    }, []);

    useEffect(() => {
        return () => {
            Object.values(ticketImages).forEach(url => URL.revokeObjectURL(url));
        };
    }, [ticketImages]);

    useEffect(() => {
        if (!Number.isFinite(numericOrderId)) {
            setError(String(t('contribute.order_not_found')));
            setLoading(false);
            return;
        }

        let isActive = true;
        setLoading(true);
        setError('');

        customerApi.getOrder(numericOrderId)
            .then(async nextOrder => {
                if (!isActive) return;
                if (!nextOrder) {
                    setError(String(t('contribute.order_not_found')));
                    return;
                }

                setOrder(nextOrder);

                const nextEmails = (nextOrder.tickets || []).reduce<Record<string, string>>((acc, ticket) => {
                    acc[ticket.ticket_id] = getStoredEmail() || '';
                    return acc;
                }, {});
                setTicketEmails(nextEmails);
                setTicketNotices({});

                const soldTickets = (nextOrder.tickets || []).filter(ticket => ticket.is_sold && ticket.active);
                const entries = await Promise.all(
                    soldTickets.map(async ticket => {
                        const blob = await customerApi.downloadTicket(ticket.ticket_id);
                        return {
                            ticketId: ticket.ticket_id,
                            blob,
                            url: URL.createObjectURL(blob),
                        };
                    })
                );

                if (!isActive) {
                    entries.forEach(entry => URL.revokeObjectURL(entry.url));
                    return;
                }

                setTicketImages(prev => {
                    Object.values(prev).forEach(url => URL.revokeObjectURL(url));
                    return entries.reduce<Record<string, string>>((acc, entry) => {
                        acc[entry.ticketId] = entry.url;
                        return acc;
                    }, {});
                });

                setTicketBlobs(entries.reduce<Record<string, Blob>>((acc, entry) => {
                    acc[entry.ticketId] = entry.blob;
                    return acc;
                }, {}));
            })
            .catch(() => {
                if (!isActive) return;
                setError(String(t('contribute.order_loading_error')));
            })
            .finally(() => {
                if (isActive) setLoading(false);
            });

        return () => {
            isActive = false;
        };
    }, [numericOrderId, t]);

    if (!token) {
        return <Navigate to="/contribute/orders" replace />;
    }

    function updateTicketEmail(ticketId: string, value: string) {
        setTicketEmails(prev => ({ ...prev, [ticketId]: value }));
    }

    async function handleTicketEmail(ticketId: string, ticketName: string) {
        const blob = ticketBlobs[ticketId];
        if (!blob) return;

        const email = (ticketEmails[ticketId] || '').trim();
        if (!email) {
            setTicketNotices(prev => ({ ...prev, [ticketId]: String(t('contribute.ticket_email_required')) }));
            return;
        }

        setBusyTicketId(ticketId);
        setTicketNotices(prev => ({ ...prev, [ticketId]: '' }));

        try {
            const safeName = sanitizeFileName(ticketName || ticketId);
            downloadBlob(blob, `${safeName}-${ticketId}.png`);

            const subject = encodeURIComponent(String(t('contribute.ticket_email_subject', { name: ticketName || ticketId })));
            const body = encodeURIComponent(String(t('contribute.ticket_email_fallback_body', { name: ticketName || ticketId })));
            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
            setTicketNotices(prev => ({ ...prev, [ticketId]: String(t('contribute.ticket_email_fallback')) }));
        } catch {
            setTicketNotices(prev => ({ ...prev, [ticketId]: String(t('contribute.ticket_email_error')) }));
        } finally {
            setBusyTicketId(null);
        }
    }

    async function handlePrintAll() {
        if (!order) return;

        const soldTickets = (order.tickets || []).filter(ticket => ticket.is_sold && ticket.active);
        if (soldTickets.length === 0) return;

        setPrintLoading(true);
        try {
            const pdfBlob = await customerApi.downloadOrderPrint(order.id);
            downloadBlob(pdfBlob, `order-${order.id}-tickets.pdf`);
        } finally {
            setPrintLoading(false);
        }
    }

    return (
        <main className="min-h-[calc(100vh-130px)] px-5 md:px-12 py-10 font-deledda text-brown flex flex-col items-center">
            <div className={`${card} w-full max-w-5xl`}>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                    <div>
                        <Link to="/contribute/orders" className="inline-flex items-center text-sm font-bold text-brown/70 hover:text-brown transition-colors mb-3">
                            ← {t('contribute.back_to_orders')}
                        </Link>
                    </div>

                    {order && order.status !== 'paid' ? (
                        order.invoice_url ? (
                            <a href={order.invoice_url} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} inline-flex items-center`}>
                                {t('contribute.pay')}
                            </a>
                        ) : (
                            <button type="button" disabled className={`${btnPrimary} opacity-40 cursor-not-allowed`}>
                                {t('contribute.pay')}
                            </button>
                        )
                    ) : null}
                </div>

                {loading ? <p className="text-center text-brown/50 py-16">{t('contribute.loading')}</p> : null}
                {!loading && error ? <p className="text-center text-red-600 py-16">{error}</p> : null}

                {!loading && !error && order ? (
                    <>
                        <div className="border border-brown/15 rounded-3xl p-5 mb-6 bg-orange-150/40">
                            <div className="flex flex-wrap gap-5 text-sm">
                                <div>
                                    <span className="text-brown/50 block">{t('contribute.order_date')}</span>
                                    <span className="font-bold">{new Date(order.created_at).toLocaleDateString()}</span>
                                </div>
                                <div>
                                    <span className="text-brown/50 block">{t('contribute.total')}</span>
                                    <span className="font-bold">{order.amount} MDL</span>
                                </div>
                                <div>
                                    <span className="text-brown/50 block">{t('contribute.order_status')}</span>
                                    <span className={`font-bold ${order.status === 'paid' ? 'text-green-700' : 'text-orange-600'}`}>
                                        {t(`contribute.status_${order.status}`, { defaultValue: order.status })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {(order.tickets || []).map(ticket => (
                                <div key={ticket.id} className="border border-brown/15 rounded-2xl p-4 space-y-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className="flex-1 min-w-0">
                                            <span className="text-xs text-brown/50 block mt-1">
                                                {!ticket.active ? (
                                                    <span className="text-sm text-red-700 block">{t('contribute.ticket_blocked')}</span>
                                                ) : !ticket.is_sold ? (
                                                    <span className="text-sm text-brown/70 block">{t('contribute.ticket_unpaid')}</span>
                                                ) : (
                                                    <>
                                                        {t('contribute.ticket_id_label', { id: ticket.ticket_id })}
                                                        <button
                                                            type="button"
                                                            className="text-xs text-brown/60 hover:text-brown transition-colors mb-1"
                                                            onClick={() => handleCopyTicketId(ticket.ticket_id)}
                                                            title={String(t('contribute.copy_ticket_id'))}
                                                            aria-label={String(t('contribute.copy_ticket_id'))}
                                                        >
                                                            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden="true">
                                                                <rect x="7" y="3" width="10" height="12" rx="2" />
                                                                <path d="M5 7H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1" />
                                                            </svg>
                                                        </button>
                                                    </>
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    {ticket.active && ticket.is_sold && ticketImages[ticket.ticket_id] ? (
                                        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
                                            <div className="rounded-3xl border border-brown/15 bg-white/90 shadow-inner p-3 sm:p-5">
                                                <img
                                                    src={ticketImages[ticket.ticket_id]}
                                                    alt={String(t('contribute.ticket_preview_alt', { name: ticket.name || ticket.ticket_id }))}
                                                    className="w-full h-auto rounded-2xl"
                                                />
                                            </div>

                                            <div className="space-y-3 rounded-3xl border border-brown/15 bg-orange-150/40 p-4">
                                                <label className="block">
                                                    <span className="text-xs text-brown/50 block mb-2">{t('contribute.email')}</span>
                                                    <input
                                                        type="email"
                                                        className={input}
                                                        value={ticketEmails[ticket.ticket_id] || ''}
                                                        onChange={event => updateTicketEmail(ticket.ticket_id, event.target.value)}
                                                        placeholder={getStoredEmail() || ''}
                                                    />
                                                </label>
                                                <button
                                                    type="button"
                                                    className={`${btnSecondary} w-full`}
                                                    disabled={busyTicketId === ticket.ticket_id}
                                                    onClick={() => handleTicketEmail(ticket.ticket_id, ticket.name)}
                                                >
                                                    {busyTicketId === ticket.ticket_id ? t('contribute.loading') : t('contribute.send_email')}
                                                </button>
                                                {ticketNotices[ticket.ticket_id] ? (
                                                    <p className="text-xs text-brown/70 leading-relaxed">{ticketNotices[ticket.ticket_id]}</p>
                                                ) : null}
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            ))}
                        </div>

                        {(order.tickets || []).some(ticket => ticket.is_sold && ticket.active) ? (
                            <div className="mt-6 flex justify-end">
                                <button
                                    type="button"
                                    className={`${btnPrimary} inline-flex items-center`}
                                    disabled={printLoading}
                                    onClick={handlePrintAll}
                                >
                                    {printLoading ? t('contribute.loading') : t('contribute.print')}
                                </button>
                            </div>
                        ) : null}
                    </>
                ) : null}
            </div>
        </main>
    );
}