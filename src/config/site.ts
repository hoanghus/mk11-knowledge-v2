import { BookOpen, Dumbbell, Gauge, Swords, UserRound, Search, House, Sparkles, LibraryBig } from "lucide-react"

export const siteConfig = {
  name: "MK11 Learning Hub",
  description: "Content-first MK11 knowledge website.",
}

export const navItems = [
  { title: "Home", href: "/", icon: House },
  { title: "Learn", href: "/learn", icon: BookOpen },
  { title: "Characters", href: "/characters", icon: UserRound },
  { title: "Matchups", href: "/matchups", icon: Swords },
  { title: "Combos", href: "/combos", icon: Sparkles },
  { title: "Frame Data", href: "/frame-data", icon: Gauge },
  { title: "Practice", href: "/practice", icon: Dumbbell },
  { title: "Glossary", href: "/glossary", icon: LibraryBig },
  { title: "Search", href: "/search", icon: Search },
]
