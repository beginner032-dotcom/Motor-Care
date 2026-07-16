import React, { useState } from 'react';
import { 
  Home, Fuel, Wrench, Settings, Bell, Wallet, 
  Gauge, Folder, BarChart2, Info, ChevronRight, BookOpen, LogOut, Trash2, X, RefreshCw, Moon
} from 'lucide-react';
import { MotorIcon } from '../icons/MotorIcon';
import { useAuth } from '../../hooks/useAuth';
import { useAppData } from '../../hooks/useAppData';
import { useTheme } from '../../contexts/ThemeContext';

type LainnyaViewProps = {
  onChangeTab: (tab: string) => void;
};

export default function LainnyaView({ onChangeTab }: LainnyaViewProps) {
  const { user, logout } = useAuth();
  const { clearAllData } = useAppData();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isClearing, setIsClearing] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  // Settings state
  const [settings, setSettings] = useState({
    notifications: true,
    autoSync: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
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
    { id: 'pengaturan', icon: Settings, label: 'Pengaturan', iconColor: 'text-[#4B5563] dark:text-gray-400', fill: true },
    { id: 'tentang', icon: Info, label: 'Tentang Aplikasi', iconColor: 'text-[#4B5563] dark:text-gray-400', fill: true },
    { id: 'logout', icon: LogOut, label: 'Keluar', iconColor: 'text-red-500', fill: false },
  ];

  const handleMenuClick = async (id: string) => {
    if (id === 'logout') {
      logout();
    } else if (id === 'tentang') {
      setShowAboutModal(true);
    } else if (id === 'pengaturan') {
      setShowSettingsModal(true);
    } else {
      onChangeTab(id);
    }
  };

  return (
    <div className="pb-24 font-sans bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-[#003399] px-6 pt-12 pb-16 text-white flex items-center gap-4 rounded-b-[24px]">
        <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-[14px] flex items-center justify-center shrink-0 shadow-sm">
           <MotorIcon className="w-8 h-8 text-[#003399]" />
        </div>
        <div>
           <h1 className="text-xl font-bold tracking-wide">MotoCare</h1>
           <p className="text-[11px] text-blue-100 mt-0.5">{user?.email || 'Catat Perawatan, Rawat Motor'}</p>
        </div>
      </div>

      {/* Menu List */}
      <div className="px-4 -mt-8 space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-gray-100 dark:border-gray-700/50 overflow-hidden">
          {mainMenus.map((menu, idx) => (
            <button 
              key={menu.id}
              onClick={() => handleMenuClick(menu.id)}
              className={`w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:bg-gray-700/30 transition-colors ${idx !== mainMenus.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <div className="flex items-center gap-4">
                <menu.icon 
                  className={`w-[22px] h-[22px] ${menu.iconColor}`} 
                  fill={menu.fill ? "currentColor" : "none"} 
                  strokeWidth={menu.fill ? 1.5 : 2}
                />
                <span className="text-[14px] font-semibold text-gray-800 dark:text-gray-100">{menu.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-gray-100 dark:border-gray-700/50 overflow-hidden">
          {bottomMenus.map((menu, idx) => (
            <button 
              key={menu.id}
              onClick={() => handleMenuClick(menu.id)}
              className={`w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:bg-gray-700/30 transition-colors ${idx !== bottomMenus.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <div className="flex items-center gap-4">
                <menu.icon 
                  className={`w-[22px] h-[22px] ${menu.iconColor}`} 
                  fill={menu.fill ? "currentColor" : "none"} 
                  strokeWidth={menu.fill ? 1.5 : 2}
                />
                <span className={`text-[14px] font-semibold ${menu.id === 'logout' ? 'text-red-500' : 'text-gray-800 dark:text-gray-100'}`}>{menu.label}</span>
              </div>
              {menu.id !== 'logout' && <ChevronRight className="w-4 h-4 text-gray-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="h-32 bg-[#003399] relative flex items-center justify-center">
              <button 
                onClick={() => setShowAboutModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-800/20 hover:bg-white dark:bg-gray-800/30 rounded-full text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-md absolute -bottom-8">
                <MotorIcon className="w-10 h-10 text-[#003399]" />
              </div>
            </div>
            
            {/* Content */}
            <div className="pt-12 pb-8 px-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">MotoCare</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">Versi 1.0.0</p>
              
              <p className="text-[13px] text-gray-600 leading-relaxed mb-6">
                MotoCare adalah aplikasi manajemen perawatan motor yang dirancang untuk membantu Anda memantau riwayat servis, penggantian suku cadang, dan pengisian bensin dengan mudah.
              </p>

              <div className="flex flex-col gap-2 text-[12px] text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/30 p-3 rounded-xl border border-gray-100 dark:border-gray-700/50">
                <div className="flex justify-between items-center">
                  <span>Dibuat oleh</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-100">Bambang sulistyo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Hak Cipta</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-100">© 2026 MotoCare</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center sm:p-4">
          <div className="bg-[#F8FAFC] rounded-t-2xl sm:rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in slide-in-from-bottom sm:zoom-in duration-200 max-h-[90vh] flex flex-col">
            <div className="bg-white dark:bg-gray-800 px-5 py-4 border-b border-gray-100 dark:border-gray-700/50 flex items-center justify-between shrink-0">
              <h3 className="text-[17px] font-bold text-gray-900 dark:text-white">Pengaturan</h3>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="w-8 h-8 flex items-center justify-center bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 rounded-full text-gray-500 dark:text-gray-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm p-1">
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Bell className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-gray-900 dark:text-white">Notifikasi Pengingat</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">Jadwal servis & ganti oli</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={settings.notifications} onChange={() => toggleSetting('notifications')} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:bg-gray-800 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#003399]"></div>
                    </label>
                  </div>
                  
                  <div className="h-[1px] bg-gray-50 dark:bg-gray-700/30 mx-4" />
                  
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                        <RefreshCw className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-gray-900 dark:text-white">Sinkronisasi Otomatis</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">Simpan ke cloud berkala</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={settings.autoSync} onChange={() => toggleSetting('autoSync')} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:bg-gray-800 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#059669]"></div>
                    </label>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm p-1">
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-700/30 text-gray-700 flex items-center justify-center">
                        <Moon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-gray-900 dark:text-white">Mode Gelap</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">Tampilan tema gelap</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={isDarkMode} onChange={toggleDarkMode} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:bg-gray-800 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-800"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
