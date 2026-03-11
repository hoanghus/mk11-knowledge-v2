import Link from "next/link"

import { listCharacters, listLessons } from "@/lib/content"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function HomePage() {
  const [lessons, characters] = await Promise.all([listLessons(), listCharacters()])

  const featuredLessons = lessons.slice(0, 6)
  const featuredCharacters = characters.slice(0, 8)

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6">
      <div className="rounded-xl border p-5 md:p-7">
        <h1 className="text-3xl font-bold tracking-tight">Learn MK11 smarter</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          Knowledge-first MK11 hub: lessons, character notes, combos, frame data, and practical lookup tools.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button render={<Link href="/learn" />}>Start learning</Button>
          <Button render={<Link href="/frame-data" />} variant="outline">
            Open frame data
          </Button>
          <Button render={<Link href="/combos" />} variant="outline">
            Open combos
          </Button>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Featured lessons</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {featuredLessons.map((lesson) => (
            <Card key={lesson.slug}>
              <CardHeader>
                <CardTitle className="text-base">
                  <Link className="hover:underline" href={`/learn/${lesson.slug}`}>
                    {lesson.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{lesson.summary}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Characters</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {featuredCharacters.map((character) => (
            <Card key={character.slug}>
              <CardHeader>
                <CardTitle className="text-base">
                  <Link className="hover:underline" href={`/characters/${character.slug}`}>
                    {character.name}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">{character.summary}</CardContent>
            </Card>
          ))}
        </div>
      </section>
    </section>
  )
}
