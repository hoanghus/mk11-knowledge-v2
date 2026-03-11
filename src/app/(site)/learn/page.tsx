import { listLessons } from "@/lib/content"
import { LessonsListClient } from "@/components/lessons/lessons-list-client"

export default async function LearnPage() {
  const lessons = await listLessons()

  return (
    <section className="mx-auto w-full max-w-5xl space-y-5">
      <div className="rounded-xl border bg-card/40 p-4 md:p-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Learn</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Lesson index theo category + difficulty, ưu tiên tra nhanh và học theo flow rõ ràng.
        </p>
      </div>

      <LessonsListClient rows={lessons} />
    </section>
  )
}
