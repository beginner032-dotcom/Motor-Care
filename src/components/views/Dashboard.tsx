import React from 'react';
import { formatCurrency, formatKm } from '../../mockData';
import { Wrench, Settings, Fuel, Bell, ChevronRight, Menu, Calendar, MoreHorizontal, Wallet, Droplet, CircleDashed, ChevronDown } from 'lucide-react';
import { useActiveMotor } from '../../hooks/useActiveMotor';
import { useAppData } from '../../hooks/useAppData';

type DashboardProps = {
  onChangeTab: (tab: string) => void;
};

export default function Dashboard({ onChangeTab }: DashboardProps) {
  const { motor, mockMotors, changeMotor } = useActiveMotor();
  const { serviceLogs, fuelLogs, partLogs, expenses } = useAppData();

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  
  // Aggregate expenses for summary
  const expenseSummary = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  const lastService = serviceLogs[0] || null;

  if (!motor) {
    return (
      <div className="pb-24 font-sans relative h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-blue-100 text-[#003399] rounded-full flex items-center justify-center mb-4">
          <Settings className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Data Motor</h2>
        <p className="text-sm text-gray-500 mb-6">Silakan tambahkan data motor Anda terlebih dahulu untuk menggunakan aplikasi ini.</p>
        <button 
          onClick={() => onChangeTab('motor')} 
          className="bg-[#003399] text-white px-6 py-3 rounded-xl font-bold w-full shadow-lg"
        >
          Tambah Motor
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 font-sans relative">
      {/* Header Section with Blue Gradient */}
      <div className="bg-gradient-to-b from-[#003399] to-[#0052cc] px-4 pt-10 pb-28 text-white relative flex justify-between items-start rounded-b-[2rem]">
        <button className="p-2 -ml-2">
           <Menu className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center mt-1">
          <div className="relative group cursor-pointer">
            <select 
              value={motor.id} 
              onChange={(e) => changeMotor(e.target.value)}
              className="appearance-none bg-transparent text-lg font-bold tracking-wide outline-none text-center pr-6 cursor-pointer"
            >
              {mockMotors.map(m => (
                <option key={m.id} value={m.id} className="text-gray-900">{m.brand} {m.type}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-80" />
          </div>
          <span className="text-[10px] text-blue-200 font-medium">{motor.plate}</span>
        </div>
        <button className="p-2 -mr-2 relative">
           <Bell className="w-6 h-6" />
           <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#003399]"></span>
        </button>
      </div>

      <div className="px-4 -mt-20 space-y-4">
        {/* Motor Info Card */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-4 relative cursor-pointer" onClick={() => onChangeTab('motor')}>
          <div className="w-24 h-24 shrink-0 bg-gray-50 rounded-xl flex items-center justify-center">
            <span className="text-5xl">🏍️</span>
          </div>
          <div className="flex-1 py-1">
            <h2 className="text-[15px] font-bold text-gray-900">{motor.brand} {motor.type}</h2>
            <div className="inline-block border border-gray-200 text-gray-500 text-[10px] font-semibold px-2.5 py-0.5 rounded-md mt-1.5 mb-3">
              {motor.plate}
            </div>
            <div>
              <div className="text-[15px] font-bold text-gray-900">{formatKm(motor.currentKm)}</div>
              <div className="text-[10px] text-gray-500 font-medium">Total Kilometer</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-50 p-1.5 rounded-lg">
                <Wrench className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-xs font-semibold text-gray-800">Servis Terakhir</span>
            </div>
            <p className="text-[15px] font-bold text-gray-900">{lastService ? lastService.date : '-'}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{lastService ? `di ${formatKm(lastService.km)}` : 'Belum ada data'}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-orange-50 p-1.5 rounded-lg">
                <Calendar className="w-4 h-4 text-orange-500" />
              </div>
              <span className="text-xs font-semibold text-gray-800">Servis Berikutnya</span>
            </div>
            <p className="text-[15px] font-bold text-gray-900">di {formatKm((lastService?.km || motor.currentKm) + 2500)}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">± 2.500 km lagi</p>
          </div>
        </div>

        {/* Total Biaya Bulan Ini */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-gray-500 mb-1">Total Biaya Bulan Ini</p>
            <p className="text-[22px] tracking-tight font-bold text-[#10B981]">{formatCurrency(totalExpense)}</p>
            <p className="text-[11px] font-medium text-gray-500 mt-1">Seluruh Waktu</p>
          </div>
          <div className="w-28 h-12 text-[#1565C0] relative right-2">
            <svg viewBox="0 0 100 40" className="w-full h-full stroke-current fill-[#1565C0]/10">
               <path d="M0 40 L0 30 C 10 20, 20 40, 30 25 C 40 10, 50 35, 60 20 C 70 5, 80 25, 90 10 L100 20 L100 40 Z" stroke="none" />
               <path d="M0 30 C 10 20, 20 40, 30 25 C 40 10, 50 35, 60 20 C 70 5, 80 25, 90 10 L100 20" fill="none" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Pengingat */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[15px] font-bold text-gray-900">Pengingat</h3>
            <button className="text-[#003399] text-[11px] font-bold">Lihat Semua</button>
          </div>
          <div className="bg-white rounded-2xl p-2 shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-gray-100 space-y-1">
            <div className="flex items-center justify-between p-3 border-b border-gray-50 pb-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFFBEB] flex items-center justify-center shrink-0">
                     <Droplet className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-gray-900">Ganti Oli Mesin</p>
                    <p className="text-[10px] text-gray-500 font-medium">Jatuh tempo di 17.300 km</p>
                  </div>
               </div>
               <span className="px-2.5 py-1.5 bg-[#FFFBEB] text-[#F59E0B] text-[10px] font-bold rounded-lg">2.050 km lagi</span>
            </div>
            
            <div className="flex items-center justify-between p-3 border-b border-gray-50 pb-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center shrink-0">
                     <CircleDashed className="w-5 h-5 text-[#EF4444]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-gray-900">Ganti Kampas Rem Depan</p>
                    <p className="text-[10px] text-gray-500 font-medium">Jatuh tempo di 16.000 km</p>
                  </div>
               </div>
               <span className="px-2.5 py-1.5 bg-[#FEF2F2] text-[#EF4444] text-[10px] font-bold rounded-lg">750 km lagi</span>
            </div>
            
            <div className="flex items-center justify-between p-3 pb-2">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
                     <Settings className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-gray-900">Servis CVT</p>
                    <p className="text-[10px] text-gray-500 font-medium">Jatuh tempo di 20.000 km</p>
                  </div>
               </div>
               <span className="px-2.5 py-1.5 bg-[#EFF6FF] text-[#3B82F6] text-[10px] font-bold rounded-lg">4.750 km lagi</span>
            </div>
          </div>
        </div>

        {/* Ringkasan Pengeluaran */}
        <div>
          <div className="flex justify-between items-center mb-3 mt-4">
            <h3 className="text-[15px] font-bold text-gray-900">Ringkasan Pengeluaran</h3>
            <button className="text-[#003399] text-[11px] font-bold">Lihat Semua</button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'servis', icon: Wrench, label: 'Servis', amount: expenseSummary['Servis'] || 0, iconColor: 'text-[#003399]' },
              { id: 'part', icon: Wallet, label: 'Ganti Part', amount: expenseSummary['Ganti Part'] || 0, iconColor: 'text-[#10B981]' },
              { id: 'bensin', icon: Fuel, label: 'Bensin', amount: expenseSummary['Bensin'] || 0, iconColor: 'text-[#F59E0B]' },
              { id: 'lainnya', icon: MoreHorizontal, label: 'Lainnya', amount: expenseSummary['Lainnya'] || expenseSummary['Cuci Motor'] || expenseSummary['Parkir'] || 0, iconColor: 'text-gray-700' },
            ].map((item, idx) => (
              <button key={idx} onClick={() => onChangeTab(item.id)} className="bg-white rounded-2xl p-3 shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-center gap-1.5 cursor-pointer w-full hover:bg-gray-50 transition-colors">
                 <item.icon className={`w-5 h-5 mb-1 ${item.iconColor}`} />
                 <span className="text-[10px] font-medium text-gray-800 whitespace-nowrap">{item.label}</span>
                 <span className="text-[9px] font-bold text-gray-500">{formatCurrency(item.amount)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
