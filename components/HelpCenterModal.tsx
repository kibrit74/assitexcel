import React, { useState, useEffect, useMemo } from 'react';
import { helpContent } from '../data/helpContent';
import { SvgWrapper, StarIcon, SearchIcon } from './AnimatedSvgs';

interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}


interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onToggle }) => {
    return (
        <div className="border-b border-slate-200">
            <button
                className="w-full text-left py-4 px-2 flex justify-between items-center"
                onClick={onToggle}
            >
                <h3 className="font-bold text-emerald-700">{title}</h3>
                <svg className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isOpen && <div className="pb-4 px-2 space-y-4">{children}</div>}
        </div>
    );
};

const ContentRow: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-3 rounded-md bg-white border border-slate-200/80 ${className}`}>{children}</div>
);

const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
    <pre className="text-xs font-mono text-slate-700 bg-slate-100 p-3 rounded-lg overflow-auto w-full">
        <code>{code}</code>
    </pre>
);

export const HelpCenterModal: React.FC<HelpCenterModalProps> = ({ isOpen, onClose }) => {
    const [lightboxSvg, setLightboxSvg] = useState<React.ReactNode | null>(null);
    const [starredItems, setStarredItems] = useState<Set<string>>(new Set());
    const [starCounts, setStarCounts] = useState<{ [key: string]: number }>({});
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set());

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
          if (event.key === 'Escape' || event.key === 'Esc') {
            if (lightboxSvg) {
              setLightboxSvg(null);
            } else {
              onClose();
            }
          }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
          window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose, lightboxSvg]);

     useEffect(() => {
        if (!isOpen) return;
        try {
            const storedStarred = localStorage.getItem('excelHelperStarredItems');
            if (storedStarred) {
                setStarredItems(new Set(JSON.parse(storedStarred)));
            }

            const storedCounts = localStorage.getItem('excelHelperStarCounts');
            const initialCounts = helpContent.flatMap(g => g.examples).reduce((acc, ex) => {
                acc[ex.id] = ex.stars || 0;
                return acc;
            }, {} as { [key: string]: number });

            if (storedCounts) {
                const parsedCounts = JSON.parse(storedCounts);
                setStarCounts({ ...initialCounts, ...parsedCounts });
            } else {
                setStarCounts(initialCounts);
            }
        } catch (error) {
            console.error("Failed to load stars from localStorage", error);
        }
        setIsInitialLoad(false);
    }, [isOpen]);

    useEffect(() => {
        if (isInitialLoad || !isOpen) return;
        try {
            localStorage.setItem('excelHelperStarredItems', JSON.stringify(Array.from(starredItems)));
            localStorage.setItem('excelHelperStarCounts', JSON.stringify(starCounts));
        } catch (error) {
            console.error("Failed to save stars to localStorage", error);
        }
    }, [starredItems, starCounts, isInitialLoad, isOpen]);

    const handleStarClick = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newStarredItems = new Set(starredItems);
        const newStarCounts = { ...starCounts };

        if (newStarredItems.has(id)) {
            newStarredItems.delete(id);
            newStarCounts[id] = Math.max(0, (newStarCounts[id] || 1) - 1);
        } else {
            newStarredItems.add(id);
            newStarCounts[id] = (newStarCounts[id] || 0) + 1;
        }

        setStarredItems(newStarredItems);
        setStarCounts(newStarCounts);
    };
    
    const popularItems = useMemo(() => {
        return helpContent
            .flatMap(group => group.examples.map(example => ({
                ...example,
                stars: starCounts[example.id] || 0,
                isMacro: group.isMacro,
                isTool: group.isTool,
            })))
            .sort((a, b) => b.stars - a.stars)
            .slice(0, 10)
            .filter(item => item.stars > 0);
    }, [starCounts]);
    
    const filteredContent = useMemo(() => {
        if (!searchTerm.trim()) {
            return helpContent;
        }
        const lowercasedFilter = searchTerm.toLowerCase().trim();

        const results = helpContent.map(group => {
            const filteredExamples = group.examples.filter(example => 
                example.title.toLowerCase().includes(lowercasedFilter) ||
                example.description.toLowerCase().includes(lowercasedFilter) ||
                example.helpDescription.toLowerCase().includes(lowercasedFilter) ||
                example.prompt.toLowerCase().includes(lowercasedFilter) ||
                (example.code && example.code.toLowerCase().includes(lowercasedFilter))
            );
            return { ...group, examples: filteredExamples };
        });
        
        return results.filter(group => group.examples.length > 0);
    }, [searchTerm]);

    const popularItemsCategory = "⭐ Popüler Formüller ve Makrolar";
    
    useEffect(() => {
        if (!isOpen) {
            setOpenAccordions(new Set()); // Reset on close
            return;
        }
        
        const newOpenState = new Set<string>();
        if (searchTerm.trim()) {
            filteredContent.forEach(g => newOpenState.add(g.category));
        } else {
            if (popularItems.length > 0) {
                newOpenState.add(popularItemsCategory);
            }
        }
        setOpenAccordions(newOpenState);
    }, [searchTerm, filteredContent, popularItems, isOpen]);

    const toggleAccordion = (category: string) => {
        setOpenAccordions(prev => {
            const newSet = new Set(prev);
            if (newSet.has(category)) {
                newSet.delete(category);
            } else {
                newSet.add(category);
            }
            return newSet;
        });
    };

    if (!isOpen) return null;

    const ItemHeader: React.FC<{ item: any }> = ({ item }) => (
        <div className="flex justify-between items-start w-full">
            <h4 className="font-bold text-slate-800 pr-2">{item.title}</h4>
            <div className="flex items-center gap-1 text-slate-400 cursor-pointer flex-shrink-0">
                <StarIcon 
                    isFilled={starredItems.has(item.id)} 
                    onClick={(e) => handleStarClick(item.id, e)}
                    className="w-4 h-4 text-amber-400 hover:text-amber-500 transition-colors"
                />
                <span className="text-xs font-medium">{starCounts[item.id] || 0}</span>
            </div>
        </div>
    );

    const FormulaInfo: React.FC<{ formula: any }> = ({ formula }) => (
        <ContentRow>
            <div className="text-sm text-slate-700 space-y-2">
                <ItemHeader item={formula} />
                <p>{formula.helpDescription}</p>
                <p><strong className="font-semibold">Sözdizimi:</strong> <code className="text-xs bg-slate-100 p-1 rounded">{formula.syntax}</code></p>
                <p><strong className="font-semibold">Anlamı:</strong> <em className="italic">"{formula.syntaxExample}"</em></p>
            </div>
            <SvgWrapper onClick={() => setLightboxSvg(React.createElement(formula.svgComponent))}>
                {React.createElement(formula.svgComponent)}
            </SvgWrapper>
        </ContentRow>
    );

    const MacroInfo: React.FC<{ macro: any }> = ({ macro }) => (
         <div className="p-3 rounded-md bg-white border border-slate-200/80 space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="space-y-1">
                    <ItemHeader item={macro} />
                    <p className="text-xs text-slate-600 mt-1">{macro.helpDescription}</p>
                </div>
                <SvgWrapper onClick={() => setLightboxSvg(React.createElement(macro.svgComponent))}>
                    {React.createElement(macro.svgComponent)}
                </SvgWrapper>
            </div>
            {macro.code && <CodeBlock code={macro.code} />}
        </div>
    );

    const PowerQueryInfo: React.FC<{ item: any }> = ({ item }) => (
        <ContentRow>
            <div className="text-sm text-slate-700 space-y-2">
                <ItemHeader item={item} />
                <p>{item.helpDescription}</p>
                <ol className="list-decimal list-inside text-xs space-y-1">
                    {item.steps.map((step: string, index: number) => (
                         <li key={index} dangerouslySetInnerHTML={{__html: step}}/>
                    ))}
                </ol>
            </div>
            <SvgWrapper onClick={() => setLightboxSvg(React.createElement(item.svgComponent))}>
                {React.createElement(item.svgComponent)}
            </SvgWrapper>
        </ContentRow>
    );


    return (
        <>
            <div 
                className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
                onClick={onClose}
                role="dialog"
                aria-modal="true"
                aria-labelledby="help-title"
            >
                <div 
                    className="bg-slate-50 rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col"
                    onClick={e => e.stopPropagation()}
                >
                    <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4 flex justify-between items-center z-10 gap-4">
                        <h2 id="help-title" className="text-xl font-bold text-slate-800 flex items-center gap-2 flex-shrink-0">
                            📚 Excel Yardım Merkezi
                        </h2>
                        <div className="relative flex-grow max-w-lg">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <SearchIcon />
                            </div>
                            <input
                                type="text"
                                placeholder="Formül veya makro ara..."
                                className="w-full bg-slate-100 rounded-lg py-2 pl-10 pr-4 border-2 border-transparent focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                aria-label="Yardım merkezinde ara"
                            />
                        </div>
                        <button onClick={onClose} className="text-slate-500 hover:text-slate-800" aria-label="Kapat">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </header>
                    <div className="p-6 overflow-y-auto">
                        {popularItems.length > 0 && searchTerm.trim() === '' && (
                            <AccordionItem 
                                title={popularItemsCategory}
                                isOpen={openAccordions.has(popularItemsCategory)}
                                onToggle={() => toggleAccordion(popularItemsCategory)}
                            >
                                <div className="space-y-4">
                                    {popularItems.map(item => {
                                        if (item.isTool) {
                                            return <PowerQueryInfo key={item.id} item={item} />;
                                        } else if (item.isMacro) {
                                            return <MacroInfo key={item.id} macro={item} />;
                                        } else {
                                            return <FormulaInfo key={item.id} formula={item} />;
                                        }
                                    })}
                                </div>
                            </AccordionItem>
                        )}
                        {filteredContent.map(group => (
                             <AccordionItem 
                                key={group.category} 
                                title={group.category}
                                isOpen={openAccordions.has(group.category)}
                                onToggle={() => toggleAccordion(group.category)}
                            >
                               {group.isMacro && !group.isTool && (
                                   <div className="space-y-4">
                                      <ContentRow className="!block">
                                           <div className="text-sm text-slate-700 space-y-2">
                                                <h4 className="font-bold text-slate-800">Makrolara Giriş (VBA)</h4>
                                                <p>Makrolar, Excel'de sürekli yaptığınız sıkıcı ve tekrarlayan işleri tek bir tuşa basarak otomatik olarak yapmanızı sağlayan komutlardır. Tıpkı bir robota iş öğretmek gibidir.</p>
                                                <p><strong className="font-semibold">VBA Düzenleyicisi:</strong> Klavyeden <kbd className="px-1.5 py-0.5 text-xs font-semibold text-slate-800 bg-slate-200 border border-slate-300 rounded">Alt</kbd> + <kbd className="px-1.5 py-0.5 text-xs font-semibold text-slate-800 bg-slate-200 border border-slate-300 rounded">F11</kbd> tuşlarına basarak kod düzenleyicisini açabilirsiniz. Kodlar, `Modüller` altında saklanır.</p>
                                           </div>
                                      </ContentRow>
                                       <h5 className="font-semibold text-slate-600">Sık Kullanılan Makro Şablonları</h5>
                                        {group.examples.map(macro => <MacroInfo key={macro.id} macro={macro} />)}
                                   </div>
                               )}
                               {group.isTool && (
                                     group.examples.map(tool => <PowerQueryInfo key={tool.id} item={tool} />)
                               )}
                               {!group.isMacro && !group.isTool && group.examples.map(formula => <FormulaInfo key={formula.id} formula={formula} />)}
                            </AccordionItem>
                        ))}
                         {filteredContent.length === 0 && (
                            <div className="text-center py-10">
                                <p className="font-semibold text-slate-600">Aramanızla eşleşen sonuç bulunamadı.</p>
                                <p className="text-sm text-slate-500 mt-1">Lütfen farklı bir anahtar kelime deneyin.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {lightboxSvg && (
                <div 
                    className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 sm:p-8"
                    onClick={() => setLightboxSvg(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Görseli Büyüt"
                >
                    <div 
                        className="bg-white p-4 rounded-xl shadow-2xl w-full max-w-4xl"
                        onClick={e => e.stopPropagation()}
                    >
                         <svg width="100%" viewBox="0 0 200 150" className="bg-slate-50 rounded-lg">
                            {lightboxSvg}
                         </svg>
                    </div>
                     <button 
                        onClick={() => setLightboxSvg(null)} 
                        className="absolute top-4 right-4 text-white hover:text-slate-300" 
                        aria-label="Kapat"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
            )}
        </>
    );
};