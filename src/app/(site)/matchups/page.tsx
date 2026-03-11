import { listMatchups } from "@/lib/content"
import { MatchupsListClient } from "@/components/matchups/matchups-list-client"

export default async function MatchupsPage() {
  const matchups = await listMatchups()

  return (
    <section className="mx-auto w-full max-w-6xl space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Matchups</h1>
        <p className="text-sm text-muted-foreground md:text-base">Matchup index with character filters and keyword search.</p>
      </div>

      <MatchupsListClient rows={matchups} />
    </section>
  )
}
