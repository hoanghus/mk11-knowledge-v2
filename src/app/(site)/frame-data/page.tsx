import { FrameDataTableClient } from "@/components/frame-data/frame-data-table-client"
import { listFrameMoves } from "@/lib/content"

export default async function FrameDataPage() {
  const frameMoves = await listFrameMoves()

  return (
    <section className="mx-auto w-full max-w-6xl space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Frame Data</h1>
        <p className="text-sm text-muted-foreground md:text-base">Tool page with search/filter/sort ready for practical lookup.</p>
      </div>
      <FrameDataTableClient rows={frameMoves} />
    </section>
  )
}
