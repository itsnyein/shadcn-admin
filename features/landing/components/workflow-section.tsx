import { WORKFLOW_STEPS } from "@/features/landing/data";
import { CopyCommand } from "./copy-command";
import { Section, SectionHeading } from "./landing-shell";

export function WorkflowSection() {
  return (
    <Section id="workflow">
      <SectionHeading
        index="03"
        eyebrow="Workflow"
        title="Running locally in three steps"
        lead="No scaffolding CLI, no config wizard. Clone it and the whole dashboard boots on mock data."
      />

      <ol className="mt-14 grid divide-x divide-y divide-dashed border border-dashed lg:grid-cols-3">
        {WORKFLOW_STEPS.map((item) => (
          <li key={item.step} className="flex flex-col p-6 sm:p-7">
            <span className="text-primary/40 font-mono text-3xl font-semibold">
              {item.step}
            </span>

            <p className="mt-4 text-lg font-semibold tracking-tight">
              {item.title}
            </p>
            <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
              {item.description}
            </p>

            <CopyCommand command={item.command} className="mt-6 self-start" />
          </li>
        ))}
      </ol>
    </Section>
  );
}
