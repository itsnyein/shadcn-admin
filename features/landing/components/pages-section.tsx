import { PAGE_GROUPS } from "@/features/landing/data";
import { Check } from "lucide-react";
import { Section, SectionHeading } from "./landing-shell";

export function PagesSection() {
  return (
    <Section id="pages">
      <SectionHeading
        index="02"
        eyebrow="What's inside"
        title="Every page you were going to build anyway"
        lead="Twenty-plus routes, each responsive, keyboard accessible and typed end to end."
      />

      <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        {PAGE_GROUPS.map((group) => (
          <div key={group.title}>
            <p className="border-b border-dashed pb-3 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase">
              {group.title}
            </p>

            <ul className="mt-5 space-y-5">
              {group.pages.map((page) => (
                <li key={page.name} className="flex items-start gap-3">
                  <Check className="text-primary mt-0.5 size-4 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{page.name}</p>
                    <p className="text-muted-foreground mt-0.5 text-sm leading-relaxed">
                      {page.meta}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
