import { GenerateContentResponse } from "@google/genai";
import type { WorkbookData, ColumnAnalysis, AppResult, FormulaResponse, MacroResponse } from '../types';

// Enhanced error types for better error handling
export class AIServiceError extends Error {
    constructor(
        message: string, 
        public code: string,
        public retryable: boolean = false,
        public originalError?: Error
    ) {
        super(message);
        this.name = 'AIServiceError';
    }
}

export class ValidationError extends AIServiceError {
    constructor(message: string, public field: string) {
        super(message, 'VALIDATION_ERROR', false);
        this.name = 'ValidationError';
    }
}

export class TimeoutError extends AIServiceError {
    constructor(message: string = 'Request timeout') {
        super(message, 'TIMEOUT_ERROR', true);
        this.name = 'TimeoutError';
    }
}

export class RateLimitError extends AIServiceError {
    constructor(message: string = 'Rate limit exceeded') {
        super(message, 'RATE_LIMIT_ERROR', true);
        this.name = 'RateLimitError';
    }
}

// Enhanced response validation
export class ResponseValidator {
    static validateFormulaResponse(data: any): FormulaResponse {
        const errors: string[] = [];

        // Validate analysis
        if (!data.analysis) {
            errors.push('Missing analysis object');
        } else {
            if (!data.analysis.source) errors.push('Missing analysis.source');
            if (!data.analysis.target) errors.push('Missing analysis.target');
            if (!data.analysis.type) errors.push('Missing analysis.type');
            if (!data.analysis.complexity) errors.push('Missing analysis.complexity');
        }

        // Validate formula
        if (!data.formula) {
            errors.push('Missing formula object');
        } else {
            if (!data.formula.code) errors.push('Missing formula.code');
            if (!data.formula.description) errors.push('Missing formula.description');
            if (!data.formula.code.startsWith('=')) {
                errors.push('Formula code must start with "="');
            }
        }

        // Validate guide
        if (!data.guide) {
            errors.push('Missing guide object');
        } else {
            if (!Array.isArray(data.guide.steps) || data.guide.steps.length === 0) {
                errors.push('Guide steps must be a non-empty array');
            }
            if (!data.guide.tip) errors.push('Missing guide.tip');
        }

        // Validate example
        if (!data.example) {
            errors.push('Missing example object');
        } else {
            if (!data.example.scenario) errors.push('Missing example.scenario');
            if (!data.example.result) errors.push('Missing example.result');
        }

        // Validate warnings
        if (!Array.isArray(data.warnings)) {
            errors.push('Warnings must be an array');
        } else {
            data.warnings.forEach((warning: any, index: number) => {
                if (!warning.error) errors.push(`Missing warning[${index}].error`);
                if (!warning.solution) errors.push(`Missing warning[${index}].solution`);
            });
        }

        if (errors.length > 0) {
            throw new ValidationError(`Invalid formula response: ${errors.join(', ')}`, 'response_validation');
        }

        return data as FormulaResponse;
    }

    static validateMacroResponse(data: any): MacroResponse {
        const errors: string[] = [];

        if (!data.title) errors.push('Missing title');
        if (!data.description) errors.push('Missing description');
        if (!data.code) errors.push('Missing code');

        // Validate usage
        if (!data.usage) {
            errors.push('Missing usage object');
        } else {
            if (!Array.isArray(data.usage.steps) || data.usage.steps.length === 0) {
                errors.push('Usage steps must be a non-empty array');
            }
            if (!data.usage.tip) errors.push('Missing usage.tip');
            if (!['standard', 'worksheet', 'workbook'].includes(data.usage.placement)) {
                errors.push('Invalid usage.placement value');
            }
        }

        // Validate warnings
        if (!Array.isArray(data.warnings)) {
            errors.push('Warnings must be an array');
        } else {
            data.warnings.forEach((warning: any, index: number) => {
                if (!warning.title) errors.push(`Missing warning[${index}].title`);
                if (!warning.details) errors.push(`Missing warning[${index}].details`);
            });
        }

        if (errors.length > 0) {
            throw new ValidationError(`Invalid macro response: ${errors.join(', ')}`, 'response_validation');
        }

        return data as MacroResponse;
    }

    static validateColumnAnalysis(data: any): ColumnAnalysis[] {
        if (!Array.isArray(data)) {
            throw new ValidationError('Column analysis must be an array', 'analysis_validation');
        }

        const errors: string[] = [];
        data.forEach((item: any, index: number) => {
            if (!item.sheetName) errors.push(`Missing sheetName at index ${index}`);
            if (!item.column) errors.push(`Missing column at index ${index}`);
            if (!item.description) errors.push(`Missing description at index ${index}`);
        });

        if (errors.length > 0) {
            throw new ValidationError(`Invalid column analysis: ${errors.join(', ')}`, 'analysis_validation');
        }

        return data as ColumnAnalysis[];
    }
}

// Enhanced retry mechanism
export class RetryManager {
    static async withRetry<T>(
        operation: () => Promise<T>,
        maxRetries: number = 3,
        baseDelay: number = 1000,
        shouldRetry: (error: Error) => boolean = (error) => error instanceof AIServiceError && error.retryable
    ): Promise<T> {
        let lastError: Error;

        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                return await operation();
            } catch (error) {
                lastError = error as Error;
                
                if (attempt === maxRetries || !shouldRetry(lastError)) {
                    break;
                }

                const delay = baseDelay * Math.pow(2, attempt); // Exponential backoff
                console.warn(`Attempt ${attempt + 1} failed, retrying in ${delay}ms:`, lastError.message);
                await this.delay(delay);
            }
        }

        throw lastError!;
    }

    private static delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Enhanced request manager with timeout and cancellation
export class RequestManager {
    private static abortController: AbortController | null = null;

    static async withTimeout<T>(
        operation: () => Promise<T>,
        timeoutMs: number = 30000,
        abortSignal?: AbortSignal
    ): Promise<T> {
        const timeoutController = new AbortController();
        const operationController = new AbortController();
        
        // Combine timeout and external abort signals
        const combinedSignal = this.combineAbortSignals([
            timeoutController.signal,
            operationController.signal,
            ...(abortSignal ? [abortSignal] : [])
        ]);

        const timeoutId = setTimeout(() => {
            timeoutController.abort();
        }, timeoutMs);

        try {
            // Store the controller for external cancellation
            this.abortController = operationController;

            const result = await operation();
            
            if (combinedSignal.aborted) {
                throw new TimeoutError('Operation was cancelled');
            }
            
            return result;
        } catch (error) {
            if (combinedSignal.aborted) {
                throw new TimeoutError('Operation timed out or was cancelled');
            }
            throw error;
        } finally {
            clearTimeout(timeoutId);
            this.abortController = null;
        }
    }

    static cancel(): void {
        if (this.abortController) {
            this.abortController.abort();
        }
    }

    private static combineAbortSignals(signals: AbortSignal[]): AbortSignal {
        const controller = new AbortController();
        
        for (const signal of signals) {
            if (signal.aborted) {
                controller.abort();
                break;
            }
            signal.addEventListener('abort', () => controller.abort());
        }
        
        return controller.signal;
    }
}

// Performance monitoring
export class PerformanceMonitor {
    private static metrics: Map<string, number[]> = new Map();

    static startTimer(operation: string): () => number {
        const startTime = performance.now();
        return () => {
            const duration = performance.now() - startTime;
            this.recordMetric(operation, duration);
            return duration;
        };
    }

    static recordMetric(operation: string, duration: number): void {
        if (!this.metrics.has(operation)) {
            this.metrics.set(operation, []);
        }
        
        const operationMetrics = this.metrics.get(operation)!;
        operationMetrics.push(duration);
        
        // Keep only last 100 measurements
        if (operationMetrics.length > 100) {
            operationMetrics.shift();
        }
    }

    static getMetrics(operation: string): {
        count: number;
        average: number;
        min: number;
        max: number;
        p95: number;
    } | null {
        const operationMetrics = this.metrics.get(operation);
        if (!operationMetrics || operationMetrics.length === 0) {
            return null;
        }

        const sorted = [...operationMetrics].sort((a, b) => a - b);
        const count = sorted.length;
        const sum = sorted.reduce((a, b) => a + b, 0);
        const average = sum / count;
        const min = sorted[0];
        const max = sorted[count - 1];
        const p95Index = Math.floor(count * 0.95);
        const p95 = sorted[p95Index];

        return { count, average, min, max, p95 };
    }

    static getAllMetrics(): Record<string, ReturnType<typeof PerformanceMonitor.getMetrics>> {
        const result: Record<string, ReturnType<typeof PerformanceMonitor.getMetrics>> = {};
        for (const operation of this.metrics.keys()) {
            result[operation] = this.getMetrics(operation);
        }
        return result;
    }
}

// Enhanced response processor
export class ResponseProcessor {
    static async safeJsonParse<T>(
        text: string,
        validator: (data: any) => T,
        context: string = 'response'
    ): Promise<T> {
        try {
            // Clean the response text
            const cleanedText = this.cleanJsonResponse(text);
            const parsed = JSON.parse(cleanedText);
            
            // Validate the parsed data
            return validator(parsed);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            }
            
            if (error instanceof SyntaxError) {
                throw new ValidationError(
                    `Invalid JSON in ${context}: ${error.message}`,
                    'json_parse'
                );
            }
            
            throw new AIServiceError(
                `Failed to process ${context}: ${error instanceof Error ? error.message : String(error)}`,
                'PROCESSING_ERROR',
                false,
                error instanceof Error ? error : undefined
            );
        }
    }

    private static cleanJsonResponse(text: string): string {
        // Remove common markdown code block markers
        let cleaned = text.replace(/^```(?:json)?\s*\n?/gm, '').replace(/\n?```\s*$/gm, '');
        
        // Remove any leading/trailing whitespace
        cleaned = cleaned.trim();
        
        // Handle potential prefix text before JSON
        const jsonStartIndex = cleaned.search(/^\s*[\{\[]/);
        if (jsonStartIndex > 0) {
            cleaned = cleaned.substring(jsonStartIndex);
        }
        
        return cleaned;
    }
}

