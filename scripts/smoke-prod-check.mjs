const base = "https://mk11-knowledge-v2.vercel.app"

const routes = [
  "/",
  "/learn",
  "/learn/l0-movement-basics",
  "/characters",
  "/characters/scorpion",
  "/combos",
  "/frame-data",
  "/practice",
  "/glossary",
  "/search?q=scorpion",
]

const report = []
for (const route of routes) {
  const url = `${base}${route}`
  const started = Date.now()
  try {
    const res = await fetch(url)
    const ms = Date.now() - started
    report.push({ route, status: res.status, ok: res.ok, ms })
  } catch (error) {
    report.push({ route, status: 0, ok: false, ms: Date.now() - started, error: String(error) })
  }
}

console.log(JSON.stringify({ base, checkedAt: new Date().toISOString(), report }, null, 2))
