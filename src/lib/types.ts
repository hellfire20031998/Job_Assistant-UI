export type UserProfile = {
	id: string;
	email: string;
	emailVerified: boolean;
	displayName: string | null;
	givenName: string | null;
	familyName: string | null;
	pictureUrl: string | null;
	locale: string | null;
	provider: string | null;
	roles: string[];
	lastLoginAt: string | null;
	memberSince: string | null;
};

export type ApiResponse<T> = {
	success: boolean;
	message: string | null;
	data: T | null;
};
