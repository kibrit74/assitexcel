import React, { useState, useEffect } from 'react';
import { CacheService, MemoryMonitor } from '../services/performanceOptimizations';
import { PerformanceMonitor as PerfMonitor } from '../services/enhancedAIService';

// Icon Components
const MonitorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="3" rx="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);

const CacheIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
    <path d="M3 3v5h5"></path>
  </svg>
);

const CleanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ChevronUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

interface PerformanceMonitorProps {
  isDevelopment?: boolean;
}

export const PerformanceMonitorComponent: React.FC<PerformanceMonitorProps> = ({ 
  isDevelopment = process.env.NODE_ENV === 'development' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cacheStats, setCacheStats] = useState(CacheService.getCacheStats());
  const [memoryStats, setMemoryStats] = useState(MemoryMonitor.getMemoryStats());
  const [performanceMetrics, setPerformanceMetrics] = useState<Record<string, any>>({});

  // Update stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setCacheStats(CacheService.getCacheStats());
      setMemoryStats(MemoryMonitor.getMemoryStats());
      setPerformanceMetrics(PerfMonitor.getAllMetrics());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Only show in development mode or when explicitly enabled
  if (!isDevelopment) {
    return null;
  }

  const handleClearCaches = () => {
    CacheService.clearAllCaches();
    setCacheStats(CacheService.getCacheStats());
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const formatTime = (ms: number): string => {
    if (ms < 1000) return `${ms.toFixed(0)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-between text-sm font-medium text-slate-700"
        >
          <div className="flex items-center gap-2">
            <MonitorIcon />
            <span>Performance Monitor</span>
          </div>
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>

        {/* Content */}
        {isOpen && (
          <div className="p-4 space-y-4 max-w-sm">
            {/* Cache Statistics */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-slate-800 flex items-center gap-1">
                  <CacheIcon />
                  Cache Stats
                </h3>
                <button
                  onClick={handleClearCaches}
                  className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1"
                  title="Clear all caches"
                >
                  <CleanIcon />
                  Clear
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-blue-50 p-2 rounded">
                  <div className="font-medium text-blue-800">Formulas</div>
                  <div className="text-blue-600">{cacheStats.formula} cached</div>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <div className="font-medium text-green-800">Macros</div>
                  <div className="text-green-600">{cacheStats.macro} cached</div>
                </div>
                <div className="bg-purple-50 p-2 rounded">
                  <div className="font-medium text-purple-800">Analysis</div>
                  <div className="text-purple-600">{cacheStats.analysis} cached</div>
                </div>
                <div className="bg-orange-50 p-2 rounded">
                  <div className="font-medium text-orange-800">Calculations</div>
                  <div className="text-orange-600">{cacheStats.calculation} cached</div>
                </div>
              </div>
            </div>

            {/* Memory Statistics */}
            {memoryStats && (
              <div>
                <h3 className="text-sm font-medium text-slate-800 mb-2">Memory Usage</h3>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Current:</span>
                    <span className="font-mono">{memoryStats.current.toFixed(2)} MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average:</span>
                    <span className="font-mono">{memoryStats.average.toFixed(2)} MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Peak:</span>
                    <span className="font-mono">{memoryStats.peak.toFixed(2)} MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trend:</span>
                    <span className={`font-medium ${
                      memoryStats.trend === 'increasing' ? 'text-red-600' :
                      memoryStats.trend === 'decreasing' ? 'text-green-600' :
                      'text-slate-600'
                    }`}>
                      {memoryStats.trend}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Metrics */}
            {Object.keys(performanceMetrics).length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-slate-800 mb-2">Performance</h3>
                <div className="space-y-2 text-xs">
                  {Object.entries(performanceMetrics).map(([operation, metrics]) => {
                    if (!metrics) return null;
                    return (
                      <div key={operation} className="bg-slate-50 p-2 rounded">
                        <div className="font-medium text-slate-700 capitalize mb-1">
                          {operation.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <div>
                            <span className="text-slate-500">Avg:</span>
                            <span className="ml-1 font-mono">{formatTime(metrics.average)}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Count:</span>
                            <span className="ml-1 font-mono">{metrics.count}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Min:</span>
                            <span className="ml-1 font-mono">{formatTime(metrics.min)}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">P95:</span>
                            <span className="ml-1 font-mono">{formatTime(metrics.p95)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Performance Tips */}
            <div>
              <h3 className="text-sm font-medium text-slate-800 mb-2">Tips</h3>
              <div className="text-xs text-slate-600 space-y-1">
                <div>• Cached requests are served instantly</div>
                <div>• Clear cache if memory usage is high</div>
                <div>• Image uploads disable caching</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceMonitorComponent;