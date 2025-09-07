
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

// User Management Types
export interface User {
  id: string;
  email: string;
  fullName: string;
  createdAt: Date;
  lastLogin?: Date;
  profileImage?: string;
  membershipPlan: MembershipPlan;
  credits: number;
  maxCredits: number;
}

export interface UserPreferences {
  language: 'tr' | 'en';
  theme: 'light' | 'dark';
  emailNotifications: boolean;
  autoSaveHistory: boolean;
}

export interface MembershipPlan {
  id: string;
  name: string;
  type: 'free' | 'premium' | 'pro';
  monthlyCredits: number;
  price: number;
  currency: string;
  features: string[];
  isActive: boolean;
}

export interface SavedFormula {
  id: string;
  title: string;
  formula: string;
  description: string;
  category: string;
  createdAt: Date;
  lastUsed?: Date;
  tags: string[];
  isFavorite: boolean;
}

export interface SavedMacro {
  id: string;
  title: string;
  code: string;
  description: string;
  category: string;
  createdAt: Date;
  lastUsed?: Date;
  tags: string[];
  isFavorite: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  confirmPassword: string;
}

export interface PasswordResetData {
  email: string;
}

export interface UpdateProfileData {
  fullName?: string;
  email?: string;
  profileImage?: string;
  preferences?: Partial<UserPreferences>;
}

// Database History Types  
export interface DatabaseHistoryItem {
  id: string;
  user_id: string;
  prompt: string;
  result_type: 'formula' | 'macro' | 'web_search';
  result_data: string; // JSON stringified AppResult
  created_at: Date;
  updated_at: Date;
}

export interface UserHistory {
  id: string;
  userId: string;
  prompt: string;
  resultType: 'formula' | 'macro' | 'web_search';
  resultData: AppResult;
  createdAt: Date;
  updatedAt: Date;
}

// FAQ Types
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'formulas' | 'macros' | 'membership' | 'technical';
  isExpanded?: boolean;
}
