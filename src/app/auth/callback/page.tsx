"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { SiteHeader } from "@/components/site-header";
import { useAuth } from "@/providers/auth-provider";

export default function AuthCallbackPage() {
	const router = useRouter();
	const { user, loading } = useAuth();

	useEffect(() => {
		if (loading) return;
		if (user) {
			router.replace("/dashboard");
		} else {
			router.replace("/?error=auth");
		}
	}, [loading, user, router]);

	return (
		<>
			<SiteHeader />
			<main className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
				<div className="h-10 w-10 animate-spin rounded-full border-2 border-violet-600 border-t-transparent dark:border-violet-400" />
				<p className="text-sm text-zinc-600 dark:text-zinc-400">Finishing sign-in…</p>
			</main>
		</>
	);
}
