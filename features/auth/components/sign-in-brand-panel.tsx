import { Command } from "lucide-react";
import Link from "next/link";

const MONO_LABEL =
  "text-muted-foreground font-mono text-[10px] tracking-[0.14em] uppercase";

const NAV_BARS = [128, 148, 168, 188, 208];
const STAT_TILES = [168, 252, 336, 420];
const TABLE_ROWS = [224, 252, 280, 308];

function DashboardSchematic() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 560 400"
      fill="none"
      className="text-border w-full max-w-xl"
    >
      <g stroke="currentColor" strokeWidth="1">
        <line x1="64" y1="42" x2="496" y2="42" opacity="0.8" />
        <line x1="64" y1="36" x2="64" y2="48" opacity="0.8" />
        <line x1="496" y1="36" x2="496" y2="48" opacity="0.8" />

        <rect x="64" y="64" width="432" height="292" strokeDasharray="4 4" />

        <line x1="152" y1="64" x2="152" y2="356" strokeDasharray="4 4" />
        <line x1="152" y1="108" x2="496" y2="108" strokeDasharray="4 4" />

        <rect x="168" y="78" width="120" height="16" rx="8" opacity="0.9" />
        <circle cx="476" cy="86" r="8" opacity="0.9" />

        {STAT_TILES.map((x) => (
          <rect key={x} x={x} y="128" width="68" height="48" rx="2" />
        ))}

        <rect
          x="168"
          y="196"
          width="320"
          height="140"
          rx="2"
          strokeDasharray="4 4"
        />
        {TABLE_ROWS.map((y) => (
          <line key={y} x1="184" y1={y} x2="472" y2={y} opacity="0.65" />
        ))}

        <line x1="108" y1="356" x2="108" y2="378" opacity="0.8" />
        <line x1="324" y1="356" x2="324" y2="378" opacity="0.8" />
      </g>

      <rect
        x="76"
        y="84"
        width="20"
        height="20"
        rx="5"
        className="fill-primary"
        opacity="0.7"
      />
      {NAV_BARS.map((y, i) => (
        <rect
          key={y}
          x="76"
          y={y}
          width="64"
          height="8"
          rx="2"
          className={i === 0 ? "fill-primary" : "fill-current"}
          opacity={i === 0 ? 0.5 : 0.35}
        />
      ))}

      <rect
        x="180"
        y="156"
        width="30"
        height="8"
        rx="2"
        className="fill-primary"
        opacity="0.55"
      />

      <g className="fill-muted-foreground font-mono" fontSize="9">
        <text x="280" y="30" textAnchor="middle" letterSpacing="1.5">
          DASHBOARD
        </text>
        <text x="108" y="392" textAnchor="middle" letterSpacing="1.5">
          SIDEBAR
        </text>
        <text x="324" y="392" textAnchor="middle" letterSpacing="1.5">
          CONTENT
        </text>
      </g>
    </svg>
  );
}

function CornerMark({ className }: { className?: string }) {
  return (
    <span aria-hidden className={`absolute size-2.5 ${className}`}>
      <span className="bg-border absolute top-1/2 left-0 h-px w-full -translate-y-1/2" />
      <span className="bg-border absolute top-0 left-1/2 h-full w-px -translate-x-1/2" />
    </span>
  );
}

export function SignInBrandPanel() {
  return (
    <div className="bg-muted/30 relative hidden overflow-hidden border-r border-dashed lg:block">
      <CornerMark className="top-6 left-6" />
      <CornerMark className="right-6 bottom-6" />

      <div className="relative z-10 flex h-full flex-col justify-between p-12">
        <Link href="/" className="group flex w-fit items-center gap-2.5">
          <span className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-md transition-transform group-hover:scale-105">
            <Command className="size-4.5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[15px] font-semibold tracking-tight">
              Shadcn Admin
            </span>
            <span className="text-muted-foreground text-xs tracking-tight">
              Admin Dashboard
            </span>
          </span>
        </Link>

        <div className="flex justify-center py-4">
          <DashboardSchematic />
        </div>

        <div>
          <div className="flex items-center gap-4">
            <span className="text-primary text-[11px] font-semibold tracking-[0.18em] uppercase">
              Secure access
            </span>
            <span aria-hidden className="bg-border h-px flex-1" />
          </div>

          <h2 className="mt-5 max-w-md text-3xl font-semibold tracking-tight text-balance">
            Drawn to spec, wired for real
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md text-sm leading-relaxed text-pretty">
            Every screen behind this form is a working implementation, not a
            placeholder. Sign in and the whole workspace is waiting.
          </p>

          <div className="mt-8 flex items-center justify-between gap-4">
            <span className={MONO_LABEL}>Free &amp; open source</span>
            <span aria-hidden className="bg-border h-px flex-1" />
            <span className={MONO_LABEL}>MIT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
