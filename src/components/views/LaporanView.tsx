import React from 'react';
import { formatCurrency } from '../../mockData';
import { PieChart as PieChartIcon, ChevronLeft, Download } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useAppData } from '../../hooks/useAppData';

type LaporanViewProps = {
  onBack: () => void;
};

export default function LaporanView({ onBack }: LaporanViewProps) {
  const { expenses } = useAppData();
  const COLORS = ['#1565C0', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280'];
  
  // Aggregate expenses by category
  const expensesByCategory = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.keys(expensesByCategory).map(key => ({
    name: key,
    value: expensesByCategory[key]
  }));

  const totalExpense = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="pb-20">
      <div className="bg-white p-4 border-b border-gray-100 flex items-center gap-3">
        <button onClick={onBack} className="p-1.5 bg-gray-50 rounded-lg text-gray-600">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold text-[#1F2937]">Laporan Biaya</h2>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-gray-100 mb-4">
          <h3 className="text-xs font-bold uppercase text-gray-400 mb-4 text-center">Total Pengeluaran</h3>
          <div className="h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] text-gray-400 font-bold uppercase">Total</span>
              <span className="text-sm font-bold text-[#1565C0]">{formatCurrency(totalExpense)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {chartData.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                {item.name}
              </div>
              <span className="text-xs font-bold text-gray-900">{formatCurrency(item.value)}</span>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 bg-[#1565C0] text-white py-3 rounded-xl text-xs font-bold shadow-md shadow-blue-900/20 flex justify-center items-center gap-2">
          <Download className="w-4 h-4" /> Export Laporan
        </button>
      </div>
    </div>
  );
}
