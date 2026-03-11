import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PageTemplate({
  title,
  description,
  note,
}: {
  title: string
  description: string
  note?: string
}) {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-4">
      <Badge variant="secondary">Scaffold</Badge>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Next step</CardTitle>
          <CardDescription>Content/data wiring will be added in migration phase.</CardDescription>
        </CardHeader>
        {note ? <CardContent className="text-sm text-muted-foreground">{note}</CardContent> : null}
      </Card>
    </section>
  )
}
