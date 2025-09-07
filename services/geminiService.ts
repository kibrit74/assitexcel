import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { 
    FORMULA_SYSTEM_PROMPT_JSON,
    FORMULA_SYSTEM_PROMPT_WEB_SEARCH,
    MACRO_SYSTEM_PROMPT_JSON,
    MACRO_SYSTEM_PROMPT_WEB_SEARCH,
    ANALYSIS_SYSTEM_PROMPT
} from '../constants';
import { helpContent } from '../data/helpContent';
import type { WorkbookData, FormulaResponse, ColumnAnalysis, MacroResponse, AppResult } from '../types';
import {
    AIServiceError,
    ValidationError,
    TimeoutError,
    RateLimitError,
    ResponseValidator,
    RetryManager,
    RequestManager,
    PerformanceMonitor,
    ResponseProcessor
} from './enhancedAIService';
import { CacheService } from './performanceOptimizations';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

type TrustedFormula = {
    prompt: string;
    formula: string;
};

const formatFormulaLibraryForPrompt = (library: TrustedFormula[]): string => {
    if (!library || library.length === 0) return "";

    let libraryString = "--- GÜVENİLİR FORMÜL KÜTÜPHANESİ (Doğru Çalıştığı Onaylanmış Formüller) ---\n";
    
    library.forEach(item => {
        libraryString += `
# Kullanıcı Talebi: ${item.prompt}
# Onaylanmış Doğru Formül:
${item.formula}
---
`;
    });
    return libraryString;
};


const generateColumnHeaders = (count: number): string[] => {
    const headers: string[] = [];
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


const formatExcelDataForPrompt = (data: WorkbookData): string => {
  let formattedString = "";
  for (const sheetName in data) {
    formattedString += `Sayfa Adı: ${sheetName}\n`;
    const sheetData = data[sheetName];
    if (sheetData.length === 0) {
        formattedString += "(Bu sayfa boş)\n\n";
        continue;
    }
    const colCount = sheetData.length > 0 ? Math.max(0, ...sheetData.map(row => row ? row.length : 0)) : 0;
    const headers = generateColumnHeaders(colCount);
    sheetData.forEach((row, rowIndex) => {
        if (!row) return; // robustness for sparse arrays
        const rowItems = [];
        for (let i = 0; i < colCount; i++) {
            const cell = row[i];
            const formattedCell = formatCellValue(cell);
            rowItems.push(`${headers[i]}${rowIndex + 1}: [${formattedCell}]`);
        }
        formattedString += rowItems.join(' | ') + '\n';
    });
    formattedString += '\n';
  }
  return formattedString;
};

const analysisSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            sheetName: { type: Type.STRING },
            column: { type: Type.STRING },
            description: { type: Type.STRING },
        },
        required: ['sheetName', 'column', 'description'],
    }
};


export const analyzeExcelData = async (workbookData: WorkbookData): Promise<ColumnAnalysis[]> => {
    const endTimer = PerformanceMonitor.startTimer('analyzeExcelData');
    
    // Check cache first
    const cachedResult = CacheService.getCachedAnalysis(workbookData);
    if (cachedResult) {
        console.log('Using cached analysis result');
        endTimer();
        return cachedResult;
    }
    
    try {
        const formattedExcelData = formatExcelDataForPrompt(workbookData);
        const userContent = `
--- ANALİZ EDİLECEK EXCEL VERİSİ ---
${formattedExcelData}
  `;

        const analysisOperation = async () => {
            return await RequestManager.withTimeout(async () => {
                const response: GenerateContentResponse = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: { parts: [{ text: userContent }] },
                    config: {
                        systemInstruction: ANALYSIS_SYSTEM_PROMPT,
                        responseMimeType: "application/json",
                        responseSchema: analysisSchema,
                        temperature: 0.1,
                    },
                });

                const jsonText = response.text?.trim();
                if (!jsonText) {
                    throw new AIServiceError('Empty response from AI service', 'EMPTY_RESPONSE', true);
                }

                return await ResponseProcessor.safeJsonParse(
                    jsonText,
                    ResponseValidator.validateColumnAnalysis,
                    'column analysis'
                );
            }, 15000); // 15 second timeout for analysis
        };

        const result = await RetryManager.withRetry(
            analysisOperation,
            3, // Max 3 retries
            1000, // 1 second base delay
            (error) => {
                // Retry on timeout, rate limit, or retryable AI service errors
                return error instanceof TimeoutError || 
                       error instanceof RateLimitError ||
                       (error instanceof AIServiceError && error.retryable);
            }
        );

        // Cache the successful result
        CacheService.setCachedAnalysis(workbookData, result);
        
        const duration = endTimer();
        console.log(`Excel data analysis completed in ${duration.toFixed(2)}ms`);
        
        return result;
    } catch (error) {
        endTimer();
        console.error("Error in analyzeExcelData:", error);
        
        if (error instanceof ValidationError || error instanceof TimeoutError) {
            throw error;
        }
        
        throw new AIServiceError(
            "Excel verisi analiz edilirken bir hata oluştu. Lütfen tekrar deneyin.",
            'ANALYSIS_ERROR',
            true,
            error instanceof Error ? error : undefined
        );
    }
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    analysis: {
      type: Type.OBJECT,
      properties: {
        source: { type: Type.STRING },
        target: { type: Type.STRING },
        type: { type: Type.STRING },
        complexity: { type: Type.STRING },
      },
      required: ['source', 'target', 'type', 'complexity'],
    },
    formula: {
      type: Type.OBJECT,
      properties: {
        code: { type: Type.STRING },
        description: { type: Type.STRING },
      },
      required: ['code', 'description'],
    },
    guide: {
      type: Type.OBJECT,
      properties: {
        steps: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        tip: { type: Type.STRING },
      },
      required: ['steps', 'tip'],
    },
    example: {
      type: Type.OBJECT,
      properties: {
        scenario: { type: Type.STRING },
        result: { type: Type.STRING },
      },
      required: ['scenario', 'result'],
    },
    warnings: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          error: { type: Type.STRING },
          solution: { type: Type.STRING },
        },
        required: ['error', 'solution'],
      },
    },
  },
  required: ['analysis', 'formula', 'guide', 'example', 'warnings'],
};

const formatAnalysisForPrompt = (analysis: ColumnAnalysis[]): string => {
  return analysis.map(item => `- Sayfa '${item.sheetName}', Sütun ${item.column}: ${item.description}`).join('\n');
}

const buildContentRequest = (text: string, image: string | null) => {
    if (!image) {
        return { parts: [{ text }] };
    }
    const mimeType = image.match(/^data:(image\/[a-zA-Z0-9-.+]+);base64,/)?.[1];
    if (!mimeType) {
        console.error("Could not determine mime type from image data URL.");
        return { parts: [{ text }] };
    }
    const base64Data = image.split(',')[1];
    const imagePart = {
        inlineData: {
            mimeType: mimeType,
            data: base64Data
        }
    };
    return { parts: [imagePart, { text }] };
};

const getVersionName = (v: string) => {
    switch(v) {
        case '365': return 'Excel 365 / 2021 (En Güncel)';
        case '2019': return 'Excel 2019';
        case '2016': return 'Excel 2016';
        case '2013': return 'Excel 2013 ve Daha Eski';
        default: return 'Bilinmiyor';
    }
};

const formatMacroLibraryForPrompt = (): string => {
    const macroGroups = helpContent.filter(group => group.isMacro);
    let libraryString = "--- DAHİLİ VBA MAKRO KÜTÜPHANESİ (Referans Alınacak Güvenilir Kaynak) ---\n";
    
    macroGroups.forEach(group => {
        group.examples.forEach(macro => {
            if(macro.code) {
                libraryString += `
# Makro Adı: ${macro.title}
# Açıklama: ${macro.helpDescription}
# Kullanım Senaryosu: ${macro.prompt}
# Güvenilir Kod Örneği:
${macro.code}
---
`;
            }
        });
    });
    return libraryString;
};

const buildUserContent = (
    mode: 'formula' | 'macro',
    formattedExcelData: string,
    formattedAnalysis: string,
    userPrompt: string,
    excelLanguage?: 'tr' | 'en',
    excelVersion?: string,
    macroLibrary?: string,
    formulaLibrary?: string
): string => {
    const analysisSection = `
--- SÜTUN ANALİZİ ---
${formattedAnalysis}

--- ANALİZ EDİLECEK EXCEL VERİSİ ---
${formattedExcelData}

--- KULLANICI TALEBİ ---
${userPrompt}
    `;

    if (mode === 'macro' && macroLibrary) {
        return `${macroLibrary}\n${analysisSection}`;
    }

    if (mode === 'formula' && excelLanguage && excelVersion) {
        const formulaLibrarySection = formulaLibrary ? `${formulaLibrary}\n` : '';
        const userInfoSection = `
--- KULLANICI EXCEL BİLGİLERİ ---
Excel Dili: ${excelLanguage === 'tr' ? 'Türkçe' : 'İngilizce'}
Excel Versiyonu: ${getVersionName(excelVersion)}
        `;
        return `${formulaLibrarySection}${userInfoSection}${analysisSection}`;
    }
    
    return analysisSection;
};


export const generateFormula = async (
  workbookData: WorkbookData, 
  userPrompt: string, 
  analysis: ColumnAnalysis[],
  excelLanguage: 'tr' | 'en',
  excelVersion: string,
  image: string | null,
  trustedFormulas: TrustedFormula[],
  ): Promise<AppResult> => {
    const endTimer = PerformanceMonitor.startTimer('generateFormula');
    
    // Check cache first (only if no image is provided)
    if (!image) {
        const cachedResult = CacheService.getCachedFormula(
            workbookData, 
            userPrompt, 
            analysis, 
            excelLanguage, 
            excelVersion
        );
        if (cachedResult) {
            console.log('Using cached formula result');
            endTimer();
            return cachedResult;
        }
    }
    
    try {
        const formattedExcelData = formatExcelDataForPrompt(workbookData);
        const formattedAnalysis = formatAnalysisForPrompt(analysis);
        const formattedFormulaLibrary = formatFormulaLibraryForPrompt(trustedFormulas);
        const userContentText = buildUserContent('formula', formattedExcelData, formattedAnalysis, userPrompt, excelLanguage, excelVersion, undefined, formattedFormulaLibrary);
        const contents = buildContentRequest(userContentText, image);

        const formulaOperation = async () => {
            return await RequestManager.withTimeout(async () => {
                const response: GenerateContentResponse = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: contents,
                    config: {
                        systemInstruction: FORMULA_SYSTEM_PROMPT_JSON,
                        responseMimeType: "application/json",
                        responseSchema: responseSchema,
                        temperature: 0.2,
                    },
                });
                
                const jsonText = response.text?.trim();
                if (!jsonText) {
                    throw new AIServiceError('Empty response from AI service', 'EMPTY_RESPONSE', true);
                }

                const formulaData = await ResponseProcessor.safeJsonParse(
                    jsonText,
                    ResponseValidator.validateFormulaResponse,
                    'formula generation'
                );
                
                return { type: 'formula' as const, data: formulaData };
            }, 25000); // 25 second timeout for formula generation
        };

        const result = await RetryManager.withRetry(
            formulaOperation,
            2, // Max 2 retries for formula generation
            1500, // 1.5 second base delay
            (error) => {
                // Be more selective about retries for formula generation
                return error instanceof TimeoutError ||
                       error instanceof RateLimitError ||
                       (error instanceof AIServiceError && error.retryable && error.code !== 'VALIDATION_ERROR');
            }
        );

        // Cache the successful result (only if no image was provided)
        if (!image) {
            CacheService.setCachedFormula(
                workbookData, 
                userPrompt, 
                analysis, 
                excelLanguage, 
                excelVersion, 
                result
            );
        }

        const duration = endTimer();
        console.log(`Formula generation completed in ${duration.toFixed(2)}ms`);
        
        return result;
    } catch (error) {
        endTimer();
        console.error("Error in generateFormula:", error);
        
        if (error instanceof ValidationError) {
            throw new AIServiceError(
                "Oluşturulan formül beklenmeyen bir formatta. Lütfen isteğinizi daha açık bir şekilde belirtin ve tekrar deneyin.",
                'VALIDATION_ERROR',
                false,
                error
            );
        }
        
        if (error instanceof TimeoutError) {
            throw new AIServiceError(
                "Formül oluşturma işlemi zaman aşımına uğradı. Lütfen tekrar deneyin.",
                'TIMEOUT_ERROR',
                true,
                error
            );
        }
        
        if (error instanceof AIServiceError) {
            throw error;
        }
        
        throw new AIServiceError(
            "Formül oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
            'GENERATION_ERROR',
            true,
            error instanceof Error ? error : undefined
        );
    }
};

const macroResponseSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    code: { type: Type.STRING },
    usage: {
      type: Type.OBJECT,
      properties: {
        steps: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        tip: { type: Type.STRING },
        placement: { type: Type.STRING, enum: ['standard', 'worksheet', 'workbook'] },
        worksheet_name: { type: Type.STRING },
      },
      required: ['steps', 'tip', 'placement'],
    },
    warnings: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          details: { type: Type.STRING },
        },
        required: ['title', 'details'],
      },
    },
  },
  required: ['title', 'description', 'code', 'usage', 'warnings'],
};

export const generateMacro = async (
  workbookData: WorkbookData, 
  userPrompt: string, 
  analysis: ColumnAnalysis[],
  image: string | null,
): Promise<AppResult> => {
    const endTimer = PerformanceMonitor.startTimer('generateMacro');
    
    // Check cache first (only if no image is provided)
    if (!image) {
        const cachedResult = CacheService.getCachedMacro(workbookData, userPrompt, analysis);
        if (cachedResult) {
            console.log('Using cached macro result');
            endTimer();
            return cachedResult;
        }
    }
    
    try {
        const formattedExcelData = formatExcelDataForPrompt(workbookData);
        const formattedAnalysis = formatAnalysisForPrompt(analysis);
        const formattedMacroLibrary = formatMacroLibraryForPrompt();
        const userContentText = buildUserContent('macro', formattedExcelData, formattedAnalysis, userPrompt, undefined, undefined, formattedMacroLibrary);
        const contents = buildContentRequest(userContentText, image);

        const macroOperation = async () => {
            return await RequestManager.withTimeout(async () => {
                const response: GenerateContentResponse = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: contents,
                    config: {
                        systemInstruction: MACRO_SYSTEM_PROMPT_JSON,
                        responseMimeType: "application/json",
                        responseSchema: macroResponseSchema,
                        temperature: 0.3,
                    },
                });
                
                const jsonText = response.text?.trim();
                if (!jsonText) {
                    throw new AIServiceError('Empty response from AI service', 'EMPTY_RESPONSE', true);
                }

                const macroData = await ResponseProcessor.safeJsonParse(
                    jsonText,
                    ResponseValidator.validateMacroResponse,
                    'macro generation'
                );
                
                return { type: 'macro' as const, data: macroData };
            }, 30000); // 30 second timeout for macro generation
        };

        const result = await RetryManager.withRetry(
            macroOperation,
            2, // Max 2 retries for macro generation
            2000, // 2 second base delay
            (error) => {
                return error instanceof TimeoutError ||
                       error instanceof RateLimitError ||
                       (error instanceof AIServiceError && error.retryable && error.code !== 'VALIDATION_ERROR');
            }
        );

        // Cache the successful result (only if no image was provided)
        if (!image) {
            CacheService.setCachedMacro(workbookData, userPrompt, analysis, result);
        }

        const duration = endTimer();
        console.log(`Macro generation completed in ${duration.toFixed(2)}ms`);
        
        return result;
    } catch (error) {
        endTimer();
        console.error("Error in generateMacro:", error);
        
        if (error instanceof ValidationError) {
            throw new AIServiceError(
                "Oluşturulan makro kodu beklenmeyen bir formatta. Lütfen isteğinizi daha açık bir şekilde belirtin ve tekrar deneyin.",
                'VALIDATION_ERROR',
                false,
                error
            );
        }
        
        if (error instanceof TimeoutError) {
            throw new AIServiceError(
                "Makro kodu oluşturma işlemi zaman aşımına uğradı. Lütfen tekrar deneyin.",
                'TIMEOUT_ERROR',
                true,
                error
            );
        }
        
        if (error instanceof AIServiceError) {
            throw error;
        }
        
        throw new AIServiceError(
            "Makro kodu oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
            'GENERATION_ERROR',
            true,
            error instanceof Error ? error : undefined
        );
    }
};

const CALCULATION_SYSTEM_PROMPT = `
Sen, bir Excel formül hesaplama motorusun. Görevin, sağlanan veri bağlamına dayanarak verilen Excel formülünün sonucunu hesaplamaktır. SADECE hesaplanan değeri döndür. Açıklama, formülün kendisi veya başka bir metin EKLEME.

Örnek Çıktılar:
- 42
- İsim Soyisim
- 15.03.2024
- #YOK!
- DOĞRU
`;

const formatRowDataForPrompt = (rowData: (string | number | null | Date)[], headers: string[], rowIndex: number): string => {
    if (!rowData) return "Bu satır için veri yok.";
    return rowData.map((cell, index) => `${headers[index]}${rowIndex + 1}: [${formatCellValue(cell)}]`).join(' | ');
}

export const calculateFormula = async (
    formula: string,
    rowData: (string | number | null | Date)[],
    rowIndex: number,
    workbookData: WorkbookData,
    headers: string[],
    excelLanguage: 'tr' | 'en'
): Promise<string> => {
    const endTimer = PerformanceMonitor.startTimer('calculateFormula');
    
    // Check cache first
    const cachedResult = CacheService.getCachedCalculation(formula, rowData, excelLanguage);
    if (cachedResult) {
        console.log('Using cached calculation result');
        endTimer();
        return cachedResult;
    }
    
    try {
        const formattedRowData = formatRowDataForPrompt(rowData, headers, rowIndex);
        const formattedExcelData = formatExcelDataForPrompt(workbookData);

        const userContent = `
--- EXCEL DİLİ ---
${excelLanguage === 'tr' ? 'Türkçe (argüman ayıracı olarak noktalı virgül ";" kullan)' : 'İngilizce (argüman ayıracı olarak virgül "," kullan)'}

--- HESAPLANACAK FORMÜL ---
${formula}

--- AKTİF SATIR VERİSİ ---
Hesaplama bu satır için yapılıyor:
${formattedRowData}

--- TÜM VERİ BAĞLAMI (Gerekirse VLOOKUP, vb. için) ---
${formattedExcelData}
`;

        const calculationOperation = async () => {
            return await RequestManager.withTimeout(async () => {
                const response: GenerateContentResponse = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: { parts: [{ text: userContent }] },
                    config: {
                        systemInstruction: CALCULATION_SYSTEM_PROMPT,
                        temperature: 0,
                    },
                });
                
                const resultText = response.text?.trim();
                if (!resultText) {
                    throw new AIServiceError('Empty calculation result', 'EMPTY_RESPONSE', true);
                }
                
                // Clean up quoted results
                return resultText.replace(/^"(.*)"$/, '$1');
            }, 10000); // 10 second timeout for calculations
        };

        const result = await RetryManager.withRetry(
            calculationOperation,
            2, // Max 2 retries for calculations
            800, // 800ms base delay
            (error) => {
                return error instanceof TimeoutError ||
                       error instanceof RateLimitError ||
                       (error instanceof AIServiceError && error.retryable);
            }
        );

        // Cache the successful result
        CacheService.setCachedCalculation(formula, rowData, excelLanguage, result);

        const duration = endTimer();
        console.log(`Formula calculation completed in ${duration.toFixed(2)}ms`);
        
        return result;
    } catch (error) {
        endTimer();
        console.error("Error in calculateFormula:", error);
        
        if (error instanceof TimeoutError) {
            return '#ZAMAN_ASIMI!'; // Return Excel-like error for timeout
        }
        
        if (error instanceof AIServiceError && error.retryable) {
            return '#HATA!'; // Return Excel-like error for retryable errors
        }
        
        // For non-retryable errors, show a more specific error
        throw new AIServiceError(
            "Formül önizlemesi hesaplanırken bir hata oluştu.",
            'CALCULATION_ERROR',
            false,
            error instanceof Error ? error : undefined
        );
    }
}


export async function* generateWebSearchStream(
    mode: 'formula' | 'macro',
    workbookData: WorkbookData, 
    userPrompt: string, 
    analysis: ColumnAnalysis[],
    image: string | null,
    excelLanguage: 'tr' | 'en',
    excelVersion: string,
): AsyncGenerator<string, { uri: string; title: string; }[], unknown> {
    const formattedExcelData = formatExcelDataForPrompt(workbookData);
    const formattedAnalysis = formatAnalysisForPrompt(analysis);
    let macroLibrary: string | undefined = undefined;
    if (mode === 'macro') {
        macroLibrary = formatMacroLibraryForPrompt();
    }

    const userContentText = buildUserContent(mode, formattedExcelData, formattedAnalysis, userPrompt, excelLanguage, excelVersion, macroLibrary);
    const systemInstruction = mode === 'formula' ? FORMULA_SYSTEM_PROMPT_WEB_SEARCH : MACRO_SYSTEM_PROMPT_WEB_SEARCH;
    const contents = buildContentRequest(userContentText, image);

    const stream = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.5,
            tools: [{googleSearch: {}}],
        },
    });

    const sourcesMap = new Map<string, { uri: string; title: string }>();
    for await (const chunk of stream) {
        if (chunk.text) {
            yield chunk.text;
        }

        const groundingChunks = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (groundingChunks) {
            for (const grounding of groundingChunks) {
                if (grounding.web?.uri && !sourcesMap.has(grounding.web.uri)) {
                    sourcesMap.set(grounding.web.uri, {
                        uri: grounding.web.uri,
                        title: grounding.web.title || 'Bilinmeyen Kaynak'
                    });
                }
            }
        }
    }

    return Array.from(sourcesMap.values());
}