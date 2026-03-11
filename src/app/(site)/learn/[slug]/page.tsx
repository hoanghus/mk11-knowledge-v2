import { PageTemplate } from "@/components/shared/page-template"

export default async function LessonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return (
    <PageTemplate
      title={`Lesson: ${slug}`}
      description="MDX lesson detail page with TOC, tags, and related links."
    />
  )
}
