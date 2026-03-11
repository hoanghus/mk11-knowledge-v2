"use client"

import * as React from "react"
import Link from "next/link"

import type { Lesson } from "@/lib/schemas"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LessonsListClient({ rows }: { rows: Lesson[] }) {
  const [q, setQ] = React.useState("")
  const [category, setCategory] = React.useState("all")
  const [difficulty, setDifficulty] = React.useState("all")

  const categories = React.useMemo(
    () => ["all", ...Array.from(new Set(rows.map((r) => r.category))).sort()],
    [rows],
  )

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase()

    return rows.filter((row) => {
      if (category !== "all" && row.category !== category) return false
      if (difficulty !== "all" && row.difficulty !== difficulty) return false
      if (!query) return true
      return `${row.title} ${row.summary} ${row.tags.join(" ")}`.toLowerCase().includes(query)
    })
  }, [rows, q, category, difficulty])

  return (
    <section className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        <Input placeholder="Search lesson..." value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={category} onValueChange={(v) => setCategory(v ?? "all")}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={difficulty} onValueChange={(v) => setDifficulty(v ?? "all")}>
          <SelectTrigger>
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">all</SelectItem>
            <SelectItem value="beginner">beginner</SelectItem>
            <SelectItem value="intermediate">intermediate</SelectItem>
            <SelectItem value="advanced">advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">{filtered.length} lessons</p>

      <div className="grid gap-3">
        {filtered.map((lesson) => (
          <Card key={lesson.slug} className="transition-colors hover:bg-muted/30">
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
