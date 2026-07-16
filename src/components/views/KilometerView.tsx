import React, { useMemo } from 'react';
import { ChevronLeft, Gauge, Wrench, Fuel, PenTool, Calendar, MapPin, Tag } from 'lucide-react';
import { useAppData } from '../../hooks/useAppData';
import { useActiveMotor } from '../../hooks/useActiveMotor';

type KilometerViewProps = {
  onChangeTab: (tab: string) => void;
};

export default function KilometerView({ onChangeTab }: KilometerViewProps) {
  const { fuelLogs, serviceLogs, partLogs } = useAppData();
  const { motor } = useActiveMotor();

  const timelineEvents = useMemo(() => {
    const events: any[] = [];
    if (!motor) return events;

    fuelLogs.forEach(log => {
      events.push({
        id: `fuel-${log.id}`,
        type: 'fuel',
        km: log.km,
        date: log.date,
        title: `Isi Bensin ${log.fuelType}`,
        subtitle: `${log.liters} Liter - Rp ${(log.totalPrice).toLocaleString('id-ID')}`,
        location: log.gasStation || '-',
        icon: Fuel,
        color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
      });
    });

    serviceLogs.forEach(log => {
      events.push({
        id: `service-${log.id}`,
        type: 'service',
        km: log.km,
        date: log.date,
        title: `Servis: ${log.serviceType}`,
        subtitle: `Rp ${(log.cost).toLocaleString('id-ID')}`,
        location: log.workshop || '-',
        icon: Wrench,
        color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
      });
    });

    partLogs.forEach(log => {
      events.push({
        id: `part-${log.id}`,
        type: 'part',
        km: log.km,
        date: log.date,
        title: `Ganti Part: ${log.name}`,
        subtitle: `${log.brand} - Rp ${(log.price + log.installCost).toLocaleString('id-ID')}`,
        location: 'Pemasangan Part',
        icon: PenTool,
        color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
      });
    });

    // Add a mocked current km if no events exist or as the top event
    events.push({
      id: 'current',
      type: 'current',
      km: motor.currentKm || 0,
      date: new Date().toISOString().split('T')[0],
      title: 'Kilometer Saat Ini',
      subtitle: 'Tercatat di sistem',
      location: '-',
      icon: Gauge,
      color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
    });

    // Sort by km descending, then by date descending
    return events.sort((a, b) => {
      if (b.km !== a.km) {
        return b.km - a.km; // Descending km
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [fuelLogs, serviceLogs, partLogs, motor?.currentKm]);

  // Remove duplicates for 'current' if it exactly matches another event's km?
  // It's fine to keep it as a milestone.

  return (
    <div className="pb-24 font-sans bg-[#F8FAFC] dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-[#003399] dark:bg-gray-900 px-4 pt-12 pb-6 text-white sticky top-0 z-10 shadow-sm rounded-b-[24px]">
        <div className="flex items-center gap-3">
          <button onClick={() => onChangeTab('lainnya')} className="p-2 -ml-2 hover:bg-white/10 dark:hover:bg-gray-800/30 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold">Riwayat Kilometer</h1>
            <p className="text-xs text-blue-200 dark:text-gray-400 mt-1">{motor?.brand} {motor?.type}</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Stats Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-6 flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-50 dark:bg-indigo-900/30 text-[#003399] dark:text-indigo-400 rounded-full flex items-center justify-center shrink-0">
            <Gauge className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Jarak Tempuh</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">
              {motor?.currentKm?.toLocaleString('id-ID') || 0} <span className="text-sm font-medium text-gray-500 dark:text-gray-400">km</span>
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 space-y-6 mt-8 before:absolute before:inset-0 before:ml-[39px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-200 before:via-gray-200 before:to-transparent dark:before:from-gray-700 dark:before:via-gray-700">
          
          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            const isLast = index === timelineEvents.length - 1;
            
            return (
              <div key={event.id} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Timeline dot */}
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-4 border-white dark:border-gray-900 bg-white dark:bg-gray-800 absolute left-[-16px] md:left-1/2 md:-translate-x-1/2 shrink-0 ${event.type === 'current' ? 'shadow-[0_0_0_2px_#10B981] dark:shadow-[0_0_0_2px_#34D399]' : 'shadow-[0_0_0_1px_#E5E7EB] dark:shadow-[0_0_0_1px_#374151]'}`}>
                  <div className={`w-3 h-3 rounded-full ${event.type === 'current' ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                </div>
                
                {/* Card */}
                <div className="w-full md:w-[calc(50%-2.5rem)] ml-6 md:ml-0">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-full">
                        {event.km.toLocaleString('id-ID')} km
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                        {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 hover:shadow-md transition-shadow">
                      <div className="flex gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${event.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">{event.title}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{event.subtitle}</p>
                          
                          {event.location !== '-' && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-gray-400 dark:text-gray-500">
                              <MapPin className="w-3 h-3 shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
        </div>
        
        {timelineEvents.length === 0 && (
          <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/50 mt-6">
            <Gauge className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">Belum ada riwayat tercatat</p>
          </div>
        )}
      </div>
    </div>
  );
}
