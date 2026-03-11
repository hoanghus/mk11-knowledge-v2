import { CombosTableClient } from "@/components/combos/combos-table-client"
import { listCombos } from "@/lib/content"

export default async function CombosPage() {
  const combos = await listCombos()

  return (
    <section className="mx-auto w-full max-w-6xl space-y-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Combos</h1>
        <p className="text-muted-foreground">Lookup combos by character, meter, position, and difficulty.</p>
      </div>

      <CombosTableClient rows={combos} />
    </section>
  )
}
