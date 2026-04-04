"use client";

import { useState } from "react";
import {
	Briefcase,
	Building2,
	Check,
	CheckCircle2,
	ChevronLeft,
	Copy,
	FileText,
	Link as LinkIcon,
	Send,
	Sparkles,
	Wand2,
} from "lucide-react";

import type { UserProfile } from "@/lib/types";

export type NewApplicationComponentProps = {
	user: UserProfile;
	onBack: () => void;
};

export function NewApplicationComponent({ user, onBack }: NewApplicationComponentProps) {
	const [company, setCompany] = useState("");
	const [role, setRole] = useState("");
	const [jobDescription, setJobDescription] = useState("");
	const [isGenerating, setIsGenerating] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const [copied, setCopied] = useState(false);

	const displayName = user.displayName?.trim() || user.email.split("@")[0] || "Applicant";

	const handleGenerate = () => {
		setIsGenerating(true);
		setShowResult(false);
		setTimeout(() => {
			setIsGenerating(false);
			setShowResult(true);
		}, 2000);
	};

	const handleCopy = () => {
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const roleForSubject = role.trim() || "the role";
	const companyForBody = company.trim() || "your company";

	return (
		<div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
			<div className="flex items-center gap-4">
				<button
					type="button"
					onClick={onBack}
					className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition-colors hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
					aria-label="Back to dashboard"
				>
					<ChevronLeft className="h-5 w-5" />
				</button>
				<div>
					<h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">
						Create new application
					</h1>
					<p className="mt-0.5 text-sm text-slate-500 dark:text-zinc-400">
						Fill in the details below to generate a tailored email and track this role.
					</p>
				</div>
			</div>

			<div className="grid gap-8 lg:grid-cols-2">
				<div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
					<div className="border-b border-slate-200/60 bg-slate-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-950/50">
						<h2 className="font-semibold text-slate-900 dark:text-zinc-50">Application details</h2>
					</div>

					<div className="flex-1 space-y-6 p-6">
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
									Company
								</label>
								<div className="relative">
									<Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
									<input
										type="text"
										value={company}
										onChange={(e) => setCompany(e.target.value)}
										placeholder="e.g. Vercel"
										className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500"
									/>
								</div>
							</div>
							<div className="space-y-2">
								<label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
									Role
								</label>
								<div className="relative">
									<Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
									<input
										type="text"
										value={role}
										onChange={(e) => setRole(e.target.value)}
										placeholder="e.g. Backend Engineer"
										className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500"
									/>
								</div>
							</div>
						</div>

						<div className="space-y-2">
							<label className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
								<span>Job description</span>
								<button
									type="button"
									className="flex cursor-not-allowed items-center gap-1 font-medium normal-case text-blue-600 opacity-80 dark:text-blue-400"
									disabled
									title="Coming soon"
								>
									<LinkIcon className="h-3 w-3" />
									Fetch from URL
								</button>
							</label>
							<textarea
								value={jobDescription}
								onChange={(e) => setJobDescription(e.target.value)}
								placeholder="Paste the full job description here. Our AI will analyze the requirements and keywords…"
								className="h-40 w-full resize-none rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:placeholder:text-zinc-600"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
								Select resume
							</label>
							<button
								type="button"
								className="group flex w-full cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 text-left shadow-sm transition-colors hover:border-blue-300 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:border-blue-600"
							>
								<div className="flex items-center gap-3">
									<div className="rounded-md border border-slate-200 bg-white p-2 text-blue-600 shadow-sm group-hover:text-blue-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-blue-400">
										<FileText className="h-5 w-5" />
									</div>
									<div>
										<div className="text-sm font-medium text-slate-800 dark:text-zinc-100">
											Primary resume (demo)
										</div>
										<div className="mt-0.5 text-xs text-slate-500 dark:text-zinc-500">
											Default profile — upload coming soon
										</div>
									</div>
								</div>
								<div className="rounded border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
									Change
								</div>
							</button>
						</div>
					</div>

					<div className="mt-auto border-t border-slate-200/60 bg-slate-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-950/50">
						<button
							type="button"
							onClick={handleGenerate}
							disabled={isGenerating}
							className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-3.5 font-medium text-white shadow-md shadow-slate-900/10 transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-70 dark:bg-zinc-100 dark:text-zinc-900 dark:shadow-none dark:hover:bg-white"
						>
							{isGenerating ? (
								<>
									<Wand2 className="h-5 w-5 animate-spin text-blue-400 dark:text-blue-600" />
									Analyzing constraints & crafting…
								</>
							) : (
								<>
									<Sparkles className="h-5 w-5 text-blue-400 dark:text-blue-600" />
									Generate perfect email
								</>
							)}
						</button>
					</div>
				</div>

				<div className="flex min-h-[500px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
					<div className="flex items-center justify-between border-b border-slate-200/60 bg-slate-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-950/50">
						<h2 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-zinc-50">
							<Wand2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
							Output preview
						</h2>
						{showResult ? (
							<span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
								<CheckCircle2 className="h-3.5 w-3.5" />
								94% match
							</span>
						) : null}
					</div>

					<div className="relative flex-1 bg-slate-50/30 p-6 dark:bg-zinc-950/30">
						{!showResult && !isGenerating ? (
							<div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-slate-400 dark:text-zinc-500">
								<div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
									<FileText className="h-8 w-8 opacity-20" />
								</div>
								<p className="text-sm font-medium">Fill in the details to generate your application.</p>
							</div>
						) : null}

						{isGenerating ? (
							<div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
								<div className="relative h-16 w-16">
									<div className="absolute inset-0 rounded-full border-4 border-slate-100 dark:border-zinc-800" />
									<div className="absolute inset-0 animate-spin rounded-full border-4 border-blue-600 border-t-transparent dark:border-blue-400 dark:border-t-transparent" />
								</div>
								<div className="space-y-1 text-center">
									<p className="animate-pulse text-sm font-semibold text-slate-900 dark:text-zinc-50">
										Scanning resume & job description…
									</p>
									<p className="text-xs text-slate-500 dark:text-zinc-500">Optimizing for ATS keywords</p>
								</div>
							</div>
						) : null}

						{showResult ? (
							<div className="flex h-full flex-col duration-500 animate-in fade-in zoom-in-95">
								<div className="group relative flex-1 overflow-y-auto rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
									<div className="absolute right-4 top-4 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
										<button
											type="button"
											onClick={handleCopy}
											className="rounded-md border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition-colors hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
											title="Copy"
										>
											{copied ? (
												<Check className="h-4 w-4 text-emerald-500" />
											) : (
												<Copy className="h-4 w-4" />
											)}
										</button>
									</div>
									<div className="mb-6 space-y-2 border-b border-slate-100 pb-4 dark:border-zinc-800">
										<div className="flex gap-2">
											<span className="w-16 text-xs font-semibold text-slate-400 dark:text-zinc-500">
												To:
											</span>
											<span className="text-sm text-slate-700 dark:text-zinc-300">
												{company.trim()
													? `careers@${company.trim().toLowerCase().replace(/\s+/g, "")}.com`
													: "hiring@company.com"}
											</span>
										</div>
										<div className="flex gap-2">
											<span className="w-16 text-xs font-semibold text-slate-400 dark:text-zinc-500">
												Subject:
											</span>
											<span className="text-sm font-semibold text-slate-900 dark:text-zinc-50">
												Application for {roleForSubject} — {displayName}
											</span>
										</div>
									</div>

									<div className="prose prose-sm max-w-none whitespace-pre-wrap text-sm leading-relaxed text-slate-600 prose-slate dark:prose-invert dark:text-zinc-400">
										{`Hi Hiring Team,

I noticed the opening for the ${roleForSubject} position at ${companyForBody} and couldn't wait to apply. Having spent the last 2+ years architecting scalable microservices using Java and Spring Boot, my background aligns closely with the requirements outlined in the job description.

In my current role, I actively develop and scale backend services, recently improving API performance by 20%. My hands-on experience with Kafka for event-driven workflows and a strong foundation in distributed systems makes me confident I can make an immediate impact on your core product infrastructure.

I have attached my resume for your review and would welcome the opportunity to discuss how I can contribute to your engineering team.

Best regards,
${displayName}
${user.email}`}
									</div>
								</div>

								<div className="mt-4 flex gap-3">
									<button
										type="button"
										onClick={() => setShowResult(false)}
										className="flex-1 rounded-lg border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
									>
										Refine draft
									</button>
									<button
										type="button"
										className="flex flex-2 items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-medium text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-700 dark:shadow-none"
									>
										<Send className="h-4 w-4" />
										Send & track application
									</button>
								</div>
							</div>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}
