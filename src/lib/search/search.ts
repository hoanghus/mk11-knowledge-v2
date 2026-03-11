import Fuse from "fuse.js"

import { buildSearchIndex, type SearchDoc } from "./build-search-index"

export async function searchDocs(query: string): Promise<SearchDoc[]> {
  const docs = await buildSearchIndex()

  if (!query.trim()) return docs

  const fuse = new Fuse(docs, {
    keys: ["title", "summary", "tags"],
    threshold: 0.35,
    includeScore: true,
  })

  return fuse.search(query).map((result) => result.item)
}
