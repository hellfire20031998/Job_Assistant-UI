export type UserProfile = {
	id: string;
	email: string;
	emailVerified: boolean;
	displayName: string | null;
	givenName: string | null;
	familyName: string | null;
	pictureUrl: string | null;
	locale: string | null;
	provider: string | null;
	roles: string[];
	lastLoginAt: string | null;
	memberSince: string | null;
};

export type ApiResponse<T> = {
	success: boolean;
	message: string | null;
	data: T | null;
};

/** Mirrors server `Resume` / nested resume profile JSON. */
export type ResumePersonalInfo = {
	fullName: string;
	email: string;
	phone: string | null;
	location: string | null;
	linkedin: string | null;
	github: string | null;
	portfolio: string | null;
};

export type ResumeSkills = {
	languages: string[];
	backend: string[];
	frontend: string[];
	databases: string[];
	tools: string[];
	concepts: string[];
};

export type ResumeExperienceType = "full-time" | "internship" | "freelance" | "contract";

export type ResumeExperienceEntry = {
	title: string;
	company: string;
	location: string | null;
	type: ResumeExperienceType | string;
	startDate: string | null;
	endDate: string | null;
	technologies: string[];
	highlights: string[];
};

export type ResumeProjectEntry = {
	name: string;
	description: string;
	techStack: string[];
	startDate: string | null;
	endDate: string | null;
	highlights: string[];
	githubUrl: string | null;
	liveUrl: string | null;
};

export type ResumeEducationEntry = {
	school: string;
	degree: string | null;
	field: string | null;
	startDate: string | null;
	endDate: string | null;
};

export type ResumeCertificationEntry = {
	name: string;
	issuer: string;
	date: string | null;
};

export type ResumeJobPreferenceType = "remote" | "onsite" | "hybrid";

export type ResumePreferences = {
	jobType: ResumeJobPreferenceType[];
	relocation: boolean | null;
	expectedCTC: string | null;
	noticePeriod: string | null;
};

export type ResumeMetadataSource = "resume_upload" | "manual" | "linkedin";

export type ResumeProfileMetadata = {
	source: ResumeMetadataSource;
	lastUpdated: string;
	confidenceScore: number | null;
};

export type ResumeProfile = {
	personalInfo: ResumePersonalInfo;
	summary: string | null;
	skills: ResumeSkills;
	experiences: ResumeExperienceEntry[];
	projects: ResumeProjectEntry[];
	education: ResumeEducationEntry[];
	certifications: ResumeCertificationEntry[];
	achievements: string[];
	languages: string[];
	preferences: ResumePreferences;
	metadata: ResumeProfileMetadata;
	rawModelJson: Record<string, unknown> | null;
};

export type ParseStatus = "PENDING" | "READY" | "FAILED";

export type ResumeDocument = ResumeProfile & {
	id: string;
	userId: string;
	label: string | null;
	isDefault: boolean;
	extractedText: string | null;
	parseStatus: ParseStatus;
	parseError: string | null;
	createdAt: string | null;
	updatedAt: string | null;
};

export type ResumeSummary = {
	id: string;
	label: string | null;
	isDefault: boolean;
	parseStatus: ParseStatus;
	parseError: string | null;
	updatedAt: string | null;
};
