/**
 * Public env is inlined at build time; must be prefixed with NEXT_PUBLIC_.
 * For deployed apps, set NEXT_PUBLIC_API_URL before `next build` so the client bundle points at your API.
 */
export function getApiBaseUrl(): string {
	const raw = process.env.NEXT_PUBLIC_API_URL?.trim();
	if (raw) {
		return raw.replace(/\/$/, "");
	}
	return "http://localhost:8080";
}
