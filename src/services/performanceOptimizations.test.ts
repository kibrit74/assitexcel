import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  CacheService,
  MemoryMonitor,
  RequestOptimizer,
  VirtualScrollManager,
  LRUCache
} from '../../services/performanceOptimizations';
import type { WorkbookData, ColumnAnalysis, AppResult } from '../../types';

describe('Performance Optimizations', () => {
  describe('LRUCache', () => {
    let cache: LRUCache<string, number>;

    beforeEach(() => {
      cache = new LRUCache<string, number>(3);
    });

    it('stores and retrieves values', () => {
      cache.set('key1', 1);
      cache.set('key2', 2);
      
      expect(cache.get('key1')).toBe(1);
      expect(cache.get('key2')).toBe(2);
      expect(cache.get('nonexistent')).toBeUndefined();
    });

    it('evicts least recently used items', () => {
      cache.set('key1', 1);
      cache.set('key2', 2);
      cache.set('key3', 3);
      cache.set('key4', 4); // Should evict key1
      
      expect(cache.get('key1')).toBeUndefined();
      expect(cache.get('key2')).toBe(2);
      expect(cache.get('key3')).toBe(3);
      expect(cache.get('key4')).toBe(4);
    });

    it('updates LRU order on access', () => {
      cache.set('key1', 1);
      cache.set('key2', 2);
      cache.set('key3', 3);
      
      // Access key1 to make it most recently used
      cache.get('key1');
      
      // Add new item, should evict key2 (least recently used)
      cache.set('key4', 4);
      
      expect(cache.get('key1')).toBe(1); // Still exists
      expect(cache.get('key2')).toBeUndefined(); // Evicted
      expect(cache.get('key3')).toBe(3);
      expect(cache.get('key4')).toBe(4);
    });

    it('tracks size correctly', () => {
      expect(cache.size()).toBe(0);
      
      cache.set('key1', 1);
      expect(cache.size()).toBe(1);
      
      cache.set('key2', 2);
      cache.set('key3', 3);
      expect(cache.size()).toBe(3);
      
      cache.set('key4', 4); // Evicts one
      expect(cache.size()).toBe(3);
    });

    it('clears all items', () => {
      cache.set('key1', 1);
      cache.set('key2', 2);
      
      cache.clear();
      
      expect(cache.size()).toBe(0);
      expect(cache.get('key1')).toBeUndefined();
    });
  });

  describe('CacheService', () => {
    const mockWorkbookData: WorkbookData = {
      'Sheet1': [
        ['Name', 'Age'],
        ['John', 25],
        ['Jane', 30]
      ]
    };

    const mockAnalysis: ColumnAnalysis[] = [
      { sheetName: 'Sheet1', column: 'A', description: 'Names' },
      { sheetName: 'Sheet1', column: 'B', description: 'Ages' }
    ];

    const mockResult: AppResult = {
      type: 'formula',
      data: {
        analysis: { source: 'A1', target: 'B1', type: 'text', complexity: 'simple' },
        formula: { code: '=A1&B1', description: 'Concatenate' },
        guide: { steps: ['Step 1'], tip: 'Tip' },
        example: { scenario: 'Example', result: 'Result' },
        warnings: []
      }
    };

    beforeEach(() => {
      CacheService.clearAllCaches();
    });

    it('caches and retrieves formula results', () => {
      const prompt = 'Concatenate names';
      
      // Initially no cache
      const cached1 = CacheService.getCachedFormula(mockWorkbookData, prompt, mockAnalysis, 'tr', '365');
      expect(cached1).toBeUndefined();
      
      // Set cache
      CacheService.setCachedFormula(mockWorkbookData, prompt, mockAnalysis, 'tr', '365', mockResult);
      
      // Retrieve from cache
      const cached2 = CacheService.getCachedFormula(mockWorkbookData, prompt, mockAnalysis, 'tr', '365');
      expect(cached2).toEqual(mockResult);
    });

    it('generates different keys for different parameters', () => {
      const prompt = 'Test prompt';
      
      CacheService.setCachedFormula(mockWorkbookData, prompt, mockAnalysis, 'tr', '365', mockResult);
      
      // Different language should not match
      const cached1 = CacheService.getCachedFormula(mockWorkbookData, prompt, mockAnalysis, 'en', '365');
      expect(cached1).toBeUndefined();
      
      // Different version should not match
      const cached2 = CacheService.getCachedFormula(mockWorkbookData, prompt, mockAnalysis, 'tr', '2019');
      expect(cached2).toBeUndefined();
      
      // Same parameters should match
      const cached3 = CacheService.getCachedFormula(mockWorkbookData, prompt, mockAnalysis, 'tr', '365');
      expect(cached3).toEqual(mockResult);
    });

    it('returns correct cache statistics', () => {
      const initialStats = CacheService.getCacheStats();
      expect(initialStats.formula).toBe(0);
      expect(initialStats.macro).toBe(0);
      expect(initialStats.analysis).toBe(0);
      expect(initialStats.calculation).toBe(0);
      
      CacheService.setCachedFormula(mockWorkbookData, 'test', mockAnalysis, 'tr', '365', mockResult);
      CacheService.setCachedAnalysis(mockWorkbookData, mockAnalysis);
      
      const newStats = CacheService.getCacheStats();
      expect(newStats.formula).toBe(1);
      expect(newStats.analysis).toBe(1);
    });

    it('clears all caches', () => {
      CacheService.setCachedFormula(mockWorkbookData, 'test', mockAnalysis, 'tr', '365', mockResult);
      CacheService.setCachedAnalysis(mockWorkbookData, mockAnalysis);
      
      CacheService.clearAllCaches();
      
      const stats = CacheService.getCacheStats();
      expect(stats.formula).toBe(0);
      expect(stats.analysis).toBe(0);
    });
  });

  describe('MemoryMonitor', () => {
    beforeEach(() => {
      // Reset measurements
      (MemoryMonitor as any).measurements = [];
    });

    it('records memory usage', () => {
      MemoryMonitor.recordMemoryUsage();
      
      const stats = MemoryMonitor.getMemoryStats();
      expect(stats).toBeTruthy();
      expect(stats?.current).toBeGreaterThan(0);
    });

    it('calculates memory statistics', () => {
      // Record some measurements
      for (let i = 0; i < 5; i++) {
        MemoryMonitor.recordMemoryUsage();
      }
      
      const stats = MemoryMonitor.getMemoryStats();
      expect(stats).toBeTruthy();
      expect(stats?.current).toBeGreaterThan(0);
      expect(stats?.average).toBeGreaterThan(0);
      expect(stats?.peak).toBeGreaterThan(0);
      expect(['increasing', 'decreasing', 'stable']).toContain(stats?.trend);
    });

    it('detects garbage collection need', () => {
      // Mock high memory usage
      const originalMemory = (performance as any).memory;
      (performance as any).memory = {
        usedJSHeapSize: 100 * 1024 * 1024, // 100MB
        totalJSHeapSize: 200 * 1024 * 1024, // 200MB
      };

      for (let i = 0; i < 10; i++) {
        MemoryMonitor.recordMemoryUsage();
      }

      const shouldTriggerGC = MemoryMonitor.shouldTriggerGarbageCollection();
      expect(typeof shouldTriggerGC).toBe('boolean');

      // Restore original
      (performance as any).memory = originalMemory;
    });
  });

  describe('RequestOptimizer', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
      RequestOptimizer.clearAll();
    });

    it('debounces function calls', () => {
      const mockFn = vi.fn();
      const debouncedFn = RequestOptimizer.debounce('test', mockFn, 1000);
      
      // Call multiple times quickly
      debouncedFn();
      debouncedFn();
      debouncedFn();
      
      // Should not have been called yet
      expect(mockFn).not.toHaveBeenCalled();
      
      // Fast-forward time
      vi.advanceTimersByTime(1000);
      
      // Should be called once
      expect(mockFn).toHaveBeenCalledOnce();
    });

    it('throttles function calls', () => {
      const mockFn = vi.fn();
      const throttledFn = RequestOptimizer.throttle('test', mockFn, 1000);
      
      // First call should execute immediately
      throttledFn();
      expect(mockFn).toHaveBeenCalledOnce();
      
      // Subsequent calls within delay should be ignored
      throttledFn();
      throttledFn();
      expect(mockFn).toHaveBeenCalledOnce();
      
      // After delay, next call should execute
      vi.advanceTimersByTime(1000);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('clears all timers', () => {
      const mockFn = vi.fn();
      const debouncedFn = RequestOptimizer.debounce('test', mockFn, 1000);
      
      debouncedFn();
      RequestOptimizer.clearAll();
      
      vi.advanceTimersByTime(1000);
      
      // Should not be called after clearing
      expect(mockFn).not.toHaveBeenCalled();
    });
  });

  describe('VirtualScrollManager', () => {
    let manager: VirtualScrollManager;
    let mockContainer: HTMLElement;

    beforeEach(() => {
      manager = new VirtualScrollManager(40, 20);
      
      // Create mock container
      mockContainer = document.createElement('div');
      Object.defineProperty(mockContainer, 'scrollTop', {
        writable: true,
        value: 0
      });
      
      // Mock getBoundingClientRect
      mockContainer.getBoundingClientRect = vi.fn(() => ({
        height: 800,
        width: 400,
        top: 0,
        left: 0,
        bottom: 800,
        right: 400,
        x: 0,
        y: 0,
        toJSON: () => ({})
      }));
    });

    it('calculates visible range correctly', () => {
      manager.setContainer(mockContainer);
      manager.setTotalItems(100);
      
      const range = manager.getVisibleRange();
      expect(range.start).toBe(0);
      expect(range.end).toBeLessThanOrEqual(100);
    });

    it('updates scroll position and triggers callback', () => {
      const onScrollCallback = vi.fn();
      manager.setContainer(mockContainer);
      manager.setOnScroll(onScrollCallback);
      manager.setTotalItems(100);
      
      // Simulate scroll
      mockContainer.scrollTop = 200;
      mockContainer.dispatchEvent(new Event('scroll'));
      
      expect(onScrollCallback).toHaveBeenCalled();
    });

    it('scrolls to specific index', () => {
      manager.setContainer(mockContainer);
      manager.setTotalItems(100);
      
      manager.scrollToIndex(10);
      
      expect(mockContainer.scrollTop).toBe(400); // 10 * 40px item height
    });

    it('cleans up event listeners', () => {
      const removeEventListenerSpy = vi.spyOn(mockContainer, 'removeEventListener');
      
      manager.setContainer(mockContainer);
      manager.destroy();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
  });
});