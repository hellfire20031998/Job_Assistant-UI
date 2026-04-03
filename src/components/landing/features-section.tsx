import {
	Calendar,
	FileText,
	Send,
	Wand2,
} from "lucide-react";

export function FeaturesSection() {
	const features = [
		{
			icon: <Wand2 className="h-6 w-6 text-blue-600" />,
			title: "AI Email Generation",
			description:
				"Our fine-tuned models write highly context-aware emails that highlight your exact matching skills.",
		},
		{
			icon: <FileText className="h-6 w-6 text-violet-600" />,
			title: "Smart Resume Parsing",
			description:
				"Upload your PDF once. We extract your experience, skills, and tone to make every email sound like you.",
		},
		{
			icon: <Send className="h-6 w-6 text-emerald-600" />,
			title: "One-Click Sending",
			description:
				"Connect your Gmail or Outlook. Review the generated draft and send directly from our dashboard.",
		},
		{
			icon: <Calendar className="h-6 w-6 text-amber-600" />,
			title: "Smart Scheduling",
			description:
				"Automatically append your Cal.com or Calendly link when recruiters ask for availability.",
		},
	];

	return (
		<section id="features" className="bg-white py-24">
			<div className="container mx-auto px-4 md:px-8">
				<div className="mx-auto mb-16 max-w-2xl text-center">
					<h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
						Everything you need to land the interview
					</h2>
					<p className="text-lg text-slate-600">
						Stop copy-pasting standard templates. Let AI craft the perfect pitch for every single application.
					</p>
				</div>

				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{features.map((feature, idx) => (
						<div
							key={idx}
							className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5"
						>
							<div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
								{feature.icon}
							</div>
							<h3 className="mb-2 text-xl font-semibold text-slate-900">{feature.title}</h3>
							<p className="leading-relaxed text-slate-600">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
