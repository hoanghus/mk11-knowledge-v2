import { PageTemplate } from "@/components/shared/page-template"

export default async function MatchupDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return <PageTemplate title={`Matchup: ${slug}`} description="Detailed matchup notes and drill suggestions." />
}
