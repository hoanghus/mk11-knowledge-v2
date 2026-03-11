import Link from "next/link"

import { listCharacters } from "@/lib/content"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function CharactersPage() {
  const characters = await listCharacters()

  return (
    <section className="mx-auto w-full max-w-6xl space-y-5">
      <div className="rounded-xl border bg-card/40 p-4 md:p-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Characters</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Character hubs để học gameplan, key moves, combos, matchups và drills.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {characters.map((character) => (
          <Card key={character.slug} className="transition-colors hover:bg-muted/30">
            <CardHeader>
              <CardTitle className="text-lg leading-snug">
                <Link className="hover:underline" href={`/characters/${character.slug}`}>
                  {character.name}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p className="line-clamp-3">{character.summary}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{character.difficulty}</Badge>
                {character.archetypes.slice(0, 2).map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
