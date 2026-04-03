"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react";

import {
	clearStoredAccessToken,
	consumeAccessTokenFromUrl,
	setStoredAccessToken,
} from "@/lib/auth-storage";
import { fetchCurrentUser, getGoogleOAuthUrl, logoutSession } from "@/lib/api-client";
import type { UserProfile } from "@/lib/types";

export type AuthContextValue = {
	user: UserProfile | null;
	loading: boolean;
	signInWithGoogle: () => void;
	signOut: () => Promise<void>;
	refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);

	const refreshUser = useCallback(async () => {
		setLoading(true);
		try {
			const fromUrl = consumeAccessTokenFromUrl();
			if (fromUrl) {
				setStoredAccessToken(fromUrl);
			}
			const u = await fetchCurrentUser();
			setUser(u);
		} catch {
			setUser(null);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void refreshUser();
	}, [refreshUser]);

	const signInWithGoogle = useCallback(() => {
		window.location.assign(getGoogleOAuthUrl());
	}, []);

	const signOut = useCallback(async () => {
		try {
			await logoutSession();
		} catch {
			/* session may already be gone */
		}
		clearStoredAccessToken();
		setUser(null);
	}, []);

	const value = useMemo<AuthContextValue>(
		() => ({
			user,
			loading,
			signInWithGoogle,
			signOut,
			refreshUser,
		}),
		[user, loading, signInWithGoogle, signOut, refreshUser],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return ctx;
}
