import React, { useState } from 'react';
import { formatCurrency, formatKm } from '../../mockData';
import { Wrench, Settings, Fuel, Bell, ChevronRight, Menu, Calendar, MoreHorizontal, Wallet, Droplet, CircleDashed, ChevronDown, X, User, LogOut, Moon, Sun, Info } from 'lucide-react';
import { useActiveMotor } from '../../hooks/useActiveMotor';
import { useAppData } from '../../hooks/useAppData';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';

type DashboardProps = {
  onChangeTab: (tab: string) => void;
};

export default function Dashboard({ onChangeTab }: DashboardProps) {
  const { motor, mockMotors, changeMotor } = useActiveMotor();
  const { serviceLogs, fuelLogs, partLogs, expenses } = useAppData();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

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
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Belum Ada Data Motor</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Silakan tambahkan data motor Anda terlebih dahulu untuk menggunakan aplikasi ini.</p>
        <button 
          onClick={() => onChangeTab('motor')} 
          className="bg-[#003399] dark:bg-indigo-900 text-white px-6 py-3 rounded-xl font-bold w-full shadow-lg"
        >
          Tambah Motor
        </button>
      </div>
    );
  }

  const nextOliKm = Math.floor(motor.currentKm / 2500 + 1) * 2500;
  const oliLagi = nextOliKm - motor.currentKm;

  const nextRemKm = Math.floor(motor.currentKm / 12000 + 1) * 12000;
  const remLagi = nextRemKm - motor.currentKm;

  const nextCvtKm = Math.floor(motor.currentKm / 8000 + 1) * 8000;
  const cvtLagi = nextCvtKm - motor.currentKm;

  return (
    <div className="pb-24 font-sans relative">
      {/* Header Section with Blue Gradient */}
      <div className="bg-gradient-to-b from-[#003399] to-[#0052cc] dark:from-gray-900 dark:to-gray-800 px-4 pt-10 pb-28 text-white relative flex justify-between items-start rounded-b-[2rem]">
        <button className="p-2 -ml-2 relative hover:bg-white/10 dark:hover:bg-gray-800/30 rounded-xl transition-colors" onClick={() => setIsMenuOpen(true)}>
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
                <option key={m.id} value={m.id} className="text-gray-900 dark:text-white">{m.brand} {m.type}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-80" />
          </div>
          <span className="text-[10px] text-blue-200 font-medium">{motor.plate}</span>
        </div>
        <button 
          className="p-2 -mr-2 relative hover:bg-white/10 dark:hover:bg-gray-800/30 rounded-xl transition-colors"
          onClick={() => setIsNotificationsOpen(true)}
        >
           <Bell className="w-6 h-6" />
           <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#003399]"></span>
        </button>
      </div>

      <div className="px-4 -mt-20 space-y-4">
        {/* Motor Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-gray-700/50 flex items-center gap-4 relative cursor-pointer" onClick={() => onChangeTab('motor')}>
          <div className="w-24 h-24 shrink-0 bg-gray-50 dark:bg-gray-700/30 rounded-xl flex items-center justify-center">
            <span className="text-5xl">🏍️</span>
          </div>
          <div className="flex-1 py-1">
            <h2 className="text-[15px] font-bold text-gray-900 dark:text-white">{motor.brand} {motor.type}</h2>
            <div className="inline-block border border-gray-200 text-gray-500 dark:text-gray-400 text-[10px] font-semibold px-2.5 py-0.5 rounded-md mt-1.5 mb-3">
              {motor.plate}
            </div>
            <div>
              <div className="text-[15px] font-bold text-gray-900 dark:text-white">{formatKm(motor.currentKm)}</div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Total Kilometer</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-gray-700/50">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-50 p-1.5 rounded-lg">
                <Wrench className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-xs font-semibold text-gray-800 dark:text-gray-100">Servis Terakhir</span>
            </div>
            <p className="text-[15px] font-bold text-gray-900 dark:text-white">{lastService ? lastService.date : '-'}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{lastService ? `di ${formatKm(lastService.km)}` : 'Belum ada data'}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-gray-700/50">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-orange-50 p-1.5 rounded-lg">
                <Calendar className="w-4 h-4 text-orange-500" />
              </div>
              <span className="text-xs font-semibold text-gray-800 dark:text-gray-100">Servis Berikutnya</span>
            </div>
            <p className="text-[15px] font-bold text-gray-900 dark:text-white">di {formatKm((lastService?.km || motor.currentKm) + 2500)}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">± 2.500 km lagi</p>
          </div>
        </div>

        {/* Total Biaya Bulan Ini */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-1">Total Biaya Bulan Ini</p>
            <p className="text-[22px] tracking-tight font-bold text-[#10B981]">{formatCurrency(totalExpense)}</p>
            <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-1">Seluruh Waktu</p>
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
            <h3 className="text-[15px] font-bold text-gray-900 dark:text-white">Pengingat</h3>
            <button className="text-[#003399] text-[11px] font-bold">Lihat Semua</button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-gray-700/50 space-y-1">
            <div className="flex items-center justify-between p-3 border-b border-gray-50 pb-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFFBEB] flex items-center justify-center shrink-0">
                     <Droplet className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-gray-900 dark:text-white">Ganti Oli Mesin</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Jatuh tempo di {formatKm(nextOliKm)}</p>
                  </div>
               </div>
               <span className="px-2.5 py-1.5 bg-[#FFFBEB] text-[#F59E0B] text-[10px] font-bold rounded-lg">{formatKm(oliLagi)} lagi</span>
            </div>
            
            <div className="flex items-center justify-between p-3 border-b border-gray-50 pb-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center shrink-0">
                     <CircleDashed className="w-5 h-5 text-[#EF4444]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-gray-900 dark:text-white">Ganti Kampas Rem Depan</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Jatuh tempo di {formatKm(nextRemKm)}</p>
                  </div>
               </div>
               <span className="px-2.5 py-1.5 bg-[#FEF2F2] text-[#EF4444] text-[10px] font-bold rounded-lg">{formatKm(remLagi)} lagi</span>
            </div>
            
            <div className="flex items-center justify-between p-3 pb-2">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
                     <Settings className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-gray-900 dark:text-white">Servis CVT</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Jatuh tempo di {formatKm(nextCvtKm)}</p>
                  </div>
               </div>
               <span className="px-2.5 py-1.5 bg-[#EFF6FF] text-[#3B82F6] text-[10px] font-bold rounded-lg">{formatKm(cvtLagi)} lagi</span>
            </div>
          </div>
        </div>

        {/* Ringkasan Pengeluaran */}
        <div>
          <div className="flex justify-between items-center mb-3 mt-4">
            <h3 className="text-[15px] font-bold text-gray-900 dark:text-white">Ringkasan Pengeluaran</h3>
            <button className="text-[#003399] text-[11px] font-bold">Lihat Semua</button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'servis', icon: Wrench, label: 'Servis', amount: expenseSummary['Servis'] || 0, iconColor: 'text-[#003399]' },
              { id: 'part', icon: Wallet, label: 'Ganti Part', amount: expenseSummary['Ganti Part'] || 0, iconColor: 'text-[#10B981]' },
              { id: 'bensin', icon: Fuel, label: 'Bensin', amount: expenseSummary['Bensin'] || 0, iconColor: 'text-[#F59E0B]' },
              { id: 'lainnya', icon: MoreHorizontal, label: 'Lainnya', amount: expenseSummary['Lainnya'] || expenseSummary['Cuci Motor'] || expenseSummary['Parkir'] || 0, iconColor: 'text-gray-700' },
            ].map((item, idx) => (
              <button key={idx} onClick={() => onChangeTab(item.id)} className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-gray-700/50 flex flex-col items-center justify-center gap-1.5 cursor-pointer w-full hover:bg-gray-50 dark:bg-gray-700/30 transition-colors">
                 <item.icon className={`w-5 h-5 mb-1 ${item.iconColor}`} />
                 <span className="text-[10px] font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">{item.label}</span>
                 <span className="text-[9px] font-bold text-gray-500 dark:text-gray-400">{formatCurrency(item.amount)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="absolute inset-0 bg-black/50 transition-opacity animate-in fade-in duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="relative w-[80%] max-w-sm bg-white dark:bg-gray-800 h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            {/* Sidebar Content */}
            <div className="bg-[#003399] dark:bg-indigo-900 p-6 text-white flex flex-col gap-4">
              <div className="flex justify-between items-start mt-4">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profil" className="w-16 h-16 rounded-full border-2 border-white/30 shadow-inner object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-16 h-16 bg-white/20 dark:bg-gray-800/50 rounded-full flex items-center justify-center shrink-0 border-2 border-white/30 shadow-inner">
                    <User className="w-8 h-8 text-white" />
                  </div>
                )}
                <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/10 dark:bg-gray-800/20 rounded-full hover:bg-white/20 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-2">
                <h3 className="font-bold text-xl">{user?.email ? user.email.split('@')[0] : 'Pengguna'}</h3>
                <p className="text-sm text-blue-200">{user?.email || 'Guest'}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2 mt-2">Menu Utama</div>
              <button onClick={() => { setIsMenuOpen(false); onChangeTab('motor'); }} className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 dark:bg-gray-700/30 rounded-2xl text-gray-700 font-medium transition-colors">
                <div className="w-10 h-10 bg-blue-50 flex items-center justify-center rounded-xl text-xl">🏍️</div>
                <span className="font-bold">Kendaraan Saya</span>
              </button>
              <button onClick={() => { setIsMenuOpen(false); onChangeTab('servis'); }} className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 dark:bg-gray-700/30 rounded-2xl text-gray-700 font-medium transition-colors">
                <div className="w-10 h-10 bg-orange-50 flex items-center justify-center rounded-xl text-orange-600"><Wrench className="w-5 h-5" /></div>
                <span className="font-bold">Riwayat Servis</span>
              </button>
              
              <div className="h-[1px] bg-gray-100 my-4 mx-2" />
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">Preferensi</div>
              
              <button onClick={toggleDarkMode} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:bg-gray-700/30 rounded-2xl text-gray-700 font-medium transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${isDarkMode ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-500'}`}>
                     {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  </div>
                  <span className="font-bold">Mode Gelap</span>
                </div>
                <div className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 shadow-inner ${isDarkMode ? 'bg-[#003399] dark:bg-indigo-900' : 'bg-gray-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isDarkMode ? 'translate-x-5' : ''}`} />
                </div>
              </button>
              
              <button onClick={() => { setIsMenuOpen(false); onChangeTab('lainnya'); }} className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 dark:bg-gray-700/30 rounded-2xl text-gray-700 font-medium transition-colors">
                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-xl text-gray-600"><Settings className="w-5 h-5" /></div>
                <span className="font-bold">Pengaturan Lanjutan</span>
              </button>
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-700/30 pb-8">
              <button onClick={logout} className="w-full flex items-center justify-center gap-2 p-3.5 bg-red-50 text-red-600 font-bold hover:bg-red-100 rounded-2xl transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Keluar dari Akun</span>
              </button>
              <div className="flex justify-between items-center px-4 mt-6">
                 <p className="text-[11px] font-bold text-gray-400">MotoCare v1.0.0</p>
                 <p className="text-[11px] font-medium text-gray-400">Bambang Sulistyo</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Notifications Drawer/Modal */}
      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="absolute inset-0 bg-black/50 transition-opacity animate-in fade-in duration-300"
            onClick={() => setIsNotificationsOpen(false)}
          />
          <div className="absolute top-0 right-0 w-[85%] max-w-sm bg-[#F8FAFC] dark:bg-gray-900 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="bg-white dark:bg-gray-900 px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between shrink-0">
              <h3 className="text-[17px] font-bold text-gray-900 dark:text-white">Notifikasi</h3>
              <button 
                onClick={() => setIsNotificationsOpen(false)}
                className="w-8 h-8 flex items-center justify-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 rounded-2xl p-4 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                  <Droplet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-[14px]">Waktunya Ganti Oli!</h4>
                  <p className="text-[12px] text-gray-600 dark:text-gray-400 mt-1">Oli mesin motor {motor.name || motor.brand} sudah mendekati batas. Sisa {formatKm(oliLagi)} lagi.</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2">Hari ini</p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-2xl p-4 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-[14px]">Jadwal Servis CVT</h4>
                  <p className="text-[12px] text-gray-600 dark:text-gray-400 mt-1">Jangan lupa cek CVT {motor.name || motor.brand} Anda dalam {formatKm(cvtLagi)} ke depan.</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2">Kemarin</p>
                </div>
              </div>
              
              <div className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl p-4 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                  <CircleDashed className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-[14px]">Periksa Kampas Rem</h4>
                  <p className="text-[12px] text-gray-600 dark:text-gray-400 mt-1">Kampas rem {motor.name || motor.brand} mungkin sudah tipis. Sisa {formatKm(remLagi)} lagi.</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2">2 hari yang lalu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
