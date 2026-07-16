import React, { useState, useMemo } from 'react';
import { ChevronLeft, Wallet, PieChart, Tag, Calendar, Filter } from 'lucide-react';
import { useAppData } from '../../hooks/useAppData';

type PengeluaranViewProps = {
  onChangeTab: (tab: string) => void;
};

type FilterType = 'semua' | 'hari_ini' | 'minggu_ini' | 'bulan_ini' | 'tahun_ini';

export default function PengeluaranView({ onChangeTab }: PengeluaranViewProps) {
  const { expenses } = useAppData();
  const [filter, setFilter] = useState<FilterType>('bulan_ini');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  
  const now = new Date();
  
  const getStartOfWeek = (date: Date) => {
    const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    const startOfWeek = new Date(date.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek.getTime();
  };
  
  const filteredExpenses = useMemo(() => {
    return expenses.filter(exp => {
      if (filter === 'semua') return true;
      const expDate = new Date(exp.date);
      
      if (filter === 'hari_ini') {
        return expDate.toDateString() === now.toDateString();
      }
      if (filter === 'minggu_ini') {
        const startOfWeek = getStartOfWeek(new Date(now));
        return expDate.getTime() >= startOfWeek;
      }
      if (filter === 'bulan_ini') {
        return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear();
      }
      if (filter === 'tahun_ini') {
        return expDate.getFullYear() === now.getFullYear();
      }
      return true;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expenses, filter]);

  const totalAmount = filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  
  const expensesByCategory = useMemo(() => {
    const grouped = filteredExpenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(grouped)
      .map(([name, amount]) => ({ name, amount, percentage: totalAmount > 0 ? (amount / totalAmount) * 100 : 0 }))
      .sort((a, b) => b.amount - a.amount);
  }, [filteredExpenses, totalAmount]);
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Bensin': return 'bg-orange-500';
      case 'Servis': return 'bg-blue-500';
      case 'Ganti Part': return 'bg-purple-500';
      case 'Parkir': return 'bg-emerald-500';
      case 'Cuci Motor': return 'bg-cyan-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIconColor = (category: string) => {
    switch (category) {
      case 'Bensin': return 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Servis': return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Ganti Part': return 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Parkir': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400';
      case 'Cuci Motor': return 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400';
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getFilterLabel = () => {
    switch (filter) {
      case 'hari_ini': return 'Hari Ini';
      case 'minggu_ini': return 'Minggu Ini';
      case 'bulan_ini': return 'Bulan Ini';
      case 'tahun_ini': return 'Tahun Ini';
      default: return 'Semua Waktu';
    }
  };

  return (
    <div className="pb-24 font-sans bg-[#F8FAFC] dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-[#003399] dark:bg-gray-900 px-4 pt-12 pb-6 text-white sticky top-0 z-20 shadow-sm rounded-b-[24px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => onChangeTab('lainnya')} className="p-2 -ml-2 hover:bg-white/10 dark:hover:bg-gray-800/30 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Pengeluaran</h1>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowFilterOptions(!showFilterOptions)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 dark:bg-gray-800/50 dark:hover:bg-gray-800 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
            >
              <Filter className="w-4 h-4" />
              {getFilterLabel()}
            </button>
            
            {showFilterOptions && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-30 animate-in fade-in zoom-in-95 duration-200">
                {(['hari_ini', 'minggu_ini', 'bulan_ini', 'tahun_ini', 'semua'] as FilterType[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => { setFilter(f); setShowFilterOptions(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${filter === f ? 'bg-blue-50 text-[#003399] dark:bg-indigo-900/30 dark:text-indigo-400 font-bold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
                  >
                    {f === 'hari_ini' ? 'Hari Ini' : f === 'minggu_ini' ? 'Minggu Ini' : f === 'bulan_ini' ? 'Bulan Ini' : f === 'tahun_ini' ? 'Tahun Ini' : 'Semua Waktu'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Total Card */}
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/80 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Wallet className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm flex items-center gap-2">
              <Wallet className="w-4 h-4" /> Total Pengeluaran
            </p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 tracking-tight">
              Rp {totalAmount.toLocaleString('id-ID')}
            </h2>
            <p className="text-xs text-gray-400 mt-1">Periode: {getFilterLabel()}</p>
          </div>
        </div>

        {/* Breakdown by Category */}
        {expensesByCategory.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-5 h-5 text-gray-400" />
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">Alokasi Dana</h3>
            </div>
            
            {/* Progress Bar Chart */}
            <div className="flex h-3 rounded-full overflow-hidden mb-5 bg-gray-100 dark:bg-gray-700">
              {expensesByCategory.map((cat, idx) => (
                <div 
                  key={cat.name} 
                  className={`h-full ${getCategoryColor(cat.name)}`}
                  style={{ width: `${cat.percentage}%` }}
                />
              ))}
            </div>
            
            {/* Legend */}
            <div className="space-y-3">
              {expensesByCategory.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getCategoryColor(cat.name)}`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 w-10 text-right">{cat.percentage.toFixed(1)}%</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white w-24 text-right">Rp {cat.amount.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transaction List */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm px-1">Riwayat Transaksi</h3>
          
          {filteredExpenses.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/50 p-8 text-center">
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wallet className="w-8 h-8 text-gray-300 dark:text-gray-500" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">Belum ada pengeluaran</p>
              <p className="text-xs text-gray-400 mt-1">Pengeluaran akan otomatis tercatat saat Anda menambahkan riwayat.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredExpenses.map((exp) => (
                <div key={exp.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${getCategoryIconColor(exp.category)}`}>
                      <Tag className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-[14px]">{exp.category}</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                          {new Date(exp.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#003399] dark:text-indigo-400 text-sm block">
                      -Rp {exp.amount.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Overlay to close filter dropdown */}
      {showFilterOptions && (
        <div className="fixed inset-0 z-20" onClick={() => setShowFilterOptions(false)} />
      )}
    </div>
  );
}
