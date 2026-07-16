import React from 'react';
import { formatCurrency, formatKm } from '../../mockData';
import { Settings, Calendar, ShieldCheck, ChevronLeft } from 'lucide-react';
import { useAppData } from '../../hooks/useAppData';

type PartViewProps = {
  onBack: () => void;
};

export default function PartView({ onBack }: PartViewProps) {
  const { partLogs } = useAppData();
  const totalCost = partLogs.reduce((acc, curr) => acc + curr.price + curr.installCost, 0);

  return (
    <div className="pb-20">
      <div className="bg-white p-4 border-b border-gray-100 flex items-center gap-3">
        <button onClick={onBack} className="p-1.5 bg-gray-50 rounded-lg text-gray-600">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold text-[#1F2937]">Riwayat Part</h2>
      </div>

      <div className="bg-white p-4 border-b border-gray-100">
        <div className="flex gap-2">
          <div className="bg-indigo-50 p-2 rounded-lg flex-1 flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase text-indigo-600">Total Item</span>
            <span className="text-sm font-bold text-[#1F2937]">{partLogs.length} Item</span>
          </div>
          <div className="bg-indigo-50 p-2 rounded-lg flex-1 flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase text-indigo-600">Total Biaya</span>
            <span className="text-sm font-bold text-[#1F2937]">{formatCurrency(totalCost)}</span>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {partLogs.map((log) => (
          <div key={log.id} className="bg-white rounded-2xl p-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">{log.name}</h3>
                  <p className="text-[10px] text-gray-500">{log.brand}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#1565C0]">{formatCurrency(log.price + log.installCost)}</span>
            </div>
            
            <div className="flex justify-between items-center text-[10px] text-gray-500 mt-3 pt-3 border-t border-gray-50">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{log.date}</span>
              </div>
              <div>{formatKm(log.km)}</div>
              <div className="flex items-center gap-1 text-green-600">
                <ShieldCheck className="w-3 h-3" />
                <span>{log.warrantyMonths} Bln Garansi</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
