import { notFound } from "next/navigation"

import { getLessonBySlug } from "@/lib/content"
import { Badge } from "@/components/ui/badge"

export default async function LessonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const lesson = await getLessonBySlug(slug)

  if (!lesson) notFound()

  return (
    <section className="mx-auto w-full max-w-4xl space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>
        <p className="text-muted-foreground">{lesson.summary}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{lesson.category}</Badge>
          <Badge variant="secondary">{lesson.difficulty}</Badge>
          {lesson.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">MDX render block sẽ nối ở phase UI/content migration.</p>
    </section>
  )
}
