"use client";

import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DEMO_REPLY, MODELS, SUGGESTIONS } from "@/features/ai-chat/data";
import type { ChatMessage, ChatStatus } from "@/features/ai-chat/types";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { ThinkingOrb } from "thinking-orbs";
import { ChatComposer } from "./chat-composer";
import { ChatMessageItem, ChatThinking } from "./chat-message";

function EmptyState({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <ThinkingOrb size={64} state="breathing" aria-label="Assistant" />

      <h2 className="mt-5 text-2xl font-semibold tracking-tight">
        How can I help?
      </h2>
      <p className="text-muted-foreground mt-2 text-sm">
        Ask about your data, draft something, or start from a suggestion.
      </p>

      <div className="mt-8 grid w-full max-w-lg gap-2 sm:grid-cols-2">
        {SUGGESTIONS.map((suggestion) => (
          <Button
            key={suggestion}
            type="button"
            variant="outline"
            onClick={() => onPick(suggestion)}
            className="text-muted-foreground hover:text-foreground h-auto justify-start rounded-xl px-3.5 py-2.5 text-left text-sm font-normal whitespace-normal"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default function AiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("ready");
  const [input, setInput] = useState("");
  const [model, setModel] = useState(MODELS[1].value);

  const idRef = useRef(0);
  const lastPromptRef = useRef("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const busy = status === "thinking";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, status]);

  const respond = useCallback((prompt: string) => {
    setStatus("thinking");
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `m${++idRef.current}`,
          role: "assistant",
          content: DEMO_REPLY(prompt),
        },
      ]);
      setStatus("ready");
    }, 700);
  }, []);

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text || busy) return;

      lastPromptRef.current = text;
      setMessages((current) => [
        ...current,
        { id: `m${++idRef.current}`, role: "user", content: text },
      ]);
      setInput("");
      respond(text);
    },
    [busy, respond],
  );

  const regenerate = useCallback(() => {
    if (!lastPromptRef.current || busy) return;
    setMessages((current) => {
      const index = current.findLastIndex((m) => m.role === "assistant");
      return index === -1 ? current : current.slice(0, index);
    });
    respond(lastPromptRef.current);
  }, [busy, respond]);

  const lastAssistantId = messages.findLast((m) => m.role === "assistant")?.id;

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-[calc(100svh-6rem)] flex-col">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <div
            className={cn(
              "mx-auto w-full max-w-3xl px-4 py-6",
              messages.length === 0 && "flex flex-1 flex-col justify-center",
            )}
          >
            {messages.length === 0 ? (
              <EmptyState onPick={send} />
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <ChatMessageItem
                    key={message.id}
                    message={message}
                    isLast={message.id === lastAssistantId && !busy}
                    onRegenerate={regenerate}
                  />
                ))}
                {busy ? <ChatThinking /> : null}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        <div className="bg-background border-t">
          <div className="mx-auto w-full max-w-3xl px-4 py-4">
            <ChatComposer
              value={input}
              onValueChange={setInput}
              onSubmit={() => send(input)}
              model={model}
              onModelChange={setModel}
              busy={busy}
            />
            <p className="text-muted-foreground mt-2 text-center text-xs">
              UI demo - no model is connected.
            </p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
