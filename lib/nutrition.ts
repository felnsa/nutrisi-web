import { dataMakanan, type Makanan } from "./foods"

export type JenisKelamin = "Laki-laki" | "Perempuan"

export type Aktivitas =
  | "Sangat Ringan"
  | "Ringan"
  | "Sedang"
  | "Berat"
  | "Sangat Berat"

export const faktorAktivitas: Record<Aktivitas, number> = {
  "Sangat Ringan": 1.2,
  Ringan: 1.375,
  Sedang: 1.55,
  Berat: 1.725,
  "Sangat Berat": 1.9,
}

export interface DataMahasiswa {
  nama: string
  usia: number
  jenisKelamin: JenisKelamin
  tinggi: number
  berat: number
  aktivitas: Aktivitas
}

export interface HasilNutrisi {
  bmr: number
  faktorAktivitas: number
  tdee: number
  kalori: number
  proteinGram: number
  lemakGram: number
  karbohidratGram: number
  proteinKalori: number
  lemakKalori: number
  karbohidratKalori: number
  targetKaloriPerMakan: number
  targetProteinPerMakan: number
  targetLemakPerMakan: number
  targetKarbohidratPerMakan: number
}

// Mifflin-St Jeor:
// Laki-laki  : BMR = 10W + 6.25H - 5A + 5
// Perempuan  : BMR = 10W + 6.25H - 5A - 161
export function hitungNutrisi(data: DataMahasiswa): HasilNutrisi {
  const { usia, jenisKelamin, tinggi, berat, aktivitas } = data

  const base = 10 * berat + 6.25 * tinggi - 5 * usia
  const bmr = jenisKelamin === "Laki-laki" ? base + 5 : base - 161
  const faktor = faktorAktivitas[aktivitas]
  const tdee = bmr * faktor

  // Distribusi energi: protein 20%, lemak 25%, karbohidrat 55%.
  const proteinKalori = tdee * 0.20
  const lemakKalori = tdee * 0.25
  const karbohidratKalori = tdee * 0.55

  const proteinGram = proteinKalori / 4
  const lemakGram = lemakKalori / 9
  const karbohidratGram = karbohidratKalori / 4

  // Data makanan pada foods.json dinyatakan per 100 gram.
  // Target harian dibagi 3 waktu makan utama untuk kebutuhan satu menu.
  const targetKaloriPerMakan = tdee / 3
  const targetProteinPerMakan = proteinGram / 3
  const targetLemakPerMakan = lemakGram / 3
  const targetKarbohidratPerMakan = karbohidratGram / 3

  return {
    bmr,
    faktorAktivitas: faktor,
    tdee,
    kalori: tdee,
    proteinGram,
    lemakGram,
    karbohidratGram,
    proteinKalori,
    lemakKalori,
    karbohidratKalori,
    targetKaloriPerMakan,
    targetProteinPerMakan,
    targetLemakPerMakan,
    targetKarbohidratPerMakan,
  }
}

export type Kecocokan = "Sangat Cocok" | "Cocok" | "Cukup Cocok"

export interface Rekomendasi extends Makanan {
  score: number
  matchPct: number
  kecocokan: Kecocokan
}

function normalize(value: number, min: number, max: number): number {
  if (max === min) return 0
  return (value - min) / (max - min)
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, value, index) => sum + value * b[index], 0)
  const normA = Math.sqrt(a.reduce((sum, value) => sum + value * value, 0))
  const normB = Math.sqrt(b.reduce((sum, value) => sum + value * value, 0))

  if (normA === 0 || normB === 0) return 0
  return dot / (normA * normB)
}

/**
 * Content-Based Filtering menggunakan Cosine Similarity.
 *
 * Profil pengguna = [kalori, protein, lemak, karbohidrat] target per makan.
 * Profil makanan = [kalori, protein, lemak, karbohidrat] per 100 gram.
 * Setiap fitur dinormalisasi Min-Max agar satuan berbeda tidak mendominasi.
 */
export function rekomendasikanMakanan(
  hasil: HasilNutrisi,
  limit = 5,
): Rekomendasi[] {
  if (dataMakanan.length === 0) return []

  const features = dataMakanan.map((m) => [
    m.kalori,
    m.protein,
    m.lemak,
    m.karbohidrat,
  ])

  const mins = [0, 1, 2, 3].map((index) =>
    Math.min(...features.map((feature) => feature[index])),
  )
  const maxs = [0, 1, 2, 3].map((index) =>
    Math.max(...features.map((feature) => feature[index])),
  )

  const targetRaw = [
    hasil.targetKaloriPerMakan,
    hasil.targetProteinPerMakan,
    hasil.targetLemakPerMakan,
    hasil.targetKarbohidratPerMakan,
  ]

  const targetVector = targetRaw.map((value, index) =>
    normalize(value, mins[index], maxs[index]),
  )

  const scored: Rekomendasi[] = dataMakanan.map((makanan) => {
    const foodRaw = [
      makanan.kalori,
      makanan.protein,
      makanan.lemak,
      makanan.karbohidrat,
    ]

    const foodVector = foodRaw.map((value, index) =>
      normalize(value, mins[index], maxs[index]),
    )

    const similarity = cosineSimilarity(targetVector, foodVector)
    const matchPct = Math.max(0, Math.min(100, similarity * 100))

    let kecocokan: Kecocokan = "Cukup Cocok"
    if (matchPct >= 80) kecocokan = "Sangat Cocok"
    else if (matchPct >= 60) kecocokan = "Cocok"

    return {
      ...makanan,
      score: similarity,
      matchPct,
      kecocokan,
    }
  })

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value)
}

export type LevelHarga = "Murah" | "Sedang" | "Premium"

export function levelHarga(harga: number): LevelHarga {
  if (harga < 15000) return "Murah"
  if (harga <= 25000) return "Sedang"
  return "Premium"
}

export interface RingkasanBudget {
  minimum: number
  rataRata: number
  maksimum: number
}

export function hitungBudget(rekomendasi: Rekomendasi[]): RingkasanBudget {
  if (rekomendasi.length === 0) {
    return { minimum: 0, rataRata: 0, maksimum: 0 }
  }

  const harga = rekomendasi.map((r) => r.harga)
  const total = harga.reduce((a, b) => a + b, 0)

  return {
    minimum: Math.min(...harga),
    rataRata: Math.round(total / harga.length),
    maksimum: Math.max(...harga),
  }
}
