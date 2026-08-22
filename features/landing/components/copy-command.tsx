"use client";

import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function CopyCommand({
  command,
  className,
}: {
  command: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
    } catch {
      toast.error("Could not copy to clipboard. Select the command manually.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Command copied" : `Copy "${command}"`}
      className={cn(
        "group bg-muted/60 hover:border-foreground/25 focus-visible:ring-ring inline-flex max-w-full items-center gap-3 rounded-full border py-2 pr-3 pl-4 transition-colors focus-visible:ring-2 focus-visible:outline-none",
        className,
      )}
    >
      <code className="min-w-0 truncate font-mono text-xs sm:text-sm">
        {command}
      </code>

      <span className="text-muted-foreground group-hover:text-foreground shrink-0 transition-colors">
        {copied ? (
          <Check className="text-primary size-4" />
        ) : (
          <Copy className="size-4" />
        )}
      </span>
    </button>
  );
}
