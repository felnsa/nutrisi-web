import foodsJson from "@/foods.json"

export type Kategori = "Sarapan" | "Makan Siang" | "Makan Malam" | "Snack"

export interface Makanan {
  id: number
  nama: string
  kalori: number
  protein: number
  lemak: number
  karbohidrat: number
  harga: number
  kategori: Kategori
  tempat: string
  jarakJalanM: number
  jarakJalanKm: number
  waktuTempuhMenit: number
  latitude?: number
  longitude?: number
}

type FoodJson = {
  ID: number
  Restoran: string
  Nama: string
  Longitude?: number
  Latitude?: number
  Harga: number
  Kalori: number
  Protein: number
  Lemak: number
  Karbohidrat: number
  Jarak_Jalan_m: number
  Jarak_Jalan_km: number
  Waktu_Tempuh_detik?: number
  Waktu_Tempuh_menit?: number
}

function inferKategori(nama: string): Kategori {
  const text = nama.toLowerCase()

  if (
    /bubur|nasi uduk|nasi kuning|roti|lontong|bihun|bakmi|mi goreng|mie goreng/.test(text)
  ) {
    return "Sarapan"
  }

  if (
    /salad|puding|buah|pisang|tahu|tempe|gorengan|snack|martabak/.test(text)
  ) {
    return "Snack"
  }

  if (/soto|sop|rawon|gudeg|krecek|ayam|ikan|udang|rendang|nasi goreng|nasi/.test(text)) {
    return "Makan Siang"
  }

  return "Makan Siang"
}

export const dataMakanan: Makanan[] = (foodsJson as FoodJson[]).map((food) => ({
  id: food.ID,
  nama: food.Nama,
  kalori: Number(food.Kalori),
  protein: Number(food.Protein),
  lemak: Number(food.Lemak),
  karbohidrat: Number(food.Karbohidrat),
  harga: Number(food.Harga),
  kategori: inferKategori(food.Nama),
  tempat: food.Restoran,
  jarakJalanM: Number(food.Jarak_Jalan_m),
  jarakJalanKm: Number(food.Jarak_Jalan_km),
  waktuTempuhMenit: Number(food.Waktu_Tempuh_menit ?? 0),
  latitude: food.Latitude,
  longitude: food.Longitude,
}))
