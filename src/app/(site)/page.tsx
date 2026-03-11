import Link from "next/link"

import { listCharacters, listMatchups, listLessons } from "@/lib/content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function HomePage() {
  const [lessons, characters, matchups] = await Promise.all([listLessons(), listCharacters(), listMatchups()])

  const featuredLessons = lessons.slice(0, 6)
  const featuredCharacters = characters.slice(0, 8)

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8">
      <div className="rounded-2xl border bg-card/50 p-5 md:p-8">
        <Badge variant="secondary">MK11 Knowledge Hub</Badge>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Learn MK11 smarter</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
          Một nơi học MK11 theo hướng content-first: lesson có hệ thống, character hubs rõ ràng, và tool pages để tra
          combo/frame-data nhanh.
        </p>

        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-5">
              <p className="text-2xl font-semibold">{lessons.length}</p>
              <p className="text-xs text-muted-foreground">Lessons</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5">
              <p className="text-2xl font-semibold">{characters.length}</p>
              <p className="text-xs text-muted-foreground">Characters</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5">
              <p className="text-2xl font-semibold">{matchups.length}</p>
              <p className="text-xs text-muted-foreground">Matchups</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button render={<Link href="/learn" />}>Start learning</Button>
          <Button render={<Link href="/characters" />} variant="outline">
            Explore characters
          </Button>
          <Button render={<Link href="/frame-data" />} variant="outline">
            Open frame data
          </Button>
          <Button render={<Link href="/combos" />} variant="outline">
            Open combos
          </Button>
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured lessons</h2>
          <Link className="text-sm text-muted-foreground underline underline-offset-4" href="/learn">
            View all
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {featuredLessons.map((lesson) => (
            <Card key={lesson.slug} className="transition-colors hover:bg-muted/30">
              <CardHeader>
                <CardTitle className="text-base leading-snug">
                  <Link className="hover:underline" href={`/learn/${lesson.slug}`}>
                    {lesson.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="line-clamp-3">{lesson.summary}</p>
                <div className="flex gap-2">
                  <Badge variant="outline">{lesson.category}</Badge>
                  <Badge variant="secondary">{lesson.difficulty}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Characters</h2>
          <Link className="text-sm text-muted-foreground underline underline-offset-4" href="/characters">
            View all
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {featuredCharacters.map((character) => (
            <Card key={character.slug} className="transition-colors hover:bg-muted/30">
              <CardHeader>
                <CardTitle className="text-base leading-snug">
                  <Link className="hover:underline" href={`/characters/${character.slug}`}>
                    {character.name}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-muted-foreground">
                <p className="line-clamp-3">{character.summary}</p>
                <Badge variant="outline">{character.difficulty}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </section>
  )
}
