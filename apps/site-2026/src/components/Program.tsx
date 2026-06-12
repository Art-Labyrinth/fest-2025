import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Program as ProgramData,
  ProgramDay,
  ProgramEvent,
  getCachedProgram,
  shouldRefetch,
  fetchProgram,
} from "../api/programApi";

const EMPTY_DAYS: ProgramDay[] = [];

function timeSortKey(time: string | null): number {
  if (!time) return Number.POSITIVE_INFINITY; // untimed events sink to the bottom
  const [h, m] = time.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

function formatTimeRange(e: ProgramEvent): string {
  if (!e.start_time) return "";
  return e.end_time ? `${e.start_time}–${e.end_time}` : e.start_time;
}

export default function Program() {
  const { t } = useTranslation();

  // Show whatever we cached last time immediately (stale-while-revalidate).
  const [program, setProgram] = useState<ProgramData | null>(
    () => getCachedProgram()?.data ?? null
  );
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // On mount: refresh from the backend only if our caching rule allows it.
  useEffect(() => {
    const cache = getCachedProgram();
    if (!shouldRefetch(cache)) return;

    let active = true;
    if (!cache) setLoading(true); // only block the UI when we have nothing to show
    fetchProgram()
      .then((data) => { if (active) setProgram(data); })
      .catch(() => { /* keep showing cached data on failure */ })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, []);

  const days = program?.days ?? EMPTY_DAYS;

  // Pin the tab to today's day during the festival, otherwise the first day.
  useEffect(() => {
    if (days.length === 0) return;
    setSelectedDate((prev) => {
      if (prev && days.some((d) => d.date === prev)) return prev;
      const todayISO = new Date().toLocaleDateString("en-CA"); // local YYYY-MM-DD
      return days.find((d) => d.date === todayISO)?.date ?? days[0].date;
    });
  }, [days]);

  const activeDate = selectedDate ?? days[0]?.date;
  const selectedDay = days.find((d) => d.date === activeDate) ?? null;

  return (
    <div className="font-deledda text-brown min-h-[60vh]">
      <div className="bg-brown text-orange-150 flex items-center justify-center py-16 px-5">
        <h1 className="text-3xl sm:text-5xl font-roca uppercase">{t("nav.program")}</h1>
      </div>

      <div className="px-4 pt-10 pb-20 max-w-6xl mx-auto">
        {days.length > 0 && (
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {days.map((day) => (
              <button
                key={day.date}
                className={`px-6 py-2.5 rounded-md text-base sm:text-lg uppercase font-bold transition-all ${
                  activeDate === day.date
                    ? "bg-brown text-orange-150"
                    : "bg-transparent border border-brown text-brown hover:opacity-60"
                }`}
                onClick={() => setSelectedDate(day.date)}
              >
                {day.label}
              </button>
            ))}
          </div>
        )}

        {loading && days.length === 0 && (
          <div className="flex items-center justify-center py-24 text-xl opacity-40 uppercase tracking-widest">
            {t("program.loading")}
          </div>
        )}

        {!loading && days.length === 0 && (
          <div className="flex items-center justify-center py-24 text-2xl opacity-40 uppercase tracking-widest">
            {t("program.coming_soon")}
          </div>
        )}

        {selectedDay && (
          <div className="columns-1 lg:columns-2 gap-10">
            {selectedDay.objects.map((obj, i) => {
              // Events without a start time are a backend glitch — drop them.
              const events = obj.events
                .filter((e) => e.start_time)
                .sort((a, b) => timeSortKey(a.start_time) - timeSortKey(b.start_time));
              if (events.length === 0) return null; // hide now-empty zones

              return (
                <div key={i} className="mb-10 break-inside-avoid">
                  <h2 className="text-2xl sm:text-3xl font-roca uppercase font-bold mb-4 pb-1.5 border-b border-brown/30">
                    {obj.name}
                  </h2>
                  <div className="space-y-4">
                    {events.map((e) => (
                      <div key={e.id} className="flex gap-4">
                        <div className="shrink-0 w-24 sm:w-28 text-base sm:text-lg font-bold tabular-nums pt-0.5">
                          {formatTimeRange(e)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-lg sm:text-xl font-semibold leading-snug">{e.title}</div>
                          {e.type && (
                            <span className="inline-block text-sm sm:text-base opacity-70 mt-1">{e.type}</span>
                          )}
                          {e.host && (
                            <div className="text-base sm:text-lg opacity-70 whitespace-pre-line">{e.host}</div>
                          )}
                          {e.description && (
                            <div className="text-base sm:text-lg opacity-70 mt-1">{e.description}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
