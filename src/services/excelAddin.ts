// Excel Add-in API Integration
declare const Office: any;
declare const Excel: any;

export class ExcelAddInService {
    private static instance: ExcelAddInService;
    private isInitialized: boolean = false;

    private constructor() {}

    public static getInstance(): ExcelAddInService {
        if (!ExcelAddInService.instance) {
            ExcelAddInService.instance = new ExcelAddInService();
        }
        return ExcelAddInService.instance;
    }

    /**
     * Initialize Office.js
     */
    public async initialize(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (typeof Office !== 'undefined') {
                Office.onReady((info: any) => {
                    if (info.host === Office.HostType.Excel) {
                        this.isInitialized = true;
                        console.log('Excel Add-in initialized successfully');
                        resolve();
                    } else {
                        // Running in different Office app, but don't reject
                        console.log('Running in Office app other than Excel');
                        this.isInitialized = false;
                        resolve();
                    }
                });
            } else {
                // Running outside of Office context (development mode)
                console.log('Running in development mode (outside Office)');
                this.isInitialized = false;
                resolve();
            }
        });
    }

    /**
     * Check if running inside Excel
     */
    public isRunningInExcel(): boolean {
        return typeof Office !== 'undefined' && this.isInitialized;
    }

    /**
     * Get selected range data from Excel
     */
    public async getSelectedRangeData(): Promise<any[][]> {
        if (!this.isRunningInExcel()) {
            throw new Error('Not running in Excel context');
        }

        return Excel.run(async (context: any) => {
            const range = context.workbook.getSelectedRange();
            range.load(['values', 'address']);
            await context.sync();
            return range.values;
        });
    }

    /**
     * Get all worksheet names
     */
    public async getWorksheetNames(): Promise<string[]> {
        if (!this.isRunningInExcel()) {
            throw new Error('Not running in Excel context');
        }

        return Excel.run(async (context: any) => {
            const worksheets = context.workbook.worksheets;
            worksheets.load('items/name');
            await context.sync();
            return worksheets.items.map((sheet: any) => sheet.name);
        });
    }

    /**
     * Get worksheet data
     */
    public async getWorksheetData(sheetName: string): Promise<any[][]> {
        if (!this.isRunningInExcel()) {
            throw new Error('Not running in Excel context');
        }

        return Excel.run(async (context: any) => {
            const sheet = context.workbook.worksheets.getItem(sheetName);
            const range = sheet.getUsedRange();
            
            if (range) {
                range.load('values');
                await context.sync();
                return range.values;
            }
            
            return [];
        });
    }

    /**
     * Write formula to selected cell
     */
    public async writeFormulaToSelectedCell(formula: string): Promise<void> {
        if (!this.isRunningInExcel()) {
            throw new Error('Not running in Excel context');
        }

        return Excel.run(async (context: any) => {
            const range = context.workbook.getSelectedRange();
            range.formulas = [[formula]];
            await context.sync();
        });
    }

    /**
     * Write formulas to a range
     */
    public async writeFormulasToRange(
        sheetName: string, 
        startRow: number, 
        startCol: number, 
        formulas: string[][]
    ): Promise<void> {
        if (!this.isRunningInExcel()) {
            throw new Error('Not running in Excel context');
        }

        return Excel.run(async (context: any) => {
            const sheet = context.workbook.worksheets.getItem(sheetName);
            const range = sheet.getRangeByIndexes(
                startRow, 
                startCol, 
                formulas.length, 
                formulas[0].length
            );
            range.formulas = formulas;
            await context.sync();
        });
    }

    /**
     * Get all workbook data (all sheets)
     */
    public async getAllWorkbookData(): Promise<{ [sheetName: string]: any[][] }> {
        if (!this.isRunningInExcel()) {
            throw new Error('Not running in Excel context');
        }

        const result: { [sheetName: string]: any[][] } = {};

        await Excel.run(async (context: any) => {
            const worksheets = context.workbook.worksheets;
            worksheets.load('items');
            await context.sync();

            for (const sheet of worksheets.items) {
                sheet.load('name');
                const range = sheet.getUsedRange();
                
                if (range) {
                    range.load('values');
                }
                
                await context.sync();
                
                if (range && range.values) {
                    result[sheet.name] = range.values;
                } else {
                    result[sheet.name] = [];
                }
            }
        });

        return result;
    }

    /**
     * Show notification message in Excel
     */
    public showNotification(message: string, type: 'info' | 'error' | 'success' = 'info'): void {
        if (this.isRunningInExcel() && Office.context.ui) {
            // Use Office notification API if available
            console.log(`[${type.toUpperCase()}] ${message}`);
        } else {
            // Fallback to console for development
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }

    /**
     * Insert VBA macro code into workbook
     */
    public async insertVBAMacro(macroCode: string, moduleName: string = 'Module1'): Promise<void> {
        if (!this.isRunningInExcel()) {
            throw new Error('Not running in Excel context');
        }

        // Note: Direct VBA insertion requires special permissions and may not be available in all environments
        // This is a placeholder for the functionality
        this.showNotification(
            'VBA makro kodu oluşturuldu. Lütfen VBA editörüne (Alt+F11) giderek kodu manuel olarak yapıştırın.',
            'info'
        );
        
        // Copy macro code to clipboard if possible
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(macroCode);
            this.showNotification('Makro kodu panoya kopyalandı.', 'success');
        }
    }

    /**
     * Get cell address from row and column indices
     */
    public getCellAddress(row: number, col: number): string {
        let columnName = '';
        let temp = col;
        
        while (temp >= 0) {
            columnName = String.fromCharCode(65 + (temp % 26)) + columnName;
            temp = Math.floor(temp / 26) - 1;
        }
        
        return `${columnName}${row + 1}`;
    }

    /**
     * Highlight cells in Excel
     */
    public async highlightCells(
        sheetName: string, 
        startRow: number, 
        startCol: number, 
        endRow: number, 
        endCol: number,
        color: string = '#FFFF00'
    ): Promise<void> {
        if (!this.isRunningInExcel()) {
            throw new Error('Not running in Excel context');
        }

        return Excel.run(async (context: any) => {
            const sheet = context.workbook.worksheets.getItem(sheetName);
            const range = sheet.getRangeByIndexes(
                startRow, 
                startCol, 
                endRow - startRow + 1, 
                endCol - startCol + 1
            );
            range.format.fill.color = color;
            await context.sync();
        });
    }
}

// Export singleton instance
export const excelAddIn = ExcelAddInService.getInstance();
