import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AuthProvider } from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";

import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "JobAssistant",
	description: "Job search assistant — sign in with Google",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
			suppressHydrationWarning
		>
			<body
				className="flex min-h-full flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50"
				suppressHydrationWarning
			>
				<ThemeProvider>
					<AuthProvider>{children}</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
