import { API_URL } from '../config';

// --- Domain types (the backend `comment` field is intentionally omitted) ---

export interface ProgramEvent {
  id: number;
  start_time: string | null;
  end_time: string | null;
  title: string;
  description: string | null;
  type: string | null;
  host: string | null;
}

export interface ProgramObject {
  name: string;
  events: ProgramEvent[];
}

export interface ProgramDay {
  date: string;  // ISO date, e.g. "2026-06-18"
  label: string; // human label from the backend, e.g. "четверг 18-06"
  objects: ProgramObject[];
}

export interface Program {
  year: number;
  days: ProgramDay[];
}

interface CachedProgram {
  fetchedAt: number; // epoch ms of the last successful fetch
  data: Program;
}

const YEAR = 2026;
const STORAGE_KEY = `al-program-${YEAR}`;
const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // don't refetch more often than every 5 min

// Once this instant passes, the program is final: we stop hitting the backend
// entirely and only fetch when nothing is cached. June 30 00:00 Europe/Chișinău
// (the +03:00 offset is EEST, correct for June) — i.e. "after June 29".
const FREEZE_AFTER = new Date('2026-06-30T00:00:00+03:00');

export function getCachedProgram(): CachedProgram | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedProgram;
    if (!Array.isArray(parsed?.data?.days)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveProgram(data: Program): void {
  const payload: CachedProgram = { fetchedAt: Date.now(), data };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // localStorage may be full or unavailable — fall back to in-memory only.
  }
}

/**
 * Decide whether to hit the backend, given what's cached and the current time.
 *  - nothing cached            → always fetch (even after the freeze date)
 *  - past the freeze date       → never fetch (data is final, we have it)
 *  - otherwise                  → only if the last fetch was ≥ 5 minutes ago
 */
export function shouldRefetch(cache: CachedProgram | null, now: Date = new Date()): boolean {
  if (!cache) return true;
  if (now >= FREEZE_AFTER) return false;
  return now.getTime() - cache.fetchedAt >= REFRESH_INTERVAL_MS;
}

function normalize(raw: any): Program {
  const days: ProgramDay[] = (raw?.days ?? []).map((d: any) => ({
    date: d.date,
    label: d.label,
    objects: (d.objects ?? []).map((o: any) => ({
      name: o.name,
      events: (o.events ?? []).map((e: any) => ({
        id: e.id,
        start_time: e.start_time ?? null,
        end_time: e.end_time ?? null,
        title: e.title,
        description: e.description ?? null,
        type: e.type ?? null,
        host: e.host ?? null,
        // `comment` deliberately dropped — backend-only.
      })),
    })),
  }));
  return { year: raw?.year ?? YEAR, days };
}

/** GET the program from the backend, normalize it, and cache it on success. */
export async function fetchProgram(): Promise<Program> {
  const res = await fetch(`${API_URL}/program/?year=${YEAR}`, {
    headers: { accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = normalize(await res.json());
  saveProgram(data);
  return data;
}
