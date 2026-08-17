"use client"

import { useState } from "react"
import { Calculator, Wand2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ActivityGuide } from "@/components/activity-guide"
import {
  type Aktivitas,
  type DataMahasiswa,
  type JenisKelamin,
  faktorAktivitas,
} from "@/lib/nutrition"

interface FormState {
  nama: string
  usia: string
  jenisKelamin: JenisKelamin
  tinggi: string
  berat: string
  aktivitas: Aktivitas
}

const initialState: FormState = {
  nama: "",
  usia: "",
  jenisKelamin: "Laki-laki",
  tinggi: "",
  berat: "",
  aktivitas: "Sedang",
}

const contohData: FormState = {
  nama: "Ahmad",
  usia: "21",
  jenisKelamin: "Laki-laki",
  tinggi: "170",
  berat: "65",
  aktivitas: "Sedang",
}

export function StudentForm({
  onSubmit,
}: {
  onSubmit: (data: DataMahasiswa) => void
}) {
  const [form, setForm] = useState<FormState>(initialState)

  const isValid =
    form.nama.trim() !== "" &&
    Number(form.usia) > 0 &&
    Number(form.tinggi) > 0 &&
    Number(form.berat) > 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return
    onSubmit({
      nama: form.nama.trim(),
      usia: Number(form.usia),
      jenisKelamin: form.jenisKelamin,
      tinggi: Number(form.tinggi),
      berat: Number(form.berat),
      aktivitas: form.aktivitas,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calculator className="h-5 w-5 text-primary" />
          Data Mahasiswa
        </CardTitle>
        <CardDescription>
          Masukkan data diri untuk menghitung kebutuhan nutrisi harianmu.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid gap-2">
            <Label htmlFor="nama">Nama</Label>
            <Input
              id="nama"
              placeholder="Nama lengkap"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="usia">Usia (tahun)</Label>
              <Input
                id="usia"
                type="number"
                min={1}
                placeholder="21"
                value={form.usia}
                onChange={(e) => setForm({ ...form, usia: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label>Jenis Kelamin</Label>
              <RadioGroup
                value={form.jenisKelamin}
                onValueChange={(v) =>
                  setForm({ ...form, jenisKelamin: v as JenisKelamin })
                }
                className="flex gap-4 pt-1"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="Laki-laki" id="laki" />
                  <Label htmlFor="laki" className="font-normal">
                    Laki-laki
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="Perempuan" id="perempuan" />
                  <Label htmlFor="perempuan" className="font-normal">
                    Perempuan
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="tinggi">Tinggi Badan (cm)</Label>
              <Input
                id="tinggi"
                type="number"
                min={1}
                placeholder="170"
                value={form.tinggi}
                onChange={(e) => setForm({ ...form, tinggi: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="berat">Berat Badan (kg)</Label>
              <Input
                id="berat"
                type="number"
                min={1}
                placeholder="65"
                value={form.berat}
                onChange={(e) => setForm({ ...form, berat: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="aktivitas">Aktivitas Harian</Label>
              <ActivityGuide />
            </div>
            <Select
              value={form.aktivitas}
              onValueChange={(v) =>
                setForm({ ...form, aktivitas: v as Aktivitas })
              }
            >
              <SelectTrigger id="aktivitas">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ringan">
                  <div>Ringan (×1.375)</div>
                </SelectItem>
                <SelectItem value="Sedang">
                  <div>Sedang (×1.55)</div>
                </SelectItem>
                <SelectItem value="Berat">
                  <div>Berat (×1.725)</div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground pt-1">
              Klik ikon di atas untuk melihat panduan lengkap aktivitas harian
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <Button type="submit" className="flex-1 gap-2" disabled={!isValid}>
              <Calculator className="h-4 w-4" />
              Hitung Kebutuhan Nutrisi
            </Button>
            <Button
              type="button"
              variant="outline"
              className="gap-2"
              onClick={() => setForm(contohData)}
            >
              <Wand2 className="h-4 w-4" />
              Isi Data Contoh
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
