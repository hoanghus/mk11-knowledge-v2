import { listLessons } from "@/lib/content"
import { LessonsListClient } from "@/components/lessons/lessons-list-client"

export default async function LearnPage() {
  const lessons = await listLessons()

  return (
    <section className="mx-auto w-full max-w-5xl space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Learn</h1>
        <p className="text-sm text-muted-foreground md:text-base">Lesson index with search + category + difficulty filters.</p>
      </div>

      <LessonsListClient rows={lessons} />
    </section>
  )
}
