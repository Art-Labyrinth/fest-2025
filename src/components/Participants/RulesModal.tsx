import React from "react";
import i18next from 'i18next';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
}

const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose, t }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg w-[95%] mx-2 sm:w-fit sm:mx-4 sm:max-w-[50%] relative transform transition-transform duration-300 max-h-[80vh] overflow-y-auto ${isOpen ? 'scale-100' : 'scale-95'}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="p-4 bg-white relative">
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

        {/* Top block: header, text, 3 icons (all centered) */}
        <div className="p-6 bg-white border-b border-gray-200 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-[#4A6218] font-deledda mb-4 text-center">
            {t("participants.popups.rules.header_1")}
          </h2>
          <p className="text-brown text-base leading-relaxed mb-6 text-center">
            {(i18next.t("participants.popups.rules.texts_1", { returnObjects: true, lng: i18next.language }) as string[]).map((item, idx) => (
              <span key={idx} className="block">{item}</span>
            ))}
          </p>
          <div className="flex gap-4">
            <img src="/Participants/recycle.png" alt="Recycle" className="w-12 h-12" />
            <img src="/Participants/meditate.png" alt="Meditate" className="w-12 h-12" />
            <img src="/Participants/kindness.png" alt="Kindness" className="w-12 h-12" />
          </div>
        </div>

        {/* Bottom block: header, text, 3 icons left and right */}
        <div className="p-6 bg-white flex flex-col items-center">
          <h2 className="text-2xl font-bold text-[#F07B17] font-deledda mb-4 text-center">
            {t("participants.popups.rules.header_2")}
          </h2>
          <div className="flex items-center">
            <div className="flex gap-4 flex-col">
              <img src="/Participants/no_alco.png" alt="No_alco" className="w-12 h-13" />
              <img src="/Participants/zero_noise.png" alt="Zero_noise" className="w-12 h-13" />
              <img src="/Participants/no_rage.png" alt="No_rage" className="w-12 h-13" />
            </div>
            <p className="text-brown text-base leading-relaxed mx-6 text-center">
              {(i18next.t("participants.popups.rules.texts_2", { returnObjects: true, lng: i18next.language }) as string[]).map((item, idx) => (
                <span key={idx} className="block">{item}</span>
              ))}
            </p>
            <div className="flex gap-4 flex-col">
              <img src="/Participants/no_smoking.png" alt="No_smoking" className="w-12 h-13" />
              <img src="/Participants/no_fire.png" alt="No_fire" className="w-12 h-13" />
              <img src="/Participants/no_garbage.png" alt="No_garbage" className="w-12 h-13" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;