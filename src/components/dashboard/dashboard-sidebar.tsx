import Image from "next/image";
import type { ReactNode } from "react";
import {
	Briefcase,
	FileText,
	LayoutDashboard,
	LogOut,
	Settings,
	Sparkles,
} from "lucide-react";

import type { UserProfile } from "@/lib/types";

import { dashboardInitials } from "./dashboard-user";
import type { DashboardTab } from "./types";

type Props = {
	activeTab: DashboardTab;
	onTabChange: (tab: DashboardTab) => void;
	user: UserProfile;
	onSignOut: () => void;
};

const NAV_ITEMS: { id: DashboardTab; label: string; icon: ReactNode }[] = [
	{ id: "overview", label: "Overview", icon: <LayoutDashboard className="h-5 w-5" /> },
	{ id: "applications", label: "Applications", icon: <Briefcase className="h-5 w-5" /> },
	{ id: "resumes", label: "My Resumes", icon: <FileText className="h-5 w-5" /> },
	{ id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
];

export function DashboardSidebar({ activeTab, onTabChange, user, onSignOut }: Props) {
	const initials = dashboardInitials(user);
	const footerName = user.displayName?.trim() || user.email;

	return (
		<aside className="sticky top-0 hidden h-screen w-64 flex-col border-r border-slate-200/60 bg-white dark:border-zinc-800/80 dark:bg-zinc-950 md:flex">
			<div className="flex h-16 items-center border-b border-slate-200/60 px-6 dark:border-zinc-800/80">
				<div className="flex items-center gap-2">
					<div className="rounded-lg bg-blue-600 p-1.5 shadow-sm shadow-blue-600/20">
						<Sparkles className="h-4 w-4 text-white" />
					</div>
					<span className="text-lg font-bold tracking-tight text-slate-900 dark:text-zinc-50">
						ApplyAI
					</span>
				</div>
			</div>

			<div className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
				<div className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
					Menu
				</div>
				{NAV_ITEMS.map((item) => (
					<button
						key={item.id}
						type="button"
						onClick={() => onTabChange(item.id)}
						className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
							activeTab === item.id
								? "bg-slate-100 text-slate-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
								: "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
						}`}
					>
						<span className={activeTab === item.id ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-zinc-500"}>
							{item.icon}
						</span>
						{item.label}
					</button>
				))}
			</div>

			<div className="border-t border-slate-200/60 p-4 dark:border-zinc-800/80">
				<button
					type="button"
					onClick={onSignOut}
					className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
				>
					{user.pictureUrl ? (
						<Image
							src={user.pictureUrl}
							alt=""
							width={32}
							height={32}
							className="h-8 w-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-zinc-700"
							referrerPolicy="no-referrer"
						/>
					) : (
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-violet-600 text-xs font-bold text-white shadow-sm">
							{initials}
						</div>
					)}
					<div className="min-w-0 flex-1 text-left">
						<div className="truncate text-sm font-semibold text-slate-900 dark:text-zinc-50">
							{footerName}
						</div>
						<div className="text-xs text-slate-500 dark:text-zinc-500">Free plan</div>
					</div>
					<LogOut className="h-4 w-4 shrink-0 text-slate-400 dark:text-zinc-500" />
				</button>
			</div>
		</aside>
	);
}
