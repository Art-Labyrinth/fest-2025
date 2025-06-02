import React, { useEffect } from "react";

interface TraditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
}

const TraditionsModal: React.FC<TraditionsModalProps> = ({ isOpen, onClose, t }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg w-[95%] mx-2 sm:w-full sm:mx-4 sm:max-w-[50%] relative transform transition-transform duration-300 max-h-[80vh] ${isOpen ? 'scale-100' : 'scale-95'}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header and close button outside the scrollable block */}
        <div className="p-4 bg-white border-b border-gray-200 relative rounded-lg">
          <h2 className="text-3xl font-bold text-[#4A6218] font-deledda mb-0 text-center">
            {t("participants.popups.traditions.header")}
          </h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-brown hover:text-opacity-70"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content block */}
        <div className="p-5 overflow-y-auto object-contain bg-top max-h-[calc(80vh-5rem)] pb-10">
          <div className="space-y-6">
            {[
              { title: "", text: t("participants.popups.traditions.text_1"), preLine: false },
              ...Array.from({ length: 7 }, (_, i) => ({
                title: t(`participants.popups.traditions.title_${i + 1}`),
                text: t(`participants.popups.traditions.text_${i + 2}`),
                preLine: i === 2,
              }))
            ].map((item, idx) => (
              <div key={idx}>
                {item.title && (
                  <h3 className="text-xl font-semibold text-[#4A6218]">
                    {item.title}
                  </h3>
                )}
                <p className={`text-brown mt-2 text-base leading-relaxed${item.preLine ? ' whitespace-pre-line' : ''}`}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-1"></div>
      </div>
    </div>
  );
};

export default TraditionsModal;