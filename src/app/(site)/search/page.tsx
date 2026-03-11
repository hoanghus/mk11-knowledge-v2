import Link from "next/link"

import { searchDocs } from "@/lib/search/search"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams
  const results = await searchDocs(q)

  return (
    <section className="mx-auto w-full max-w-5xl space-y-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Search</h1>
        <p className="text-muted-foreground">
          {q ? `Results for "${q}"` : "Pass ?q=keyword to test unified search."} ({results.length})
        </p>
      </div>

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
