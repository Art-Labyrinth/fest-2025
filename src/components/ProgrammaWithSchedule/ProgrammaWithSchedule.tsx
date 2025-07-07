import React, {useState, useEffect} from "react";
import Footer from "../Footer/Footer";
import {Header} from "../Header/Header";
import {useTranslation} from 'react-i18next';

interface Event {
  event_time: string;
  event_title: string;
}

interface ScheduleSection {
  title: string;
  events: Event[];
}

const days = ["thursday", "friday", "saturday", "sunday"];

export default function ProgrammaWithSchedule() {
  const {t} = useTranslation();
  const [selectedDay, setSelectedDay] = useState("thursday");

  const schedules: Record<string, ScheduleSection[]> = {
    thursday: t("schedule_thursday", {returnObjects: true}) as ScheduleSection[],
    friday: t("schedule_friday", {returnObjects: true}) as ScheduleSection[],
    saturday: t("schedule_saturday", {returnObjects: true}) as ScheduleSection[],
    sunday: t("schedule_sunday", {returnObjects: true}) as ScheduleSection[],
  };

  const schedule = schedules[selectedDay] || [];

  useEffect(() => {
    const today = new Date();
    if (today.getFullYear() === 2025 && today.getMonth() === 6) {
      if (today.getDate() === 10) {
        setSelectedDay("thursday");
      } else if (today.getDate() === 11) {
        setSelectedDay("friday");
      } else if (today.getDate() === 12) {
        setSelectedDay("saturday");
      } else if (today.getDate() === 13) {
        setSelectedDay("sunday");
      }
    }
  }, []);

  return (
    <>
      <div className="bg-main">
        <Header/>
      </div>
      <div className="flex align-middle justify-center w-[100%] max-w-[100%] h-[37vw] md:h-[29vw] ml-auto mr-auto bg-cover" style={{backgroundImage: "url(/Programma/banner.jpg)"}}>
        <h1 className="text-[#F4E4C3] self-center text-3xl sm:text-[40px] font-serif uppercase font-bold">{t("programma.header")}</h1>
      </div>

      <div className="px-4 w-[1730px] max-w-[100%] mt-[50px] mb-0 ml-auto mr-auto">
        <div className="flex justify-center gap-[18px] mb-[70px] flex-wrap">
          {days.map((day) => (
            <button
              key={day}
              className={`px-6 py-2 rounded-[6px] text-lg uppercase font-bold transition-all ${
                selectedDay === day
                  ? "bg-[#351904] text-[#F4E4C3]"
                  : "bg-transparent border border-[#351904] text-[#351904]"
              }`}
              onClick={() => setSelectedDay(day)}
            >
              {t(`tab_${day}`)}
            </button>
          ))}
        </div>


        <div className="columns-1 lg:columns-2 gap-[40px] mb-[50px]">
          {schedule.length === 0 && <div>Нет расписания на этот день</div>}

          {schedule.map((section, i) => (
            <div key={i} className="workshop-section schedule-section">
              <div className="workshop-section-title">{section.title}</div>

              {section.events &&
                section.events.map((event, j) => {
                  if (!event.event_time && !event.event_title) return null;

                  return (
                    <div key={j} className="workshop-item">
                      <div className="workshop-time">{event.event_time}</div>
                      <div className="workshop-content">
                        <div className="workshop-title">{event.event_title}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
          <div className="no-break-inside">
            <p className="text-[22px]">
              <span className="font-bold">{t('zones_label')}</span>:{' '}{t('zones')}
            </p>
            <p className="mt-[30px] text-xl font-evolventa">{t('temaskal')}</p>
            <p className="text-xl font-evolventa">{t('womens_space')}</p>
            <p className="text-xl font-evolventa">{t('fantacy_space')}</p>
            <p className="mb-[30px] text-xl font-evolventa">{t('kitchens')}</p>
            <p className="mb-[30px] text-xl">{t('changes')}</p>
            <img className="width-[692px] max-w-[100%] ml-auto mr-auto" src="/Programma/tree.png" alt=""/>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
