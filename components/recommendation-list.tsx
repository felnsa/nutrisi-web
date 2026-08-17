import { MapPin, Star, Tag, Navigation } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  formatRupiah,
  levelHarga,
  type Kecocokan,
  type Rekomendasi,
} from "@/lib/nutrition"

const hargaBadge: Record<
  ReturnType<typeof levelHarga>,
  string
> = {
  Murah:
    "border-transparent bg-primary/15 text-primary",
  Sedang:
    "border-transparent bg-chart-3/20 text-foreground",
  Premium:
    "border-transparent bg-chart-4/20 text-foreground",
}

const cocokBadge: Record<Kecocokan, string> = {
  "Sangat Cocok": "bg-primary text-primary-foreground",
  Cocok: "bg-primary/20 text-primary",
  "Cukup Cocok": "bg-muted text-muted-foreground",
}

function Gizi({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="rounded-lg bg-muted/60 px-2.5 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">
        {value}
        <span className="ml-0.5 text-xs font-normal text-muted-foreground">
          {unit}
        </span>
      </p>
    </div>
  )
}

export function RecommendationList({ items }: { items: Rekomendasi[] }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">
          5 Rekomendasi Makanan Terbaik
        </h2>
        <p className="text-sm text-muted-foreground">
          Diurutkan berdasarkan kedekatan dengan kebutuhan nutrisi per porsi
          makan.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const level = levelHarga(item.harga)
          return (
            <Card key={item.id} className="flex flex-col overflow-hidden">
              <CardHeader className="gap-3 pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    <h3 className="text-balance font-semibold leading-tight">
                      {item.nama}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.tempat}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Navigation className="h-3.5 w-3.5" />
                    {item.jarakJalanKm.toFixed(2)} km
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5" />
                    {item.kategori}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={cocokBadge[item.kecocokan]}>
                    <Star className="mr-1 h-3 w-3" />
                    {item.kecocokan}
                  </Badge>
                  <Badge variant="outline" className={hargaBadge[level]}>
                    {level}
                  </Badge>
                  <span className="ml-auto text-base font-bold text-primary">
                    {formatRupiah(item.harga)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="mt-auto grid grid-cols-2 gap-2">
                <Gizi label="Kalori" value={item.kalori} unit="kkal" />
                <Gizi label="Protein" value={item.protein} unit="g" />
                <Gizi label="Lemak" value={item.lemak} unit="g" />
                <Gizi label="Karbohidrat" value={item.karbohidrat} unit="g" />
                <div className="col-span-2 rounded-lg bg-primary/5 px-2.5 py-2">
                  <p className="text-xs text-muted-foreground">Cosine similarity</p>
                  <p className="text-sm font-semibold">{item.matchPct.toFixed(1)}%</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
