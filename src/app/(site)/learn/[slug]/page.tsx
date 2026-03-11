import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

import { getLessonDocumentBySlug, listLessons } from "@/lib/content"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function LessonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [lesson, lessons] = await Promise.all([getLessonDocumentBySlug(slug), listLessons()])

  if (!lesson) notFound()

  const related = lessons
    .filter((item) => item.slug !== lesson.slug)
    .filter(
      (item) => item.category === lesson.category || item.tags.some((tag) => lesson.tags.includes(tag)),
    )
    .slice(0, 4)

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8">
      <article className="space-y-6">
        <div className="rounded-2xl border bg-card/60 p-5 shadow-sm md:p-7">
          <h1 className="text-2xl font-semibold tracking-tight md:text-4xl">{lesson.title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">{lesson.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline">{lesson.category}</Badge>
            <Badge variant="secondary">{lesson.difficulty}</Badge>
            <Badge variant="outline">~{lesson.readingMinutes} min read</Badge>
          </div>
        </div>

        <Card className="border-border/80 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Lesson content</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="prose prose-invert max-w-none text-sm leading-7 md:text-base">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
                {lesson.content}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Related lessons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-0 text-sm">
            {related.length ? (
              related.map((item) => (
                <p key={item.slug}>
                  <Link className="underline underline-offset-4" href={`/learn/${item.slug}`}>
                    {item.title}
                  </Link>
                </p>
              ))
            ) : (
              <p className="text-muted-foreground">No related lessons.</p>
            )}
          </CardContent>
        </Card>
      </article>

      <aside className="space-y-4 lg:sticky lg:top-20 lg:h-fit">
        <Card className="border-border/80 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Table of contents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-0 text-sm">
            {lesson.headings.length ? (
              lesson.headings.map((item) => (
                <p key={`${item.depth}-${item.slug}`} className={item.depth === 3 ? "pl-3 text-muted-foreground" : ""}>
                  <a className="inline-block leading-6 hover:underline" href={`#${item.slug}`}>
                    {item.text}
                  </a>
                </p>
              ))
            ) : (
              <p className="text-muted-foreground">No headings.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Practice checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-0 text-sm text-muted-foreground">
            <p>• Hoàn thành ít nhất 2 drill chính của lesson.</p>
            <p>• Ghi 3 lỗi lặp lại khi vào set thử.</p>
            <p>• Mục tiêu buổi sau: 1 điểm cụ thể để cải thiện.</p>
          </CardContent>
        </Card>
      </aside>
    </section>
  )
}
