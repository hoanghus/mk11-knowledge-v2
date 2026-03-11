"use client"

import * as React from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"

import type { FrameMove } from "@/lib/schemas"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

function num(v: number | undefined) {
  return typeof v === "number" ? v : null
}

function passesQuickFilter(row: FrameMove, quick: string) {
  const onBlock = num(row.onBlock)
  if (!quick || quick === "all") return true
  if (quick === "safe") return onBlock !== null && onBlock >= 0
  if (quick === "plus") return onBlock !== null && onBlock > 0
  if (quick === "punishable") return onBlock !== null && onBlock <= -8
  return true
}

export function FrameDataTableClient({
  rows,
  initialCharacter = "all",
}: {
  rows: FrameMove[]
  initialCharacter?: string
}) {
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "startup", desc: false }])
  const [query, setQuery] = React.useState("")
  const [character, setCharacter] = React.useState(initialCharacter)
  const [moveType, setMoveType] = React.useState("all")
  const [quickFilter, setQuickFilter] = React.useState("all")

  const characters = React.useMemo(
    () => ["all", ...Array.from(new Set(rows.map((r) => r.character))).sort()],
    [rows],
  )

  React.useEffect(() => {
    if (!characters.includes(character)) setCharacter("all")
  }, [characters, character])

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()

    return rows.filter((row) => {
      if (character !== "all" && row.character !== character) return false
      if (moveType !== "all" && row.type !== moveType) return false
      if (!passesQuickFilter(row, quickFilter)) return false

      if (!q) return true
      const hay = `${row.character} ${row.move} ${row.command} ${row.notes ?? ""}`.toLowerCase()
      return hay.includes(q)
    })
  }, [rows, query, character, moveType, quickFilter])

  const columns = React.useMemo<ColumnDef<FrameMove>[]>(
    () => [
      { accessorKey: "character", header: "Character" },
      { accessorKey: "move", header: "Move" },
      { accessorKey: "command", header: "Command" },
      { accessorKey: "type", header: "Type" },
      {
        accessorKey: "startup",
        header: "Startup",
        cell: ({ row }) => row.original.startup ?? "-",
      },
      {
        accessorKey: "onBlock",
        header: "On Block",
        cell: ({ row }) => (typeof row.original.onBlock === "number" ? row.original.onBlock : "-"),
      },
      {
        accessorKey: "onHit",
        header: "On Hit",
        cell: ({ row }) => (typeof row.original.onHit === "number" ? row.original.onHit : "-"),
      },
    ],
    [],
  )

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <section className="space-y-4">
      <div className="grid gap-3 md:grid-cols-4">
        <Input
          placeholder="Search move/command..."
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
        <Select value={moveType} onValueChange={(v) => setMoveType(v ?? "all")}>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">all</SelectItem>
            <SelectItem value="high">high</SelectItem>
            <SelectItem value="mid">mid</SelectItem>
            <SelectItem value="low">low</SelectItem>
            <SelectItem value="overhead">overhead</SelectItem>
            <SelectItem value="throw">throw</SelectItem>
            <SelectItem value="special">special</SelectItem>
          </SelectContent>
        </Select>
        <Select value={quickFilter} onValueChange={(v) => setQuickFilter(v ?? "all")}>
          <SelectTrigger>
            <SelectValue placeholder="Quick filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">all</SelectItem>
            <SelectItem value="safe">safe (on block at least 0)</SelectItem>
            <SelectItem value="plus">plus (on block above 0)</SelectItem>
            <SelectItem value="punishable">punishable (on block minus 8 or worse)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <Table className="min-w-[900px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="align-top">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="h-24 text-center" colSpan={columns.length}>
                  No rows.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <p className="text-sm text-muted-foreground">Showing {filtered.length} rows.</p>
    </section>
  )
}
