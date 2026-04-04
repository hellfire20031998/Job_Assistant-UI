import type { DashboardTab } from "./types";

const TITLES: Record<DashboardTab, string> = {
	overview: "Overview",
	applications: "Applications",
	resumes: "My resumes",
	settings: "Settings",
};

type Props = {
	tab: DashboardTab;
};

export function TabPlaceholder({ tab }: Props) {
	if (tab === "overview") return null;

	return (
		<div className="rounded-2xl border border-dashed border-slate-200 bg-white/80 p-12 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
			<h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-50">{TITLES[tab]}</h2>
			<p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
				This section is a placeholder for the next iteration of JobAssistant.
			</p>
		</div>
	);
}
