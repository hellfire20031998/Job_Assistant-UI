import Image from "next/image";
import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import {
	Briefcase,
	ChevronLeft,
	ChevronRight,
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

const SIDEBAR_COLLAPSED_KEY = "applyai-dashboard-sidebar-collapsed";

const NAV_ITEMS: { id: DashboardTab; label: string; icon: ReactNode }[] = [
	{ id: "overview", label: "Overview", icon: <LayoutDashboard className="h-5 w-5 shrink-0" /> },
	{ id: "applications", label: "Applications", icon: <Briefcase className="h-5 w-5 shrink-0" /> },
	{ id: "resumes", label: "My Resumes", icon: <FileText className="h-5 w-5 shrink-0" /> },
	{ id: "settings", label: "Settings", icon: <Settings className="h-5 w-5 shrink-0" /> },
];

export function DashboardSidebar({ activeTab, onTabChange, user, onSignOut }: Props) {
	const [collapsed, setCollapsed] = useState(false);

	useEffect(() => {
		try {
			setCollapsed(localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "1");
		} catch {
			/* ignore */
		}
	}, []);

	const toggleCollapsed = useCallback(() => {
		setCollapsed((c) => {
			const next = !c;
			try {
				localStorage.setItem(SIDEBAR_COLLAPSED_KEY, next ? "1" : "0");
			} catch {
				/* ignore */
			}
			return next;
		});
	}, []);

	const initials = dashboardInitials(user);
	const footerName = user.displayName?.trim() || user.email;

	return (
		<aside
			className={`sticky top-0 hidden h-screen shrink-0 flex-col border-r border-slate-200/60 bg-white transition-[width] duration-200 ease-out dark:border-zinc-800/80 dark:bg-zinc-950 md:flex ${
				collapsed ? "w-18" : "w-64"
			}`}
		>
			<div
				className={`flex shrink-0 items-center border-b border-slate-200/60 dark:border-zinc-800/80 ${
					collapsed
						? "flex-col gap-2 px-2 py-3"
						: "h-16 justify-between gap-2 px-4 pr-2"
				}`}
			>
				<div
					className={`flex min-w-0 items-center gap-2 ${collapsed ? "flex-col" : "flex-1"}`}
				>
					<div className="rounded-lg bg-blue-600 p-1.5 shadow-sm shadow-blue-600/20">
						<Sparkles className="h-4 w-4 text-white" />
					</div>
					<span
						className={`truncate text-lg font-bold tracking-tight text-slate-900 transition-opacity duration-200 dark:text-zinc-50 ${
							collapsed ? "sr-only" : "opacity-100"
						}`}
					>
						ApplyAI
					</span>
				</div>
				<button
					type="button"
					onClick={toggleCollapsed}
					aria-expanded={!collapsed}
					aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
					className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
				>
					{collapsed ? (
						<ChevronRight className="h-5 w-5" aria-hidden />
					) : (
						<ChevronLeft className="h-5 w-5" aria-hidden />
					)}
				</button>
			</div>

			<div className={`flex-1 space-y-1 overflow-y-auto overflow-x-hidden py-6 ${collapsed ? "px-2" : "px-4"}`}>
				<div
					className={`mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400 transition-opacity duration-200 dark:text-zinc-500 ${
						collapsed ? "sr-only" : "opacity-100"
					}`}
				>
					Menu
				</div>
				{NAV_ITEMS.map((item) => (
					<button
						key={item.id}
						type="button"
						title={collapsed ? item.label : undefined}
						onClick={() => onTabChange(item.id)}
						className={`flex w-full items-center rounded-lg text-sm font-medium transition-all ${
							collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5"
						} ${
							activeTab === item.id
								? "bg-slate-100 text-slate-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
								: "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
						}`}
					>
						<span
							className={
								activeTab === item.id ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-zinc-500"
							}
						>
							{item.icon}
						</span>
						<span className={collapsed ? "sr-only" : ""}>{item.label}</span>
					</button>
				))}
			</div>

			<div className={`shrink-0 border-t border-slate-200/60 dark:border-zinc-800/80 ${collapsed ? "p-2" : "p-4"}`}>
				<button
					type="button"
					onClick={onSignOut}
					title={collapsed ? `Sign out (${footerName})` : undefined}
					className={`flex w-full items-center rounded-lg text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50 ${
						collapsed ? "flex-col gap-2 px-0 py-2" : "gap-3 px-3 py-2.5"
					}`}
				>
					{user.pictureUrl ? (
						<Image
							src={user.pictureUrl}
							alt=""
							width={32}
							height={32}
							className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-slate-200 dark:ring-zinc-700"
							referrerPolicy="no-referrer"
						/>
					) : (
						<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-blue-600 to-violet-600 text-xs font-bold text-white shadow-sm">
							{initials}
						</div>
					)}
					<div
						className={`min-w-0 flex-1 text-left transition-opacity duration-200 ${
							collapsed ? "sr-only" : "opacity-100"
						}`}
					>
						<div className="truncate text-sm font-semibold text-slate-900 dark:text-zinc-50">{footerName}</div>
						<div className="text-xs text-slate-500 dark:text-zinc-500">Free plan</div>
					</div>
					<LogOut className="h-4 w-4 shrink-0 text-slate-400 dark:text-zinc-500" aria-hidden />
				</button>
			</div>
		</aside>
	);
}
