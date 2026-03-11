import fs from "node:fs/promises"
import path from "node:path"

const oldRoot = path.resolve("../mk11-giao-an")
const newRoot = process.cwd()

const oldLessonsDir = path.join(oldRoot, "apps/web/content/lessons")
const oldCharactersDir = path.join(oldRoot, "data/characters")

const newLessonsDir = path.join(newRoot, "content/lessons")
const newCharactersDir = path.join(newRoot, "content/characters")
const newDataDir = path.join(newRoot, "data")

const lessonModuleMap = {
  Fundamentals: "fundamentals",
  Neutral: "neutral",
  Defense: "defense",
  Punish: "punish",
  Matchup: "matchup-theory",
  Mindset: "fundamentals",
}

function levelToDifficulty(level) {
  if (level <= 2) return "beginner"
  if (level <= 5) return "intermediate"
  return "advanced"
}

function safeNumber(input, fallback = 0) {
  if (typeof input === "number") return input
  if (typeof input === "string") {
    const m = input.match(/-?\d+(\.\d+)?/)
    if (m) return Number(m[0])
  }
  return fallback
}

function toArray(v) {
  return Array.isArray(v) ? v : []
}

function parseFrontmatterBlock(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!match) return {}
  const block = match[1]
  const data = {}
  for (const line of block.split("\n")) {
    const idx = line.indexOf(":")
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim()
    data[key] = value
  }
  return data
}

function y(value) {
  return JSON.stringify(String(value).replace(/\s+/g, " ").trim())
}

function buildLessonFrontmatter({ slug, title, summary, category, difficulty, tags, order }) {
  return `---\nslug: ${slug}\ntitle: ${y(title)}\nsummary: ${y(summary)}\ncategory: ${category}\ndifficulty: ${difficulty}\ntags:\n${tags
    .map((tag) => `  - ${tag}`)
    .join("\n")}\npublished: true\norder: ${order}\n---\n`
}

function cleanSummary(input) {
  return input.replace(/\s+/g, " ").trim().replace(/[:;,.!?-]+$/, "")
}

async function migrateLessons() {
  const files = (await fs.readdir(oldLessonsDir)).filter((f) => f.endsWith(".mdx") && f !== "index.mdx")
  const maps = []

  for (const file of files) {
    const oldPath = path.join(oldLessonsDir, file)
    const raw = await fs.readFile(oldPath, "utf8")
    const fm = parseFrontmatterBlock(raw)

    const slugMatch = raw.match(/\*\*Slug:\*\*\s*`([^`]+)`/)
    const levelMatch = raw.match(/\*\*Level:\*\*\s*(\d+)/)
    const moduleMatch = raw.match(/\*\*Module:\*\*\s*([^\n]+)/)
    const objectiveMatch = raw.match(/## Objective\n\n([\s\S]*?)(\n## |$)/)

    const slug = slugMatch?.[1]?.trim() ?? file.replace(/\.mdx$/, "")
    const level = Number(levelMatch?.[1] ?? 0)
    const moduleRaw = moduleMatch?.[1]?.trim() ?? "Fundamentals"
    const category = lessonModuleMap[moduleRaw] ?? "fundamentals"
    const difficulty = levelToDifficulty(level)
    const title = fm.title ?? slug
    const objective = objectiveMatch?.[1]?.trim() ?? fm.description ?? ""
    const summary = cleanSummary(objective || `Lesson ${title}`)
    const order = level * 100 + Number(file.match(/^l(\d+)-/)?.[1] ?? 0)
    const tags = [...new Set([category, difficulty, moduleRaw.toLowerCase().replace(/\s+/g, "-")])]

    const withoutOldFrontmatter = raw.replace(/^---\n[\s\S]*?\n---\n?/, "")

    const nextContent = `${buildLessonFrontmatter({
      slug,
      title,
      summary,
      category,
      difficulty,
      tags,
      order,
    })}\n${withoutOldFrontmatter.trim()}\n`

    const outDir = path.join(newLessonsDir, category)
    await fs.mkdir(outDir, { recursive: true })
    const outPath = path.join(outDir, `${slug}.mdx`)
    await fs.writeFile(outPath, nextContent)

    maps.push({ from: path.relative(newRoot, oldPath), to: path.relative(newRoot, outPath), slug, category, level })
  }

  await fs.writeFile(path.join(newRoot, "migration/maps/lessons-map.json"), JSON.stringify(maps, null, 2))
  return maps.length
}

async function migrateCharactersAndData() {
  const files = (await fs.readdir(oldCharactersDir)).filter((f) => f.endsWith(".json"))

  const charactersIndex = []
  const combos = []
  const frameMoves = []

  for (const file of files) {
    const oldPath = path.join(oldCharactersDir, file)
    const raw = JSON.parse(await fs.readFile(oldPath, "utf8"))

    const slug = raw.slug
    const name = raw.name
    const summary = raw.overview?.descriptionText?.split(".")[0]?.trim() || `${name} MK11 character guide.`
    const guideLinks = toArray(raw.guides)
      .slice(0, 5)
      .map((g) => ({ title: g.title, url: g.mediaLink || g.externalUrl }))
      .filter((g) => !!g.url)

    const strengths = toArray(raw.overview?.attributes)
      .sort((a, b) => safeNumber(b.value) - safeNumber(a.value))
      .slice(0, 3)
      .map((a) => `${a.name} ${a.value}/10`)

    const weaknesses = ["Cần matchup knowledge", "Cần spacing và timing ổn định"]

    const charMdx = `---\nslug: ${slug}\ntitle: ${y(name)}\nname: ${y(name)}\nsummary: ${y(summary)}\ndifficulty: medium\narchetypes:\n  - fundamentals\nstrengths:\n${strengths.map((s) => `  - ${y(s)}`).join("\n")}\nweaknesses:\n${weaknesses.map((w) => `  - ${y(w)}`).join("\n")}\ntags:\n  - mk11\n  - ${slug}\npublished: true\n---\n\n# ${name}\n\n${raw.overview?.bioText ? raw.overview.bioText.trim() : "Character notes đang được migrate."}\n\n## Key Notes\n\n${raw.overview?.infoText ? raw.overview.infoText.trim() : ""}\n\n${guideLinks.length ? `## Guide Links\n\n${guideLinks.map((g) => `- [${g.title}](${g.url})`).join("\n")}\n` : ""}`

    await fs.writeFile(path.join(newCharactersDir, `${slug}.mdx`), charMdx)

    charactersIndex.push({
      slug,
      name,
      difficulty: "medium",
      archetypes: ["fundamentals"],
      summary,
      strengths,
      weaknesses,
      tags: ["mk11", slug],
      published: true,
    })

    for (const c of toArray(raw.combos)) {
      combos.push({
        id: `${slug}-${c.id}`,
        character: slug,
        title: c.name || `${name} combo`,
        notation: c.notation || "",
        starter: c.notation?.split(",")?.[0]?.trim() || undefined,
        damage: safeNumber(c.damage, 0),
        bars: 0,
        position: "any",
        difficulty: "medium",
        tags: toArray(c.tags).map((t) => String(t).toLowerCase()),
        notes: c.description || undefined,
      })
    }

    for (const m of [...toArray(raw.basicMoves), ...toArray(raw.moveList)]) {
      frameMoves.push({
        id: `${slug}-${m.id}`,
        character: slug,
        move: m.name || "Unknown",
        command: m.notation || "",
        type: ["high", "mid", "low", "overhead", "throw", "special"].includes(String(m.type).toLowerCase())
          ? String(m.type).toLowerCase()
          : undefined,
        startup: undefined,
        active: undefined,
        recovery: undefined,
        onBlock: undefined,
        onHit: undefined,
        notes: m.description || undefined,
        tags: toArray(m.tags).map((t) => String(t).toLowerCase()),
      })
    }
  }

  await fs.writeFile(path.join(newDataDir, "characters.json"), JSON.stringify(charactersIndex, null, 2))
  await fs.writeFile(path.join(newDataDir, "combos.json"), JSON.stringify(combos, null, 2))
  await fs.writeFile(path.join(newDataDir, "frame-data.json"), JSON.stringify(frameMoves, null, 2))

  return { characters: charactersIndex.length, combos: combos.length, frameMoves: frameMoves.length }
}

async function copyRawReferences() {
  const sourceRoster = path.join(oldRoot, "data/raw/dashfight_mk11_base_roster.json")
  const sourceFull = path.join(oldRoot, "data/raw/dashfight_mk11_full.json")
  const targetRawDir = path.join(newRoot, "migration/raw")

  await fs.copyFile(sourceRoster, path.join(targetRawDir, "dashfight_mk11_base_roster.json"))
  await fs.copyFile(sourceFull, path.join(targetRawDir, "dashfight_mk11_full.json"))
}

async function main() {
  await fs.mkdir(path.join(newRoot, "migration/raw"), { recursive: true })
  await fs.mkdir(path.join(newRoot, "migration/cleaned"), { recursive: true })
  await fs.mkdir(path.join(newRoot, "migration/maps"), { recursive: true })

  const lessonCount = await migrateLessons()
  const dataStats = await migrateCharactersAndData()
  await copyRawReferences()

  const summary = {
    migratedAt: new Date().toISOString(),
    lessonCount,
    ...dataStats,
  }

  await fs.writeFile(path.join(newRoot, "migration/cleaned/summary.json"), JSON.stringify(summary, null, 2))
  console.log("Migration done:", summary)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
