import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CUSTOMER_UNAUTHORIZED_EVENT, customerApi, getStoredToken, type TicketItem } from '../../api/customerApi';
import { btnSecondary, card } from './styles';

type TicketImageMap = Record<string, string>;

export default function TicketsPage() {
  const { t } = useTranslation();
  const [token, setToken] = useState(getStoredToken);
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [ticketImages, setTicketImages] = useState<TicketImageMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    let isActive = true;
    setLoading(true);
    setError('');

    customerApi.getTickets()
      .then(async nextTickets => {
        const availableTickets = nextTickets.filter(ticket => ticket.active && ticket.is_sold);
        if (!isActive) return;

        setTickets(availableTickets);

        const entries = await Promise.all(
          availableTickets.map(async ticket => {
            const blob = await customerApi.downloadTicket(ticket.ticket_id);
            return {
              ticketId: ticket.ticket_id,
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
          return entries.reduce<TicketImageMap>((acc, entry) => {
            acc[entry.ticketId] = entry.url;
            return acc;
          }, {});
        });
      })
      .catch(() => {
        if (!isActive) return;
        setError(String(t('contribute.tickets_loading_error')));
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [t]);

  if (!token) {
    return <Navigate to="/contribute" replace />;
  }

  return (
    <main className="min-h-[calc(100vh-130px)] px-5 md:px-12 py-10 font-deledda text-brown flex flex-col items-center">
      <div className={`${card} w-full max-w-5xl`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold font-roca">{t('contribute.my_tickets')}</h1>
          <Link to="/contribute/orders" className={`${btnSecondary} inline-flex items-center`}>
            {t('contribute.my_orders')}
          </Link>
        </div>

        {loading ? <p className="text-center text-brown/50 py-16">{t('contribute.loading')}</p> : null}
        {!loading && error ? <p className="text-center text-red-600 py-16">{error}</p> : null}
        {!loading && !error && tickets.length === 0 ? <p className="text-center text-brown/50 py-16">{t('contribute.no_paid_tickets')}</p> : null}

        {!loading && !error && tickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tickets.map(ticket => (
              <div key={ticket.id} className="rounded-3xl overflow-hidden border border-brown/15 bg-orange-150/50">
                {ticketImages[ticket.ticket_id] ? (
                  <img
                    src={ticketImages[ticket.ticket_id]}
                    alt={String(t('contribute.ticket_preview_alt', { name: ticket.name || ticket.ticket_id }))}
                    className="block w-full h-auto"
                  />
                ) : (
                  <div className="aspect-[4/3] flex items-center justify-center text-brown/50 px-6 text-center">
                    {t('contribute.ticket_loading_error')}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}