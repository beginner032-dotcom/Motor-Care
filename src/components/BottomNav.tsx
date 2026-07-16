import React from 'react';
import { Home, Fuel, Wrench, Menu } from 'lucide-react';
import { MotorIcon } from './icons/MotorIcon';

type BottomNavProps = {
  activeTab: string;
  onChangeTab: (tab: string) => void;
};

export default function BottomNav({ activeTab, onChangeTab }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'motor', icon: MotorIcon, label: 'Motor' },
    { id: 'bensin', icon: Fuel, label: 'Bensin' },
    { id: 'servis', icon: Wrench, label: 'Servis' },
    { id: 'lainnya', icon: Menu, label: 'Lainnya' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#E2E8F0] h-16 flex justify-around items-center pb-2 pt-1 z-50">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        // Menu doesn't look good filled, so we only fill other icons
        const shouldFill = isActive && item.id !== 'lainnya';
        
        return (
          <button
            key={item.id}
            onClick={() => onChangeTab(item.id)}
            className={`flex flex-col items-center justify-center gap-1 min-w-[64px] transition-colors ${isActive ? 'text-[#1565C0]' : 'text-[#6B7280]'}`}
          >
             <item.icon 
               className={`w-6 h-6 ${isActive ? 'stroke-2' : 'stroke-[1.5]'}`} 
               fill={shouldFill ? "currentColor" : "none"} 
             />
            <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
