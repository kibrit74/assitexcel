import React, { useState, useMemo } from 'react';
import type { WebSearchResponse } from '../types';

// Icons
const WebSearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line></svg>;
const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
        <circle cx="10" cy="13" r="1" fill="#10b981" fillOpacity="0.8"/>
        <circle cx="14" cy="11" r="1" fill="#10b981" fillOpacity="0.8"/>
    </svg>
);
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const CorrectIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>;
const WandIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2 18l-2 4 4-2 16.36-16.36a1.21 1.21 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/></svg>;
const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.8"/>
        <path d="M12 16v-4" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="12" cy="8" r="1" fill="#10b981"/>
        <circle cx="12" cy="12" r="0.5" fill="#10b981" fillOpacity="0.6"/>
    </svg>
);
const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <g stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
        </g>
        <circle cx="16" cy="12" r="1.5" fill="#10b981" fillOpacity="0.7"/>
        <circle cx="8" cy="12" r="1.5" fill="#10b981" fillOpacity="0.7"/>
        <rect x="10" y="10" width="4" height="4" rx="1" fill="#10b981" fillOpacity="0.2"/>
    </svg>
);
const GuideIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.8"/>
        <path d="M12 16v-4" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="12" cy="8" r="1" fill="#10b981"/>
        <path d="M8 8l1 1M15 8l1 1" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
    </svg>
);
const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21.73 18l-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M12 9v4" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="12" cy="17" r="1" fill="#10b981"/>
    </svg>
);
const RobotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="8" width="16" height="12" rx="2" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.8"/>
        <path d="M12 8V4H8" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <g stroke="#10b981" strokeWidth="1.8" strokeLinecap="round">
            <path d="M2 14h2M20 14h2"/>
        </g>
        <g fill="#10b981">
            <circle cx="9" cy="13" r="1.5"/>
            <circle cx="15" cy="13" r="1.5"/>
            <rect x="10" y="16" width="4" height="1.5" rx="0.8"/>
        </g>
    </svg>
);


interface CardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, icon, children, className = '' }) => (
  <div className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 ${className}`}>
    <div className="flex items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-3">
        <div className="text-emerald-600">{icon}</div>
        <h3 className="text-xl font-bold text-slate-700">{title}</h3>
      </div>
    </div>
    <div className="space-y-3 text-slate-600 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: children as string }}></div>
  </div>
);

const extractCode = (codeBlock: string) => {
    const match = codeBlock.match(/^```(?:\w+)?\n([\s\S]*?)```$/);
    return match ? match[1].trim() : codeBlock;
};

const CodeBlockWithActions: React.FC<{ code: string; onTryLive: WebSearchResultDisplayProps['onTryLive']; livePreviewFormula: string | null; mode: 'formula' | 'macro' }> = ({ code, onTryLive, livePreviewFormula, mode }) => {
    const [copied, setCopied] = useState(false);
    const codeContent = extractCode(code);
    const isLive = livePreviewFormula === codeContent;

    const handleCopy = () => {
        navigator.clipboard.writeText(codeContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-slate-800 text-slate-100 p-4 my-4 rounded-lg font-mono text-sm relative not-prose">
            <pre className="overflow-x-auto pr-28"><code >{codeContent}</code></pre>
            <div className="absolute top-2 right-2 flex items-center gap-2">
                {mode === 'formula' && (
                    <button
                        onClick={() => onTryLive(codeContent)}
                        className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-md transition-colors ${
                            isLive
                                ? 'text-white bg-emerald-600 hover:bg-emerald-700'
                                : 'text-slate-200 bg-slate-700 hover:bg-slate-600'
                        }`}
                    >
                        <WandIcon />
                        {isLive ? 'Önizleme Aktif' : 'Verimde Dene'}
                    </button>
                )}
                <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors text-slate-200"
                    aria-label="Kodu kopyala"
                >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                </button>
            </div>
        </div>
    );
};

interface WebSearchResultDisplayProps {
    result: WebSearchResponse;
    onCorrectError: () => void;
    onTryLive: (formula: string | null) => void;
    livePreviewFormula: string | null;
    mode: 'formula' | 'macro';
}

export const WebSearchResultDisplay: React.FC<WebSearchResultDisplayProps> = (props) => {
    const { result, onCorrectError } = props;

    const parsedSections = useMemo(() => {
        const sections = new Map<string, string>();
        const regex = /###\s(.*?)\n([\s\S]*?)(?=\n###\s|$)/g;
        let match;
        while ((match = regex.exec(result.responseText)) !== null) {
            sections.set(match[1].trim(), match[2].trim());
        }
        return sections;
    }, [result.responseText]);

    const ICONS: { [key: string]: React.ReactNode } = {
        'Genel Bakış': <InfoIcon />,
        'Formül': <CodeIcon />,
        'VBA Kodu': <RobotIcon />,
        'Nasıl Kullanılır': <GuideIcon />,
        'Önemli Uyarılar': <WarningIcon />,
    };

    const sectionOrder = ['Genel Bakış', 'Formül', 'VBA Kodu', 'Nasıl Kullanılır', 'Önemli Uyarılar'];

    const renderSectionContent = (content: string) => {
        const codeBlockRegex = /(```[\w\s]*\n[\s\S]*?```)/g;
        const parts = content.split(codeBlockRegex).filter(part => part);

        return parts.map((part, index) => {
            if (codeBlockRegex.test(part)) {
                return <CodeBlockWithActions key={index} code={part} {...props} />;
            } else {
                 const sanitizedHtml = part
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;")
                    .replace(/\n/g, '<br />')
                    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-emerald-700 px-1 py-0.5 rounded text-sm">$1</code>');
                return <div key={index} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
            }
        });
    };
    
    return (
         <div className="space-y-6 mt-8">
             <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <WebSearchIcon /> Web Destekli Sonuç
                </h2>
                <button
                    onClick={onCorrectError}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-amber-600 bg-slate-100 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors"
                    aria-label="Sonuçtaki hatayı düzelt"
                >
                    <CorrectIcon />
                    Hata Düzelt
                </button>
            </div>
            
            {result.responseText.trim() === '' && <p className="animate-pulse">Yükleniyor...</p>}

            {sectionOrder.map(key => {
                if (parsedSections.has(key)) {
                    return (
                        <div key={key} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
                            <div className="flex items-center justify-between gap-3 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="text-emerald-600">{ICONS[key] || <InfoIcon />}</div>
                                    <h3 className="text-xl font-bold text-slate-700">{key}</h3>
                                </div>
                            </div>
                            <div className="space-y-3 text-slate-600 leading-relaxed">
                                {renderSectionContent(parsedSections.get(key)!)}
                            </div>
                        </div>
                    );
                }
                return null;
            })}

            {result.sources && result.sources.length > 0 && (
                 <Card title="Yararlanılan Kaynaklar" icon={<LinkIcon />}>
                     <ul className="space-y-2 text-sm">
                         {result.sources.map((source, index) => (
                             <li key={index} className="flex items-center">
                                 <a 
                                    href={source.uri} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-emerald-700 hover:text-emerald-800 hover:underline truncate"
                                    title={source.uri}
                                >
                                    {source.title || source.uri}
                                 </a>
                             </li>
                         ))}
                     </ul>
                 </Card>
            )}
        </div>
    );
};