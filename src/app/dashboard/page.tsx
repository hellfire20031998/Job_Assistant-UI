"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { SiteHeader } from "@/components/site-header";
import { useAuth } from "@/providers/auth-provider";

function formatInstant(iso: string | null): string {
	if (!iso) return "—";
	try {
		return new Date(iso).toLocaleString();
	} catch {
		return iso;
	}
}

export default function DashboardPage() {
	const router = useRouter();
	const { user, loading } = useAuth();

	useEffect(() => {
		if (loading) return;
		if (!user) router.replace("/");
	}, [loading, user, router]);

	if (loading || !user) {
		return (
			<>
				<SiteHeader />
				<main className="mx-auto flex max-w-3xl flex-1 justify-center px-4 py-24">
					<div className="h-10 w-10 animate-spin rounded-full border-2 border-violet-600 border-t-transparent dark:border-violet-400" />
				</main>
			</>
		);
	}

	return (
		<>
			<SiteHeader />
			<main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
				<h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Your profile</h1>
				<p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
					Data from your JobAssistant account (synced from Google on each sign-in).
				</p>
				<dl className="mt-8 grid gap-6 sm:grid-cols-2">
					<ProfileField label="Email" value={user.email} />
					<ProfileField
						label="Email verified"
						value={user.emailVerified ? "Yes" : "No"}
					/>
					<ProfileField label="Display name" value={user.displayName ?? "—"} />
					<ProfileField label="Provider" value={user.provider ?? "—"} />
					<ProfileField label="Roles" value={user.roles.join(", ") || "—"} />
					<ProfileField label="Last sign-in" value={formatInstant(user.lastLoginAt)} />
					<ProfileField label="Member since" value={formatInstant(user.memberSince)} />
					<ProfileField label="Locale" value={user.locale ?? "—"} />
				</dl>
			</main>
		</>
	);
}

function ProfileField({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
			<dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
				{label}
			</dt>
			<dd className="mt-1 break-all text-sm text-zinc-900 dark:text-zinc-100">{value}</dd>
		</div>
	);
}
