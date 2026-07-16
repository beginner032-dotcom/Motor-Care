import React from 'react';
import { formatCurrency, formatKm } from '../../mockData';
import { useAppData } from '../../hooks/useAppData';

export default function BensinView() {
  const { fuelLogs } = useAppData();
  
  const totalLiters = fuelLogs.reduce((acc, curr) => acc + curr.liters, 0);
  const totalExpense = fuelLogs.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const totalDistance = 850; // mock total distance in this period
  const avgConsumption = totalLiters > 0 ? (totalDistance / totalLiters).toFixed(2) : '0.00';

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-[#1F2937]">Riwayat Bensin</h2>
        <div className="flex items-center gap-2 mt-2 bg-blue-50 p-2 rounded-lg">
          <div className="text-[#1565C0] text-lg">📊</div>
          <div>
            <div className="text-[10px] text-[#1565C0] font-bold uppercase">Rata-rata Konsumsi</div>
            <div className="text-sm font-bold text-[#1F2937]">{avgConsumption} km / Liter</div>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Summary Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white rounded-2xl p-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-gray-100">
            <p className="text-[10px] font-bold uppercase text-gray-400 mb-1">Total Liter</p>
            <p className="text-sm font-bold text-gray-900">{totalLiters.toFixed(1)} L</p>
          </div>
          <div className="bg-white rounded-2xl p-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-gray-100">
            <p className="text-[10px] font-bold uppercase text-gray-400 mb-1">Total Pengeluaran</p>
            <p className="text-sm font-bold text-[#1565C0]">{formatCurrency(totalExpense)}</p>
          </div>
        </div>

        {/* History List */}
        <div>
          <h3 className="text-xs font-bold uppercase text-gray-400 mb-2 px-1">Riwayat Pengisian</h3>
          <div className="space-y-2">
            {fuelLogs.map((log) => (
              <div key={log.id} className="bg-white rounded-2xl p-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs font-bold">{log.date}</div>
                  <div className="text-xs font-bold text-[#1565C0]">{formatCurrency(log.totalPrice)}</div>
                </div>
                
                <div className="flex justify-between items-center text-[10px] text-gray-500">
                  <div>{log.fuelType} • {log.liters}L</div>
                  <div>{formatKm(log.km)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
