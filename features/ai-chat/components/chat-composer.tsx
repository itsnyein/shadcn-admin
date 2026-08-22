"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { MODELS } from "@/features/ai-chat/data";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef } from "react";

const MAX_HEIGHT = 200;

export function ChatComposer({
  value,
  onValueChange,
  onSubmit,
  model,
  onModelChange,
  busy,
}: {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: () => void;
  model: string;
  onModelChange: (model: string) => void;
  busy: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`;
  }, [value]);

  const canSend = value.trim().length > 0 && !busy;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (canSend) onSubmit();
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (canSend) onSubmit();
      }}
      className="bg-card focus-within:border-ring rounded-2xl border shadow-sm transition-colors"
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything…"
        aria-label="Message"
        className="placeholder:text-muted-foreground max-h-50 w-full resize-none bg-transparent px-4 pt-3.5 pb-2 text-sm leading-relaxed outline-none"
      />

      <div className="flex items-center justify-between gap-2 px-2 pb-2">
        <Select value={model} onValueChange={onModelChange}>
          <SelectTrigger
            size="sm"
            aria-label="Model"
            className="text-muted-foreground w-auto gap-1.5 border-0 bg-transparent shadow-none hover:bg-transparent focus-visible:ring-0 dark:bg-transparent dark:hover:bg-transparent"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            {MODELS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          type="submit"
          size="icon"
          disabled={!canSend}
          aria-label="Send message"
          className="size-8 rounded-full"
        >
          {busy ? <Spinner /> : <ArrowUp className="size-4" />}
        </Button>
      </div>
    </form>
  );
}
