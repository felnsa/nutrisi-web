import { ArrowDown, ArrowUp, Wallet } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatRupiah, type RingkasanBudget } from "@/lib/nutrition"

export function BudgetSummary({ budget }: { budget: RingkasanBudget }) {
  const items = [
    {
      label: "Budget Minimum",
      value: budget.minimum,
      icon: ArrowDown,
      hint: "Menu termurah dari rekomendasi",
    },
    {
      label: "Budget Rata-rata",
      value: budget.rataRata,
      icon: Wallet,
      hint: "Estimasi per porsi makan",
    },
    {
      label: "Budget Maksimum",
      value: budget.maksimum,
      icon: ArrowUp,
      hint: "Menu termahal dari rekomendasi",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Wallet className="h-5 w-5 text-primary" />
          Ringkasan Estimasi Budget
        </CardTitle>
        <CardDescription>
          Perkiraan biaya per porsi makan berdasarkan menu yang
          direkomendasikan.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
              className="flex flex-col gap-1 rounded-xl border border-border bg-muted/40 p-4"
            >
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="h-4 w-4 text-primary" />
                {item.label}
              </span>
              <span className="text-2xl font-bold">
                {formatRupiah(item.value)}
              </span>
              <span className="text-xs text-muted-foreground">{item.hint}</span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
