import React, { useState } from 'react';
import { ChevronLeft, FileText, Download, UploadCloud, Eye, MoreVertical, X, File, FileCheck } from 'lucide-react';

type DokumenViewProps = {
  onChangeTab: (tab: string) => void;
};

export default function DokumenView({ onChangeTab }: DokumenViewProps) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  const mockDocuments = [
    { id: 1, name: 'STNK Motor', type: 'PDF', size: '1.2 MB', date: '10 Mei 2026', status: 'verified', url: '#' },
    { id: 2, name: 'BPKB Motor', type: 'PDF', size: '2.5 MB', date: '10 Mei 2026', status: 'verified', url: '#' },
    { id: 3, name: 'Buku Servis', type: 'PDF', size: '4.8 MB', date: '12 Mei 2026', status: 'pending', url: '#' },
    { id: 4, name: 'Asuransi Kendaraan', type: 'PDF', size: '1.5 MB', date: '15 Jan 2026', status: 'verified', url: '#' },
  ];

  return (
    <div className="pb-24 font-sans bg-[#F8FAFC] dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-[#003399] dark:bg-gray-900 px-4 pt-12 pb-6 text-white sticky top-0 z-10 rounded-b-[24px] shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => onChangeTab('lainnya')} className="p-2 -ml-2 hover:bg-white/10 dark:hover:bg-gray-800/30 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Dokumen Kendaraan</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Upload Button */}
        <button 
          onClick={() => setShowUploadModal(true)}
          className="w-full bg-white dark:bg-gray-800 border-2 border-dashed border-[#003399]/30 dark:border-indigo-400/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-blue-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <div className="w-12 h-12 bg-blue-100 dark:bg-indigo-900/50 text-[#003399] dark:text-indigo-400 rounded-full flex items-center justify-center">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div className="text-center">
            <p className="text-gray-900 dark:text-white font-bold">Unggah Dokumen Baru</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Format PDF, JPG, atau PNG (Maks 10MB)</p>
          </div>
        </button>

        {/* Document List */}
        <div className="space-y-3 mt-6">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white px-1">Dokumen Tersimpan</h2>
          
          {mockDocuments.map((doc) => (
            <div key={doc.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-gray-100 dark:border-gray-700/50 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${doc.status === 'verified' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'}`}>
                {doc.status === 'verified' ? <FileCheck className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 dark:text-white text-[14px] truncate">{doc.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">{doc.type}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">{doc.size}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">{doc.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => setSelectedDoc(doc)} className="w-8 h-8 flex items-center justify-center text-[#003399] dark:text-indigo-400 bg-blue-50 dark:bg-indigo-900/20 hover:bg-blue-100 dark:hover:bg-indigo-900/40 rounded-full transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-full transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal (Simulation) */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowUploadModal(false)} />
          <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-sm overflow-hidden z-10 animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">Unggah Dokumen</h3>
              <button onClick={() => setShowUploadModal(false)} className="p-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-50 dark:bg-indigo-900/20 text-[#003399] dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <UploadCloud className="w-8 h-8" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">Pilih file dokumen dari perangkat Anda untuk disimpan dengan aman.</p>
              <button onClick={() => setShowUploadModal(false)} className="w-full bg-[#003399] dark:bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-[#002266] dark:hover:bg-indigo-700 transition-colors">
                Pilih File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Document Modal (Simulation) */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setSelectedDoc(null)} />
          <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-md overflow-hidden z-10 animate-in zoom-in-95 duration-200 flex flex-col h-[80vh]">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-indigo-900/30 text-[#003399] dark:text-indigo-400 rounded-full flex items-center justify-center">
                  <File className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">{selectedDoc.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{selectedDoc.size} • {selectedDoc.type}</p>
                </div>
              </div>
              <button onClick={() => setSelectedDoc(null)} className="p-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="flex-1 bg-gray-100 dark:bg-gray-950 flex flex-col items-center justify-center p-6 text-center">
              <FileText className="w-24 h-24 text-gray-300 dark:text-gray-700 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">Pratinjau dokumen tidak tersedia</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Silakan unduh dokumen untuk melihat isi selengkapnya.</p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700/50">
              <button 
                onClick={() => {
                  alert(`Mengunduh ${selectedDoc.name}...`);
                  setSelectedDoc(null);
                }} 
                className="w-full flex items-center justify-center gap-2 bg-[#003399] dark:bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-[#002266] dark:hover:bg-indigo-700 transition-colors"
              >
                <Download className="w-5 h-5" />
                Unduh {selectedDoc.type}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
