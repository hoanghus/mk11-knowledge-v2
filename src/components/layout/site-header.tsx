import { siteConfig } from "@/config/site"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center gap-3 px-4 md:px-6">
        <SidebarTrigger />
        <div>
          <p className="text-sm font-semibold">{siteConfig.name}</p>
          <p className="text-xs text-muted-foreground">Knowledge-first architecture</p>
        </div>
      </div>
    </header>
  )
}
