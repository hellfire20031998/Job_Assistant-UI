"use client";

import { useCallback, useEffect, useState } from "react";

import { getResume, updateResume } from "@/lib/api-client";
import type {
	ResumeDocument,
	ResumeEducationEntry,
	ResumeExperienceEntry,
	ResumePersonalInfo,
	ResumePreferences,
	ResumeSkills,
} from "@/lib/types";

type Props = {
	resumeId: string;
	onBack: () => void;
	onSaved?: () => void;
};

function emptyPersonal(): ResumePersonalInfo {
	return {
		fullName: "",
		email: "",
		phone: null,
		location: null,
		linkedin: null,
		github: null,
		portfolio: null,
	};
}

function emptySkills(): ResumeSkills {
	return {
		languages: [],
		backend: [],
		frontend: [],
		databases: [],
		tools: [],
		concepts: [],
	};
}

function emptyPreferences(): ResumePreferences {
	return {
		jobType: [],
		relocation: false,
		expectedCTC: null,
		noticePeriod: null,
	};
}

function normalize(doc: ResumeDocument): ResumeDocument {
	return {
		...doc,
		personalInfo: doc.personalInfo ?? emptyPersonal(),
		skills: doc.skills ?? emptySkills(),
		experiences: doc.experiences ?? [],
		projects: doc.projects ?? [],
		education: doc.education ?? [],
		certifications: doc.certifications ?? [],
		achievements: doc.achievements ?? [],
		languages: doc.languages ?? [],
		preferences: doc.preferences ?? emptyPreferences(),
		metadata: doc.metadata ?? {
			source: "resume_upload",
			lastUpdated: new Date().toISOString(),
			confidenceScore: null,
		},
		rawModelJson: doc.rawModelJson ?? null,
	};
}

function skillsToCsv(skills: string[]): string {
	return skills.join(", ");
}

function csvToSkills(s: string): string[] {
	return s
		.split(",")
		.map((x) => x.trim())
		.filter(Boolean);
}

const EXP_TYPES = ["full-time", "internship", "freelance", "contract"] as const;
const JOB_TYPES = ["remote", "onsite", "hybrid"] as const;

export function ResumeEditor({ resumeId, onBack, onSaved }: Props) {
	const [draft, setDraft] = useState<ResumeDocument | null>(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const load = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const r = await getResume(resumeId);
			setDraft(normalize(r));
		} catch (e) {
			setError(e instanceof Error ? e.message : "Failed to load");
		} finally {
			setLoading(false);
		}
	}, [resumeId]);

	useEffect(() => {
		void load();
	}, [load]);

	const setPi = (patch: Partial<ResumePersonalInfo>) => {
		setDraft((d) =>
			d
				? {
						...d,
						personalInfo: { ...d.personalInfo, ...patch },
					}
				: d,
		);
	};

	const save = async () => {
		if (!draft) return;
		setSaving(true);
		setError(null);
		try {
			const updated = await updateResume(resumeId, {
				label: draft.label,
				isDefault: draft.isDefault,
				personalInfo: draft.personalInfo,
				summary: draft.summary,
				skills: draft.skills,
				experiences: draft.experiences,
				projects: draft.projects,
				education: draft.education,
				certifications: draft.certifications,
				achievements: draft.achievements,
				languages: draft.languages,
				preferences: draft.preferences,
				metadata: draft.metadata,
				rawModelJson: draft.rawModelJson,
			});
			setDraft(normalize(updated));
			onSaved?.();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Save failed");
		} finally {
			setSaving(false);
		}
	};

	if (loading || !draft) {
		return (
			<div className="flex items-center justify-center py-24">
				<div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-600 border-t-transparent dark:border-blue-400" />
			</div>
		);
	}

	const pi = draft.personalInfo;
	const sk = draft.skills;
	const pref = draft.preferences;
	const meta = draft.metadata;

	const updateExp = (i: number, patch: Partial<ResumeExperienceEntry>) => {
		setDraft((d) => {
			if (!d) return d;
			const next = [...d.experiences];
			next[i] = { ...next[i], ...patch };
			return { ...d, experiences: next };
		});
	};

	const addExp = () => {
		setDraft((d) => {
			if (!d) return d;
			const row: ResumeExperienceEntry = {
				title: "",
				company: "",
				location: null,
				type: "full-time",
				startDate: null,
				endDate: null,
				technologies: [],
				highlights: [],
			};
			return { ...d, experiences: [...d.experiences, row] };
		});
	};

	const removeExp = (i: number) => {
		setDraft((d) => (d ? { ...d, experiences: d.experiences.filter((_, j) => j !== i) } : d));
	};

	const updateEdu = (i: number, patch: Partial<ResumeEducationEntry>) => {
		setDraft((d) => {
			if (!d) return d;
			const next = [...d.education];
			next[i] = { ...next[i], ...patch };
			return { ...d, education: next };
		});
	};

	const addEdu = () => {
		setDraft((d) => {
			if (!d) return d;
			const row: ResumeEducationEntry = {
				school: "",
				degree: null,
				field: null,
				startDate: null,
				endDate: null,
			};
			return { ...d, education: [...d.education, row] };
		});
	};

	const removeEdu = (i: number) => {
		setDraft((d) => (d ? { ...d, education: d.education.filter((_, j) => j !== i) } : d));
	};

	const toggleJobType = (t: (typeof JOB_TYPES)[number]) => {
		setDraft((d) => {
			if (!d) return d;
			const has = d.preferences.jobType.includes(t);
			const jobType = has
				? d.preferences.jobType.filter((x) => x !== t)
				: [...d.preferences.jobType, t];
			return { ...d, preferences: { ...d.preferences, jobType } };
		});
	};

	return (
		<div className="space-y-8 animate-in fade-in duration-300">
			<div className="flex flex-wrap items-center gap-4">
				<button
					type="button"
					onClick={onBack}
					className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
				>
					← Back
				</button>
				<h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-50">Edit parsed resume</h1>
				<button
					type="button"
					onClick={() => void save()}
					disabled={saving}
					className="ml-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60 dark:shadow-none"
				>
					{saving ? "Saving…" : "Save changes"}
				</button>
			</div>

			{error ? (
				<div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200">
					{error}
				</div>
			) : null}

			{draft.parseStatus === "FAILED" ? (
				<div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
					Parsing failed{draft.parseError ? `: ${draft.parseError}` : ""}. You can still fill the form manually
					and save.
				</div>
			) : null}

			<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
				<h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-zinc-50">File</h2>
				<label className="block text-sm text-slate-600 dark:text-zinc-400">Label</label>
				<input
					value={draft.label ?? ""}
					onChange={(e) => setDraft((d) => (d ? { ...d, label: e.target.value } : d))}
					className="mt-1 w-full max-w-md rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
				/>
				<label className="mt-4 flex items-center gap-2 text-sm text-slate-700 dark:text-zinc-300">
					<input
						type="checkbox"
						checked={draft.isDefault}
						onChange={(e) => setDraft((d) => (d ? { ...d, isDefault: e.target.checked } : d))}
					/>
					Default resume
				</label>
			</div>

			<details className="rounded-xl border border-slate-200 bg-slate-50/50 dark:border-zinc-800 dark:bg-zinc-950/50">
				<summary className="cursor-pointer px-4 py-3 text-sm font-medium text-slate-700 dark:text-zinc-300">
					Extracted text (read-only)
				</summary>
				<div className="border-t border-slate-200 p-4 dark:border-zinc-800">
					<pre className="max-h-64 overflow-auto whitespace-pre-wrap text-xs text-slate-600 dark:text-zinc-400">
						{draft.extractedText ?? "—"}
					</pre>
				</div>
			</details>

			<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
				<h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-zinc-50">Personal</h2>
				<div className="grid gap-4 sm:grid-cols-2">
					{(
						[
							["fullName", "Full name"],
							["email", "Email"],
							["phone", "Phone"],
							["location", "Location"],
							["linkedin", "LinkedIn"],
							["github", "GitHub"],
							["portfolio", "Portfolio"],
						] as const
					).map(([key, label]) => (
						<div key={key}>
							<label className="text-xs font-medium uppercase text-slate-500 dark:text-zinc-400">
								{label}
							</label>
							<input
								value={(pi[key] as string) ?? ""}
								onChange={(e) => setPi({ [key]: e.target.value || null } as Partial<ResumePersonalInfo>)}
								className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
							/>
						</div>
					))}
				</div>
			</div>

			<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
				<h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-zinc-50">Summary</h2>
				<textarea
					value={draft.summary ?? ""}
					onChange={(e) => setDraft((d) => (d ? { ...d, summary: e.target.value || null } : d))}
					rows={5}
					className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
				/>
			</div>

			<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
				<h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-zinc-50">Skills (comma-separated)</h2>
				<div className="grid gap-4 sm:grid-cols-2">
					{(
						[
							["languages", "Languages"],
							["backend", "Backend"],
							["frontend", "Frontend"],
							["databases", "Databases"],
							["tools", "Tools"],
							["concepts", "Concepts"],
						] as const
					).map(([key, label]) => (
						<div key={key}>
							<label className="text-xs font-medium uppercase text-slate-500 dark:text-zinc-400">
								{label}
							</label>
							<input
								value={skillsToCsv(sk[key])}
								onChange={(e) =>
									setDraft((d) =>
										d
											? {
													...d,
													skills: { ...d.skills, [key]: csvToSkills(e.target.value) },
												}
											: d,
									)
								}
								className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
							/>
						</div>
					))}
				</div>
			</div>

			<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-50">Experience</h2>
					<button
						type="button"
						onClick={addExp}
						className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
					>
						+ Add role
					</button>
				</div>
				<div className="space-y-6">
					{draft.experiences.map((ex, i) => (
						<div
							key={i}
							className="rounded-lg border border-slate-100 p-4 dark:border-zinc-800 dark:bg-zinc-950/50"
						>
							<div className="mb-2 flex justify-end">
								<button
									type="button"
									onClick={() => removeExp(i)}
									className="text-xs text-rose-600 hover:underline dark:text-rose-400"
								>
									Remove
								</button>
							</div>
							<div className="grid gap-3 sm:grid-cols-2">
								<input
									placeholder="Title"
									value={ex.title}
									onChange={(e) => updateExp(i, { title: e.target.value })}
									className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
								/>
								<input
									placeholder="Company"
									value={ex.company}
									onChange={(e) => updateExp(i, { company: e.target.value })}
									className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
								/>
								<input
									placeholder="Location"
									value={ex.location ?? ""}
									onChange={(e) => updateExp(i, { location: e.target.value || null })}
									className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
								/>
								<select
									value={typeof ex.type === "string" ? ex.type : "full-time"}
									onChange={(e) => updateExp(i, { type: e.target.value })}
									className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
								>
									{EXP_TYPES.map((t) => (
										<option key={t} value={t}>
											{t}
										</option>
									))}
								</select>
								<input
									placeholder="Start date"
									value={ex.startDate ?? ""}
									onChange={(e) => updateExp(i, { startDate: e.target.value || null })}
									className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
								/>
								<input
									placeholder="End date"
									value={ex.endDate ?? ""}
									onChange={(e) => updateExp(i, { endDate: e.target.value || null })}
									className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
								/>
							</div>
							<label className="mt-3 block text-xs text-slate-500 dark:text-zinc-400">Technologies (comma)</label>
							<input
								value={skillsToCsv(ex.technologies)}
								onChange={(e) =>
									updateExp(i, { technologies: csvToSkills(e.target.value) })
								}
								className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
							/>
							<label className="mt-3 block text-xs text-slate-500 dark:text-zinc-400">
								Highlights (one per line)
							</label>
							<textarea
								value={ex.highlights.join("\n")}
								onChange={(e) =>
									updateExp(i, {
										highlights: e.target.value
											.split("\n")
											.map((l) => l.trim())
											.filter(Boolean),
									})
								}
								rows={3}
								className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
							/>
						</div>
					))}
				</div>
			</div>

			<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-50">Education</h2>
					<button
						type="button"
						onClick={addEdu}
						className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
					>
						+ Add school
					</button>
				</div>
				<div className="space-y-4">
					{draft.education.map((ed, i) => (
						<div
							key={i}
							className="grid gap-2 rounded-lg border border-slate-100 p-4 sm:grid-cols-2 dark:border-zinc-800"
						>
							<button
								type="button"
								onClick={() => removeEdu(i)}
								className="text-right text-xs text-rose-600 sm:col-span-2 dark:text-rose-400"
							>
								Remove
							</button>
							<input
								placeholder="School"
								value={ed.school}
								onChange={(e) => updateEdu(i, { school: e.target.value })}
								className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
							/>
							<input
								placeholder="Degree"
								value={ed.degree ?? ""}
								onChange={(e) => updateEdu(i, { degree: e.target.value || null })}
								className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
							/>
							<input
								placeholder="Field"
								value={ed.field ?? ""}
								onChange={(e) => updateEdu(i, { field: e.target.value || null })}
								className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
							/>
							<input
								placeholder="Start"
								value={ed.startDate ?? ""}
								onChange={(e) => updateEdu(i, { startDate: e.target.value || null })}
								className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
							/>
							<input
								placeholder="End"
								value={ed.endDate ?? ""}
								onChange={(e) => updateEdu(i, { endDate: e.target.value || null })}
								className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
							/>
						</div>
					))}
				</div>
			</div>

			<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
				<h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-zinc-50">Achievements & languages</h2>
				<label className="text-xs text-slate-500 dark:text-zinc-400">Achievements (one per line)</label>
				<textarea
					value={draft.achievements.join("\n")}
					onChange={(e) =>
						setDraft((d) =>
							d
								? {
										...d,
										achievements: e.target.value
											.split("\n")
											.map((l) => l.trim())
											.filter(Boolean),
									}
								: d,
						)
					}
					rows={4}
					className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
				/>
				<label className="mt-4 block text-xs text-slate-500 dark:text-zinc-400">Languages (comma)</label>
				<input
					value={skillsToCsv(draft.languages)}
					onChange={(e) =>
						setDraft((d) => (d ? { ...d, languages: csvToSkills(e.target.value) } : d))
					}
					className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
				/>
			</div>

			<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
				<h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-zinc-50">Preferences</h2>
				<div className="flex flex-wrap gap-4">
					{JOB_TYPES.map((t) => (
						<label key={t} className="flex items-center gap-2 text-sm text-slate-700 dark:text-zinc-300">
							<input
								type="checkbox"
								checked={pref.jobType.includes(t)}
								onChange={() => toggleJobType(t)}
							/>
							{t}
						</label>
					))}
				</div>
				<label className="mt-4 flex items-center gap-2 text-sm text-slate-700 dark:text-zinc-300">
					<input
						type="checkbox"
						checked={Boolean(pref.relocation)}
						onChange={(e) =>
							setDraft((d) =>
								d
									? {
											...d,
											preferences: { ...d.preferences, relocation: e.target.checked },
										}
									: d,
							)
						}
					/>
					Open to relocation
				</label>
				<div className="mt-4 grid gap-4 sm:grid-cols-2">
					<div>
						<label className="text-xs text-slate-500 dark:text-zinc-400">Expected CTC</label>
						<input
							value={pref.expectedCTC ?? ""}
							onChange={(e) =>
								setDraft((d) =>
									d
										? {
												...d,
												preferences: {
													...d.preferences,
													expectedCTC: e.target.value || null,
												},
											}
										: d,
								)
							}
							className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
						/>
					</div>
					<div>
						<label className="text-xs text-slate-500 dark:text-zinc-400">Notice period</label>
						<input
							value={pref.noticePeriod ?? ""}
							onChange={(e) =>
								setDraft((d) =>
									d
										? {
												...d,
												preferences: {
													...d.preferences,
													noticePeriod: e.target.value || null,
												},
											}
										: d,
								)
							}
							className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
						/>
					</div>
				</div>
			</div>

			<div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-400">
				<p>
					<strong className="text-slate-800 dark:text-zinc-200">Parse metadata</strong> — source:{" "}
					{meta.source}, confidence: {meta.confidenceScore ?? "—"}, last updated:{" "}
					{meta.lastUpdated ? new Date(meta.lastUpdated).toLocaleString() : "—"}
				</p>
			</div>
		</div>
	);
}
