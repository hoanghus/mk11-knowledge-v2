import { CombosTableClient } from "@/components/combos/combos-table-client"
import { listCombos } from "@/lib/content"

export default async function CombosPage() {
  const combos = await listCombos()

  return (
    <section className="mx-auto w-full max-w-6xl space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Combos</h1>
        <p className="text-sm text-muted-foreground md:text-base">Lookup combos by character, meter, position, and difficulty.</p>
      </div>

      <CombosTableClient rows={combos} />
    </section>
  )
}
