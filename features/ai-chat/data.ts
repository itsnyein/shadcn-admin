export const MODELS = [
  { label: "Fast", value: "fast" },
  { label: "Balanced", value: "balanced" },
  { label: "Advanced", value: "advanced" },
];

export const SUGGESTIONS = [
  "Summarise this month's revenue",
  "Draft a release note for v1.4",
  "Which customers churned last week?",
  "Explain this SQL query",
];

export const DEMO_REPLY = (prompt: string) =>
  `This chat is a UI demo, so there is no model behind it yet.\n\nYou asked: "${prompt}"\n\nTo make it live, add a route at app/api/chat/route.ts with the provider of your choice and stream the response into this component.`;
