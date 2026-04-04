import { Sparkles } from "lucide-react";

type Props = {
	firstName: string;
};

export function DashboardWelcomeHeader({ firstName }: Props) {
	return (
		<div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
			<div>
				<h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-50 md:text-3xl">
					Welcome back, {firstName}
				</h1>
				<p className="mt-1 text-slate-500 dark:text-zinc-400">
					Here&apos;s what&apos;s happening with your job search today.
				</p>
			</div>
			<div className="flex flex-wrap items-center gap-2 text-sm">
				<span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 font-medium text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-300">
					<Sparkles className="h-3.5 w-3.5" />8 credits left
				</span>
				<button
					type="button"
					className="px-2 py-1 font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-50"
				>
					Upgrade
				</button>
			</div>
		</div>
	);
}
