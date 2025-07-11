import React from "react";
import Footer from "../Footer/Footer";
import {Header} from "../Header/Header";
import {useTranslation} from 'react-i18next';

export default function Programma() {
  const {t} = useTranslation();
  return (
    <>
      <div className="bg-main">
        <Header/>
      </div>
      <div className="flex align-middle justify-center w-[100%] max-w-[100%] h-[37vw] md:h-[29vw] ml-auto mr-auto bg-cover" style={{backgroundImage: "url(/Programma/banner.jpg)"}}>
        <h1 className="text-[#F4E4C3] self-center text-3xl sm:text-[40px] font-serif uppercase font-bold">{t("programma.header")}</h1>
      </div>
      <div className="px-4 w-[1730px] max-w-[100%] mt-0 mb-0 ml-auto mr-auto">

        <div className="uppercase text-center text-3xl sm:text-4xl tracking-widest-text font-serif mt-[50px] sm:mt-[95px] mb-[40px] sm:mb-[80px] ml-auto mr-auto break-all">
          {t("programma.header_1")}
        </div>

        <div className="columns-1 lg:columns-2 gap-[40px]">
          <div className="workshop-section">
            <div className="workshop-section-name">
              {t("programma.workshop_section_name_1")}
            </div>
            {[...Array(18)].map((_, i) => {
              const index = i + 101;
              return (
                <div key={index} className="workshop-item">
                  <div className="workshop-title">{t(`programma.workshop_title_${index}`)}</div>
                  <div className="workshop-author">{t(`programma.workshop_author_${index}`)}</div>
                  {t(`workshop_description_${index}`) && (
                    <div className="workshop-description">{t(`programma.workshop_description_${index}`)}</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="workshop-section">
            <div className="workshop-section-name">{t("programma.workshop_section_name_2")}</div>
            {[...Array(9)].map((_, i) => {
              const index = i + 201;
              return (
                <div key={index} className="workshop-item">
                  <div className="workshop-title">{t(`programma.workshop_title_${index}`)}</div>
                  <div className="workshop-author">{t(`programma.workshop_author_${index}`)}</div>
                  {t(`workshop_description_${index}`) && (
                    <div className="workshop-description">{t(`programma.workshop_description_${index}`)}</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="workshop-section-title font-serif">{t("programma.header_2")}</div>
          <div className="workshop-section">
            <div className="workshop-section-name tracking-widest-text">{t("programma.workshop_section_name_3")}</div>
            {[...Array(20)].map((_, i) => {
              const index = i + 301;
              return (
                <>
                  {index !== 315 && index !== 319 &&
                    <div key={index} className="workshop-item">
                      <div className="workshop-title">{t(`programma.workshop_title_${index}`)}</div>
                      <div className="workshop-author">{t(`programma.workshop_author_${index}`)}</div>
                      {t(`workshop_description_${index}`) && (
                        <div className="workshop-description">{t(`programma.workshop_description_${index}`)}</div>
                      )}
                    </div>}
                </>
              );
            })}
          </div>

          <div className="workshop-section lg:break-after-column">
            <div className="workshop-section-name tracking-widest-text">{t("programma.workshop_section_name_4")}</div>
            {[...Array(4)].map((_, i) => {
              const index = i + 401;
              return (
                <div key={index} className="workshop-item">
                  <div className="workshop-title">{t(`programma.workshop_title_${index}`)}</div>
                  <div className="workshop-author">{t(`programma.workshop_author_${index}`)}</div>
                  {t(`workshop_description_${index}`) && (
                    <div className="workshop-description">{t(`programma.workshop_description_${index}`)}</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="workshop-section">
            <div className="workshop-section-name">{t("programma.workshop_section_name_5")}</div>
            {[...Array(8)].map((_, i) => {
              const index = i + 501;
              return (
                <div key={index} className="workshop-item">
                  <div className="workshop-title">{t(`programma.workshop_title_${index}`)}</div>
                  <div className="workshop-author">{t(`programma.workshop_author_${index}`)}</div>
                  {t(`workshop_description_${index}`) && (
                    <div className="workshop-description">{t(`programma.workshop_description_${index}`)}</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="workshop-section">
            <div className="workshop-section-name">{t("programma.workshop_section_name_6")}</div>
            {[...Array(14)].map((_, i) => {
              const index = i + 601;
              return (
                <div key={index} className="workshop-item">
                  <div className="workshop-title">{t(`programma.workshop_title_${index}`)}</div>
                  <div className="workshop-author">{t(`programma.workshop_author_${index}`)}</div>
                  {t(`workshop_description_${index}`) && (
                    <div className="workshop-description">{t(`programma.workshop_description_${index}`)}</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="workshop-section">
            <div className="workshop-section-name">{t("programma.workshop_section_name_7")}</div>
            {[...Array(9)].map((_, i) => {
              const index = i + 701;
              return (
                <div key={index} className="workshop-item">
                  <div className="workshop-title">{t(`programma.workshop_title_${index}`)}</div>
                  <div className="workshop-author">{t(`programma.workshop_author_${index}`)}</div>
                  {t(`workshop_description_${index}`) && (
                    <div className="workshop-description">{t(`programma.workshop_description_${index}`)}</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="workshop-section">
            <div className="workshop-section-name">{t("programma.workshop_section_name_8")}</div>
            {[...Array(6)].map((_, i) => {
              const index = i + 801;
              return (
                <div key={index} className="workshop-item">
                  <div className="workshop-title">{t(`programma.workshop_title_${index}`)}</div>
                  <div className="workshop-author">{t(`programma.workshop_author_${index}`)}</div>
                  {t(`workshop_description_${index}`) && (
                    <div className="workshop-description">{t(`programma.workshop_description_${index}`)}</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="workshop-section sm:min-h-[420px]">
            <div className="workshop-section-name">{t("programma.workshop_section_name_9")}</div>
            {[...Array(1)].map((_, i) => {
              const index = i + 901;
              return (
                <div key={index} className="workshop-item">
                  <div className="workshop-title">{t(`programma.workshop_title_${index}`)}</div>
                  <div className="workshop-author">{t(`programma.workshop_author_${index}`)}</div>
                  {t(`workshop_description_${index}`) && (
                    <div className="workshop-description">{t(`programma.workshop_description_${index}`)}</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="font-serif mt-[70px] sm:mt-[140px] mb-[28px] uppercase leading-[1.3] tracking-wider text-2xl sm:text-4xl">
            {t('programma.note_3')}
          </div>
          <div className="font-serif mt-[28px] mb-[28px] uppercase leading-[1.3] tracking-wider text-2xl sm:text-4xl">
            {t('programma.note_1')}
          </div>
          <div className="font-serif mt-[28px] mb-[28px] uppercase leading-[1.3] tracking-wider text-2xl sm:text-4xl">
            {t('programma.note_4')}
          </div>


          <div className="font-evolventa mb-[60px] sm:mb-[124px] tracking-wider font-bold text-2xl sm:text-[32px] leading-[1.3]">

            {t('programma.note_2')}
          </div>


          <img className="width-[692px] max-w-[100%] ml-auto mr-auto" src="/Programma/tree.png" alt=""/>

        </div>
      </div>
      <Footer/>
    </>
  );
}
