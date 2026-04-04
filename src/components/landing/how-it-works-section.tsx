export function HowItWorksSection() {
	const steps = [
		{
			num: "01",
			title: "Paste Job Description",
			desc: "Drop in the URL or text of the job you want. We analyze the core requirements and keywords.",
		},
		{
			num: "02",
			title: "Upload Resume",
			desc: "Provide your latest PDF resume. Our AI finds the perfect intersection between your skills and their needs.",
		},
		{
			num: "03",
			title: "Generate & Send",
			desc: "Get a beautifully formatted email draft in seconds. Tweak it if you want, and hit send.",
		},
	];

	return (
		<section id="how-it-works" className="border-y border-slate-200/60 bg-slate-50 py-24 dark:border-zinc-800/60 dark:bg-zinc-900/40">
			<div className="container mx-auto px-4 md:px-8">
				<div className="mb-16">
					<h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50 md:text-4xl">
						Three steps to your next role
					</h2>
				</div>

				<div className="relative grid gap-8 md:grid-cols-3">
					<div className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-zinc-700 dark:via-zinc-600 dark:to-zinc-700 md:block" />

					{steps.map((step, idx) => (
						<div key={idx} className="relative z-10 flex flex-col gap-4 pt-4 md:pt-0">
							<div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-900 bg-white text-xl font-bold text-slate-900 shadow-sm dark:border-zinc-100 dark:bg-zinc-950 dark:text-zinc-50">
								{step.num}
							</div>
							<h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-zinc-50">{step.title}</h3>
							<p className="text-slate-600 dark:text-zinc-400">{step.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
