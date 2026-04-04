import type { UserProfile } from "@/lib/types";

export function dashboardFirstName(user: UserProfile): string {
	if (user.givenName?.trim()) return user.givenName.trim();
	const dn = user.displayName?.trim();
	if (dn) {
		const first = dn.split(/\s+/)[0];
		if (first) return first;
	}
	const local = user.email.split("@")[0];
	return local || "there";
}

export function dashboardInitials(user: UserProfile): string {
	if (user.givenName?.trim() && user.familyName?.trim()) {
		return (
			user.givenName.trim().charAt(0) + user.familyName.trim().charAt(0)
		).toUpperCase();
	}
	const dn = user.displayName?.trim();
	if (dn) {
		const parts = dn.split(/\s+/).filter(Boolean);
		if (parts.length >= 2) {
			return (
				parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
			).toUpperCase();
		}
		if (parts[0].length >= 2) return parts[0].slice(0, 2).toUpperCase();
		return parts[0].charAt(0).toUpperCase() || "?";
	}
	return user.email.charAt(0).toUpperCase() || "?";
}
