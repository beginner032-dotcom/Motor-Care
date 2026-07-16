import React, { useMemo } from 'react';
import { ChevronLeft, Bell, Droplet, Settings, CircleDashed, Wrench, Battery, Wind, Cog } from 'lucide-react';
import { useActiveMotor } from '../../hooks/useActiveMotor';

type PengingatViewProps = {
  onChangeTab: (tab: string) => void;
};

export default function PengingatView({ onChangeTab }: PengingatViewProps) {
  const { motor } = useActiveMotor();
  const currentKm = motor?.currentKm || 0;

  const formatKm = (km: number) => {
    return new Intl.NumberFormat('id-ID').format(km) + ' km';
  };

  const reminders = useMemo(() => {
    const list = [
      {
        id: 'oli',
        title: 'Ganti Oli Mesin',
        interval: 2500,
        icon: Droplet,
        color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-500 dark:text-orange-400',
        barColor: 'bg-orange-500',
        description: 'Menjaga performa mesin agar tetap halus.'
      },
      {
        id: 'cvt',
        title: 'Servis CVT',
        interval: 8000,
        icon: Settings,
        color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400',
        barColor: 'bg-blue-500',
        description: 'Pembersihan dan pengecekan komponen transmisi.'
      },
      {
        id: 'rem',
        title: 'Cek Kampas Rem',
        interval: 12000,
        icon: CircleDashed,
        color: 'bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400',
        barColor: 'bg-red-500',
        description: 'Pengecekan dan penggantian bila sudah tipis.'
      },
      {
        id: 'oli-gardan',
        title: 'Ganti Oli Gardan',
        interval: 8000,
        icon: Cog,
        color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-400',
        barColor: 'bg-indigo-500',
        description: 'Melumasi gigi rasio agar tidak aus.'
      },
      {
        id: 'busi',
        title: 'Ganti Busi',
        interval: 10000,
        icon: Battery,
        color: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-500 dark:text-yellow-400',
        barColor: 'bg-yellow-500',
        description: 'Menjaga sistem pengapian tetap optimal.'
      },
      {
        id: 'radiator',
        title: 'Ganti Air Radiator',
        interval: 12000,
        icon: Wrench,
        color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 dark:text-emerald-400',
        barColor: 'bg-emerald-500',
        description: 'Mencegah mesin dari overheat.'
      },
      {
        id: 'filter',
        title: 'Ganti Filter Udara',
        interval: 16000,
        icon: Wind,
        color: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-500 dark:text-cyan-400',
        barColor: 'bg-cyan-500',
        description: 'Menjaga pasokan udara bersih ke ruang bakar.'
      }
    ];

    return list.map(item => {
      const nextKm = Math.floor(currentKm / item.interval + 1) * item.interval;
      const remainingKm = nextKm - currentKm;
      const progress = ((item.interval - remainingKm) / item.interval) * 100;
      
      let status: 'aman' | 'peringatan' | 'kritis' = 'aman';
      if (progress >= 90) status = 'kritis';
      else if (progress >= 70) status = 'peringatan';

      return {
        ...item,
        nextKm,
        remainingKm,
        progress: Math.min(Math.max(progress, 0), 100),
        status
      };
    }).sort((a, b) => a.remainingKm - b.remainingKm);
  }, [currentKm]);

  return (
    <div className="pb-24 font-sans bg-[#F8FAFC] dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-[#003399] dark:bg-gray-900 px-4 pt-12 pb-6 text-white sticky top-0 z-20 shadow-sm rounded-b-[24px]">
        <div className="flex items-center gap-3">
          <button onClick={() => onChangeTab('lainnya')} className="p-2 -ml-2 hover:bg-white/10 dark:hover:bg-gray-800/30 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold">Pengingat Servis</h1>
            <p className="text-xs text-blue-200 dark:text-gray-400 mt-1">{motor?.brand} {motor?.type} • {formatKm(currentKm)}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700/50 flex gap-3 items-center">
          <div className="w-12 h-12 bg-blue-50 dark:bg-indigo-900/20 text-[#003399] dark:text-indigo-400 rounded-full flex items-center justify-center shrink-0">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">Estimasi Berdasarkan Jarak</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Pengingat ini dihitung dari odometer Anda saat ini.</p>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 dark:text-white text-sm px-1 pt-2">Jadwal Mendatang</h3>
        
        <div className="space-y-4">
          {reminders.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-gray-100 dark:border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-[15px]">{item.title}</h4>
                      <p className="text-[12px] text-gray-500 dark:text-gray-400 font-medium">{item.description}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-500 dark:text-gray-400">Progres ({formatKm(item.interval)})</span>
                    <span className={
                      item.status === 'kritis' ? 'text-red-500' :
                      item.status === 'peringatan' ? 'text-orange-500' :
                      'text-[#003399] dark:text-indigo-400'
                    }>
                      Sisa {formatKm(item.remainingKm)}
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.status === 'kritis' ? 'bg-red-500' :
                        item.status === 'peringatan' ? 'bg-orange-500' :
                        item.barColor
                      }`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-medium text-gray-400">
                    <span>{formatKm(currentKm)}</span>
                    <span>Jatuh tempo: {formatKm(item.nextKm)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
