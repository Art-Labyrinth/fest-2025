import React, { useEffect, useRef, useState } from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

function Participants() {
const { t } = useTranslation<'translation'>();
const navigate = useNavigate();
const [isRulesPopupOpen, setIsRulesPopupOpen] = useState(false);
const [isTraditionsPopupOpen, setIsTraditionsPopupOpen] = useState(false);

const [openGuestSlider, setOpenGuestSlider] = useState<number | null>(null);
const [openOrgSlider, setOpenOrgSlider] = useState<number | null>(null);
const [openMasterSlider, setOpenMasterSlider] = useState<number | null>(null);

const guestSliderRefs = useRef<(HTMLDivElement | null)[]>([]);
const orgSliderRefs = useRef<(HTMLDivElement | null)[]>([]);
const masterSliderRefs = useRef<(HTMLDivElement | null)[]>([]);

const toggleGuestSlider = (index: number) => setOpenGuestSlider(openGuestSlider === index ? null : index);
const toggleOrgSlider = (index: number) => setOpenOrgSlider(openOrgSlider === index ? null : index);
const toggleMasterSlider = (index: number) => setOpenMasterSlider(openMasterSlider === index ? null : index);

useEffect(() => {
    const updateHeight = (refs: (HTMLDivElement | null)[], openIndex: number | null) => {
      refs.forEach((el, idx) => {
        if (el) {
          if (openIndex === idx) {
            requestAnimationFrame(() => {
              el.style.height = `${el.scrollHeight}px`;
            });
          } else {
            el.style.height = '0px';
          }
        }
      });
    };

    updateHeight(guestSliderRefs.current, openGuestSlider);
    updateHeight(orgSliderRefs.current, openOrgSlider);
    updateHeight(masterSliderRefs.current, openMasterSlider);
  }, [openGuestSlider, openOrgSlider, openMasterSlider]);

useEffect(() => {
  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsRulesPopupOpen(false);
      setIsTraditionsPopupOpen(false);
    }
  };
  if (isRulesPopupOpen || isTraditionsPopupOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isRulesPopupOpen, isTraditionsPopupOpen]);


  return (
    <main>
      <div className="min-h-screen bg-main flex flex-col">
        {/* 1. Header */}
        <div className="bg-main">
            <Header />
        </div>

        {/* 2. Hero блок с собственным фоном */}
        <section
          className="relative bg-cover bg-top sm:bg-[center_28%] py-[5%] w-full
            bg-[url('https://files.art-labyrinth.org/fest2025/participants/sm_hero_bg.webp')]
            md:bg-[url('https://files.art-labyrinth.org/fest2025/participants/md_hero_bg.webp')]
            lg:bg-[url('https://files.art-labyrinth.org/fest2025/participants/lg_hero_bg.webp')]
            xl:bg-[url('https://files.art-labyrinth.org/fest2025/participants/xl_hero_bg.webp')]
            2xl:bg-[url('https://files.art-labyrinth.org/fest2025/participants/2xl_hero_bg.webp')]"
        >
          <div className="flex flex-col relative container mx-auto px-4 text-center z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-brown font-deledda mb-4 text-[#F4E4C3]">
              {t("participants.hero.header")}
            </h1>
            <div className="sm:w-full sm:max-w-[50%] mx-auto p-6 text-justify text-[#F4E4C3]">
              <p className="text-brown text-lg">
              {t("participants.hero.text")}
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-[#35190499] bg-opacity-60"></div>
        </section>

        {/* 3. Блок с двумя большими кнопками */}
        <section className="py-12 bg-[#F4E4C3]">
          <div className="container mx-auto px-4 flex flex-col items-center">
            <div className="flex gap-6 mb-6">
              <button
                onClick={() => setIsRulesPopupOpen(true)}
                className="flex sm:flex-col flex-col items-center justify-center gap-3"
              >
                <img src="/Participants/rules.png" alt="Rules" className="w-20 h-20" />
                <span className="text-lg font-semibold text-brown">{t("participants.popups.rules.button")}</span>
              </button>
              <button onClick={() => setIsTraditionsPopupOpen(true)}
              className="flex sm:flex-col flex-col items-center justify-center gap-3">
                <img src="/Participants/traditions.png" alt="Traditions" className="w-20 h-20" />
                <span className="text-lg font-semibold text-brown">{t("participants.popups.traditions.button")}</span>
              </button>
            </div>
          </div>

          {/* Попап для "ТРАДИЦИИ" с заголовком и кнопкой вне скроллируемого блока */}
          {isTraditionsPopupOpen && (
            <div
              className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${
                isTraditionsPopupOpen ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={() => setIsTraditionsPopupOpen(false)}
            >
              <div
                className={`bg-white rounded-lg w-[95%] mx-2 sm:w-full sm:mx-4 sm:max-w-[50%] relative transform transition-transform duration-300 max-h-[80vh] ${
                  isTraditionsPopupOpen ? 'scale-100' : 'scale-95'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Заголовок и кнопка закрытия вне скроллируемого блока */}
                <div className="p-4 bg-white border-b border-gray-200 relative">
                  <h2 className="text-3xl font-bold text-[#4A6218] font-deledda mb-0 text-center">
                    {t("participants.popups.traditions.header")}
                  </h2>
                  <button
                    onClick={() => setIsTraditionsPopupOpen(false)}
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

                {/* Скроллируемый блок с контентом */}
                <div className="p-4 overflow-y-auto object-contain bg-top max-h-[calc(80vh-4rem)]">
                    <div className="space-y-6">
                      <div>
                        <p className="text-brown text-base leading-relaxed">
                          {t("participants.popups.traditions.text_1")}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#4A6218]">
                          {t("participants.popups.traditions.title_1")}
                        </h3>
                        <p className="text-brown mt-2 text-base leading-relaxed">
                          {t("participants.popups.traditions.text_2")}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#4A6218]">
                          {t("participants.popups.traditions.title_2")}
                        </h3>
                        <p className="text-brown mt-2 text-base leading-relaxed">
                          {t("participants.popups.traditions.text_3")}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#4A6218]">
                          {t("participants.popups.traditions.title_3")}
                        </h3>
                        <p className="text-brown mt-2 text-base leading-relaxed whitespace-pre-line">
                          {t("participants.popups.traditions.text_4")}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#4A6218]">
                          {t("participants.popups.traditions.title_4")}
                        </h3>
                        <p className="text-brown mt-2 text-base leading-relaxed">
                          {t("participants.popups.traditions.text_5")}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#4A6218]">
                          {t("participants.popups.traditions.title_5")}
                        </h3>
                        <p className="text-brown mt-2 text-base leading-relaxed">
                          {t("participants.popups.traditions.text_6")}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#4A6218]">
                          {t("participants.popups.traditions.title_6")}
                        </h3>
                        <p className="text-brown mt-2 text-base leading-relaxed">
                          {t("participants.popups.traditions.text_7")}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#4A6218]">
                          {t("participants.popups.traditions.title_7")}
                        </h3>
                        <p className="text-brown mt-2 text-base leading-relaxed">
                          {t("participants.popups.traditions.text_8")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          )}

          {/* Попап для "ПРАВИЛА" */}
          {isRulesPopupOpen && (
            <div
              className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${
                isRulesPopupOpen ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={() => setIsRulesPopupOpen(false)}
            >
              <div
                className={`bg-white rounded-lg w-[95%] mx-2 sm:w-fit sm:mx-4 sm:max-w-[50%] relative transform transition-transform duration-300 max-h-[80vh] overflow-y-auto ${
                  isRulesPopupOpen ? 'scale-100' : 'scale-95'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Кнопка закрытия */}
                <div className="p-4 bg-white relative">
                  <button
                    onClick={() => setIsRulesPopupOpen(false)}
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

                {/* Верхний блок: заголовок, текст, 3 иконки (все отцентрировано) */}
                <div className="p-6 bg-white border-b border-gray-200 flex flex-col items-center">
                  <h2 className="text-2xl font-bold text-[#4A6218] font-deledda mb-4 text-center">
                    {t("participants.popups.rules.header_1")}
                  </h2>
                  <p className="text-brown text-base leading-relaxed mb-6 text-center whitespace-pre-line">
                    {t("participants.popups.rules.text_1")}
                  </p>
                  <div className="flex gap-4">
                    <img src="/Participants/recycle.png" alt="Recycle" className="w-12 h-12" />
                    <img src="/Participants/meditate.png" alt="Meditate" className="w-12 h-12" />
                    <img src="/Participants/kindness.png" alt="Kindness" className="w-12 h-12" />
                  </div>
                </div>

                {/* Нижний блок: заголовок, текст, по 3 иконки слева и справа */}
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
                    <p className="text-brown text-base leading-relaxed mx-6 text-center whitespace-pre-line">
                      {t("participants.popups.rules.text_2")}
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
          )}
        </section>

        {/* 4. Блок ГОСТЯМ */}
        <section className="py-16 bg-main">
          <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-center">
            {/* Левая часть */}
            <div className="md:w-1/2 flex flex-col items-left justify-center h-full">
              <h2 className="text-3xl font-bold text-brown font-deledda mb-4">{t("participants.guest.header")}</h2>
              <p className="text-brown mb-6">{t("participants.guest.text")}</p>
              <button
                 className="bg-[#F07B17] text-white py-2 px-6 rounded-lg hover:bg-opacity-70 w-fit"
                 onClick={() => navigate("/contribute")}>
                  {t("participants.guest.button")}
                  </button>
            </div>

            {/* Правая часть: слайдеры */}
            <div className="md:w-1/2">
              {[
                { title: 'participants.guest.titles.slider_1', text: 'participants.guest.texts.text_1' },
                { title: 'participants.guest.titles.slider_2', text: 'participants.guest.texts.text_2' },
                { title: 'participants.guest.titles.slider_3', text: 'participants.guest.texts.text_3' },
                { title: 'participants.guest.titles.slider_4', text: 'participants.guest.texts.text_4' },
                { title: 'participants.guest.titles.slider_5', text: 'participants.guest.texts.text_5' },
                { title: 'participants.guest.titles.slider_6', text: 'participants.guest.texts.text_6' },
                { title: 'participants.guest.titles.slider_7', text: 'participants.guest.texts.text_7' },
                { title: 'participants.guest.titles.slider_8', text: 'participants.guest.texts.text_8' },
                { title: 'participants.guest.titles.slider_9', text: 'participants.guest.texts.text_9' },
                { title: 'participants.guest.titles.slider_10', text: 'participants.guest.texts.text_10' },
                { title: 'participants.guest.titles.slider_11', text: 'participants.guest.texts.text_11' },
                { title: 'participants.guest.titles.slider_12', text: 'participants.guest.texts.text_12' },
                { title: 'participants.guest.titles.slider_13', text: 'participants.guest.texts.text_13' },
                { title: 'participants.guest.titles.slider_14', text: 'participants.guest.texts.text_14' },
                { title: 'participants.guest.titles.slider_15', text: 'participants.guest.texts.text_15' },
              ].map((slider, index) => (
                <div key={index} className="border-t border-[#774E384D] py-4">
                  <button className="w-full text-left text-xl font-semibold text-brown flex justify-between items-center" onClick={() => toggleGuestSlider(index)}>
                    {t(slider.title) || `Slider ${index + 1}`}
                    <svg className={`w-6 h-6 transform transition-transform duration-300 ${openGuestSlider === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div ref={(el) => { guestSliderRefs.current[index] = el; }} className="overflow-hidden transition-[height,opacity] duration-500 ease-in-out" style={{ height: openGuestSlider === index ? '0px' : '0px', opacity: openGuestSlider === index ? 1 : 0 }}>
                    <div className="mt-2 text-brown py-2 h-auto whitespace-pre-line">
                      <p>{t(slider.text) || 'Информация будет добавлена позже'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Блок ОРГАНИЗАТОРАМ */}
        <section className="py-16 bg-[#F4E4C3]">
          <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-center">
            {/* Левая часть */}
            <div className="md:w-1/2 flex flex-col items-left justify-center h-full">
              <h2 className="text-3xl font-bold text-brown font-deledda mb-4">{t("participants.org.header")}</h2>
              <p className="text-brown mb-6">{t("participants.org.text")}</p>
              <a href="https://join.art-labyrinth.org/volunteer" className="bg-[#F07B17] text-white py-2 px-6 rounded-lg hover:bg-opacity-70 w-fit" target="_blank" rel="noopener noreferrer">{t("participants.org.button")}</a>
            </div>

            {/* Правая часть: слайдеры */}
            <div className="md:w-1/2">
              {[
                { title: 'participants.org.titles.slider_1', text: 'participants.org.texts.text_1' },
                { title: 'participants.org.titles.slider_2', text: 'participants.org.texts.text_2' },
                { title: 'participants.org.titles.slider_3', text: 'participants.org.texts.text_3' },
                { title: 'participants.org.titles.slider_4', text: 'participants.org.texts.text_4' },
                { title: 'participants.org.titles.slider_5', text: 'participants.org.texts.text_5' },
                { title: 'participants.org.titles.slider_6', text: 'participants.org.texts.text_6' },
                { title: 'participants.org.titles.slider_7', text: 'participants.org.texts.text_7' },
                { title: 'participants.org.titles.slider_8', text: 'participants.org.texts.text_8' },
                { title: 'participants.org.titles.slider_9', text: 'participants.org.texts.text_9' },
                { title: 'participants.org.titles.slider_10', text: 'participants.org.texts.text_10' },
                { title: 'participants.org.titles.slider_11', text: 'participants.org.texts.text_11' },
                { title: 'participants.org.titles.slider_12', text: 'participants.org.texts.text_12' },
                { title: 'participants.org.titles.slider_13', text: 'participants.org.texts.text_13' },
              ].map((slider, index) => (
                <div key={index} className="border-t border-[#774E384D] py-4">
                  <button className="w-full text-left text-xl font-semibold text-brown flex justify-between items-center" onClick={() => toggleOrgSlider(index)}>
                    {t(slider.title) || `Slider ${index + 1}`}
                    <svg className={`w-6 h-6 transform transition-transform duration-300 ${openOrgSlider === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div ref={(el) => { orgSliderRefs.current[index] = el; }} className="overflow-hidden transition-[height,opacity] duration-500 ease-in-out" style={{ height: openOrgSlider === index ? '0px' : '0px', opacity: openOrgSlider === index ? 1 : 0 }}>
                    <div className="mt-2 text-brown py-2 h-auto whitespace-pre-line">
                      <p>{t(slider.text) || 'Информация будет добавлена позже'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Блок МАСТЕРАМ */}
        <section className="py-16 bg-main">
          <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-center">
            {/* Левая часть */}
            <div className="md:w-1/2 flex flex-col items-left">
              <h2 className="text-3xl font-bold text-brown font-deledda mb-4">{t("participants.master.header")}</h2>
              <p className="text-brown mb-6">{t("participants.master.text")}</p>
              <a href="https://join.art-labyrinth.org/master" className="bg-[#F07B17] text-white py-2 px-6 rounded-lg hover:bg-opacity-70 w-fit" target="_blank" rel="noopener noreferrer">{t("participants.org.button")}</a>
            </div>

            {/* Правая часть: слайдеры */}
            <div className="md:w-1/2">
              {[
                { title: 'participants.master.titles.slider_1', text: 'participants.master.texts.text_1' },
                { title: 'participants.master.titles.slider_2', text: 'participants.master.texts.text_2' },
                { title: 'participants.master.titles.slider_3', text: 'participants.master.texts.text_3' },
                { title: 'participants.master.titles.slider_4', text: 'participants.master.texts.text_4' },
                { title: 'participants.master.titles.slider_5', text: 'participants.master.texts.text_5' },
                { title: 'participants.master.titles.slider_6', text: 'participants.master.texts.text_6' },
                { title: 'participants.master.titles.slider_7', text: 'participants.master.texts.text_7' },
                { title: 'participants.master.titles.slider_8', text: 'participants.master.texts.text_8' },
                { title: 'participants.master.titles.slider_9', text: 'participants.master.texts.text_9' },
                { title: 'participants.master.titles.slider_10', text: 'participants.master.texts.text_10' },
                { title: 'participants.master.titles.slider_11', text: 'participants.master.texts.text_11' },
              ].map((slider, index) => (
                <div key={index} className="border-t border-[#774E384D] py-4">
                  <button className="w-full text-left text-xl font-semibold text-brown flex justify-between items-center" onClick={() => toggleMasterSlider(index)}>
                    {t(slider.title) || `Slider ${index + 1}`}
                    <svg className={`w-6 h-6 transform transition-transform duration-300 ${openMasterSlider === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div ref={(el) => { masterSliderRefs.current[index] = el; }} className="overflow-hidden transition-[height,opacity] duration-500 ease-in-out" style={{ height: openMasterSlider === index ? '0px' : '0px', opacity: openMasterSlider === index ? 1 : 0 }}>
                    <div className="mt-2 text-brown py-2 h-auto whitespace-pre-line">
                      <p>{t(slider.text) || 'Информация будет добавлена позже'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <div className="bg-[#F4E4C3]">
        <Footer backgroundColor="bg-[#F4E4C3]"/>
      </div>
    </main>
  );
}

export default Participants;