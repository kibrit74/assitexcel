
import React, { useEffect } from 'react';
import { SvgWrapper } from './AnimatedSvgs';

interface ExampleDetailModalProps {
  example: any | null;
  onClose: () => void;
  onUse: (example: any, isMacro: boolean) => void;
}

const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
    <pre className="text-xs font-mono text-slate-700 bg-slate-100 p-3 rounded-lg overflow-auto w-full">
        <code>{code}</code>
    </pre>
);

export const ExampleDetailModal: React.FC<ExampleDetailModalProps> = ({ example, onClose, onUse }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!example) return null;
  
  const SvgComponent = example.svgComponent;

  return (
    <div 
        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="example-title"
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4 flex justify-between items-center z-10">
          <h2 id="example-title" className="text-xl font-bold text-slate-800">
            {example.title}
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800" aria-label="Kapat">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </header>
        <div className="p-6 overflow-y-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                 <div className="text-sm text-slate-700 space-y-3">
                    <p>{example.helpDescription}</p>
                    {example.syntax && (
                         <p><strong className="font-semibold">Sözdizimi:</strong> <code className="text-xs bg-slate-100 p-1 rounded">{example.syntax}</code></p>
                    )}
                    {example.syntaxExample && (
                        <p><strong className="font-semibold">Anlamı:</strong> <em className="italic">"{example.syntaxExample}"</em></p>
                    )}
                    {example.code && (
                        <div>
                             <p className="font-semibold mb-1">Örnek Makro Kodu:</p>
                             <CodeBlock code={example.code} />
                        </div>
                    )}
                </div>
                 <div className="w-full h-full min-h-[250px]">
                    <SvgWrapper onClick={() => {}}>
                        <SvgComponent />
                    </SvgWrapper>
                 </div>
             </div>
        </div>
         <footer className="border-t border-slate-200 p-4 flex justify-end">
            <button 
                onClick={() => onUse(example, example.isMacro)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
                Bu Örneği Kullan
            </button>
        </footer>
      </div>
    </div>
  );
};
