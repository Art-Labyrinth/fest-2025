import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {
  Program as ProgramData,
  ProgramDay,
  ProgramEvent,
  getCachedProgram,
  shouldRefetch,
  fetchProgram,
} from "../api/programApi";

const EMPTY_DAYS: ProgramDay[] = [];
const VIEW_KEY = "al-program-view"; // persists the venue/time toggle across reloads

type ViewMode = "zones" | "timeline";
type Status = "past" | "now" | "future";

function timeToMin(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

function timeSortKey(time: string | null): number {
  if (!time) return Number.POSITIVE_INFINITY; // untimed events sink to the bottom
  return timeToMin(time);
}

// End-time sort key: events without an end sink below same-start ones; an end
// at/before the start is treated as crossing midnight (e.g. 23:30–0:00).
function endSortKey(e: ProgramEvent): number {
  if (!e.start_time || !e.end_time) return Number.POSITIVE_INFINITY;
  const start = timeToMin(e.start_time);
  const end = timeToMin(e.end_time);
  return end <= start ? end + 24 * 60 : end;
}

// Chronological order: by start time, then by end time for events that start
// together (so "16:00–17:00" comes before "16:00–17:30").
function compareByTime(a: ProgramEvent, b: ProgramEvent): number {
  const byStart = timeSortKey(a.start_time) - timeSortKey(b.start_time);
  return byStart !== 0 ? byStart : endSortKey(a) - endSortKey(b);
}

function fmtMin(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function formatTimeRange(e: ProgramEvent): string {
  if (!e.start_time) return "";
  return e.end_time ? `${e.start_time}–${e.end_time}` : e.start_time;
}

// Status of an event relative to the current time-of-day (minutes since midnight).
// Comparing time-of-day (not absolute dates) lets ?DEBUG treat any day as "today".
function eventStatus(e: ProgramEvent, nowMin: number): Status {
  const start = timeToMin(e.start_time as string);
  let end = e.end_time ? timeToMin(e.end_time) : start + 30;
  if (end <= start) end += 24 * 60; // event crosses midnight (e.g. 23:30–0:00)
  if (nowMin >= end) return "past";
  if (nowMin >= start) return "now";
  return "future";
}

function EventRow({
  event,
  zone,
  status,
  nowLabel,
  id,
}: {
  event: ProgramEvent;
  zone?: string;
  status: Status | null;
  nowLabel: string;
  id?: string;
}) {
  const tone =
    status === "past"
      ? "opacity-40"
      : status === "now"
      ? "bg-[#4A6218]/10 border-l-4 border-[#4A6218]"
      : "";

  return (
    <div id={id} className={`flex gap-4 rounded-md px-3 py-2 transition-colors ${tone}`}>
      <div className="shrink-0 w-24 sm:w-32 text-base sm:text-lg font-bold tabular-nums pt-0.5">
        {formatTimeRange(event)}
      </div>
      <div className="min-w-0">
        <div className="text-lg sm:text-xl font-semibold leading-snug">
          {event.title}
          {status === "now" && (
            <span className="ml-2 align-middle inline-block text-xs sm:text-sm font-bold uppercase tracking-wide bg-[#4A6218] text-orange-150 rounded px-2 py-0.5">
              {nowLabel}
            </span>
          )}
        </div>
        {zone && <div className="text-sm sm:text-base opacity-60">{zone}</div>}
        {event.type && (
          <span className="inline-block text-sm sm:text-base opacity-70 mt-1">{event.type}</span>
        )}
        {event.host && (
          <div className="text-base sm:text-lg opacity-70 whitespace-pre-line">{event.host}</div>
        )}
        {event.description && (
          <div className="text-base sm:text-lg opacity-70 mt-1">{event.description}</div>
        )}
      </div>
    </div>
  );
}

export default function Program() {
  const { t } = useTranslation();
  const location = useLocation();
  // ?DEBUG forces the live highlight onto every day, as if each were today.
  const debug = new URLSearchParams(location.search.toUpperCase()).has("DEBUG");

  // Show whatever we cached last time immediately (stale-while-revalidate).
  const [program, setProgram] = useState<ProgramData | null>(
    () => getCachedProgram()?.data ?? null
  );
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>(() => {
    const saved = localStorage.getItem(VIEW_KEY);
    return saved === "timeline" || saved === "zones" ? saved : "zones";
  });
  useEffect(() => {
    localStorage.setItem(VIEW_KEY, view);
  }, [view]);

  // Current time-of-day in minutes, refreshed every minute so the "now"
  // highlight advances on its own while the tab stays open.
  const [nowMin, setNowMin] = useState(() => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  });
  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      setNowMin(d.getHours() * 60 + d.getMinutes());
    }, 60000);
    return () => clearInterval(id);
  }, []);

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

  // The status highlight only applies to today's day — or any day under ?DEBUG.
  const todayISO = new Date().toLocaleDateString("en-CA");
  const isActiveDay = !!selectedDay && (debug || selectedDay.date === todayISO);
  const nowLabel = String(t("program.now_badge"));

  // Flattened, time-ordered events for the timeline view (tagged with their zone).
  const timelineEvents = selectedDay
    ? selectedDay.objects
        .flatMap((o) => o.events.filter((e) => e.start_time).map((e) => ({ event: e, zone: o.name })))
        .sort((a, b) => compareByTime(a.event, b.event))
    : [];

  // Autoscroll to the current/next event — once, on the first load after a page
  // refresh, and only in the timeline view of an active day. The one-shot ref is
  // consumed as soon as data is ready, so later view/day switches never trigger it.
  const didInitialScroll = useRef(false);
  useEffect(() => {
    if (didInitialScroll.current) return;
    if (!selectedDate || timelineEvents.length === 0) return; // wait for pinned day + data
    didInitialScroll.current = true;
    if (view !== "timeline" || !isActiveDay) return;

    const target =
      timelineEvents.find(({ event }) => eventStatus(event, nowMin) === "now") ??
      timelineEvents.find(({ event }) => eventStatus(event, nowMin) === "future");
    if (!target) return;

    requestAnimationFrame(() => {
      document
        .getElementById(`event-${target.event.id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, timelineEvents.length]);

  return (
    <div className="font-deledda text-brown min-h-[60vh]">
      <div className="bg-brown text-orange-150 flex items-center justify-center py-16 px-5">
        <h1 className="text-3xl sm:text-5xl font-roca uppercase">{t("nav.program")}</h1>
      </div>

      <div className="px-4 pt-10 pb-20 max-w-6xl mx-auto">
        {days.length > 0 && (
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
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

        {selectedDay && (
          <div className="flex justify-center gap-2 mb-12">
            {(["zones", "timeline"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 rounded-full text-sm sm:text-base font-bold transition-all ${
                  view === v
                    ? "bg-brown text-orange-150"
                    : "bg-transparent border border-brown/40 text-brown hover:opacity-60"
                }`}
              >
                {t(`program.view_${v}`)}
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

        {debug && selectedDay && (
          <div className="max-w-3xl mx-auto mb-10 p-4 rounded-lg border-2 border-dashed border-red-400 bg-red-50 space-y-3">
            <div className="font-bold uppercase tracking-wide text-red-600">Debug</div>
            <div className="text-sm space-y-1">
              <div>
                Текущее время (сравнивается): <b>{fmtMin(nowMin)}</b> ({nowMin} мин)
              </div>
              <div>
                День: <b>{selectedDay.date}</b> · isActiveDay = <b>{String(isActiveDay)}</b> · сегодня {todayISO}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xs uppercase opacity-60">Пример «прошло» (затемнение):</div>
              <EventRow
                event={{ id: -1, start_time: "10:00", end_time: "10:30", title: "Пример прошедшего события", description: null, type: "🌿 Мастеркласс", host: "Ведущий" }}
                status="past"
                nowLabel={nowLabel}
              />
              <div className="text-xs uppercase opacity-60">Пример «сейчас» (выделение):</div>
              <EventRow
                event={{ id: -2, start_time: "10:30", end_time: "11:00", title: "Пример текущего события", description: null, type: "🎶 Концерт", host: "Ведущий" }}
                status="now"
                nowLabel={nowLabel}
              />
            </div>
          </div>
        )}

        {selectedDay && view === "zones" && (
          <div className="columns-1 lg:columns-2 gap-10">
            {selectedDay.objects.map((obj, i) => {
              // Events without a start time are a backend glitch — drop them.
              const events = obj.events
                .filter((e) => e.start_time)
                .sort(compareByTime);
              if (events.length === 0) return null; // hide now-empty zones

              return (
                <div key={i} className="mb-10 break-inside-avoid">
                  <h2 className="text-2xl sm:text-3xl font-roca uppercase font-bold mb-4 pb-1.5 border-b border-brown/30">
                    {obj.name}
                  </h2>
                  <div className="space-y-3">
                    {events.map((e) => (
                      <EventRow
                        key={e.id}
                        event={e}
                        status={isActiveDay ? eventStatus(e, nowMin) : null}
                        nowLabel={nowLabel}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {selectedDay && view === "timeline" && (
          <div className="max-w-3xl mx-auto space-y-2">
            {timelineEvents.map(({ event, zone }) => (
              <EventRow
                key={event.id}
                id={`event-${event.id}`}
                event={event}
                zone={zone}
                status={isActiveDay ? eventStatus(event, nowMin) : null}
                nowLabel={nowLabel}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
