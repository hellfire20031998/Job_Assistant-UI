"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

type Props = {
	className?: string;
	/** Visual style preset for different surfaces */
	variant?: "landing" | "app";
};

export function ThemeToggle({ className = "", variant = "app" }: Props) {
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [open, setOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => setMounted(true), []);

	useEffect(() => {
		function onDocMouseDown(e: MouseEvent) {
			if (!ref.current?.contains(e.target as Node)) setOpen(false);
		}
		/* mousedown fires before click; avoids the same click reopening then instantly closing the menu */
		document.addEventListener("mousedown", onDocMouseDown);
		return () => document.removeEventListener("mousedown", onDocMouseDown);
	}, []);

	const triggerClass =
		variant === "landing"
			? "flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
			: "flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800";

	const menuClass =
		variant === "landing"
			? "absolute right-0 top-full z-[60] mt-1.5 min-w-[10.5rem] overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
			: "absolute right-0 top-full z-[60] mt-1.5 min-w-[10.5rem] overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950";

	const itemClass =
		variant === "landing"
			? "flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
			: "flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-zinc-800 transition hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-900";

	if (!mounted) {
		return (
			<div
				className={`h-9 w-9 shrink-0 animate-pulse rounded-full bg-slate-100 dark:bg-zinc-800 ${className}`}
				aria-hidden
			/>
		);
	}

	const ActiveIcon = resolvedTheme === "dark" ? Moon : Sun;

	return (
		<div className={`relative ${className}`} ref={ref}>
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					setOpen((o) => !o);
				}}
				className={triggerClass}
				aria-label="Theme"
				aria-haspopup="listbox"
				aria-expanded={open}
			>
				<ActiveIcon className="h-4 w-4" strokeWidth={2} />
			</button>
			{open ? (
				<div
					className={menuClass}
					role="listbox"
					aria-label="Choose theme"
					onMouseDown={(e) => e.stopPropagation()}
				>
					<button
						type="button"
						role="option"
						aria-selected={theme === "light"}
						className={itemClass}
						onClick={() => {
							setTheme("light");
							setOpen(false);
						}}
					>
						<Sun className="h-4 w-4 shrink-0 text-amber-500" />
						Light
						{theme === "light" ? <Check className="ml-auto h-4 w-4 text-blue-600 dark:text-blue-400" /> : null}
					</button>
					<button
						type="button"
						role="option"
						aria-selected={theme === "dark"}
						className={itemClass}
						onClick={() => {
							setTheme("dark");
							setOpen(false);
						}}
					>
						<Moon className="h-4 w-4 shrink-0 text-violet-500" />
						Dark
						{theme === "dark" ? <Check className="ml-auto h-4 w-4 text-blue-600 dark:text-blue-400" /> : null}
					</button>
					<button
						type="button"
						role="option"
						aria-selected={theme === "system"}
						className={itemClass}
						onClick={() => {
							setTheme("system");
							setOpen(false);
						}}
					>
						<Monitor className="h-4 w-4 shrink-0 text-slate-500 dark:text-zinc-400" />
						System
						{theme === "system" ? <Check className="ml-auto h-4 w-4 text-blue-600 dark:text-blue-400" /> : null}
					</button>
				</div>
			) : null}
		</div>
	);
}
