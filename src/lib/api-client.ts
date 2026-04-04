import { getApiBaseUrl } from "./env";
import { getStoredAccessToken } from "./auth-storage";
import type { ApiResponse, ResumeDocument, ResumeSummary, UserProfile } from "./types";

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

async function readErrorMessage(res: Response): Promise<string> {
	try {
		const j = (await res.json()) as { message?: string; error?: string };
		if (j?.message) return j.message;
		if (j?.error) return String(j.error);
	} catch {
		/* ignore */
	}
	return `Request failed (${res.status})`;
}

export async function listResumes(): Promise<ResumeSummary[]> {
	const res = await apiFetch("/api/v1/me/resumes");
	if (!res.ok) throw new Error(await readErrorMessage(res));
	const body = (await res.json()) as ApiResponse<ResumeSummary[]>;
	if (!body.success || !body.data) throw new Error(body.message ?? "Failed to list resumes");
	return body.data;
}

export async function getResume(id: string): Promise<ResumeDocument> {
	const res = await apiFetch(`/api/v1/me/resumes/${id}`);
	if (!res.ok) throw new Error(await readErrorMessage(res));
	const body = (await res.json()) as ApiResponse<ResumeDocument>;
	if (!body.success || !body.data) throw new Error(body.message ?? "Failed to load resume");
	return body.data;
}

/** Must match server `app.resume.max-per-user` (default 5). */
export const RESUME_MAX_PER_USER = 5;

export async function deleteResume(id: string): Promise<void> {
	const res = await apiFetch(`/api/v1/me/resumes/${id}`, { method: "DELETE" });
	if (!res.ok) throw new Error(await readErrorMessage(res));
	const body = (await res.json()) as ApiResponse<unknown>;
	if (!body.success) throw new Error(body.message ?? "Delete failed");
}

export async function uploadResume(file: File): Promise<ResumeDocument> {
	const fd = new FormData();
	fd.append("file", file);
	const res = await apiFetch("/api/v1/me/resumes", {
		method: "POST",
		body: fd,
	});
	if (!res.ok) throw new Error(await readErrorMessage(res));
	const body = (await res.json()) as ApiResponse<ResumeDocument>;
	if (!body.success || !body.data) throw new Error(body.message ?? "Upload failed");
	return body.data;
}

export type ResumeUpdatePayload = {
	label?: string | null;
	isDefault?: boolean;
	personalInfo?: ResumeDocument["personalInfo"];
	summary?: string | null;
	skills?: ResumeDocument["skills"];
	experiences?: ResumeDocument["experiences"];
	projects?: ResumeDocument["projects"];
	education?: ResumeDocument["education"];
	certifications?: ResumeDocument["certifications"];
	achievements?: string[];
	languages?: string[];
	preferences?: ResumeDocument["preferences"];
	metadata?: ResumeDocument["metadata"];
	rawModelJson?: Record<string, unknown> | null;
};

export async function updateResume(id: string, payload: ResumeUpdatePayload): Promise<ResumeDocument> {
	const res = await apiFetch(`/api/v1/me/resumes/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	if (!res.ok) throw new Error(await readErrorMessage(res));
	const body = (await res.json()) as ApiResponse<ResumeDocument>;
	if (!body.success || !body.data) throw new Error(body.message ?? "Save failed");
	return body.data;
}
