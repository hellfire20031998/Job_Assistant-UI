"use client";

import { useCallback, useState } from "react";

import { NewApplicationComponent } from "@/components/NewApplicationComponent";
import { ResumeManager } from "@/components/resume/resume-manager";
import type { UserProfile } from "@/lib/types";

import { DashboardMobileNav } from "./dashboard-mobile-nav";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTopNav } from "./dashboard-top-nav";
import { DashboardWelcomeHeader } from "./dashboard-welcome-header";
import { QuickGenerator } from "./quick-generator";
import { RecentApplications } from "./recent-applications";
import { StatsOverview } from "./stats-overview";
import { TabPlaceholder } from "./tab-placeholder";
import { dashboardFirstName } from "./dashboard-user";
import type { DashboardTab } from "./types";

type Props = {
	user: UserProfile;
	onSignOut: () => void;
};

export function ApplyAiDashboard({ user, onSignOut }: Props) {
	const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
	const [newApplicationOpen, setNewApplicationOpen] = useState(false);
	const firstName = dashboardFirstName(user);
	const displayForCopy = user.displayName?.trim() || firstName;

	const handleTabChange = useCallback((tab: DashboardTab) => {
		setNewApplicationOpen(false);
		setActiveTab(tab);
	}, []);

	const openNewApplication = useCallback(() => {
		setNewApplicationOpen(true);
	}, []);

	return (
		<div className="flex min-h-screen bg-[#FAFAFA] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 dark:bg-zinc-950 dark:text-zinc-50 dark:selection:bg-blue-900/40 dark:selection:text-blue-100">
			<DashboardSidebar
				activeTab={activeTab}
				onTabChange={handleTabChange}
				user={user}
				onSignOut={onSignOut}
			/>

			<div className="flex min-w-0 flex-1 flex-col">
				<DashboardTopNav onNewApplication={openNewApplication} />
				{!newApplicationOpen ? (
					<DashboardMobileNav activeTab={activeTab} onTabChange={handleTabChange} />
				) : null}

				<main className="flex-1 overflow-y-auto p-4 md:p-8">
					<div className="mx-auto max-w-6xl space-y-8">
						{newApplicationOpen ? (
							<NewApplicationComponent
								user={user}
								onBack={() => setNewApplicationOpen(false)}
							/>
						) : activeTab === "resumes" ? (
							<ResumeManager />
						) : (
							<>
								<DashboardWelcomeHeader firstName={firstName} />

								{activeTab === "overview" ? (
									<div className="grid gap-8 lg:grid-cols-3">
										<div className="space-y-8 lg:col-span-2">
											<StatsOverview />
											<RecentApplications />
										</div>
										<div id="quick-draft" className="lg:col-span-1">
											<QuickGenerator applicantName={displayForCopy} />
										</div>
									</div>
								) : (
									<TabPlaceholder tab={activeTab} />
								)}
							</>
						)}
					</div>
				</main>
			</div>
		</div>
	);
}
