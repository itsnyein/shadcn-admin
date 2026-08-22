"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ChatMessage } from "@/features/ai-chat/types";
import { cn } from "@/lib/utils";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { ThinkingOrb } from "thinking-orbs";
import { useState } from "react";

function IconAction({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClick}
          aria-label={label}
          className="text-muted-foreground hover:text-foreground size-7"
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export function ChatMessageItem({
  message,
  isLast,
  onRegenerate,
}: {
  message: ChatMessage;
  isLast: boolean;
  onRegenerate: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; the text stays selectable by hand.
    }
  };

  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="bg-muted max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="group/message">
      <div className="text-sm leading-relaxed whitespace-pre-wrap">
        {message.content}
      </div>

      <div
        className={cn(
          "mt-1.5 -ml-1.5 flex items-center gap-0.5 transition-opacity",
          isLast
            ? "opacity-100"
            : "opacity-0 group-hover/message:opacity-100 focus-within:opacity-100",
        )}
      >
        <IconAction label={copied ? "Copied" : "Copy"} onClick={copy}>
          {copied ? (
            <Check className="size-3.5" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </IconAction>

        {isLast ? (
          <IconAction label="Regenerate" onClick={onRegenerate}>
            <RefreshCcw className="size-3.5" />
          </IconAction>
        ) : null}
      </div>
    </div>
  );
}

export function ChatThinking() {
  return (
    <div className="text-muted-foreground flex items-center gap-2.5 text-sm">
      <ThinkingOrb size={20} state="working" aria-label="Thinking" />
      Thinking&hellip;
    </div>
  );
}
