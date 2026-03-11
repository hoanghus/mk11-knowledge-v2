import Link from "next/link"
import { notFound } from "next/navigation"

import {
  getCharacterBySlug,
  listCombosByCharacter,
  listFrameMovesByCharacter,
  listMatchupsForCharacter,
  listPracticeForCharacter,
} from "@/lib/content"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function CharacterDetailPage({ params }: { params: Promise<{ character: string }> }) {
  const { character } = await params

  const [data, combos, frameMoves, matchups, practice] = await Promise.all([
    getCharacterBySlug(character),
    listCombosByCharacter(character),
    listFrameMovesByCharacter(character),
    listMatchupsForCharacter(character),
    listPracticeForCharacter(character),
  ])

  if (!data) notFound()

  const topCombos = [...combos].sort((a, b) => b.damage - a.damage).slice(0, 8)
  const keyMoves = frameMoves.slice(0, 12)

  return (
    <section className="mx-auto w-full max-w-6xl space-y-4">
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

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="flex w-full flex-wrap justify-start gap-2 h-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="gameplan">Gameplan</TabsTrigger>
          <TabsTrigger value="key-moves">Key Moves</TabsTrigger>
          <TabsTrigger value="combos">Combos</TabsTrigger>
          <TabsTrigger value="matchups">Matchups</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="grid gap-3 md:grid-cols-3">
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
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <Link className="underline underline-offset-4" href={`/combos?character=${character}`}>
                  Open combos for {data.slug}
                </Link>
              </p>
              <p>
                <Link className="underline underline-offset-4" href={`/frame-data?character=${character}`}>
                  Open frame data for {data.slug}
                </Link>
              </p>
              <p className="text-muted-foreground">
                Matchups: <span className="font-medium text-foreground">{matchups.length}</span>
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gameplan">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Gameplan snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>- Ưu tiên spacing + whiff punish trước khi commit chuỗi dài.</p>
              <p>- Dùng mix nhịp poke / stagger để giữ lượt an toàn.</p>
              <p>- Khi có punish rõ ràng, chuyển qua route damage ổn định.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="key-moves">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Key moves (first 12 rows)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {keyMoves.length ? (
                keyMoves.map((row) => (
                  <div key={row.id} className="rounded-md border p-2">
                    <p className="font-medium">{row.move}</p>
                    <p className="text-muted-foreground">{row.command || "-"}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No move data.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="combos">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top combos by damage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {topCombos.length ? (
                topCombos.map((combo) => (
                  <div key={combo.id} className="rounded-md border p-2">
                    <p className="font-medium">{combo.title}</p>
                    <p className="font-mono text-xs text-muted-foreground md:text-sm">{combo.notation}</p>
                    <p className="text-xs text-muted-foreground">Damage: {combo.damage}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No combo data.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matchups">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Related matchups</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground">
              {matchups.length ? (
                matchups.map((m) => <p key={m.slug}>• {m.title}</p>)
              ) : (
                <p>No matchup pages linked yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Practice notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground">
              {practice.length ? (
                practice.map((p) => <p key={p.slug}>• {p.title}</p>)
              ) : (
                <p>No character-specific drills linked yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  )
}
