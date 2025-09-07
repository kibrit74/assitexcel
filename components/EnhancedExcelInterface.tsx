import React, { useState, useCallback, useMemo } from 'react';
import type { WorkbookData } from '../types';

// Icon Components
const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const SpinnerIcon = () => (
  <svg className="animate-spin h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const PlusCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </svg>
);

// Utility functions
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

// Data type detection
const detectDataType = (value: any): 'number' | 'date' | 'text' | 'boolean' | 'empty' => {
  if (value === null || value === undefined || value === '') return 'empty';
  if (value instanceof Date) return 'date';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  
  // Try to detect if string represents a number
  const numValue = Number(value);
  if (!isNaN(numValue) && isFinite(numValue)) return 'number';
  
  // Try to detect if string represents a date
  const dateValue = new Date(value);
  if (!isNaN(dateValue.getTime())) return 'date';
  
  return 'text';
};

// Cell styling based on data type
const getCellTypeStyle = (dataType: string): string => {
  switch (dataType) {
    case 'number':
      return 'text-blue-700 bg-blue-50/50 font-mono';
    case 'date':
      return 'text-purple-700 bg-purple-50/50';
    case 'boolean':
      return 'text-green-700 bg-green-50/50 font-semibold';
    case 'empty':
      return 'text-slate-400 bg-slate-50/50';
    default:
      return 'text-slate-700';
  }
};

// Selection types
interface Selection {
  start: { row: number; col: number } | null;
  end: { row: number; col: number } | null;
}

interface LivePreviewCell {
  sheet: string;
  row: number;
  col: number;
  value: string;
  isLoading: boolean;
}

// Main component props
interface EnhancedExcelInterfaceProps {
  workbookData: WorkbookData;
  activeSheet: string;
  onSheetChange: (sheetName: string) => void;
  onCellAppend?: (rowIndex: number, colIndex: number) => void;
  onCellClick?: (rowIndex: number, colIndex: number) => void;
  livePreviewFormula?: string | null;
  liveFormulaCell?: LivePreviewCell | null;
  showDataTypes?: boolean;
  enableFiltering?: boolean;
  enableSearch?: boolean;
  virtualScrolling?: boolean;
  maxVisibleRows?: number;
}

export const EnhancedExcelInterface: React.FC<EnhancedExcelInterfaceProps> = ({
  workbookData,
  activeSheet,
  onSheetChange,
  onCellAppend,
  onCellClick,
  livePreviewFormula,
  liveFormulaCell,
  showDataTypes = true,
  enableFiltering = true,
  enableSearch = true,
  virtualScrolling = false,
  maxVisibleRows = 50
}) => {
  // Local state
  const [selection, setSelection] = useState<Selection>({ start: null, end: null });
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [selectionMode, setSelectionMode] = useState<'cell' | 'row' | 'column'>('cell');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [sortColumn, setSortColumn] = useState<{ column: number; direction: 'asc' | 'desc' } | null>(null);
  const [scrollTop, setScrollTop] = useState<number>(0);

  // Memoized data processing
  const sheetData = useMemo(() => {
    if (!workbookData || !activeSheet) return { rows: [], colCount: 0 };
    const rows = workbookData[activeSheet] || [];
    const colCount = rows.length > 0 ? Math.max(0, ...rows.map(row => row ? row.length : 0)) : 0;
    return { rows, colCount };
  }, [workbookData, activeSheet]);

  const columnHeaders = useMemo(() => generateColumnHeaders(sheetData.colCount), [sheetData.colCount]);

  // Filter and search functionality
  const filteredData = useMemo(() => {
    if (!enableFiltering && !enableSearch) return sheetData.rows;
    
    let filtered = sheetData.rows;
    
    // Apply search
    if (enableSearch && searchTerm) {
      filtered = filtered.filter(row => 
        row && row.some(cell => 
          formatCellValue(cell).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    // Apply column filters
    if (enableFiltering) {
      Object.entries(columnFilters).forEach(([colIndex, filterValue]) => {
        if (filterValue) {
          const colIdx = parseInt(colIndex);
          filtered = filtered.filter(row => 
            row && row[colIdx] && 
            formatCellValue(row[colIdx]).toLowerCase().includes(filterValue.toLowerCase())
          );
        }
      });
    }
    
    return filtered;
  }, [sheetData.rows, searchTerm, columnFilters, enableFiltering, enableSearch]);

  // Virtual scrolling calculations
  const visibleData = useMemo(() => {
    if (!virtualScrolling) return filteredData;
    
    const startIndex = Math.floor(scrollTop / 40); // Assuming 40px row height
    const endIndex = startIndex + maxVisibleRows;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, virtualScrolling, scrollTop, maxVisibleRows]);

  // Column statistics
  const columnStats = useMemo(() => {
    const stats: Record<number, { 
      dataTypes: Record<string, number>; 
      uniqueValues: number; 
      nonEmpty: number 
    }> = {};
    
    for (let colIdx = 0; colIdx < sheetData.colCount; colIdx++) {
      const columnData = sheetData.rows.map(row => row?.[colIdx]).filter(Boolean);
      const dataTypes: Record<string, number> = {};
      const uniqueValues = new Set();
      
      columnData.forEach(value => {
        const type = detectDataType(value);
        dataTypes[type] = (dataTypes[type] || 0) + 1;
        uniqueValues.add(formatCellValue(value));
      });
      
      stats[colIdx] = {
        dataTypes,
        uniqueValues: uniqueValues.size,
        nonEmpty: columnData.length
      };
    }
    
    return stats;
  }, [sheetData]);

  // Selection handlers
  const handleCellMouseDown = useCallback((rowIndex: number, colIndex: number) => {
    // If in live preview mode and onCellClick is provided, call it
    if (livePreviewFormula && onCellClick) {
      onCellClick(rowIndex, colIndex);
    } else {
      // Otherwise, handle normal selection
      setIsSelecting(true);
      setSelectionMode('cell');
      setSelection({
        start: { row: rowIndex, col: colIndex },
        end: { row: rowIndex, col: colIndex }
      });
    }
  }, [livePreviewFormula, onCellClick]);

  const handleMouseOverTable = useCallback((rowIndex: number, colIndex: number) => {
    if (isSelecting && selection.start) {
      setSelection(prev => ({ ...prev, end: { row: rowIndex, col: colIndex } }));
    }
  }, [isSelecting, selection.start]);

  const handleSelectionEnd = useCallback(() => {
    setIsSelecting(false);
  }, []);

  const isCellSelected = useCallback((rowIndex: number, colIndex: number): boolean => {
    if (!selection.start || !selection.end) return false;
    
    const minRow = Math.min(selection.start.row, selection.end.row);
    const maxRow = Math.max(selection.start.row, selection.end.row);
    const minCol = Math.min(selection.start.col, selection.end.col);
    const maxCol = Math.max(selection.start.col, selection.end.col);

    return rowIndex >= minRow && rowIndex <= maxRow && colIndex >= minCol && colIndex <= maxCol;
  }, [selection]);

  // Column header with stats and filtering
  const renderColumnHeader = (colIndex: number, header: string) => {
    const stats = columnStats[colIndex];
    const primaryDataType = stats ? Object.entries(stats.dataTypes).reduce((a, b) => 
      stats.dataTypes[a[0]] > stats.dataTypes[b[0]] ? a : b
    )[0] : 'text';

    return (
      <th key={header} className="relative group">
        <div className="p-2 border border-slate-200 font-semibold text-slate-700 text-center min-w-[120px] bg-slate-50">
          <div className="flex items-center justify-center gap-1">
            <span>{header}</span>
            {showDataTypes && (
              <span className={`text-xs px-1 py-0.5 rounded ${getCellTypeStyle(primaryDataType)}`}>
                {primaryDataType.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          
          {/* Column stats tooltip */}
          {stats && (
            <div className="absolute top-full left-0 z-20 bg-white border border-slate-200 rounded-lg shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none min-w-[200px]">
              <div className="text-xs space-y-1">
                <div><strong>Non-empty:</strong> {stats.nonEmpty}</div>
                <div><strong>Unique values:</strong> {stats.uniqueValues}</div>
                <div><strong>Data types:</strong></div>
                {Object.entries(stats.dataTypes).map(([type, count]) => (
                  <div key={type} className="ml-2">
                    {type}: {count}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Column filter */}
        {enableFiltering && (
          <div className="p-1 border-l border-r border-slate-200 bg-slate-50">
            <input
              type="text"
              placeholder="Filter..."
              value={columnFilters[colIndex] || ''}
              onChange={(e) => setColumnFilters(prev => ({ ...prev, [colIndex]: e.target.value }))}
              className="w-full text-xs px-2 py-1 border border-slate-300 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </th>
    );
  };

  // Render enhanced table
  const renderEnhancedTable = () => {
    if (!workbookData || !activeSheet) return null;

    return (
      <div className="space-y-4">
        {/* Search and controls */}
        {(enableSearch || enableFiltering) && (
          <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-slate-200">
            {enableSearch && (
              <div className="relative flex-1 max-w-md">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search in all cells..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <SearchIcon />
                </div>
              </div>
            )}
            
            {enableFiltering && (
              <button 
                onClick={() => setColumnFilters({})}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-emerald-600 border border-slate-300 rounded-lg hover:bg-emerald-50"
              >
                <FilterIcon />
                Clear Filters
              </button>
            )}
            
            <div className="text-sm text-slate-500">
              {filteredData.length} of {sheetData.rows.length} rows
            </div>
          </div>
        )}

        {/* Enhanced table */}
        <div 
          className="overflow-auto bg-white rounded-xl border border-slate-200/80 shadow-sm max-h-[60vh] relative"
          onMouseLeave={handleSelectionEnd}
        >
          <table className="w-full text-sm text-left border-collapse select-none">
            <thead className="sticky top-0 bg-slate-100 z-10">
              <tr>
                <th className="p-2 border border-slate-200 w-12 font-semibold text-slate-500 text-center bg-slate-100">#</th>
                {columnHeaders.map((header, colIndex) => renderColumnHeader(colIndex, header))}
              </tr>
            </thead>
            <tbody>
              {visibleData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-slate-50 group">
                  <td className="p-2 border border-slate-200 bg-slate-100 text-slate-500 text-center font-semibold sticky left-0 z-5">
                    {rowIndex + 1}
                  </td>
                  {Array.from({ length: sheetData.colCount }).map((_, colIndex) => {
                    const cell = row ? row[colIndex] : null;
                    const cellValue = formatCellValue(cell);
                    const dataType = detectDataType(cell);
                    const isSelected = isCellSelected(rowIndex, colIndex);
                    const isPreviewCell = !!livePreviewFormula && 
                      liveFormulaCell && 
                      liveFormulaCell.sheet === activeSheet && 
                      liveFormulaCell.row === rowIndex && 
                      liveFormulaCell.col === colIndex;
                    
                    const displayValue = isPreviewCell ? liveFormulaCell.value : cellValue;

                    return (
                      <td
                        key={colIndex}
                        onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                        onMouseOver={() => handleMouseOverTable(rowIndex, colIndex)}
                        className={`
                          p-2 border border-slate-200 whitespace-nowrap cursor-cell transition-all duration-100 relative group/cell
                          ${isSelected ? 'bg-emerald-200/50 ring-1 ring-emerald-400' : ''}
                          ${isPreviewCell ? '!bg-amber-100 border-amber-400 text-amber-900 font-mono shadow-sm' : ''}
                          ${showDataTypes ? getCellTypeStyle(dataType) : ''}
                          ${liveFormulaCell?.isLoading && isPreviewCell ? 'flex items-center justify-center' : ''}
                        `}
                        title={isPreviewCell ? "Formula preview result" : `${columnHeaders[colIndex]}${rowIndex + 1}: ${cellValue}`}
                      >
                        {liveFormulaCell?.isLoading && isPreviewCell ? (
                          <SpinnerIcon />
                        ) : (
                          <span className="block max-w-[150px] truncate">{displayValue}</span>
                        )}
                        
                        {/* Cell action button */}
                        {onCellAppend && !isPreviewCell && !isSelecting && cellValue && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onCellAppend(rowIndex, colIndex);
                            }}
                            className="absolute top-1/2 right-1 -translate-y-1/2 bg-slate-200/80 text-slate-600 hover:bg-emerald-500 hover:text-white rounded-full p-0.5 opacity-0 group-hover/cell:opacity-100 transition-opacity"
                            aria-label="Add cell content to prompt"
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

        {/* Selection info */}
        {selection.start && selection.end && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm">
            <strong>Selection:</strong> {columnHeaders[selection.start.col]}{selection.start.row + 1}
            {(selection.start.row !== selection.end.row || selection.start.col !== selection.end.col) && 
              `:${columnHeaders[selection.end.col]}${selection.end.row + 1}`
            }
            {` (${Math.abs(selection.end.row - selection.start.row) + 1} × ${Math.abs(selection.end.col - selection.start.col) + 1} cells)`}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Sheet tabs */}
      <div className="flex items-center gap-2">
        {Object.keys(workbookData).map(sheetName => (
          <button
            key={sheetName}
            onClick={() => onSheetChange(sheetName)}
            className={`
              px-4 py-2 rounded-t-lg font-semibold text-sm transition-all duration-200
              ${activeSheet === sheetName 
                ? 'bg-white border-t border-l border-r border-slate-200/80 text-emerald-600 shadow-sm' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
              }
            `}
          >
            {sheetName}
          </button>
        ))}
      </div>

      {/* Enhanced table */}
      {renderEnhancedTable()}
    </div>
  );
};

export default EnhancedExcelInterface;