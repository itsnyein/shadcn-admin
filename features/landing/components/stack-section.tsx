import { TECH_STACK } from "@/features/landing/data";
import { Section } from "./landing-shell";

export function StackSection() {
  return (
    <Section innerClassName="px-5 py-12 sm:px-8 sm:py-14">
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-10">
        <p className="text-muted-foreground shrink-0 text-xs font-semibold tracking-[0.18em] uppercase">
          Built with
        </p>

        <ul className="flex flex-wrap justify-center gap-2 lg:justify-start">
          {TECH_STACK.map((tool) => (
            <li
              key={tool}
              className="text-muted-foreground hover:border-foreground/25 hover:text-foreground rounded-full border px-3 py-1 text-xs transition-colors"
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
