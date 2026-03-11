import { notFound } from "next/navigation"

import { getCharacterBySlug } from "@/lib/content"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function CharacterDetailPage({ params }: { params: Promise<{ character: string }> }) {
  const { character } = await params
  const data = await getCharacterBySlug(character)

  if (!data) notFound()

  return (
    <section className="mx-auto w-full max-w-5xl space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{data.name}</h1>
        <p className="text-muted-foreground">{data.summary}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{data.difficulty}</Badge>
          {data.archetypes.map((item) => (
            <Badge key={item} variant="outline">
              {item}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Strengths</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            {data.strengths.map((item) => (
              <p key={item}>• {item}</p>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Weaknesses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            {data.weaknesses.map((item) => (
              <p key={item}>• {item}</p>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
