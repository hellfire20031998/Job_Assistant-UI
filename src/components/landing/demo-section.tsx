"use client";

import { useState } from "react";
import {
	Bot,
	Check,
	CheckCircle2,
	Copy,
	FileText,
	Send,
	Sparkles,
	UploadCloud,
	Wand2,
} from "lucide-react";

import { useLandingAuth } from "./use-landing-auth";

export function DemoSection() {
	const { user, loading, signInWithGoogle } = useLandingAuth();
	const [jd, setJd] = useState("");
	const [isGenerating, setIsGenerating] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const [copied, setCopied] = useState(false);

	const handleGenerate = () => {
		if (!jd.trim()) return;
		if (!user) {
			signInWithGoogle();
			return;
		}
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

	return (
		<section id="demo" className="overflow-hidden bg-white py-24">
			<div className="container mx-auto px-4 md:px-8">
				<div className="mx-auto mb-16 max-w-2xl text-center">
					<h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
						See the magic happen
					</h2>
					<p className="text-lg text-slate-600">
						Paste a short job description below to see how ApplyAI crafts the perfect introductory email.
					</p>
					{!loading && !user && (
						<p className="mt-3 text-sm text-slate-500">
							Sign in with Google to run the interactive demo.
						</p>
					)}
				</div>

				<div className="mx-auto grid max-w-5xl gap-6 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/50 md:grid-cols-2 md:p-4">
					<div className="flex flex-col gap-4 rounded-xl border border-slate-100 bg-slate-50 p-6">
						<div className="flex items-center justify-between">
							<h3 className="flex items-center gap-2 font-semibold text-slate-800">
								<FileText className="h-4 w-4 text-slate-500" />
								Job Details
							</h3>
						</div>

						<textarea
							value={jd}
							onChange={(e) => setJd(e.target.value)}
							placeholder="Paste a job description snippet here... (e.g., 'Looking for a Java Backend Engineer with 2+ years of experience in Spring Boot and Microservices...')"
							className="h-48 w-full resize-none rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
						/>

						<div className="flex items-center justify-between rounded-lg border border-dashed border-slate-300 bg-white p-4">
							<div className="flex items-center gap-3">
								<div className="rounded-md bg-slate-100 p-2">
									<UploadCloud className="h-5 w-5 text-slate-500" />
								</div>
								<div>
									<p className="text-sm font-medium text-slate-700">Resume.pdf</p>
									<p className="text-xs text-slate-400">Default profile loaded</p>
								</div>
							</div>
							<CheckCircle2 className="h-5 w-5 text-emerald-500" />
						</div>

						<button
							type="button"
							onClick={handleGenerate}
							disabled={!jd.trim() || isGenerating || loading}
							className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-3 font-medium text-white shadow-sm transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{isGenerating ? (
								<>
									<Wand2 className="h-4 w-4 animate-spin" />
									Analyzing constraints...
								</>
							) : loading ? (
								<>
									<Sparkles className="h-4 w-4 opacity-50" />
									Loading…
								</>
							) : !user ? (
								<>
									<Sparkles className="h-4 w-4" />
									Sign in to generate
								</>
							) : (
								<>
									<Sparkles className="h-4 w-4" />
									Generate Email
								</>
							)}
						</button>
					</div>

					<div className="relative min-h-[400px] rounded-xl border border-slate-100 bg-white p-6">
						<h3 className="mb-6 flex items-center gap-2 font-semibold text-slate-800">
							<Send className="h-4 w-4 text-slate-500" />
							Generated Output
						</h3>

						{!showResult && !isGenerating && (
							<div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-400">
								<Bot className="h-12 w-12 opacity-20" />
								<p className="text-sm font-medium">Waiting for job description...</p>
							</div>
						)}

						{isGenerating && (
							<div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
								<div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-100 border-t-blue-600" />
								<p className="animate-pulse text-sm font-medium text-slate-500">
									Drafting the perfect response...
								</p>
							</div>
						)}

						{showResult && (
							<div className="fade-in slide-in-from-bottom-4 animate-in space-y-4 duration-500">
								<div className="flex items-center justify-between border-b border-slate-100 pb-4">
									<div className="space-y-1">
										<div className="text-xs font-medium text-slate-500">Subject</div>
										<div className="text-sm font-semibold text-slate-800">
											Application for Software Engineer Role - Himanshu Singh
										</div>
									</div>
									<button
										type="button"
										onClick={handleCopy}
										className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
										title="Copy to clipboard"
									>
										{copied ? (
											<Check className="h-4 w-4 text-emerald-500" />
										) : (
											<Copy className="h-4 w-4" />
										)}
									</button>
								</div>

								<div className="prose prose-sm whitespace-pre-wrap leading-relaxed text-slate-600">
									Hi Hiring Team,
									<br />
									<br />
									I came across the open role and wanted to express my strong interest. Based on the job
									description, my background aligns closely with your needs.
									<br />
									<br />
									Over the last 2+ years, I have built and scaled robust backend systems using Java,
									Spring Boot, and microservices architectures. In my current role at Natlov Technologies, I
									improved API performance by 20% and integrated complex Next.js frontends with scalable
									RESTful APIs. I also have deep hands-on experience utilizing Redis for caching and Kafka
									for event-driven systems to handle high-throughput scenarios reliably.
									<br />
									<br />
									I would love the opportunity to discuss how my technical expertise and problem-solving
									skills (having solved 600+ DSA problems) can add immediate value to your team.
									<br />
									<br />
									I have attached my resume for your review. Looking forward to hearing from you.
									<br />
									<br />
									Best regards,
									<br />
									Himanshu Singh
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
