import React, { useState } from 'react';
import { 
  Home, Fuel, Wrench, Settings, Bell, Wallet, 
  Gauge, Folder, BarChart2, Info, ChevronRight, BookOpen, LogOut, Trash2
} from 'lucide-react';
import { MotorIcon } from '../icons/MotorIcon';
import { useAuth } from '../../hooks/useAuth';
import { useAppData } from '../../hooks/useAppData';

type LainnyaViewProps = {
  onChangeTab: (tab: string) => void;
};

export default function LainnyaView({ onChangeTab }: LainnyaViewProps) {
  const { user, logout } = useAuth();
  const { clearAllData } = useAppData();
  const [isClearing, setIsClearing] = useState(false);
  
  const mainMenus = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', iconColor: 'text-[#003399]', fill: true },
    { id: 'motor', icon: MotorIcon, label: 'Data Motor', iconColor: 'text-[#003399]', fill: false },
    { id: 'bensin', icon: Fuel, label: 'Pengisian Bensin', iconColor: 'text-[#059669]', fill: true },
    { id: 'servis', icon: Wrench, label: 'Riwayat Servis', iconColor: 'text-[#003399]', fill: true },
    { id: 'part', icon: Settings, label: 'Ganti Part', iconColor: 'text-[#2563EB]', fill: true },
    { id: 'panduan', icon: BookOpen, label: 'Panduan Perawatan', iconColor: 'text-[#059669]', fill: true },
    { id: 'pengingat', icon: Bell, label: 'Pengingat Servis', iconColor: 'text-[#D97706]', fill: true },
    { id: 'pengeluaran', icon: Wallet, label: 'Pengeluaran', iconColor: 'text-[#B45309]', fill: true },
    { id: 'kilometer', icon: Gauge, label: 'Riwayat Kilometer', iconColor: 'text-[#1F2937]', fill: false },
    { id: 'dokumen', icon: Folder, label: 'Dokumen', iconColor: 'text-[#3B82F6]', fill: true },
    { id: 'laporan', icon: BarChart2, label: 'Laporan', iconColor: 'text-[#8B5CF6]', fill: true },
  ];

  const bottomMenus = [
    { id: 'pengaturan', icon: Settings, label: 'Pengaturan', iconColor: 'text-[#4B5563]', fill: true },
    { id: 'tentang', icon: Info, label: 'Tentang Aplikasi', iconColor: 'text-[#4B5563]', fill: true },
    { id: 'reset_data', icon: Trash2, label: 'Reset Semua Data', iconColor: 'text-red-500', fill: false },
    { id: 'logout', icon: LogOut, label: 'Keluar', iconColor: 'text-red-500', fill: false },
  ];

  const handleMenuClick = async (id: string) => {
    if (id === 'logout') {
      logout();
    } else if (id === 'reset_data') {
      if (window.confirm("Apakah Anda yakin ingin menghapus SEMUA data? Aksi ini tidak dapat dibatalkan.")) {
        setIsClearing(true);
        try {
          await clearAllData();
          window.location.reload();
        } catch (e) {
          console.error("Gagal mereset data", e);
        } finally {
          setIsClearing(false);
        }
      }
    } else if (id !== 'pengaturan' && id !== 'tentang') {
      onChangeTab(id);
    }
  };

  return (
    <div className="pb-24 font-sans bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-[#003399] px-6 pt-12 pb-16 text-white flex items-center gap-4 rounded-b-[24px]">
        <div className="w-14 h-14 bg-white rounded-[14px] flex items-center justify-center shrink-0 shadow-sm">
           <MotorIcon className="w-8 h-8 text-[#003399]" />
        </div>
        <div>
           <h1 className="text-xl font-bold tracking-wide">MotoCare</h1>
           <p className="text-[11px] text-blue-100 mt-0.5">{user?.email || 'Catat Perawatan, Rawat Motor'}</p>
        </div>
      </div>

      {/* Menu List */}
      <div className="px-4 -mt-8 space-y-4">
        <div className="bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
          {mainMenus.map((menu, idx) => (
            <button 
              key={menu.id}
              onClick={() => handleMenuClick(menu.id)}
              className={`w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors ${idx !== mainMenus.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <div className="flex items-center gap-4">
                <menu.icon 
                  className={`w-[22px] h-[22px] ${menu.iconColor}`} 
                  fill={menu.fill ? "currentColor" : "none"} 
                  strokeWidth={menu.fill ? 1.5 : 2}
                />
                <span className="text-[14px] font-semibold text-gray-800">{menu.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
          {bottomMenus.map((menu, idx) => (
            <button 
              key={menu.id}
              onClick={() => handleMenuClick(menu.id)}
              className={`w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors ${idx !== bottomMenus.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <div className="flex items-center gap-4">
                <menu.icon 
                  className={`w-[22px] h-[22px] ${menu.iconColor}`} 
                  fill={menu.fill ? "currentColor" : "none"} 
                  strokeWidth={menu.fill ? 1.5 : 2}
                />
                <span className={`text-[14px] font-semibold ${menu.id === 'logout' ? 'text-red-500' : 'text-gray-800'}`}>{menu.label}</span>
              </div>
              {menu.id !== 'logout' && <ChevronRight className="w-4 h-4 text-gray-400" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
