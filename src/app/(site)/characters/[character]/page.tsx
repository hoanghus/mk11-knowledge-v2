import { PageTemplate } from "@/components/shared/page-template"

export default async function CharacterDetailPage({ params }: { params: Promise<{ character: string }> }) {
  const { character } = await params

  return (
    <PageTemplate
      title={`Character: ${character}`}
      description="Core character hub: overview, gameplan, key moves, combos, punishes, and practice notes."
    />
  )
}
