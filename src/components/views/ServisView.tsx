import React from 'react';
import { formatCurrency, formatKm } from '../../mockData';
import { MapPin, FileText } from 'lucide-react';
import { useAppData } from '../../hooks/useAppData';

export default function ServisView() {
  const { serviceLogs } = useAppData();
  const totalCost = serviceLogs.reduce((acc, curr) => acc + curr.cost, 0);

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-[#1F2937]">Riwayat Servis</h2>
        <div className="flex gap-2 mt-2">
          <div className="bg-blue-50 p-2 rounded-lg flex-1 flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase text-[#1565C0]">Total Servis</span>
            <span className="text-sm font-bold text-[#1F2937]">{serviceLogs.length} Kali</span>
          </div>
          <div className="bg-blue-50 p-2 rounded-lg flex-1 flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase text-[#1565C0]">Total Biaya</span>
            <span className="text-sm font-bold text-[#1F2937]">{formatCurrency(totalCost)}</span>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {serviceLogs.map((log) => (
          <div key={log.id} className="bg-white rounded-2xl p-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-gray-100 flex gap-3">
            <div className={`w-1.5 h-12 rounded-full mt-1 ${log.isCompleted ? 'bg-green-500' : 'bg-yellow-400'}`} />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xs font-bold text-gray-900">{log.serviceType}</h3>
                <span className="text-xs font-bold text-[#1565C0]">{formatCurrency(log.cost)}</span>
              </div>
              <div className="text-[10px] text-gray-500 mb-2">
                {log.date} • {formatKm(log.km)}
              </div>
              
              <div className="space-y-1">
                <div className="flex items-start gap-1.5 text-[10px] text-gray-600">
                  <MapPin className="w-3 h-3 shrink-0 text-gray-400" />
                  <span>{log.workshop}</span>
                </div>
                <div className="flex items-start gap-1.5 text-[10px] text-gray-600">
                  <FileText className="w-3 h-3 shrink-0 text-gray-400" />
                  <span className="line-clamp-1">{log.notes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
