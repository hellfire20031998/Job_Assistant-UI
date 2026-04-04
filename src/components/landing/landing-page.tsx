"use client";

import { BenefitsSection } from "./benefits-section";
import { CTASection } from "./cta-section";
import { DemoSection } from "./demo-section";
import { FeaturesSection } from "./features-section";
import { Footer } from "./footer";
import { HeroSection } from "./hero-section";
import { HowItWorksSection } from "./how-it-works-section";
import { Navbar } from "./navbar";

export function LandingPage() {
	return (
		<div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 dark:bg-zinc-950 dark:text-zinc-50 dark:selection:bg-blue-900/40 dark:selection:text-blue-100">
			<Navbar />
			<main>
				<HeroSection />
				<FeaturesSection />
				<HowItWorksSection />
				<DemoSection />
				<BenefitsSection />
				<CTASection />
			</main>
			<Footer />
		</div>
	);
}
