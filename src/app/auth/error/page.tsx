"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { SiteHeader } from "@/components/site-header";

function AuthErrorInner() {
	const searchParams = useSearchParams();
	const reason = searchParams.get("reason");

	return (
		<>
			<SiteHeader />
			<main className="mx-auto flex max-w-lg flex-1 flex-col gap-6 px-4 py-16">
				<h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
					We couldn&apos;t sign you in
				</h1>
				<p className="text-zinc-600 dark:text-zinc-400">
					{reason === "oauth"
						? "Google sign-in was cancelled or failed. Try again when you are ready."
						: "Something went wrong during authentication."}
				</p>
				<div className="flex flex-wrap gap-3">
					<GoogleSignInButton label="Try again" />
					<Link
						href="/"
						className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-5 py-3 text-sm font-medium text-zinc-800 dark:border-zinc-700 dark:text-zinc-200"
					>
						Home
					</Link>
				</div>
			</main>
		</>
	);
}

export default function AuthErrorPage() {
	return (
		<Suspense fallback={<div className="p-8 text-center text-zinc-500">Loading…</div>}>
			<AuthErrorInner />
		</Suspense>
	);
}
