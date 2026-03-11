import Link from "next/link"

import { searchDocs } from "@/lib/search/search"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type SearchPageProps = {
  searchParams: Promise<{ q?: string; type?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "", type = "all" } = await searchParams
  const docs = await searchDocs(q)
  const results = type === "all" ? docs : docs.filter((doc) => doc.type === type)

  return (
    <section className="mx-auto w-full max-w-5xl space-y-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Search</h1>
        <p className="text-muted-foreground">Unified search across lessons, characters, matchups, glossary, and practice.</p>
      </div>

      <form className="flex flex-col gap-3 md:flex-row" method="get" action="/search">
        <Input name="q" placeholder="Type keyword..." defaultValue={q} />
        <Input name="type" placeholder="all | lesson | character | matchup | glossary | practice" defaultValue={type} />
        <Button type="submit">Search</Button>
      </form>

      <p className="text-sm text-muted-foreground">{results.length} results</p>

      <div className="grid gap-3">
        {results.map((item) => (
          <Card key={`${item.type}-${item.href}`}>
            <CardHeader>
              <CardTitle className="text-lg">
                <Link href={item.href} className="hover:underline">
                  {item.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>{item.summary}</p>
              <Badge variant="outline">{item.type}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
