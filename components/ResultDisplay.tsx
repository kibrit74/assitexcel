
import React, { useState } from 'react';
import type { FormulaResponse } from '../types';

const AnalysisIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
);
const FormulaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);
const GuideIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
);
const ExampleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);
const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);
const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
);
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);
const CorrectIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>;
const WandIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2 18l-2 4 4-2 16.36-16.36a1.21 1.21 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/></svg>;
const ThumbsUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M18.37 12.87a2 2 0 0 0-1.2-3.22l-4.03-1.42a2 2 0 0 0-2.25 1.16L9.36 12H7v10h12.1a2 2 0 0 0 1.98-2.32l-1.3-6.5a2 2 0 0 0-1.4-1.31Z"/></svg>;


interface CardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerActions?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, icon, children, className = '', headerActions }) => (
  <div className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 ${className}`}>
    <div className="flex items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-3">
        <div className="text-emerald-600">{icon}</div>
        <h3 className="text-xl font-bold text-slate-700">{title}</h3>
      </div>
       {headerActions && <div>{headerActions}</div>}
    </div>
    <div className="space-y-3 text-slate-600">{children}</div>
  </div>
);

interface ResultDisplayProps {
    result: FormulaResponse;
    onCorrectError: () => void;
    onTryLive: (formula: string) => void;
    livePreviewFormula: string | null;
    onConfirmFormula: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onCorrectError, onTryLive, livePreviewFormula, onConfirmFormula }) => {
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const isLivePreviewMode = livePreviewFormula === result.formula.code;

  const handleCopy = () => {
    navigator.clipboard.writeText(result.formula.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Formula Card */}
      <Card 
        title="Oluşturulan Formül" 
        icon={<FormulaIcon />} 
        className="lg:col-span-2"
        headerActions={
            <div className="flex items-center gap-2">
                 <button
                    onClick={() => {
                        onConfirmFormula();
                        setConfirmed(true);
                    }}
                    disabled={confirmed}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                        confirmed
                            ? 'text-slate-400 bg-slate-100 cursor-not-allowed'
                            : 'text-slate-500 hover:text-emerald-600 bg-slate-100 hover:bg-emerald-100'
                    }`}
                    aria-label="Bu formülün çalıştığını onayla ve kütüphaneye ekle"
                 >
                     {confirmed ? <CheckIcon /> : <ThumbsUpIcon />}
                     {confirmed ? 'Onaylandı' : 'Çalıştı & Onayla'}
                 </button>
                 <button
                    onClick={() => onTryLive(result.formula.code)}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                        isLivePreviewMode
                            ? 'text-white bg-emerald-600 hover:bg-emerald-700'
                            : 'text-slate-500 hover:text-emerald-600 bg-slate-100 hover:bg-emerald-100'
                    }`}
                    aria-label="Formülü veriniz üzerinde canlı deneyin"
                >
                    <WandIcon />
                    {isLivePreviewMode ? 'Önizlemeyi Kapat' : 'Verimde Dene'}
                </button>
                <button
                    onClick={onCorrectError}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-amber-600 bg-slate-100 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors"
                    aria-label="Formül hatasını düzelt"
                >
                    <CorrectIcon />
                    Hata Düzelt
                </button>
            </div>
        }
      >
        <div className="bg-slate-100 p-4 rounded-lg flex items-center justify-between font-mono text-sm text-slate-800">
          <code>{result.formula.code}</code>
          <button 
            onClick={handleCopy} 
            className="p-2 rounded-md bg-slate-200 hover:bg-slate-300 transition-colors"
            aria-label="Formülü kopyala"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>
        <p className="mt-3 text-slate-500 italic">📝 {result.formula.description}</p>
      </Card>
      
      {/* Analysis Card */}
      <Card title="Talep Analizi" icon={<AnalysisIcon />}>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <strong className="font-semibold text-slate-500">Kaynak:</strong> <span>{result.analysis.source}</span>
            <strong className="font-semibold text-slate-500">Hedef:</strong> <span>{result.analysis.target}</span>
            <strong className="font-semibold text-slate-500">İşlem Türü:</strong> <span>{result.analysis.type}</span>
            <strong className="font-semibold text-slate-500">Karmaşıklık:</strong> <span>{result.analysis.complexity}</span>
        </div>
      </Card>

      {/* Guide Card */}
      <Card title="Nasıl Kullanılır" icon={<GuideIcon />}>
        <ol className="list-decimal list-inside space-y-2">
          {result.guide.steps.map((step, index) => (
            <li key={index}><span className="font-semibold">{step.split(':')[0]}:</span>{step.split(':')[1]}</li>
          ))}
        </ol>
        {result.guide.tip && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-800">
            <span className="font-bold">💡 İpucu:</span> {result.guide.tip}
          </div>
        )}
      </Card>
      
      {/* Example Card */}
      {result.example && result.example.scenario && (
        <Card title="Örnek Kullanım" icon={<ExampleIcon />}>
          <p className="text-sm italic">"{result.example.scenario}"</p>
          <p className="mt-2 text-sm"><strong>Formül sonucu:</strong> <span className="font-mono bg-slate-100 px-2 py-1 rounded">{result.example.result}</span></p>
        </Card>
      )}

      {/* Warnings Card */}
      {result.warnings && result.warnings.length > 0 && result.warnings[0].error && (
        <Card title="⚠️ Dikkat Edilecekler" icon={<WarningIcon />} className="bg-amber-50 border-amber-200">
          <ul className="space-y-2 text-sm text-amber-900">
            {result.warnings.map((warning, index) => (
              <li key={index}>
                <strong className="font-bold">{warning.error}:</strong> {warning.solution}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};
