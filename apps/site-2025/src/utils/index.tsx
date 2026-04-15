import { API_URL } from '../config';

export async function fetchCsrfToken() {
    const sessionId = localStorage.getItem("sessionId") || "";
    if (!sessionId) {
        const sessionId = crypto.randomUUID();
        localStorage.setItem("sessionId", sessionId);
    }
    try {
        const response = await fetch(`${API_URL}/form/csrf-token`, {
            method: "GET",
            headers: { "X-Session-ID": sessionId },
        });

        if (!response.ok) {
            return;
        }

        const data = await response.json();
        localStorage.setItem("csrf_token", data.csrf_token);
    } catch (error) { }
}

export function getRandomInt(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}