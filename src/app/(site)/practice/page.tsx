import { listPracticeDrills } from "@/lib/content"
import { PageTemplate } from "@/components/shared/page-template"

export default async function PracticePage() {
  const drills = await listPracticeDrills()

  return (
    <PageTemplate
      title="Practice"
      description={`${drills.length} practice drills loaded from MDX frontmatter.`}
      note="Next: group drills by level and attach related lessons/characters."
    />
  )
}
