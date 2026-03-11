import { siteConfig } from "@/config/site"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
      <div className="flex h-14 items-center gap-3 px-4">
        <SidebarTrigger />
        <div>
          <p className="text-sm font-semibold">{siteConfig.name}</p>
          <p className="text-xs text-muted-foreground">Knowledge-first architecture</p>
        </div>
      </div>
    </header>
  )
}
