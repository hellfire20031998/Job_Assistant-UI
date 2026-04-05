import Image from "next/image";
import { Bell, Search } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import type { UserProfile } from "@/lib/types";

import { dashboardInitials } from "./dashboard-user";

type Props = {
	user: UserProfile;
};

export function DashboardTopNav({ user }: Props) {
	const displayName = user.displayName?.trim() || user.email;
	const initials = dashboardInitials(user);

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

			<div className="flex min-w-0 items-center gap-2 sm:gap-3 md:gap-4">
				<ThemeToggle variant="landing" />
				<button
					type="button"
					className="relative rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
					aria-label="Notifications"
				>
					<Bell className="h-5 w-5" />
					<span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-rose-500 dark:border-zinc-950" />
				</button>
				<div
					className="hidden min-w-0 items-center gap-2.5 border-l border-slate-200 pl-3 dark:border-zinc-700 sm:flex"
					title={displayName}
				>
					{user.pictureUrl ? (
						<Image
							src={user.pictureUrl}
							alt=""
							width={36}
							height={36}
							className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-slate-200 dark:ring-zinc-600"
							referrerPolicy="no-referrer"
						/>
					) : (
						<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-blue-600 to-violet-600 text-xs font-bold text-white shadow-sm ring-1 ring-slate-200/60 dark:ring-zinc-600">
							{initials}
						</div>
					)}
					<span className="max-w-40 truncate text-sm font-semibold text-slate-900 dark:text-zinc-100">
						{displayName}
					</span>
				</div>
				<div className="flex shrink-0 items-center gap-2 sm:hidden" title={displayName}>
					{user.pictureUrl ? (
						<Image
							src={user.pictureUrl}
							alt=""
							width={36}
							height={36}
							className="h-9 w-9 rounded-full object-cover ring-1 ring-slate-200 dark:ring-zinc-600"
							referrerPolicy="no-referrer"
						/>
					) : (
						<div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-tr from-blue-600 to-violet-600 text-xs font-bold text-white shadow-sm ring-1 ring-slate-200/60 dark:ring-zinc-600">
							{initials}
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
