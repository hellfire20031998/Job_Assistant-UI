import { Sparkles } from "lucide-react";

export function Footer() {
	return (
		<footer className="border-t border-slate-200 bg-slate-50 pt-16 pb-8 dark:border-zinc-800 dark:bg-zinc-900">
			<div className="container mx-auto px-4 md:px-8">
				<div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4">
					<div className="col-span-2">
						<div className="mb-4 flex items-center gap-2">
							<div className="rounded-md bg-blue-600 p-1">
								<Sparkles className="h-4 w-4 text-white" />
							</div>
							<span className="text-lg font-bold tracking-tight text-slate-900 dark:text-zinc-50">ApplyAI</span>
						</div>
						<p className="max-w-sm text-sm text-slate-500 dark:text-zinc-400">
							The smartest way to navigate the job market. AI-powered applications that get you noticed.
						</p>
					</div>
					<div>
						<h4 className="mb-4 font-semibold text-slate-900 dark:text-zinc-50">Product</h4>
						<ul className="space-y-3 text-sm text-slate-600 dark:text-zinc-400">
							<li>
								<a href="#features" className="hover:text-slate-900 dark:hover:text-zinc-50">
									Features
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-slate-900 dark:hover:text-zinc-50">
									Pricing
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-slate-900 dark:hover:text-zinc-50">
									Changelog
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="mb-4 font-semibold text-slate-900 dark:text-zinc-50">Company</h4>
						<ul className="space-y-3 text-sm text-slate-600 dark:text-zinc-400">
							<li>
								<a href="#" className="hover:text-slate-900 dark:hover:text-zinc-50">
									About
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-slate-900 dark:hover:text-zinc-50">
									Contact
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-slate-900 dark:hover:text-zinc-50">
									GitHub
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 dark:border-zinc-800 dark:text-zinc-500 md:flex-row md:gap-0">
					<p>© {new Date().getFullYear()} ApplyAI. All rights reserved.</p>
					<div className="flex gap-4">
						<a href="#" className="hover:text-slate-900 dark:hover:text-zinc-50">
							Privacy Policy
						</a>
						<a href="#" className="hover:text-slate-900 dark:hover:text-zinc-50">
							Terms of Service
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
