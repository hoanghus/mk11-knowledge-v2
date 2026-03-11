import { listGlossaryTerms } from "@/lib/content"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"

type GlossaryPageProps = {
  searchParams: Promise<{ q?: string }>
}

export default async function GlossaryPage({ searchParams }: GlossaryPageProps) {
  const { q = "" } = await searchParams
  const terms = await listGlossaryTerms()
  const query = q.trim().toLowerCase()

  const filtered = query
    ? terms.filter((t) => `${t.term} ${t.shortDefinition} ${t.fullDefinition}`.toLowerCase().includes(query))
    : terms

  return (
    <section className="mx-auto w-full max-w-4xl space-y-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Glossary</h1>
        <p className="text-muted-foreground">{filtered.length} terms.</p>
      </div>

      <form method="get" action="/glossary">
        <Input name="q" defaultValue={q} placeholder="Search terms..." />
      </form>

      <Accordion className="w-full">
        {filtered.map((term) => (
          <AccordionItem key={term.slug} value={term.slug} id={term.slug}>
            <AccordionTrigger>{term.term}</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground">{term.shortDefinition}</p>
              <p className="mt-2 text-sm">{term.fullDefinition}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
