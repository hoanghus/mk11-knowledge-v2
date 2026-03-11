import { listFrameMoves } from "@/lib/content"
import { PageTemplate } from "@/components/shared/page-template"

export default async function FrameDataPage() {
  const frameMoves = await listFrameMoves()

  return (
    <PageTemplate
      title="Frame Data"
      description={`${frameMoves.length} frame rows loaded from JSON dataset.`}
      note="Next: TanStack Table + search/filter/sort semantics for startup/on-block/on-hit."
    />
  )
}
