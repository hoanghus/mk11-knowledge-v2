"use client"

import * as React from "react"

import type { Combo } from "@/lib/schemas"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function CombosTableClient({ rows }: { rows: Combo[] }) {
  const [query, setQuery] = React.useState("")
  const [character, setCharacter] = React.useState("all")
  const [bars, setBars] = React.useState("all")
  const [position, setPosition] = React.useState("all")
  const [difficulty, setDifficulty] = React.useState("all")

  const characters = React.useMemo(
    () => ["all", ...Array.from(new Set(rows.map((r) => r.character))).sort()],
    [rows],
  )

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()

    return rows
      .filter((row) => {
        if (character !== "all" && row.character !== character) return false
        if (bars !== "all" && String(row.bars) !== bars) return false
        if (position !== "all" && row.position !== position) return false
        if (difficulty !== "all" && row.difficulty !== difficulty) return false
        if (!q) return true

        const hay = `${row.character} ${row.title} ${row.notation} ${row.starter ?? ""}`.toLowerCase()
        return hay.includes(q)
      })
      .sort((a, b) => b.damage - a.damage)
  }, [rows, query, character, bars, position, difficulty])

  return (
    <section className="space-y-4">
      <div className="grid gap-3 md:grid-cols-5">
        <Input
          placeholder="Search combo/starter..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select value={character} onValueChange={(v) => setCharacter(v ?? "all")}>
          <SelectTrigger>
            <SelectValue placeholder="Character" />
          </SelectTrigger>
          <SelectContent>
            {characters.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={bars} onValueChange={(v) => setBars(v ?? "all")}>
          <SelectTrigger>
            <SelectValue placeholder="Bars" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">all</SelectItem>
            <SelectItem value="0">0</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
          </SelectContent>
        </Select>
        <Select value={position} onValueChange={(v) => setPosition(v ?? "all")}>
          <SelectTrigger>
            <SelectValue placeholder="Position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">all</SelectItem>
            <SelectItem value="any">any</SelectItem>
            <SelectItem value="midscreen">midscreen</SelectItem>
            <SelectItem value="corner">corner</SelectItem>
          </SelectContent>
        </Select>
        <Select value={difficulty} onValueChange={(v) => setDifficulty(v ?? "all")}>
          <SelectTrigger>
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">all</SelectItem>
            <SelectItem value="easy">easy</SelectItem>
            <SelectItem value="medium">medium</SelectItem>
            <SelectItem value="hard">hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <Table className="min-w-[880px]">
          <TableHeader>
            <TableRow>
              <TableHead>Character</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Notation</TableHead>
              <TableHead>Bars</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Damage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length ? (
              filtered.map((row) => (
                <TableRow key={row.id} className="align-top">
                  <TableCell className="whitespace-nowrap font-medium">{row.character}</TableCell>
                  <TableCell className="max-w-[220px]">{row.title}</TableCell>
                  <TableCell className="font-mono text-xs md:text-sm">{row.notation}</TableCell>
                  <TableCell>{row.bars}</TableCell>
                  <TableCell>{row.position}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{row.difficulty}</Badge>
                  </TableCell>
                  <TableCell>{row.damage}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="h-24 text-center" colSpan={7}>
                  No combos found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-muted-foreground">Showing {filtered.length} combos (sorted by damage desc).</p>
    </section>
  )
}
