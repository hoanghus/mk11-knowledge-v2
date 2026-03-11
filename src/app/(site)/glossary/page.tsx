import { listGlossaryTerms } from "@/lib/content"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

type GlossaryPageProps = {
  searchParams: Promise<{ q?: string; tag?: string }>
}

export default async function GlossaryPage({ searchParams }: GlossaryPageProps) {
  const { q = "", tag = "all" } = await searchParams
  const terms = await listGlossaryTerms()
  const query = q.trim().toLowerCase()

  const tagPool = Array.from(new Set(terms.flatMap((term) => term.tags ?? []))).sort((a, b) =>
    a.localeCompare(b),
  )

  const filtered = terms.filter((t) => {
    const matchQuery = query
      ? `${t.term} ${t.shortDefinition} ${t.fullDefinition}`.toLowerCase().includes(query)
      : true

    const matchTag = tag === "all" ? true : (t.tags ?? []).includes(tag)

    return matchQuery && matchTag
  })

  return (
    <section className="mx-auto w-full max-w-5xl space-y-5">
      <div className="rounded-xl border bg-card/40 p-4 md:p-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Glossary</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Tra nhanh thuật ngữ MK11 theo ngữ cảnh học thực chiến.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {filtered.length}/{terms.length} terms
        </p>
      </div>

      <form className="space-y-3 rounded-xl border p-4" method="get" action="/glossary">
        <Input name="q" defaultValue={q} placeholder="Search terms..." />

        <div className="flex flex-wrap gap-2">
          <Badge variant={tag === "all" ? "default" : "secondary"}>
            <a href="/glossary">all</a>
          </Badge>
          {tagPool.map((item) => (
            <Badge key={item} variant={tag === item ? "default" : "secondary"}>
              <a href={`/glossary?tag=${encodeURIComponent(item)}${q ? `&q=${encodeURIComponent(q)}` : ""}`}>
                {item}
              </a>
            </Badge>
          ))}
        </div>
      </form>

      <Accordion className="w-full space-y-2">
        {filtered.map((term) => (
          <AccordionItem key={term.slug} value={term.slug} id={term.slug} className="rounded-lg border px-4">
            <AccordionTrigger className="text-left">{term.term}</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground">{term.shortDefinition}</p>
              <p className="mt-2 text-sm leading-7">{term.fullDefinition}</p>

              {!!term.relatedTerms?.length && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {term.relatedTerms.slice(0, 6).map((item) => (
                    <Badge key={item} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
