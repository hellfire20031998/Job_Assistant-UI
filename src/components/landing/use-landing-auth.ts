"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/auth-provider";

export function useLandingAuth() {
	const { user, loading, signInWithGoogle, signOut } = useAuth();
	const router = useRouter();

	const goDashboard = () => {
		router.push("/dashboard");
	};

	const primaryCta = () => {
		if (user) goDashboard();
		else signInWithGoogle();
	};

	return {
		user,
		loading,
		signInWithGoogle,
		signOut,
		goDashboard,
		primaryCta,
	};
}
