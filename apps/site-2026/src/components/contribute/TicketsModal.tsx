import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { customerApi, type TicketItem } from '../../api/customerApi';

type TicketImageMap = Record<string, string>;

interface TicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TicketsModal({ isOpen, onClose }: TicketsModalProps) {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [ticketImages, setTicketImages] = useState<TicketImageMap>({});
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    return () => {
      Object.values(ticketImages).forEach(url => URL.revokeObjectURL(url));
    };
  }, [ticketImages]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedTicketId(null);
      return;
    }

    let isActive = true;
    setLoading(true);
    setError('');
    setSelectedTicketId(null);

    customerApi.getTickets()
      .then(async nextTickets => {
        const available = nextTickets.filter(ticket => ticket.active && ticket.is_sold);
        if (!isActive) return;
        setTickets(available);

        const entries = await Promise.all(
          available.map(async ticket => {
            const blob = await customerApi.downloadTicket(ticket.ticket_id);
            return { ticketId: ticket.ticket_id, url: URL.createObjectURL(blob) };
          })
        );

        if (!isActive) {
          entries.forEach(e => URL.revokeObjectURL(e.url));
          return;
        }

        setTicketImages(prev => {
          Object.values(prev).forEach(url => URL.revokeObjectURL(url));
          return entries.reduce<TicketImageMap>((acc, e) => {
            acc[e.ticketId] = e.url;
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
  }, [isOpen, t]);

  if (!isOpen) return null;

  const selectedTicket = selectedTicketId
    ? tickets.find(ticket => ticket.ticket_id === selectedTicketId) || null
    : null;
  const selectedTicketImage = selectedTicketId ? ticketImages[selectedTicketId] : null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 overflow-y-auto px-4 py-8 flex items-start justify-center">
        <div className="relative bg-orange-150 rounded-3xl shadow-2xl w-full max-w-5xl">
          <div className="sticky top-0 bg-orange-150 rounded-t-3xl px-6 py-4 border-b border-brown/20 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-brown font-deledda">
              {t('contribute.my_tickets')}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full text-brown hover:bg-brown/10 transition-colors text-2xl font-bold leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="p-6">
            {loading && (
              <p className="text-center text-brown/50 py-16">{t('contribute.loading')}</p>
            )}
            {!loading && error && (
              <p className="text-center text-red-600 py-16">{error}</p>
            )}
            {!loading && !error && tickets.length === 0 && (
              <p className="text-center text-brown/50 py-16">{t('contribute.no_paid_tickets')}</p>
            )}
            {!loading && !error && tickets.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {tickets.map(ticket => (
                  <button
                    key={ticket.id}
                    type="button"
                    className="rounded-3xl overflow-hidden border border-brown/15 bg-orange-150/50 cursor-zoom-in transition-transform hover:-translate-y-0.5"
                    onClick={() => setSelectedTicketId(ticket.ticket_id)}
                  >
                    {ticketImages[ticket.ticket_id] ? (
                      <img
                        src={ticketImages[ticket.ticket_id]}
                        alt={String(t('contribute.ticket_preview_alt', { name: ticket.name || ticket.ticket_id }))}
                        className="block w-full h-auto"
                      />
                    ) : (
                      <div className="aspect-[4/3] flex items-center justify-center text-brown/50 px-6 text-center text-sm">
                        {t('contribute.ticket_loading_error')}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {selectedTicket && selectedTicketImage && (
        <div
          className="fixed inset-0 z-[60] bg-brown/80 backdrop-blur-sm px-4 py-6 flex items-center justify-center"
          onClick={() => setSelectedTicketId(null)}
        >
          <div className="relative max-w-6xl max-h-full" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-orange-150 text-brown font-bold shadow-lg cursor-pointer"
              onClick={() => setSelectedTicketId(null)}
              aria-label={String(t('contribute.close_ticket_preview', { defaultValue: 'Close preview' }))}
            >
              ×
            </button>
            <img
              src={selectedTicketImage}
              alt={String(t('contribute.ticket_preview_alt', { name: selectedTicket.name || selectedTicket.ticket_id }))}
              className="block max-w-full max-h-[85vh] w-auto h-auto rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
