import { Bell, Plus, Search } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";

type Props = {
	onNewApplication?: () => void;
};

export function DashboardTopNav({ onNewApplication }: Props) {
	return (
		<header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200/60 bg-white/80 px-4 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80 md:px-8">
			<div className="flex flex-1 items-center gap-4">
				<div className="relative hidden w-full max-w-md md:block">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
					<input
						type="search"
						placeholder="Search applications, roles, or companies..."
						className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
					/>
				</div>
			</div>

			<div className="flex items-center gap-2 sm:gap-4">
				<ThemeToggle variant="landing" />
				<button
					type="button"
					className="relative rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
					aria-label="Notifications"
				>
					<Bell className="h-5 w-5" />
					<span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-rose-500 dark:border-zinc-950" />
				</button>
				<button
					type="button"
					onClick={onNewApplication}
					className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-slate-900/10 transition-all hover:bg-slate-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:shadow-none dark:hover:bg-white"
				>
					<Plus className="h-4 w-4" />
					<span className="hidden sm:inline">New Application</span>
				</button>
			</div>
		</header>
	);
}
