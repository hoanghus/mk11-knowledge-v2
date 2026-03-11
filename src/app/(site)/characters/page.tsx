import Link from "next/link"

import { listCharacters } from "@/lib/content"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function CharactersPage() {
  const characters = await listCharacters()

  return (
    <section className="mx-auto w-full max-w-5xl space-y-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Characters</h1>
        <p className="text-muted-foreground">{characters.length} characters loaded from MDX content.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {characters.map((character) => (
          <Card key={character.slug}>
            <CardHeader>
              <CardTitle>
                <Link className="hover:underline" href={`/characters/${character.slug}`}>
                  {character.name}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{character.summary}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
