import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const days = ["thursday", "friday", "saturday", "sunday"] as const;
type Day = typeof days[number];

export default function Program() {
  const { t } = useTranslation();
  const [selectedDay, setSelectedDay] = useState<Day>("thursday");

  useEffect(() => {
    const today = new Date();
    if (today.getFullYear() === 2026 && today.getMonth() === 5) {
      if (today.getDate() === 18) setSelectedDay("thursday");
      else if (today.getDate() === 19) setSelectedDay("friday");
      else if (today.getDate() === 20) setSelectedDay("saturday");
      else if (today.getDate() === 21) setSelectedDay("sunday");
    }
  }, []);

  return (
    <div className="font-deledda text-brown min-h-[60vh]">
      <div className="bg-brown text-orange-150 flex items-center justify-center py-16 px-5">
        <h1 className="text-3xl sm:text-5xl font-roca uppercase">{t("nav.program")}</h1>
      </div>

      <div className="px-4 pt-10 pb-20 max-w-6xl mx-auto">
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {days.map((day) => (
            <button
              key={day}
              className={`px-5 py-2 rounded-md text-sm sm:text-base uppercase font-bold transition-all ${
                selectedDay === day
                  ? "bg-brown text-orange-150"
                  : "bg-transparent border border-brown text-brown hover:opacity-60"
              }`}
              onClick={() => setSelectedDay(day)}
            >
              {t(`program.tab_${day}`)}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center py-24 text-2xl opacity-40 uppercase tracking-widest">
          {t("program.coming_soon")}
        </div>
      </div>
    </div>
  );
}
