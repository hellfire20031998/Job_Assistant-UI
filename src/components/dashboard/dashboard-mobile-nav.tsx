import type { DashboardTab } from "./types";

const ITEMS: { id: DashboardTab; label: string }[] = [
	{ id: "overview", label: "Overview" },
	{ id: "applications", label: "Applications" },
	{ id: "resumes", label: "Resumes" },
	{ id: "settings", label: "Settings" },
];

type Props = {
	activeTab: DashboardTab;
	onTabChange: (tab: DashboardTab) => void;
};

export function DashboardMobileNav({ activeTab, onTabChange }: Props) {
	return (
		<nav
			className="flex gap-1 overflow-x-auto border-b border-slate-200/60 bg-white/95 px-3 py-2 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/95 md:hidden"
			aria-label="Dashboard sections"
		>
			{ITEMS.map((item) => (
				<button
					key={item.id}
					type="button"
					onClick={() => onTabChange(item.id)}
					className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
						activeTab === item.id
							? "bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
							: "text-slate-600 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
					}`}
				>
					{item.label}
				</button>
			))}
		</nav>
	);
}
