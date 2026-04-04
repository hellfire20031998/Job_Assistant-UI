"use client";

import { useLandingAuth } from "./use-landing-auth";

export function CTASection() {
	const { user, primaryCta } = useLandingAuth();

	return (
		<section className="bg-white py-24 text-center dark:bg-zinc-950">
			<div className="container mx-auto px-4">
				<h2 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-zinc-50 md:text-5xl">
					Start applying smarter today.
				</h2>
				<p className="mx-auto mb-10 max-w-2xl text-xl text-slate-600 dark:text-zinc-400">
					Join thousands of job seekers landing their dream roles faster. No credit card required to start.
				</p>
				<button
					type="button"
					onClick={primaryCta}
					className="rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-600/50 active:scale-95"
				>
					{user ? "Open dashboard" : "Create Your First Application"}
				</button>
				<p className="mt-4 text-sm text-slate-500 dark:text-zinc-500">
					Free forever tier available. 10 applications per month.
				</p>
			</div>
		</section>
	);
}
