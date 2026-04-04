"use client";

import {
	ArrowRight,
	Bot,
	Sparkles,
	Wand2,
} from "lucide-react";

import { useLandingAuth } from "./use-landing-auth";

export function HeroSection() {
	const { user, primaryCta } = useLandingAuth();

	return (
		<section className="relative overflow-hidden pt-24 pb-32">
			<div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-full max-w-4xl -translate-x-1/2 opacity-30 dark:opacity-20">
				<div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 mix-blend-multiply blur-[100px] dark:mix-blend-normal dark:opacity-60" />
			</div>

			<div className="container relative z-10 mx-auto px-4 md:px-8">
				<div className="mx-auto max-w-3xl space-y-8 text-center">
					<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 shadow-sm dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-300">
						<Sparkles className="h-4 w-4" />
						<span>ApplyAI 2.0 is now live</span>
					</div>

					<h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-zinc-50 md:text-7xl">
						Apply to Jobs <br className="hidden md:block" />
						<span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
							10x Faster with AI
						</span>
					</h1>

					<p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-zinc-400 md:text-xl">
						Generate highly personalized, professional job application emails in seconds using your resume
						and the job description. Stand out without the burnout.
					</p>

					<div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
						<button
							type="button"
							onClick={primaryCta}
							className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:shadow-none dark:hover:bg-white sm:w-auto"
						>
							{user ? "Open dashboard" : "Start Applying Free"}
							<ArrowRight className="h-4 w-4" />
						</button>
						<a
							href="#demo"
							className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 sm:w-auto"
						>
							Try Demo
						</a>
					</div>
				</div>

				<div className="mx-auto mt-20 max-w-5xl">
					<div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/50 shadow-2xl backdrop-blur-xl dark:border-zinc-700/60 dark:bg-zinc-900/50">
						<div className="flex h-12 items-center gap-2 border-b border-slate-100 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-900">
							<div className="h-3 w-3 rounded-full bg-rose-400" />
							<div className="h-3 w-3 rounded-full bg-amber-400" />
							<div className="h-3 w-3 rounded-full bg-emerald-400" />
							<div className="mx-auto flex items-center gap-1 text-xs font-medium text-slate-400 dark:text-zinc-500">
								<Bot className="h-3 w-3" /> applyai.app
							</div>
						</div>

						<div className="grid bg-white/60 dark:bg-zinc-900/40 md:grid-cols-2">
							<div className="border-r border-slate-100 p-6 dark:border-zinc-800 md:p-8">
								<div className="space-y-4">
									<div className="space-y-2">
										<label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
											Target Role
										</label>
										<div className="flex h-10 items-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-200">
											Senior Frontend Engineer at Vercel
										</div>
									</div>
									<div className="space-y-2">
										<label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
											Job Description
										</label>
										<div className="relative h-32 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-400 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-500">
											<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 dark:to-zinc-900" />
											We are looking for an experienced frontend engineer who is passionate about
											building scalable, high-performance web applications using React and Next.js...
										</div>
									</div>
									<button
										type="button"
										className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-medium text-white shadow-md shadow-blue-600/20"
									>
										<Wand2 className="h-4 w-4" /> Generate Magic Email
									</button>
								</div>
							</div>

							<div className="bg-slate-50/50 p-6 dark:bg-zinc-950/50 md:p-8">
								<div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-500 group-hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
									<div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-zinc-800">
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
											AI
										</div>
										<div>
											<div className="text-sm font-semibold text-slate-800 dark:text-zinc-100">
												Application: Sr. Frontend Engineer
											</div>
											<div className="text-xs text-slate-500 dark:text-zinc-500">To: hiring@vercel.com</div>
										</div>
									</div>
									<div className="space-y-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
										<p>Hi Hiring Team,</p>
										<p>
											I noticed the Senior Frontend Engineer opening at Vercel and couldn&apos;t wait to
											apply. With my background in building high-performance React applications and
											scaling Next.js architectures, I am confident I can make an immediate impact on
											your core product team.
										</p>
										<div className="h-2 w-3/4 animate-pulse rounded bg-slate-100 dark:bg-zinc-800" />
										<div className="h-2 w-1/2 animate-pulse rounded bg-slate-100 dark:bg-zinc-800" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
