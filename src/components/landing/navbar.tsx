"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

import { GoogleGlyph } from "@/components/google-sign-in-button";

import { useLandingAuth } from "./use-landing-auth";

export function Navbar() {
	const { user, loading, signInWithGoogle, signOut } = useLandingAuth();

	return (
		<nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
			<div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
				<div className="flex items-center gap-2">
					<div className="rounded-lg bg-blue-600 p-1.5">
						<Sparkles className="h-5 w-5 text-white" />
					</div>
					<span className="text-xl font-bold tracking-tight">ApplyAI</span>
				</div>
				<div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
					<a href="#features" className="transition-colors hover:text-slate-900">
						Features
					</a>
					<a href="#how-it-works" className="transition-colors hover:text-slate-900">
						How it Works
					</a>
					<a href="#demo" className="transition-colors hover:text-slate-900">
						Demo
					</a>
				</div>
				<div className="flex items-center gap-4">
					{loading ? (
						<div className="h-9 w-28 animate-pulse rounded-full bg-slate-100" />
					) : user ? (
						<>
							<Link
								href="/dashboard"
								className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 md:inline-block"
							>
								Dashboard
							</Link>
							<button
								type="button"
								onClick={() => void signOut()}
								className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
							>
								Sign out
							</button>
						</>
					) : (
						<>
							<button
								type="button"
								onClick={signInWithGoogle}
								className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 md:block"
							>
								Log in
							</button>
							<button
								type="button"
								onClick={signInWithGoogle}
								className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95"
							>
								<span className="scale-90">
									<GoogleGlyph />
								</span>
								Get Started
							</button>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
