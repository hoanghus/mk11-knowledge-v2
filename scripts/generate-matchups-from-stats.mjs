import fs from "node:fs/promises"
import path from "node:path"

const oldCharsDir = path.resolve("../mk11-giao-an/data/characters")
const outDir = path.resolve("content/matchups")

function slugify(input) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function yamlQuote(v) {
  return JSON.stringify(String(v))
}

function pairKey(a, b) {
  return [a, b].sort().join("__")
}

async function main() {
  await fs.mkdir(outDir, { recursive: true })
  const files = (await fs.readdir(oldCharsDir)).filter((f) => f.endsWith(".json"))

  const generated = new Map()

  for (const file of files) {
    const raw = JSON.parse(await fs.readFile(path.join(oldCharsDir, file), "utf8"))
    const aSlug = slugify(raw.slug)
    const aName = raw.name
    const frequent = raw?.overview?.stats?.versus?.frequent ?? []

    for (const row of frequent.slice(0, 8)) {
      const bName = row?.character?.name
      if (!bName) continue
      const bSlug = slugify(bName)
      if (aSlug === bSlug) continue

      const key = pairKey(aSlug, bSlug)
      if (generated.has(key)) continue

      const [characterA, characterB] = [aSlug, bSlug].sort()
      const title = `${characterA.replace(/-/g, " ")} vs ${characterB.replace(/-/g, " ")}`
      const slug = `${characterA}-vs-${characterB}`

      const gamesPlayed = Number(row.gamesPlayed ?? 0)
      const winratePct = Math.round(Number(row.winrate ?? 0) * 100)
      const summary = `${aName} vs ${bName} matchup notes với baseline từ dataset thi đấu (sample ${gamesPlayed} trận).`

      const content = `---\nslug: ${slug}\ntitle: ${yamlQuote(title)}\ncharacterA: ${characterA}\ncharacterB: ${characterB}\nsummary: ${yamlQuote(summary)}\ntags:\n  - matchup\n  - neutral\n  - punish\n  - stats-derived\npublished: true\n---\n\n# ${title}
\n## Overview
\n- Baseline sample: **${gamesPlayed}** trận ghi nhận.
- Reference winrate snapshot (perspective ${aName}): **${winratePct}%**.
- Đây là notes khởi đầu để học matchup theo hướng thực chiến, cần tự cập nhật theo patch/meta mới.
\n## Key Threats
\n- Xác định 2-3 button/chuỗi mở lượt mạnh nhất của mỗi bên.
- Ưu tiên nhận diện tình huống khiến bạn mất turn miễn phí.
- Track thói quen jump, dash check, stagger ở khoảng mid-range.
\n## Neutral Notes
\n- Giữ spacing để ép đối thủ whiff thay vì lao vào commit sớm.
- Test phản ứng anti-air trước khi dùng jump-ins liên tục.
- Khi chưa đọc được tempo đối thủ, ưu tiên option an toàn và reset vị trí.
\n## Punish Notes
\n- Lập danh sách move âm nặng cần punish ổn định trong training mode.
- Tách punish route theo mức độ: meterless ổn định -> route damage cao.
- Nếu chưa chắc timing, ưu tiên punish chắc chắn thay vì greedy.
\n## Drill Suggestions
\n1. Training 10 phút: lặp lại 3 tình huống vào lượt thường gặp.
2. Match set ngắn FT5: ghi lại 3 lỗi lặp nhiều nhất.
3. Sau set: cập nhật lại checklist punish + anti-pressure.
`

      await fs.writeFile(path.join(outDir, `${slug}.mdx`), content)
      generated.set(key, { slug, characterA, characterB })
    }
  }

  console.log(`Generated matchup pages: ${generated.size}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
