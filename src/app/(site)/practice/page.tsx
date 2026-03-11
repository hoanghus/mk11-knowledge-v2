import { listPracticeDrills } from "@/lib/content"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type PracticePageProps = {
  searchParams: Promise<{ q?: string; level?: "all" | "beginner" | "intermediate" | "advanced" }>
}

export default async function PracticePage({ searchParams }: PracticePageProps) {
  const { q = "", level = "all" } = await searchParams
  const drills = await listPracticeDrills()
  const query = q.trim().toLowerCase()

  const filtered = drills.filter((d) => {
    const matchQuery = query
      ? `${d.title} ${d.goal} ${d.steps.join(" ")}`.toLowerCase().includes(query)
      : true

    const matchLevel = level === "all" ? true : d.level === level

    return matchQuery && matchLevel
  })

  const grouped = {
    beginner: filtered.filter((d) => d.level === "beginner"),
    intermediate: filtered.filter((d) => d.level === "intermediate"),
    advanced: filtered.filter((d) => d.level === "advanced"),
  }

  return (
    <section className="mx-auto w-full max-w-5xl space-y-5">
      <div className="rounded-xl border bg-card/40 p-4 md:p-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Practice</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Drill library để lên buổi tập theo level, có goal + checklist rõ ràng.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {filtered.length}/{drills.length} drills
        </p>
      </div>

      <form className="space-y-3 rounded-xl border p-4" method="get" action="/practice">
        <Input name="q" defaultValue={q} placeholder="Search drills..." />

        <div className="flex flex-wrap gap-2">
          {(["all", "beginner", "intermediate", "advanced"] as const).map((item) => (
            <Badge key={item} variant={level === item ? "default" : "secondary"}>
              <a href={`/practice?level=${item}${q ? `&q=${encodeURIComponent(q)}` : ""}`}>{item}</a>
            </Badge>
          ))}
        </div>
      </form>

      {(["beginner", "intermediate", "advanced"] as const).map((bucket) => (
        <section key={bucket} className="space-y-3">
          <h2 className="text-lg font-semibold capitalize">{bucket}</h2>
          <div className="grid gap-3">
            {grouped[bucket].length ? (
              grouped[bucket].map((drill) => (
                <Card key={drill.slug} id={drill.slug} className="border-border/80">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{drill.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0 text-sm text-muted-foreground">
                    <p>{drill.goal}</p>

                    <div className="space-y-1">
                      {drill.steps.map((step, idx) => (
                        <p key={step}>
                          {idx + 1}. {step}
                        </p>
                      ))}
                    </div>

                    {!!drill.successCriteria?.length && (
                      <div className="rounded-md border bg-muted/20 p-3">
                        <p className="mb-1 font-medium text-foreground">Success criteria</p>
                        {drill.successCriteria.map((item) => (
                          <p key={item}>• {item}</p>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-sm text-muted-foreground">No drills in this level.</CardContent>
              </Card>
            )}
          </div>
        </section>
      ))}
    </section>
  )
}
