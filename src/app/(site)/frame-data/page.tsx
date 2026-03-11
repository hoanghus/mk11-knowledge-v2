import { FrameDataTableClient } from "@/components/frame-data/frame-data-table-client"
import { listFrameMoves } from "@/lib/content"

type FrameDataPageProps = {
  searchParams: Promise<{ character?: string }>
}

export default async function FrameDataPage({ searchParams }: FrameDataPageProps) {
  const frameMoves = await listFrameMoves()
  const { character = "all" } = await searchParams

  return (
    <section className="mx-auto w-full max-w-6xl space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Frame Data</h1>
        <p className="text-sm text-muted-foreground md:text-base">Tool page with search/filter/sort ready for practical lookup.</p>
      </div>
      <FrameDataTableClient rows={frameMoves} initialCharacter={character} />
    </section>
  )
}
