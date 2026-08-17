import { Beef, Droplet, Flame, Wheat } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { HasilNutrisi } from "@/lib/nutrition"

function round(n: number) {
  return Math.round(n)
}

export function NutritionResults({
  hasil,
  nama,
}: {
  hasil: HasilNutrisi
  nama: string
}) {
  const makro = [
    {
      label: "Protein",
      gram: round(hasil.proteinGram),
      persen: 20,
      icon: Beef,
    },
    {
      label: "Lemak",
      gram: round(hasil.lemakGram),
      persen: 25,
      icon: Droplet,
    },
    {
      label: "Karbohidrat",
      gram: round(hasil.karbohidratGram),
      persen: 55,
      icon: Wheat,
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">
          Kebutuhan Nutrisi Harian
        </h2>
        <p className="text-sm text-muted-foreground">
          Hasil perhitungan untuk{" "}
          <span className="font-medium text-foreground">{nama}</span> · BMR{" "}
          {round(hasil.bmr)} kkal · TDEE {round(hasil.tdee)} kkal
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Flame className="h-4 w-4 text-primary" />
              Kalori Harian
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <p className="text-3xl font-bold text-primary">
              {round(hasil.kalori)}
            </p>
            <p className="text-xs text-muted-foreground">kkal / hari (TDEE)</p>
          </CardContent>
        </Card>

        {makro.map((m) => {
          const Icon = m.icon
          return (
            <Card key={m.label}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Icon className="h-4 w-4 text-primary" />
                  {m.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <p className="text-3xl font-bold">
                  {m.gram}
                  <span className="ml-1 text-base font-medium text-muted-foreground">
                    gram
                  </span>
                </p>
                <Progress value={m.persen} />
                <p className="text-xs text-muted-foreground">
                  {m.persen}% dari total kalori
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
