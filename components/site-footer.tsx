import { Leaf } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-border bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-10 text-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Leaf className="h-5 w-5" />
        </span>
        <p className="max-w-xl text-pretty text-sm font-medium">
          Sistem Rekomendasi Makanan Berdasarkan Nutrisi Harian Mahasiswa UII
        </p>
        <p className="text-sm text-muted-foreground">
          Prototype Penelitian Sistem Pendukung Keputusan
        </p>
        <p className="text-sm font-semibold text-primary">
          Universitas Islam Indonesia
        </p>
      </div>
    </footer>
  )
}
