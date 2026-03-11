import { notFound } from "next/navigation"

import { getMatchupBySlug } from "@/lib/content"
import { Badge } from "@/components/ui/badge"

export default async function MatchupDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const matchup = await getMatchupBySlug(slug)

  if (!matchup) notFound()

  return (
    <section className="mx-auto w-full max-w-4xl space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{matchup.title}</h1>
        <p className="text-muted-foreground">{matchup.summary}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{matchup.characterA}</Badge>
          <Badge variant="outline">{matchup.characterB}</Badge>
          {matchup.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">Structured matchup sections sẽ nối ở phase tiếp theo.</p>
    </section>
  )
}
