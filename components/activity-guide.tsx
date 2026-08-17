'use client'

import { AlertCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function ActivityGuide() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-5 w-5 rounded-full p-0"
        >
          <AlertCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base">Panduan Aktivitas Harian</DialogTitle>
          <DialogDescription className="text-xs">
            Berdasarkan FAO/WHO Activity Factor Guidelines
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
            <div className="font-semibold text-primary mb-2">
              Aktivitas Ringan (×1.375)
            </div>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Tidur dan istirahat</li>
              <li>• Membaca, menonton, belajar</li>
              <li>• Pekerjaan kantor/desk job</li>
              <li>• Aktivitas duduk lama (kuliah, coding)</li>
              <li>
                <span className="font-medium">Contoh: </span>
                Mahasiswa yang selalu duduk di ruang kelas atau lab
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
            <div className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
              Aktivitas Sedang (×1.55)
            </div>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Berjalan (1-2 jam/hari)</li>
              <li>• Pekerjaan rumah tangga (menyapu, cuci)</li>
              <li>• Pekerjaan manual ringan</li>
              <li>• Olahraga ringan (jalan santai, yoga)</li>
              <li>
                <span className="font-medium">Contoh: </span>
                Mahasiswa yang aktif bergerak, menghadiri kelas, dan melakukan aktivitas sehari-hari
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-3">
            <div className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
              Aktivitas Berat (×1.725)
            </div>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Olahraga intensif (3-5 hari/minggu)</li>
              <li>• Lari, gym, sepak bola, renang</li>
              <li>• Kerja fisik berat atau pekerjaan lapangan</li>
              <li>• Kombinasi aktivitas harian + latihan teratur</li>
              <li>
                <span className="font-medium">Contoh: </span>
                Mahasiswa atlet atau yang rutin berolahraga intensif
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">
            <p className="font-medium mb-2">Catatan Penting:</p>
            <p>
              Pemilihan aktivitas mempengaruhi Total Daily Energy Expenditure (TDEE). 
              Pilih kategori yang paling sesuai dengan rutinitas harianmu. Jika ragu, 
              pilih Sedang sebagai estimasi tengah.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
