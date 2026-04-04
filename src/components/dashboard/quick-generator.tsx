"use client";

import { useState } from "react";
import { Check, Copy, FileText, Send, Sparkles, Wand2 } from "lucide-react";

type Props = {
	applicantName: string;
};

export function QuickGenerator({ applicantName }: Props) {
	const [isGenerating, setIsGenerating] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const [copied, setCopied] = useState(false);

	const handleGenerate = () => {
		setIsGenerating(true);
		setShowResult(false);
		setTimeout(() => {
			setIsGenerating(false);
			setShowResult(true);
		}, 1500);
	};

	const handleCopy = () => {
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-1 shadow-xl shadow-slate-200/40 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/30">
			<div className="flex h-full flex-col rounded-xl border border-slate-100 bg-slate-50/50 p-5 dark:border-zinc-800 dark:bg-zinc-950/50">
				<h2 className="mb-4 flex items-center gap-2 font-semibold text-slate-900 dark:text-zinc-50">
					<Wand2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
					Quick draft
				</h2>

				{!showResult ? (
					<div className="flex flex-1 flex-col space-y-4">
						<div className="space-y-2">
							<label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
								Job URL or description
							</label>
							<textarea
								placeholder="Paste the job description or LinkedIn URL here..."
								className="h-32 w-full resize-none rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:placeholder:text-zinc-600"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
								Resume profile
							</label>
							<button
								type="button"
								className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-white p-3 text-left shadow-sm transition-colors hover:border-blue-300 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:border-blue-600"
							>
								<div className="flex items-center gap-3">
									<div className="rounded bg-blue-50 p-1.5 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
										<FileText className="h-4 w-4" />
									</div>
									<div className="text-sm font-medium text-slate-700 dark:text-zinc-200">
										Primary resume (demo)
									</div>
								</div>
								<div className="text-xs font-medium text-slate-400 dark:text-zinc-500">Change</div>
							</button>
						</div>

						<div className="flex-1" />

						<button
							type="button"
							onClick={handleGenerate}
							disabled={isGenerating}
							className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-3 font-medium text-white shadow-md shadow-slate-900/10 transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-70 dark:bg-zinc-100 dark:text-zinc-900 dark:shadow-none dark:hover:bg-white"
						>
							{isGenerating ? (
								<>
									<Wand2 className="h-4 w-4 animate-spin" />
									Drafting with AI…
								</>
							) : (
								<>
									<Sparkles className="h-4 w-4" />
									Generate email
								</>
							)}
						</button>
					</div>
				) : (
					<div className="flex flex-1 flex-col space-y-4 duration-300 animate-in fade-in zoom-in-95">
						<div className="group relative max-h-[300px] flex-1 overflow-y-auto rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
							<div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
								<button
									type="button"
									onClick={handleCopy}
									className="rounded-md border border-slate-200 bg-white p-1.5 text-slate-600 shadow-sm transition-colors hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
									title="Copy"
								>
									{copied ? (
										<Check className="h-3.5 w-3.5 text-emerald-500" />
									) : (
										<Copy className="h-3.5 w-3.5" />
									)}
								</button>
							</div>
							<div className="mb-2 text-xs font-medium text-slate-400 dark:text-zinc-500">
								Subject: Application for Software Engineer — {applicantName}
							</div>
							<div className="prose prose-sm text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
								Hi Hiring Team,
								<br />
								<br />
								I came across the open role and wanted to express my strong interest. With over 2 years of
								experience building scalable backend systems using Java and Spring Boot, my background aligns
								closely with your needs.
								<br />
								<br />
								At Natlov Technologies, I recently improved API performance by 20% and have deep experience
								with microservices, Redis, and Kafka.
								<br />
								<br />
								I have attached my resume and would love to discuss how I can contribute to your team.
								<br />
								<br />
								Best,
								<br />
								{applicantName.split(" ")[0] || applicantName}
							</div>
						</div>

						<div className="flex gap-2">
							<button
								type="button"
								onClick={() => setShowResult(false)}
								className="flex-1 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
							>
								Reset
							</button>
							<button
								type="button"
								className="flex flex-[2] items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-700 dark:shadow-none"
							>
								<Send className="h-4 w-4" />
								Send via Gmail
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
