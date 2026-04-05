import { Plus } from "lucide-react";

import type { DashboardTab } from "./types";

const TITLES: Record<DashboardTab, string> = {
	overview: "Overview",
	applications: "Applications",
	resumes: "My resumes",
	settings: "Settings",
};

type Props = {
	tab: DashboardTab;
	onNewApplication?: () => void;
};

export function TabPlaceholder({ tab, onNewApplication }: Props) {
	if (tab === "overview") return null;

	if (tab === "applications") {
		return (
			<div className="space-y-6">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
					<div>
						<h2 className="text-xl font-semibold text-slate-900 dark:text-zinc-50">{TITLES[tab]}</h2>
						<p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
							Start a tailored application from a job description and your resume.
						</p>
					</div>
					<button
						type="button"
						onClick={onNewApplication}
						className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-slate-900/10 transition-all hover:bg-slate-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:shadow-none dark:hover:bg-white"
					>
						<Plus className="h-4 w-4" aria-hidden />
						New Application
					</button>
				</div>
				<div className="rounded-2xl border border-dashed border-slate-200 bg-white/80 p-12 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
					<p className="text-sm text-slate-500 dark:text-zinc-400">
						Your saved applications will appear here in a future update.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="rounded-2xl border border-dashed border-slate-200 bg-white/80 p-12 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
			<h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-50">{TITLES[tab]}</h2>
			<p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
				This section is a placeholder for the next iteration of JobAssistant.
			</p>
		</div>
	);
}
