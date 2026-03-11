import { listPracticeDrills } from "@/lib/content"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function PracticePage() {
  const drills = await listPracticeDrills()

  const grouped = {
    beginner: drills.filter((d) => d.level === "beginner"),
    intermediate: drills.filter((d) => d.level === "intermediate"),
    advanced: drills.filter((d) => d.level === "advanced"),
  }

  return (
    <section className="mx-auto w-full max-w-5xl space-y-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Practice</h1>
        <p className="text-muted-foreground">{drills.length} drills grouped by level.</p>
      </div>

      {(["beginner", "intermediate", "advanced"] as const).map((level) => (
        <section key={level} className="space-y-2">
          <h2 className="text-lg font-semibold capitalize">{level}</h2>
          <div className="grid gap-3">
            {grouped[level].length ? (
              grouped[level].map((drill) => (
                <Card key={drill.slug} id={drill.slug}>
                  <CardHeader>
                    <CardTitle className="text-base">{drill.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>{drill.goal}</p>
                    <div className="space-y-1">
                      {drill.steps.map((step, idx) => (
                        <p key={step}>
                          {idx + 1}. {step}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-sm text-muted-foreground">No drills yet.</CardContent>
              </Card>
            )}
          </div>
        </section>
      ))}
    </section>
  )
}
