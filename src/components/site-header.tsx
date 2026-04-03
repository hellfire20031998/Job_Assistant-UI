"use client";

import Image from "next/image";
import Link from "next/link";

import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { useAuth } from "@/providers/auth-provider";

export function SiteHeader() {
	const { user, loading, signOut } = useAuth();

	return (
		<header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
			<div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
				<Link
					href="/"
					className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
				>
					JobAssistant
				</Link>
				<nav className="flex items-center gap-3">
					{loading ? (
						<span className="h-9 w-24 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
					) : user ? (
						<>
							<Link
								href="/dashboard"
								className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
							>
								Dashboard
							</Link>
							<div className="flex items-center gap-2">
								{user.pictureUrl ? (
									<Image
										src={user.pictureUrl}
										alt=""
										width={32}
										height={32}
										className="rounded-full ring-1 ring-zinc-200 dark:ring-zinc-700"
										referrerPolicy="no-referrer"
									/>
								) : null}
								<span className="hidden max-w-[10rem] truncate text-sm text-zinc-700 dark:text-zinc-300 sm:inline">
									{user.displayName ?? user.email}
								</span>
								<button
									type="button"
									onClick={() => void signOut()}
									className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
								>
									Sign out
								</button>
							</div>
						</>
					) : (
						<GoogleSignInButton className="py-2" label="Sign in" />
					)}
				</nav>
			</div>
		</header>
	);
}
