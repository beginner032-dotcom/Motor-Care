import { FuelLog, ServiceLog, PartLog, Reminder, Expense, MotorData } from './types';

export const mockMotors: MotorData[] = [
  {
    id: 'm1',
    brand: 'Honda',
    type: 'Vario 125',
    year: 2022,
    plate: 'B 1234 ABC',
    chassisNo: 'MH1JMxxxxxxxxxxxx',
    engineNo: 'JMxxxxxxxxx',
    currentKm: 15250,
  },
  {
    id: 'm2',
    brand: 'Yamaha',
    type: 'NMAX 155',
    year: 2023,
    plate: 'B 5678 DEF',
    chassisNo: 'MH3SGxxxxxxxxxxxx',
    engineNo: 'SGxxxxxxxxx',
    currentKm: 8500,
  }
];

// For simplicity in this prototype, we'll export a mutable activeMotorId. 
// In a real app this would be in React state/context.
export let activeMotorId = 'm1';

export const getActiveMotor = () => mockMotors.find(m => m.id === activeMotorId) || mockMotors[0];
export const setActiveMotorId = (id: string) => { activeMotorId = id; };

export const mockFuelLogs: FuelLog[] = [
  { id: '1', date: '2026-07-10', km: 15250, fuelType: 'Pertamax', liters: 4.2, totalPrice: 54600, gasStation: 'SPBU Pertamina 34.123.45' },
  { id: '2', date: '2026-07-05', km: 15050, fuelType: 'Pertamax', liters: 4.0, totalPrice: 52000, gasStation: 'SPBU Shell' },
  { id: '3', date: '2026-06-30', km: 14860, fuelType: 'Pertamax', liters: 3.8, totalPrice: 49400, gasStation: 'SPBU Pertamina 31.222.11' },
];

export const mockServiceLogs: ServiceLog[] = [
  { id: '1', date: '2026-06-15', km: 14800, workshop: 'AHASS Kebon Jeruk', serviceType: 'Servis Rutin', notes: 'Ganti oli mesin, oli gardan, cek CVT', cost: 120000, isCompleted: true },
  { id: '2', date: '2026-03-10', km: 12500, workshop: 'AHASS Palmerah', serviceType: 'Servis Besar', notes: 'Pembersihan injektor, ganti busi', cost: 250000, isCompleted: true },
];

export const mockPartLogs: PartLog[] = [
  { id: '1', name: 'Kampas Rem Depan', brand: 'Honda Genuine Parts', price: 55000, installCost: 15000, date: '2026-03-10', km: 12500, warrantyMonths: 1 },
  { id: '2', name: 'Ban Belakang', brand: 'Michelin City Grip Pro', price: 350000, installCost: 20000, date: '2025-12-05', km: 10000, warrantyMonths: 6 },
];

export const mockReminders: Reminder[] = [
  { id: '1', name: 'Ganti Oli Mesin', dueKm: 16800, status: 'Aman' },
  { id: '2', name: 'Ganti Oli Gardan', dueKm: 22800, status: 'Aman' },
  { id: '3', name: 'Kampas Rem Belakang', dueKm: 15500, status: 'Segera Servis' },
  { id: '4', name: 'Filter Udara', dueKm: 15000, status: 'Terlambat' },
];

export const mockExpenses: Expense[] = [
  { id: '1', category: 'Bensin', amount: 54600, date: '2026-07-10' },
  { id: '2', category: 'Bensin', amount: 52000, date: '2026-07-05' },
  { id: '3', category: 'Bensin', amount: 49400, date: '2026-06-30' },
  { id: '4', category: 'Servis', amount: 120000, date: '2026-06-15' },
  { id: '5', category: 'Cuci Motor', amount: 20000, date: '2026-07-08' },
  { id: '6', category: 'Ganti Part', amount: 70000, date: '2026-03-10' },
];

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

export const formatKm = (km: number) => {
  return new Intl.NumberFormat('id-ID').format(km) + ' km';
};
