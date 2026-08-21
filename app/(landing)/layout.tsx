import { LandingFooter } from "@/features/landing/components/landing-footer";
import { LandingNavbar } from "@/features/landing/components/landing-navbar";
import { LandingThemePanel } from "@/features/landing/components/landing-theme-panel";
import { Rails } from "@/features/landing/components/landing-shell";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col">
      <LandingNavbar />

      <Rails>
        <main>{children}</main>
        <LandingFooter />
      </Rails>

      <LandingThemePanel />
    </div>
  );
}
