import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, SectionHeading } from "./landing-shell";

const FAQS = [
  {
    question: "Is it really free?",
    answer:
      "Yes - MIT licensed, no paid tier and no attribution required. Use it in personal work, client work and commercial products.",
  },
  {
    question: "Do I need a database to try it?",
    answer:
      "No. Most screens run on local mock data, so you can click through the entire dashboard immediately. Add a Postgres URL when you are ready for auth and persistence.",
  },
  {
    question: "Which stack does it use?",
    answer:
      "Next.js 16 with the App Router, React 19, TypeScript, Tailwind CSS v4 and shadcn/ui, with Better Auth for authentication and Drizzle ORM over Neon Postgres for data.",
  },
  {
    question: "How do I remove the pages I don't want?",
    answer:
      "Each screen lives in its own folder under features/ with its route in app/, and navigation is driven by a single typed config in config/sidebar.ts. Delete the folder, drop the entry, and nothing dangles.",
  },
  {
    question: "Can I match it to my brand?",
    answer:
      "Colour, radius and font are CSS variables in globals.css. The built-in theme customizer previews presets live in both light and dark before you commit the values.",
  },
  {
    question: "Is it production ready?",
    answer:
      "The UI layer is: typed, linted, responsive and accessible. Treat the mock data and seed scripts as examples to replace, and add your own tests around the business logic you build on top.",
  },
];

export function FaqSection() {
  return (
    <Section id="faq">
      <SectionHeading
        index="04"
        eyebrow="FAQ"
        title="Questions worth answering first"
      />

      <div className="mt-12 max-w-3xl">
        <Accordion type="single" collapsible className="border-t border-dashed">
          {FAQS.map((faq) => (
            <AccordionItem
              key={faq.question}
              value={faq.question}
              className="border-dashed"
            >
              <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
