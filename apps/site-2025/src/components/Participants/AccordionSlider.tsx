import React, { RefObject } from "react";

interface SliderItem {
  title: string;
  text: string;
}

interface AccordionSliderProps {
  items: SliderItem[];
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
  refs: RefObject<(HTMLDivElement | null)[]>;
  t: (key: string) => string;
}

const AccordionSlider: React.FC<AccordionSliderProps> = ({ items, openIndex, setOpenIndex, refs, t }) => (
  <div>
    {items.map((slider, index) => (
      <div key={index} className="border-t border-[#774E384D] py-4">
        <button
          className="w-full text-left text-xl font-semibold text-brown flex justify-between items-center"
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          {t(slider.title) || `Slider ${index + 1}`}
          <svg
            className={`w-6 h-6 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div
          ref={el => { if (refs.current) refs.current[index] = el; }}
          className="overflow-hidden transition-[height,opacity] duration-500 ease-in-out"
          style={{ height: openIndex === index ? '0px' : '0px', opacity: openIndex === index ? 1 : 0 }}
        >
          <div className="mt-2 text-brown py-2 h-auto whitespace-pre-line">
            <p>{t(slider.text) || 'Information will be added later'}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default AccordionSlider;