import React from 'react';
import { ArrowLeft, CheckCircle2, Wrench, Settings, Droplet, AlertTriangle } from 'lucide-react';

type PanduanViewProps = {
  onBack: () => void;
};

export default function PanduanView({ onBack }: PanduanViewProps) {
  const panduanData = [
    {
      kategori: 'Ganti Oli',
      icon: Droplet,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      items: [
        { nama: 'Oli Mesin', km: '2.000 - 3.000 km', deskripsi: 'Atau maksimal setiap 2 bulan jika jarang digunakan.' },
        { nama: 'Oli Gardan (Matic)', km: '8.000 - 10.000 km', deskripsi: 'Perbandingan idealnya 3 kali ganti oli mesin, 1 kali ganti oli gardan.' }
      ]
    },
    {
      kategori: 'Filter & Busi',
      icon: Wrench,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      items: [
        { nama: 'Busi', km: '8.000 - 10.000 km', deskripsi: 'Cek kondisi percikan api secara berkala.' },
        { nama: 'Filter Udara', km: '15.000 km', deskripsi: 'Ganti jika sudah kotor, jangan disemprot angin kompresor (untuk tipe kertas).' }
      ]
    },
    {
      kategori: 'Bagian CVT / Rantai',
      icon: Settings,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      items: [
        { nama: 'V-Belt (Matic)', km: '20.000 - 24.000 km', deskripsi: 'Periksa fisik jika sudah retak harus segera diganti.' },
        { nama: 'Roller (Matic)', km: '20.000 - 24.000 km', deskripsi: 'Biasanya diganti bersamaan dengan V-Belt.' },
        { nama: 'Rantai & Gir (Manual)', km: '15.000 - 20.000 km', deskripsi: 'Lumasi setiap 500-1.000 km, ganti satu set jika sudah aus.' }
      ]
    },
    {
      kategori: 'Pengereman',
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      items: [
        { nama: 'Kampas Rem', km: '10.000 - 15.000 km', deskripsi: 'Atau segera ganti jika terdengar bunyi gesekan besi.' },
        { nama: 'Minyak Rem', km: '20.000 - 24.000 km', deskripsi: 'Kuras dan ganti agar pengereman tetap pakem.' }
      ]
    },
    {
      kategori: 'Turun Mesin / Servis Besar',
      icon: Wrench,
      color: 'text-gray-700',
      bgColor: 'bg-gray-100',
      items: [
        { nama: 'Servis Besar', km: '40.000 - 50.000 km', deskripsi: 'Membersihkan kerak karbon, skir klep, dan cek ring piston.' },
        { nama: 'Overhaul (Turun Mesin)', km: 'Situasional', deskripsi: 'Dilakukan jika tenaga mesin hilang, asap knalpot putih, atau ada suara kasar di dalam mesin.' }
      ]
    }
  ];

  return (
    <div className="pb-20 animate-in slide-in-from-right-8 duration-300">
      <div className="bg-[#003399] p-4 text-white flex items-center gap-3 sticky top-0 z-10 shadow-sm">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors -ml-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold">Panduan Perawatan</h2>
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-500 mb-6">
          Acuan standar ini dapat berbeda tergantung merek motor dan gaya berkendara. Selalu periksa buku manual kendaraan Anda.
        </p>

        <div className="space-y-6">
          {panduanData.map((kategori, idx) => {
            const Icon = kategori.icon;
            return (
              <div key={idx}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-full ${kategori.bgColor} ${kategori.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-gray-900">{kategori.kategori}</h3>
                </div>
                
                <div className="space-y-3 pl-11">
                  {kategori.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#1565C0] opacity-20"></div>
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-gray-900 text-sm">{item.nama}</span>
                        <span className="text-xs font-bold text-[#1565C0] bg-blue-50 px-2 py-1 rounded-lg shrink-0">
                          {item.km}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed mt-2">{item.deskripsi}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
