import React from 'react';
import { useTranslation } from 'react-i18next';

interface TicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickets: any[];
  loading: boolean;
}

export default function TicketsModal({ isOpen, onClose, tickets, loading }: TicketsModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-orange-150 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-brown font-deledda">
            {t('contribute.my_tickets') || 'Мои билеты'}
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-brown hover:text-brown/50 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-brown/50">{t('contribute.loading')}</p>
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-brown/50">
                {t('contribute.no_paid_tickets')}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket, idx) => (
                <div
                  key={idx}
                  className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-brown text-lg">
                      {ticket.name || `Билет ${idx + 1}`}
                    </h3>
                    <span className={`px-3 py-1 rounded text-sm font-semibold ${
                      ticket.is_sold
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {ticket.is_sold ? 'Активный' : 'Ожидание'}
                    </span>
                  </div>
                  {ticket.description && (
                    <p className="text-brown/70 text-sm mb-2">{ticket.description}</p>
                  )}
                  {ticket.qr_code && (
                    <div className="mt-3 pt-3 border-t border-gray-300">
                      <p className="text-xs text-brown/50 mb-2">QR код:</p>
                      <img
                        src={ticket.qr_code}
                        alt="QR Code"
                        className="h-32 w-32 mx-auto"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#4A6218] text-white rounded hover:bg-[#4A6218]/75 transition-colors font-semibold"
          >
            {t('contribute.back')}
          </button>
        </div>
      </div>
    </>
  );
}
