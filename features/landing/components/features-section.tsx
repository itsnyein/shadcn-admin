import { FEATURE_CARDS, THEME_TOKENS } from "@/features/landing/data";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";
import { Section, SectionHeading } from "./landing-shell";

export function FeaturesSection() {
  return (
    <Section id="features">
      <SectionHeading
        index="01"
        eyebrow="Features"
        title="Not a gallery of screenshots"
        lead="Every screen is a working implementation you can read, copy and extend - wired to real state, real routing and a real database."
      />

      <div className="mt-14 grid divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2 lg:grid-cols-3">
        {FEATURE_CARDS.map((feature, i) => (
          <div
            key={feature.title}
            className="group hover:bg-muted/40 relative p-6 transition-colors sm:p-7"
          >
            <div className="flex items-center justify-between">
              <span className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-lg">
                <feature.icon className="size-4.5" />
              </span>
              <span className="text-muted-foreground/60 font-mono text-[10px]">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <p className="mt-4 font-semibold tracking-tight">{feature.title}</p>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid items-center gap-8 border border-dashed p-6 sm:p-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="text-lg font-semibold tracking-tight">
            Themeable down to the token
          </p>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            Colour, radius and typography are plain CSS variables. Every preset
            the dashboard ships with is available right here - open the
            customizer on the right edge of this page and watch the whole site
            change with it.
          </p>

          <p className="text-muted-foreground mt-5 inline-flex items-center gap-2 rounded-full border border-dashed px-3 py-1.5 font-mono text-xs">
            <Palette className="size-3.5" />
            Customizer → right edge
          </p>
        </div>

        <dl className="divide-y divide-dashed overflow-hidden border border-dashed font-mono text-xs">
          {THEME_TOKENS.map(({ key, value }) => (
            <div
              key={key}
              className="flex items-center justify-between gap-3 px-3 py-2.5"
            >
              <dt className="text-muted-foreground truncate">{key}</dt>
              <dd className={cn("text-foreground truncate")}>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
