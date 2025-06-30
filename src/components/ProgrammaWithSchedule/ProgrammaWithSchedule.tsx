import React from "react";
import Footer from "../Footer/Footer";
import {Header} from "../Header/Header";
import {useTranslation} from 'react-i18next';

export default function ProgrammaWithSchedule() {
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
          <div className="workshop-section schedule-section">
            <div className="workshop-section-title">
              MAIN STAGE
            </div>
            <div className="workshop-item">
              <div className="workshop-time">5:00-6:30</div>
              <div className="workshop-content">
                <div className="workshop-title">РАДЖАХИРАДЖА ЙОГа</div>
                <div className="workshop-author">Тоня</div>
                <div className="workshop-description">Практика</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">10:15-12:15</div>
              <div className="workshop-content">
                <div className="workshop-title">Extatic Dance</div>
                <div className="workshop-author">Max Malina</div>
                <div className="workshop-description">-</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">5:00-6:30</div>
              <div className="workshop-content">
                <div className="workshop-title">РАДЖАХИРАДЖА ЙОГа</div>
                <div className="workshop-author">Тоня</div>
                <div className="workshop-description">Практика</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">10:15-12:15</div>
              <div className="workshop-content">
                <div className="workshop-title">Extatic Dance</div>
                <div className="workshop-author">Max Malina</div>
                <div className="workshop-description">-</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">5:00-6:30</div>
              <div className="workshop-content">
                <div className="workshop-title">РАДЖАХИРАДЖА ЙОГа</div>
                <div className="workshop-author">Тоня</div>
                <div className="workshop-description">Практика</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">10:15-12:15</div>
              <div className="workshop-content">
                <div className="workshop-title">Extatic Dance</div>
                <div className="workshop-author">Max Malina</div>
                <div className="workshop-description">-</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">5:00-6:30</div>
              <div className="workshop-content">
                <div className="workshop-title">РАДЖАХИРАДЖА ЙОГа</div>
                <div className="workshop-author">Тоня</div>
                <div className="workshop-description">Практика</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">10:15-12:15</div>
              <div className="workshop-content">
                <div className="workshop-title">Extatic Dance</div>
                <div className="workshop-author">Max Malina</div>
                <div className="workshop-description">-</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">5:00-6:30</div>
              <div className="workshop-content">
                <div className="workshop-title">РАДЖАХИРАДЖА ЙОГа</div>
                <div className="workshop-author">Тоня</div>
                <div className="workshop-description">Практика</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">10:15-12:15</div>
              <div className="workshop-content">
                <div className="workshop-title">Extatic Dance</div>
                <div className="workshop-author">Max Malina</div>
                <div className="workshop-description">-</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">5:00-6:30</div>
              <div className="workshop-content">
                <div className="workshop-title">РАДЖАХИРАДЖА ЙОГа</div>
                <div className="workshop-author">Тоня</div>
                <div className="workshop-description">Практика</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">10:15-12:15</div>
              <div className="workshop-content">
                <div className="workshop-title">Extatic Dance</div>
                <div className="workshop-author">Max Malina</div>
                <div className="workshop-description">-</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">5:00-6:30</div>
              <div className="workshop-content">
                <div className="workshop-title">РАДЖАХИРАДЖА ЙОГа</div>
                <div className="workshop-author">Тоня</div>
                <div className="workshop-description">Практика</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">10:15-12:15</div>
              <div className="workshop-content">
                <div className="workshop-title">Extatic Dance</div>
                <div className="workshop-author">Max Malina</div>
                <div className="workshop-description">-</div>
              </div>
            </div>
          </div>
          <div className="workshop-section schedule-section">
            <div className="workshop-section-title">
              MAIN STAGE
            </div>
            <div className="workshop-item">
              <div className="workshop-time">5:00-6:30</div>
              <div className="workshop-content">
                <div className="workshop-title">РАДЖАХИРАДЖА ЙОГа</div>
                <div className="workshop-author">Тоня</div>
                <div className="workshop-description">Практика</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">10:15-12:15</div>
              <div className="workshop-content">
                <div className="workshop-title">Extatic Dance</div>
                <div className="workshop-author">Max Malina</div>
                <div className="workshop-description">-</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">5:00-6:30</div>
              <div className="workshop-content">
                <div className="workshop-title">РАДЖАХИРАДЖА ЙОГа</div>
                <div className="workshop-author">Тоня</div>
                <div className="workshop-description">Практика</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">10:15-12:15</div>
              <div className="workshop-content">
                <div className="workshop-title">Extatic Dance</div>
                <div className="workshop-author">Max Malina</div>
                <div className="workshop-description">-</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">5:00-6:30</div>
              <div className="workshop-content">
                <div className="workshop-title">РАДЖАХИРАДЖА ЙОГа</div>
                <div className="workshop-author">Тоня</div>
                <div className="workshop-description">Практика</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">10:15-12:15</div>
              <div className="workshop-content">
                <div className="workshop-title">Extatic Dance</div>
                <div className="workshop-author">Max Malina</div>
                <div className="workshop-description">-</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">5:00-6:30</div>
              <div className="workshop-content">
                <div className="workshop-title">РАДЖАХИРАДЖА ЙОГа</div>
                <div className="workshop-author">Тоня</div>
                <div className="workshop-description">Практика</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">10:15-12:15</div>
              <div className="workshop-content">
                <div className="workshop-title">Extatic Dance</div>
                <div className="workshop-author">Max Malina</div>
                <div className="workshop-description">-</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">5:00-6:30</div>
              <div className="workshop-content">
                <div className="workshop-title">РАДЖАХИРАДЖА ЙОГа</div>
                <div className="workshop-author">Тоня</div>
                <div className="workshop-description">Практика</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">10:15-12:15</div>
              <div className="workshop-content">
                <div className="workshop-title">Extatic Dance</div>
                <div className="workshop-author">Max Malina</div>
                <div className="workshop-description">-</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">5:00-6:30</div>
              <div className="workshop-content">
                <div className="workshop-title">РАДЖАХИРАДЖА ЙОГа</div>
                <div className="workshop-author">Тоня</div>
                <div className="workshop-description">Практика</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">10:15-12:15</div>
              <div className="workshop-content">
                <div className="workshop-title">Extatic Dance</div>
                <div className="workshop-author">Max Malina</div>
                <div className="workshop-description">-</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">5:00-6:30</div>
              <div className="workshop-content">
                <div className="workshop-title">РАДЖАХИРАДЖА ЙОГа</div>
                <div className="workshop-author">Тоня</div>
                <div className="workshop-description">Практика</div>
              </div>
            </div>
            <div className="workshop-item">
              <div className="workshop-time">10:15-12:15</div>
              <div className="workshop-content">
                <div className="workshop-title">Extatic Dance</div>
                <div className="workshop-author">Max Malina</div>
                <div className="workshop-description">-</div>
              </div>
            </div>
          </div>


          <img className="width-[692px] max-w-[100%] ml-auto mr-auto" src="/Programma/tree.png" alt=""/>

        </div>
      </div>
      <Footer/>
    </>
  );
}
