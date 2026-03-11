import Link from "next/link"

import { listLessons } from "@/lib/content"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function LearnPage() {
  const lessons = await listLessons()

  return (
    <section className="mx-auto w-full max-w-5xl space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Learn</h1>
        <p className="text-sm text-muted-foreground md:text-base">{lessons.length} lessons loaded from MDX content.</p>
      </div>
      <div className="grid gap-3">
        {lessons.map((lesson) => (
          <Card key={lesson.slug}>
            <CardHeader>
              <CardTitle className="text-lg">
                <Link className="hover:underline" href={`/learn/${lesson.slug}`}>
                  {lesson.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>{lesson.summary}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{lesson.category}</Badge>
                <Badge variant="secondary">{lesson.difficulty}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
