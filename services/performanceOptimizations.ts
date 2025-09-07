import React from 'react';
import type { WorkbookData, ColumnAnalysis, AppResult, HistoryItem } from '../types';

// Cache implementation with LRU eviction
class LRUCache<K, V> {
  private cache = new Map<K, V>();
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // Move to end (most recently used)
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      // Update existing
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Performance-optimized caching service
export class CacheService {
  // Formula generation cache
  private static formulaCache = new LRUCache<string, AppResult>(50);
  
  // Macro generation cache
  private static macroCache = new LRUCache<string, AppResult>(30);
  
  // Analysis cache
  private static analysisCache = new LRUCache<string, ColumnAnalysis[]>(20);
  
  // Calculation cache for live preview
  private static calculationCache = new LRUCache<string, string>(200);

  // Generate cache key for formula requests
  private static generateFormulaKey(
    workbookData: WorkbookData,
    userPrompt: string,
    analysis: ColumnAnalysis[],
    excelLanguage: 'tr' | 'en',
    excelVersion: string
  ): string {
    // Create a compact hash of the workbook data
    const dataHash = this.hashWorkbookData(workbookData);
    const analysisHash = this.hashAnalysis(analysis);
    return `formula:${dataHash}:${analysisHash}:${userPrompt}:${excelLanguage}:${excelVersion}`;
  }

  // Generate cache key for macro requests
  private static generateMacroKey(
    workbookData: WorkbookData,
    userPrompt: string,
    analysis: ColumnAnalysis[]
  ): string {
    const dataHash = this.hashWorkbookData(workbookData);
    const analysisHash = this.hashAnalysis(analysis);
    return `macro:${dataHash}:${analysisHash}:${userPrompt}`;
  }

  // Generate cache key for analysis
  private static generateAnalysisKey(workbookData: WorkbookData): string {
    return `analysis:${this.hashWorkbookData(workbookData)}`;
  }

  // Generate cache key for calculations
  private static generateCalculationKey(
    formula: string,
    rowData: any[],
    excelLanguage: 'tr' | 'en'
  ): string {
    const rowHash = this.hashArray(rowData);
    return `calc:${formula}:${rowHash}:${excelLanguage}`;
  }

  // Hash workbook data for caching
  private static hashWorkbookData(workbookData: WorkbookData): string {
    const sheets = Object.keys(workbookData).sort();
    let hash = '';
    
    for (const sheetName of sheets) {
      const sheetData = workbookData[sheetName];
      hash += `${sheetName}:${sheetData.length}:`;
      
      // Sample first few rows and last few rows for hash
      const sampleRows = [
        ...sheetData.slice(0, 3),
        ...sheetData.slice(-2)
      ];
      
      for (const row of sampleRows) {
        if (row) {
          hash += row.slice(0, 5).join(',') + '|';
        }
      }
    }
    
    return this.simpleHash(hash);
  }

  // Hash analysis data
  private static hashAnalysis(analysis: ColumnAnalysis[]): string {
    const analysisStr = analysis
      .map(a => `${a.sheetName}:${a.column}:${a.description}`)
      .join('|');
    return this.simpleHash(analysisStr);
  }

  // Hash array data
  private static hashArray(arr: any[]): string {
    const str = arr.map(item => String(item || '')).join(',');
    return this.simpleHash(str);
  }

  // Simple hash function
  private static simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  // Formula cache methods
  static getCachedFormula(
    workbookData: WorkbookData,
    userPrompt: string,
    analysis: ColumnAnalysis[],
    excelLanguage: 'tr' | 'en',
    excelVersion: string
  ): AppResult | undefined {
    const key = this.generateFormulaKey(workbookData, userPrompt, analysis, excelLanguage, excelVersion);
    return this.formulaCache.get(key);
  }

  static setCachedFormula(
    workbookData: WorkbookData,
    userPrompt: string,
    analysis: ColumnAnalysis[],
    excelLanguage: 'tr' | 'en',
    excelVersion: string,
    result: AppResult
  ): void {
    const key = this.generateFormulaKey(workbookData, userPrompt, analysis, excelLanguage, excelVersion);
    this.formulaCache.set(key, result);
  }

  // Macro cache methods
  static getCachedMacro(
    workbookData: WorkbookData,
    userPrompt: string,
    analysis: ColumnAnalysis[]
  ): AppResult | undefined {
    const key = this.generateMacroKey(workbookData, userPrompt, analysis);
    return this.macroCache.get(key);
  }

  static setCachedMacro(
    workbookData: WorkbookData,
    userPrompt: string,
    analysis: ColumnAnalysis[],
    result: AppResult
  ): void {
    const key = this.generateMacroKey(workbookData, userPrompt, analysis);
    this.macroCache.set(key, result);
  }

  // Analysis cache methods
  static getCachedAnalysis(workbookData: WorkbookData): ColumnAnalysis[] | undefined {
    const key = this.generateAnalysisKey(workbookData);
    return this.analysisCache.get(key);
  }

  static setCachedAnalysis(workbookData: WorkbookData, analysis: ColumnAnalysis[]): void {
    const key = this.generateAnalysisKey(workbookData);
    this.analysisCache.set(key, analysis);
  }

  // Calculation cache methods
  static getCachedCalculation(
    formula: string,
    rowData: any[],
    excelLanguage: 'tr' | 'en'
  ): string | undefined {
    const key = this.generateCalculationKey(formula, rowData, excelLanguage);
    return this.calculationCache.get(key);
  }

  static setCachedCalculation(
    formula: string,
    rowData: any[],
    excelLanguage: 'tr' | 'en',
    result: string
  ): void {
    const key = this.generateCalculationKey(formula, rowData, excelLanguage);
    this.calculationCache.set(key, result);
  }

  // Clear all caches
  static clearAllCaches(): void {
    this.formulaCache.clear();
    this.macroCache.clear();
    this.analysisCache.clear();
    this.calculationCache.clear();
  }

  // Get cache statistics
  static getCacheStats(): {
    formula: number;
    macro: number;
    analysis: number;
    calculation: number;
  } {
    return {
      formula: this.formulaCache.size(),
      macro: this.macroCache.size(),
      analysis: this.analysisCache.size(),
      calculation: this.calculationCache.size()
    };
  }
}

// Virtual scrolling implementation for large datasets
export class VirtualScrollManager {
  private container: HTMLElement | null = null;
  private itemHeight: number = 40;
  private visibleCount: number = 20;
  private scrollTop: number = 0;
  private totalItems: number = 0;
  private onScroll?: (startIndex: number, endIndex: number) => void;

  constructor(
    itemHeight: number = 40,
    visibleCount: number = 20
  ) {
    this.itemHeight = itemHeight;
    this.visibleCount = visibleCount;
  }

  setContainer(container: HTMLElement): void {
    this.container = container;
    this.container.addEventListener('scroll', this.handleScroll.bind(this));
  }

  setTotalItems(count: number): void {
    this.totalItems = count;
    this.updateScrollHeight();
  }

  setOnScroll(callback: (startIndex: number, endIndex: number) => void): void {
    this.onScroll = callback;
  }

  private handleScroll(): void {
    if (!this.container) return;
    
    this.scrollTop = this.container.scrollTop;
    const startIndex = Math.floor(this.scrollTop / this.itemHeight);
    const endIndex = Math.min(startIndex + this.visibleCount, this.totalItems);
    
    this.onScroll?.(startIndex, endIndex);
  }

  private updateScrollHeight(): void {
    if (!this.container) return;
    
    const totalHeight = this.totalItems * this.itemHeight;
    this.container.style.height = `${totalHeight}px`;
  }

  getVisibleRange(): { start: number; end: number } {
    const startIndex = Math.floor(this.scrollTop / this.itemHeight);
    const endIndex = Math.min(startIndex + this.visibleCount, this.totalItems);
    return { start: startIndex, end: endIndex };
  }

  scrollToIndex(index: number): void {
    if (!this.container) return;
    
    const scrollTop = index * this.itemHeight;
    this.container.scrollTop = scrollTop;
  }

  destroy(): void {
    if (this.container) {
      this.container.removeEventListener('scroll', this.handleScroll);
    }
  }
}

// Request debouncing and throttling
export class RequestOptimizer {
  private static debounceTimers = new Map<string, NodeJS.Timeout>();
  private static throttleLastRun = new Map<string, number>();

  // Debounce function calls
  static debounce<T extends (...args: any[]) => any>(
    key: string,
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    return (...args: Parameters<T>) => {
      // Clear existing timer
      const existingTimer = this.debounceTimers.get(key);
      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      // Set new timer
      const timer = setTimeout(() => {
        func(...args);
        this.debounceTimers.delete(key);
      }, delay);

      this.debounceTimers.set(key, timer);
    };
  }

  // Throttle function calls
  static throttle<T extends (...args: any[]) => any>(
    key: string,
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    return (...args: Parameters<T>) => {
      const lastRun = this.throttleLastRun.get(key) || 0;
      const now = Date.now();

      if (now - lastRun >= delay) {
        func(...args);
        this.throttleLastRun.set(key, now);
      }
    };
  }

  // Clear all timers
  static clearAll(): void {
    for (const timer of this.debounceTimers.values()) {
      clearTimeout(timer);
    }
    this.debounceTimers.clear();
    this.throttleLastRun.clear();
  }
}

// Memory usage monitoring
export class MemoryMonitor {
  private static measurements: number[] = [];
  private static maxMeasurements = 100;

  static recordMemoryUsage(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const usedJSHeapSize = memory.usedJSHeapSize / 1024 / 1024; // MB
      
      this.measurements.push(usedJSHeapSize);
      
      if (this.measurements.length > this.maxMeasurements) {
        this.measurements.shift();
      }
    }
  }

  static getMemoryStats(): {
    current: number;
    average: number;
    peak: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  } | null {
    if (this.measurements.length === 0) return null;

    const current = this.measurements[this.measurements.length - 1];
    const average = this.measurements.reduce((a, b) => a + b, 0) / this.measurements.length;
    const peak = Math.max(...this.measurements);
    
    // Simple trend analysis
    let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    if (this.measurements.length >= 10) {
      const recent = this.measurements.slice(-5);
      const older = this.measurements.slice(-10, -5);
      const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
      const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
      
      if (recentAvg > olderAvg * 1.1) {
        trend = 'increasing';
      } else if (recentAvg < olderAvg * 0.9) {
        trend = 'decreasing';
      }
    }

    return { current, average, peak, trend };
  }

  static shouldTriggerGarbageCollection(): boolean {
    const stats = this.getMemoryStats();
    if (!stats) return false;
    
    // Trigger if current usage is significantly higher than average
    return stats.current > stats.average * 1.5 && stats.trend === 'increasing';
  }
}

// Bundle size optimization utilities
export class BundleOptimizer {
  // Lazy load heavy components
  static lazyLoad<T extends React.ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>
  ): React.ComponentType<React.ComponentProps<T>> {
    return React.lazy(importFunc);
  }

  // Preload critical resources
  static preloadResource(url: string, type: 'script' | 'style' | 'font'): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    
    switch (type) {
      case 'script':
        link.as = 'script';
        break;
      case 'style':
        link.as = 'style';
        break;
      case 'font':
        link.as = 'font';
        link.crossOrigin = 'anonymous';
        break;
    }
    
    document.head.appendChild(link);
  }

  // Code splitting helper
  static async loadModule<T>(
    moduleLoader: () => Promise<T>
  ): Promise<T> {
    try {
      return await moduleLoader();
    } catch (error) {
      console.error('Failed to load module:', error);
      throw error;
    }
  }
}

// Export all optimizations


// Auto-start memory monitoring
if (typeof window !== 'undefined') {
  setInterval(() => {
    MemoryMonitor.recordMemoryUsage();
  }, 5000); // Record every 5 seconds
}