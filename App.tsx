
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import type { WorkbookData, ColumnAnalysis, AppResult, HistoryItem } from './types';
import { generateFormula, analyzeExcelData, generateMacro, generateWebSearchStream, calculateFormula } from './services/geminiService';
import { ResultDisplay } from './components/ResultDisplay';
import { MacroResultDisplay } from './components/MacroResultDisplay';
import { WebSearchResultDisplay } from './components/WebSearchResultDisplay';
import { HistoryDisplay } from './components/HistoryDisplay';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { HelpCenterModal } from './components/HelpCenterModal';
import { ExampleDetailModal } from './components/ExampleDetailModal';
import { helpContent } from './data/helpContent';


declare const XLSX: any;

// --- ICONS ---
const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
);
const ExcelIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M10 15l-2.5 2.5M7.5 15l2.5 2.5M16.5 15l-2.5 2.5M14 15l2.5 2.5"/></svg>
);
const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1a2.5 2.5 0 0 1-2.5 2.5h-1A2.5 2.5 0 0 1 6 5.5v-1A2.5 2.5 0 0 1 8.5 2h1Z"></path><path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v1a2.5 2.5 0 0 1-2.5 2.5h-1a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 12.5 2h2Z"></path><path d="M6 10a2.5 2.5 0 0 1 2.5 2.5v1A2.5 2.5 0 0 1 6 16H5a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 5 10h1Z"></path><path d="M18 10a2.5 2.5 0 0 1 2.5 2.5v1a2.5 2.5 0 0 1-2.5 2.5h-1a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 15 10h1Z"></path><path d="M12 15a2.5 2.5 0 0 1 2.5 2.5v1a2.5 2.5 0 0 1-2.5 2.5h-1a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 10 15h2Z"></path><path d="M9.5 8.5a2.5 2.5 0 0 0 0 5"></path><path d="M14.5 8.5a2.5 2.5 0 0 1 0 5"></path><path d="M12 8V6.5"></path><path d="M12 17.5V16"></path></svg>
);
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
const KeyboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 8h10" />
        <path d="M7 12h10" />
        <path d="M7 16h6" />
    </svg>
);
const BookOpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
);
const SheetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
);
const AttachmentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.59a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>;
const XCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>;
const SpinnerIcon = () => (
    <svg className="animate-spin h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


const generateColumnHeaders = (count: number): string[] => {
    const headers: string[] = [];
    if (count === 0) return [];
    for (let i = 0; i < count; i++) {
        let header = '';
        let temp = i;
        do {
            header = String.fromCharCode(65 + (temp % 26)) + header;
            temp = Math.floor(temp / 26) - 1;
        } while (temp >= 0);
        headers.push(header);
    }
    return headers;
};

const getColumnLetter = (colIndex: number): string => {
    let header = '';
    let temp = colIndex;
    do {
        header = String.fromCharCode(65 + (temp % 26)) + header;
        temp = Math.floor(temp / 26) - 1;
    } while (temp >= 0);
    return header;
};

const formatCellValue = (cell: any): string => {
    if (cell instanceof Date) {
        const day = String(cell.getDate()).padStart(2, '0');
        const month = String(cell.getMonth() + 1).padStart(2, '0');
        const year = cell.getFullYear();
        return `${day}.${month}.${year}`;
    }
    if (cell === null || cell === undefined) {
        return '';
    }
    return String(cell);
};


const App: React.FC = () => {
    const [workbookData, setWorkbookData] = useState<WorkbookData | null>(null);
    const [activeSheet, setActiveSheet] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const [userPrompt, setUserPrompt] = useState<string>('');
    const [mode, setMode] = useState<'formula' | 'macro'>('formula');
    const [excelLanguage, setExcelLanguage] = useState<'tr' | 'en'>('tr');
    const [excelVersion, setExcelVersion] = useState<string>('365');
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [analysisResult, setAnalysisResult] = useState<ColumnAnalysis[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [result, setResult] = useState<AppResult | null>(null);
    const promptTextareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);
    const [isHelpCenterModalOpen, setIsHelpCenterModalOpen] = useState(false);
    const [useWebSearch, setUseWebSearch] = useState(false);
    const [openExampleGroup, setOpenExampleGroup] = useState<string | null>(null);
    const [selectedExample, setSelectedExample] = useState<any | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [lastPrompt, setLastPrompt] = useState<string>('');
    const [selection, setSelection] = useState<{ start: { row: number, col: number } | null, end: { row: number, col: number } | null }>({ start: null, end: null });
    const [isSelecting, setIsSelecting] = useState<boolean>(false);
    const [livePreviewFormula, setLivePreviewFormula] = useState<string | null>(null);
    const [liveFormulaCell, setLiveFormulaCell] = useState<{ sheet: string, row: number, col: number, value: string, isLoading: boolean } | null>(null);
    const [selectionMode, setSelectionMode] = useState<'cell' | 'row' | 'column'>('cell');
    const abortControllerRef = useRef<AbortController | null>(null);
    const [trustedFormulaLibrary, setTrustedFormulaLibrary] = useState<{ prompt: string; formula: string }[]>([]);


    const PlusCircleIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
    );

    useEffect(() => {
        try {
            const storedHistory = localStorage.getItem('formulaHistory');
            if (storedHistory) {
                const parsedHistory = JSON.parse(storedHistory);
                 if (Array.isArray(parsedHistory)) {
                   setHistory(parsedHistory);
                }
            }
        } catch (error) {
            console.error("Geçmiş localStorage'dan yüklenemedi", error);
            setHistory([]);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('formulaHistory', JSON.stringify(history));
        } catch (error) {
            console.error("Geçmiş localStorage'a kaydedilemedi", error);
        }
    }, [history]);

     useEffect(() => {
        const textarea = promptTextareaRef.current;
        if (textarea) {
            textarea.addEventListener('paste', handlePaste);
        }
        return () => {
            if (textarea) {
                textarea.removeEventListener('paste', handlePaste);
            }
        };
    }, [promptTextareaRef.current]);

    useEffect(() => {
        try {
            const storedLibrary = localStorage.getItem('trustedFormulaLibrary');
            if (storedLibrary) {
                const parsedLibrary = JSON.parse(storedLibrary);
                 if (Array.isArray(parsedLibrary)) {
                   setTrustedFormulaLibrary(parsedLibrary);
                }
            }
        } catch (error) {
            console.error("Güvenilir formül kütüphanesi localStorage'dan yüklenemedi", error);
            setTrustedFormulaLibrary([]);
        }
    }, []);

    useEffect(() => {
        if (trustedFormulaLibrary.length > 0) {
            try {
                localStorage.setItem('trustedFormulaLibrary', JSON.stringify(trustedFormulaLibrary));
            } catch (error) {
                console.error("Güvenilir formül kütüphanesi localStorage'a kaydedilemedi", error);
            }
        }
    }, [trustedFormulaLibrary]);

    const handleConfirmFormula = (prompt: string, formula: string) => {
        setTrustedFormulaLibrary(prev => {
            if (prev.some(item => item.formula === formula && item.prompt === prompt)) {
                return prev;
            }
            const newItem = { prompt, formula };
            const newLibrary = [newItem, ...prev].slice(0, 50); // Keep library size reasonable
            return newLibrary;
        });
    };

    const handleToggleLivePreview = (formula: string | null) => {
        setLivePreviewFormula(prev => {
            const newFormula = prev === formula || formula === null ? null : formula;
            if (newFormula === null) {
                setLiveFormulaCell(null);
            }
            return newFormula;
        });
    };

    const handleCellClickForPreview = async (rowIndex: number, colIndex: number) => {
        if (!livePreviewFormula || !workbookData || !activeSheet) return;
    
        const originalFormula = livePreviewFormula;
        let previewValue = originalFormula;
    
        const baseRowMatch = originalFormula.match(/[A-Z]+(\d+)/);
    
        if (baseRowMatch) {
            const baseRow = parseInt(baseRowMatch[1], 10);
            const targetRow = rowIndex + 1;
            const offset = targetRow - baseRow;
    
            if (offset !== 0) {
                const regex = /([$]?[A-Z]+)([$]?)(\d+)/g;
                previewValue = originalFormula.replace(regex, (match, colPart, rowAbsPart, rowNumPart) => {
                    if (rowAbsPart === '$') {
                        return match;
                    }
                    const originalRowNum = parseInt(rowNumPart, 10);
                    const newRowNum = originalRowNum + offset;
                    return `${colPart}${newRowNum > 0 ? newRowNum : 1}`;
                });
            }
        }
        const adjustedFormula = previewValue;
    
        setLiveFormulaCell({
            sheet: activeSheet,
            row: rowIndex,
            col: colIndex,
            value: '',
            isLoading: true,
        });
    
        try {
            const currentRowData = workbookData[activeSheet]?.[rowIndex];
            if (!currentRowData) throw new Error("Current row data not found.");
    
            const calculatedValue = await calculateFormula(
                adjustedFormula,
                currentRowData,
                rowIndex,
                workbookData,
                columnHeaders,
                excelLanguage
            );
    
            setLiveFormulaCell({
                sheet: activeSheet,
                row: rowIndex,
                col: colIndex,
                value: calculatedValue,
                isLoading: false,
            });
        } catch (err) {
            console.error("Error calculating formula preview:", err);
            setLiveFormulaCell({
                sheet: activeSheet,
                row: rowIndex,
                col: colIndex,
                value: '#HESAPLAMA_HATASI!',
                isLoading: false,
            });
        }
    };

    const handleCellMouseDown = (rowIndex: number, colIndex: number) => {
        if (livePreviewFormula) {
            handleCellClickForPreview(rowIndex, colIndex);
        } else {
            handleMouseDownOnTable(rowIndex, colIndex);
        }
    };

    const handleMouseDownOnTable = (rowIndex: number, colIndex: number) => {
        setIsSelecting(true);
        setSelectionMode('cell');
        setSelection({ start: { row: rowIndex, col: colIndex }, end: { row: rowIndex, col: colIndex } });
    };

    const handleMouseOverTable = (rowIndex: number, colIndex: number) => {
        if (isSelecting && selectionMode === 'cell') {
            setSelection(prev => ({ ...prev, end: { row: rowIndex, col: colIndex } }));
        }
    };

    const handleRowHeaderMouseDown = (rowIndex: number) => {
        setIsSelecting(true);
        setSelectionMode('row');
        setSelection({
            start: { row: rowIndex, col: 0 },
            end: { row: rowIndex, col: sheetData.colCount - 1 }
        });
    };

    const handleRowHeaderMouseOver = (rowIndex: number) => {
        if (isSelecting && selectionMode === 'row' && selection.start) {
            setSelection(prev => ({ ...prev, end: { row: rowIndex, col: sheetData.colCount - 1 } }));
        }
    };
    
    const handleColumnHeaderMouseDown = (colIndex: number) => {
        setIsSelecting(true);
        setSelectionMode('column');
        setSelection({
            start: { row: 0, col: colIndex },
            end: { row: sheetData.rows.length - 1, col: colIndex }
        });
    };
    
    const handleColumnHeaderMouseOver = (colIndex: number) => {
        if (isSelecting && selectionMode === 'column' && selection.start) {
            setSelection(prev => ({ ...prev, end: { row: sheetData.rows.length - 1, col: colIndex } }));
        }
    };

    const handleSelectionEnd = useCallback(() => {
        if (!isSelecting || !selection.start || !selection.end) {
            setIsSelecting(false);
            return;
        }

        const { start, end } = selection;

        const minRow = Math.min(start.row, end.row);
        const maxRow = Math.max(start.row, end.row);
        const minCol = Math.min(start.col, end.col);
        const maxCol = Math.max(start.col, end.col);
        
        let rangeString = '';

        if (selectionMode === 'column') {
            const startColLetter = getColumnLetter(minCol);
            const endColLetter = getColumnLetter(maxCol);
            rangeString = startColLetter;
            if (startColLetter !== endColLetter) {
                rangeString += `:${endColLetter}`;
            }
        } else if (selectionMode === 'row') {
            const startRow = minRow + 1;
            const endRow = maxRow + 1;
            rangeString = `${startRow}`;
            if (startRow !== endRow) {
                rangeString += `:${endRow}`;
            }
        } else { // 'cell' mode
            const startCell = `${getColumnLetter(minCol)}${minRow + 1}`;
            const endCell = `${getColumnLetter(maxCol)}${maxRow + 1}`;
            rangeString = startCell;
            if (startCell !== endCell) {
                rangeString = `${startCell}:${endCell}`;
            }
        }

        const quotedSheetName = activeSheet.includes(' ') ? `'${activeSheet}'` : activeSheet;
        const textToAppend = `${quotedSheetName}!${rangeString}`;
        
        setUserPrompt(prev => prev ? `${prev.trim()} ${textToAppend} ` : `${textToAppend} `);
        promptTextareaRef.current?.focus();

        setIsSelecting(false);
        setSelection({ start: null, end: null });
    }, [selection, activeSheet, isSelecting, selectionMode]);

    useEffect(() => {
        const handleGlobalMouseUp = () => {
            if (isSelecting) {
                handleSelectionEnd();
            }
        };

        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isSelecting, handleSelectionEnd]);
    
    const isCellSelected = (rowIndex: number, colIndex: number): boolean => {
        if (!selection.start || !selection.end) return false;
        
        const minRow = Math.min(selection.start.row, selection.end.row);
        const maxRow = Math.max(selection.start.row, selection.end.row);
        const minCol = Math.min(selection.start.col, selection.end.col);
        const maxCol = Math.max(selection.start.col, selection.end.col);

        return rowIndex >= minRow && rowIndex <= maxRow && colIndex >= minCol && colIndex <= maxCol;
    };


    const performAnalysis = async (data: WorkbookData) => {
        setIsAnalyzing(true);
        setAnalysisResult(null);
        setError('');
        setResult(null);
        setUserPrompt('');
        try {
            const analysis = await analyzeExcelData(data);
            setAnalysisResult(analysis);
        } catch (err: any) {
            setError(err.message || 'Veri analizi sırasında bilinmeyen bir hata oluştu.');
            setWorkbookData(null); 
            setFileName('');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleImageUpload = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result as string;
                setImage(dataUrl);
                setImagePreview(dataUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setError('');
            setResult(null);
            setAnalysisResult(null);
            setWorkbookData(null);
            setActiveSheet('');

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target?.result as ArrayBuffer);
                    const workbook = XLSX.read(data, { type: 'array', cellDates: true });
                    
                    const loadedData: WorkbookData = {};
                    workbook.SheetNames.forEach((sheetName: string) => {
                        const worksheet = workbook.Sheets[sheetName];
                        const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });
                        loadedData[sheetName] = jsonData;
                    });

                    setWorkbookData(loadedData);
                    setActiveSheet(workbook.SheetNames[0]);
                    performAnalysis(loadedData);
                } catch (err) {
                    setError('Excel dosyası okunamadı. Lütfen dosyanın bozuk olmadığını kontrol edin.');
                    setWorkbookData(null);
                    setFileName('');
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const handlePaste = (event: ClipboardEvent) => {
        const items = event.clipboardData?.items;
        if (items) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    const file = items[i].getAsFile();
                    if (file) {
                        handleImageUpload(file);
                        event.preventDefault();
                        break;
                    }
                }
            }
        }
    };
    
    const handleCancel = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            setIsLoading(false);
            setError("Oluşturma işlemi kullanıcı tarafından iptal edildi.");
            abortControllerRef.current = null;
        }
    };
    
    const handleSubmit = async () => {
        if (!workbookData || !userPrompt || !analysisResult) {
            setError('Lütfen bir dosya yükleyin ve talebinizi yazın.');
            return;
        }
        
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;
        
        setIsLoading(true);
        setError('');
        setResult(null);
        setLastPrompt(userPrompt);

        if (useWebSearch) {
            setResult({ type: 'web_search', data: { responseText: '', sources: [] } });
            try {
                const generator = generateWebSearchStream(
                    mode,
                    workbookData,
                    userPrompt,
                    analysisResult,
                    image,
                    excelLanguage,
                    excelVersion
                );

                let accumulatedText = '';
                
                for await (const chunk of generator) {
                    if (signal.aborted) {
                       throw new Error("İşlem iptal edildi.");
                    }
                    accumulatedText += chunk;
                    setResult({ type: 'web_search', data: { responseText: accumulatedText, sources: [] } });
                }

            } catch (err: any) {
                if (err.name !== 'AbortError') {
                    setError(err.message || 'Web araması sırasında bir hata oluştu.');
                }
                 setResult(null);
            } finally {
                setIsLoading(false);
                setImage(null);
                setImagePreview(null);
                abortControllerRef.current = null;
            }

        } else {
             try {
                let newResult: AppResult;
                if (mode === 'formula') {
                    newResult = await generateFormula(workbookData, userPrompt, analysisResult, excelLanguage, excelVersion, image, trustedFormulaLibrary);
                } else {
                    newResult = await generateMacro(workbookData, userPrompt, analysisResult, image);
                }
                
                if (!signal.aborted) {
                    setResult(newResult);
                    const newHistoryItem: HistoryItem = { prompt: userPrompt, result: newResult };
                    setHistory(prevHistory => [newHistoryItem, ...prevHistory].slice(0, 20));
                }

            } catch (err: any) {
                 if (err.name !== 'AbortError') {
                    setError(err.message || 'Sonuç oluşturulurken bir hata oluştu.');
                 }
                setResult(null);
            } finally {
                setIsLoading(false);
                setImage(null);
                setImagePreview(null);
                abortControllerRef.current = null;
            }
        }
    };

    const handleCorrectError = () => {
        if (!lastPrompt || !result) return;
        let originalPrompt = lastPrompt;
        let incorrectOutput = '';

        if(result.type === 'formula') {
            incorrectOutput = result.data.formula.code;
        } else if (result.type === 'macro') {
            incorrectOutput = result.data.code;
        } else if (result.type === 'web_search') {
            incorrectOutput = result.data.responseText;
        }

        const newPrompt = `--- HATA DÜZELTME İSTEĞİ ---\nÖnceki Talep: "${originalPrompt}"\nHatalı Çıktı:\n\`\`\`\n${incorrectOutput}\n\`\`\`\nLütfen bu çıktıdaki hatayı düzelt.`;
        setUserPrompt(newPrompt);
        promptTextareaRef.current?.focus();
    };
    
    const handleAppendCellContentToPrompt = (rowIndex: number, colIndex: number) => {
        if (!workbookData || !activeSheet) return;

        const cellValue = workbookData[activeSheet][rowIndex][colIndex];
        const formattedValue = formatCellValue(cellValue); 
        
        if (formattedValue) {
             setUserPrompt(prev => prev ? `${prev.trim()} "${formattedValue}" ` : `"${formattedValue}" `);
             promptTextareaRef.current?.focus();
        }
    };

    const sheetData = useMemo(() => {
        if (!workbookData || !activeSheet) return { rows: [], colCount: 0 };
        const rows = workbookData[activeSheet];
        const colCount = rows.length > 0 ? Math.max(0, ...rows.map(row => row ? row.length : 0)) : 0;
        return { rows, colCount };
    }, [workbookData, activeSheet]);

    const columnHeaders = useMemo(() => generateColumnHeaders(sheetData.colCount), [sheetData.colCount]);
    
    const renderTable = () => {
        if (!workbookData) return null;

        const { rows, colCount } = sheetData;
        
        return (
             <div className="overflow-auto bg-white rounded-xl border border-slate-200/80 shadow-sm mt-4 max-h-[40vh] relative">
                <table className="w-full text-sm text-left border-collapse select-none">
                    <thead className="sticky top-0 bg-slate-100 z-10">
                        <tr>
                            <th className="p-2 border border-slate-200 w-12 font-semibold text-slate-500 text-center">#</th>
                            {columnHeaders.map((header, colIndex) => (
                                <th 
                                    key={header} 
                                    className="p-2 border border-slate-200 font-semibold text-slate-500 text-center min-w-[100px] cursor-pointer hover:bg-slate-200 transition-colors"
                                    onMouseDown={() => handleColumnHeaderMouseDown(colIndex)}
                                    onMouseOver={() => handleColumnHeaderMouseOver(colIndex)}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody onMouseLeave={() => setIsSelecting(false)}>
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-slate-50">
                                <td 
                                    className="p-2 border border-slate-200 bg-slate-100 text-slate-500 text-center font-semibold cursor-pointer hover:bg-slate-200 transition-colors"
                                    onMouseDown={() => handleRowHeaderMouseDown(rowIndex)}
                                    onMouseOver={() => handleRowHeaderMouseOver(rowIndex)}
                                >
                                    {rowIndex + 1}
                                </td>
                                {Array.from({ length: colCount }).map((_, colIndex) => {
                                    const cell = row ? row[colIndex] : null;
                                    const isSelected = isCellSelected(rowIndex, colIndex);
                                    const isPreviewCell = !!livePreviewFormula && liveFormulaCell && liveFormulaCell.sheet === activeSheet && liveFormulaCell.row === rowIndex && liveFormulaCell.col === colIndex;
                                    const isPreviewLoading = isPreviewCell && liveFormulaCell.isLoading;
                                    
                                    const cellContent = isPreviewCell ? liveFormulaCell.value : formatCellValue(cell);

                                    return (
                                        <td
                                            key={colIndex}
                                            onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                                            onMouseOver={() => handleMouseOverTable(rowIndex, colIndex)}
                                            title={isPreviewCell ? "Bu formülün bu satıra uygulandığında nasıl görüneceğinin önizlemesi." : !!livePreviewFormula ? "Formül önizlemesi için tıklayın" : "Hücre aralığı seçmek için sürükleyin"}
                                            className={`p-2 border border-slate-200 whitespace-nowrap cursor-cell transition-colors duration-100 relative group
                                                ${isSelected ? 'bg-emerald-200/50' : ''}
                                                ${isPreviewCell ? '!bg-amber-100 border-amber-400 text-amber-900 font-mono' : ''}
                                                ${isPreviewLoading ? 'flex items-center justify-center' : ''}
                                            `}
                                        >
                                            {isPreviewLoading ? <SpinnerIcon /> : cellContent}
                                            {!isPreviewCell && !isSelecting && (
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAppendCellContentToPrompt(rowIndex, colIndex);
                                                    }}
                                                    className="absolute top-1/2 right-1 -translate-y-1/2 bg-slate-200/80 text-slate-600 hover:bg-emerald-500 hover:text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    aria-label="Hücre içeriğini ekle"
                                                >
                                                    <PlusCircleIcon />
                                                </button>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        );
    };
    
    const renderMainContent = () => {
        if (result) {
            switch(result.type) {
                case 'formula':
                    return <ResultDisplay
                                result={result.data}
                                onCorrectError={handleCorrectError}
                                livePreviewFormula={livePreviewFormula}
                                onTryLive={handleToggleLivePreview}
                                onConfirmFormula={() => handleConfirmFormula(lastPrompt, result.data.formula.code)}
                            />;
                case 'macro':
                    return <MacroResultDisplay result={result.data} onCorrectError={handleCorrectError} />;
                case 'web_search':
                    return <WebSearchResultDisplay
                                result={result.data}
                                onCorrectError={handleCorrectError}
                                onTryLive={handleToggleLivePreview}
                                livePreviewFormula={livePreviewFormula}
                                mode={mode}
                            />;
                default:
                    return null;
            }
        }

        if (!workbookData) {
            return (
                 <div className="text-center mt-8 p-8 border-2 border-dashed border-slate-300 rounded-2xl bg-white">
                    <div className="mx-auto bg-emerald-100 text-emerald-600 w-16 h-16 rounded-full flex items-center justify-center">
                        <UploadIcon />
                    </div>
                    <h2 className="mt-4 text-2xl font-bold">Başlamak için bir Excel dosyası yükleyin</h2>
                    <p className="mt-2 text-slate-500">Formül veya makro oluşturmak istediğiniz dosyayı sürükleyip bırakın veya seçin.</p>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-6 bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                        Dosya Seç
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".xlsx, .xls"
                    />
                </div>
            )
        }
        
        if (isAnalyzing) {
            return (
                <div className="text-center mt-8 p-8 bg-white rounded-2xl border border-slate-200/80">
                    <div className="mx-auto bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center animate-pulse">
                        <BrainIcon />
                    </div>
                    <h2 className="mt-4 text-2xl font-bold">Veri analiz ediliyor...</h2>
                    <p className="mt-2 text-slate-500">Yapay zeka, tablonuzun yapısını anlamak için sütunları inceliyor. Bu işlem birkaç saniye sürebilir.</p>
                </div>
            )
        }

        return (
            <div className="mt-8 text-center p-8 bg-white rounded-2xl border border-slate-200/80">
                <h2 className="text-2xl font-bold">Veri başarıyla yüklendi ve analiz edildi!</h2>
                <p className="mt-2 text-slate-500">Şimdi yukarıdaki metin alanına talebinizi yazarak başlayabilirsiniz.</p>
                 <div className="mt-6 text-left max-w-4xl mx-auto space-y-4">
                    {helpContent.map(group => (
                    <div key={group.category}>
                        <button
                            onClick={() => setOpenExampleGroup(openExampleGroup === group.category ? null : group.category)}
                            className="w-full text-left flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-emerald-600">{React.createElement(group.icon)}</div>
                                <h3 className="font-bold text-slate-700">{group.category}</h3>
                            </div>
                            <ChevronDownIcon />
                        </button>
                        {openExampleGroup === group.category && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
                                {group.examples.map(ex => (
                                    <button 
                                        key={ex.id} 
                                        onClick={() => setSelectedExample(ex)}
                                        className="text-left p-3 bg-white border border-slate-200/80 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
                                    >
                                        <p className="font-semibold text-sm text-slate-800">{ex.title}</p>
                                        <p className="text-xs text-slate-500 mt-1">{ex.description}</p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                </div>
            </div>
        );
    };


    const handleUseExample = (example: any, isMacro: boolean) => {
        if (isMacro) {
            setMode('macro');
        } else {
            setMode('formula');
        }
        setUserPrompt(example.prompt);
        setSelectedExample(null);
        promptTextareaRef.current?.focus();
    };


    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-20 border-b border-slate-200/80">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-4">
                             <div className="flex-shrink-0 bg-emerald-100 text-emerald-600 p-2 rounded-lg">
                                 <SheetIcon />
                            </div>
                            <h1 className="text-2xl font-bold text-slate-800">Excel Formül & Makro Yardımcısı</h1>
                        </div>
                         <div className="flex items-center gap-3">
                            <div className="relative group">
                                <button onClick={() => setIsShortcutsModalOpen(true)} className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-full transition-colors" aria-label="Klavye Kısayolları">
                                    <KeyboardIcon />
                                </button>
                                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max bg-slate-700 text-white text-xs font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                                    Klavye Kısayolları
                                </span>
                            </div>
                            <div className="relative group">
                                <button onClick={() => setIsHelpCenterModalOpen(true)} className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-full transition-colors" aria-label="Yardım Merkezi">
                                    <BookOpenIcon />
                                </button>
                                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max bg-slate-700 text-white text-xs font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                                    Yardım Merkezi
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                     <div className="lg:col-span-3">
                        {/* File Upload and Prompt Section */}
                         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
                            {/* File Info */}
                            {workbookData && (
                                <div className="flex items-center justify-between mb-4 p-3 bg-slate-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="text-emerald-600"><ExcelIcon /></div>
                                        <span className="font-semibold">{fileName}</span>
                                    </div>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="text-sm font-semibold text-emerald-600 hover:underline"
                                    >
                                        Dosyayı Değiştir
                                    </button>
                                     <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".xlsx, .xls"/>
                                </div>
                            )}

                             {/* Mode Selection */}
                            <div className="flex justify-center mb-4">
                                <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1">
                                    <button
                                        onClick={() => setMode('formula')}
                                        className={`px-6 py-2 text-sm font-bold rounded-lg transition-colors ${mode === 'formula' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:bg-emerald-100'}`}
                                    >
                                        # Formül Oluştur
                                    </button>
                                    <button
                                        onClick={() => setMode('macro')}
                                        className={`px-6 py-2 text-sm font-bold rounded-lg transition-colors ${mode === 'macro' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:bg-emerald-100'}`}
                                    >
                                        ⚡ Makro Kodu Oluştur
                                    </button>
                                </div>
                            </div>
                            
                            {/* Prompt Textarea */}
                             <div className="relative">
                                <textarea
                                    ref={promptTextareaRef}
                                    value={userPrompt}
                                    onChange={(e) => setUserPrompt(e.target.value)}
                                    placeholder={
                                        workbookData 
                                        ? (mode === 'formula' 
                                            ? "Örn: A sütunundaki ad ile B sütunundaki soyadı birleştir."
                                            : "Örn: A sütunundaki yinelenen kayıtları sil.")
                                        : "Lütfen önce bir dosya yükleyin..."
                                    }
                                    className="w-full h-36 p-4 pr-12 bg-white text-slate-800 placeholder-slate-400 border-2 border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none disabled:bg-slate-100"
                                    disabled={!workbookData || isLoading || isAnalyzing}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                                            handleSubmit();
                                        }
                                    }}
                                />
                                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                                     {imagePreview && (
                                        <div className="relative group">
                                            <img src={imagePreview} alt="Ekran görüntüsü önizlemesi" className="h-8 w-8 object-cover rounded-md"/>
                                            <button 
                                                onClick={() => { setImage(null); setImagePreview(null); }}
                                                className="absolute -top-2 -right-2 bg-slate-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <XCircleIcon/>
                                            </button>
                                        </div>
                                    )}
                                    <label className="cursor-pointer p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-emerald-600 transition-colors">
                                        <AttachmentIcon />
                                        <input type="file" className="hidden" onChange={handleImageFileChange} accept="image/*"/>
                                    </label>
                                </div>
                             </div>

                             {/* Options and Submit */}
                           <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
                                <div className="flex items-center gap-4 flex-wrap">
                                    {mode === 'formula' && (
                                        <div className="flex items-center gap-2">
                                            <label className="font-semibold text-slate-600 text-sm">Dil:</label>
                                            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg">
                                                <button onClick={() => setExcelLanguage('tr')} className={`px-2 py-0.5 text-xs font-bold rounded-md transition-colors ${excelLanguage === 'tr' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}>TR</button>
                                                <button onClick={() => setExcelLanguage('en')} className={`px-2 py-0.5 text-xs font-bold rounded-md transition-colors ${excelLanguage === 'en' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}>EN</button>
                                            </div>
                                        </div>
                                    )}
                                     {mode === 'formula' && (
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="excelVersion" className="font-semibold text-slate-600 text-sm">Versiyon:</label>
                                            <div className="relative">
                                                <select
                                                    id="excelVersion"
                                                    value={excelVersion}
                                                    onChange={(e) => setExcelVersion(e.target.value)}
                                                    className="appearance-none bg-white border border-slate-300 rounded-lg py-1 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                >
                                                    <option value="365">365 / 2021+</option>
                                                    <option value="2019">2019</option>
                                                    <option value="2016">2016</option>
                                                    <option value="2013">2013 ve Eski</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                                                    <ChevronDownIcon />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="webSearch"
                                            checked={useWebSearch}
                                            onChange={(e) => setUseWebSearch(e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <label htmlFor="webSearch" className="text-sm text-slate-600">🌐 Web Destekli</label>
                                    </div>
                                </div>
                                
                                {isLoading ? (
                                    <button
                                        onClick={handleCancel}
                                        className="w-full sm:w-auto bg-red-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center shadow-sm"
                                        aria-label="Oluşturmayı durdur"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect width="12" height="12" x="6" y="6" rx="1"/></svg>
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!workbookData || isAnalyzing || !userPrompt}
                                        className="w-full sm:w-auto bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-emerald-700 transition-colors disabled:bg-emerald-300 disabled:cursor-not-allowed flex items-center justify-center shadow-sm hover:shadow-md disabled:shadow-none"
                                    >
                                        Oluştur
                                        <span className="hidden sm:inline bg-emerald-700 text-emerald-100 text-xs font-mono ml-3 px-2 py-0.5 rounded-md">Ctrl+Enter</span>
                                    </button>
                                )}
                             </div>
                         </div>
                        
                        {/* Data Preview */}
                        {workbookData && (
                             <div>
                                <div className="flex items-center gap-4 mt-6">
                                    {Object.keys(workbookData).map(sheetName => (
                                        <button
                                            key={sheetName}
                                            onClick={() => setActiveSheet(sheetName)}
                                            className={`px-4 py-2 rounded-t-lg font-semibold text-sm transition-colors ${activeSheet === sheetName ? 'bg-white border-t border-l border-r border-slate-200/80 text-emerald-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                                        >
                                            {sheetName}
                                        </button>
                                    ))}
                                </div>
                                {renderTable()}
                             </div>
                        )}

                        {error && (
                            <div className="mt-6 bg-red-100 border border-red-300 text-red-800 p-4 rounded-lg">
                                <strong>Hata:</strong> {error}
                            </div>
                        )}
                        
                        {renderMainContent()}
                     </div>
                     <div className="lg:col-span-1">
                        <HistoryDisplay 
                            history={history} 
                            onSelect={(res) => {
                                setResult(res);
                                window.scrollTo(0, 0);
                            }} 
                            onClear={() => {
                                setHistory([]);
                                setTrustedFormulaLibrary([]);
                                localStorage.removeItem('formulaHistory');
                                localStorage.removeItem('trustedFormulaLibrary');
                                setResult(null);
                            }}
                        />
                     </div>
                 </div>
            </main>
            <KeyboardShortcutsModal isOpen={isShortcutsModalOpen} onClose={() => setIsShortcutsModalOpen(false)} />
            <HelpCenterModal isOpen={isHelpCenterModalOpen} onClose={() => setIsHelpCenterModalOpen(false)} />
            <ExampleDetailModal example={selectedExample} onClose={() => setSelectedExample(null)} onUse={handleUseExample} />
        </div>
    );
};

export default App;
