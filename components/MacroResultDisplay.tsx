import React, { useState } from 'react';
import type { MacroResponse } from '../types';

// Icons
const RobotIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>;
const GuideIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>;
const WarningIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const CorrectIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>;


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

interface MacroResultDisplayProps {
    result: MacroResponse;
    onCorrectError: () => void;
}

export const MacroResultDisplay: React.FC<MacroResultDisplayProps> = ({ result, onCorrectError }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderPlacementNotice = () => {
    if (!result.usage.placement || result.usage.placement === 'standard') {
      return null;
    }
    
    let noticeText = '';
    if (result.usage.placement === 'worksheet') {
      noticeText = `Bu bir olay makrosudur ve '${result.usage.worksheet_name || 'ilgili'}' sayfasının kendi kod bölümüne yapıştırılmalıdır.`;
    } else if (result.usage.placement === 'workbook') {
      noticeText = `Bu bir olay makrosudur ve 'ThisWorkbook' kod bölümüne yapıştırılmalıdır.`;
    }

    return (
      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 mb-4">
        <span className="font-bold">📍 Yerleşim Notu:</span> {noticeText} Standart bir modüle yapıştırmayın.
      </div>
    );
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <Card 
        title={result.title} 
        icon={<RobotIcon />} 
        className="lg:col-span-2"
        headerActions={
            <button
                onClick={onCorrectError}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-amber-600 bg-slate-100 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors"
                aria-label="Makro hatasını düzelt"
            >
                <CorrectIcon />
                Hata Düzelt
            </button>
        }
      >
        <p className="mb-4 text-slate-500 italic">📝 {result.description}</p>
        <div className="relative bg-slate-800 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <button 
            onClick={handleCopy} 
            className="absolute top-2 right-2 p-2 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors"
            aria-label="Makro kodunu kopyala"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
          <pre className="overflow-x-auto"><code>{result.code}</code></pre>
        </div>
      </Card>
      
      <Card title="Nasıl Kullanılır" icon={<GuideIcon />}>
        {renderPlacementNotice()}
        <ol className="list-decimal list-inside space-y-2 text-sm">
           {result.usage.steps.map((step, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: step.replace(/`([^`]+)`/g, '<kbd class="px-1.5 py-0.5 text-xs font-semibold text-slate-800 bg-slate-200 border border-slate-300 rounded">$1</kbd>') }} />
          ))}
        </ol>
        {result.usage.tip && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-800">
            <span className="font-bold">💡 İpucu:</span> {result.usage.tip}
          </div>
        )}
      </Card>

      {result.warnings && result.warnings.length > 0 && (
        <Card title="⚠️ Önemli Uyarılar" icon={<WarningIcon />} className="bg-amber-50 border-amber-200">
          <ul className="space-y-2 text-sm text-amber-900">
            {result.warnings.map((warning, index) => (
              <li key={index}>
                <strong className="font-bold">{warning.title}:</strong> {warning.details}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};