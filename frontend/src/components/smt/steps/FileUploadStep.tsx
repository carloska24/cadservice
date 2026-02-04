'use client';

import { AlertCircle, Download, UploadCloud, FileText } from 'lucide-react';
import { SmtFormData } from '../types';

interface FileUploadStepProps {
  formData: SmtFormData;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void;
}

export function FileUploadStep({ formData, onFileChange, onFileRemove }: FileUploadStepProps & { onFileRemove: (fieldName: string) => void }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      
      <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex gap-3 items-start">
        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
        <div className="text-sm text-amber-900">
          <strong>Arquivos aceleram sua cotação.</strong> Upload opcional, mas recomendado para análise DFM precisa.
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <a
          href="/downloads/bom-template.csv"
          download="CADService-BOM-Template.csv"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
        >
          <Download className="w-4 h-4" />
          Baixar Template BOM (.csv)
        </a>
      </div>

      {/* BOM Upload */}
      <div>
        <label className="block text-sm font-bold text-slate-900 mb-2">
          BOM (Bill of Materials)
        </label>
        <div className="relative">
          <label className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-colors cursor-pointer group ${formData.bomFile ? 'border-green-300 bg-green-50' : 'border-slate-300 hover:bg-slate-50 hover:border-blue-400'}`}>
            <input 
              type="file" 
              accept=".xlsx,.xls,.csv"
              onChange={(e) => {
                onFileChange(e, 'bomFile');
                e.target.value = ''; // Reset input to allow re-selection
              }}
              className="hidden"
              disabled={!!formData.bomFile}
            />
            <UploadCloud className={`w-8 h-8 mb-2 transition-colors ${formData.bomFile ? 'text-green-500' : 'text-slate-400 group-hover:text-blue-500'}`} />
            {formData.bomFile ? (
              <span className="text-sm font-medium text-green-700">{formData.bomFile.name}</span>
            ) : (
              <>
                <span className="text-sm font-medium text-slate-700">Arraste ou clique para upload</span>
                <span className="text-xs text-slate-500 mt-1">.xlsx, .xls ou .csv</span>
              </>
            )}
          </label>
          {formData.bomFile && (
            <button
              onClick={() => onFileRemove('bomFile')}
              className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors z-10"
              title="Remover arquivo"
            >
              <FileText className="w-4 h-4" /> 
              {/* Changed icon to avoid confusion, or use X from lucide-react if imported */}
            </button>
          )}
        </div>
      </div>

      {/* Gerber Upload */}
      <div>
        <label className="block text-sm font-bold text-slate-900 mb-2">
          Gerber Files
        </label>
        <div className="relative">
          <label className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-colors cursor-pointer group ${formData.gerberFile ? 'border-green-300 bg-green-50' : 'border-slate-300 hover:bg-slate-50 hover:border-blue-400'}`}>
            <input 
              type="file" 
              accept=".zip,.rar"
              onChange={(e) => {
                onFileChange(e, 'gerberFile');
                e.target.value = '';
              }}
              className="hidden"
              disabled={!!formData.gerberFile}
            />
            <UploadCloud className={`w-8 h-8 mb-2 transition-colors ${formData.gerberFile ? 'text-green-500' : 'text-slate-400 group-hover:text-blue-500'}`} />
            {formData.gerberFile ? (
              <span className="text-sm font-medium text-green-700">{formData.gerberFile.name}</span>
            ) : (
              <>
                <span className="text-sm font-medium text-slate-700">Arraste ou clique para upload</span>
                <span className="text-xs text-slate-500 mt-1">.zip contendo todos os layers</span>
              </>
            )}
          </label>
          {formData.gerberFile && (
            <button
              onClick={() => onFileRemove('gerberFile')}
              className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors z-10"
              title="Remover arquivo"
            >
              <FileText className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Pick & Place (Optional) */}
      <div>
        <label className="block text-sm font-bold text-slate-900 mb-2">
          Pick & Place / Centroid <span className="text-slate-400 font-normal">(opcional)</span>
        </label>
        <div className="relative">
          <label className={`border-2 border-dashed rounded-xl p-4 flex items-center gap-4 transition-colors cursor-pointer group ${formData.pickPlaceFile ? 'border-green-300 bg-green-50' : 'border-slate-200 hover:bg-slate-50 hover:border-blue-400'}`}>
            <input 
              type="file" 
              accept=".csv,.xlsx,.txt"
              onChange={(e) => {
                onFileChange(e, 'pickPlaceFile');
                e.target.value = '';
              }}
              className="hidden"
              disabled={!!formData.pickPlaceFile}
            />
            <UploadCloud className={`w-6 h-6 transition-colors ${formData.pickPlaceFile ? 'text-green-500' : 'text-slate-400 group-hover:text-blue-500'}`} />
            {formData.pickPlaceFile ? (
              <span className="text-sm font-medium text-green-700">{formData.pickPlaceFile.name}</span>
            ) : (
              <span className="text-sm text-slate-600">Arquivo .csv ou .xlsx com coordenadas XY</span>
            )}
          </label>
          {formData.pickPlaceFile && (
            <button
              onClick={() => onFileRemove('pickPlaceFile')}
              className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors z-10"
              title="Remover arquivo"
            >
              <FileText className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Additional ODB++ support */}
      <div>
          <label className="block text-sm font-bold text-slate-900 mb-2">
            ODB++ <span className="text-slate-400 font-normal">(opcional)</span>
          </label>
          <div className="relative">
            <label className={`border-2 border-dashed rounded-xl p-4 flex items-center gap-4 transition-colors cursor-pointer group ${formData.odbFile ? 'border-green-300 bg-green-50' : 'border-slate-200 hover:bg-slate-50 hover:border-blue-400'}`}>
              <input 
                type="file" 
                accept=".zip,.tgz"
                onChange={(e) => {
                  onFileChange(e, 'odbFile');
                  e.target.value = '';
                }}
                className="hidden"
                disabled={!!formData.odbFile}
              />
              <UploadCloud className={`w-6 h-6 transition-colors ${formData.odbFile ? 'text-green-500' : 'text-slate-400 group-hover:text-blue-500'}`} />
              {formData.odbFile ? (
                <span className="text-sm font-medium text-green-700">{formData.odbFile.name}</span>
              ) : (
                <span className="text-sm text-slate-600">Formato inteligente ODB++ (.zip, .tgz)</span>
              )}
            </label>
            {formData.odbFile && (
              <button
                onClick={() => onFileRemove('odbFile')}
                className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors z-10"
                title="Remover arquivo"
              >
                <FileText className="w-4 h-4" />
              </button>
            )}
          </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
        <a 
          href="/downloads/bom-template.xlsx" 
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <Download className="w-4 h-4" />
          Template BOM (.xlsx)
        </a>
        <a 
          href="#" 
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <FileText className="w-4 h-4" />
          Guia de Preparação de Arquivos
        </a>
      </div>
    </div>
  );
}
