"use client"

import { PieChart as PieIcon, BarChart3 } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { HasilNutrisi, Rekomendasi } from "@/lib/nutrition"

const PORSI_PER_HARI = 3

export function StatsDashboard({
  hasil,
  top,
}: {
  hasil: HasilNutrisi
  top: Rekomendasi
}) {
  const pieData = [
    {
      key: "protein",
      label: "Protein",
      value: Math.round(hasil.proteinGram),
      fill: "var(--color-protein)",
    },
    {
      key: "lemak",
      label: "Lemak",
      value: Math.round(hasil.lemakGram),
      fill: "var(--color-lemak)",
    },
    {
      key: "karbohidrat",
      label: "Karbohidrat",
      value: Math.round(hasil.karbohidratGram),
      fill: "var(--color-karbohidrat)",
    },
  ]

  const totalGram = pieData.reduce((a, b) => a + b.value, 0)

  const pieConfig = {
    value: { label: "Gram" },
    protein: { label: "Protein", color: "var(--chart-1)" },
    lemak: { label: "Lemak", color: "var(--chart-4)" },
    karbohidrat: { label: "Karbohidrat", color: "var(--chart-3)" },
  } satisfies ChartConfig

  const barData = [
    {
      gizi: "Kalori",
      kebutuhan: Math.round(hasil.kalori / PORSI_PER_HARI),
      makanan: top.kalori,
    },
    {
      gizi: "Protein",
      kebutuhan: Math.round(hasil.proteinGram / PORSI_PER_HARI),
      makanan: top.protein,
    },
    {
      gizi: "Lemak",
      kebutuhan: Math.round(hasil.lemakGram / PORSI_PER_HARI),
      makanan: top.lemak,
    },
    {
      gizi: "Karbo",
      kebutuhan: Math.round(hasil.karbohidratGram / PORSI_PER_HARI),
      makanan: top.karbohidrat,
    },
  ]

  const barConfig = {
    kebutuhan: { label: "Kebutuhan / Porsi", color: "var(--chart-1)" },
    makanan: { label: top.nama, color: "var(--chart-3)" },
  } satisfies ChartConfig

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">
          Dashboard Statistik
        </h2>
        <p className="text-sm text-muted-foreground">
          Visualisasi komposisi gizi harian dan perbandingan dengan menu
          rekomendasi teratas.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <PieIcon className="h-4 w-4 text-primary" />
              Komposisi Nutrisi Harian
            </CardTitle>
            <CardDescription>Distribusi makronutrien (gram)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={pieConfig}
              className="mx-auto aspect-square max-h-[280px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent nameKey="label" />}
                />
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="key"
                  innerRadius={60}
                  strokeWidth={4}
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.key} fill={entry.fill} />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-2xl font-bold"
                            >
                              {totalGram}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 22}
                              className="fill-muted-foreground text-xs"
                            >
                              gram total
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
                <ChartLegend
                  content={<ChartLegendContent nameKey="key" />}
                  className="flex-wrap gap-2"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-4 w-4 text-primary" />
              Kebutuhan vs Makanan Terpilih
            </CardTitle>
            <CardDescription className="truncate">
              Per porsi makan vs {top.nama}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={barConfig} className="max-h-[280px] w-full">
              <BarChart data={barData} margin={{ top: 8 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="gizi"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis tickLine={false} axisLine={false} width={36} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="kebutuhan" fill="var(--color-kebutuhan)" radius={4} />
                <Bar dataKey="makanan" fill="var(--color-makanan)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
