import { Clock, MoreVertical } from "lucide-react";

const APPLICATIONS = [
	{
		company: "Vercel",
		role: "Senior Frontend Engineer",
		date: "2 hours ago",
		status: "Sent",
		statusClass:
			"bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
	},
	{
		company: "Stripe",
		role: "Full Stack Developer",
		date: "1 day ago",
		status: "Draft",
		statusClass:
			"bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
	},
	{
		company: "Linear",
		role: "Backend Engineer",
		date: "3 days ago",
		status: "Interview",
		statusClass:
			"bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800",
	},
	{
		company: "Notion",
		role: "Software Engineer",
		date: "1 week ago",
		status: "Rejected",
		statusClass:
			"bg-slate-100 text-slate-600 border-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700",
	},
] as const;

export function RecentApplications() {
	return (
		<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-100 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
			<div className="flex items-center justify-between border-b border-slate-200/60 px-6 py-5 dark:border-zinc-800">
				<h2 className="font-semibold text-slate-900 dark:text-zinc-50">Recent applications</h2>
				<button
					type="button"
					className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
				>
					View all
				</button>
			</div>
			<div className="overflow-x-auto">
				<table className="w-full text-left text-sm">
					<thead className="border-b border-slate-200/60 bg-slate-50/50 text-xs uppercase text-slate-500 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-400">
						<tr>
							<th className="px-6 py-4 font-medium">Role & company</th>
							<th className="px-6 py-4 font-medium">Status</th>
							<th className="px-6 py-4 font-medium">Date</th>
							<th className="px-6 py-4 text-right font-medium">Action</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
						{APPLICATIONS.map((app) => (
							<tr
								key={`${app.company}-${app.role}`}
								className="group transition-colors hover:bg-slate-50/50 dark:hover:bg-zinc-800/50"
							>
								<td className="px-6 py-4">
									<div className="font-medium text-slate-900 dark:text-zinc-50">{app.role}</div>
									<div className="mt-0.5 text-xs text-slate-500 dark:text-zinc-500">{app.company}</div>
								</td>
								<td className="px-6 py-4">
									<span
										className={`rounded-md border px-2.5 py-1 text-xs font-medium ${app.statusClass}`}
									>
										{app.status}
									</span>
								</td>
								<td className="px-6 py-4 text-slate-500 dark:text-zinc-400">
									<span className="inline-flex items-center gap-1.5">
										<Clock className="h-3.5 w-3.5" />
										{app.date}
									</span>
								</td>
								<td className="px-6 py-4 text-right">
									<button
										type="button"
										className="rounded-md p-1.5 text-slate-400 opacity-0 transition-all hover:bg-slate-100 hover:text-slate-900 group-hover:opacity-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
										aria-label="More actions"
									>
										<MoreVertical className="h-4 w-4" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
