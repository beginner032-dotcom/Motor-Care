import React, { useState } from 'react';
import { Fuel, Wrench, Settings, X, ChevronRight } from 'lucide-react';

type AddActionMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (action: 'bensin' | 'servis' | 'part') => void;
};

export default function AddActionMenu({ isOpen, onClose, onSelectAction }: AddActionMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="absolute inset-0 bg-black/40 z-40 transition-opacity"
        onClick={onClose}
      />
      <div className="absolute bottom-[130px] right-3 z-50 flex flex-col gap-3 items-end">
        <button 
          onClick={() => { onSelectAction('part'); onClose(); }}
          className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-lg active:scale-95 transition-transform"
        >
          <span className="font-semibold text-sm text-gray-700">Ganti Part</span>
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#2563EB]">
            <Settings className="w-5 h-5" />
          </div>
        </button>
        <button 
          onClick={() => { onSelectAction('servis'); onClose(); }}
          className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-lg active:scale-95 transition-transform"
        >
          <span className="font-semibold text-sm text-gray-700">Catat Servis</span>
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#003399]">
            <Wrench className="w-5 h-5" />
          </div>
        </button>
        <button 
          onClick={() => { onSelectAction('bensin'); onClose(); }}
          className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-lg active:scale-95 transition-transform"
        >
          <span className="font-semibold text-sm text-gray-700">Isi Bensin</span>
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#059669]">
            <Fuel className="w-5 h-5" />
          </div>
        </button>
      </div>
    </>
  );
}
