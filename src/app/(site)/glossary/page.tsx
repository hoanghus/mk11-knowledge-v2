import { listGlossaryTerms } from "@/lib/content"
import { PageTemplate } from "@/components/shared/page-template"

export default async function GlossaryPage() {
  const terms = await listGlossaryTerms()

  return (
    <PageTemplate
      title="Glossary"
      description={`${terms.length} glossary terms loaded from JSON dataset.`}
      note="Next: alphabet nav + term accordion list."
    />
  )
}
