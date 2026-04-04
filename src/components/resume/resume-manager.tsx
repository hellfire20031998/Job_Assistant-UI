"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Trash2 } from "lucide-react";

import { deleteResume, listResumes, RESUME_MAX_PER_USER, uploadResume } from "@/lib/api-client";
import type { ResumeSummary } from "@/lib/types";

import { ResumeEditor } from "./resume-editor";

export function ResumeManager() {
	const [items, setItems] = useState<ResumeSummary[]>([]);
	const [loading, setLoading] = useState(true);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [deletingId, setDeletingId] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const atResumeLimit = items.length >= RESUME_MAX_PER_USER;

	const refresh = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await listResumes();
			setItems(data);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Failed to load resumes");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void refresh();
	}, [refresh]);

	const onPickFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (!file) return;
		setUploading(true);
		setError(null);
		try {
			const doc = await uploadResume(file);
			await refresh();
			setEditingId(doc.id);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Upload failed");
		} finally {
			setUploading(false);
		}
	};

	if (editingId) {
		return (
			<ResumeEditor
				resumeId={editingId}
				onBack={() => setEditingId(null)}
				onSaved={() => void refresh()}
			/>
		);
	}

	return (
		<div className="space-y-6 animate-in fade-in duration-300">
			<div>
				<h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-50">My resumes</h1>
				<p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
					Upload a PDF. We extract text and a draft profile — review and save corrections anytime. You can store
					up to {RESUME_MAX_PER_USER} resumes.
				</p>
			</div>

			<input
				ref={inputRef}
				type="file"
				accept="application/pdf,.pdf"
				className="hidden"
				onChange={(e) => void onPickFile(e)}
			/>

			<div className="flex flex-wrap gap-3">
				<button
					type="button"
					disabled={uploading || atResumeLimit}
					title={atResumeLimit ? `Maximum ${RESUME_MAX_PER_USER} resumes — delete one to upload another` : undefined}
					onClick={() => inputRef.current?.click()}
					className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
				>
					{uploading ? "Uploading…" : "Upload PDF resume"}
				</button>
				{atResumeLimit ? (
					<p className="w-full text-sm text-amber-700 dark:text-amber-400">
						Resume limit reached ({RESUME_MAX_PER_USER}/{RESUME_MAX_PER_USER}). Delete a resume to add another.
					</p>
				) : null}
			</div>

			{error ? (
				<div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200">
					{error}
				</div>
			) : null}

			{loading ? (
				<div className="flex justify-center py-16">
					<div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-600 border-t-transparent dark:border-blue-400" />
				</div>
			) : items.length === 0 ? (
				<p className="rounded-xl border border-dashed border-slate-200 py-12 text-center text-sm text-slate-500 dark:border-zinc-700 dark:text-zinc-400">
					No resumes yet. Upload a PDF to get started.
				</p>
			) : (
				<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
					<table className="w-full text-left text-sm">
						<thead className="border-b border-slate-200 bg-slate-50/80 text-xs uppercase text-slate-500 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-400">
							<tr>
								<th className="px-4 py-3 font-medium">Label</th>
								<th className="px-4 py-3 font-medium">Status</th>
								<th className="px-4 py-3 font-medium">Updated</th>
								<th className="px-4 py-3 text-right font-medium">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
							{items.map((r) => (
								<tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/40">
									<td className="px-4 py-3">
										<span className="font-medium text-slate-900 dark:text-zinc-100">
											{r.label ?? "Resume"}
										</span>
										{r.isDefault ? (
											<span className="ml-2 rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
												Default
											</span>
										) : null}
									</td>
									<td className="px-4 py-3">
										<span
											className={
												r.parseStatus === "READY"
													? "text-emerald-600 dark:text-emerald-400"
													: r.parseStatus === "FAILED"
														? "text-rose-600 dark:text-rose-400"
														: "text-slate-500 dark:text-zinc-400"
											}
										>
											{r.parseStatus}
										</span>
										{r.parseError ? (
											<p className="mt-1 max-w-xs truncate text-xs text-rose-600 dark:text-rose-400">
												{r.parseError}
											</p>
										) : null}
									</td>
									<td className="px-4 py-3 text-slate-500 dark:text-zinc-400">
										{r.updatedAt ? new Date(r.updatedAt).toLocaleString() : "—"}
									</td>
									<td className="px-4 py-3 text-right">
										<div className="flex flex-wrap items-center justify-end gap-3">
											<button
												type="button"
												onClick={() => setEditingId(r.id)}
												className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
											>
												Edit
											</button>
											<button
												type="button"
												disabled={deletingId !== null}
												onClick={() => {
													void (async () => {
														if (
															!window.confirm(
																`Delete “${r.label ?? "this resume"}”? This cannot be undone.`,
															)
														) {
															return;
														}
														setDeletingId(r.id);
														setError(null);
														try {
															await deleteResume(r.id);
															await refresh();
														} catch (err) {
															setError(err instanceof Error ? err.message : "Delete failed");
														} finally {
															setDeletingId(null);
														}
													})();
												}}
												className="inline-flex items-center gap-1 text-sm font-medium text-rose-600 hover:underline disabled:opacity-50 dark:text-rose-400"
											>
												<Trash2 className="h-3.5 w-3.5" aria-hidden />
												{deletingId === r.id ? "Deleting…" : "Delete"}
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
