import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAppData } from '../hooks/useAppData';
import { useActiveMotor } from '../hooks/useActiveMotor';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

type AddDataModalProps = {
  type: 'bensin' | 'servis' | 'part' | null;
  onClose: () => void;
};

export default function AddDataModal({ type, onClose }: AddDataModalProps) {
  const [formData, setFormData] = useState<any>({});
  const { addFuelLog, addServiceLog, addPartLog } = useAppData();
  const { motor } = useActiveMotor();
  const [isSaving, setIsSaving] = useState(false);

  if (!type) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const newKm = Number(formData.km || 0);
      
      if (motor && newKm > motor.currentKm) {
        const motorRef = doc(db, 'motors', motor.id);
        await setDoc(motorRef, { currentKm: newKm }, { merge: true });
      }

      if (type === 'bensin') {
        const amount = Number(formData.totalPrice || 0);
        await addFuelLog({
          date: formData.date || new Date().toISOString().split('T')[0],
          km: Number(formData.km || 0),
          fuelType: formData.fuelType || 'Pertamax',
          liters: Number(formData.liters || 0),
          totalPrice: amount,
          gasStation: formData.gasStation || 'SPBU Terdekat',
        });
      } else if (type === 'servis') {
        const amount = Number(formData.cost || 0);
        await addServiceLog({
          date: formData.date || new Date().toISOString().split('T')[0],
          km: Number(formData.km || 0),
          workshop: formData.workshop || 'Bengkel Resmi',
          serviceType: formData.serviceType || 'Servis Rutin',
          notes: formData.notes || '',
          cost: amount,
          isCompleted: true,
        });
      } else if (type === 'part') {
        const price = Number(formData.price || 0);
        const installCost = Number(formData.installCost || 0);
        await addPartLog({
          name: formData.name || 'Part Baru',
          brand: formData.brand || '-',
          price: price,
          installCost: installCost,
          date: formData.date || new Date().toISOString().split('T')[0],
          km: Number(formData.km || 0),
          warrantyMonths: Number(formData.warrantyMonths || 0),
        });
      }
      onClose();
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderBensinForm = () => (
    <>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Tanggal</label>
          <input type="date" name="date" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]/20" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Kilometer Saat Ini</label>
          <input type="number" name="km" placeholder="Contoh: 15250" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]/20" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Jenis Bahan Bakar</label>
          <select name="fuelType" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]/20">
            <option value="">Pilih Jenis</option>
            <option value="Pertalite">Pertalite</option>
            <option value="Pertamax">Pertamax</option>
            <option value="Pertamax Turbo">Pertamax Turbo</option>
            <option value="Shell Super">Shell Super</option>
            <option value="Shell V-Power">Shell V-Power</option>
          </select>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-500 mb-1">Liter</label>
            <input type="number" step="0.1" name="liters" placeholder="0.0" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]/20" />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-500 mb-1">Total Harga (Rp)</label>
            <input type="number" name="totalPrice" placeholder="0" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]/20" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Lokasi SPBU</label>
          <input type="text" name="gasStation" placeholder="Contoh: SPBU Pertamina 34.123.45" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]/20" />
        </div>
      </div>
    </>
  );

  const renderServisForm = () => (
    <>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Tanggal</label>
          <input type="date" name="date" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]/20" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Kilometer Saat Ini</label>
          <input type="number" name="km" placeholder="Contoh: 15250" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]/20" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Nama Bengkel</label>
          <input type="text" name="workshop" placeholder="Contoh: AHASS Kebon Jeruk" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]/20" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Jenis Servis</label>
          <select name="serviceType" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]/20">
            <option value="">Pilih Jenis</option>
            <option value="Servis Rutin">Servis Rutin</option>
            <option value="Servis Besar">Servis Besar</option>
            <option value="Ganti Oli Saja">Ganti Oli Saja</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Total Biaya (Rp)</label>
          <input type="number" name="cost" placeholder="0" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]/20" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Catatan</label>
          <input type="text" name="notes" placeholder="Contoh: Ganti oli mesin, CVT aman" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]/20" />
        </div>
      </div>
    </>
  );

  const renderPartForm = () => (
    <>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Tanggal</label>
          <input type="date" name="date" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]/20" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Kilometer Saat Ini</label>
          <input type="number" name="km" placeholder="Contoh: 15250" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]/20" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Nama Part</label>
          <input type="text" name="name" placeholder="Contoh: Kampas Rem Depan" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]/20" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Merek Part</label>
          <input type="text" name="brand" placeholder="Contoh: Honda Genuine Parts" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]/20" />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-500 mb-1">Harga Part (Rp)</label>
            <input type="number" name="price" placeholder="0" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]/20" />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-500 mb-1">Biaya Pasang (Rp)</label>
            <input type="number" name="installCost" placeholder="0" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]/20" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Garansi (Bulan)</label>
          <input type="number" name="warrantyMonths" placeholder="0" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]/20" />
        </div>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white overflow-hidden animate-in slide-in-from-bottom-full duration-300">
      <div className="bg-[#003399] p-4 text-white flex items-center justify-between shadow-md shrink-0">
        <h2 className="font-bold text-lg">
          {type === 'bensin' ? 'Isi Bensin' : type === 'servis' ? 'Catat Servis' : 'Ganti Part'}
        </h2>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 hide-scrollbar pb-28">
        {type === 'bensin' && renderBensinForm()}
        {type === 'servis' && renderServisForm()}
        {type === 'part' && renderPartForm()}
      </div>

      <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] shrink-0">
        <button 
          onClick={handleSave}
          className="w-full bg-[#1565C0] text-white font-bold py-3.5 rounded-xl shadow-[0_4px_12px_rgba(21,101,192,0.3)] active:scale-95 transition-transform"
        >
          Simpan Data
        </button>
      </div>
    </div>
  );
}
