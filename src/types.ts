export type FuelLog = {
  id: string;
  date: string;
  km: number;
  fuelType: string;
  liters: number;
  totalPrice: number;
  gasStation: string;
};

export type ServiceLog = {
  id: string;
  date: string;
  km: number;
  workshop: string;
  serviceType: string;
  notes: string;
  cost: number;
  isCompleted: boolean;
};

export type PartLog = {
  id: string;
  name: string;
  brand: string;
  price: number;
  installCost: number;
  date: string;
  km: number;
  warrantyMonths: number;
};

export type Reminder = {
  id: string;
  name: string;
  dueKm: number;
  status: 'Aman' | 'Segera Servis' | 'Terlambat';
};

export type Expense = {
  id: string;
  category: 'Servis' | 'Ganti Part' | 'Bensin' | 'Parkir' | 'Cuci Motor' | 'Lainnya';
  amount: number;
  date: string;
};

export type MotorData = {
  id: string;
  userId?: string;
  brand: string;
  type: string;
  year: number;
  plate: string;
  chassisNo: string;
  engineNo: string;
  currentKm: number;
};
