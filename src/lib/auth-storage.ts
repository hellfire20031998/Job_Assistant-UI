const TOKEN_KEY = "jobassistant_access_token";

export function getStoredAccessToken(): string | null {
	if (typeof window === "undefined") return null;
	return sessionStorage.getItem(TOKEN_KEY);
}

export function setStoredAccessToken(token: string): void {
	sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredAccessToken(): void {
	sessionStorage.removeItem(TOKEN_KEY);
}

export function consumeAccessTokenFromUrl(): string | null {
	if (typeof window === "undefined") return null;
	const params = new URLSearchParams(window.location.search);
	const token = params.get("access_token");
	if (!token) return null;
	params.delete("access_token");
	const next =
		window.location.pathname +
		(params.toString() ? `?${params.toString()}` : "") +
		window.location.hash;
	window.history.replaceState({}, "", next);
	return token;
}
