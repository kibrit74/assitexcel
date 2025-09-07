
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import type { WorkbookData, ColumnAnalysis, AppResult, HistoryItem } from './types';
import { generateFormula, analyzeExcelData, generateMacro, generateWebSearchStream, calculateFormula } from './services/geminiService';
import { RequestManager } from './services/enhancedAIService';
import { ResultDisplay } from './components/ResultDisplay';
import { MacroResultDisplay } from './components/MacroResultDisplay';
import { WebSearchResultDisplay } from './components/WebSearchResultDisplay';
import { HistoryDisplay } from './components/HistoryDisplay';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { HelpCenterModal } from './components/HelpCenterModal';
import { ExampleDetailModal } from './components/ExampleDetailModal';
import { helpContent } from './data/helpContent';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import { ModernNavbar } from './components/ModernNavbar';
import { EnhancedExcelInterface } from './components/EnhancedExcelInterface';
import { PerformanceMonitorComponent } from './components/PerformanceMonitor';
import AccessibilityProvider, { 
    AccessibleButton, 
    LiveRegion, 
    useBreakpoint,
    ProgressiveDisclosure 
} from './components/AccessibilityEnhancements';
import './styles/accessibility.css';


declare const XLSX: any;

// --- ICONS ---
const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
);
const ExcelIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Excel file background */}
        <rect x="3" y="2" width="15" height="20" rx="2" ry="2" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
        {/* Corner fold */}
        <path d="M15 2v4a2 2 0 0 0 2 2h4" fill="none" stroke="#16a34a" strokeWidth="1.5"/>
        {/* Grid lines */}
        <line x1="6" y1="8" x2="15" y2="8" stroke="#16a34a" strokeWidth="0.8"/>
        <line x1="6" y1="12" x2="15" y2="12" stroke="#16a34a" strokeWidth="0.8"/>
        <line x1="6" y1="16" x2="15" y2="16" stroke="#16a34a" strokeWidth="0.8"/>
        <line x1="9" y1="6" x2="9" y2="19" stroke="#16a34a" strokeWidth="0.8"/>
        <line x1="12" y1="6" x2="12" y2="19" stroke="#16a34a" strokeWidth="0.8"/>
        {/* Excel X symbol */}
        <path d="M7 10l2 2m0-2l-2 2" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M13 14l2 2m0-2l-2 2" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);
const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1a2.5 2.5 0 0 1-2.5 2.5h-1A2.5 2.5 0 0 1 6 5.5v-1A2.5 2.5 0 0 1 8.5 2h1Z"></path><path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v1a2.5 2.5 0 0 1-2.5 2.5h-1a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 12.5 2h2Z"></path><path d="M6 10a2.5 2.5 0 0 1 2.5 2.5v1A2.5 2.5 0 0 1 6 16H5a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 5 10h1Z"></path><path d="M18 10a2.5 2.5 0 0 1 2.5 2.5v1a2.5 2.5 0 0 1-2.5 2.5h-1a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 15 10h1Z"></path><path d="M12 15a2.5 2.5 0 0 1 2.5 2.5v1a2.5 2.5 0 0 1-2.5 2.5h-1a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 10 15h2Z"></path><path d="M9.5 8.5a2.5 2.5 0 0 0 0 5"></path><path d="M14.5 8.5a2.5 2.5 0 0 1 0 5"></path><path d="M12 8V6.5"></path><path d="M12 17.5V16"></path></svg>
);
const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M7 10l5 5 5-5" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="12" cy="12" r="8" fill="none" stroke="#10b981" strokeWidth="0.8" opacity="0.3"/>
    </svg>
);
const KeyboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="20" height="12" rx="3" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.6"/>
        <g fill="#10b981">
            <rect x="4" y="8" width="2" height="2" rx="0.5"/>
            <rect x="7" y="8" width="2" height="2" rx="0.5"/>
            <rect x="10" y="8" width="2" height="2" rx="0.5"/>
            <rect x="13" y="8" width="2" height="2" rx="0.5"/>
            <rect x="16" y="8" width="2" height="2" rx="0.5"/>
            <rect x="4.5" y="11" width="2" height="2" rx="0.5"/>
            <rect x="7.5" y="11" width="2" height="2" rx="0.5"/>
            <rect x="10.5" y="11" width="2" height="2" rx="0.5"/>
            <rect x="13.5" y="11" width="2" height="2" rx="0.5"/>
            <rect x="16.5" y="11" width="2" height="2" rx="0.5"/>
            <rect x="6" y="14" width="8" height="2" rx="0.5"/>
        </g>
    </svg>
);
const BookOpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M12 8v12" stroke="#10b981" strokeWidth="1.2"/>
        <g stroke="#10b981" strokeWidth="1" opacity="0.7">
            <path d="M5 9h3M5 12h4M5 15h2"/>
            <path d="M16 9h3M15 12h4M17 15h2"/>
        </g>
    </svg>
);
const SheetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M14 2v6h6" fill="none" stroke="#10b981" strokeWidth="1.6" strokeLinejoin="round"/>
        <g stroke="#10b981" strokeWidth="1.2" opacity="0.8">
            <path d="M16 13H8M16 17H8M10 9H8"/>
        </g>
        <g fill="#10b981" opacity="0.6">
            <circle cx="9" cy="13" r="0.8"/>
            <circle cx="9" cy="17" r="0.8"/>
        </g>
    </svg>
);
const AttachmentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.59a2 2 0 0 1-2.83-2.83l8.49-8.48" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
        <circle cx="12" cy="7" r="1.5" fill="#10b981" fillOpacity="0.8"/>
        <circle cx="17" cy="12" r="1" fill="#10b981" fillOpacity="0.6"/>
    </svg>
);
const XCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.8"/>
        <g stroke="#10b981" strokeWidth="2.2" strokeLinecap="round">
            <path d="M15 9l-6 6M9 9l6 6"/>
        </g>
    </svg>
);
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
    // Responsive breakpoint support
    const { isMobile, isTablet, isDesktop, isSmall } = useBreakpoint();
    
    const [currentView, setCurrentView] = useState<'landing' | 'app' | 'about' | 'faq' | 'login' | 'register' | 'profile' | 'settings'>('landing');
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
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.8"/>
        <g stroke="#10b981" strokeWidth="2.2" strokeLinecap="round">
            <path d="M12 8v8M8 12h8"/>
        </g>
        <circle cx="12" cy="12" r="1" fill="#10b981"/>
    </svg>
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

    const handleToggleLivePreview = (formula?: string | null) => {
        if (!formula || formula === null) {
            setLivePreviewFormula(null);
            setLiveFormulaCell(null);
            return;
        }
        setLivePreviewFormula(prev => {
            const newFormula = prev === formula ? null : formula;
            if (newFormula === null) {
                setLiveFormulaCell(null);
            }
            return newFormula;
        });
    };

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
        RequestManager.cancel(); // Cancel any ongoing AI operations
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


    // Landing page view
    if (currentView === 'landing') {
        return (
            <AccessibilityProvider>
                <div className="min-h-screen bg-slate-50">
                    {/* Live region for screen reader announcements */}
                    <LiveRegion message={error || (isLoading ? 'İşlem devam ediyor...' : '')} priority="polite" />
                    
                    <ModernNavbar 
                        currentView={currentView}
                        onViewChange={setCurrentView}
                        onOpenShortcuts={() => setIsShortcutsModalOpen(true)}
                        onOpenHelp={() => setIsHelpCenterModalOpen(true)}
                    />
                    <LandingPage 
                        onGetStarted={() => setCurrentView('app')}
                    />
                    
                    {/* Global Modals */}
                    {isShortcutsModalOpen && <KeyboardShortcutsModal isOpen={isShortcutsModalOpen} onClose={() => setIsShortcutsModalOpen(false)} />}
                    {isHelpCenterModalOpen && <HelpCenterModal isOpen={isHelpCenterModalOpen} onClose={() => setIsHelpCenterModalOpen(false)} />}
                    
                    {/* Performance Monitor */}
                    <PerformanceMonitorComponent />
                </div>
            </AccessibilityProvider>
        );
    }

    // About page view
    if (currentView === 'about') {
        return (
            <AccessibilityProvider>
                <div className="min-h-screen bg-slate-50">
                    {/* Live region for screen reader announcements */}
                    <LiveRegion message={error || (isLoading ? 'İşlem devam ediyor...' : '')} priority="polite" />
                    
                    <ModernNavbar 
                        currentView={currentView}
                        onViewChange={setCurrentView}
                        onOpenShortcuts={() => setIsShortcutsModalOpen(true)}
                        onOpenHelp={() => setIsHelpCenterModalOpen(true)}
                    />
                    <AboutPage />
                    
                    {/* Global Modals */}
                    {isShortcutsModalOpen && <KeyboardShortcutsModal isOpen={isShortcutsModalOpen} onClose={() => setIsShortcutsModalOpen(false)} />}
                    {isHelpCenterModalOpen && <HelpCenterModal isOpen={isHelpCenterModalOpen} onClose={() => setIsHelpCenterModalOpen(false)} />}
                    
                    {/* Performance Monitor */}
                    <PerformanceMonitorComponent />
                </div>
            </AccessibilityProvider>
        );
    }

    // Placeholder pages for other views
    if (currentView === 'faq') {
        return (
            <AccessibilityProvider>
                <div className="min-h-screen bg-slate-50">
                    <ModernNavbar 
                        currentView={currentView}
                        onViewChange={setCurrentView}
                        onOpenShortcuts={() => setIsShortcutsModalOpen(true)}
                        onOpenHelp={() => setIsHelpCenterModalOpen(true)}
                    />
                    <div className="max-w-4xl mx-auto py-12 px-4">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-slate-800 mb-4 font-['Poppins',_sans-serif]">Sık Sorulan Sorular</h1>
                            <p className="text-xl text-slate-600 font-['Inter',_sans-serif]">Bu sayfa yakında eklenecek...</p>
                        </div>
                    </div>
                    
                    {/* Global Modals */}
                    {isShortcutsModalOpen && <KeyboardShortcutsModal isOpen={isShortcutsModalOpen} onClose={() => setIsShortcutsModalOpen(false)} />}
                    {isHelpCenterModalOpen && <HelpCenterModal isOpen={isHelpCenterModalOpen} onClose={() => setIsHelpCenterModalOpen(false)} />}
                    
                    <PerformanceMonitorComponent />
                </div>
            </AccessibilityProvider>
        );
    }

    if (currentView === 'login' || currentView === 'register' || currentView === 'profile' || currentView === 'settings') {
        return (
            <AccessibilityProvider>
                <div className="min-h-screen bg-slate-50">
                    <ModernNavbar 
                        currentView={currentView}
                        onViewChange={setCurrentView}
                        onOpenShortcuts={() => setIsShortcutsModalOpen(true)}
                        onOpenHelp={() => setIsHelpCenterModalOpen(true)}
                    />
                    <div className="max-w-4xl mx-auto py-12 px-4">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-slate-800 mb-4 font-['Poppins',_sans-serif]">
                                {currentView === 'login' && 'Giriş Yap'}
                                {currentView === 'register' && 'Kayıt Ol'}
                                {currentView === 'profile' && 'Profil'}
                                {currentView === 'settings' && 'Ayarlar'}
                            </h1>
                            <p className="text-xl text-slate-600 font-['Inter',_sans-serif]">Bu sayfa yakında eklenecek...</p>
                        </div>
                    </div>
                    
                    {/* Global Modals */}
                    {isShortcutsModalOpen && <KeyboardShortcutsModal isOpen={isShortcutsModalOpen} onClose={() => setIsShortcutsModalOpen(false)} />}
                    {isHelpCenterModalOpen && <HelpCenterModal isOpen={isHelpCenterModalOpen} onClose={() => setIsHelpCenterModalOpen(false)} />}
                    
                    <PerformanceMonitorComponent />
                </div>
            </AccessibilityProvider>
        );
    }

    // Main application view
    return (
        <AccessibilityProvider>
            <div className="min-h-screen bg-slate-50">
                {/* Live region for screen reader announcements */}
                <LiveRegion message={error || (isLoading ? 'İşlem devam ediyor...' : '')} priority="polite" />
                
                <ModernNavbar 
                    currentView={currentView}
                    onViewChange={setCurrentView}
                    onOpenShortcuts={() => setIsShortcutsModalOpen(true)}
                    onOpenHelp={() => setIsHelpCenterModalOpen(true)}
                />

                <main id="main-content" className="container-responsive" role="main" aria-label="Excel formül yardımcısı ana uygulama">
                     <div className={`grid gap-8 py-8 ${isDesktop ? 'grid-cols-4 lg:grid-cols-4' : 'grid-cols-1'}`}>
                         <div className={isDesktop ? 'lg:col-span-3' : 'col-span-1'}>
                            {/* File Upload and Prompt Section */}
                             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-responsive">
                                {/* File Upload Section - when no workbook */}
                                {!workbookData && (
                                    <div className="text-center py-12">
                                        <div className="mx-auto bg-emerald-100 text-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                                            <ExcelIcon />
                                        </div>
                                        <h2 className="responsive-text-2xl font-bold text-slate-800 mb-4">
                                            Excel Dosyanızı Yükleyin
                                        </h2>
                                        <p className="responsive-text-lg text-slate-600 mb-8 max-w-md mx-auto">
                                            Formül veya makro oluşturmak için Excel dosyanızı (.xlsx, .xls) yükleyin
                                        </p>
                                        <AccessibleButton
                                            onClick={() => fileInputRef.current?.click()}
                                            size={isMobile ? 'md' : 'lg'}
                                            ariaLabel="Excel dosyası seç"
                                            className="touch-target"
                                        >
                                            <UploadIcon />
                                            <span className="ml-2">Dosya Seç</span>
                                        </AccessibleButton>
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            onChange={handleFileChange} 
                                            className="hidden" 
                                            accept=".xlsx, .xls"
                                            aria-label="Excel dosyası seçici"
                                        />
                                    </div>
                                )}
                                
                                {/* File Info - when workbook is loaded */}
                                {workbookData && (
                                    <div className="flex items-center justify-between mb-4 p-3 bg-slate-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="text-emerald-600"><ExcelIcon /></div>
                                            <span className="font-semibold">{fileName}</span>
                                        </div>
                                        <AccessibleButton
                                            onClick={() => fileInputRef.current?.click()}
                                            variant="ghost"
                                            size="sm"
                                            ariaLabel="Excel dosyasını değiştir"
                                            className="touch-target"
                                        >
                                            Dosyayı Değiştir
                                        </AccessibleButton>
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
                           <div className="flex flex-col space-y-4">
                                {/* Progressive disclosure for advanced options */}
                                <ProgressiveDisclosure 
                                    title="Gelişmiş Seçenekler"
                                    defaultOpen={false}
                                    className="border border-slate-200 rounded-lg"
                                >
                                    <div className="grid-responsive gap-4">
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
                                </ProgressiveDisclosure>
                                
                                {/* Submit Button */}
                                <div className="flex justify-center">
                                {isLoading ? (
                                    <AccessibleButton
                                        onClick={handleCancel}
                                        variant="secondary"
                                        size={isMobile ? 'md' : 'lg'}
                                        ariaLabel="Oluşturmayı durdur"
                                        className="w-full sm:w-auto bg-red-600 text-white hover:bg-red-700 touch-target"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect width="12" height="12" x="6" y="6" rx="1"/></svg>
                                        <span className="ml-2">Durdur</span>
                                    </AccessibleButton>
                                ) : (
                                    <AccessibleButton
                                        onClick={handleSubmit}
                                        disabled={!workbookData || isAnalyzing || !userPrompt}
                                        size={isMobile ? 'md' : 'lg'}
                                        ariaLabel={mode === 'formula' ? 'Formül oluştur' : 'Makro kodu oluştur'}
                                        className="w-full sm:w-auto touch-target"
                                    >
                                        Oluştur
                                        {!isMobile && (
                                            <span className="bg-emerald-700 text-emerald-100 text-xs font-mono ml-3 px-2 py-0.5 rounded-md">Ctrl+Enter</span>
                                        )}
                                    </AccessibleButton>
                                )}
                                </div>
                             </div>
                             </div>
                        
                        {/* Enhanced Data Preview */}
                        {workbookData && (
                            <EnhancedExcelInterface 
                                workbookData={workbookData}
                                activeSheet={activeSheet}
                                onSheetChange={setActiveSheet}
                                onCellAppend={handleAppendCellContentToPrompt}
                                livePreviewFormula={livePreviewFormula}
                                liveFormulaCell={liveFormulaCell}
                                showDataTypes={true}
                                enableFiltering={true}
                                enableSearch={true}
                                virtualScrolling={true}
                                maxVisibleRows={100}
                            />
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
            
            {/* Performance Monitor */}
            <PerformanceMonitorComponent />
        </div>
        </AccessibilityProvider>
    );
};

export default App;
