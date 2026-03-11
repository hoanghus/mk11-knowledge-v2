import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"

const root = process.cwd()

async function walk(dir, ext) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map(async (e) => {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) return walk(p, ext)
      return p.endsWith(ext) ? [p] : []
    }),
  )
  return nested.flat()
}

function dupe(arr) {
  const m = new Map()
  for (const v of arr) m.set(v, (m.get(v) ?? 0) + 1)
  return [...m.entries()].filter(([, c]) => c > 1)
}

async function main() {
  const lessonFiles = await walk(path.join(root, "content/lessons"), ".mdx")
  const characterFiles = await walk(path.join(root, "content/characters"), ".mdx")

  const lessonSlugs = []
  for (const f of lessonFiles) {
    const fm = matter(await fs.readFile(f, "utf8")).data
    if (!fm.slug) throw new Error(`Missing lesson slug: ${f}`)
    lessonSlugs.push(String(fm.slug))
  }

  const charSlugs = []
  for (const f of characterFiles) {
    const fm = matter(await fs.readFile(f, "utf8")).data
    if (!fm.slug) throw new Error(`Missing character slug: ${f}`)
    charSlugs.push(String(fm.slug))
  }

  const comboRows = JSON.parse(await fs.readFile(path.join(root, "data/combos.json"), "utf8"))
  const frameRows = JSON.parse(await fs.readFile(path.join(root, "data/frame-data.json"), "utf8"))

  const missingComboChars = [...new Set(comboRows.map((r) => r.character))].filter((s) => !charSlugs.includes(s))
  const missingFrameChars = [...new Set(frameRows.map((r) => r.character))].filter((s) => !charSlugs.includes(s))

  const report = {
    lessonCount: lessonFiles.length,
    characterCount: characterFiles.length,
    comboCount: comboRows.length,
    frameRowCount: frameRows.length,
    duplicateLessonSlugs: dupe(lessonSlugs),
    duplicateCharacterSlugs: dupe(charSlugs),
    missingComboCharacters: missingComboChars,
    missingFrameCharacters: missingFrameChars,
  }

  await fs.writeFile(path.join(root, "migration/cleaned/qa-report.json"), JSON.stringify(report, null, 2))
  console.log(report)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
