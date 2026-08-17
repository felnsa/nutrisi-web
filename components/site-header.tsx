import { Leaf } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Leaf className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="text-base font-bold tracking-tight">NutriUII</p>
            <p className="text-xs text-muted-foreground">
              Sistem Rekomendasi Nutrisi
            </p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
