import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LandingHero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Sistem Pendukung Keputusan
          </span>
          <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            Sistem Rekomendasi Makanan Berdasarkan Kebutuhan Nutrisi Harian
            Mahasiswa UII
          </h1>
          <p className="max-w-prose text-pretty leading-relaxed text-muted-foreground">
            Hitung kebutuhan kalori dan makronutrien harianmu dengan rumus
            Mifflin-St Jeor, lalu dapatkan rekomendasi menu makanan di sekitar
            kampus yang paling sesuai dengan kebutuhan gizimu beserta estimasi
            budget.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" onClick={onStart} className="gap-2">
              Mulai Rekomendasi
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <dl className="mt-2 flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: "Menu Makanan", value: "20+" },
              { label: "Tempat Makan", value: "10" },
              { label: "Metode", value: "Mifflin-St Jeor" },
            ].map((s) => (
              <div key={s.label}>
                <dt className="text-xs text-muted-foreground">{s.label}</dt>
                <dd className="text-lg font-semibold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <Image
              src="/nutrisi-hero.png"
              alt="Ilustrasi makanan sehat dan komposisi nutrisi untuk mahasiswa"
              width={640}
              height={640}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
