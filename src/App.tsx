/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import Dashboard from './components/views/Dashboard';
import BensinView from './components/views/BensinView';
import ServisView from './components/views/ServisView';
import LainnyaView from './components/views/LainnyaView';
import MotorView from './components/views/MotorView';
import PartView from './components/views/PartView';
import LaporanView from './components/views/LaporanView';
import PanduanView from './components/views/PanduanView';
import LoginView from './components/views/LoginView';
import AddActionMenu from './components/AddActionMenu';
import AddDataModal from './components/AddDataModal';
import { Plus } from 'lucide-react';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [addDataModalType, setAddDataModalType] = useState<'bensin' | 'servis' | 'part' | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003399]"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginView />;
  }

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard onChangeTab={setActiveTab} />;
      case 'bensin': return <BensinView />;
      case 'servis': return <ServisView />;
      case 'lainnya': return <LainnyaView onChangeTab={setActiveTab} />;
      case 'motor': return <MotorView />;
      case 'part': return <PartView onBack={() => setActiveTab('dashboard')} />;
      case 'laporan': return <LaporanView onBack={() => setActiveTab('dashboard')} />;
      case 'panduan': return <PanduanView onBack={() => setActiveTab('lainnya')} />;
      default: return <Dashboard onChangeTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex justify-center text-[#1F2937]">
      {/* Mobile Simulator Container */}
      <div className="w-full max-w-md bg-[#F8FAFC] h-screen relative overflow-hidden shadow-2xl flex flex-col font-sans">
        
        {/* Main Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth hide-scrollbar">
          {renderView()}
        </div>

        {/* Floating Action Button */}
        <button 
          onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
          className={`absolute bottom-[72px] right-3 w-11 h-11 bg-[#1565C0] text-white rounded-xl flex items-center justify-center shadow-[0_4px_12px_rgba(21,101,192,0.4)] active:scale-95 transition-transform z-50 ${isAddMenuOpen ? 'rotate-45' : ''}`}
        >
          <Plus className="w-6 h-6" />
        </button>

        <AddActionMenu 
          isOpen={isAddMenuOpen} 
          onClose={() => setIsAddMenuOpen(false)} 
          onSelectAction={(type) => setAddDataModalType(type)}
        />
        
        <AddDataModal 
          type={addDataModalType} 
          onClose={() => setAddDataModalType(null)} 
        />

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
      </div>
    </div>
  );
}
