import React, { useEffect, useRef, useState } from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import AccordionSlider from "./AccordionSlider";
import TraditionsModal from "./TraditionsModal";
import RulesModal from "./RulesModal";

function Participants() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isRulesPopupOpen, setIsRulesPopupOpen] = useState(false);
  const [isTraditionsPopupOpen, setIsTraditionsPopupOpen] = useState(false);

  const [openGuestSlider, setOpenGuestSlider] = useState<number | null>(null);
  const [openOrgSlider, setOpenOrgSlider] = useState<number | null>(null);
  const [openMasterSlider, setOpenMasterSlider] = useState<number | null>(null);

  const guestSliderRefs = useRef<(HTMLDivElement | null)[]>([]);
  const orgSliderRefs = useRef<(HTMLDivElement | null)[]>([]);
  const masterSliderRefs = useRef<(HTMLDivElement | null)[]>([]);

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

        {/* 2. Hero section with custom background */}
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

        {/* 3. Section with two large buttons */}
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

          {/* Popup for "TRADITIONS" with header and close button outside the scrollable block */}
          {isTraditionsPopupOpen && (
            <TraditionsModal
              isOpen={isTraditionsPopupOpen}
              onClose={() => setIsTraditionsPopupOpen(false)}
              t={t}
            />
          )}

          {/* Popup for "RULES" */}
          {isRulesPopupOpen && (
            <RulesModal
              isOpen={isRulesPopupOpen}
              onClose={() => setIsRulesPopupOpen(false)}
              t={t}
            />
          )}
        </section>

        {/* 4. Guests block */}
        <section className="py-16 bg-main">
          <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-center">
            {/* Left part */}
            <div className="md:w-1/2 flex flex-col items-left justify-center h-full">
              <h2 className="text-3xl font-bold text-brown font-deledda mb-4">{t("participants.guest.header")}</h2>
              <p className="text-brown mb-6">{t("participants.guest.text")}</p>
              <button
                className="bg-[#F07B17] text-white py-2 px-6 rounded-lg hover:bg-opacity-70 w-fit"
                onClick={() => navigate("/contribute")}>
                {t("participants.guest.button")}
              </button>
            </div>

            {/* Right part: sliders */}
            <div className="md:w-1/2">
              <AccordionSlider
                items={Array.from({ length: 15 }, (_, i) => ({
                  title: `participants.guest.titles.slider_${i + 1}`,
                  text: `participants.guest.texts.text_${i + 1}`,
                }))}
                openIndex={openGuestSlider}
                setOpenIndex={setOpenGuestSlider}
                refs={guestSliderRefs}
                t={t}
              />
            </div>
          </div>
        </section>

        {/* 5. Organizers block */}
        <section className="py-16 bg-[#F4E4C3]">
          <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-center">
            {/* Left part */}
            <div className="md:w-1/2 flex flex-col items-left justify-center h-full">
              <h2 className="text-3xl font-bold text-brown font-deledda mb-4">{t("participants.org.header")}</h2>
              <p className="text-brown mb-6">{t("participants.org.text")}</p>
              <a href="https://join.art-labyrinth.org/volunteer" className="bg-[#F07B17] text-white py-2 px-6 rounded-lg hover:bg-opacity-70 w-fit" target="_blank" rel="noopener noreferrer">{t("participants.org.button")}</a>
            </div>

            {/* Right part: sliders */}
            <div className="md:w-1/2">
              <AccordionSlider
                items={Array.from({ length: 13 }, (_, i) => ({
                  title: `participants.org.titles.slider_${i + 1}`,
                  text: `participants.org.texts.text_${i + 1}`,
                }))}
                openIndex={openOrgSlider}
                setOpenIndex={setOpenOrgSlider}
                refs={orgSliderRefs}
                t={t}
              />
            </div>
          </div>
        </section>

        {/* 6. Masters block */}
        <section className="py-16 bg-main">
          <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-center">
            {/* Left part */}
            <div className="md:w-1/2 flex flex-col items-left">
              <h2 className="text-3xl font-bold text-brown font-deledda mb-4">{t("participants.master.header")}</h2>
              <p className="text-brown mb-6">{t("participants.master.text")}</p>
              <a href="https://join.art-labyrinth.org/master" className="bg-[#F07B17] text-white py-2 px-6 rounded-lg hover:bg-opacity-70 w-fit" target="_blank" rel="noopener noreferrer">{t("participants.org.button")}</a>
            </div>

            {/* Right part: sliders */}
            <div className="md:w-1/2">
              <AccordionSlider
                items={Array.from({ length: 11 }, (_, i) => ({
                  title: `participants.master.titles.slider_${i + 1}`,
                  text: `participants.master.texts.text_${i + 1}`,
                }))}
                openIndex={openMasterSlider}
                setOpenIndex={setOpenMasterSlider}
                refs={masterSliderRefs}
                t={t}
              />
            </div>
          </div>
        </section>
      </div>
      <div className="bg-[#F4E4C3]">
        <Footer backgroundColor="bg-[#F4E4C3]" />
      </div>
    </main>
  );
}

export default Participants;