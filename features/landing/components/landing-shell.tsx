import { cn } from "@/lib/utils";
import { ReactNode } from "react";

function PlusMark({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("absolute z-10 size-2", className)}>
      <span className="bg-border absolute top-1/2 left-0 h-px w-full -translate-y-1/2" />
      <span className="bg-border absolute top-0 left-1/2 h-full w-px -translate-x-1/2" />
    </span>
  );
}

export function Rails({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-6xl lg:border-x lg:border-dashed">
      {children}
    </div>
  );
}

export function Section({
  id,
  className,
  innerClassName,
  divider = true,
  children,
}: {
  id?: string;
  className?: string;
  innerClassName?: string;
  divider?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-20",
        divider && "border-b border-dashed",
        className,
      )}
    >
      <div className={cn("px-5 py-20 sm:px-8 sm:py-24", innerClassName)}>
        {children}
      </div>

      {divider ? (
        <>
          <PlusMark className="-bottom-1 -left-1 hidden lg:block" />
          <PlusMark className="-right-1 -bottom-1 hidden lg:block" />
        </>
      ) : null}
    </section>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="text-muted-foreground font-mono text-xs">{index}</span>
        <span className="text-primary text-xs font-semibold tracking-[0.18em] uppercase">
          {eyebrow}
        </span>
        <span aria-hidden className="bg-border h-px flex-1" />
      </div>

      <h2 className="mt-6 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>

      {lead ? (
        <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed text-pretty">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
