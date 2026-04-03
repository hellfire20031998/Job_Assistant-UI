import { CheckCircle2 } from "lucide-react";

export function BenefitsSection() {
	const benefits = [
		"Save 5+ hours a week applying to jobs",
		"Tailor every application automatically",
		"Bypass ATS filters with matched keywords",
		"Increase response rates by up to 40%",
		"Sound professional and confident every time",
		"Keep track of all sent applications",
	];

	return (
		<section className="relative overflow-hidden bg-slate-900 py-24 text-white">
			<div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500 opacity-20 mix-blend-screen blur-[100px] filter" />
			<div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-violet-500 opacity-20 mix-blend-screen blur-[100px] filter" />

			<div className="container relative z-10 mx-auto px-4 md:px-8">
				<div className="grid items-center gap-16 md:grid-cols-2">
					<div>
						<h2 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl">
							Focus on interviewing, <br />
							<span className="text-slate-400">we&apos;ll handle the applying.</span>
						</h2>
						<p className="mb-8 max-w-lg text-lg text-slate-300">
							The job market is a numbers game, but quality still matters. ApplyAI gives you the volume of a
							scattergun with the precision of a sniper.
						</p>

						<ul className="space-y-4">
							{benefits.map((benefit, idx) => (
								<li key={idx} className="flex items-center gap-3 text-slate-200">
									<CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-400" />
									<span>{benefit}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="relative">
						<div className="absolute inset-0 scale-105 rotate-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-violet-600 opacity-50 blur-lg" />
						<div className="relative rounded-2xl border border-slate-700 bg-slate-800 p-8 shadow-2xl backdrop-blur-xl">
							<div className="space-y-6">
								<div className="h-4 w-1/3 animate-pulse rounded bg-slate-700" />
								<div className="space-y-2">
									<div className="h-3 w-full rounded bg-slate-700/50" />
									<div className="h-3 w-full rounded bg-slate-700/50" />
									<div className="h-3 w-4/5 rounded bg-slate-700/50" />
								</div>
								<div className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
									<span className="flex items-center gap-2 text-sm font-medium text-emerald-400">
										<CheckCircle2 className="h-4 w-4" /> Perfect Match Found
									</span>
									<span className="text-xs text-slate-400">98% Fit</span>
								</div>
								<div className="space-y-2">
									<div className="h-3 w-full rounded bg-slate-700/50" />
									<div className="h-3 w-2/3 rounded bg-slate-700/50" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
