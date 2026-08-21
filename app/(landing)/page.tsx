import { CtaSection } from "@/features/landing/components/cta-section";
import { FaqSection } from "@/features/landing/components/faq-section";
import { FeaturesSection } from "@/features/landing/components/features-section";
import { HeroSection } from "@/features/landing/components/hero-section";
import { PagesSection } from "@/features/landing/components/pages-section";
import { PreviewSection } from "@/features/landing/components/preview-section";
import { StackSection } from "@/features/landing/components/stack-section";
import { WorkflowSection } from "@/features/landing/components/workflow-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shadcn Admin - The free Next.js admin dashboard starter",
  description:
    "An open-source admin dashboard starter with 20+ working pages, built on Next.js 16, React 19, Tailwind CSS v4 and shadcn/ui. Auth, data tables, charts and theming included. MIT licensed.",
};

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <PreviewSection />
      <StackSection />
      <FeaturesSection />
      <PagesSection />
      <WorkflowSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
