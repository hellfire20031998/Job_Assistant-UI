"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import { ApplyAiDashboard } from "@/components/dashboard/apply-ai-dashboard";
import { useAuth } from "@/providers/auth-provider";

export default function DashboardPage() {
	const router = useRouter();
	const { user, loading, signOut } = useAuth();

	useEffect(() => {
		if (loading) return;
		if (!user) router.replace("/");
	}, [loading, user, router]);

	const handleSignOut = useCallback(() => {
		void signOut();
	}, [signOut]);

	if (loading || !user) {
		return (
			<div className="flex min-h-screen flex-col bg-[#FAFAFA] dark:bg-zinc-950">
				<div className="mx-auto flex flex-1 items-center justify-center px-4 py-24">
					<div className="h-10 w-10 animate-spin rounded-full border-2 border-violet-600 border-t-transparent dark:border-violet-400" />
				</div>
			</div>
		);
	}

	return <ApplyAiDashboard user={user} onSignOut={handleSignOut} />;
}
