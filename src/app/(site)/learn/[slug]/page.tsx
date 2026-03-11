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
    <section className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-[1fr_280px]">
      <article className="space-y-4">
        <div className="rounded-xl border bg-card/40 p-4 md:p-6">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{lesson.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">{lesson.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="outline">{lesson.category}</Badge>
            <Badge variant="secondary">{lesson.difficulty}</Badge>
            <Badge variant="outline">~{lesson.readingMinutes} min read</Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Lesson content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none text-sm leading-7 md:text-base">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
                {lesson.content}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Related lessons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
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
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Table of contents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            {lesson.headings.length ? (
              lesson.headings.map((item) => (
                <p key={`${item.depth}-${item.slug}`} className={item.depth === 3 ? "pl-3 text-muted-foreground" : ""}>
                  <a className="hover:underline" href={`#${item.slug}`}>
                    {item.text}
                  </a>
                </p>
              ))
            ) : (
              <p className="text-muted-foreground">No headings.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Practice checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            <p>• Hoàn thành ít nhất 2 drill chính của lesson.</p>
            <p>• Ghi 3 lỗi lặp lại khi vào set thử.</p>
            <p>• Mục tiêu buổi sau: 1 điểm cụ thể để cải thiện.</p>
          </CardContent>
        </Card>
      </aside>
    </section>
  )
}
