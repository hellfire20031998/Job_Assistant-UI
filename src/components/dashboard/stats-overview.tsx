import { ArrowUpRight } from "lucide-react";

const STATS = [
	{ label: "Applications sent", value: "42", trend: "+12 this week", positive: true },
	{ label: "Emails generated", value: "56", trend: "+18 this week", positive: true },
	{ label: "Response rate", value: "24%", trend: "+4% vs last month", positive: true },
] as const;

export function StatsOverview() {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
			{STATS.map((stat) => (
				<div
					key={stat.label}
					className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none"
				>
					<div className="mb-1 text-sm font-medium text-slate-500 dark:text-zinc-400">{stat.label}</div>
					<div className="mb-2 text-3xl font-bold text-slate-900 dark:text-zinc-50">{stat.value}</div>
					<div
						className={`flex items-center gap-1 text-xs font-medium ${
							stat.positive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-zinc-500"
						}`}
					>
						{stat.positive ? <ArrowUpRight className="h-3 w-3" /> : null}
						{stat.trend}
					</div>
				</div>
			))}
		</div>
	);
}
