import { listMatchups } from "@/lib/content"
import { MatchupsListClient } from "@/components/matchups/matchups-list-client"

export default async function MatchupsPage() {
  const matchups = await listMatchups()

  return (
    <section className="mx-auto w-full max-w-6xl space-y-5">
      <div className="rounded-xl border bg-card/40 p-4 md:p-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Matchups</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Matchup index với filter theo character và keyword để tra nhanh trước khi vào set.
        </p>
      </div>

      <MatchupsListClient rows={matchups} />
    </section>
  )
}
