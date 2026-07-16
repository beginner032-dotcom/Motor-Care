import React, { useState, useEffect } from 'react';
import { formatKm } from '../../mockData';
import { Edit2, Save, X, Plus } from 'lucide-react';
import { useActiveMotor } from '../../hooks/useActiveMotor';
import { addMotorToFirebase, MOTOR_COLLECTION } from '../../services/db';
import { useAuth } from '../../hooks/useAuth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function MotorView() {
  const { user } = useAuth();
  const { motor, mockMotors, changeMotor } = useActiveMotor();
  const [isEditing, setIsEditing] = useState(!motor);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(motor || {
    id: '',
    brand: 'Yamaha',
    type: 'NMAX',
    year: 2023,
    plate: 'B 1234 ABC',
    currentKm: 0,
    chassisNo: 'MH3...',
    engineNo: 'SG...'
  });

  useEffect(() => {
    if (motor) {
      setFormData({ ...motor });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [motor]);

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      if (motor) {
        // Update existing motor
        const motorRef = doc(db, MOTOR_COLLECTION, motor.id);
        await setDoc(motorRef, { ...motor, ...formData }, { merge: true });
      } else {
        // Add new motor
        await addMotorToFirebase(user.uid, formData);
      }
      setIsEditing(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (motor) {
      setFormData({ ...motor });
      setIsEditing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'currentKm' ? Number(value) : value
    }));
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-100 flex justify-between items-center sticky top-0 z-10">
        <h2 className="text-lg font-bold text-[#1F2937]">Data Motor</h2>
        {isEditing ? (
          <div className="flex gap-2">
            <button onClick={handleCancel} className="text-gray-500 bg-gray-50 p-2 rounded-lg" disabled={isSaving}>
              <X className="w-4 h-4" />
            </button>
            <button onClick={handleSave} className="text-white bg-[#1565C0] p-2 rounded-lg disabled:opacity-50" disabled={isSaving}>
              <Save className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-[#1565C0] bg-blue-50 p-2 rounded-lg">
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="p-3 space-y-3">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center">
           <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center shrink-0 mb-3 border border-gray-200">
             <span className="text-3xl">🏍️</span>
           </div>
           
           {isEditing ? (
             <div className="w-full space-y-2">
               <div className="flex gap-2">
                 <input 
                   type="text" 
                   name="brand"
                   value={formData.brand}
                   onChange={handleChange}
                   className="w-1/2 text-center text-sm font-bold text-gray-900 border-b border-gray-200 focus:outline-none focus:border-[#1565C0] pb-1"
                   placeholder="Merek"
                 />
                 <input 
                   type="text" 
                   name="type"
                   value={formData.type}
                   onChange={handleChange}
                   className="w-1/2 text-center text-sm font-bold text-gray-900 border-b border-gray-200 focus:outline-none focus:border-[#1565C0] pb-1"
                   placeholder="Tipe"
                 />
               </div>
               <div className="flex justify-center">
                 <input 
                   type="number" 
                   name="year"
                   value={formData.year || ''}
                   onChange={handleChange}
                   className="w-24 text-center text-xs text-gray-500 border-b border-gray-200 focus:outline-none focus:border-[#1565C0] pb-1"
                   placeholder="Tahun"
                 />
               </div>
               <div className="flex justify-center pt-1">
                 <input 
                   type="text" 
                   name="plate"
                   value={formData.plate}
                   onChange={handleChange}
                   className="w-32 text-center bg-blue-50 text-[#1565C0] text-[10px] font-semibold px-3 py-1.5 rounded-full border border-blue-100 focus:outline-none focus:ring-2 focus:ring-[#1565C0]/20 uppercase"
                   placeholder="Plat Nomor"
                 />
               </div>
             </div>
           ) : motor ? (
             <>
               <h2 className="text-sm font-bold text-gray-900">{motor.brand} {motor.type}</h2>
               <p className="text-xs text-gray-500 mb-2">Tahun {motor.year}</p>
               
               <div className="inline-block bg-[#1565C0] text-white text-[10px] font-semibold px-3 py-1 rounded-full shadow-sm uppercase">
                 {motor.plate}
               </div>
             </>
           ) : null}
        </div>

        {/* Details List */}
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden text-xs">
          <div className="p-3 border-b border-gray-50 flex justify-between items-center">
            <span className="font-bold uppercase text-gray-400 text-[10px]">Merek</span>
            {isEditing ? (
              <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="font-bold text-gray-900 focus:outline-none border-b border-[#1565C0] text-right" />
            ) : (
              <span className="font-bold text-gray-900">{motor?.brand}</span>
            )}
          </div>
          
          <div className="p-3 border-b border-gray-50 flex justify-between items-center">
            <span className="font-bold uppercase text-gray-400 text-[10px]">Tipe</span>
            {isEditing ? (
              <input type="text" name="type" value={formData.type} onChange={handleChange} className="font-bold text-gray-900 focus:outline-none border-b border-[#1565C0] text-right" />
            ) : (
              <span className="font-bold text-gray-900">{motor?.type}</span>
            )}
          </div>

          <div className="p-3 border-b border-gray-50 flex justify-between items-center">
            <span className="font-bold uppercase text-gray-400 text-[10px]">Nomor Rangka</span>
            {isEditing ? (
              <input type="text" name="chassisNo" value={formData.chassisNo} onChange={handleChange} className="font-mono font-bold text-gray-900 focus:outline-none border-b border-[#1565C0] text-right uppercase" />
            ) : (
              <span className="font-mono font-bold text-gray-900">{motor?.chassisNo}</span>
            )}
          </div>
          <div className="p-3 border-b border-gray-50 flex justify-between items-center">
            <span className="font-bold uppercase text-gray-400 text-[10px]">Nomor Mesin</span>
            {isEditing ? (
              <input type="text" name="engineNo" value={formData.engineNo} onChange={handleChange} className="font-mono font-bold text-gray-900 focus:outline-none border-b border-[#1565C0] text-right uppercase" />
            ) : (
              <span className="font-mono font-bold text-gray-900">{motor?.engineNo}</span>
            )}
          </div>
          <div className="p-3 flex justify-between items-center bg-blue-50/30">
            <span className="font-bold uppercase text-[#1565C0] text-[10px]">Kilometer Saat Ini</span>
            {isEditing ? (
              <div className="flex items-center gap-1">
                <input type="number" name="currentKm" value={formData.currentKm || ''} onChange={handleChange} className="w-24 font-bold text-[#1565C0] bg-transparent focus:outline-none border-b border-[#1565C0] text-sm text-right" />
                <span className="text-[#1565C0] text-sm font-bold">km</span>
              </div>
            ) : (
              <span className="font-bold text-[#1565C0] text-sm">{formatKm(motor?.currentKm || 0)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
