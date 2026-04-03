import { getApiBaseUrl } from "./env";
import { getStoredAccessToken } from "./auth-storage";
import type { ApiResponse, UserProfile } from "./types";

function buildHeaders(init?: HeadersInit): Headers {
	const headers = new Headers(init);
	const token = getStoredAccessToken();
	if (token && !headers.has("Authorization")) {
		headers.set("Authorization", `Bearer ${token}`);
	}
	return headers;
}

export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
	const base = getApiBaseUrl();
	const url = path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;
	return fetch(url, {
		...init,
		headers: buildHeaders(init?.headers),
		credentials: "include",
	});
}

export async function fetchCurrentUser(): Promise<UserProfile | null> {
	const res = await apiFetch("/api/v1/auth/me");
	if (res.status === 401) return null;
	if (!res.ok) {
		throw new Error(`Failed to load profile (${res.status})`);
	}
	const body = (await res.json()) as ApiResponse<UserProfile>;
	if (!body.success || !body.data) return null;
	return body.data;
}

export async function logoutSession(): Promise<void> {
	await apiFetch("/api/v1/auth/logout", { method: "POST" });
}

export function getGoogleOAuthUrl(): string {
	return `${getApiBaseUrl()}/oauth2/authorization/google`;
}
