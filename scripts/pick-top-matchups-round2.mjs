import fs from "node:fs/promises"
import path from "node:path"

const dir = path.resolve("../mk11-giao-an/data/characters")

function slugify(input) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function pairKey(a, b) {
  return [a, b].sort().join("__")
}

async function main() {
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".json"))
  const map = new Map()

  for (const file of files) {
    const raw = JSON.parse(await fs.readFile(path.join(dir, file), "utf8"))
    const a = slugify(raw.slug)
    const frequent = raw?.overview?.stats?.versus?.frequent ?? []

    for (const row of frequent) {
      const b = slugify(row?.character?.name ?? "")
      if (!b || a === b) continue
      const key = pairKey(a, b)
      const prev = map.get(key) ?? { pair: [a, b].sort(), games: 0, seen: 0 }
      prev.games += Number(row.gamesPlayed ?? 0)
      prev.seen += 1
      map.set(key, prev)
    }
  }

  const top = [...map.values()]
    .sort((x, y) => y.games - x.games || y.seen - x.seen)
    .slice(0, 20)
    .map((item, i) => ({
      rank: i + 1,
      slug: `${item.pair[0]}-vs-${item.pair[1]}`,
      pair: item.pair,
      estimatedGames: item.games,
      sourceHits: item.seen,
    }))

  console.log(JSON.stringify(top, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
