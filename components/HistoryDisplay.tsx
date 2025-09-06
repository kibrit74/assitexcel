
import React from 'react';
import type { AppResult, HistoryItem } from '../types';

interface HistoryDisplayProps {
  history: HistoryItem[];
  onSelect: (result: AppResult) => void;
  onClear: () => void;
}

const HistoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);

const FormulaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>;
const MacroIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="12" height="12" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"></path></svg>;
const WebSearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line></svg>;


export const HistoryDisplay: React.FC<HistoryDisplayProps> = ({ history, onSelect, onClear }) => {
  if (history.length === 0) {
    return null;
  }

  const getHistoryDetails = (item: HistoryItem) => {
    switch(item.result.type) {
        case 'formula':
            return {
                icon: <FormulaIcon />,
                details: item.result.data.formula.code,
            };
        case 'macro':
            return {
                icon: <MacroIcon />,
                details: item.result.data.title,
            };
        case 'web_search':
             return {
                icon: <WebSearchIcon />,
                details: "🌐 Web Destekli Sonuç",
            };
        default:
             return {
                icon: <FormulaIcon />,
                details: "Bilinmeyen sonuç türü",
            };
    }
  };


  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 h-fit sticky top-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
            <div className="text-emerald-600"><HistoryIcon /></div>
            <h3 className="text-xl font-bold text-slate-700">Geçmiş</h3>
        </div>
        <button 
          onClick={onClear}
          className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors"
          aria-label="Geçmişi temizle"
        >
          <TrashIcon />
          Temizle
        </button>
      </div>
      <div className="space-y-2 max-h-[30rem] overflow-y-auto pr-2">
        {history.map((item, index) => {
          const details = getHistoryDetails(item);
          return (
          <button
            key={index}
            onClick={() => onSelect(item.result)}
            className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-transparent transition-all"
            aria-label={`'${item.prompt}' istemi için sonucu görüntüle`}
          >
            <p className="text-sm text-slate-800 font-medium truncate flex items-center gap-2" title={item.prompt}>
              <span className="text-emerald-600 flex-shrink-0">{details.icon}</span>
              <span className="truncate">{item.prompt}</span>
            </p>
            <p className="text-xs text-slate-500 font-mono mt-1 truncate pl-6">
              {details.details}
            </p>
          </button>
        )})}
      </div>
    </div>
  );
};