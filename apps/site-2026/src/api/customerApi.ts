import { API_URL } from '../config';

const BASE = `${API_URL}/customer`;
const TOKEN_KEY = 'cust_token';
const EMAIL_KEY = 'cust_email';
const NAME_KEY = 'cust_name';

export function getStoredToken(): string | null { return localStorage.getItem(TOKEN_KEY); }
export function getStoredEmail(): string | null { return localStorage.getItem(EMAIL_KEY); }
export function getStoredName(): string | null { return localStorage.getItem(NAME_KEY); }

export function saveSession(token: string, email: string, name?: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EMAIL_KEY, email);
  if (name) localStorage.setItem(NAME_KEY, name);
  else localStorage.removeItem(NAME_KEY);
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
  localStorage.removeItem(NAME_KEY);
}

async function apiFetch<T>(method: string, path: string, body?: unknown): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = getStoredToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(BASE + path, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let detail = `HTTP ${res.status}`;
    try { detail = (await res.json()).detail || detail; } catch {}
    throw new Error(detail);
  }
  return res.json() as Promise<T>;
}

export interface AuthResponse {
  access_token: string;
  exp: number;
  customer_id: number;
  email: string;
  name?: string;
  lang?: string;
}

export interface TicketItem {
  id: number;
  ticket_id: string;
  name: string;
  active: boolean;
  is_sold: boolean;
  used: boolean;
}

export interface CustomerOrder {
  id: number;
  status: 'new' | 'paid' | string;
  amount: number;
  language: string;
  invoice_url: string;
  created_at: string;
  tickets: TicketItem[];
}

export interface CreateOrderBody {
  type_order: 'guest' | 'discounted' | 'family';
  lang: string;
  tickets: Array<{ name: string; send_email: boolean; email?: string }>;
}

export interface CreateOrderResponse {
  order_id: number;
  amount: number;
  status: string;
  invoice_url: string;
}

export const customerApi = {
  register: (email: string, password: string, lang: string, name?: string) =>
    apiFetch<AuthResponse>('POST', '/register', { email, password, lang, ...(name ? { name } : {}) }),

  login: (email: string, password: string) =>
    apiFetch<AuthResponse>('POST', '/auth', { email, password }),

  getOrders: () => apiFetch<CustomerOrder[]>('GET', '/orders'),

  createOrder: (body: CreateOrderBody) =>
    apiFetch<CreateOrderResponse>('POST', '/orders', body),

  downloadTicket: async (ticketId: number): Promise<Blob> => {
    const headers: Record<string, string> = {};
    const token = getStoredToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`${BASE}/tickets/${ticketId}/download`, { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.blob();
  },
};
