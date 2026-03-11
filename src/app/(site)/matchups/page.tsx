import Link from "next/link"

import { listMatchups } from "@/lib/content"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function MatchupsPage() {
  const matchups = await listMatchups()

  return (
    <section className="mx-auto w-full max-w-5xl space-y-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Matchups</h1>
        <p className="text-muted-foreground">{matchups.length} matchup pages loaded from MDX content.</p>
      </div>
      <div className="grid gap-3">
        {matchups.map((matchup) => (
          <Card key={matchup.slug}>
            <CardHeader>
              <CardTitle>
                <Link className="hover:underline" href={`/matchups/${matchup.slug}`}>
                  {matchup.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{matchup.summary}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
