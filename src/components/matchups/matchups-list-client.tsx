"use client"

import * as React from "react"
import Link from "next/link"

import type { Matchup } from "@/lib/schemas"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function MatchupsListClient({ rows }: { rows: Matchup[] }) {
  const [q, setQ] = React.useState("")
  const [charA, setCharA] = React.useState("all")
  const [charB, setCharB] = React.useState("all")

  const characters = React.useMemo(() => {
    const set = new Set<string>()
    rows.forEach((r) => {
      set.add(r.characterA)
      set.add(r.characterB)
    })
    return ["all", ...Array.from(set).sort()]
  }, [rows])

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase()
    return rows.filter((row) => {
      if (charA !== "all" && row.characterA !== charA && row.characterB !== charA) return false
      if (charB !== "all" && row.characterA !== charB && row.characterB !== charB) return false
      if (!query) return true
      return `${row.title} ${row.summary} ${row.characterA} ${row.characterB}`.toLowerCase().includes(query)
    })
  }, [rows, q, charA, charB])

  return (
    <section className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        <Input placeholder="Search matchup..." value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={charA} onValueChange={(v) => setCharA(v ?? "all")}>
          <SelectTrigger>
            <SelectValue placeholder="Character filter A" />
          </SelectTrigger>
          <SelectContent>
            {characters.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={charB} onValueChange={(v) => setCharB(v ?? "all")}>
          <SelectTrigger>
            <SelectValue placeholder="Character filter B" />
          </SelectTrigger>
          <SelectContent>
            {characters.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">{filtered.length} matchups</p>

      <div className="grid gap-3">
        {filtered.map((matchup) => (
          <Card key={matchup.slug}>
            <CardHeader>
              <CardTitle>
                <Link className="hover:underline" href={`/matchups/${matchup.slug}`}>
                  {matchup.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{matchup.summary}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
