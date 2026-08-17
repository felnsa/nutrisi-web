"use client"

import { useMemo, useRef, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { LandingHero } from "@/components/landing-hero"
import { StudentForm } from "@/components/student-form"
import { NutritionResults } from "@/components/nutrition-results"
import { RecommendationList } from "@/components/recommendation-list"
import { BudgetSummary } from "@/components/budget-summary"
import { StatsDashboard } from "@/components/stats-dashboard"
import { SiteFooter } from "@/components/site-footer"
import {
  hitungBudget,
  hitungNutrisi,
  rekomendasikanMakanan,
  type DataMahasiswa,
} from "@/lib/nutrition"

export default function Page() {
  const [data, setData] = useState<DataMahasiswa | null>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const hasil = useMemo(() => (data ? hitungNutrisi(data) : null), [data])
  const rekomendasi = useMemo(
    () => (hasil ? rekomendasikanMakanan(hasil, 5) : []),
    [hasil],
  )
  const budget = useMemo(() => hitungBudget(rekomendasi), [rekomendasi])

  function scrollTo(ref: React.RefObject<HTMLDivElement | null>) {
    requestAnimationFrame(() =>
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    )
  }

  function handleSubmit(d: DataMahasiswa) {
    setData(d)
    scrollTo(resultRef)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <LandingHero onStart={() => scrollTo(formRef)} />

        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-12">
          <section ref={formRef} className="scroll-mt-20">
            <div className="mx-auto max-w-2xl">
              <StudentForm onSubmit={handleSubmit} />
            </div>
          </section>

          {hasil && data && rekomendasi.length > 0 && (
            <div ref={resultRef} className="flex scroll-mt-20 flex-col gap-12">
              <NutritionResults hasil={hasil} nama={data.nama} />
              <RecommendationList items={rekomendasi} />
              <BudgetSummary budget={budget} />
              <StatsDashboard hasil={hasil} top={rekomendasi[0]} />
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
