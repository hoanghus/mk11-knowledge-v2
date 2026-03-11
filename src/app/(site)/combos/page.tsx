import { listCombos } from "@/lib/content"
import { PageTemplate } from "@/components/shared/page-template"

export default async function CombosPage() {
  const combos = await listCombos()

  return (
    <PageTemplate
      title="Combos"
      description={`${combos.length} combo records loaded from JSON dataset.`}
      note="Next: add character/starter/meter/position filters and table/card hybrid UI."
    />
  )
}
