
export interface FormulaAnalysis {
  source: string;
  target: string;
  type: string;
  complexity: string;
}

export interface FormulaDetails {
  code: string;
  description: string;
}

export interface FormulaGuide {
  steps: string[];
  tip: string;
}

export interface FormulaExample {
  scenario: string;
  result: string;
}

export interface FormulaWarning {
  error: string;
  solution: string;
}

export interface FormulaResponse {
  analysis: FormulaAnalysis;
  formula: FormulaDetails;
  guide: FormulaGuide;
  example: FormulaExample;
  warnings: FormulaWarning[];
}

export interface MacroResponse {
  title: string;
  description: string;
  code: string;
  usage: {
    steps: string[];
    tip: string;
    placement: 'standard' | 'worksheet' | 'workbook';
    worksheet_name?: string;
  };
  warnings: {
    title: string;
    details: string;
  }[];
}

export interface WebSearchResponse {
  responseText: string;
  sources: {
    uri: string;
    title: string;
  }[];
}

export type AppResult =
  | { type: 'formula'; data: FormulaResponse }
  | { type: 'macro'; data: MacroResponse }
  | { type: 'web_search'; data: WebSearchResponse };

export interface HistoryItem {
  prompt: string;
  result: AppResult;
}


export interface ColumnAnalysis {
  sheetName: string;
  column: string;
  description: string;
}

export type SheetData = (string | number | null | Date)[][];
export type WorkbookData = { [sheetName: string]: SheetData };